import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const previewSource = fs.readFileSync(new URL('../src/routes/home-hero-preview.tsx', import.meta.url), 'utf8')
assert.ok(previewSource.includes('headline: <>저희는 광고만 만드는 회사가 아닌<br /><em>팔리는 이유</em>를<br />만드는 회사입니다.</>'))
console.log('PASS sixth hero headline keeps the requested copy, breaks and blue emphasis')

// The production SSR renderer must keep the original hero, never the DEV preview.
const workerCode = fs.readFileSync(new URL('../dist/_worker.js', import.meta.url), 'utf8')
const { default: app } = await import('../dist/_worker.js')
const response = await app.fetch(new Request('https://preview-check.invalid/'), {})
const html = await response.text()
assert.equal(response.status, 200)
assert.ok(html.includes('id="heroSlider"'))
assert.ok(!html.includes('homeHeroPreview'))
assert.ok(!html.includes('hero-preview-v1.css'))
assert.ok(!workerCode.includes('homeHeroPreview'))
assert.ok(!html.includes('ui-controls-preview'))
assert.ok(!workerCode.includes('ui-controls-preview'))
for (const devOnly of ['service-icons-v2', 'service-icons-preview-v2', 'hsvcIconAsset', 'hsvc-panel--icons', 'hsvcTabIndicator', 'hsvc-tabs--moving', 'hsvc-cta-arrow']) {
  assert.ok(!html.includes(devOnly), `${devOnly} must not enter the production homepage`)
  assert.ok(!workerCode.includes(devOnly), `${devOnly} must be removed from the production renderer`)
}
assert.ok(!html.includes('hsvc-head--editorial'))
assert.ok(!workerCode.includes('hsvc-head--editorial'))
assert.ok(!html.includes('스스로 말하게 하고 검색하게 하고 다시 찾게 하는'))
assert.ok(!workerCode.includes('스스로 말하게 하고 검색하게 하고 다시 찾게 하는'))
assert.ok(html.includes('파는 게 전부일까요?'))
assert.ok(html.includes('스스로 말하게 하고 · 검색하게 하고 · 다시 찾게 하는,'))
assert.ok(!workerCode.includes('motionStudy'))
const studyResponse = await app.fetch(new Request('https://preview-check.invalid/preview/hero-motion'), {})
assert.equal(studyResponse.status, 404)
console.log('PASS production renderer keeps original hero; preview component is removed')

// Exercise the slideshow controller without changing browser/OS motion preferences.
class Node {
  constructor(dataset = {}) {
    this.dataset = dataset
    this.attributes = {}
    this.events = {}
    this.hidden = false
    this.disabled = false
    this.classes = new Set()
    this.classList = {
      add: (name) => this.classes.add(name),
      remove: (name) => this.classes.delete(name),
      contains: (name) => this.classes.has(name),
      toggle: (name, active) => active ? this.classes.add(name) : this.classes.delete(name),
    }
    this.style = { setProperty: (key, value) => { this.attributes[key] = value } }
  }
  setAttribute(key, value) { this.attributes[key] = value }
  getAttribute(key) { return this.attributes[key] }
  addEventListener(name, handler) { this.events[name] = handler }
  dispatch(name, event = {}) { this.events[name]?.(event) }
}
function harness(reduced = false) {
  const root = new Node()
  const frames = Array.from({ length: 6 }, (_, i) => new Node({ frame: String(i) }))
  const copies = Array.from({ length: 6 }, (_, i) => new Node({ copy: String(i), duration: '1000' }))
  const steps = Array.from({ length: 6 }, (_, i) => {
    const step = new Node()
    step.setAttribute('aria-label', `Scene ${i + 1}`)
    return step
  })
  const selectors = Object.fromEntries(['[data-hero-pause]', '.hhp-status', '[data-pause-label]', '[data-pause-icon]', '[data-play-icon]', '[data-hero-prev]', '[data-hero-next]', '.hhp-controls'].map(key => [key, new Node()]))
  root.querySelector = key => selectors[key]
  root.querySelectorAll = key => ({ '[data-frame]': frames, '[data-copy]': copies, '[data-hero-step]': steps }[key])
  const events = {}
  const motion = { matches: reduced, addEventListener: (_, handler) => { events.motion = handler } }
  const document = { hidden: false, getElementById: () => root, addEventListener: (name, handler) => { events[name] = handler } }
  let observer
  let nextId = 0
  const callbacks = new Map()
  const context = {
    document,
    window: { matchMedia: () => motion, addEventListener: (name, handler) => { events[name] = handler }, IntersectionObserver: true },
    IntersectionObserver: class { constructor(fn) { observer = fn } observe() {} },
    requestAnimationFrame: fn => { callbacks.set(++nextId, fn); return nextId },
    cancelAnimationFrame: id => callbacks.delete(id),
    setTimeout: () => 1,
    clearTimeout: () => {},
  }
  vm.runInNewContext(fs.readFileSync(new URL('../public/static/hero-preview-v1.js', import.meta.url), 'utf8'), context)
  return {
    root, frames, copies, steps, selectors, motion, document, events,
    view: visible => observer([{ isIntersecting: visible, intersectionRatio: visible ? 1 : 0 }]),
    tick: now => { const first = callbacks.entries().next().value; if (first) { callbacks.delete(first[0]); first[1](now) } },
  }
}
const test = harness()
assert.equal(test.root.dataset.playback, 'playing')
for (let t = 100; t <= 1200; t += 100) test.tick(t)
assert.equal(test.root.dataset.scene, '2')
test.steps[3].dispatch('click')
assert.equal(test.root.dataset.scene, '4')
assert.equal(test.root.dataset.playback, 'paused')
assert.equal(test.copies.filter(node => node.getAttribute('aria-hidden') === 'false').length, 1)
test.selectors['[data-hero-pause]'].dispatch('click')
assert.equal(test.root.dataset.playback, 'playing')
test.document.hidden = true
test.events.visibilitychange()
assert.equal(test.root.dataset.playback, 'paused')
test.document.hidden = false
test.events.visibilitychange()
assert.equal(test.root.dataset.playback, 'playing')
test.view(false)
assert.equal(test.root.dataset.playback, 'paused')
test.view(true)
assert.equal(test.root.dataset.playback, 'playing')
test.motion.matches = true
test.events.motion()
assert.equal(test.root.dataset.playback, 'paused')
assert.equal(test.selectors['[data-hero-pause]'].disabled, true)
test.selectors['[data-hero-next]'].dispatch('click')
assert.equal(test.root.dataset.scene, '5')
assert.equal(test.root.dataset.playback, 'paused')
const reduced = harness(true)
assert.equal(reduced.root.dataset.scene, '1')
assert.equal(reduced.root.dataset.playback, 'paused')
console.log('PASS autoplay, manual navigation, pause/resume, visibility, viewport exit, reduced motion')
