import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source = fs.readFileSync(new URL('../public/static/portfolio-motion-preview.js', import.meta.url), 'utf8')
const homepage = fs.readFileSync(new URL('../src/routes/home.tsx', import.meta.url), 'utf8')
const stylesheet = fs.readFileSync(new URL('../public/static/portfolio-motion-preview.css', import.meta.url), 'utf8')
const flush = async () => { for (let index = 0; index < 32; index++) await Promise.resolve() }
const close = (actual, expected, tolerance = .02) => assert.ok(Math.abs(actual - expected) <= tolerance, `Expected ${actual} ≈ ${expected}`)

class EventTarget {
  constructor() { this.events = {} }
  addEventListener(name, callback, options) { (this.events[name] ||= []).push({ callback, options }) }
  dispatch(name, values = {}) {
    const event = { target: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true }, ...values }
    for (const { callback } of this.events[name] || []) callback(event)
    return event
  }
}

class Element extends EventTarget {
  constructor(tag = 'div') {
    super()
    this.tagName = tag.toUpperCase()
    this.dataset = {}
    this.attributes = {}
    this.children = []
    this.parentNode = null
    this.classes = new Set()
    this.disabled = false
    this._text = ''
    this.textWrites = 0
    this.classList = {
      add: (...names) => names.forEach(name => this.classes.add(name)),
      remove: (...names) => names.forEach(name => this.classes.delete(name)),
      contains: name => this.classes.has(name),
      toggle: (name, present) => present ? this.classes.add(name) : this.classes.delete(name),
    }
    this.style = {
      setProperty(name, value) { this[name] = String(value) },
      removeProperty(name) { delete this[name] },
      getPropertyValue(name) { return this[name] || '' },
    }
  }
  get textContent() { return this._text + this.children.map(child => child.textContent).join('') }
  set textContent(value) { this._text = String(value); this.children = []; this.textWrites++ }
  setAttribute(name, value) {
    this.attributes[name] = String(value)
    if (name.startsWith('data-')) this.dataset[name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = String(value)
  }
  getAttribute(name) { return this.attributes[name] ?? null }
  hasAttribute(name) { return this.getAttribute(name) !== null }
  matches(selector) {
    if (selector.startsWith('.')) return this.classes.has(selector.slice(1))
    if (selector.startsWith('#')) return this.getAttribute('id') === selector.slice(1)
    const attribute = selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/)
    return attribute ? this.hasAttribute(attribute[1]) && (attribute[2] === undefined || this.getAttribute(attribute[1]) === attribute[2]) : selector.toLowerCase() === this.tagName.toLowerCase()
  }
  appendChild(child) {
    child.parentNode = this
    this.children.push(child)
    this.onAppend?.()
    return child
  }
  querySelectorAll(selector) { return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]) }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null }
  closest(selector) { return this.matches(selector) ? this : this.parentNode?.closest(selector) || null }
  contains(node) { return node === this || this.children.some(child => child.contains(node)) }
  cloneNode(deep) {
    const copy = new Element(this.tagName)
    for (const name of this.classes) copy.classList.add(name)
    for (const [name, value] of Object.entries(this.attributes)) copy.setAttribute(name, value)
    copy._text = this._text
    if (deep) this.children.forEach(child => copy.appendChild(child.cloneNode(true)))
    this.decorateClone?.(copy)
    return copy
  }
}

function harness({ reduced = false, observer = true, resizeObserver = true, mutationObserver = true, animations = true, legacyMedia = false, hidden = false, exists = true, count = 4, empty = false, missing = '', width = 500 } = {}) {
  const metrics = { width, cardWidth: 300, gap: 24, rectReads: 0 }
  const root = new Element('section')
  root.setAttribute('id', 'homeRefs')
  root.setAttribute('data-portfolio-motion', 'true')
  const make = (tag, attrs = {}, classes = '') => {
    const item = new Element(tag)
    Object.entries(attrs).forEach(([key, value]) => item.setAttribute(key, value))
    if (classes) item.classList.add(...classes.split(' '))
    if (animations) item.animate = (frames, options) => animate(item, frames, options)
    return item
  }
  const flow = make('div', { id: 'refsFlow', tabindex: '0' }, 'refs-flow')
  const track = make('div', { id: 'refsFlowTrack' }, 'refs-flow-track')
  flow.appendChild(track)
  const previous = make('button', { 'data-pf-prev': '' })
  const next = make('button', { 'data-pf-next': '' })
  const toggle = make('button', { 'data-pf-toggle': '' })
  const toggleLabel = make('span', { 'data-pf-toggle-label': '' })
  toggle.appendChild(toggleLabel)
  const status = make('p', { 'data-pf-status': '', 'aria-live': 'polite', 'aria-atomic': 'true' })
  const title = make('h2', { 'data-pf-reveal': 'title' })
  const support = make('p', { 'data-pf-reveal': 'support' })
  const controls = { flow, track, previous, next, toggle, status }
  ;[title, support, previous, next, toggle, status].forEach(item => { if (item !== controls[missing]) root.appendChild(item) })
  if (missing !== 'flow') root.appendChild(flow)
  if (missing === 'track') flow.children = []
  const jobs = [], observations = [], resizeObservations = [], mutations = []
  const callbacks = new Map()
  let frameId = 0, time = 100, mediaHandler, mutationQueued = false, scrollLeft = 0
  const document = new EventTarget()
  document.hidden = hidden
  document.querySelector = () => exists ? root : null
  const window = new EventTarget()
  window.scrollY = 0
  const motion = { matches: reduced }
  if (legacyMedia) motion.addListener = callback => { mediaHandler = callback }
  else motion.addEventListener = (_, callback) => { mediaHandler = callback }
  window.matchMedia = () => motion
  const nativeReduced = () => root.dataset.portfolioMotion === 'reduced'
  const clonesHidden = () => nativeReduced() || root.dataset.portfolioSingle === 'true'
  const cards = () => track.querySelectorAll('.refs-flow-card')
  const originals = () => cards().filter(card => !card.hasAttribute('data-portfolio-duplicate'))
  const translate = () => Number(track.style.transform?.match(/translate3d\(([-\d.]+)px/)?.[1] || 0)
  Object.defineProperty(flow, 'clientWidth', { get: () => metrics.width })
  Object.defineProperty(flow, 'scrollLeft', {
    get: () => scrollLeft,
    set: value => { scrollLeft = Math.max(0, Math.min(Number(value), Math.max(0, track.scrollWidth - flow.clientWidth))) },
  })
  Object.defineProperty(track, 'scrollWidth', { get: () => Math.max(0, (clonesHidden() ? originals() : cards()).length * (metrics.cardWidth + metrics.gap) - metrics.gap) })
  flow.getBoundingClientRect = () => { metrics.rectReads++; return { left: 100, right: 100 + metrics.width, width: metrics.width, top: 0, bottom: 500, height: 500 } }
  function decorate(card) {
    Object.defineProperty(card, 'offsetLeft', { configurable: true, get: () => clonesHidden() && card.hasAttribute('data-portfolio-duplicate') ? 0 : cards().indexOf(card) * (metrics.cardWidth + metrics.gap) })
    card.getBoundingClientRect = () => {
      metrics.rectReads++
      const hiddenClone = clonesHidden() && card.hasAttribute('data-portfolio-duplicate')
      const cardWidth = hiddenClone ? 0 : metrics.cardWidth
      const left = hiddenClone ? 0 : 100 + card.offsetLeft + translate() - flow.scrollLeft
      return { left, right: left + cardWidth, width: cardWidth, top: 0, bottom: 350, height: 350 }
    }
    card.decorateClone = decorate
    if (animations) [card, ...card.querySelectorAll('div')].forEach(item => { item.animate = (frames, options) => animate(item, frames, options) })
  }
  function fillCards(total = count) {
    track.children = []
    for (let group = 0; group < 2; group++) for (let index = 0; index < total; index++) {
      const attrs = { 'data-portfolio-index': index }
      if (group) Object.assign(attrs, { 'data-portfolio-duplicate': 'true', 'aria-hidden': 'true', inert: '' })
      const card = make('article', attrs, 'refs-flow-card')
      const body = make('div', {}, 'pf-card-body')
      const brand = make('h3', {}, 'wg-brand')
      brand.textContent = `브랜드 ${index + 1}`
      body.appendChild(brand)
      card.appendChild(body)
      decorate(card)
      track.appendChild(card)
    }
  }
  function animate(element, keyframes, options) {
    const job = { element, keyframes, options, playState: 'running', pauses: 0, plays: 0, cancelled: false,
      pause() { this.playState = 'paused'; this.pauses++ },
      play() { this.playState = 'running'; this.plays++ },
      cancel() { this.playState = 'idle'; this.cancelled = true },
      finish() { this.playState = 'finished' },
    }
    jobs.push(job)
    return job
  }
  const capture = new Set(), captureLog = []
  flow.setPointerCapture = id => { capture.add(id); captureLog.push(['set', id]) }
  flow.hasPointerCapture = id => capture.has(id)
  flow.releasePointerCapture = id => { capture.delete(id); captureLog.push(['release', id]) }
  if (!empty) fillCards()
  class IntersectionObserver {
    constructor(callback, options) { observations.push({ callback, options, targets: [] }); this.item = observations.at(-1) }
    observe(target) { this.item.targets.push(target) }
  }
  class ResizeObserver {
    constructor(callback) { resizeObservations.push({ callback, targets: [] }); this.item = resizeObservations.at(-1) }
    observe(target) { this.item.targets.push(target) }
  }
  class MutationObserver {
    constructor(callback) { mutations.push({ callback }); this.item = mutations.at(-1) }
    observe(target, options) {
      this.item.target = target; this.item.options = options
      target.onAppend = () => {
        if (mutationQueued) return
        mutationQueued = true
        Promise.resolve().then(() => { mutationQueued = false; this.item.callback([{ target, type: 'childList' }]) })
      }
    }
  }
  const context = {
    document, window, performance: { now: () => time },
    requestAnimationFrame: callback => { const id = ++frameId; callbacks.set(id, callback); return id },
    cancelAnimationFrame: id => callbacks.delete(id),
    IntersectionObserver, ResizeObserver, MutationObserver,
    console, Array, Math, Number, String,
  }
  if (observer) window.IntersectionObserver = IntersectionObserver
  if (resizeObserver) window.ResizeObserver = ResizeObserver
  if (mutationObserver) window.MutationObserver = MutationObserver
  vm.createContext(context)
  const run = () => vm.runInContext(source, context)
  run()
  return {
    root, flow, track, previous, next, toggle, toggleLabel, status, title, support, jobs, observations, resizeObservations, mutations, metrics,
    window, document, motion, capture, captureLog, cards, originals, run, fillCards,
    active: () => cards().find(card => card.classList.contains('is-portfolio-active')),
    distance: () => -translate(),
    period: () => (metrics.cardWidth + metrics.gap) * originals().length,
    pending: () => callbacks.size,
    time: () => time,
    elapse(ms) { time += ms },
    advance(ms, interval = 25) {
      const stop = time + ms
      while (time < stop) {
        time = Math.min(stop, time + interval)
        const frame = [...callbacks.values()]; callbacks.clear()
        frame.forEach(callback => callback(time))
        assert.ok(callbacks.size <= 1, 'Only one rail RAF may be pending')
      }
    },
    intersect(ratio = .5, visible = true) { observations[0]?.callback([{ target: root, intersectionRatio: ratio, isIntersecting: visible }]) },
    visible(value) { document.hidden = !value; document.dispatch('visibilitychange') },
    preference(value) { motion.matches = value; mediaHandler() },
    resize(values) { Object.assign(metrics, values); if (resizeObservations.length) resizeObservations[0].callback(); else window.dispatch('resize') },
    ready() { track.dispatch('portfolio:ready') },
    pointer(name, values = {}, target = flow) { return target.dispatch(name, { pointerId: 1, clientX: 100, clientY: 100, button: 0, isPrimary: true, pointerType: 'touch', ...values }) },
    key(key) { return flow.dispatch('keydown', { key }) },
    scroll(y) { window.scrollY = y; return window.dispatch('scroll') },
  }
}

const cases = []
const check = (name, fn) => cases.push({ name, fn })
const start = options => { const test = harness(options); test.intersect(); return test }
const pause = test => { test.toggle.dispatch('click'); assert.equal(test.toggle.getAttribute('aria-pressed'), 'true') }
const activeIndex = test => Number(test.active()?.dataset.portfolioIndex)

check('initial readiness is separate from visibility and initialization is idempotent', () => {
  const test = harness()
  assert.equal(test.root.dataset.portfolioReady, 'true')
  assert.equal(test.root.dataset.portfolioMotion, 'full')
  assert.equal(test.root.dataset.portfolioPlayback, 'paused')
  assert.equal(test.pending(), 0)
  assert.equal(test.jobs.length, 0)
  assert.equal(activeIndex(test), 0)
  assert.deepEqual(Array.from(test.observations[0].options.threshold), [0, .08, .2])
  assert.deepEqual(test.resizeObservations[0].targets, [test.flow])
  assert.equal(test.mutations[0].options.childList, true)
  const handlers = test.next.events.click.length
  test.run()
  assert.equal(test.next.events.click.length, handlers)
  assert.equal(test.observations.length, 1)
  test.intersect(.08)
  assert.equal(test.pending(), 0)
  test.intersect(.081)
  assert.equal(test.pending(), 1)
  assert.equal(test.root.dataset.portfolioPlayback, 'playing')
})

check('async empty data waits for mutation or portfolio:ready without taking over the original rail', async () => {
  for (const mutationObserver of [true, false]) {
    const test = start({ empty: true, mutationObserver })
    assert.equal(test.root.dataset.portfolioReady, undefined)
    assert.equal(test.pending(), 0)
    assert.equal(test.jobs.length, 0)
    assert.equal(test.next.disabled, true)
    test.fillCards()
    if (!mutationObserver) test.ready()
    await flush()
    assert.equal(test.root.dataset.portfolioReady, 'true')
    assert.equal(test.pending(), 1)
    assert.equal(test.next.disabled, false)
  }
})

check('automatic flow is slow, modulo-safe, one RAF only, and does not spam its live region', () => {
  const test = start()
  test.advance(1025)
  close(test.distance(), 52)
  assert.equal(test.status.textWrites, 0)
  test.advance(30000)
  assert.ok(test.distance() >= 0 && test.distance() < test.period())
  assert.equal(test.pending(), 1)
  assert.equal(test.status.textWrites, 0)
  assert.equal(test.cards().filter(card => card.classList.contains('is-portfolio-active')).length, 1)
})

check('scroll boosts the rail briefly without wheel interception or native vertical prevention', () => {
  const base = start(), boosted = start()
  base.advance(25); boosted.advance(25)
  const event = boosted.scroll(100)
  assert.equal(event.defaultPrevented, false)
  assert.equal(boosted.window.events.scroll[0].options.passive, true)
  assert.equal(boosted.flow.events.scroll[0].options.passive, true)
  assert.equal(boosted.window.events.wheel, undefined)
  assert.equal(boosted.flow.events.wheel, undefined)
  base.advance(500); boosted.advance(500)
  assert.ok(boosted.distance() > base.distance() + 40)
  boosted.advance(2500)
  const before = boosted.distance()
  boosted.advance(500)
  close(boosted.distance() - before, 26, .3)
})

check('only the finite entrance animates photo bodies, with stagger and no perpetual WAAPI track', () => {
  const test = start()
  assert.equal(test.jobs.length, 4)
  assert.deepEqual(test.jobs.map(job => job.options.duration), [620, 620, 700, 700])
  assert.deepEqual(test.jobs.map(job => job.options.delay), [0, 90, 100, 175])
  for (const job of test.jobs) {
    assert.ok(job.element === test.title || job.element === test.support || job.element.classList.contains('pf-card-body'))
    assert.equal(job.options.iterations, undefined)
    assert.equal(job.options.fill, undefined)
    assert.equal(job.keyframes.at(-1).opacity, 1)
  }
  const count = test.jobs.length
  test.intersect(0, false); test.intersect()
  assert.equal(test.jobs.length, count)
})

check('visibility pauses unfinished entrance jobs and never replays completed jobs', () => {
  const test = start()
  test.jobs[0].finish()
  test.visible(false)
  assert.equal(test.jobs[0].playState, 'finished')
  assert.ok(test.jobs.slice(1).every(job => job.playState === 'paused'))
  assert.equal(test.pending(), 0)
  test.visible(true)
  assert.equal(test.jobs[0].plays, 0)
  assert.ok(test.jobs.slice(1).every(job => job.playState === 'running'))
  assert.equal(test.pending(), 1)
})

check('mouse hover pauses automatic flow and preserves the inspected card; touch hover is ignored', () => {
  const test = start()
  test.advance(100)
  test.pointer('pointerenter', { pointerType: 'mouse' })
  const held = test.distance()
  test.pointer('pointerover', { pointerType: 'mouse', target: test.originals()[2].querySelector('.wg-brand') })
  assert.equal(activeIndex(test), 2)
  test.advance(1000)
  close(test.distance(), held)
  assert.equal(activeIndex(test), 2)
  assert.equal(test.pending(), 0)
  test.pointer('pointerleave', { pointerType: 'mouse' })
  assert.equal(test.pending(), 1)
  test.pointer('pointerenter')
  assert.equal(test.pending(), 1)
})

check('focus pauses automatic flow and explicit manual pause survives focus changes', () => {
  const test = start()
  test.root.dispatch('focusin')
  assert.equal(test.pending(), 0)
  test.root.dispatch('focusout', { relatedTarget: test.next })
  assert.equal(test.pending(), 0)
  test.root.dispatch('focusout', { relatedTarget: null })
  assert.equal(test.pending(), 1)
  pause(test)
  test.root.dispatch('focusin'); test.root.dispatch('focusout', { relatedTarget: null })
  assert.equal(test.pending(), 0)
  assert.equal(test.toggleLabel.textContent, '재생')
  test.root.dispatch('focusin'); test.toggle.dispatch('click')
  assert.equal(test.pending(), 1)
  assert.equal(test.toggle.getAttribute('aria-pressed'), 'false')
  test.pointer('pointerenter', { pointerType: 'mouse' }); pause(test); test.toggle.dispatch('click')
  assert.equal(test.pending(), 0, 'Explicit play does not animate a photo still being inspected')
})

check('previous and next center a card in 520ms and manually announce the chosen brand', () => {
  const test = start()
  pause(test)
  test.next.dispatch('click')
  assert.equal(test.status.textContent, '2 / 4 — 브랜드 2')
  assert.equal(test.root.dataset.portfolioPlayback, 'paused')
  test.advance(520, 20)
  close(test.distance(), 224)
  assert.equal(activeIndex(test), 1)
  assert.equal(test.pending(), 0)
  test.previous.dispatch('click'); test.advance(520, 20)
  close(test.distance(), 1196)
  assert.equal(activeIndex(test), 0)
})

check('rapid next retains destination intent while the old center highlight changes', () => {
  const test = start()
  pause(test)
  test.next.dispatch('click'); test.advance(25)
  assert.equal(activeIndex(test), 0, 'The actual nearest photograph may still be the old card')
  test.next.dispatch('click')
  assert.equal(test.status.textContent, '3 / 4 — 브랜드 3')
  test.advance(520, 20)
  close(test.distance(), 548)
  assert.equal(activeIndex(test), 2)
  test.next.dispatch('click'); test.next.dispatch('click')
  assert.equal(test.status.textContent, '1 / 4 — 브랜드 1')
  test.advance(520, 20)
  close(test.distance(), 1196)
  assert.equal(activeIndex(test), 0)
})

check('keyboard navigation wraps, Home/End use the shortest route, and unrelated keys stay native', () => {
  const test = start()
  pause(test)
  assert.equal(test.key('ArrowLeft').defaultPrevented, true)
  test.advance(520, 20)
  assert.equal(activeIndex(test), 3)
  close(test.distance(), 872)
  test.key('Home'); test.advance(520, 20)
  assert.equal(activeIndex(test), 0)
  test.key('End'); test.advance(520, 20)
  assert.equal(activeIndex(test), 3)
  test.key('ArrowRight'); test.advance(520, 20)
  assert.equal(activeIndex(test), 0)
  assert.equal(test.key('ArrowDown').defaultPrevented, false)
  assert.equal(test.key('Tab').defaultPrevented, false)
})

check('horizontal intent requires 8px and ratio >1.2; vertical gestures remain completely native', () => {
  const test = start()
  pause(test)
  test.pointer('pointerdown')
  assert.equal(test.pointer('pointermove', { clientX: 107 }).defaultPrevented, false)
  assert.equal(test.root.dataset.portfolioDragging, undefined)
  assert.equal(test.capture.size, 0)
  assert.equal(test.pointer('pointermove', { clientX: 112, clientY: 110 }).defaultPrevented, false)
  assert.equal(test.root.dataset.portfolioDragging, 'false')
  close(test.distance(), 0)
  test.pointer('pointerdown')
  assert.equal(test.pointer('pointermove', { clientX: 108 }).defaultPrevented, true)
  assert.equal(test.root.dataset.portfolioDragging, 'true')
  assert.equal(test.root.classList.contains('is-portfolio-dragging'), true)
  assert.equal(test.capture.has(1), true)
  close(test.distance(), 1288)
})

check('wrong pointer, non-primary input, secondary buttons, and native image drag are handled safely', () => {
  const test = start()
  pause(test)
  for (const values of [{ button: 2 }, { isPrimary: false }]) {
    test.pointer('pointerdown', values)
    assert.equal(test.pointer('pointermove', { clientX: 30 }).defaultPrevented, false)
  }
  test.pointer('pointerdown')
  assert.equal(test.pointer('pointermove', { pointerId: 2, clientX: 30 }).defaultPrevented, false)
  test.pointer('pointermove', { clientX: 70 })
  test.pointer('pointerup', { pointerId: 2 })
  assert.equal(test.capture.has(1), true)
  test.pointer('pointerup')
  assert.equal(test.capture.size, 0)
  assert.equal(test.flow.dispatch('dragstart').defaultPrevented, true)
})

check('released horizontal drag adds bounded decaying inertia even when automatic playback is paused', () => {
  const test = start()
  pause(test)
  test.pointer('pointerdown'); test.elapse(50)
  test.pointer('pointermove', { clientX: 50 }); test.pointer('pointerup', { clientX: 50 })
  const dragged = test.distance()
  close(dragged, 50)
  assert.equal(test.root.dataset.portfolioDragging, 'false')
  assert.equal(test.status.textWrites, 1)
  assert.equal(test.pending(), 1)
  test.advance(200)
  assert.ok(test.distance() > dragged + 70)
  test.advance(2000)
  assert.equal(test.pending(), 0)
  const settled = test.distance(); test.advance(1000); close(test.distance(), settled)
})

check('stale release, pointercancel, lost capture, and window blur release capture with no momentum', () => {
  for (const finish of ['stale', 'pointercancel', 'lostpointercapture', 'windowcancel', 'blur']) {
    const test = start()
    pause(test)
    test.pointer('pointerdown'); test.elapse(50); test.pointer('pointermove', { clientX: 50 })
    if (finish === 'stale') { test.elapse(101); test.pointer('pointerup') }
    else if (finish === 'windowcancel') test.pointer('pointercancel', {}, test.window)
    else if (finish === 'blur') test.window.dispatch('blur')
    else test.pointer(finish)
    assert.equal(test.capture.size, 0, finish)
    assert.equal(test.root.dataset.portfolioDragging, 'false', finish)
    assert.equal(test.pending(), 0, finish)
    const held = test.distance(); test.advance(600); close(test.distance(), held)
  }
})

check('sub-threshold pointerup outside the rail does not leave a ghost drag blocking autoplay', () => {
  const test = start()
  test.pointer('pointerdown'); test.pointer('pointermove', { clientX: 104 })
  assert.equal(test.pending(), 0)
  assert.equal(test.capture.size, 0)
  test.pointer('pointerup', {}, test.window)
  assert.equal(test.root.dataset.portfolioDragging, 'false')
  assert.equal(test.pending(), 1)
  test.advance(525)
  close(test.distance(), 26)
})

check('offscreen, hidden, and pagehide cancel the rail clock without any return-time jump', () => {
  for (const lifecycle of ['intersection', 'visibility', 'pagehide']) {
    const test = start()
    test.advance(525)
    const held = test.distance()
    if (lifecycle === 'intersection') test.intersect(.08)
    else if (lifecycle === 'visibility') test.visible(false)
    else test.window.dispatch('pagehide')
    assert.equal(test.pending(), 0)
    test.advance(10000)
    close(test.distance(), held)
    if (lifecycle === 'intersection') test.intersect()
    else if (lifecycle === 'visibility') test.visible(true)
    else test.window.dispatch('pageshow')
    test.advance(25)
    close(test.distance(), held)
    test.advance(500)
    close(test.distance() - held, 26)
  }
})

check('visibility interruption clears drag, inertia, boost and an unfinished navigation tween', () => {
  const test = start()
  pause(test)
  test.next.dispatch('click'); test.advance(100)
  const held = test.distance()
  test.visible(false); test.advance(1000); test.visible(true)
  close(test.distance(), held)
  assert.equal(test.pending(), 0)
  test.pointer('pointerdown'); test.pointer('pointermove', { clientX: 50 })
  test.intersect(0, false)
  assert.equal(test.capture.size, 0)
  assert.equal(test.root.dataset.portfolioDragging, 'false')
  assert.equal(test.pending(), 0)
  test.intersect()
  assert.equal(test.pending(), 0)
})

check('initial reduced motion skips entrance/autoplay but keeps finite native controls and brand announcements', () => {
  const test = start({ reduced: true })
  assert.equal(test.root.dataset.portfolioReady, 'true', 'Hidden duplicate offset uses the period fallback')
  assert.equal(test.root.dataset.portfolioMotion, 'reduced')
  assert.equal(test.root.dataset.portfolioPlayback, 'paused')
  assert.equal(test.toggle.disabled, true)
  assert.equal(test.next.disabled, false)
  assert.equal(test.toggleLabel.textContent, '자동 흐름 꺼짐')
  assert.equal(test.jobs.length, 0)
  assert.equal(test.pending(), 0)
  assert.equal(test.track.style.transform, undefined)
  test.next.dispatch('click')
  close(test.flow.scrollLeft, 224)
  assert.equal(activeIndex(test), 1)
  assert.equal(test.status.textContent, '2 / 4 — 브랜드 2')
  test.flow.dispatch('scroll')
  assert.equal(activeIndex(test), 1)
  test.flow.scrollLeft = 548; test.flow.dispatch('scroll')
  assert.equal(activeIndex(test), 2)
  test.toggle.dispatch('click'); test.pointer('pointerdown'); test.pointer('pointermove', { clientX: 20 })
  assert.equal(test.capture.size, 0)
  assert.equal(test.pending(), 0)
})

check('changing reduced preference during a gesture cancels entrance jobs and preserves native position', () => {
  const test = start()
  pause(test)
  test.pointer('pointerdown'); test.pointer('pointermove', { clientX: 20 })
  close(test.distance(), 80)
  test.preference(true)
  assert.equal(test.capture.size, 0)
  assert.equal(test.pending(), 0)
  assert.ok(test.jobs.every(job => job.cancelled))
  assert.equal(test.track.style.transform, undefined)
  close(test.flow.scrollLeft, 80)
  const count = test.jobs.length
  test.flow.scrollLeft = 300
  test.preference(false)
  close(test.flow.scrollLeft, 0)
  close(test.distance(), 300)
  assert.equal(test.jobs.length, count, 'Returning from reduced motion must not replay the entrance')
  assert.equal(test.pending(), 0, 'Manual pause must survive the preference change')
})

check('preference change near the cloned cycle uses finite native bounds after the CSS mode update', () => {
  const test = start()
  pause(test)
  test.previous.dispatch('click'); test.advance(520, 20)
  close(test.distance(), 872)
  test.preference(true)
  close(test.flow.scrollLeft, 772)
  assert.equal(test.root.dataset.portfolioMotion, 'reduced')
  assert.equal(test.active().hasAttribute('data-portfolio-duplicate'), false)
})

check('resize preserves the current proportional position, then re-targets the selected card to its new center', () => {
  const test = start()
  pause(test)
  test.next.dispatch('click'); test.advance(260, 20)
  close(test.distance(), 196)
  test.resize({ cardWidth: 600, gap: 48 })
  close(test.distance(), 392)
  test.advance(260, 20)
  close(test.distance(), 616, .03)
  test.advance(260, 20)
  close(test.distance(), 648, .03)
  assert.equal(activeIndex(test), 1)
  assert.equal(test.pending(), 0)
})

check('changing only viewport width during navigation lands on the newly centered selected card', () => {
  const test = start()
  pause(test)
  test.next.dispatch('click'); test.advance(260, 20)
  close(test.distance(), 196)
  test.resize({ width: 700 })
  close(test.distance(), 196)
  test.advance(520, 20)
  close(test.distance(), 124)
  assert.equal(activeIndex(test), 1)
})

check('reduced Home keeps intentional first selection even if viewport center is closest to the second photo', () => {
  const test = start({ reduced: true, width: 1000 })
  assert.equal(activeIndex(test), 1)
  test.key('Home')
  close(test.flow.scrollLeft, 0)
  assert.equal(activeIndex(test), 0)
  test.flow.dispatch('scroll'); test.ready()
  assert.equal(activeIndex(test), 0)
  test.key('ArrowRight')
  assert.equal(test.status.textContent, '2 / 4 — 브랜드 2')
  assert.equal(activeIndex(test), 1)
  test.flow.dispatch('scroll')
  assert.equal(activeIndex(test), 1)
  test.flow.scrollLeft = 272; test.flow.dispatch('scroll')
  assert.equal(activeIndex(test), 2, 'Actual native movement restores center-based inspection')
})

check('a unique single item is a stationary accessible showcase rather than an artificial repeated carousel', async () => {
  for (const reduced of [true, false]) {
    const test = start({ count: 1, reduced, width: 2000 })
    await flush()
    assert.equal(test.root.dataset.portfolioSingle, 'true')
    assert.equal(test.originals().length, 1)
    assert.equal(test.cards().length, 2, 'No extra clones may be appended to a single item')
    assert.equal(test.pending(), 0)
    assert.equal(test.next.disabled, true)
    assert.equal(test.previous.disabled, true)
    assert.equal(test.toggle.disabled, true)
    test.next.dispatch('click'); test.key('ArrowRight')
    test.pointer('pointerdown'); test.pointer('pointermove', { clientX: 20 }); test.pointer('pointerup')
    test.advance(1000)
    assert.equal(test.capture.size, 0)
    assert.equal(test.pending(), 0)
    close(test.distance(), 0)
    assert.equal(test.status.textWrites, 0)
    assert.equal(test.active().hasAttribute('data-portfolio-duplicate'), false)
    if (reduced) assert.equal(test.jobs.length, 0)
    else assert.equal(test.jobs.filter(job => job.element.classList.contains('pf-card-body')).length, 1)
  }
})

check('two and three unique originals stay accessible once while all loop copies remain inert', async () => {
  for (const count of [2, 3]) {
    const test = start({ count, width: 1200 })
    await flush()
    assert.equal(test.root.dataset.portfolioSingle, 'false')
    assert.equal(test.originals().length, count)
    assert.ok(test.originals().every(card => !card.hasAttribute('aria-hidden') && !card.hasAttribute('inert')))
    assert.ok(test.cards().filter(card => card.hasAttribute('data-portfolio-duplicate')).every(card => card.getAttribute('aria-hidden') === 'true' && card.hasAttribute('inert')))
    assert.ok(test.track.scrollWidth >= test.period() + test.flow.clientWidth)
    pause(test)
    test.key('Home'); test.advance(520, 20)
    test.next.dispatch('click'); test.advance(520, 20)
    assert.equal(test.status.textContent, `2 / ${count} — 브랜드 2`)
    assert.equal(activeIndex(test), 1)
  }
})

check('cached rail geometry avoids layout reads on every animation frame and pointer move', () => {
  const test = start()
  const reads = test.metrics.rectReads
  test.advance(1000)
  assert.equal(test.metrics.rectReads, reads)
  test.pointer('pointerdown'); test.pointer('pointermove', { clientX: 40 }); test.pointer('pointerup')
  assert.equal(test.metrics.rectReads, reads)
  test.resize({ width: 700 })
  assert.ok(test.metrics.rectReads > reads)
})

check('wide screens grow only inert duplicate tiles while preserving the original period', async () => {
  const test = harness({ width: 6000 })
  await flush()
  assert.equal(test.originals().length, 4)
  assert.ok(test.track.scrollWidth >= test.period() + test.flow.clientWidth)
  assert.ok(test.cards().length > 8)
  for (const card of test.cards().slice(4)) {
    assert.equal(card.getAttribute('aria-hidden'), 'true')
    assert.equal(card.hasAttribute('inert'), true)
    assert.equal(card.hasAttribute('data-portfolio-duplicate'), true)
  }
  test.intersect(); test.advance(1025)
  close(test.distance(), 52)
  const total = test.cards().length
  test.ready(); await flush()
  assert.equal(test.cards().length, total)
})

check('no IntersectionObserver, no ResizeObserver, legacy media and no WAAPI keep valid fallbacks', () => {
  const test = harness({ observer: false, resizeObserver: false, legacyMedia: true, animations: false })
  assert.equal(test.pending(), 1)
  assert.equal(test.jobs.length, 0)
  test.advance(525)
  close(test.distance(), 26)
  test.resize({ gap: 48 })
  close(test.distance(), 26 * 348 / 324)
  assert.equal(test.window.events.resize[0].options.passive, true)
  test.preference(true)
  assert.equal(test.pending(), 0)
  assert.equal(test.root.dataset.portfolioMotion, 'reduced')
})

check('missing roots or required controls leave all motion and observers uninitialized', () => {
  for (const options of [{ exists: false }, ...['flow', 'track', 'previous', 'next', 'toggle', 'status'].map(missing => ({ missing }))]) {
    const test = harness(options)
    assert.equal(test.root.dataset.portfolioInitialized, undefined)
    assert.equal(test.root.dataset.portfolioReady, undefined)
    assert.equal(test.pending(), 0)
    assert.equal(test.jobs.length, 0)
    assert.equal(test.observations.length, 0)
  }
})

async function renderer(items, preview = true, error = null) {
  const sectionStart = homepage.indexOf('id="homeRefs"')
  const start = homepage.indexOf('(function(){', sectionStart)
  const end = homepage.indexOf('})();', start) + 5
  assert.ok(start > sectionStart && end > start)
  const rendererSource = homepage.slice(start, end)
  const track = new Element('div')
  const dispatched = []
  track.innerHTML = ''
  track.dispatchEvent = event => { dispatched.push({ type: event.type, html: track.innerHTML, bubbles: event.bubbles }); return track.dispatch(event.type, event) }
  const requests = [], errors = []
  vm.runInNewContext(rendererSource, {
    window: {},
    document: { getElementById: id => id === 'refsFlowTrack' ? track : null, querySelector: () => preview ? {} : null },
    fetch: url => { requests.push(url); return error ? Promise.reject(error) : Promise.resolve({ json: () => Promise.resolve({ items }) }) },
    CustomEvent: class { constructor(type, options) { this.type = type; Object.assign(this, options) } },
    console: { error: (...args) => errors.push(args) },
  })
  await flush()
  return { track, requests, errors, dispatched }
}
const item = (brand, rank = undefined) => ({ brand, featuredRank: rank, cover: `/cover-${brand}.jpg`, thumb: `/logo-${brand}.png`, services: '카페 바이럴', link: '/works/example' })

check('the real async renderer preserves featured ranking, eligibility, escaping, and event-after-DOM order', async () => {
  const malicious = { ...item('A<&"\'' , 1), cover: '/cover?x="<&\'', services: '광고 <script> & "\'' }
  const { track, requests, dispatched } = await renderer([item('Not featured'), item('Rank 2', 2), { ...item('No logo', 3), thumb: '' }, malicious])
  assert.deepEqual(requests, ['/api/admin/public/works'])
  assert.equal((track.innerHTML.match(/<article /g) || []).length, 4)
  assert.ok(track.innerHTML.indexOf('A&lt;&amp;&quot;&#39;') < track.innerHTML.indexOf('Rank 2'))
  assert.ok(!track.innerHTML.includes('Not featured'))
  assert.ok(!track.innerHTML.includes('No logo'))
  assert.ok(!track.innerHTML.includes('<script>'))
  assert.ok(track.innerHTML.includes('/cover?x=&quot;&lt;&amp;&#39;'))
  assert.equal((track.innerHTML.match(/data-portfolio-duplicate="true" aria-hidden="true" inert/g) || []).length, 2)
  assert.equal((track.innerHTML.match(/class="pf-card-body"/g) || []).length, 4)
  assert.equal(track.style.getPropertyValue('--dur'), '12s')
  assert.deepEqual(dispatched, [{ type: 'portfolio:ready', html: track.innerHTML, bubbles: true }])
  assert.match(homepage, /track\.innerHTML = html;[\s\S]*?track\.dispatchEvent\(new CustomEvent\('portfolio:ready', \{ bubbles: true \}\)\)/)
})

check('real renderer falls back to eligible first eight and retains the original production card output', async () => {
  const input = Array.from({ length: 12 }, (_, index) => item(`Brand ${index}`))
  input.unshift({ ...item('No cover'), cover: '' })
  const preview = await renderer(input)
  assert.equal((preview.track.innerHTML.match(/<article /g) || []).length, 16)
  assert.ok(!preview.track.innerHTML.includes('Brand 8'))
  const legacy = await renderer([item('Original')], false)
  assert.equal((legacy.track.innerHTML.match(/<article class="refs-flow-card">/g) || []).length, 8)
  assert.ok(legacy.track.innerHTML.includes('class="refs-card-hover"'))
  assert.doesNotMatch(legacy.track.innerHTML, /data-portfolio-|pf-card-body|aria-hidden="true" inert/)
  const failed = await renderer([], true, new Error('offline'))
  assert.equal(failed.track.innerHTML, '')
  assert.equal(failed.errors.length, 1)
})

check('real DEV renderer does not manufacture accessible originals for one, two, or three brands', async () => {
  for (const count of [1, 2, 3]) {
    const test = await renderer(Array.from({ length: count }, (_, index) => item(`Unique ${index}`)))
    assert.equal((test.track.innerHTML.match(/<article /g) || []).length, count * 2)
    assert.equal((test.track.innerHTML.match(/data-portfolio-duplicate="true"/g) || []).length, count)
    for (let index = 0; index < count; index++) assert.equal((test.track.innerHTML.match(new RegExp(`data-portfolio-index="${index}"`, 'g')) || []).length, 2)
    assert.equal(test.dispatched.length, 1)
    assert.equal(test.track.style.getPropertyValue('--dur'), `${count * 6}s`)
  }
})

check('DEV gating, finite reduced native rail, 44px controls, readable no-JS bodies, and vertical touch intent remain explicit', () => {
  assert.match(homepage, /id="homeRefs" data-portfolio-motion=\{import\.meta\.env\.DEV \? 'true' : undefined\}/)
  assert.match(homepage, /import\.meta\.env\.DEV && <link rel="stylesheet" href="\/static\/portfolio-motion-preview\.css"/)
  assert.match(homepage, /import\.meta\.env\.DEV && <script src="\/static\/portfolio-motion-preview\.js" defer/)
  assert.match(homepage, /id="refsFlow" tabindex=\{import\.meta\.env\.DEV \? 0 : undefined\}/)
  assert.match(homepage, /data-pf-status aria-live="polite" aria-atomic="true"/)
  assert.match(stylesheet, /#homeRefs\[data-portfolio-ready="true"\] \.refs-flow\s*\{[^}]*overflow:\s*clip;[^}]*touch-action:\s*pan-y pinch-zoom;/)
  assert.match(stylesheet, /min-width:\s*44px;/)
  assert.match(stylesheet, /min-height:\s*44px;/)
  assert.match(stylesheet, /\.pf-card-body\s*\{[^}]*opacity:\s*1;/)
  assert.match(stylesheet, /#homeRefs\[data-portfolio-motion="reduced"\] \.refs-flow\s*\{[^}]*overflow-x:\s*auto;/)
  assert.match(stylesheet, /#homeRefs\[data-portfolio-motion="reduced"\] \[data-portfolio-duplicate\]\s*\{[^}]*display:\s*none/)
  assert.match(stylesheet, /#homeRefs\[data-portfolio-single="true"\] \.pf-controls,[\s\S]*?#homeRefs\[data-portfolio-single="true"\] \[data-portfolio-duplicate\]\s*\{[^}]*display:\s*none/)
  assert.match(stylesheet, /@media \(prefers-reduced-motion: reduce\)/)
  assert.doesNotMatch(source, /addEventListener\(['"]wheel/)
})

check('production SSR keeps the original portfolio and excludes DEV controller, stylesheet and controls', async () => {
  const workerCode = fs.readFileSync(new URL('../dist/_worker.js', import.meta.url), 'utf8')
  const { default: app } = await import('../dist/_worker.js')
  const response = await app.fetch(new Request('https://preview-check.invalid/'), {})
  const html = await response.text()
  assert.equal(response.status, 200)
  assert.match(html, /<section class="section home-refs-section" id="homeRefs">/)
  assert.match(html, /<div class="refs-flow" id="refsFlow">/)
  assert.ok(html.includes('포트폴리오 전체 보기'))
  assert.doesNotMatch(html, /<[^>]+data-pf-(?:prev|next|toggle|status|reveal)(?:[\s=>])/)
  assert.doesNotMatch(html, /(?:src|href)="\/static\/portfolio-motion-preview\.(?:js|css)"/)
  assert.doesNotMatch(workerCode, /\/static\/portfolio-motion-preview\.(?:js|css)/)
})

let failures = 0
for (const { name, fn } of cases) {
  try { await fn(); console.log(`PASS ${name}`) }
  catch (error) { failures++; console.error(`FAIL ${name}: ${error.message}`) }
}
if (failures) process.exitCode = 1
