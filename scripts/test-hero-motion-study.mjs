import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const controller = fs.readFileSync(new URL('../public/static/hero-motion-study.js', import.meta.url), 'utf8')

class Element {
  constructor({ tagName = 'DIV', dataset = {}, rect = {} } = {}) {
    this.tagName = tagName
    this.dataset = dataset
    this.rect = { left: 0, top: 0, width: 1000, height: 600, ...rect }
    this.attributes = new Map()
    this.properties = new Map()
    this.events = new Map()
    this.classes = new Set()
    this.disabled = false
    this.textContent = ''
    this.classList = {
      add: (...names) => names.forEach(name => this.classes.add(name)),
      contains: name => this.classes.has(name),
      toggle: (name, enabled) => {
        if (enabled ?? !this.classes.has(name)) { this.classes.add(name); return true }
        this.classes.delete(name)
        return false
      },
    }
    this.style = {
      setProperty: (name, value) => this.properties.set(name, value),
      getPropertyValue: name => this.properties.get(name) || '',
    }
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)) }
  getAttribute(name) { return this.attributes.get(name) ?? null }
  addEventListener(name, handler) {
    if (!this.events.has(name)) this.events.set(name, [])
    this.events.get(name).push(handler)
  }
  dispatch(name, event = {}) { this.events.get(name)?.forEach(handler => handler(event)) }
  getBoundingClientRect() { return this.rect }
}

function harness({ reduced = false, finePointer = true, intersection = true, hidden = false } = {}) {
  const root = new Element({ dataset: { mode: 'motion' } })
  const hero = new Element()
  const photoWindow = new Element()
  const answer = new Element()
  const pause = new Element({ tagName: 'BUTTON' })
  const label = new Element()
  const stillButton = new Element({ tagName: 'BUTTON', dataset: { mode: 'still' } })
  const motionButton = new Element({ tagName: 'BUTTON', dataset: { mode: 'motion' } })
  stillButton.setAttribute('aria-pressed', 'false')
  motionButton.setAttribute('aria-pressed', 'true')
  const selectors = new Map([
    ['.ms-hero', hero], ['.ms-photo-window', photoWindow], ['.ms-answer', answer],
    ['[data-pause]', pause], ['[data-playback-label]', label],
  ])
  root.querySelector = selector => selectors.get(selector)
  const document = new Element()
  document.hidden = hidden
  document.getElementById = id => id === 'motionStudy' ? root : null
  document.querySelectorAll = selector => selector === '[data-mode]' ? [stillButton, motionButton, root] : []
  const reducedMedia = new Element()
  reducedMedia.matches = reduced
  const pointerMedia = new Element()
  pointerMedia.matches = finePointer
  const window = new Element()
  window.matchMedia = query => query.includes('prefers-reduced-motion') ? reducedMedia : pointerMedia
  const observers = []
  class Observer {
    constructor(callback, options) {
      this.callback = callback
      this.options = options
      this.targets = new Set()
      this.disconnected = false
      observers.push(this)
    }
    observe(target) { this.targets.add(target) }
    disconnect() { this.disconnected = true; this.targets.clear() }
    notify(target, isIntersecting) {
      if (!this.disconnected && this.targets.has(target)) {
        this.callback([{ target, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 }])
      }
    }
  }
  if (intersection) window.IntersectionObserver = Observer
  let nextFrame = 0
  const callbacks = new Map()
  const context = {
    document, window,
    requestAnimationFrame: callback => { callbacks.set(++nextFrame, callback); return nextFrame },
    cancelAnimationFrame: id => callbacks.delete(id),
  }
  if (intersection) context.IntersectionObserver = Observer
  vm.runInNewContext(controller, context, { filename: 'hero-motion-study.js' })
  return {
    root, hero, photoWindow, answer, pause, label, stillButton, motionButton, document,
    pendingFrames: () => callbacks.size,
    flush: () => {
      const pending = [...callbacks]
      callbacks.clear()
      pending.forEach(([, callback]) => callback(0))
    },
    scroll: () => window.dispatch('scroll'),
    setHidden: hiddenValue => { document.hidden = hiddenValue; document.dispatch('visibilitychange') },
    setReduced: enabled => { reducedMedia.matches = enabled; reducedMedia.dispatch('change') },
    viewHero: visible => observers.forEach(observer => observer.notify(hero, visible)),
    viewAnswer: visible => observers.forEach(observer => observer.notify(answer, visible)),
    answerObserver: () => observers.find(observer => observer.options.threshold === .25),
  }
}

function playing(test, expected, active = expected) {
  assert.equal(test.root.classList.contains('is-playing'), expected)
  assert.equal(test.root.classList.contains('is-active'), active)
  assert.equal(test.pause.getAttribute('aria-pressed'), String(!expected))
}

{
  const test = harness()
  assert.ok(test.root.classList.contains('ms-ready'))
  playing(test, true)
  assert.equal(test.pause.disabled, false)
  assert.equal(test.pause.getAttribute('aria-label'), '모션 일시정지')
  assert.equal(test.label.textContent, '모션 재생 중')
  assert.equal(test.pendingFrames(), 1)
  test.flush()
  assert.equal(test.root.style.getPropertyValue('--pointer-x'), '0px')
  assert.equal(test.root.style.getPropertyValue('--image-y'), '0px')

  test.hero.dispatch('pointermove', { clientX: 1000 })
  test.flush()
  assert.equal(test.root.style.getPropertyValue('--pointer-x'), '6px')
  test.pause.dispatch('click')
  playing(test, false)
  assert.equal(test.label.textContent, '모션 일시정지')
  assert.equal(test.pause.getAttribute('aria-label'), '모션 재생')
  assert.equal(test.pendingFrames(), 0)
  test.hero.dispatch('pointerleave')
  assert.equal(test.pendingFrames(), 0)
  assert.equal(test.root.style.getPropertyValue('--pointer-x'), '6px', 'Pause freezes the visible photograph')
  test.pause.dispatch('click')
  playing(test, true)
  assert.equal(test.pendingFrames(), 1, 'Resume schedules an update without requiring a new pointer event')
  test.flush()
  assert.equal(test.root.style.getPropertyValue('--pointer-x'), '0px', 'Resume resets a pointer that left during pause')
  console.log('PASS initial playback, pause/resume, and stale pointer reset')
}

{
  const test = harness()
  test.hero.rect.top = -400
  test.hero.dispatch('pointermove', { clientX: 750 })
  test.flush()
  test.stillButton.dispatch('click')
  playing(test, false)
  assert.equal(test.root.dataset.mode, 'still')
  assert.equal(test.pause.disabled, true)
  assert.equal(test.label.textContent, '정지 화면')
  assert.equal(test.stillButton.getAttribute('aria-pressed'), 'true')
  assert.equal(test.motionButton.getAttribute('aria-pressed'), 'false')
  assert.equal(test.root.style.getPropertyValue('--pointer-x'), '0px')
  assert.equal(test.root.style.getPropertyValue('--image-y'), '0px')
  assert.equal(test.pendingFrames(), 0)
  test.motionButton.dispatch('click')
  playing(test, true)
  assert.equal(test.root.dataset.mode, 'motion')
  assert.equal(test.pause.disabled, false)
  assert.equal(test.motionButton.getAttribute('aria-pressed'), 'true')
  assert.equal(test.stillButton.getAttribute('aria-pressed'), 'false')
  test.pause.dispatch('click')
  playing(test, false)
  test.stillButton.dispatch('click')
  test.motionButton.dispatch('click')
  playing(test, true, true)
  console.log('PASS still/motion comparison and explicit mode playback reset')
}

{
  const test = harness({ reduced: true })
  playing(test, false)
  assert.equal(test.pause.disabled, true)
  assert.equal(test.label.textContent, '동작 줄이기 적용')
  assert.equal(test.pendingFrames(), 0)
  test.hero.dispatch('pointermove', { clientX: 1000 })
  test.scroll()
  assert.equal(test.pendingFrames(), 0)
  assert.equal(test.root.style.getPropertyValue('--pointer-x'), '0px')
  test.setReduced(false)
  playing(test, true)
  assert.equal(test.pause.disabled, false)
  assert.equal(test.pendingFrames(), 1)
  test.setReduced(true)
  playing(test, false)
  assert.equal(test.pendingFrames(), 0)
  test.stillButton.dispatch('click')
  test.setReduced(false)
  playing(test, false)
  assert.equal(test.label.textContent, '정지 화면', 'Device preference changes do not override explicit still mode')
  console.log('PASS initial and changing reduced-motion preferences')
}

{
  const test = harness()
  test.setHidden(true)
  playing(test, false)
  assert.equal(test.pendingFrames(), 0)
  test.setHidden(false)
  playing(test, true)
  assert.equal(test.pendingFrames(), 1)
  test.viewHero(false)
  playing(test, false, true)
  assert.equal(test.pendingFrames(), 0)
  test.viewHero(true)
  playing(test, true)
  assert.equal(test.pendingFrames(), 1)
  test.pause.dispatch('click')
  test.setHidden(true)
  test.setHidden(false)
  test.viewHero(false)
  test.viewHero(true)
  playing(test, false)
  assert.equal(test.pendingFrames(), 0, 'Background and viewport changes preserve manual pause')
  const hidden = harness({ hidden: true })
  playing(hidden, false)
  assert.equal(hidden.pendingFrames(), 0)
  console.log('PASS background and viewport suspension preserve manual pause')
}

{
  const test = harness()
  assert.equal(test.answer.classList.contains('is-in'), false)
  test.viewAnswer(false)
  assert.equal(test.answer.classList.contains('is-in'), false)
  test.pause.dispatch('click')
  test.viewAnswer(true)
  assert.equal(test.answer.classList.contains('is-in'), true)
  assert.equal(test.answerObserver().disconnected, true)
  playing(test, false)
  test.pause.dispatch('click')
  test.viewHero(false)
  playing(test, false, true)
  assert.equal(test.answer.classList.contains('is-in'), true, 'Answer reveal remains available after the hero leaves view')
  const fallback = harness({ intersection: false })
  assert.equal(fallback.answer.classList.contains('is-in'), true)
  console.log('PASS one-time answer reveal, pause gating state, and observer fallback')
}

{
  const test = harness()
  test.hero.rect.top = -1000
  for (const height of [40, 320, 600, 1200]) {
    test.photoWindow.rect.height = height
    test.scroll()
    test.flush()
    const shift = parseFloat(test.root.style.getPropertyValue('--image-y'))
    const maxSafeShift = Math.max(0, height * .0275 - 2)
    assert.ok(shift >= 0 && shift <= 24 && shift <= maxSafeShift, `${height}px photo stays inside its overscan`)
  }
  test.photoWindow.rect.height = 600
  test.hero.rect.top = -50
  test.scroll()
  test.flush()
  assert.equal(test.root.style.getPropertyValue('--image-y'), '3px')
  test.hero.rect.top = 100
  test.scroll()
  test.flush()
  assert.equal(test.root.style.getPropertyValue('--image-y'), '0px')
  const coarse = harness({ finePointer: false })
  coarse.flush()
  coarse.hero.dispatch('pointermove', { clientX: 1000 })
  assert.equal(coarse.pendingFrames(), 0)
  assert.equal(coarse.root.style.getPropertyValue('--pointer-x'), '0px')
  console.log('PASS photo overscan bounds, scroll displacement, and coarse pointer handling')
}
