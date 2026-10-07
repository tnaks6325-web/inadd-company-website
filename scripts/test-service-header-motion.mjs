import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source = fs.readFileSync(new URL('../public/static/service-header-motion.js', import.meta.url), 'utf8')
const stylesheet = fs.readFileSync(new URL('../public/static/service-header-motion.css', import.meta.url), 'utf8')
const markup = fs.readFileSync(new URL('../src/routes/home-services-preview.tsx', import.meta.url), 'utf8')
const controller = fs.readFileSync(new URL('../public/static/service-motion-preview.js', import.meta.url), 'utf8')
const kinds = ['kicker', 'headline-0', 'headline-1', 'intro-0', 'intro-1']
const flush = async () => { for (let index = 0; index < 24; index++) await Promise.resolve() }

function deferred() {
  let resolve, reject
  const promise = new Promise((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

class Element {
  constructor(tag = 'span') {
    this.tagName = tag.toUpperCase()
    this.dataset = {}
    this.children = []
    this.parentNode = null
    this.attributes = {}
    this.events = {}
    this._text = ''
    this.classes = new Set()
    this.classList = { contains: name => this.classes.has(name), add: (...names) => names.forEach(name => this.classes.add(name)) }
    this.style = { removeProperty(key) { delete this[key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] } }
  }
  set textContent(value) { this._text = String(value); this.children = [] }
  get textContent() { return this._text + this.children.map(node => node.textContent).join('') }
  appendChild(node) { node.parentNode = this; this.children.push(node); return node }
  setAttribute(key, value) {
    this.attributes[key] = String(value)
    if (key.startsWith('data-')) this.dataset[key.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = String(value)
  }
  getAttribute(key) { return this.attributes[key] ?? null }
  addEventListener(name, callback) { (this.events[name] ||= []).push(callback) }
  dispatch(name, event = {}) { (this.events[name] || []).forEach(callback => callback({ target: this, ...event })) }
  matches(selector) {
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1))
    const attribute = selector.match(/^\[([^\]]+)\]$/)
    return attribute ? this.getAttribute(attribute[1]) !== null : this.tagName.toLowerCase() === selector.toLowerCase()
  }
  querySelectorAll(selector) { return this.children.flatMap(node => [...(node.matches(selector) ? [node] : []), ...node.querySelectorAll(selector)]) }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null }
}

function harness({ reduced = false, observer = true, animations = true, legacyMedia = false, hidden = false, sectionExists = true, redesign = true, headerExists = true, partCount = 5, letterCount = 4 } = {}) {
  const section = new Element('section')
  if (redesign) section.classList.add('hsvc-redesign')
  const header = new Element('header')
  header.classList.add('hsvc-redesign-header')
  if (headerExists) section.appendChild(header)
  const heading = new Element('h2')
  heading.setAttribute('aria-label', '브랜드에 필요한, 다음 움직임.')
  const parts = kinds.slice(0, partCount).map((kind, index) => {
    const part = new Element()
    part.setAttribute('data-header-part', kind)
    part.textContent = ['SERVICE / 07', '브랜드에 필요한,', '다음 ', '브랜드의 과제에 맞춰, ', '일곱 가지 서비스를 연결합니다.'][index]
    if (kind.startsWith('headline-')) {
      const line = new Element()
      line.setAttribute('aria-hidden', 'true')
      line.appendChild(part)
      heading.appendChild(line)
    } else header.appendChild(part)
    return part
  })
  header.appendChild(heading)
  const letters = ['움', '직', '임', '.'].slice(0, letterCount).map(letter => {
    const node = new Element()
    node.setAttribute('data-header-letter', '')
    node.textContent = letter
    ;(parts.find(part => part.dataset.headerPart === 'headline-1') || header).appendChild(node)
    return node
  })
  const allAnimations = [], observations = [], documentEvents = {}
  let motionHandler
  const motion = { matches: reduced }
  if (legacyMedia) motion.addListener = callback => { motionHandler = callback }
  else motion.addEventListener = (_, callback) => { motionHandler = callback }

  function animate(element, keyframes, options) {
    const completion = deferred()
    const animation = {
      element, keyframes, options, finished: completion.promise, cancelled: false, done: false, playState: 'running',
      current: { opacity: keyframes[0].opacity ?? 1, translate: keyframes[0].translate ?? 'none', rotate: keyframes[0].rotate ?? 'none', scale: keyframes[0].scale ?? 'none' },
      pause() { this.playState = 'paused' },
      play() { this.playState = 'running' },
      cancel() { this.cancelled = true; completion.reject(new Error('cancelled')) },
      finish() { this.done = true; this.playState = 'finished'; this.current = { ...keyframes.at(-1) }; completion.resolve() },
      sample(pose) { Object.assign(this.current, pose) },
    }
    allAnimations.push(animation)
    return animation
  }
  if (animations) [header, ...parts, ...letters].forEach(node => { node.animate = (frames, options) => animate(node, frames, options) })
  const document = {
    hidden,
    getElementById: id => id === 'services' && sectionExists ? section : null,
    addEventListener: (name, callback) => { documentEvents[name] = callback },
  }
  function computed(node) {
    const animation = allAnimations.findLast(item => item.element === node && !item.cancelled)
    return Object.fromEntries(['opacity', 'translate', 'rotate', 'scale'].map(key => [key, String(animation?.current[key] ?? node.style[key] ?? (key === 'opacity' ? 1 : 'none'))]))
  }
  const window = { matchMedia: () => motion }
  const context = { document, window, getComputedStyle: computed }
  if (observer) {
    window.IntersectionObserver = true
    context.IntersectionObserver = class {
      constructor(callback, options) { this.record = { callback, options }; observations.push(this.record) }
      observe(node) { this.record.node = node }
    }
  }
  vm.runInNewContext(source, context)
  return {
    section, header, heading, parts, letters, allAnimations, observations,
    pending: () => allAnimations.filter(animation => !animation.cancelled && !animation.done),
    visible: value => observations[0].callback([{ isIntersecting: value }]),
    select: detail => section.dispatch('hsvc:selection', { detail }),
    hide: value => { document.hidden = value; documentEvents.visibilitychange?.() },
    motion: async value => { motion.matches = value; motionHandler?.(); await flush() },
    reload: () => vm.runInNewContext(source, context),
    finish: async () => { allAnimations.filter(animation => !animation.cancelled && !animation.done).forEach(animation => animation.finish()); await flush() },
  }
}

const cases = []
function check(name, fn) { cases.push({ name, fn }) }
function assertClear(test) {
  test.parts.concat(test.letters).forEach(node => {
    for (const key of ['opacity', 'translate', 'rotate', 'scale']) assert.equal(node.style[key], undefined)
  })
}
async function ready(test) {
  if (test.observations.length) test.visible(true)
  await test.finish()
  assert.equal(test.header.dataset.headerState, 'ready')
}

check('header waits for first viewport entry, reveals exactly nine tracks once and guards initialization', async () => {
  const test = harness()
  assert.equal(test.header.dataset.headerInitialized, 'true')
  assert.equal(test.header.dataset.headerMotion, 'full')
  assert.equal(test.header.dataset.headerState, 'waiting')
  assert.equal(test.pending().length, 0)
  assert.equal(test.observations.length, 1)
  assert.equal(test.observations[0].node, test.header)
  assert.equal(test.observations[0].options.threshold, .15)
  test.visible(true)
  assert.equal(test.header.dataset.headerState, 'reveal')
  assert.equal(test.pending().length, 9)
  test.reload()
  assert.equal(test.observations.length, 1)
  assert.equal(test.section.events['hsvc:selection'].length, 1)
  await test.finish()
  assert.equal(test.header.dataset.headerState, 'ready')
  test.visible(false)
  test.visible(true)
  assert.equal(test.allAnimations.length, 9, 'Leaving and reentering cannot replay the initial header')
})

check('reveal preserves the specified timing, starts hidden only in WAAPI and never changes text or layout', async () => {
  const test = harness()
  const text = test.header.textContent
  const name = test.heading.getAttribute('aria-label')
  test.visible(true)
  const timings = [[360, 0], [620, 70], [620, 170], [420, 320], [420, 410]]
  test.parts.forEach((node, index) => {
    const track = test.allAnimations.find(animation => animation.element === node)
    assert.equal(track.options.duration, timings[index][0])
    assert.equal(track.options.delay, timings[index][1])
  })
  test.letters.forEach((node, index) => {
    const track = test.allAnimations.find(animation => animation.element === node)
    assert.equal(track.options.duration, 540)
    assert.equal(track.options.delay, 260 + index * 45)
  })
  test.allAnimations.forEach(animation => {
    assert.equal(animation.options.fill, 'both')
    assert.equal(animation.options.iterations, undefined)
    assert.equal(animation.keyframes[0].opacity, 0)
    assert.equal(animation.keyframes.at(-1).opacity, 1)
    animation.keyframes.forEach(frame => {
      for (const key of ['left', 'top', 'width', 'height', 'transform']) assert.equal(frame[key], undefined)
    })
  })
  assert.equal(test.header.textContent, text)
  assert.equal(test.heading.getAttribute('aria-label'), name)
  await test.finish()
  assertClear(test)
})

check('only the full reveal cohort can finish and finished fill tracks never replay on resume', async () => {
  const test = harness()
  test.visible(true)
  const cohort = test.pending()
  cohort.slice(0, -1).forEach(animation => animation.finish())
  await flush()
  assert.equal(test.header.dataset.headerState, 'reveal')
  assert.equal(cohort[0].cancelled, false)
  test.hide(true)
  assert.equal(cohort[0].playState, 'finished')
  assert.equal(cohort.at(-1).playState, 'paused')
  test.hide(false)
  assert.equal(cohort[0].playState, 'finished')
  assert.equal(cohort.at(-1).playState, 'running')
  cohort.at(-1).finish()
  await flush()
  assert.equal(test.header.dataset.headerState, 'ready')
  assert.equal(cohort.every(animation => animation.cancelled), true)
})

check('unfinished reveal pauses offscreen or hidden and resumes only when both visibility conditions hold', async () => {
  const test = harness()
  test.visible(true)
  assert.equal(test.pending().every(animation => animation.playState === 'running'), true)
  test.visible(false)
  assert.equal(test.pending().every(animation => animation.playState === 'paused'), true)
  test.hide(true)
  test.hide(false)
  assert.equal(test.pending().every(animation => animation.playState === 'paused'), true)
  test.visible(true)
  test.hide(true)
  assert.equal(test.pending().every(animation => animation.playState === 'paused'), true)
  test.hide(false)
  assert.equal(test.pending().every(animation => animation.playState === 'running'), true)
  await test.finish()
})

check('without IntersectionObserver the header reveals immediately but waits for a hidden document', async () => {
  const immediate = harness({ observer: false })
  assert.equal(immediate.header.dataset.headerState, 'reveal')
  assert.equal(immediate.pending().length, 9)
  await immediate.finish()
  const hidden = harness({ observer: false, hidden: true })
  assert.equal(hidden.header.dataset.headerState, 'waiting')
  assert.equal(hidden.pending().length, 0)
  hidden.hide(false)
  assert.equal(hidden.header.dataset.headerState, 'reveal')
  assert.equal(hidden.pending().length, 9)
  await hidden.finish()
})

check('initial reduced preference and missing WAAPI produce complete static ready headers', async () => {
  for (const options of [{ reduced: true }, { animations: false }, { reduced: true, observer: false }]) {
    const test = harness(options)
    assert.equal(test.header.dataset.headerMotion, 'reduced')
    assert.equal(test.header.dataset.headerState, 'ready')
    assert.equal(test.allAnimations.length, 0)
    assertClear(test)
    if (test.observations.length) test.visible(true)
    test.select({ service: 'review' })
    assert.equal(test.allAnimations.length, 0)
  }
})

check('reducing motion during reveal cancels all jobs, clears poses and does not replay when removed', async () => {
  const test = harness()
  test.visible(true)
  const cohort = test.pending()
  cohort[0].sample({ opacity: .4, translate: '0px 8px' })
  await test.motion(true)
  assert.equal(cohort.every(animation => animation.cancelled), true)
  assert.equal(test.header.dataset.headerState, 'ready')
  assert.equal(test.header.dataset.headerMotion, 'reduced')
  assertClear(test)
  await test.motion(false)
  assert.equal(test.header.dataset.headerMotion, 'full')
  assert.equal(test.header.dataset.headerState, 'ready')
  assert.equal(test.allAnimations.length, 9)
  test.visible(false)
  test.visible(true)
  assert.equal(test.allAnimations.length, 9)
})

check('legacy matchMedia addListener supports static recovery and no initial replay', async () => {
  const test = harness({ legacyMedia: true })
  test.visible(true)
  await test.motion(true)
  assert.equal(test.header.dataset.headerState, 'ready')
  assert.equal(test.pending().length, 0)
  await test.motion(false)
  assert.equal(test.allAnimations.length, 9)
})

check('selection reactions are skipped before entry, during reveal, offscreen, hidden or reduced', async () => {
  const test = harness()
  test.select({ service: 'performance' })
  assert.equal(test.allAnimations.length, 0)
  test.visible(true)
  test.select({ service: 'review' })
  assert.equal(test.allAnimations.length, 9)
  await test.finish()
  test.visible(false)
  test.select({ service: 'seeding' })
  assert.equal(test.allAnimations.length, 9)
  test.visible(true)
  test.hide(true)
  test.select({ service: 'ppl' })
  assert.equal(test.allAnimations.length, 9)
  test.hide(false)
  await test.motion(true)
  test.select({ service: 'viral' })
  assert.equal(test.allAnimations.length, 9)
})

check('ready selection reacts only the four accent letters and retains semantic header content', async () => {
  const test = harness()
  await ready(test)
  const text = test.header.textContent
  test.select({ service: 'performance' })
  assert.equal(test.header.dataset.headerState, 'react')
  assert.equal(test.pending().length, 4)
  test.pending().forEach((animation, index) => {
    assert.equal(animation.element, test.letters[index])
    assert.equal(animation.options.duration, 500)
    assert.equal(animation.options.delay, index * 35)
    assert.equal(animation.keyframes[0].opacity, '1')
    assert.equal(animation.keyframes.at(-1).translate, '0px 0px')
  })
  assert.equal(test.header.textContent, text)
  assert.equal(test.heading.getAttribute('aria-label'), '브랜드에 필요한, 다음 움직임.')
  await test.finish()
  assert.equal(test.header.dataset.headerState, 'ready')
  assertClear(test)
})

check('rapid reactions snapshot every displayed letter pose and stale completion cannot end the new cohort', async () => {
  const test = harness()
  await ready(test)
  test.select({ service: 'performance' })
  const old = test.pending()
  old.forEach((animation, index) => animation.sample({ opacity: .6 + index * .05, translate: `${index}px -${index + 2}px`, rotate: `${index + .5}deg`, scale: String(.96 + index * .01) }))
  test.select({ service: 'review' })
  assert.equal(old.every(animation => animation.cancelled), true)
  const current = test.pending()
  current.forEach((animation, index) => {
    assert.equal(Number(animation.keyframes[0].opacity), .6 + index * .05)
    assert.equal(animation.keyframes[0].translate, `${index}px -${index + 2}px`)
    assert.equal(animation.keyframes[0].rotate, `${index + .5}deg`)
    assert.equal(animation.keyframes[0].scale, String(.96 + index * .01))
  })
  old.forEach(animation => animation.finish())
  await flush()
  assert.equal(test.header.dataset.headerState, 'react')
  assert.equal(test.pending().length, 4)
  current.slice(0, -1).forEach(animation => animation.finish())
  await flush()
  assert.equal(test.header.dataset.headerState, 'react')
  current.at(-1).finish()
  await flush()
  assert.equal(test.header.dataset.headerState, 'ready')
})

check('reaction pauses in place offscreen, finished reactions do not replay and reduced motion clears interruption', async () => {
  const test = harness()
  await ready(test)
  test.select({ service: 'review' })
  const cohort = test.pending()
  cohort[0].finish()
  await flush()
  test.visible(false)
  assert.equal(cohort[0].playState, 'finished')
  assert.equal(test.pending().every(animation => animation.playState === 'paused'), true)
  test.visible(true)
  assert.equal(cohort[0].playState, 'finished')
  assert.equal(test.pending().every(animation => animation.playState === 'running'), true)
  test.hide(true)
  assert.equal(test.pending().every(animation => animation.playState === 'paused'), true)
  await test.motion(true)
  assert.equal(cohort.every(animation => animation.cancelled), true)
  assert.equal(test.header.dataset.headerState, 'ready')
  assertClear(test)
  test.hide(false)
  await test.motion(false)
  assert.equal(test.allAnimations.length, 13)
})

check('missing section, legacy section, missing header or incomplete header cannot initialize', async () => {
  for (const options of [{ sectionExists: false }, { redesign: false }, { headerExists: false }, { partCount: 0 }, { letterCount: 0 }]) {
    const test = harness(options)
    assert.equal(test.header.dataset.headerInitialized, undefined)
    assert.equal(test.allAnimations.length, 0)
    assert.equal(test.observations.length, 0)
    assert.equal(test.section.events['hsvc:selection'], undefined)
  }
})

check('header markup and stylesheet preserve a visible no-JS fallback and one accessible heading', async () => {
  for (const kind of kinds) assert.match(markup, new RegExp(`data-header-part="${kind}"`))
  assert.match(markup, /\['움', '직', '임', '\.'\]\.map\(letter =>/)
  assert.match(markup, /<h2[^>]*aria-label="브랜드에 필요한, 다음 움직임\."/)
  assert.match(markup, /hsvc-heading-line" aria-hidden="true"/)
  assert.match(markup, /src="\/static\/service-header-motion\.js" defer/)
  assert.match(stylesheet, /\.hsvc-header-part\s*\{[^}]*opacity:\s*1;/)
  assert.match(stylesheet, /\.hsvc-heading-letter\s*\{[^}]*opacity:\s*1;/)
  assert.doesNotMatch(stylesheet, /(?:opacity\s*:\s*0\b|visibility\s*:\s*hidden|display\s*:\s*none)/)
  assert.match(stylesheet, /@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  assert.match(controller, /new CustomEvent\('hsvc:selection',\s*\{\s*bubbles:\s*true/)
})

let failures = 0
for (const { name, fn } of cases) {
  try { await fn(); console.log(`PASS ${name}`) }
  catch (error) { failures++; console.error(`FAIL ${name}: ${error.message}`) }
}
if (failures) process.exitCode = 1
