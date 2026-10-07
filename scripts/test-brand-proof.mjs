import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source = fs.readFileSync(new URL('../public/static/brand-proof-preview.js', import.meta.url), 'utf8')
const component = fs.readFileSync(new URL('../src/routes/home-brand-proof.tsx', import.meta.url), 'utf8')
const homepage = fs.readFileSync(new URL('../src/routes/home.tsx', import.meta.url), 'utf8')
const originalData = homepage.match(/const TESTI = (\[[\s\S]*?\n\])/)
assert.ok(originalData, 'Existing testimonial source must remain available')
const testimonials = vm.runInNewContext(`(${originalData[1]})`)
const flush = async () => { for (let index = 0; index < 24; index++) await Promise.resolve() }

function deferred() {
  let resolve, reject
  const promise = new Promise((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}
class EventTarget {
  constructor() { this.events = {} }
  addEventListener(name, callback, options) { (this.events[name] ||= []).push({ callback, options }) }
  removeEventListener(name, callback) { this.events[name] = (this.events[name] || []).filter(item => item.callback !== callback) }
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
    this.classList = { add: (...names) => names.forEach(name => this.classes.add(name)), contains: name => this.classes.has(name) }
    this.style = { setProperty(name, value) { this[name] = String(value) }, removeProperty(name) { delete this[name] } }
  }
  get textContent() { return this._text + this.children.map(child => child.textContent).join('') }
  set textContent(value) { this._text = String(value); this.children = []; this.textWrites++ }
  set innerHTML(_) { throw new Error('Dynamic quote and peek content must be plain text, never innerHTML') }
  setAttribute(name, value) {
    this.attributes[name] = String(value)
    if (name.startsWith('data-')) this.dataset[name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = String(value)
  }
  getAttribute(name) { return this.attributes[name] ?? null }
  hasAttribute(name) { return this.getAttribute(name) !== null }
  appendChild(child) { child.parentNode = this; this.children.push(child); return child }
  matches(selector) {
    if (selector.startsWith('.')) return this.classes.has(selector.slice(1))
    if (selector.startsWith('#')) return this.getAttribute('id') === selector.slice(1)
    const attribute = selector.match(/^\[([^\]]+)\]$/)
    return attribute ? this.hasAttribute(attribute[1]) : this.tagName.toLowerCase() === selector.toLowerCase()
  }
  querySelectorAll(selector) {
    if (selector.includes(' ')) {
      const [parent, ...rest] = selector.split(' ')
      return this.querySelectorAll(parent).flatMap(node => node.querySelectorAll(rest.join(' ')))
    }
    return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)])
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null }
}

function harness({ reduced = false, animations = true, observer = true, resizeObserver = true, hidden = false, legacyMedia = false, noMedia = false, exists = true, missing = '', count = 12, peekCount = 2, width = 600, scrollLeft = 0, top = 1000, throwAt = -1, data = testimonials } = {}) {
  const root = new Element('section')
  root.setAttribute('id', 'homeEmotion')
  root.setAttribute('data-brand-proof', 'true')
  const jobs = [], observations = [], resizeObservations = [], scrolls = [], rafs = new Map()
  let frameId = 0, time = 100, mediaHandler, position = scrollLeft, nativeTarget = null
  const metrics = { width, top, height: 1000, viewport: 800, titleOffset: 80, titleHeight: 180 }
  function make(tag, classes = '', attrs = {}) {
    const node = new Element(tag)
    if (classes) node.classList.add(...classes.split(' '))
    Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value))
    if (animations) node.animate = (keyframes, options) => {
      if (jobs.length === throwAt) throw new Error('Animation construction failed')
      const completion = deferred()
      const job = { node, keyframes, options, finished: completion.promise, playState: 'running', cancelled: false, done: false, pauses: 0, plays: 0,
        pause() { this.playState = 'paused'; this.pauses++ },
        play() { this.playState = 'running'; this.plays++ },
        cancel() { this.cancelled = true; this.playState = 'idle'; if (!this.done) completion.reject(new Error('Cancelled')) },
        finish() { this.done = true; this.playState = 'finished'; completion.resolve() },
      }
      jobs.push(job)
      return job
    }
    return node
  }
  const eyebrow = make('p', 'bproof-eyebrow')
  root.appendChild(eyebrow)
  const title = make('h2', 'bproof-title')
  title.getBoundingClientRect = () => ({ top: metrics.top + metrics.titleOffset, bottom: metrics.top + metrics.titleOffset + metrics.titleHeight, height: metrics.titleHeight })
  root.appendChild(title)
  const lines = ['저희는 광고만 만드는 회사가 아닌', '팔리는 이유를', '만드는 회사입니다.'].map(text => {
    const line = make('span', 'bproof-title-line'); line.textContent = text; title.appendChild(line); return line
  })
  const description = make('p', 'bproof-description')
  root.appendChild(description)
  const stage = make('div', 'bproof-stage')
  const rail = make('div', 'bproof-rail', { tabindex: '0', role: 'region' })
  const reviews = Array.from({ length: count }, (_, index) => {
    const review = make('figure', 'bproof-review', { 'data-review-index': index, 'aria-label': `고객 후기 ${index + 1} / ${count}` })
    const original = data[index % data.length]
    const tag = make('span', 'bproof-tag'); tag.textContent = original.tag; review.appendChild(tag)
    const quote = make('blockquote', 'bproof-quote')
    const p = make('p')
    original.body.split('**').forEach((segment, part) => {
      const text = make(part % 2 ? 'em' : 'text', part % 2 ? 'bproof-highlight' : '')
      text.textContent = segment; p.appendChild(text)
    })
    quote.appendChild(p); review.appendChild(quote)
    const attribution = make('figcaption', 'bproof-attribution')
    const name = make('strong'); name.textContent = original.name
    const role = make('span'); role.textContent = original.role
    attribution.appendChild(name); attribution.appendChild(role); review.appendChild(attribution)
    rail.appendChild(review)
    return review
  })
  if (missing !== 'rail') stage.appendChild(rail)
  root.appendChild(stage)
  const previous = make('button', '', { 'data-bproof-prev': '', 'aria-label': '이전 고객 후기' })
  const next = make('button', '', { 'data-bproof-next': '', 'aria-label': '다음 고객 후기' })
  const current = make('span', '', { 'data-bproof-current': '' }); current.textContent = '01'
  const status = make('p', '', { 'data-bproof-status': '', 'aria-live': 'polite', 'aria-atomic': 'true' })
  const controls = { previous, next, current, status }
  Object.entries(controls).forEach(([key, node]) => { if (missing !== key) root.appendChild(node) })
  const peeks = Array.from({ length: peekCount }, (_, index) => {
    const peek = make('button', 'bproof-peek', { 'data-bproof-peek': index + 1 })
    const tag = make('span', 'bproof-peek-tag')
    const copy = make('strong', 'bproof-peek-copy')
    peek.appendChild(tag); peek.appendChild(copy); root.appendChild(peek)
    return peek
  })
  Object.defineProperty(rail, 'clientWidth', { get: () => metrics.width })
  Object.defineProperty(rail, 'scrollLeft', {
    get: () => position,
    set: value => { position = Math.max(0, Math.min(Number(value), Math.max(0, (count - 1) * metrics.width))) },
  })
  rail.scrollTo = options => {
    scrolls.push({ ...options })
    nativeTarget = options.left
    if (options.behavior === 'instant') rail.scrollLeft = options.left
  }
  root.getBoundingClientRect = () => ({ top: metrics.top, bottom: metrics.top + metrics.height, height: metrics.height })
  const document = new EventTarget()
  document.hidden = hidden
  document.querySelector = () => exists ? root : null
  const window = new EventTarget()
  Object.defineProperty(window, 'innerHeight', { get: () => metrics.viewport })
  const media = { matches: reduced }
  if (legacyMedia) {
    media.addListener = callback => { mediaHandler = callback }
    media.removeListener = callback => { if (mediaHandler === callback) mediaHandler = null }
  } else {
    media.addEventListener = (_, callback) => { mediaHandler = callback }
    media.removeEventListener = (_, callback) => { if (mediaHandler === callback) mediaHandler = null }
  }
  if (!noMedia) window.matchMedia = () => media
  class IntersectionObserver {
    constructor(callback, options) { this.item = { callback, options, targets: [], disconnected: false }; observations.push(this.item) }
    observe(target) { this.item.targets.push(target) }
    disconnect() { this.item.disconnected = true }
  }
  class ResizeObserver {
    constructor(callback) { this.item = { callback, targets: [], disconnected: false }; resizeObservations.push(this.item) }
    observe(target) { this.item.targets.push(target) }
    disconnect() { this.item.disconnected = true }
  }
  if (observer) window.IntersectionObserver = IntersectionObserver
  if (resizeObserver) window.ResizeObserver = ResizeObserver
  const context = {
    document, window, IntersectionObserver, ResizeObserver,
    requestAnimationFrame: callback => { const id = ++frameId; rafs.set(id, callback); return id },
    cancelAnimationFrame: id => rafs.delete(id),
    console, Array, Math, Number, String,
  }
  vm.createContext(context)
  const run = () => vm.runInContext(source, context)
  run()
  return {
    root, rail, reviews, previous, next, current, status, peeks, lines, title, eyebrow, description, stage, jobs, observations, resizeObservations, scrolls, metrics, document, window, media, run,
    pending: () => rafs.size,
    active: () => Number(root.dataset.bproofIndex),
    advance(ms = 25) { time += ms; const callbacks = [...rafs.values()]; rafs.clear(); callbacks.forEach(callback => callback(time)); assert.ok(rafs.size <= 1) },
    intersect(visible = true, rootTop = visible ? 100 : metrics.viewport + 1) { metrics.top = rootTop; const item = observations[0]; if (item && !item.disconnected) item.callback([{ target: root, isIntersecting: visible, intersectionRatio: visible ? .5 : 0 }]) },
    visible(value) { document.hidden = !value; document.dispatch('visibilitychange') },
    preference(value) { media.matches = value; mediaHandler?.({ matches: value }) },
    scroll(left, flushFrame = true) { rail.scrollLeft = left; rail.dispatch('scroll'); if (flushFrame) this.advance() },
    complete() { this.scroll(nativeTarget) },
    resize(width) { metrics.width = width; if (resizeObservations.length) resizeObservations[0].callback(); else window.dispatch('resize') },
    key(key, values = {}) { return rail.dispatch('keydown', { key, ...values }) },
    async ready() { this.intersect(); jobs.filter(job => !job.cancelled).forEach(job => job.finish()); await flush(); assert.equal(root.dataset.bproofPhase, 'ready') },
  }
}

const cases = []
const check = (name, fn) => cases.push({ name, fn })
const start = options => { const test = harness(options); test.intersect(); return test }

check('all twelve real source reviews remain in one finite native rail with no initialization duplication or autoplay', () => {
  const test = harness()
  assert.equal(testimonials.length, 12)
  assert.equal(test.reviews.length, 12)
  assert.equal(test.root.dataset.bproofInitialized, 'true')
  assert.equal(test.root.dataset.bproofPhase, 'pending')
  assert.equal(test.current.textContent, '01')
  assert.equal(test.pending(), 0)
  assert.equal(test.scrolls.length, 0)
  assert.equal(test.jobs.length, 0)
  assert.ok(test.reviews.every(review => !review.hasAttribute('aria-hidden') && !review.hasAttribute('inert')))
  test.run()
  assert.equal(test.observations.length, 1)
  assert.equal(test.next.events.click.length, 1)
  test.advance(10000)
  assert.equal(test.pending(), 0)
  assert.equal(test.scrolls.length, 0)
  assert.equal(test.status.textWrites, 0)
})

check('peek tags and highlights come verbatim from the following source reviews', () => {
  const test = harness()
  test.peeks.forEach((peek, index) => {
    assert.equal(peek.querySelector('.bproof-peek-tag').textContent, testimonials[index + 1].tag)
    assert.equal(peek.querySelector('.bproof-peek-copy').textContent, testimonials[index + 1].body.split('**')[1])
    assert.equal(peek.getAttribute('aria-label'), `${testimonials[index + 1].tag} 고객 후기 보기`)
    assert.equal(peek.dataset.bproofTarget, String(index + 1))
  })
})

check('first view creates six finite entrance tracks with complete CSS end poses and no continuous frame clock', async () => {
  const test = start()
  assert.equal(test.root.dataset.bproofPhase, 'entering')
  assert.equal(test.jobs.length, 6)
  assert.deepEqual(test.jobs.map(job => job.options.duration), [440, 650, 650, 650, 560, 640])
  assert.deepEqual(test.jobs.map(job => job.options.delay || 0), [0, 80, 180, 280, 340, 460])
  for (const job of test.jobs) {
    assert.equal(job.options.iterations, 1)
    assert.equal(job.options.fill, 'both')
    assert.equal(job.keyframes.at(-1).opacity, 1)
  }
  assert.equal(test.pending(), 0)
  await test.ready()
  assert.ok(test.jobs.every(job => job.cancelled))
  test.intersect(false); test.intersect(); test.visible(false); test.visible(true)
  assert.equal(test.jobs.length, 6)
  assert.equal(test.root.dataset.bproofPhase, 'ready')
})

check('completed entrance tracks do not replay and unfinished tracks pause offscreen and when hidden', async () => {
  const test = start()
  test.jobs[0].finish(); await flush()
  const completedPlays = test.jobs[0].plays
  test.intersect(false)
  assert.ok(test.jobs.slice(1).every(job => job.playState === 'paused'))
  test.intersect(); test.visible(false)
  assert.ok(test.jobs.slice(1).every(job => job.playState === 'paused'))
  test.visible(true)
  assert.ok(test.jobs.slice(1).every(job => job.playState === 'running'))
  assert.equal(test.jobs[0].plays, completedPlays)
  test.jobs.slice(1).forEach(job => job.finish()); await flush()
  assert.equal(test.root.dataset.bproofPhase, 'ready')
  assert.equal(test.pending(), 0)
})

check('initially hidden scene waits to create its entrance instead of animating unseen content', () => {
  const test = start({ hidden: true })
  assert.equal(test.jobs.length, 0)
  assert.equal(test.root.dataset.bproofPhase, 'pending')
  test.visible(true)
  assert.equal(test.jobs.length, 6)
  assert.equal(test.root.dataset.bproofPhase, 'entering')
})

check('a one-pixel root intersection and visible top padding do not spend the title reveal prematurely', () => {
  const test = harness()
  test.intersect(true, 799)
  assert.equal(test.root.dataset.bproofPhase, 'pending')
  assert.equal(test.jobs.length, 0)
  test.intersect(true, 720)
  assert.equal(test.jobs.length, 0, 'Section padding is visible but the actual title is not')
  test.intersect(true, 685)
  assert.equal(test.jobs.length, 0, '35px of a 180px title is below its 36px reveal threshold')
  test.intersect(true, 684)
  assert.equal(test.root.dataset.bproofPhase, 'entering')
  assert.equal(test.jobs.length, 6)
  assert.equal(test.window.events.scroll.length, 0, 'The temporary entry reader is removed after the one-shot reveal starts')
  assert.equal(test.window.events.resize.length, 1, 'Only native rail resize preservation remains')
})

check('manual smooth next announces intent while scroll progress updates the counter silently', () => {
  const test = harness()
  test.next.dispatch('click')
  assert.deepEqual(test.scrolls.at(-1), { left: 600, behavior: 'smooth' })
  assert.equal(test.active(), 0)
  assert.equal(test.current.textContent, '01')
  assert.ok(test.status.textContent.startsWith('고객 후기 02 / 12. Influencer Marketing,'))
  const announcements = test.status.textWrites
  test.scroll(360)
  assert.equal(test.active(), 1)
  assert.equal(test.current.textContent, '02')
  assert.equal(test.status.textWrites, announcements)
  test.complete()
  assert.equal(test.status.textWrites, announcements)
  assert.equal(test.peeks[0].dataset.bproofTarget, '2')
})

check('rapid next and previous follow latest destination intent rather than the in-flight nearest review', () => {
  const test = harness()
  test.next.dispatch('click'); test.scroll(120)
  assert.equal(test.active(), 0)
  test.next.dispatch('click')
  assert.equal(test.scrolls.at(-1).left, 1200)
  test.scroll(660)
  assert.equal(test.active(), 1)
  test.next.dispatch('click')
  assert.equal(test.scrolls.at(-1).left, 1800)
  test.previous.dispatch('click')
  assert.equal(test.scrolls.at(-1).left, 1200)
  test.complete()
  assert.equal(test.active(), 2)
  assert.equal(test.current.textContent, '03')
})

check('previous from the first and next from the last wrap by native manual selection without clone cards', () => {
  const test = harness()
  test.previous.dispatch('click'); test.complete()
  assert.equal(test.scrolls.at(-1).left, 6600)
  assert.equal(test.active(), 11)
  assert.equal(test.peeks[0].dataset.bproofTarget, '0')
  assert.equal(test.peeks[1].dataset.bproofTarget, '1')
  test.next.dispatch('click'); test.complete()
  assert.equal(test.scrolls.at(-1).left, 0)
  assert.equal(test.active(), 0)
  assert.equal(test.reviews.length, 12)
})

check('peeks navigate the exact visible next-story target and refresh from actual native progress', () => {
  const test = harness()
  test.peeks[1].dispatch('click')
  assert.equal(test.scrolls.at(-1).left, 1200)
  test.complete()
  assert.equal(test.peeks[0].querySelector('.bproof-peek-tag').textContent, testimonials[3].tag)
  assert.equal(test.peeks[1].querySelector('.bproof-peek-copy').textContent, testimonials[4].body.split('**')[1])
  test.peeks[0].dispatch('click'); test.complete()
  assert.equal(test.active(), 3)
})

check('native scroll events coalesce into one RAF and never announce or start an animation cohort', () => {
  const test = harness()
  test.scroll(1800, false); test.scroll(1860, false); test.scroll(1920, false)
  assert.equal(test.pending(), 1)
  test.advance()
  assert.equal(test.active(), 3)
  assert.equal(test.pending(), 0)
  assert.equal(test.status.textWrites, 0)
  assert.equal(test.jobs.length, 0)
  test.advance(10000)
  assert.equal(test.pending(), 0)
})

check('manual quote transition is finite, uses its own quote rather than the rail, and latest cancellation wins', async () => {
  const test = harness()
  await test.ready()
  test.next.dispatch('click')
  const first = test.jobs.at(-1)
  assert.equal(first.node, test.reviews[1].querySelector('.bproof-quote p'))
  assert.equal(first.options.duration, 360)
  assert.equal(first.options.fill, 'none')
  assert.equal(first.options.iterations, 1)
  assert.equal(first.keyframes[0].opacity, .35)
  test.next.dispatch('click')
  assert.equal(first.cancelled, true)
  const latest = test.jobs.at(-1)
  assert.equal(latest.node, test.reviews[2].querySelector('.bproof-quote p'))
  test.visible(false); assert.equal(latest.playState, 'paused')
  test.visible(true); assert.equal(latest.playState, 'running')
  latest.finish(); await flush()
  assert.equal(latest.cancelled, true)
  const plays = latest.plays
  test.intersect(false); test.intersect()
  assert.equal(latest.plays, plays)
  assert.equal(test.jobs.length, 8)
})

check('navigation during the entrance or out of view never stacks additional quote animation tracks', async () => {
  const test = start()
  test.next.dispatch('click'); test.next.dispatch('click')
  assert.equal(test.jobs.length, 6)
  await test.ready()
  test.intersect(false); test.next.dispatch('click')
  assert.equal(test.jobs.length, 6)
  assert.equal(test.scrolls.at(-1).left, 1800)
})

check('keyboard navigation belongs only to the native rail, wraps, and leaves modifiers/unrelated keys native', () => {
  const test = harness()
  assert.equal(test.key('End').defaultPrevented, true)
  assert.equal(test.scrolls.at(-1).left, 6600)
  assert.equal(test.key('ArrowRight').defaultPrevented, true)
  assert.equal(test.scrolls.at(-1).left, 0)
  test.key('ArrowLeft'); assert.equal(test.scrolls.at(-1).left, 6600)
  test.key('Home'); assert.equal(test.scrolls.at(-1).left, 0)
  const count = test.scrolls.length
  for (const values of [{ target: test.next }, { altKey: true }, { ctrlKey: true }, { metaKey: true }, { shiftKey: true }]) assert.equal(test.key('ArrowRight', values).defaultPrevented, false)
  for (const key of ['ArrowDown', 'ArrowUp', 'Tab', 'Enter', 'PageDown', ' ']) assert.equal(test.key(key).defaultPrevented, false)
  assert.equal(test.scrolls.length, count)
})

check('native wheel and pointer gestures cancel destination intent but never prevent vertical or horizontal browser scrolling', async () => {
  for (const gesture of ['wheel', 'pointerdown']) {
    const test = harness()
    await test.ready()
    test.next.dispatch('click'); test.next.dispatch('click')
    const job = test.jobs.at(-1)
    const event = test.rail.dispatch(gesture, { deltaY: 120, deltaX: 0, pointerType: 'touch' })
    assert.equal(event.defaultPrevented, false)
    assert.equal(test.rail.events[gesture][0].options.passive, true)
    assert.equal(job.cancelled, true)
    test.scroll(0)
    test.next.dispatch('click')
    assert.equal(test.scrolls.at(-1).left, 600)
  }
  const test = harness()
  assert.equal(test.rail.events.pointermove, undefined)
  assert.equal(test.window.events.wheel, undefined)
})

check('initial reduced and unavailable WAAPI are static but manual native controls and peeks remain functional', () => {
  for (const options of [{ reduced: true }, { animations: false }, { reduced: true, hidden: true }]) {
    const test = start(options)
    assert.equal(test.root.dataset.bproofPhase, 'ready')
    assert.equal(test.root.dataset.bproofMotion, 'reduced')
    assert.equal(test.jobs.length, 0)
    test.next.dispatch('click')
    assert.deepEqual(test.scrolls.at(-1), { left: 600, behavior: 'instant' })
    assert.equal(test.active(), 1)
    assert.equal(test.current.textContent, '02')
    test.peeks[1].dispatch('click')
    assert.equal(test.active(), 3)
    assert.equal(test.jobs.length, 0)
    assert.equal(test.pending(), 0)
  }
})

check('reducing motion during selection snaps latest intent, cancels unfinished tracks and never replays entrance', async () => {
  const test = harness()
  await test.ready()
  test.next.dispatch('click'); test.next.dispatch('click'); test.scroll(180)
  test.preference(true)
  assert.deepEqual(test.scrolls.at(-1), { left: 1200, behavior: 'instant' })
  assert.equal(test.active(), 2)
  assert.equal(test.root.dataset.bproofPhase, 'ready')
  assert.ok(test.jobs.every(job => job.cancelled))
  const count = test.jobs.length
  test.preference(false); test.intersect(false); test.intersect()
  assert.equal(test.jobs.length, count)
  assert.equal(test.current.textContent, '03')
})

check('reducing motion before first entry or during an unfinished entrance commits the static CSS pose', () => {
  for (const entered of [false, true]) {
    const test = entered ? start() : harness()
    test.preference(true)
    assert.equal(test.root.dataset.bproofPhase, 'ready')
    assert.ok(test.jobs.every(job => job.cancelled))
    test.preference(false); test.intersect()
    assert.equal(test.jobs.length, entered ? 6 : 0)
  }
})

check('true resize preserves the latest pending navigation destination rather than its intermediate nearest review', () => {
  const test = harness()
  test.next.dispatch('click'); test.next.dispatch('click'); test.scroll(180)
  test.resize(400)
  assert.deepEqual(test.scrolls.at(-1), { left: 800, behavior: 'instant' })
  assert.equal(test.active(), 2)
  assert.equal(test.current.textContent, '03')
  test.next.dispatch('click')
  assert.equal(test.scrolls.at(-1).left, 1200)
})

check('resize without a pending intent preserves the current nearest review and correct peek text', () => {
  const test = harness()
  test.scroll(2580)
  assert.equal(test.active(), 4)
  test.resize(400)
  assert.equal(test.rail.scrollLeft, 1600)
  assert.equal(test.active(), 4)
  assert.equal(test.peeks[0].querySelector('.bproof-peek-tag').textContent, testimonials[5].tag)
})

check('unchanged ResizeObserver notifications do not prematurely snap or clear rapid smooth-navigation intent', () => {
  const test = harness()
  test.next.dispatch('click'); test.next.dispatch('click'); test.scroll(180)
  const count = test.scrolls.length
  test.resize(600)
  assert.equal(test.scrolls.length, count, 'Same-width observer callback must not issue an instant scroll')
  assert.equal(test.active(), 0)
  test.next.dispatch('click')
  assert.equal(test.scrolls.at(-1).left, 1800)
})

check('no IntersectionObserver and no ResizeObserver preserve passive viewport and width fallbacks', () => {
  const test = harness({ observer: false, resizeObserver: false, top: 1000 })
  assert.equal(test.jobs.length, 0)
  assert.equal(test.window.events.scroll[0].options.passive, true)
  assert.equal(test.window.events.resize[0].options.passive, true)
  test.metrics.top = 799; test.window.dispatch('scroll')
  assert.equal(test.jobs.length, 0, 'Fallback also waits for actual title pixels')
  test.metrics.top = 684; test.window.dispatch('scroll')
  assert.equal(test.jobs.length, 6)
  test.metrics.top = -1001; test.window.dispatch('scroll')
  assert.ok(test.jobs.every(job => job.playState === 'paused'))
  test.resize(400)
  assert.equal(test.scrolls.at(-1).behavior, 'instant')
})

check('legacy matchMedia and absent matchMedia preserve graceful motion behavior', async () => {
  const legacy = start({ legacyMedia: true })
  legacy.preference(true)
  assert.equal(legacy.root.dataset.bproofMotion, 'reduced')
  const missing = harness({ noMedia: true })
  await missing.ready()
  missing.next.dispatch('click')
  assert.equal(missing.scrolls.at(-1).behavior, 'smooth')
})

check('partial animation construction failure cancels created jobs and leaves a readable static native rail', () => {
  const test = start({ throwAt: 2 })
  assert.equal(test.root.dataset.bproofPhase, 'ready')
  assert.equal(test.root.dataset.bproofMotion, 'reduced')
  assert.equal(test.jobs.length, 2)
  assert.ok(test.jobs.every(job => job.cancelled))
  test.next.dispatch('click')
  assert.equal(test.scrolls.at(-1).behavior, 'instant')
  assert.equal(test.active(), 1)
})

check('missing required nodes and empty reviews avoid installing a partial controller', () => {
  for (const options of [{ exists: false }, { count: 0 }, ...['rail', 'previous', 'next', 'current', 'status'].map(missing => ({ missing }))]) {
    const test = harness(options)
    assert.equal(test.root.dataset.bproofInitialized, undefined)
    assert.equal(test.jobs.length, 0)
    assert.equal(test.observations.length, 0)
    assert.equal(test.window.__brandProofPreview, undefined)
    assert.equal(test.scrolls.length, 0)
  }
})

check('single-review and optional peek-free rails stay static, readable and correctly disabled', () => {
  const single = harness({ count: 1 })
  assert.equal(single.previous.disabled, true)
  assert.equal(single.next.disabled, true)
  assert.ok(single.peeks.every(peek => peek.disabled))
  single.next.dispatch('click'); single.previous.dispatch('click'); single.peeks[0].dispatch('click')
  assert.equal(single.scrolls.length, 0)
  const noPeeks = harness({ peekCount: 0 })
  noPeeks.next.dispatch('click'); noPeeks.complete()
  assert.equal(noPeeks.active(), 1)
})

check('destroy cancels jobs and queued scroll RAF, removes subscriptions and can safely reinitialize the native rail', async () => {
  const test = start({ legacyMedia: true })
  test.scroll(600, false)
  test.window.__brandProofPreview.destroy()
  assert.equal(test.pending(), 0)
  assert.ok(test.jobs.every(job => job.cancelled))
  assert.equal(test.observations[0].disconnected, true)
  assert.equal(test.resizeObservations[0].disconnected, true)
  assert.equal(test.root.dataset.bproofInitialized, undefined)
  assert.equal(test.previous.disabled, true)
  assert.equal(test.next.events.click.length, 0)
  for (const name of ['scroll', 'keydown', 'pointerdown', 'wheel']) assert.equal(test.rail.events[name].length, 0)
  assert.equal(test.document.events.visibilitychange.length, 0)
  test.next.dispatch('click'); test.advance(10000); await flush()
  assert.equal(test.scrolls.length, 0)
  test.run()
  assert.equal(test.current.textContent, '02')
  assert.equal(test.next.events.click.length, 1)
  assert.equal(test.observations.length, 2)
})

check('dynamic peek fallback text treats HTML-like customer strings as literal text, never injected markup', () => {
  const custom = testimonials.map(review => ({ ...review }))
  custom[1] = { tag: '<img onerror="bad">', body: '<script>literal text</script>', av: '기', name: '<이름>', role: '&브랜드' }
  const test = harness({ data: custom })
  assert.equal(test.peeks[0].querySelector('.bproof-peek-tag').textContent, custom[1].tag)
  assert.equal(test.peeks[0].querySelector('.bproof-peek-copy').textContent, custom[1].body)
  test.peeks[0].dispatch('click')
  assert.ok(test.status.textContent.includes(custom[1].tag))
})

check('component consumes existing TESTI verbatim without cloned quotes, fake photos or invented ratings', () => {
  assert.equal(testimonials.length, 12)
  assert.match(homepage, /import\.meta\.env\.DEV \? <HomeBrandProof reviews=\{TESTI\} \/> : <>/)
  assert.match(component, /reviews\.map\(\(review, index\) =>/)
  assert.doesNotMatch(component, /\.concat\(|\.flatMap\(|\.cloneNode\(|\[\.\.\.reviews|<img\b|rating|★|5\.0/)
  assert.match(component, /body\.split\('\*\*'\)\.map/)
  assert.match(component, /\{quoteBody\(review\.body\)\}/)
  assert.match(component, /\{review\.tag\}/)
  assert.match(component, /<figcaption class="bproof-attribution"><strong>\{review\.name\}<\/strong><span>\{review\.role\}<\/span>/)
  assert.match(component, /id="homeEmotion" class="brand-proof-preview" data-brand-proof="true" aria-labelledby="brandProofTitle"/)
  assert.match(component, /aria-label="저희는 광고만 만드는 회사가 아닌, 팔리는 이유를 만드는 회사입니다\."/)
  assert.match(component, /class="bproof-title-mask" aria-hidden="true"/)
  assert.match(component, /class="bproof-rail" role="region"[^>]*tabindex="0"/)
  assert.match(component, /data-bproof-status aria-live="polite" aria-atomic="true"/)
  assert.match(component, /data-bproof-prev[^>]*disabled/)
  assert.match(component, /data-bproof-next[^>]*disabled/)
  assert.doesNotMatch(source, /innerHTML|cloneNode|setInterval|setTimeout/)
})

check('native overflow and scroll snap remain usable without JS while title masks do not create focus-scroll containers', () => {
  const css = fs.readFileSync(new URL('../public/static/brand-proof-preview.css', import.meta.url), 'utf8')
  assert.match(css, /\.bproof-rail\s*\{[^}]*overflow-x:\s*auto;/)
  assert.match(css, /\.bproof-rail\s*\{[^}]*scroll-snap-type:\s*x (?:mandatory|proximity);/)
  assert.match(css, /\.bproof-review\s*\{[^}]*scroll-snap-align:\s*(?:start|center);/)
  assert.match(css, /\.bproof-title-mask\s*\{[^}]*overflow:\s*clip;/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  assert.doesNotMatch(css, /animation:[^;]*(?:infinite|linear)/)
})

check('production SSR keeps both original emotion and duplicated testimonials, excluding the entire DEV chapter', async () => {
  const workerCode = fs.readFileSync(new URL('../dist/_worker.js', import.meta.url), 'utf8')
  const { default: app } = await import('../dist/_worker.js')
  const response = await app.fetch(new Request('https://preview-check.invalid/'), {})
  const html = await response.text()
  assert.equal(response.status, 200)
  assert.match(html, /<section class="section home-emotion" id="homeEmotion">/)
  assert.match(html, /<section class="testimonials-section">/)
  assert.equal((html.match(/<blockquote class="testi-card"/g) || []).length, 24)
  assert.equal((html.match(/<blockquote class="testi-card" aria-hidden="true"/g) || []).length, 12)
  const text = html.replace(/<[^>]+>/g, '')
  testimonials.forEach(review => {
    assert.ok(text.includes(review.body.replace(/\*\*/g, '')))
    assert.ok(text.includes(review.name))
    assert.ok(text.includes(review.role))
  })
  for (const token of ['brand-proof-preview', 'data-brand-proof', 'bproof-rail']) {
    assert.ok(!html.includes(token))
    assert.ok(!workerCode.includes(token))
  }
})

let failures = 0
for (const { name, fn } of cases) {
  try { await fn(); console.log(`PASS ${name}`) }
  catch (error) { failures++; console.error(`FAIL ${name}: ${error.message}`) }
}
if (failures) process.exitCode = 1
