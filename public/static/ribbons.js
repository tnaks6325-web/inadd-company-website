/**
 * Ribbons — Vanilla JS / ES Module port
 * Ported from React Bits (https://reactbits.dev/gl/ribbons)
 * Dependency: ogl (ES Module via jsDelivr CDN)
 */

import {
  Renderer,
  Transform,
  Vec3,
  Color,
  Polyline
} from 'https://cdn.jsdelivr.net/npm/ogl@1.0.11/src/index.js';

const VERTEX = `
  precision highp float;

  attribute vec3 position;
  attribute vec3 next;
  attribute vec3 prev;
  attribute vec2 uv;
  attribute float side;

  uniform vec2 uResolution;
  uniform float uDPR;
  uniform float uThickness;
  uniform float uTime;
  uniform float uEnableShaderEffect;
  uniform float uEffectAmplitude;

  varying vec2 vUV;

  vec4 getPosition() {
    vec4 current = vec4(position, 1.0);
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 nextScreen = next.xy * aspect;
    vec2 prevScreen = prev.xy * aspect;
    vec2 tangent = normalize(nextScreen - prevScreen);
    vec2 normal = vec2(-tangent.y, tangent.x);
    normal /= aspect;
    normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
    float dist = length(nextScreen - prevScreen);
    normal *= smoothstep(0.0, 0.02, dist);
    float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
    float pixelWidth = current.w * pixelWidthRatio;
    normal *= pixelWidth * uThickness;
    current.xy -= normal * side;
    if (uEnableShaderEffect > 0.5) {
      current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
    }
    return current;
  }

  void main() {
    vUV = uv;
    gl_Position = getPosition();
  }
`;

const FRAGMENT = `
  precision highp float;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uEnableFade;
  varying vec2 vUV;
  void main() {
    float fadeFactor = 1.0;
    if (uEnableFade > 0.5) {
      fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
    }
    gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
  }
`;

export class Ribbons {
  constructor(container, opts = {}) {
    this.container = typeof container === 'string'
      ? document.getElementById(container)
      : container;

    const o = opts;
    // colors 배열 길이 = 리본 개수. 1개만 원하면 1개짜리 배열로.
    this.colors             = o.colors            ?? ['#FC8EAC'];
    this.baseSpring         = o.baseSpring         ?? 0.03;
    this.baseFriction       = o.baseFriction       ?? 0.9;
    this.baseThickness      = o.baseThickness      ?? 30;
    // offsetFactor: 0 → 리본 간 오프셋 없음 (1개짜리일 때 완전히 중앙 고정)
    this.offsetFactor       = o.offsetFactor       ?? 0;
    this.maxAge             = o.maxAge             ?? 500;
    this.pointCount         = o.pointCount         ?? 50;
    this.speedMultiplier    = o.speedMultiplier    ?? 0.6;
    this.enableFade         = o.enableFade         ?? false;
    this.enableShaderEffect = o.enableShaderEffect ?? false;
    this.effectAmplitude    = o.effectAmplitude    ?? 2;
    this.backgroundColor    = o.backgroundColor   ?? [0, 0, 0, 0];

    this._frameId  = null;
    this._lines    = [];
    this._mouse    = new Vec3();
    this._tmp      = new Vec3();
    this._lastTime = performance.now();

    this._onResize     = this._resize.bind(this);
    this._onMouseMove  = this._updateMouse.bind(this);
    this._onTouchStart = this._updateMouse.bind(this);
    this._onTouchMove  = this._updateMouse.bind(this);
  }

  init() {
    const { container } = this;
    if (!container) return;

    // ── 중복 초기화 방지: 이미 canvas가 있으면 건너뜀 ──
    if (container.querySelector('canvas')) return;

    this._renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });
    const gl = this._renderer.gl;
    this._gl = gl;

    const [r, g, b, a] = this.backgroundColor;
    gl.clearColor(r, g, b, a);

    Object.assign(gl.canvas.style, {
      position: 'absolute',
      top:      '0',
      left:     '0',
      width:    '100%',
      height:   '100%',
    });
    container.appendChild(gl.canvas);

    this._scene = new Transform();

    // colors 배열 길이만큼만 리본 생성
    // 1개 원소 배열 → 리본 정확히 1개
    // offsetFactor=0 이므로 모든 오프셋 = 0, mouseOffset은 (0,0,0) 고정
    this.colors.forEach((color) => {
      const spring    = this.baseSpring;
      const friction  = this.baseFriction;
      const thickness = this.baseThickness;

      // offsetFactor=0 → X/Y 랜덤 오프셋 없음 → 단일 리본이 정확히 커서를 추적
      const mouseOffset = new Vec3(0, 0, 0);

      const points = Array.from({ length: this.pointCount }, () => new Vec3());

      const polyline = new Polyline(gl, {
        points,
        vertex:   VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          uColor:              { value: new Color(color) },
          uThickness:          { value: thickness },
          uOpacity:            { value: 1.0 },
          uTime:               { value: 0.0 },
          uEnableShaderEffect: { value: this.enableShaderEffect ? 1.0 : 0.0 },
          uEffectAmplitude:    { value: this.effectAmplitude },
          uEnableFade:         { value: this.enableFade ? 1.0 : 0.0 },
        },
      });
      polyline.mesh.setParent(this._scene);

      this._lines.push({
        spring, friction,
        mouseVelocity: new Vec3(),
        mouseOffset, points, polyline,
      });
    });

    this._resize();

    window.addEventListener('resize',    this._onResize);
    window.addEventListener('mousemove', this._onMouseMove);
    container.addEventListener('touchstart', this._onTouchStart, { passive: true });
    container.addEventListener('touchmove',  this._onTouchMove,  { passive: true });

    this._loop();
  }

  _resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this._renderer.setSize(w, h);
    this._lines.forEach(l => l.polyline.resize());
  }

  _updateMouse(e) {
    let x, y;
    const rect = this.container.getBoundingClientRect();
    if (e.changedTouches && e.changedTouches.length) {
      x = e.changedTouches[0].clientX - rect.left;
      y = e.changedTouches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this._mouse.set((x / w) * 2 - 1, (y / h) * -2 + 1, 0);
  }

  _loop() {
    this._frameId = requestAnimationFrame(this._loop.bind(this));

    const now = performance.now();
    const dt  = now - this._lastTime;
    this._lastTime = now;

    this._lines.forEach(line => {
      this._tmp
        .copy(this._mouse)
        .add(line.mouseOffset)
        .sub(line.points[0])
        .multiply(line.spring);

      line.mouseVelocity.add(this._tmp).multiply(line.friction);
      line.points[0].add(line.mouseVelocity);

      for (let i = 1; i < line.points.length; i++) {
        if (isFinite(this.maxAge) && this.maxAge > 0) {
          const segDelay = this.maxAge / (line.points.length - 1);
          const alpha    = Math.min(1, (dt * this.speedMultiplier) / segDelay);
          line.points[i].lerp(line.points[i - 1], alpha);
        } else {
          line.points[i].lerp(line.points[i - 1], 0.9);
        }
      }

      if (line.polyline.mesh.program.uniforms.uTime) {
        line.polyline.mesh.program.uniforms.uTime.value = now * 0.001;
      }
      line.polyline.updateGeometry();
    });

    this._renderer.render({ scene: this._scene });
  }

  dispose() {
    cancelAnimationFrame(this._frameId);
    window.removeEventListener('resize',    this._onResize);
    window.removeEventListener('mousemove', this._onMouseMove);
    this.container.removeEventListener('touchstart', this._onTouchStart);
    this.container.removeEventListener('touchmove',  this._onTouchMove);
    const { canvas } = this._gl;
    if (canvas.parentNode === this.container) this.container.removeChild(canvas);
  }
}

// ── 전역 싱글턴 가드: 페이지당 1개 인스턴스만 허용 ──
let _globalInstance = null;

export function initRibbons(containerId, opts = {}) {
  // 이미 실행 중이면 기존 인스턴스 반환
  if (_globalInstance) return _globalInstance;

  const instance = new Ribbons(containerId, opts);
  instance.init();
  _globalInstance = instance;
  return instance;
}
