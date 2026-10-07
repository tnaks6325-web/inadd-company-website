import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source = fs.readFileSync(new URL('../public/static/stats-motion-preview.js', import.meta.url), 'utf8')
const legacy = fs.readFileSync(new URL('../public/static/home.js', import.meta.url), 'utf8')
const homepage = fs.readFileSync(new URL('../src/routes/home.tsx', import.meta.url), 'utf8')
const heights = [4, 7, 12, 19, 31, 49, 73, 100]
const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026']
const flush = async () => { for (let index = 0; index < 24; index++) await Promise.resolve() }
const close = (actual, expected, tolerance = .01) => assert.ok(Math.abs(actual - expected) <= tolerance, `Expected ${actual} ≈ ${expected}`)

class EventTarget {
  constructor() { this.events = {} }
  addEventListener(name, callback, options) { (this.events[name] ||= []).push({ callback, options }) }
  removeEventListener(name, callback) { this.events[name] = (this.events[name] || []).filter(item => item.callback !== callback) }
  dispatchEvent(event) { return this.dispatch(event.type, event) }
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
    this.attributeWrites = {}
    this.children = []
    this.parentNode = null
    this.classes = new Set()
    this._text = ''
    this.textWrites = 0
    this.classList = {
      add: (...names) => names.forEach(name => this.classes.add(name)),
      remove: (...names) => names.forEach(name => this.classes.delete(name)),
      contains: name => this.classes.has(name),
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
    this.attributeWrites[name] = (this.attributeWrites[name] || 0) + 1
    if (name.startsWith('data-')) this.dataset[name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = String(value)
    this.onAttribute?.(name)
  }
  getAttribute(name) { return this.attributes[name] ?? null }
  hasAttribute(name) { return this.getAttribute(name) !== null }
  matches(selector) {
    const classes = [...selector.matchAll(/\.([\w-]+)/g)].map(match => match[1])
    const id = selector.match(/#([\w-]+)/)?.[1]
    const attributes = [...selector.matchAll(/\[([\w-]+)(?:="([^"]*)")?\]/g)]
    return (!id || this.getAttribute('id') === id) && classes.every(name => this.classes.has(name)) && attributes.every(([, name, value]) => this.hasAttribute(name) && (value === undefined || this.getAttribute(name) === value))
  }
  appendChild(child) { child.parentNode = this; this.children.push(child); return child }
  querySelectorAll(selector) { return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]) }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null }
  closest(selector) { return this.matches(selector) ? this : this.parentNode?.closest(selector) || null }
}

function harness({ reduced = false, animations = true, observer = true, mutationObserver = true, hidden = false, legacyMedia = false, noMedia = false, exists = true, missing = '', preview = true, target = '37000', top = 1000, height = 700, viewport = 800, run = true, throwAnimation = false } = {}) {
  const root = new Element('section')
  root.classList.add('stats-section')
  root.setAttribute('id', 'homeStats')
  if (preview) root.setAttribute('data-stats-motion', 'true')
  const jobs = [], observations = [], mutations = [], rafs = new Map(), requests = []
  let frameId = 0, time = 100, mediaHandler, mutationQueued = false, payload = {}, failFetch = false
  const metrics = { top, height, viewport }
  function make(tag, classes = '', attrs = {}) {
    const node = new Element(tag)
    if (classes) node.classList.add(...classes.split(' '))
    Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value))
    if (animations) node.animate = (keyframes, options) => {
      if (throwAnimation) throw new Error('WAAPI unavailable')
      const job = { node, keyframes, options, currentTime: 0, playState: 'running', cancelled: false, pauses: 0,
        pause() { this.playState = 'paused'; this.pauses++ },
        cancel() { this.playState = 'idle'; this.cancelled = true },
      }
      jobs.push(job)
      return job
    }
    return node
  }
  const lines = [make('span', 'sg-title-line'), make('span', 'sg-title-line')]
  lines[0].textContent = '매년 더 많은 브랜드와 함께,'
  lines[1].textContent = '누적 성과를 쌓아가고 있습니다'
  lines.forEach(line => root.appendChild(line))
  const eyebrow = make('span', 'sg-eyebrow')
  eyebrow.textContent = '누적 완료 캠페인'
  root.appendChild(eyebrow)
  const wrap = make('div', 'sg-num-wrap', { role: 'img', 'aria-label': '누적 완료 캠페인 37,000건 이상' })
  const number = make('span', 'stat-num-big sg-num', { 'data-count': target, 'aria-hidden': 'true' })
  number.textContent = preview ? '37,000' : '0'
  if (missing !== 'number') wrap.appendChild(number)
  const reserve = make('span', 'sg-num-reserve', { 'aria-hidden': 'true' })
  reserve.textContent = '37,000'
  if (preview && missing !== 'reserve') wrap.appendChild(reserve)
  const unit = make('span', 'sg-unit', { 'aria-hidden': 'true' })
  unit.textContent = '+'
  wrap.appendChild(unit)
  if (missing !== 'wrap') root.appendChild(wrap)
  const chart = make('div', 'sg-chart', { 'aria-hidden': 'true' })
  const bars = heights.map((height, index) => {
    const column = make('div', 'sg-col')
    const bar = make('div', `sg-bar${index === 7 ? ' sg-bar--active' : ''}`, { style: `height:${height}%` })
    bar.style.height = `${height}%`
    const year = make('span', 'sg-year')
    year.textContent = years[index]
    if (missing !== 'bars') column.appendChild(bar)
    column.appendChild(year); chart.appendChild(column)
    return bar
  })
  const callout = make('span', 'sg-callout-body')
  callout.textContent = '▲ 2,400% 7년 누적 성장'
  chart.appendChild(callout); root.appendChild(chart)
  const minis = ['98% 재계약률', '7년+ 업계 경험', '50+ 파트너 브랜드'].map(text => {
    const mini = make('div', 'sg-mini-item'); mini.textContent = text; root.appendChild(mini); return mini
  })
  const document = new EventTarget()
  document.hidden = hidden
  document.querySelector = selector => {
    if (!exists) return null
    if (selector === '.stats-section') return root
    if (selector === '#homeStats[data-stats-motion]') return preview ? root : null
    return null
  }
  document.querySelectorAll = selector => selector === '.stat-num-big' ? [number] : []
  document.getElementById = () => null
  root.getBoundingClientRect = () => ({ top: metrics.top, bottom: metrics.top + metrics.height, height: metrics.height, left: 0, right: 1200, width: 1200 })
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
    unobserve() {}
    disconnect() { this.item.disconnected = true }
  }
  class MutationObserver {
    constructor(callback) { this.item = { callback, disconnected: false }; mutations.push(this.item) }
    observe(target, options) {
      this.item.target = target; this.item.options = options
      target.onAttribute = name => {
        if (this.item.disconnected || !options.attributeFilter.includes(name) || mutationQueued) return
        mutationQueued = true
        Promise.resolve().then(() => { mutationQueued = false; if (!this.item.disconnected) this.item.callback([{ target, attributeName: name }]) })
      }
    }
    disconnect() { this.item.disconnected = true }
  }
  if (observer) window.IntersectionObserver = IntersectionObserver
  if (mutationObserver) window.MutationObserver = MutationObserver
  const context = {
    document, window, IntersectionObserver, MutationObserver,
    requestAnimationFrame: callback => { const id = ++frameId; rafs.set(id, callback); return id },
    cancelAnimationFrame: id => rafs.delete(id),
    performance: { now: () => time },
    Event: class { constructor(type) { this.type = type } },
    fetch: url => { requests.push(url); return failFetch ? Promise.reject(new Error('offline')) : Promise.resolve({ json: () => Promise.resolve(payload) }) },
    console, Array, Math, Number, String,
  }
  vm.createContext(context)
  const runMotion = () => vm.runInContext(source, context)
  if (run) runMotion()
  return {
    root, number, reserve, wrap, bars, lines, eyebrow, chart, callout, minis, jobs, observations, mutations, metrics, document, window, media, requests, context, runMotion,
    numeric: () => Number(number.textContent.replace(/,/g, '')),
    pending: () => rafs.size,
    advance(ms, interval = 25) {
      const stop = time + ms
      while (time < stop) {
        time = Math.min(stop, time + interval)
        const current = [...rafs.values()]; rafs.clear()
        current.forEach(callback => callback(time))
        if (preview) assert.ok(rafs.size <= 1, 'Stats must own exactly one shared frame clock')
      }
    },
    intersect(pixels = 400, ratio = pixels / metrics.height, visible = pixels > 0) {
      const item = observations.find(observation => observation.targets.includes(root))
      if (item && !item.disconnected) item.callback([{ target: root, isIntersecting: visible, intersectionRatio: ratio, boundingClientRect: root.getBoundingClientRect(), intersectionRect: { height: pixels } }])
    },
    visible(value) { document.hidden = !value; document.dispatch('visibilitychange') },
    preference(value) { media.matches = value; mediaHandler?.({ matches: value }) },
    update(value, event = true) { number.setAttribute('data-count', value); if (event) root.dispatch('stats:data') },
    viewport(values, event = 'scroll') { Object.assign(metrics, values); window.dispatch(event) },
    async home(data = {}, fail = false) { payload = data; failFetch = fail; vm.runInContext(legacy, context); await flush() },
  }
}

const cases = []
const check = (name, fn) => cases.push({ name, fn })
const start = options => { const test = harness(options); test.intersect(); return test }
const settled = test => { test.advance(2285); assert.equal(test.root.dataset.statsPhase, 'settled') }

check('pending text retains the SSR total while a paused cohort is armed once before substantial pixel overlap', () => {
  const test = harness()
  assert.equal(test.root.dataset.statsInitialized, 'true')
  assert.equal(test.root.dataset.statsPhase, 'pending')
  assert.equal(test.root.dataset.statsPlayback, 'paused')
  assert.equal(test.root.dataset.statsMotionMode, 'full')
  assert.equal(test.numeric(), 37000)
  assert.equal(test.jobs.length, 16)
  assert.ok(test.jobs.every(job => job.currentTime === 0 && job.playState === 'paused'))
  assert.equal(test.pending(), 0)
  assert.equal(test.number.getAttribute('aria-hidden'), 'true')
  assert.equal(test.wrap.getAttribute('aria-label'), '누적 완료 캠페인 37,000건 이상')
  test.runMotion()
  assert.equal(test.observations.length, 1)
  assert.equal(test.root.events['stats:data'].length, 1)
  test.intersect(314, .99)
  assert.equal(test.root.dataset.statsPhase, 'pending', 'Ratio alone cannot reveal a tall mobile scene too early')
  test.intersect(315)
  assert.equal(test.root.dataset.statsPhase, 'playing')
  assert.equal(test.numeric(), 0)
})

check('tall and short viewport trigger thresholds use min(sectionHeight, viewportHeight) × .45', () => {
  const tall = harness({ height: 2000, viewport: 800 })
  tall.intersect(359, .22)
  assert.equal(tall.root.dataset.statsPhase, 'pending')
  tall.intersect(360, .18)
  assert.equal(tall.root.dataset.statsPhase, 'playing')
  const short = harness({ height: 400 })
  short.intersect(179); assert.equal(short.root.dataset.statsPhase, 'pending')
  short.intersect(180); assert.equal(short.root.dataset.statsPhase, 'playing')
})

check('one finite cohort shares the exact headline, number, bar, callout and mini timing', () => {
  const test = start()
  assert.equal(test.jobs.length, 16)
  assert.deepEqual(test.jobs.map(job => job.options.delay), [0, 100, 180, 260, 320, 435, 550, 665, 780, 895, 1010, 1125, 1640, 1810, 1890, 1970])
  assert.deepEqual(test.jobs.map(job => job.options.duration), [620, 620, 450, 560, ...Array(8).fill(720), 560, 290, 290, 290])
  for (const job of test.jobs) {
    assert.equal(job.playState, 'paused', 'The RAF clock scrubs WAAPI instead of starting independent animation clocks')
    assert.equal(job.options.iterations, 1)
    assert.equal(job.options.fill, 'both')
    assert.equal(job.currentTime, 0)
    assert.equal(job.keyframes.at(-1).opacity, 1)
  }
  assert.deepEqual(test.jobs.slice(4, 12).map(job => job.keyframes.at(-1).transform), Array(8).fill('scaleY(1)'))
  assert.ok(test.jobs.slice(4, 12).every(job => job.keyframes.every(frame => !Object.hasOwn(frame, 'height'))), 'Visual scale must not animate or replace data-driven bar heights')
  assert.equal(test.jobs[12].node, test.callout)
  assert.equal(test.jobs[12].keyframes[1].transform, 'translateY(-3px) scale(1.04)')
})

check('counter starts after 260ms, counts finite integer values and reaches the exact latest total', () => {
  const test = start()
  test.advance(275)
  assert.equal(test.numeric(), 0)
  test.advance(25)
  assert.ok(test.numeric() > 0 && test.numeric() < 37000)
  const labelWrites = test.wrap.attributeWrites['aria-label']
  test.advance(500)
  assert.ok(Number.isInteger(test.numeric()))
  assert.equal(test.wrap.attributeWrites['aria-label'], labelWrites, 'Do not announce every visual count frame')
  test.advance(1125)
  assert.equal(test.numeric(), 37000)
  assert.equal(test.root.dataset.statsPhase, 'playing', 'The chart/badge timeline completes after the numeric counter')
  test.advance(400)
  assert.equal(test.root.dataset.statsPhase, 'settled')
  assert.equal(test.pending(), 0)
  assert.ok(test.jobs.every(job => job.cancelled))
})

check('scrubbed jobs stop at their own end and the complete scene never loops or replays', () => {
  const test = start()
  test.advance(1025)
  assert.equal(test.jobs[0].currentTime, 620)
  assert.equal(test.jobs[3].currentTime, 820)
  assert.equal(test.jobs[12].currentTime, 1000)
  settled(test)
  const count = test.jobs.length
  test.intersect(0, 0, false); test.intersect(); test.visible(false); test.visible(true)
  test.advance(10000)
  assert.equal(test.jobs.length, count)
  assert.equal(test.pending(), 0)
  assert.equal(test.numeric(), 37000)
})

check('document hidden pauses numeric and graphic time, then resumes without counting the hidden interval', () => {
  const test = start()
  test.advance(825)
  const value = test.numeric(), times = test.jobs.map(job => job.currentTime)
  test.visible(false)
  assert.equal(test.pending(), 0)
  assert.equal(test.root.dataset.statsPlayback, 'paused')
  test.advance(10000)
  assert.equal(test.numeric(), value)
  assert.deepEqual(test.jobs.map(job => job.currentTime), times)
  test.visible(true); test.advance(25)
  assert.equal(test.numeric(), value)
  assert.deepEqual(test.jobs.map(job => job.currentTime), times)
  test.advance(100)
  assert.ok(test.numeric() > value)
  assert.equal(test.jobs.length, 16)
  settled(test)
})

check('leaving the viewport pauses motion, but partial reentry after the first reveal resumes it', () => {
  const test = start()
  test.advance(825)
  const value = test.numeric()
  test.intersect(0, 0, false); test.advance(10000)
  assert.equal(test.numeric(), value)
  assert.equal(test.pending(), 0)
  test.intersect(1, .001)
  assert.equal(test.pending(), 1, 'An already-started scene needs only positive overlap to resume')
  test.advance(25)
  assert.equal(test.numeric(), value)
  settled(test)
})

check('hidden initial intersection remains pending and assembles only once on document return', () => {
  const test = start({ hidden: true })
  assert.equal(test.root.dataset.statsPhase, 'pending')
  assert.equal(test.jobs.length, 16)
  assert.equal(test.numeric(), 37000)
  test.visible(true)
  assert.equal(test.root.dataset.statsPhase, 'playing')
  assert.equal(test.jobs.length, 16)
  assert.equal(test.numeric(), 0)
})

check('before-entry target events update visible static value and the accessible total without a new cohort', async () => {
  const test = harness()
  test.update('32000.9')
  await flush()
  assert.equal(test.numeric(), 32000)
  assert.equal(test.wrap.getAttribute('aria-label'), '누적 완료 캠페인 32,000건 이상')
  assert.equal(test.jobs.length, 16)
  assert.equal(test.pending(), 0)
  test.intersect(); settled(test)
  assert.equal(test.numeric(), 32000)
})

check('hidden width reserve follows the final target before, during and after motion without per-frame writes', async () => {
  const test = harness()
  assert.equal(test.reserve.getAttribute('aria-hidden'), 'true')
  assert.equal(test.reserve.textContent, '37,000')
  const initialWrites = test.reserve.textWrites
  test.update('32000.9'); await flush()
  assert.equal(test.reserve.textContent, '32,000')
  assert.equal(test.reserve.textWrites, initialWrites + 1, 'Event + MutationObserver must not duplicate an unchanged reserve write')
  test.intersect(); test.advance(825)
  assert.equal(test.reserve.textContent, '32,000')
  assert.equal(test.reserve.textWrites, initialWrites + 1)
  assert.ok(test.numeric() < 32000)
  test.update('50000'); await flush()
  assert.equal(test.reserve.textContent, '50,000')
  assert.equal(test.reserve.textWrites, initialWrites + 2)
  settled(test)
  assert.equal(test.reserve.textContent, '50,000')
  assert.equal(test.reserve.textWrites, initialWrites + 2)
  test.update('12345.99'); await flush()
  assert.equal(test.reserve.textContent, '12,345')
  assert.equal(test.reserve.textWrites, initialWrites + 3)
  test.update('12345.1'); test.update('-1'); await flush()
  assert.equal(test.reserve.textContent, '12,345')
  assert.equal(test.reserve.textWrites, initialWrites + 3)
  assert.equal(test.jobs.length, 16)
  assert.equal(test.pending(), 0)
})

check('reduced motion updates the width reserve statically and an absent optional reserve is safe', async () => {
  const reduced = harness({ reduced: true })
  reduced.update('999'); await flush()
  assert.equal(reduced.reserve.textContent, '999')
  assert.equal(reduced.numeric(), 999)
  assert.equal(reduced.pending(), 0)
  const noReserve = start({ missing: 'reserve' })
  noReserve.update('32000'); settled(noReserve)
  assert.equal(noReserve.numeric(), 32000)
  assert.equal(noReserve.wrap.getAttribute('aria-label'), '누적 완료 캠페인 32,000건 이상')
})

check('changing target mid-count continues from the current value without restarting the shared cohort', async () => {
  const test = start()
  test.advance(825)
  const before = test.numeric(), times = test.jobs.map(job => job.currentTime)
  test.update('50000'); await flush()
  assert.equal(test.numeric(), before)
  assert.deepEqual(test.jobs.map(job => job.currentTime), times)
  assert.equal(test.jobs.length, 16)
  assert.equal(test.wrap.getAttribute('aria-label'), '누적 완료 캠페인 50,000건 이상')
  test.advance(100)
  assert.ok(test.numeric() > before && test.numeric() < 50000)
  settled(test)
  assert.equal(test.numeric(), 50000)
})

check('decreased target, rapid latest updates and a post-counter update all settle exactly to the latest valid integer', async () => {
  const test = start()
  test.advance(825)
  test.update('1'); await flush()
  assert.equal(test.numeric(), 1)
  test.update('64000'); test.update('0'); test.update('12345.99')
  await flush()
  test.advance(1125)
  assert.equal(test.numeric(), 12345)
  assert.equal(test.root.dataset.statsPhase, 'playing')
  test.update('98765.9'); await flush()
  test.advance(25)
  assert.equal(test.numeric(), 98765)
  test.advance(400)
  assert.equal(test.root.dataset.statsPhase, 'settled')
  assert.equal(test.jobs.length, 16)
})

check('settled target updates remain static with no new animation and no second count-up', async () => {
  const test = start()
  settled(test)
  test.update('32000'); await flush()
  assert.equal(test.numeric(), 32000)
  assert.equal(test.wrap.getAttribute('aria-label'), '누적 완료 캠페인 32,000건 이상')
  assert.equal(test.root.dataset.statsPhase, 'settled')
  assert.equal(test.jobs.length, 16)
  assert.equal(test.pending(), 0)
  test.intersect(); test.advance(5000)
  assert.equal(test.numeric(), 32000)
})

check('attribute observer and stats:data-only fallback both receive exact latest values', async () => {
  const observed = harness()
  assert.deepEqual(Array.from(observed.mutations[0].options.attributeFilter), ['data-count'])
  observed.update('45678', false); await flush()
  assert.equal(observed.numeric(), 45678)
  const fallback = harness({ mutationObserver: false })
  fallback.update('45678', false); await flush()
  assert.equal(fallback.numeric(), 37000)
  fallback.root.dispatch('stats:data')
  assert.equal(fallback.numeric(), 45678)
})

check('invalid, negative, unsafe and empty targets never produce NaN, Infinity or negative counter values', async () => {
  const test = harness()
  for (const target of ['NaN', 'Infinity', '-1', '', '   ', '9e30', String(Number.MAX_SAFE_INTEGER + 1), 'null', 'undefined', '32,000']) {
    test.update(target); await flush()
    assert.equal(test.numeric(), 37000, target)
    assert.equal(test.wrap.getAttribute('aria-label'), '누적 완료 캠페인 37,000건 이상')
  }
  test.update(String(Number.MAX_SAFE_INTEGER)); await flush()
  assert.equal(test.numeric(), Number.MAX_SAFE_INTEGER)
  test.update('0'); await flush()
  test.intersect(); settled(test)
  assert.equal(test.numeric(), 0)
  assert.ok(test.number.textContent !== 'NaN')
})

check('reduced preference and missing WAAPI instantly commit static values even before intersection', async () => {
  for (const options of [{ reduced: true }, { animations: false }, { reduced: true, hidden: true }]) {
    const test = harness(options)
    assert.equal(test.root.dataset.statsPhase, 'settled')
    assert.equal(test.root.dataset.statsMotionMode, 'reduced')
    assert.equal(test.numeric(), 37000)
    assert.equal(test.pending(), 0)
    assert.equal(test.jobs.length, 0)
    test.update('32000'); await flush()
    assert.equal(test.numeric(), 32000)
    test.intersect(); test.advance(10000)
    assert.equal(test.pending(), 0)
    assert.equal(test.jobs.length, 0)
  }
})

check('reducing motion mid-timeline cancels the cohort, restores CSS base and never replays when toggled back', () => {
  const test = start()
  test.advance(825)
  test.update('32000')
  test.preference(true)
  assert.equal(test.numeric(), 32000)
  assert.equal(test.root.dataset.statsPhase, 'settled')
  assert.equal(test.pending(), 0)
  assert.ok(test.jobs.every(job => job.cancelled))
  assert.ok(test.bars.every((bar, index) => bar.style.height === `${heights[index]}%` && !bar.style.transform))
  test.preference(false); test.intersect(); test.advance(5000)
  assert.equal(test.jobs.length, 16)
  assert.equal(test.numeric(), 32000)
  assert.equal(test.pending(), 0)
})

check('an animation construction failure falls back to a safe settled scene without a partial count', () => {
  const test = start({ throwAnimation: true })
  assert.equal(test.root.dataset.statsPhase, 'settled')
  assert.equal(test.root.dataset.statsMotionMode, 'reduced')
  assert.equal(test.numeric(), 37000)
  assert.equal(test.pending(), 0)
})

check('no IntersectionObserver uses passive viewport checks and cannot begin below or above the viewport', () => {
  const test = harness({ observer: false, top: 1000 })
  assert.equal(test.root.dataset.statsPhase, 'pending')
  assert.equal(test.window.events.scroll[0].options.passive, true)
  assert.equal(test.window.events.resize[0].options.passive, true)
  test.viewport({ top: -701 })
  assert.equal(test.root.dataset.statsPhase, 'pending')
  test.viewport({ top: 486 })
  assert.equal(test.root.dataset.statsPhase, 'pending')
  test.viewport({ top: 485 }, 'resize')
  assert.equal(test.root.dataset.statsPhase, 'playing')
  test.advance(825)
  const value = test.numeric()
  test.viewport({ top: 801 }); test.advance(5000)
  assert.equal(test.numeric(), value)
  test.viewport({ top: 799 }); test.advance(25)
  assert.equal(test.numeric(), value)
  settled(test)
})

check('legacy matchMedia and absent matchMedia both stay operational', () => {
  const legacyMedia = start({ legacyMedia: true })
  legacyMedia.preference(true)
  assert.equal(legacyMedia.root.dataset.statsPhase, 'settled')
  const missingMedia = start({ noMedia: true })
  settled(missingMedia)
  assert.equal(missingMedia.numeric(), 37000)
})

check('finish is idempotent, commits the latest data and prevents pending scene entry', () => {
  for (const entered of [false, true]) {
    const test = entered ? start() : harness()
    if (entered) test.advance(825)
    test.update('32000')
    test.window.__statsMotionPreview.finish()
    test.window.__statsMotionPreview.finish()
    assert.equal(test.root.dataset.statsPhase, 'settled')
    assert.equal(test.numeric(), 32000)
    assert.equal(test.pending(), 0)
    test.intersect(); test.advance(5000)
    assert.equal(test.jobs.length, 16)
    assert.ok(test.jobs.every(job => job.cancelled))
  }
})

check('destroy commits the latest value, disconnects observers and removes all installed subscriptions', async () => {
  const test = start({ legacyMedia: true })
  test.advance(825)
  test.update('32000'); await flush()
  test.window.__statsMotionPreview.destroy()
  test.window.__statsMotionPreview.destroy()
  assert.equal(test.numeric(), 32000)
  assert.equal(test.pending(), 0)
  assert.equal(test.observations[0].disconnected, true)
  assert.equal(test.mutations[0].disconnected, true)
  assert.equal(test.root.events['stats:data'].length, 0)
  assert.equal(test.document.events.visibilitychange.length, 0)
  test.update('123'); await flush()
  test.visible(false); test.visible(true); test.preference(false); test.intersect(); test.advance(5000)
  assert.equal(test.numeric(), 32000)
  assert.equal(test.jobs.length, 16)
  const noObserver = harness({ observer: false })
  noObserver.window.__statsMotionPreview.destroy()
  assert.equal(noObserver.window.events.scroll.length, 0)
  assert.equal(noObserver.window.events.resize.length, 0)
})

check('missing required roots, number, wrapper or bars do not install partial controllers', () => {
  for (const options of [{ exists: false }, ...['number', 'wrap', 'bars'].map(missing => ({ missing }))]) {
    const test = harness(options)
    assert.equal(test.root.dataset.statsInitialized, undefined)
    assert.equal(test.window.__statsMotionPreview, undefined)
    assert.equal(test.jobs.length, 0)
    assert.equal(test.pending(), 0)
    assert.equal(test.observations.length, 0)
  }
})

check('real home.js skips its legacy DEV counter before the controller loads and passes late API target safely', async () => {
  const test = harness({ run: false })
  await test.home({ stats: { projects: 32000 } })
  assert.equal(test.number.getAttribute('data-count'), '32000')
  assert.equal(test.number.textContent, '37,000', 'Loading admin data must not erase the readable static fallback')
  assert.equal(test.window.__reCountStats, undefined)
  assert.equal(test.pending(), 0)
  test.runMotion()
  assert.equal(test.numeric(), 32000)
  test.intersect(); settled(test)
  assert.equal(test.numeric(), 32000)
  assert.deepEqual(test.requests, ['/api/admin/public/home'])
})

check('real home.js updates a running DEV timeline and a settled total without creating extra clocks', async () => {
  const test = start()
  test.advance(825)
  const value = test.numeric()
  await test.home({ stats: { projects: 50000 } })
  assert.equal(test.numeric(), value)
  assert.equal(test.jobs.length, 16)
  assert.equal(test.pending(), 1)
  settled(test)
  assert.equal(test.numeric(), 50000)
  await test.home({ stats: { projects: 32000 } })
  assert.equal(test.numeric(), 32000)
  assert.equal(test.jobs.length, 16)
  assert.equal(test.pending(), 0)
  await test.home({ stats: { projects: -1 } })
  assert.equal(test.numeric(), 32000)
  assert.equal(test.number.getAttribute('data-count'), '32000')
})

check('real production home.js retains its legacy count-up while admin fetch failures leave DEV fallback intact', async () => {
  const production = harness({ preview: false, run: false, top: 100 })
  await production.home({ stats: { projects: 32000 } })
  assert.equal(typeof production.window.__reCountStats, 'function')
  production.advance(1825)
  assert.equal(production.numeric(), 32000)
  const test = harness()
  await test.home({}, true)
  assert.equal(test.numeric(), 37000)
  assert.equal(test.root.dataset.statsPhase, 'pending')
  assert.equal(test.pending(), 0)
})

check('chart years, inline heights, badges and real metrics remain unchanged throughout motion', () => {
  const test = start()
  test.advance(825); test.update('32000'); settled(test)
  assert.deepEqual(test.bars.map(bar => bar.style.height), heights.map(height => `${height}%`))
  assert.deepEqual(test.bars.map(bar => bar.getAttribute('style')), heights.map(height => `height:${height}%`))
  assert.deepEqual(test.root.querySelectorAll('.sg-year').map(year => year.textContent), years)
  assert.ok(test.jobs.every(job => !job.node.classList.contains('sg-year')), 'Timeline must not move the year labels')
  assert.equal(test.callout.textContent, '▲ 2,400% 7년 누적 성장')
  assert.deepEqual(test.minis.map(mini => mini.textContent), ['98% 재계약률', '7년+ 업계 경험', '50+ 파트너 브랜드'])
  assert.deepEqual([...homepage.matchAll(/\{ y: '(20\d\d)', h: (\d+) \}/g)].map(match => [match[1], Number(match[2])]), years.map((year, index) => [year, heights[index]]))
})

check('DEV-only markup remains accessible and readable without JS, with a whole-silhouette callout', () => {
  assert.match(homepage, /id="homeStats" data-stats-motion=\{import\.meta\.env\.DEV \? 'true' : undefined\}/)
  assert.match(homepage, /import\.meta\.env\.DEV && <link rel="stylesheet" href="\/static\/stats-motion-preview\.css/)
  assert.match(homepage, /import\.meta\.env\.DEV && <script src="\/static\/stats-motion-preview\.js[^"\n]*" defer/)
  assert.match(homepage, /class="sg-num-wrap" role=\{import\.meta\.env\.DEV \? 'img' : undefined\}/)
  assert.match(homepage, /'누적 완료 캠페인 37,000건 이상'/)
  assert.match(homepage, /data-count="37000" aria-hidden=\{import\.meta\.env\.DEV \? 'true' : undefined\}>\{import\.meta\.env\.DEV \? '37,000' : '0'\}/)
  assert.match(homepage, /import\.meta\.env\.DEV && <span class="sg-num-reserve" aria-hidden="true">37,000<\/span>/)
  assert.match(homepage, /<span class="sg-callout-body"><span class="sg-callout-num">/)
  assert.match(legacy, /if\(!statSection \|\| statSection\.hasAttribute\('data-stats-motion'\)\) return/)
  assert.match(legacy, /if\(!motionRoot\) el\.textContent = '0'/)
  const css = fs.readFileSync(new URL('../public/static/stats-motion-preview.css', import.meta.url), 'utf8')
  assert.match(css, /#homeStats\[data-stats-motion="true"\]/)
  assert.match(css, /transform-origin:\s*(?:center bottom|50% 100%|bottom(?: center)?)/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
})

check('reserve shares the number grid cell and fonts, while mobile chart retains a nonshrinking 200px plotting height', () => {
  const css = fs.readFileSync(new URL('../public/static/stats-motion-preview.css', import.meta.url), 'utf8')
  const base = fs.readFileSync(new URL('../public/static/style.css', import.meta.url), 'utf8')
  const rule = className => css.match(new RegExp(`#homeStats\\[data-stats-motion="true"\\] \\.${className}\\s*\\{([^}]+)\\}`))?.[1]
  const number = rule('sg-num'), reserve = rule('sg-num-reserve'), wrap = rule('sg-num-wrap'), unit = rule('sg-unit')
  assert.ok(number && reserve && wrap && unit)
  assert.match(wrap, /display:\s*grid;/)
  assert.match(wrap, /grid-template-columns:\s*max-content max-content;/)
  assert.match(wrap, /align-items:\s*baseline;/)
  assert.match(number, /grid-area:\s*1\s*\/\s*1;/)
  assert.match(reserve, /grid-area:\s*1\s*\/\s*1;/)
  assert.match(unit, /grid-area:\s*1\s*\/\s*2;/)
  assert.match(reserve, /visibility:\s*hidden;/)
  assert.match(number, /min-inline-size:\s*0;/)
  assert.doesNotMatch(css, /min-inline-size:\s*6ch/, 'A padded 6ch minimum reintroduces the final number indent')
  const baseNumber = base.match(/\.sg-num\s*\{([^}]+)\}/)?.[1]
  assert.ok(baseNumber)
  for (const property of ['font-family', 'font-size', 'font-weight', 'line-height']) {
    const value = rule => rule.match(new RegExp(`${property}:\\s*([^;]+);`))?.[1].trim()
    assert.equal(value(reserve), value(baseNumber), `${property} must reserve the actual final number width`)
  }
  assert.match(reserve, /font-variant-numeric:\s*tabular-nums lining-nums;/)
  const mobile = css.slice(css.indexOf('@media (max-width: 820px)'), css.indexOf('@media (prefers-reduced-motion: reduce)'))
  assert.match(mobile, /\.sg-chart\s*\{[^}]*flex:\s*0\s+0\s+200px;[^}]*height:\s*200px;/, 'A flex:1 chart under a column collapses its percentage-height bars')
  assert.match(mobile, /\.sg-num-wrap\s*\{[^}]*justify-content:\s*center;/)
})

check('production SSR excludes stats preview assets and preserves original data, bars, labels and callout', async () => {
  const workerCode = fs.readFileSync(new URL('../dist/_worker.js', import.meta.url), 'utf8')
  const { default: app } = await import('../dist/_worker.js')
  const response = await app.fetch(new Request('https://preview-check.invalid/'), {})
  const html = await response.text()
  assert.equal(response.status, 200)
  assert.match(html, /<section class="stats-section" id="homeStats">/)
  assert.match(html, /<span class="stat-num-big sg-num" data-count="37000">0<\/span>/)
  heights.forEach(height => assert.ok(html.includes(`style="height:${height}%"`)))
  years.forEach(year => assert.ok(html.includes(`<span class="sg-year">${year}</span>`)))
  assert.ok(html.includes('7년 누적 성장'))
  assert.doesNotMatch(html, /(?:src|href)="\/static\/stats-motion-preview\.(?:js|css)/)
  assert.doesNotMatch(html, /class="sg-title-(?:line|mask)"|class="sg-callout-body"|class="sg-num-reserve"/)
  assert.doesNotMatch(workerCode, /\/static\/stats-motion-preview\.(?:js|css)/)
})

let failures = 0
for (const { name, fn } of cases) {
  try { await fn(); console.log(`PASS ${name}`) }
  catch (error) { failures++; console.error(`FAIL ${name}: ${error.message}`) }
}
if (failures) process.exitCode = 1
