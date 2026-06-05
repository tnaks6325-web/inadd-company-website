/**
 * BlobCursor — Vanilla JS / ES Module port
 * Ported from React Bits (https://reactbits.dev)
 * Dependency: GSAP (UMD build loaded via <script> tag — window.gsap must exist)
 */

export class BlobCursor {
  constructor(container, opts = {}) {
    this.container = typeof container === 'string'
      ? document.getElementById(container)
      : container;

    const o = opts;
    this.blobType                = o.blobType                ?? 'circle';
    this.fillColor               = o.fillColor               ?? '#5227FF';
    this.trailCount              = o.trailCount              ?? 3;
    this.sizes                   = o.sizes                   ?? [60, 125, 75];
    this.innerSizes              = o.innerSizes              ?? [20, 35, 25];
    this.innerColor              = o.innerColor              ?? 'rgba(255,255,255,0.8)';
    this.opacities               = o.opacities               ?? [0.6, 0.6, 0.6];
    this.shadowColor             = o.shadowColor             ?? 'rgba(0,0,0,0.75)';
    this.shadowBlur              = o.shadowBlur              ?? 5;
    this.shadowOffsetX           = o.shadowOffsetX           ?? 10;
    this.shadowOffsetY           = o.shadowOffsetY           ?? 10;
    this.filterId                = o.filterId                ?? 'blob-filter';
    this.filterStdDeviation      = o.filterStdDeviation      ?? 30;
    this.filterColorMatrixValues = o.filterColorMatrixValues ?? '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10';
    this.useFilter               = o.useFilter               ?? true;
    this.fastDuration            = o.fastDuration            ?? 0.1;
    this.slowDuration            = o.slowDuration            ?? 0.5;
    this.fastEase                = o.fastEase                ?? 'power3.out';
    this.slowEase                = o.slowEase                ?? 'power1.out';
    this.zIndex                  = o.zIndex                  ?? 100;

    this._blobs    = [];
    this._onMove   = this._handleMove.bind(this);
    this._onResize = this._updateOffset.bind(this);
  }

  init() {
    const { container } = this;
    if (!container) return;

    Object.assign(container.style, {
      position:      'fixed',
      inset:         '0',
      zIndex:        String(this.zIndex),
      pointerEvents: 'none',
    });

    if (this.useFilter) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
      svg.innerHTML = `
        <defs>
          <filter id="${this.filterId}">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="${this.filterStdDeviation}" />
            <feColorMatrix in="blur" values="${this.filterColorMatrixValues}" />
          </filter>
        </defs>`;
      container.appendChild(svg);
    }

    const main = document.createElement('div');
    Object.assign(main.style, {
      pointerEvents: 'none',
      position:      'absolute',
      width:         '100%',
      height:        '100%',
      overflow:      'hidden',
      background:    'transparent',
      userSelect:    'none',
      filter:        this.useFilter ? `url(#${this.filterId})` : 'none',
    });
    container.appendChild(main);
    this._main = main;

    const borderRadius = this.blobType === 'circle' ? '50%' : '0%';
    for (let i = 0; i < this.trailCount; i++) {
      const size      = this.sizes[i]      ?? 60;
      const innerSize = this.innerSizes[i] ?? 20;
      const opacity   = this.opacities[i]  ?? 0.6;

      const blob = document.createElement('div');
      Object.assign(blob.style, {
        position:        'absolute',
        willChange:      'transform',
        transform:       'translate(-50%, -50%)',
        width:           size + 'px',
        height:          size + 'px',
        borderRadius,
        backgroundColor: this.fillColor,
        opacity:         String(opacity),
        boxShadow:       `${this.shadowOffsetX}px ${this.shadowOffsetY}px ${this.shadowBlur}px 0 ${this.shadowColor}`,
      });

      const inner = document.createElement('div');
      Object.assign(inner.style, {
        position:        'absolute',
        width:           innerSize + 'px',
        height:          innerSize + 'px',
        top:             ((size - innerSize) / 2) + 'px',
        left:            ((size - innerSize) / 2) + 'px',
        backgroundColor: this.innerColor,
        borderRadius,
      });

      blob.appendChild(inner);
      main.appendChild(blob);
      this._blobs.push(blob);
    }

    window.addEventListener('mousemove', this._onMove,   { passive: true });
    window.addEventListener('touchmove', this._onMove,   { passive: true });
    window.addEventListener('resize',    this._onResize, { passive: true });
  }

  _updateOffset() {
    return { left: 0, top: 0 };
  }

  _handleMove(e) {
    const x = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    const y = e.clientY ?? (e.touches && e.touches[0]?.clientY);
    if (x == null || y == null) return;

    const gsap = window.gsap;
    if (!gsap) return;

    this._blobs.forEach((el, i) => {
      const isLead = i === 0;
      gsap.to(el, {
        x:        x,
        y:        y,
        duration: isLead ? this.fastDuration : this.slowDuration,
        ease:     isLead ? this.fastEase     : this.slowEase,
      });
    });
  }

  dispose() {
    window.removeEventListener('mousemove', this._onMove);
    window.removeEventListener('touchmove', this._onMove);
    window.removeEventListener('resize',    this._onResize);
    if (this.container) this.container.innerHTML = '';
  }
}

export function initBlobCursor(containerId, opts = {}) {
  const instance = new BlobCursor(containerId, opts);
  instance.init();
  return instance;
}
