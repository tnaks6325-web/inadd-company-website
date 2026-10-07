import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source = fs.readFileSync(new URL('../public/static/hero-refined-preview.js', import.meta.url), 'utf8')
const component = fs.readFileSync(new URL('../src/routes/home-hero-refined.tsx', import.meta.url), 'utf8')
const homepage = fs.readFileSync(new URL('../src/routes/home.tsx', import.meta.url), 'utf8')
const routes = fs.readFileSync(new URL('../src/index.tsx', import.meta.url), 'utf8')
const original = fs.readFileSync(new URL('../src/routes/home-hero-preview.tsx', import.meta.url), 'utf8')
const stylesheet = fs.readFileSync(new URL('../public/static/hero-refined-preview.css', import.meta.url), 'utf8')
const durations = [8500, 7000, 7000, 8500, 7000, 7000]
const labels = ['팔리는 이유를 만드는 회사', '보고서와 매출', '답을 기다리는 순간', '익숙한 패턴', '고객이 망설이는 이유를 듣다', '관심이 실제 구매로 이어지다']
const flush = async () => { for (let index = 0; index < 24; index++) await Promise.resolve() }

function deferred() {
  let resolve, reject
  const promise = new Promise((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

class Element {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase()
    this.dataset = {}
    this.attributes = {}
    this.events = {}
    this.children = []
    this.parentNode = null
    this.hidden = false
    this.disabled = false
    this.textContent = ''
    this.classes = new Set()
    this.classList = {
      contains: name => this.classes.has(name),
      add: (...names) => names.forEach(name => this.classes.add(name)),
      remove: (...names) => names.forEach(name => this.classes.delete(name)),
      toggle: (name, active) => active ? this.classes.add(name) : this.classes.delete(name),
    }
    this.style = {
      setProperty(key, value) { this[key] = String(value) },
      getPropertyValue(key) { return this[key] || '' },
      removeProperty(key) { delete this[key] },
    }
  }
  appendChild(node) { node.parentNode = this; this.children.push(node); return node }
  setAttribute(key, value) {
    this.attributes[key] = String(value)
    if (key.startsWith('data-')) this.dataset[key.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = String(value)
  }
  getAttribute(key) { return this.attributes[key] ?? null }
  addEventListener(name, handler) { (this.events[name] ||= []).push(handler) }
  dispatch(name, event = {}) { (this.events[name] || []).forEach(handler => handler({ target: this, ...event })) }
  matches(selector) {
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1))
    const attribute = selector.match(/^\[([^\]]+)\]$/)
    return attribute ? this.getAttribute(attribute[1]) !== null : this.tagName.toLowerCase() === selector.toLowerCase()
  }
  querySelectorAll(selector) { return this.children.flatMap(node => [...(node.matches(selector) ? [node] : []), ...node.querySelectorAll(selector)]) }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null }
  contains(node) { return node === this || this.children.some(child => child.contains(node)) }
  focus() { this.focused = true }
}

function harness({ reduced = false, animations = true, observer = true, hidden = false, legacyMedia = false, exists = true, frameCount = 6, copyCount = 6, stepCount = 6, missingPause = false, missingStatus = false } = {}) {
  const root = new Element('section')
  const allNodes = [root]
  function node(tag, classes, attrs = {}) {
    const element = new Element(tag)
    if (classes) element.classList.add(...classes.split(' '))
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value))
    allNodes.push(element)
    return element
  }
  const frames = Array.from({ length: frameCount }, (_, index) => {
    const frame = node('div', `hhr-frame${index === 0 ? ' is-active' : ''}`, { 'data-refined-frame': index })
    const photo = node('img', 'hhr-photo')
    photo.src = `/static/hero-preview-v1/scene-${index}.webp`
    frame.appendChild(photo)
    root.appendChild(frame)
    return frame
  })
  const copies = Array.from({ length: copyCount }, (_, index) => {
    const copy = node('div', `hhr-copy${index === 0 ? ' is-active' : ''}`, { 'data-refined-copy': index, 'data-duration': durations[index], 'aria-hidden': String(index !== 0) })
    const eyebrow = node('p', 'hhr-eyebrow', { 'data-refined-part': 'eyebrow' })
    eyebrow.textContent = 'IN AD COMPANY'
    copy.appendChild(eyebrow)
    if (index === 0) {
      const lead = node('p', 'hhr-statement-lead', { 'data-refined-part': 'lead', 'aria-hidden': 'true' })
      lead.textContent = '저희는 광고만 만드는 회사가 아닌'
      copy.appendChild(lead)
    }
    if (index === 3) {
      const quotes = node('div', 'hhr-quotes')
      for (let order = 0; order < 4; order++) {
        const quote = node('p', '', { 'data-refined-part': 'quote', 'data-refined-order': order })
        quote.textContent = `인용 문구 ${order}`
        quotes.appendChild(quote)
      }
      copy.appendChild(quotes)
    }
    const heading = node(index === 0 ? 'h1' : 'h2', 'hhr-headline', { 'aria-label': index === 0 ? '저희는 광고만 만드는 회사가 아닌 팔리는 이유를 만드는 회사입니다.' : labels[index] })
    const count = index === 1 || index === 5 ? 3 : 2
    for (let order = 0; order < count; order++) {
      const mask = node('span', 'hhr-line', { 'aria-hidden': 'true' })
      const part = node('span', 'hhr-line-part', { 'data-refined-part': 'title', 'data-refined-order': order })
      part.textContent = index === 0 ? ['팔리는 이유를', '만드는 회사입니다.'][order] : `제목 ${index} 줄 ${order}`
      mask.appendChild(part)
      heading.appendChild(mask)
    }
    copy.appendChild(heading)
    const support = node('p', 'hhr-support', { 'data-refined-part': 'support' })
    support.textContent = `설명 ${index}`
    copy.appendChild(support)
    root.appendChild(copy)
    return copy
  })
  const actions = node('div', 'hhr-actions')
  const discover = node('a', 'hhr-discover')
  discover.href = '#homeAnswer'
  const services = node('a', 'hhr-services')
  services.href = '#services'
  actions.appendChild(discover)
  actions.appendChild(services)
  root.appendChild(actions)
  const controls = node('nav', 'hhr-controls')
  const prev = node('button', '', { 'data-refined-prev': '' })
  const next = node('button', '', { 'data-refined-next': '' })
  controls.appendChild(prev)
  const steps = Array.from({ length: stepCount }, (_, index) => {
    const step = node('button', '', { 'data-refined-step': index, 'aria-label': `${index + 1}번째 장면: ${labels[index]}`, 'aria-current': String(index === 0) })
    controls.appendChild(step)
    return step
  })
  controls.appendChild(next)
  const pause = node('button', '', { 'data-refined-pause': '' })
  const pauseLabel = node('span', '', { 'data-refined-pause-label': '' })
  const pauseIcon = node('span', '', { 'data-refined-pause-icon': '' })
  const playIcon = node('span', '', { 'data-refined-play-icon': '' })
  pause.appendChild(pauseLabel)
  pause.appendChild(pauseIcon)
  pause.appendChild(playIcon)
  if (!missingPause) controls.appendChild(pause)
  root.appendChild(controls)
  const status = node('p', 'hhr-status', { 'aria-live': 'off', 'aria-atomic': 'true' })
  if (!missingStatus) root.appendChild(status)
  const label = node('p', 'hhr-scene-label')
  root.appendChild(label)
  const allAnimations = [], observations = [], callbacks = new Map(), documentEvents = {}, windowEvents = {}
  let nextFrame = 0, currentTime = 0, mediaHandler
  const motion = { matches: reduced }
  if (legacyMedia) motion.addListener = callback => { mediaHandler = callback }
  else motion.addEventListener = (_, callback) => { mediaHandler = callback }
  function animate(element, keyframes, options) {
    const completion = deferred()
    const animation = {
      element, keyframes, options, finished: completion.promise, cancelled: false, done: false, playState: 'running',
      kind: element.classList.contains('hhr-photo') ? 'photo' : keyframes.at(-1).opacity === 0 ? 'exit' : 'entrance',
      current: { opacity: keyframes[0].opacity, transform: keyframes[0].transform },
      pause() { this.playState = 'paused' }, play() { this.playState = 'running' },
      cancel() { this.cancelled = true; completion.reject(new Error('cancelled')) },
      finish() { this.done = true; this.playState = 'finished'; this.current = { ...keyframes.at(-1) }; completion.resolve() },
      sample(pose) { Object.assign(this.current, pose) },
    }
    allAnimations.push(animation)
    return animation
  }
  if (animations) allNodes.forEach(element => { element.animate = (keyframes, options) => animate(element, keyframes, options) })
  function computed(element) {
    const animation = allAnimations.findLast(item => item.element === element && !item.cancelled)
    const scene = element.classList.contains('hhr-frame') || element.classList.contains('hhr-copy')
    const defaultOpacity = scene && !element.classList.contains('is-active') && !element.classList.contains('is-leaving') ? 0 : 1
    return {
      opacity: String(animation?.current.opacity ?? element.style.opacity ?? defaultOpacity),
      transform: animation?.current.transform ?? element.style.transform ?? (element.classList.contains('hhr-photo') ? 'scale(1.03)' : 'none'),
    }
  }
  const document = { hidden, getElementById: id => id === 'homeHeroRefined' && exists ? root : null, addEventListener: (name, callback) => { documentEvents[name] = callback } }
  const window = { matchMedia: () => motion, addEventListener: (name, callback) => { windowEvents[name] = callback } }
  const context = {
    document, window, getComputedStyle: computed,
    requestAnimationFrame: callback => { callbacks.set(++nextFrame, callback); return nextFrame },
    cancelAnimationFrame: id => callbacks.delete(id),
  }
  if (observer) {
    window.IntersectionObserver = true
    context.IntersectionObserver = class {
      constructor(callback, options) { this.record = { callback, options }; observations.push(this.record) }
      observe(element) { this.record.element = element }
    }
  }
  vm.runInNewContext(source, context)
  function tick(time) {
    currentTime = time
    const pending = [...callbacks]
    callbacks.clear()
    pending.forEach(([, callback]) => callback(time))
    assert.ok(callbacks.size <= 1, 'Only one autoplay RAF may be scheduled')
  }
  return {
    root, frames, photos: frames.map(frame => frame.querySelector('.hhr-photo')), copies, steps, actions, discover, services, controls, pause, pauseLabel, pauseIcon, playIcon, status, label, allAnimations, observations,
    pending: kind => allAnimations.filter(animation => !animation.cancelled && !animation.done && (!kind || animation.kind === kind)),
    pendingFrames: () => callbacks.size,
    visible: (value, ratio = value ? 1 : 0) => observations[0].callback([{ isIntersecting: value, intersectionRatio: ratio }]),
    hide: value => { document.hidden = value; documentEvents.visibilitychange?.() },
    page: name => windowEvents[name]?.(),
    motion: async value => { motion.matches = value; mediaHandler?.(); await flush() },
    click: index => steps[index].dispatch('click'), next: () => next.dispatch('click'), prev: () => prev.dispatch('click'), togglePause: () => pause.dispatch('click'),
    focusIn: () => root.dispatch('focusin'), focusOut: relatedTarget => root.dispatch('focusout', { relatedTarget }),
    key: key => { let prevented = false; controls.dispatch('keydown', { key, preventDefault() { prevented = true } }); return prevented },
    tick,
    advance: ms => { const end = currentTime + ms; while (currentTime < end) tick(Math.min(currentTime + 100, end)) },
    finish: async (kind = 'all') => { allAnimations.filter(animation => !animation.cancelled && !animation.done && (kind === 'all' || (kind === 'cohort' ? animation.kind !== 'photo' : animation.kind === kind))).forEach(animation => animation.finish()); await flush() },
    reload: () => vm.runInNewContext(source, context),
  }
}

function assertScene(test, scene) {
  assert.equal(test.root.dataset.scene, String(scene + 1))
  assert.equal(test.frames.filter(frame => frame.classList.contains('is-active')).length, 1)
  assert.equal(test.frames[scene].classList.contains('is-active'), true)
  assert.equal(test.copies.filter(copy => copy.getAttribute('aria-hidden') === 'false').length, 1)
  assert.equal(test.copies[scene].getAttribute('aria-hidden'), 'false')
  assert.equal(test.steps.filter(step => step.getAttribute('aria-current') === 'true').length, 1)
  assert.equal(test.steps[scene].getAttribute('aria-current'), 'true')
}
function assertStatic(test) {
  assert.equal(test.root.dataset.phase, 'settled')
  test.frames.concat(test.photos, test.copies, test.actions).forEach(element => {
    assert.equal(element.style.opacity, undefined)
    assert.equal(element.style.transform, undefined)
  })
  test.copies.forEach(copy => copy.querySelectorAll('[data-refined-part]').forEach(element => {
    assert.equal(element.style.opacity, undefined); assert.equal(element.style.transform, undefined)
  }))
}
async function settled(test) { if (test.observations.length) test.visible(true); await test.finish('cohort') }
const cases = []
function check(name, fn) { cases.push({ name, fn }) }

check('promise-first scene initializes once, remains the only accessible slide and waits for view', async () => {
  const test = harness()
  assert.equal(test.root.dataset.initialized, 'true')
  assert.equal(test.root.dataset.phase, 'enter')
  assert.equal(test.root.dataset.motion, 'full')
  assert.equal(test.root.dataset.playback, 'paused')
  assertScene(test, 0)
  assert.equal(test.status.getAttribute('aria-live'), 'off')
  assert.equal(test.pendingFrames(), 0)
  assert.equal(test.pending().every(animation => animation.playState === 'paused'), true)
  assert.equal(test.observations[0].element, test.root)
  assert.equal(test.observations[0].options.threshold.join(','), '0,0.15')
  test.reload()
  assert.equal(test.observations.length, 1)
  assert.equal(test.steps[0].events.click.length, 1)
  test.visible(true, .14)
  assert.equal(test.root.dataset.playback, 'paused')
  test.visible(true, .15)
  assert.equal(test.root.dataset.playback, 'playing')
  assert.equal(test.pendingFrames(), 1)
})

check('entrance has restrained finite tracks, ordered title lines, preserved first photograph and static shared links', async () => {
  const test = harness({ observer: false })
  const frame = test.pending().find(animation => animation.element === test.frames[0])
  assert.equal(frame.keyframes[0].opacity, .72, 'The SSR first image is not dropped to a blank zero-opacity frame')
  assert.equal(frame.options.duration, 760)
  const title = test.pending().filter(animation => animation.element.dataset.refinedPart === 'title')
  assert.equal(title.length, 2)
  assert.equal(title[0].options.duration, 720)
  assert.equal(title[0].options.delay, 180)
  assert.equal(title[1].options.delay, 270)
  const support = test.pending().find(animation => animation.element.dataset.refinedPart === 'support')
  assert.equal(support.options.delay, 570)
  const actions = test.pending().find(animation => animation.element === test.actions)
  assert.equal(actions.options.duration, 440)
  assert.equal(actions.options.delay, 660)
  const photo = test.pending('photo')[0]
  assert.equal(photo.options.duration, 7000)
  assert.equal(photo.keyframes.at(-1).transform, 'scale(1.035) translate3d(0,0,0)')
  test.pending().forEach(animation => {
    assert.equal(animation.options.iterations, undefined)
    assert.equal(animation.options.fill, 'both')
    animation.keyframes.forEach(frame => { for (const key of ['width', 'height', 'left', 'top']) assert.equal(frame[key], undefined) })
  })
  assert.equal(test.discover.href, '#homeAnswer')
  assert.equal(test.services.href, '#services')
})

check('full text and crossfade cohort settles without waiting for or replaying finite photo drift', async () => {
  const test = harness({ observer: false })
  const cohort = test.pending().filter(animation => animation.kind !== 'photo')
  cohort.slice(0, -1).forEach(animation => animation.finish())
  await flush()
  assert.equal(test.root.dataset.phase, 'enter')
  cohort.at(-1).finish()
  await flush()
  assert.equal(test.root.dataset.phase, 'settled')
  assert.equal(test.pending('photo').length, 1)
  const photo = test.pending('photo')[0]
  photo.finish()
  await flush()
  test.hide(true); test.hide(false)
  assert.equal(photo.playState, 'finished')
  assert.equal(photo.cancelled, false, 'Finished camera pose stays filled until changing scenes')
})

check('RAF duration drives one automatic scene transition and never announces automatic changes', async () => {
  const test = harness({ observer: false })
  await test.finish('cohort')
  test.tick(100)
  test.advance(8400)
  assertScene(test, 0)
  assert.equal(test.root.style.getPropertyValue('--refined-progress'), (8400 / 8500).toFixed(4))
  test.advance(100)
  assertScene(test, 1)
  assert.equal(test.root.dataset.playback, 'playing')
  assert.equal(test.status.getAttribute('aria-live'), 'off')
  assert.equal(test.root.style.getPropertyValue('--refined-progress'), '0.0000')
  assert.equal(test.pendingFrames(), 1)
})

check('manual navigation pauses only autoplay and camera; text entrance completes for readability', async () => {
  const test = harness()
  await settled(test)
  test.click(3)
  assertScene(test, 3)
  assert.equal(test.root.dataset.playback, 'paused')
  assert.equal(test.root.dataset.phase, 'transition')
  assert.equal(test.pendingFrames(), 0)
  assert.equal(test.status.getAttribute('aria-live'), 'polite')
  assert.equal(test.pending('photo').every(animation => animation.playState === 'paused'), true)
  assert.equal(test.pending('entrance').every(animation => animation.playState === 'running'), true)
  await test.finish('cohort')
  assert.equal(test.root.dataset.phase, 'settled')
  assert.equal(test.frames.filter(frame => frame.classList.contains('is-leaving')).length, 0)
  assert.equal(test.discover.href, '#homeAnswer')
  assert.equal(test.services.href, '#services')
  assert.equal(test.pending().filter(animation => animation.element === test.actions).length, 0, 'Shared native CTA does not reanimate or change for each scene')
  test.togglePause()
  assert.equal(test.root.dataset.playback, 'playing')
  assert.equal(test.status.getAttribute('aria-live'), 'off')
  assert.equal(test.pending('photo').every(animation => animation.playState === 'running'), true)
})

check('rapid manual selection snapshots current image and copy poses, cancels old jobs and latest wins', async () => {
  const test = harness({ observer: false })
  await test.finish('cohort')
  test.click(2)
  const old = test.pending()
  const image = old.find(animation => animation.element === test.frames[2])
  const title = old.find(animation => animation.element.dataset.refinedPart === 'title')
  image.sample({ opacity: .43, transform: 'translate3d(6px,0,0)' })
  title.sample({ opacity: .28, transform: 'translate3d(0,54%,0)' })
  test.click(5)
  assert.equal(old.every(animation => animation.cancelled), true)
  assertScene(test, 5)
  assert.equal(test.frames[2].classList.contains('is-leaving'), true)
  assert.equal(test.frames[0].classList.contains('is-leaving'), false)
  assert.equal(Number(test.frames[2].style.opacity), .43)
  assert.equal(test.frames[2].style.transform, 'translate3d(6px,0,0)')
  assert.equal(Number(title.element.style.opacity), .28)
  assert.equal(title.element.style.transform, 'translate3d(0,54%,0)')
  const outgoing = test.pending('exit').find(animation => animation.element === test.frames[2])
  assert.equal(Number(outgoing.keyframes[0].opacity), .43)
  old.forEach(animation => animation.finish())
  await flush()
  assert.equal(test.root.dataset.phase, 'transition')
  assertScene(test, 5)
  await test.finish('cohort')
  assert.equal(test.root.dataset.phase, 'settled')
  assert.equal(test.frames.filter(frame => frame.classList.contains('is-leaving')).length, 0)
  assert.equal(test.frames[2].style.opacity, undefined)
  assert.equal(test.frames[2].style.transform, undefined)
})

check('same-scene manual replay keeps one active image, no leaving scene and no shared CTA reset', async () => {
  const test = harness({ observer: false })
  await test.finish('cohort')
  test.click(0)
  assertScene(test, 0)
  assert.equal(test.frames.filter(frame => frame.classList.contains('is-leaving')).length, 0)
  assert.equal(test.root.dataset.playback, 'paused')
  assert.equal(test.pending().filter(animation => animation.element === test.actions).length, 0)
  await test.finish('cohort')
  assert.equal(test.root.dataset.phase, 'settled')
})

check('keyboard arrows wrap, Home and End focus selected steps and unhandled keys remain native', async () => {
  const test = harness({ reduced: true, observer: false })
  assert.equal(test.key('ArrowLeft'), true)
  assertScene(test, 5)
  assert.equal(test.steps[5].focused, true)
  assert.equal(test.key('ArrowRight'), true)
  assertScene(test, 0)
  assert.equal(test.key('End'), true)
  assertScene(test, 5)
  assert.equal(test.key('Home'), true)
  assertScene(test, 0)
  assert.equal(test.steps[0].focused, true)
  assert.equal(test.key('Tab'), false)
  assert.equal(test.root.dataset.playback, 'paused')
  assert.equal(test.allAnimations.length, 0)
})

check('focus pauses camera and clock while preserving text entrance; leaving respects explicit pause', async () => {
  const test = harness({ observer: false })
  test.tick(100)
  test.advance(800)
  const progress = test.root.style.getPropertyValue('--refined-progress')
  test.focusIn()
  assert.equal(test.root.dataset.playback, 'paused')
  assert.equal(test.pending('photo')[0].playState, 'paused')
  assert.equal(test.pending('entrance').every(animation => animation.playState === 'running'), true)
  test.advance(10000)
  assert.equal(test.root.style.getPropertyValue('--refined-progress'), progress)
  test.focusOut(test.discover)
  assert.equal(test.root.dataset.playback, 'paused', 'Moving focus inside the hero cannot restart autoplay')
  test.focusOut(null)
  assert.equal(test.root.dataset.playback, 'playing')
  test.advance(100)
  assert.equal(test.root.style.getPropertyValue('--refined-progress'), progress, 'Resuming establishes a new timestamp, not a hidden elapsed-time jump')
  test.togglePause()
  test.focusIn(); test.focusOut(null)
  assert.equal(test.root.dataset.playback, 'paused', 'Focus changes cannot override explicit user pause')
  test.focusIn(); test.togglePause()
  assert.equal(test.root.dataset.playback, 'playing', 'Explicit play can resume while its control remains focused')
})

check('viewport, document and page lifecycle pause all unfinished motion and conserve autoplay progress', async () => {
  const test = harness()
  test.visible(true)
  test.tick(100); test.advance(600)
  const progress = test.root.style.getPropertyValue('--refined-progress')
  test.visible(false)
  assert.equal(test.pending().every(animation => animation.playState === 'paused'), true)
  test.advance(10000)
  assert.equal(test.root.style.getPropertyValue('--refined-progress'), progress)
  test.hide(true); test.hide(false)
  assert.equal(test.root.dataset.playback, 'paused')
  test.visible(true)
  assert.equal(test.root.dataset.playback, 'playing')
  test.advance(100)
  assert.equal(test.root.style.getPropertyValue('--refined-progress'), progress)
  test.page('pagehide')
  assert.equal(test.root.dataset.playback, 'paused')
  assert.equal(test.pending().every(animation => animation.playState === 'paused'), true)
  test.page('pageshow')
  assert.equal(test.root.dataset.playback, 'playing')
  test.togglePause()
  test.hide(true); test.hide(false); test.visible(false); test.visible(true); test.page('pagehide'); test.page('pageshow')
  assert.equal(test.root.dataset.playback, 'paused')
  assert.equal(test.pendingFrames(), 0)
})

check('initial hidden document and no IntersectionObserver do not create a background autoplay clock', async () => {
  const hidden = harness({ hidden: true, observer: false })
  assert.equal(hidden.root.dataset.playback, 'paused')
  assert.equal(hidden.pendingFrames(), 0)
  assert.equal(hidden.pending().every(animation => animation.playState === 'paused'), true)
  hidden.hide(false)
  assert.equal(hidden.root.dataset.playback, 'playing')
  assert.equal(hidden.pendingFrames(), 1)
})

check('reduced motion and missing WAAPI select complete static scenes without autoplay', async () => {
  for (const options of [{ reduced: true }, { animations: false }, { reduced: true, observer: false }]) {
    const test = harness(options)
    assertScene(test, 0)
    assert.equal(test.root.dataset.motion, 'reduced')
    assert.equal(test.root.dataset.playback, 'paused')
    assert.equal(test.pause.disabled, true)
    assert.equal(test.pauseLabel.textContent, '모션 꺼짐')
    assert.equal(test.pendingFrames(), 0)
    assert.equal(test.allAnimations.length, 0)
    assertStatic(test)
    if (test.observations.length) test.visible(true)
    test.next()
    assertScene(test, 1)
    assertStatic(test)
    assert.equal(test.pendingFrames(), 0)
  }
})

check('reduced motion mid-transition cancels stale cohorts and preserves the latest complete scene', async () => {
  const test = harness({ observer: false, legacyMedia: true })
  test.click(4)
  const old = test.pending()
  const animationsBefore = test.allAnimations.length
  await test.motion(true)
  assert.equal(old.every(animation => animation.cancelled), true)
  assertScene(test, 4)
  assertStatic(test)
  assert.equal(test.pendingFrames(), 0)
  assert.equal(test.pause.disabled, true)
  old.forEach(animation => animation.finish())
  await flush()
  assertStatic(test)
  await test.motion(false)
  assert.equal(test.root.dataset.motion, 'full')
  assert.equal(test.root.dataset.playback, 'paused')
  assert.equal(test.allAnimations.length, animationsBefore)
  test.togglePause()
  assert.equal(test.root.dataset.playback, 'playing')
})

check('pause control exposes accurate user intent, labels and mutually exclusive icons', async () => {
  const test = harness({ observer: false })
  assert.equal(test.pause.getAttribute('aria-pressed'), 'false')
  assert.equal(test.pauseLabel.textContent, '일시정지')
  assert.equal(test.pauseIcon.hidden, false)
  assert.equal(test.playIcon.hidden, true)
  test.togglePause()
  assert.equal(test.pause.getAttribute('aria-pressed'), 'true')
  assert.equal(test.pause.getAttribute('aria-label'), '자동 전환 재생')
  assert.equal(test.pauseLabel.textContent, '재생')
  assert.equal(test.pauseIcon.hidden, true)
  assert.equal(test.playIcon.hidden, false)
  test.togglePause()
  assert.equal(test.pause.getAttribute('aria-pressed'), 'false')
  assert.equal(test.pauseIcon.hidden, false)
  assert.equal(test.playIcon.hidden, true)
})

check('missing root, mismatched scene arrays or missing required controls cannot initialize', async () => {
  for (const options of [{ exists: false }, { frameCount: 0 }, { copyCount: 5 }, { stepCount: 5 }, { missingPause: true }, { missingStatus: true }]) {
    const test = harness(options)
    assert.equal(test.root.dataset.initialized, undefined)
    assert.equal(test.allAnimations.length, 0)
    assert.equal(test.pendingFrames(), 0)
    assert.equal(test.observations.length, 0)
  }
})

check('comparative component keeps six existing local photos, promise-first SSR and native accessible links', async () => {
  const files = [...component.matchAll(/file: '([^']+)'/g)].map(match => match[1])
  assert.equal(files.length, 6)
  assert.equal(new Set(files).size, 6)
  assert.equal(files[0], '06-consumer-natural-light-v4')
  files.forEach(file => assert.ok(fs.statSync(new URL(`../public/static/hero-preview-v1/${file}.webp`, import.meta.url)).size > 1000))
  assert.match(component, /lead: '저희는 광고만 만드는 회사가 아닌'/)
  assert.match(component, /title: '저희는 광고만 만드는 회사가 아닌 팔리는 이유를 만드는 회사입니다\.'/)
  assert.match(component, /lines: \[<><em>팔리는 이유<\/em>를<\/>, <>만드는 회사입니다\.<\/>\]/)
  assert.match(component, /<h1 class="hhr-headline" aria-label=\{scene\.title\}/)
  assert.match(component, /class="hhr-statement-lead"[^>]*aria-hidden="true"/)
  assert.match(component, /class="hhr-line" aria-hidden="true"/)
  assert.match(component, /index === 0 \? ' is-active' : ''/)
  assert.match(component, /aria-hidden=\{index !== 0 \? 'true' : 'false'\}/)
  assert.match(component, /loading=\{index === 0 \? 'eager' : 'lazy'\}/)
  assert.match(component, /fetchpriority=\{index === 0 \? 'high' : 'low'\}/)
  assert.match(component, /<a href="#homeAnswer" class="hhr-discover"/)
  assert.match(component, /<a href="#services" class="hhr-services"/)
  assert.match(component, /<a class="hhr-compare" href="\/"/)
  assert.match(component, /class="hhr-status hhr-sr-only" aria-live="off" aria-atomic="true"/)
  assert.match(stylesheet, /\.hhr-frame\.is-active\s*\{[^}]*opacity:\s*1;/)
  assert.match(stylesheet, /\.hhr-copy\.is-active\s*\{[^}]*opacity:\s*1;/)
  assert.match(stylesheet, /\.hhr-line-part\s*\{[^}]*opacity:\s*1;/)
  assert.match(stylesheet, /#homeHeroRefined\.home-hero-refined\s*\{[^}]*overflow:\s*clip;/, 'Root clipping must not create an internal focus-scroll container')
  assert.match(stylesheet, /#homeHeroRefined \.hhr-media\s*\{[^}]*overflow:\s*clip;/, 'Camera overscan must be clipped without a scrollable media layer')
})

check('trial is opt-in DEV-only and the existing default preview narrative is preserved', async () => {
  assert.match(homepage, /import\.meta\.env\.DEV \? \(heroVariant === 'refined' \? <HomeHeroRefined \/> : <HomeHeroPreview \/>\)/)
  assert.match(homepage, /heroVariant\?: 'refined'/)
  assert.match(routes, /if \(import\.meta\.env\.DEV\)\s*\{[\s\S]*?app\.get\('\/preview\/hero-refined'/)
  assert.match(routes, /HomePage heroVariant="refined"/)
  assert.match(routes, /X-Robots-Tag', 'noindex, nofollow'/)
  assert.match(routes, /app\.get\('\/', \(c\) => \{\s*return c\.render\(<HomePage \/>/)
  assert.match(original, /file: '01-report-versus-sales-natural-light-v5'/)
  assert.match(original, /headline: <>보고서 속 숫자는<br \/>화려한데,<br \/>매출은 <em>그대로<\/em><\/>/)
  assert.match(original, /저희는 광고만 만드는 회사가 아닌<br \/><em>팔리는 이유<\/em>를<br \/>만드는 회사입니다\./)
  assert.doesNotMatch(original, /hero-refined-preview|HomeHeroRefined/)
})

check('production SSR retains the original hero and rejects the comparative DEV route', async () => {
  const workerCode = fs.readFileSync(new URL('../dist/_worker.js', import.meta.url), 'utf8')
  const { default: app } = await import('../dist/_worker.js')
  const response = await app.fetch(new Request('https://preview-check.invalid/'), {})
  const html = await response.text()
  assert.equal(response.status, 200)
  assert.ok(html.includes('id="heroSlider"'))
  for (const devOnly of ['homeHeroRefined', 'hero-refined-preview', 'HomeHeroRefined', '/preview/hero-refined']) {
    assert.ok(!html.includes(devOnly), `${devOnly} must not enter production HTML`)
    assert.ok(!workerCode.includes(devOnly), `${devOnly} must be removed from the production bundle`)
  }
  const trial = await app.fetch(new Request('https://preview-check.invalid/preview/hero-refined'), {})
  assert.equal(trial.status, 404)
})

let failures = 0
for (const { name, fn } of cases) {
  try { await fn(); console.log(`PASS ${name}`) }
  catch (error) { failures++; console.error(`FAIL ${name}: ${error.message}`) }
}
if (failures) process.exitCode = 1
