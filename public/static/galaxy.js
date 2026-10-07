/* ============================================================
   Galaxy — React Bits 's Galaxy effect ported to vanilla WebGL1.
   No dependencies (ogl-free). Renders an animated starfield onto
   a full-screen triangle. Call initGalaxy(containerId, opts).
   ============================================================ */
(function () {
  'use strict';

  var vertexShader =
    'attribute vec2 uv;' +
    'attribute vec2 position;' +
    'varying vec2 vUv;' +
    'void main(){ vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }';

  var fragmentShader = [
    'precision highp float;',
    'uniform float uTime;',
    'uniform vec3 uResolution;',
    'uniform vec2 uFocal;',
    'uniform vec2 uRotation;',
    'uniform float uStarSpeed;',
    'uniform float uDensity;',
    'uniform float uHueShift;',
    'uniform float uSpeed;',
    'uniform vec2 uMouse;',
    'uniform float uGlowIntensity;',
    'uniform float uSaturation;',
    'uniform bool uMouseRepulsion;',
    'uniform float uTwinkleIntensity;',
    'uniform float uRotationSpeed;',
    'uniform float uRepulsionStrength;',
    'uniform float uMouseActiveFactor;',
    'uniform float uAutoCenterRepulsion;',
    'uniform bool uTransparent;',
    'varying vec2 vUv;',
    '#define NUM_LAYER 4.0',
    '#define STAR_COLOR_CUTOFF 0.2',
    '#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)',
    '#define PERIOD 3.0',
    'float Hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }',
    'float tri(float x){ return abs(fract(x) * 2.0 - 1.0); }',
    'float tris(float x){ float t = fract(x); return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0)); }',
    'float trisn(float x){ float t = fract(x); return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0; }',
    'vec3 hsv2rgb(vec3 c){ vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0); vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www); return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y); }',
    'float Star(vec2 uv, float flare){',
    '  float d = length(uv);',
    '  float m = (0.05 * uGlowIntensity) / d;',
    '  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));',
    '  m += rays * flare * uGlowIntensity;',
    '  uv *= MAT45;',
    '  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));',
    '  m += rays * 0.3 * flare * uGlowIntensity;',
    '  m *= smoothstep(1.0, 0.2, d);',
    '  return m;',
    '}',
    'vec3 StarLayer(vec2 uv){',
    '  vec3 col = vec3(0.0);',
    '  vec2 gv = fract(uv) - 0.5;',
    '  vec2 id = floor(uv);',
    '  for (int y = -1; y <= 1; y++) {',
    '    for (int x = -1; x <= 1; x++) {',
    '      vec2 offset = vec2(float(x), float(y));',
    '      vec2 si = id + vec2(float(x), float(y));',
    '      float seed = Hash21(si);',
    '      float size = fract(seed * 345.32);',
    '      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));',
    '      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;',
    '      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;',
    '      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;',
    '      float grn = min(red, blu) * seed;',
    '      vec3 base = vec3(red, grn, blu);',
    '      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;',
    '      hue = fract(hue + uHueShift / 360.0);',
    '      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;',
    '      float val = max(max(base.r, base.g), base.b);',
    '      base = hsv2rgb(vec3(hue, sat, val));',
    '      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;',
    '      float star = Star(gv - offset - pad, flareSize);',
    '      vec3 color = base;',
    '      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;',
    '      twinkle = mix(1.0, twinkle, uTwinkleIntensity);',
    '      star *= twinkle;',
    '      col += star * size * color;',
    '    }',
    '  }',
    '  return col;',
    '}',
    'void main(){',
    '  vec2 focalPx = uFocal * uResolution.xy;',
    '  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;',
    '  vec2 mouseNorm = uMouse - vec2(0.5);',
    '  if (uAutoCenterRepulsion > 0.0) {',
    '    vec2 centerUV = vec2(0.0, 0.0);',
    '    float centerDist = length(uv - centerUV);',
    '    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));',
    '    uv += repulsion * 0.05;',
    '  } else if (uMouseRepulsion) {',
    '    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;',
    '    float mouseDist = length(uv - mousePosUV);',
    '    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));',
    '    uv += repulsion * 0.05 * uMouseActiveFactor;',
    '  } else {',
    '    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;',
    '    uv += mouseOffset;',
    '  }',
    '  float autoRotAngle = uTime * uRotationSpeed;',
    '  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));',
    '  uv = autoRot * uv;',
    '  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;',
    '  vec3 col = vec3(0.0);',
    '  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {',
    '    float depth = fract(i + uStarSpeed * uSpeed);',
    '    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);',
    '    float fade = depth * smoothstep(1.0, 0.9, depth);',
    '    col += StarLayer(uv * scale + i * 453.32) * fade;',
    '  }',
    '  if (uTransparent) {',
    '    float alpha = length(col);',
    '    alpha = smoothstep(0.0, 0.3, alpha);',
    '    alpha = min(alpha, 1.0);',
    '    gl_FragColor = vec4(col, alpha);',
    '  } else {',
    '    gl_FragColor = vec4(col, 1.0);',
    '  }',
    '}'
  ].join('\n');

  function compile(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('Galaxy shader error:', gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  window.initGalaxy = function (containerId, opts) {
    opts = opts || {};
    var o = {
      focal: opts.focal || [0.5, 0.5],
      rotation: opts.rotation || [1.0, 0.0],
      starSpeed: opts.starSpeed != null ? opts.starSpeed : 0.5,
      density: opts.density != null ? opts.density : 1,
      hueShift: opts.hueShift != null ? opts.hueShift : 140,
      disableAnimation: !!opts.disableAnimation,
      speed: opts.speed != null ? opts.speed : 1.0,
      mouseInteraction: opts.mouseInteraction !== false,
      glowIntensity: opts.glowIntensity != null ? opts.glowIntensity : 0.3,
      saturation: opts.saturation != null ? opts.saturation : 0.0,
      mouseRepulsion: opts.mouseRepulsion !== false,
      twinkleIntensity: opts.twinkleIntensity != null ? opts.twinkleIntensity : 0.3,
      rotationSpeed: opts.rotationSpeed != null ? opts.rotationSpeed : 0.1,
      repulsionStrength: opts.repulsionStrength != null ? opts.repulsionStrength : 2,
      autoCenterRepulsion: opts.autoCenterRepulsion != null ? opts.autoCenterRepulsion : 0,
      transparent: opts.transparent !== false
    };

    var ctn = document.getElementById(containerId);
    if (!ctn) return;

    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl', { alpha: o.transparent, premultipliedAlpha: false }) ||
             canvas.getContext('experimental-webgl', { alpha: o.transparent, premultipliedAlpha: false });
    if (!gl) { console.warn('Galaxy: WebGL not supported'); return; }

    if (o.transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    var vs = compile(gl, gl.VERTEX_SHADER, vertexShader);
    var fs = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Galaxy program link error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // full-screen triangle (matches ogl's Triangle geometry)
    var posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    var uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 2, 0, 0, 2]), gl.STATIC_DRAW);
    var aUv = gl.getAttribLocation(prog, 'uv');
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);

    function loc(n) { return gl.getUniformLocation(prog, n); }
    var U = {
      uTime: loc('uTime'), uResolution: loc('uResolution'), uFocal: loc('uFocal'),
      uRotation: loc('uRotation'), uStarSpeed: loc('uStarSpeed'), uDensity: loc('uDensity'),
      uHueShift: loc('uHueShift'), uSpeed: loc('uSpeed'), uMouse: loc('uMouse'),
      uGlowIntensity: loc('uGlowIntensity'), uSaturation: loc('uSaturation'),
      uMouseRepulsion: loc('uMouseRepulsion'), uTwinkleIntensity: loc('uTwinkleIntensity'),
      uRotationSpeed: loc('uRotationSpeed'), uRepulsionStrength: loc('uRepulsionStrength'),
      uMouseActiveFactor: loc('uMouseActiveFactor'), uAutoCenterRepulsion: loc('uAutoCenterRepulsion'),
      uTransparent: loc('uTransparent')
    };

    // static uniforms
    gl.uniform2fv(U.uFocal, o.focal);
    gl.uniform2fv(U.uRotation, o.rotation);
    gl.uniform1f(U.uDensity, o.density);
    gl.uniform1f(U.uHueShift, o.hueShift);
    gl.uniform1f(U.uSpeed, o.speed);
    gl.uniform1f(U.uGlowIntensity, o.glowIntensity);
    gl.uniform1f(U.uSaturation, o.saturation);
    gl.uniform1i(U.uMouseRepulsion, o.mouseRepulsion ? 1 : 0);
    gl.uniform1f(U.uTwinkleIntensity, o.twinkleIntensity);
    gl.uniform1f(U.uRotationSpeed, o.rotationSpeed);
    gl.uniform1f(U.uRepulsionStrength, o.repulsionStrength);
    gl.uniform1f(U.uAutoCenterRepulsion, o.autoCenterRepulsion);
    gl.uniform1i(U.uTransparent, o.transparent ? 1 : 0);

    function resize() {
      var w = ctn.offsetWidth, h = ctn.offsetHeight;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform3f(U.uResolution, canvas.width, canvas.height, canvas.width / canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();
    ctn.appendChild(canvas);

    var targetMouse = { x: 0.5, y: 0.5 }, smoothMouse = { x: 0.5, y: 0.5 };
    var targetActive = 0.0, smoothActive = 0.0;

    function onMove(e) {
      var rect = ctn.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetActive = 1.0;
    }
    function onLeave() { targetActive = 0.0; }
    if (o.mouseInteraction) {
      // listen on window so events still arrive through overlay layers
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseout', onLeave);
    }

    var raf;
    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (!o.disableAnimation) {
        gl.uniform1f(U.uTime, t * 0.001);
        gl.uniform1f(U.uStarSpeed, (t * 0.001 * o.starSpeed) / 10.0);
      }
      var lf = 0.05;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * lf;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * lf;
      smoothActive += (targetActive - smoothActive) * lf;
      gl.uniform2f(U.uMouse, smoothMouse.x, smoothMouse.y);
      gl.uniform1f(U.uMouseActiveFactor, smoothActive);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    raf = requestAnimationFrame(frame);

    return function destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      var ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    };
  };
})();
