import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source = fs.readFileSync(new URL('../public/static/service-motion-preview.js', import.meta.url), 'utf8')
const keys = ['viral', 'performance', 'influencer', 'seeding', 'review', 'oliveyoung', 'ppl']
const flush = async () => { for (let index = 0; index < 24; index++) await Promise.resolve() }

function deferred() {
  let resolve, reject
  const promise = new Promise((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

class Element {
  constructor(tag = 'div', id = '') {
    this.tagName = tag.toUpperCase()
    this.id = id
    this.dataset = {}
    this.attributes = {}
    this.events = {}
    this.children = []
    this._text = ''
    this.parentNode = null
    this.hidden = false
    this._classes = new Set()
    this.classList = {
      contains: name => this._classes.has(name),
      add: (...names) => names.forEach(name => this._classes.add(name)),
      remove: (...names) => names.forEach(name => this._classes.delete(name)),
      toggle: (name, active) => active ? this._classes.add(name) : this._classes.delete(name),
    }
    this.style = {
      setProperty(key, value) { this[key.startsWith('--') ? key : key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = String(value) },
      removeProperty(key) { delete this[key]; if (!key.startsWith('--')) delete this[key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] },
    }
    this.rect = { left: 0, top: 0, width: 400, height: 40, bottom: 40 }
    this.clientWidth = 400
  }
  set className(value) { this._classes = new Set(value.split(/\s+/).filter(Boolean)) }
  get className() { return [...this._classes].join(' ') }
  set textContent(value) {
    this.children.forEach(node => { node.parentNode = null })
    this.children = []
    this._text = String(value ?? '')
  }
  get textContent() { return this._text + this.children.map(node => node.textContent).join('') }
  setAttribute(key, value) {
    this.attributes[key] = String(value)
    if (key === 'id') this.id = String(value)
    if (key.startsWith('data-')) this.dataset[key.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = String(value)
  }
  getAttribute(key) { return this.attributes[key] ?? null }
  removeAttribute(key) { delete this.attributes[key] }
  appendChild(node) {
    if (node.parentNode) node.parentNode.children = node.parentNode.children.filter(child => child !== node)
    node.parentNode = this
    this.children.push(node)
    return node
  }
  replaceChildren(...nodes) {
    this.children.forEach(node => { node.parentNode = null })
    this.children = []
    this._text = ''
    nodes.forEach(node => this.appendChild(node))
  }
  get isConnected() { return this.rootConnected || !!this.parentNode?.isConnected }
  get offsetWidth() { return this.rect.width }
  addEventListener(name, callback) { (this.events[name] ||= []).push(callback) }
  dispatch(name, event = {}) { this.events[name]?.forEach(callback => callback({ target: this, ...event })) }
  getBoundingClientRect() { return { ...this.rect } }
  matches(selector) {
    return selector.split(',').some(item => {
      const candidate = item.trim()
      if (candidate.startsWith('.')) return this.classList.contains(candidate.slice(1))
      const attribute = candidate.match(/^\[([^\]=~^$*]+)(?:([~^$*]?=)["']?([^"'\]]*)["']?)?\]$/)
      if (!attribute) return this.tagName.toLowerCase() === candidate.toLowerCase()
      const actual = this.getAttribute(attribute[1])
      if (!attribute[2]) return actual !== null
      if (actual === null) return false
      if (attribute[2] === '=') return actual === attribute[3]
      if (attribute[2] === '^=') return actual.startsWith(attribute[3])
      if (attribute[2] === '$=') return actual.endsWith(attribute[3])
      if (attribute[2] === '*=') return actual.includes(attribute[3])
      return actual.split(/\s+/).includes(attribute[3])
    })
  }
  querySelectorAll(selector) {
    return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)])
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null }
  focus() { this.focused = true }
  closest(selector) {
    let node = this
    while (node) { if (node.matches(selector)) return node; node = node.parentNode }
    return null
  }
}

function harness({ reduced = false, observer = true, animations = true, preview = true, catalog = false, viewportWidth = 1440, counter = catalog } = {}) {
  const nativeTags = { hsvcIconAsset: 'img', hsvcPanelName: 'h3', hsvcPanelLink: 'a', hsvcPanelEn: 'p', hsvcPanelDesc: 'p', hsvcPanelNumber: 'span' }
  const ids = ['hsvcPanel', 'hsvcPanelImg', 'hsvcTabs', 'hsvcTabIndicator', 'hsvcPanelEn', 'hsvcPanelName', 'hsvcPanelDesc', 'hsvcPanelLink', 'hsvcIconAsset']
  if (counter) ids.push('hsvcPanelNumber')
  const nodes = Object.fromEntries(ids.map(id => [id, new Element(nativeTags[id] || 'div', id)]))
  const panel = nodes.hsvcPanel, host = nodes.hsvcPanelImg, fallback = nodes.hsvcIconAsset
  panel.rootConnected = true
  panel.appendChild(host)
  host.appendChild(fallback)
  for (const id of ['hsvcPanelEn', 'hsvcPanelName', 'hsvcPanelDesc', 'hsvcPanelLink']) panel.appendChild(nodes[id])
  nodes.hsvcPanelEn.textContent = 'VIRAL'
  nodes.hsvcPanelName.textContent = '서비스 0'
  nodes.hsvcPanelDesc.textContent = '설명 0'
  nodes.hsvcPanelLink.textContent = '자세히 보기 '
  nodes.hsvcPanelLink.href = '/marketing/viral'
  const arrow = new Element('svg')
  arrow.setAttribute('aria-hidden', 'true')
  nodes.hsvcPanelLink.appendChild(arrow)
  panel.setAttribute('aria-labelledby', 'hsvcTab-viral')
  if (counter) {
    nodes.hsvcPanelNumber.textContent = '01'
    panel.appendChild(nodes.hsvcPanelNumber)
  }
  if (catalog) nodes.hsvcTabs.dataset.layout = 'catalog'
  if (preview) panel.classList.add('hsvc-panel--icons')
  const tabs = keys.map((key, index) => {
    const tab = new Element('button', `hsvcTab-${key}`)
    tab.dataset = { service: key, en: key.toUpperCase(), ko: `서비스 ${index}`, desc: `설명 ${index}`, href: `/marketing/${key}`, img: `/fallback/${key}.webp` }
    tab.rect = { left: index * 100, top: 0, width: 90 + index, height: 40, bottom: 40 }
    if (index === 0) tab.classList.add('active')
    return tab
  })
  function layoutCatalog(width) {
    if (!catalog) return
    const mobile = width <= 760
    nodes.hsvcTabs.rect = { left: 24, top: 12, width: mobile ? 400 : 280, height: mobile ? 240 : 490, bottom: mobile ? 252 : 502 }
    tabs.forEach((tab, index) => {
      const left = 24 + (mobile ? index % 2 * 200 : 0)
      const top = 12 + (mobile ? Math.floor(index / 2) * 60 : index * 70)
      const height = mobile ? 50 : 56
      tab.rect = { left, top, width: mobile ? 190 : 280, height, bottom: top + height }
    })
  }
  layoutCatalog(viewportWidth)
  const partNames = {
    viral: ['Viral/Ground-Shadow', 'Viral/Megaphone', 'Viral/Wave-01', 'Viral/Bubble-01', 'Viral/Bubble-02', 'Viral/Bubble-03'],
    performance: ['Performance/Ground-Shadow', 'Performance/Graph-Panel', 'Performance/Bar-01', 'Performance/Bar-02', 'Performance/Bar-03', 'Performance/Arrow', 'Performance/Target'],
    influencer: ['Influencer/Ground-Shadow', 'Influencer/Connection-01', 'Influencer/Video-Card', 'Influencer/Play-Button', 'Influencer/Profile-Card', 'Influencer/Reaction-01', 'Influencer/Reaction-02'],
    seeding: ['Experience/Ground-Shadow', 'Experience/Box-Back', 'Experience/Sample-Product', 'Experience/Box-Front', 'Experience/Box-Lid-Left', 'Experience/Box-Lid-Right', 'Experience/Check-Card', 'Experience/Check-Mark'],
    review: ['Review/Ground-Shadow', 'Review/Review-Card-02', 'Review/Review-Card-01', 'Review/Star-01', 'Review/Star-02', 'Review/Star-03', 'Review/Star-04', 'Review/Star-05', 'Review/Check-Badge'],
    oliveyoung: ['OliveYoung/Ground-Shadow', 'OliveYoung/Shelf', 'OliveYoung/Cosmetic-Bottle', 'OliveYoung/Cosmetic-Tube', 'OliveYoung/Cosmetic-Jar', 'OliveYoung/Magnifier'],
    ppl: ['PPL/Ground-Shadow', 'PPL/Video-Frame', 'PPL/Spotlight-Beam', 'PPL/Product', 'PPL/Spotlight'],
  }
  const specs = keys.map(key => ({ key, artwork: {
    tag: 'div', attrs: { 'data-node-id': `${key}:root`, 'data-name': 'Editable motion artwork', style: { width: '480px', height: '360px' } },
    children: partNames[key].map((name, index) => ({
      tag: 'div', attrs: { 'data-node-id': `${key}:part-${index}`, 'data-name': name, style: { position: 'absolute', left: `${index * 20}px`, top: `${index * 10}px`, width: '80px', height: '60px' } },
      children: index
        ? /Performance\/Arrow|Experience\/Check-Mark/.test(name)
          ? [{ tag: 'svg', attrs: { style: {} }, children: [{ tag: 'path', attrs: { 'data-name': `${name.split('/')[1]}/Shape-01`, style: {} }, children: [] }] }]
          : []
        : [{ tag: 'img', attrs: { src: `/local/${key}.svg`, width: 10, height: 20, style: {}, inline: false }, children: [] }],
    })),
  } }))
  const fetches = [], images = [], allAnimations = [], created = [], intersections = [], frames = new Map()
  const documentEvents = {}, windowEvents = {}
  let nextFrame = 0, motionHandler
  const motion = { matches: reduced, addEventListener: (_, callback) => { motionHandler = callback }, addListener: callback => { motionHandler = callback } }
  function currentAnimation() { return allAnimations.findLast(animation => !animation.cancelled && !animation.done) }
  function computed(node) {
    const animation = allAnimations.findLast(animation => animation.element === node && !animation.cancelled)
    const drawing = node.closest('.hsvc-motion-scene')?.dataset.phase === 'perform' ? node.cssStrokeSample : null
    return {
      opacity: String(animation?.current ?? node.style.opacity ?? 1),
      transform: animation?.currentTransform ?? node.style.transform ?? 'none',
      filter: animation?.currentFilter ?? node.style.filter ?? 'none',
      translate: animation?.currentTranslate ?? node.style.translate ?? 'none',
      rotate: animation?.currentRotate ?? node.style.rotate ?? 'none',
      scale: animation?.currentScale ?? node.style.scale ?? 'none',
      strokeDasharray: node.style.strokeDasharray ?? drawing?.dash ?? node.getAttribute('stroke-dasharray') ?? 'none',
      strokeDashoffset: node.style.strokeDashoffset ?? drawing?.offset ?? node.getAttribute('stroke-dashoffset') ?? '0px',
    }
  }
  function makeAnimation(element, keyframes, options) {
    const completion = deferred()
    const animation = {
      element, keyframes, options, finished: completion.promise, current: Number(keyframes[0].opacity ?? 1), currentTransform: keyframes[0].transform, currentFilter: keyframes[0].filter,
      currentTranslate: keyframes[0].translate, currentRotate: keyframes[0].rotate, currentScale: keyframes[0].scale,
      currentTime: 0, playState: 'running', cancelled: false, done: false,
      pause() { this.playState = 'paused' }, play() { this.playState = 'running' },
      cancel() { this.cancelled = true; completion.reject(new Error('cancelled')) },
      finish() {
        this.done = true; this.playState = 'finished'; this.current = Number(keyframes.at(-1).opacity ?? 1)
        this.currentTransform = keyframes.at(-1).transform; this.currentFilter = keyframes.at(-1).filter
        this.currentTranslate = keyframes.at(-1).translate; this.currentRotate = keyframes.at(-1).rotate; this.currentScale = keyframes.at(-1).scale
        completion.resolve()
      },
      sample(opacity, transform, filter) { this.current = opacity; if (transform) this.currentTransform = transform; if (filter) this.currentFilter = filter },
      samplePose({ opacity, translate, rotate, scale }) {
        if (opacity !== undefined) this.current = opacity
        if (translate !== undefined) this.currentTranslate = translate
        if (rotate !== undefined) this.currentRotate = rotate
        if (scale !== undefined) this.currentScale = scale
      },
    }
    allAnimations.push(animation)
    return animation
  }
  if (animations) Object.values(nodes).forEach(element => { element.animate = (keyframes, options) => makeAnimation(element, keyframes, options) })
  const document = {
    hidden: false,
    getElementById: id => nodes[id], querySelectorAll: () => tabs,
    addEventListener: (name, callback) => { documentEvents[name] = callback },
    fonts: { ready: Promise.resolve() },
    createElement: tag => {
      const element = new Element(tag)
      created.push(element)
      if (tag === 'img') {
        Object.defineProperty(element, 'src', { get() { return this._src }, set(value) { this._src = value; images.push(this) } })
        element.decode = () => element.decodeFails ? Promise.reject(new Error('decode failed')) : Promise.resolve()
      }
      if (animations) element.animate = (keyframes, options) => makeAnimation(element, keyframes, options)
      return element
    },
  }
  const window = { innerWidth: viewportWidth, matchMedia: () => motion, addEventListener: (name, callback) => { windowEvents[name] = callback }, getComputedStyle: computed }
  const context = {
    document, window, getComputedStyle: computed,
    fetch: url => { const request = { url, ...deferred() }; fetches.push(request); return request.promise },
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame },
    cancelAnimationFrame: frame => frames.delete(frame),
  }
  if (observer) {
    window.IntersectionObserver = true
    context.IntersectionObserver = class {
      constructor(callback, options = {}) { this.record = { callback, options, disconnected: false }; intersections.push(this.record) }
      observe(node) { this.record.node = node }
      disconnect() { this.record.disconnected = true }
    }
  }
  window.ResizeObserver = true
  context.ResizeObserver = class { constructor(callback) { this.callback = callback } observe() {} }
  vm.runInNewContext(source, context)
  return {
    panel, host, fallback, tabs, nodes, fetches, images, allAnimations, document, created,
    viewport: () => created.find(element => element.classList.contains('hsvc-motion-viewport')),
    world: () => created.find(element => element.classList.contains('hsvc-motion-world')),
    scene: () => created.find(element => element.classList.contains('hsvc-motion-world'))?.children[0],
    click: index => tabs[index].dispatch('click'),
    key: (index, key) => { let prevented = false; tabs[index].dispatch('keydown', { key, preventDefault() { prevented = true } }); return prevented },
    reload: () => vm.runInNewContext(source, context),
    manifest: async (ok = true, index = fetches.length - 1) => { fetches[index].resolve({ ok, json: async () => specs }); await flush() },
    image: key => images.findLast(image => image.src === `/local/${key}.svg`),
    loaded: async key => { const image = images.findLast(image => image.src === `/local/${key}.svg`); assert.ok(image, `No image request for ${key}`); image.onload(); await flush() },
    failed: async key => { images.findLast(image => image.src === `/local/${key}.svg`).onerror(); await flush() },
    motion: async value => { motion.matches = value; motionHandler(); await flush() },
    visible: observer ? value => intersections.find(entry => !entry.options.rootMargin).callback([{ isIntersecting: value }]) : null,
    warm: () => intersections.find(entry => entry.options.rootMargin).callback([{ isIntersecting: true }]),
    hide: value => { document.hidden = value; documentEvents.visibilitychange() },
    animation: currentAnimation,
    pendingAnimations: () => allAnimations.filter(animation => !animation.cancelled && !animation.done),
    copyAnimations: () => allAnimations.filter(animation => !animation.cancelled && !animation.done && animation.element.dataset.copyKind),
    copyParts: () => panel.querySelectorAll('.hsvc-copy-part')
      .concat(nodes.hsvcPanelLink.dataset.copyKind ? [nodes.hsvcPanelLink] : [])
      .concat(nodes.hsvcPanelNumber?.dataset.copyKind ? [nodes.hsvcPanelNumber] : []),
    part: name => created.find(element => element.classList.contains('hsvc-motion-world'))?.children[0]?.querySelector(`[data-name="${name}"]`),
    performEnd: (elapsedTime = 1.6, target) => {
      const scene = created.find(element => element.classList.contains('hsvc-motion-world'))?.children[0]
      created.find(element => element.classList.contains('hsvc-motion-world'))?.dispatch('animationend', { elapsedTime, target: target || scene?.children[0] })
    },
    finish: async () => { currentAnimation()?.finish(); await flush() },
    settle: async () => { for (let index = 0; index < 32 && currentAnimation(); index++) { allAnimations.filter(animation => !animation.cancelled && !animation.done).forEach(animation => animation.finish()); await flush() } },
    frame: () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()) },
    resize: width => { window.innerWidth = width; layoutCatalog(width); windowEvents.resize() },
  }
}

async function ready(test) {
  await test.manifest()
  if (test.visible && test.panel.dataset.iconFloat === 'paused') test.visible(true)
  await test.loaded('viral')
  await test.settle()
}

function copySnapshot(test) {
  return {
    en: test.nodes.hsvcPanelEn.textContent,
    name: test.nodes.hsvcPanelName.textContent,
    desc: test.nodes.hsvcPanelDesc.textContent,
    href: test.nodes.hsvcPanelLink.href,
    presented: test.panel.dataset.presentedService,
    labelledBy: test.panel.getAttribute('aria-labelledby'),
    number: test.nodes.hsvcPanelNumber?.textContent,
  }
}

function assertCopyFor(test, index) {
  const tab = test.tabs[index]
  assert.equal(test.nodes.hsvcPanelEn.textContent, tab.dataset.en)
  assert.equal(test.nodes.hsvcPanelName.textContent, tab.dataset.ko)
  assert.equal(test.nodes.hsvcPanelName.getAttribute('aria-label'), tab.dataset.ko)
  assert.equal(test.nodes.hsvcPanelDesc.textContent, tab.dataset.desc)
  assert.equal(test.nodes.hsvcPanelLink.href, tab.dataset.href)
  assert.equal(test.panel.dataset.presentedService, tab.dataset.service)
  assert.equal(test.panel.getAttribute('aria-labelledby'), tab.id)
  if (test.nodes.hsvcPanelNumber) assert.equal(test.nodes.hsvcPanelNumber.textContent, String(index + 1).padStart(2, '0'))
}

const cases = []
function check(name, fn) { cases.push({ name, fn }) }

check('initial fallback, initialization guard, assembly-to-performance-to-idle and cache reuse', async () => {
  const test = harness()
  assert.equal(test.fallback.hidden, false)
  assert.equal(test.images.length, 0)
  await test.manifest()
  test.visible(true)
  await test.loaded('viral')
  assert.equal(test.scene().dataset.phase, 'assemble')
  assert.ok(test.pendingAnimations().length > 1, 'Every named service part has an independent assembly track')
  const cohort = test.pendingAnimations()
  cohort.slice(0, -1).forEach(animation => animation.finish())
  await flush()
  assert.equal(test.scene().dataset.phase, 'assemble', 'A finished early part cannot end the complete assembly')
  assert.equal(cohort[0].cancelled, false, 'Filled poses must be retained until the complete group finishes')
  cohort.at(-1).finish()
  await flush()
  assert.equal(test.fallback.hidden, true)
  assert.equal(test.scene().dataset.service, 'viral')
  assert.equal(test.scene().dataset.phase, 'perform')
  const original = test.scene()
  test.performEnd(1)
  assert.equal(original.dataset.phase, 'perform')
  test.performEnd()
  assert.equal(original.dataset.phase, 'idle')
  test.reload()
  assert.equal(test.tabs[0].events.click.length, 1)
  test.click(1)
  await flush()
  await test.loaded('performance')
  await test.settle()
  test.click(0)
  await flush()
  await test.settle()
  assert.equal(test.scene(), original, 'Cached scene DOM is reused')
  assert.equal(test.images.filter(image => image.src === '/local/viral.svg').length, 1)
})

check('old artwork remains until prepared; late loads cannot commit stale selection', async () => {
  const test = harness()
  await ready(test)
  test.click(1)
  await flush()
  assert.equal(test.scene().dataset.service, 'viral')
  assert.equal(test.nodes.hsvcPanelName.textContent, '서비스 0', 'Presented copy remains aligned with the old icon during preparation')
  assert.equal(test.nodes.hsvcPanelLink.href, '/marketing/viral')
  assert.equal(test.panel.getAttribute('aria-labelledby'), 'hsvcTab-viral')
  test.click(2)
  await flush()
  await test.loaded('performance')
  assert.equal(test.scene().dataset.service, 'viral')
  await test.loaded('influencer')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'influencer')
  assertCopyFor(test, 2)
  assert.equal(test.panel.getAttribute('aria-busy'), 'false')
  assert.equal(test.tabs.filter(tab => tab.getAttribute('aria-selected') === 'true').length, 1)
})

check('tab and indicator update immediately while copy, href and artwork commit atomically after the full exit', async () => {
  const test = harness()
  await ready(test)
  const before = copySnapshot(test)
  test.click(1)
  assert.equal(test.panel.dataset.selectedService, 'performance')
  assert.equal(test.tabs[1].getAttribute('aria-selected'), 'true')
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(100px,39px,0) scaleX(91)')
  assert.deepEqual(copySnapshot(test), before)
  assert.equal(test.panel.getAttribute('aria-busy'), 'true')
  await flush()
  await test.loaded('performance')
  assert.equal(test.scene().dataset.service, 'viral')
  assert.equal(test.scene().dataset.phase, 'exit')
  assert.deepEqual(copySnapshot(test), before)
  assert.equal(test.nodes.hsvcPanelLink.inert, true)
  const graphics = test.pendingAnimations().filter(animation => !animation.element.dataset.copyKind)
  const copy = test.copyAnimations()
  assert.ok(graphics.length > 1)
  assert.ok(copy.length >= 4, 'Eyebrow, title, description and the native CTA join the same outgoing cohort')
  graphics.forEach(animation => animation.finish())
  await flush()
  assert.equal(test.scene().dataset.service, 'viral', 'Graphics finishing first cannot commit ahead of the copy exit')
  assert.deepEqual(copySnapshot(test), before)
  copy.forEach(animation => animation.finish())
  await flush()
  assert.equal(test.scene().dataset.service, 'performance')
  assert.equal(test.scene().dataset.phase, 'assemble')
  assertCopyFor(test, 1)
  assert.equal(test.nodes.hsvcPanelLink.inert, false)
  assert.equal(test.panel.getAttribute('aria-busy'), 'false')
})

check('title tokens retain exact text and one accessible name while native CTA content is preserved', async () => {
  const test = harness()
  const title = '인플루언서 · 유튜브 마케팅'
  const description = '브랜드가 스스로 말하게 하고 검색하게 하고 다시 찾게 하는 구조를 만들어 드립니다.'
  const arrow = test.nodes.hsvcPanelLink.querySelector('svg')
  test.tabs[0].dataset.ko = title
  test.tabs[0].dataset.desc = description
  await test.manifest()
  test.visible(true)
  await test.loaded('viral')
  assertCopyFor(test, 0)
  const titleMasks = test.nodes.hsvcPanelName.children
  assert.equal(titleMasks.length, 2)
  assert.equal(titleMasks[0].textContent, '인플루언서 · 유튜브 ')
  assert.equal(titleMasks[1].textContent, '마케팅')
  assert.equal(titleMasks.every(mask => mask.getAttribute('aria-hidden') === 'true'), true)
  assert.equal(test.nodes.hsvcPanelName.tagName, 'H3')
  assert.equal(test.nodes.hsvcPanelName.getAttribute('aria-label'), title)
  assert.equal(test.nodes.hsvcPanelDesc.textContent, description)
  assert.equal(test.nodes.hsvcPanelLink.tagName, 'A')
  assert.equal(test.nodes.hsvcPanelLink.querySelector('svg'), arrow, 'Animated CTA keeps the existing native arrow instead of replacing its content')
  assert.equal(test.nodes.hsvcPanelLink.textContent, '자세히 보기 ')
  const titleTracks = test.copyAnimations().filter(animation => animation.element.dataset.copyKind.startsWith('title-'))
  assert.equal(titleTracks.length, 2)
  assert.equal(titleTracks[0].keyframes[0].translate, '0px 110%')
  assert.ok(titleTracks[1].options.delay > titleTracks[0].options.delay, 'The two visible title tokens enter in order')
  await test.settle()
  assert.equal(test.scene().dataset.phase, 'perform')
})

check('copy cohort participation prevents early perform and clears completed entrance poses', async () => {
  const test = harness()
  await test.manifest()
  test.visible(true)
  await test.loaded('viral')
  const graphics = test.pendingAnimations().filter(animation => !animation.element.dataset.copyKind)
  const copy = test.copyAnimations()
  assert.ok(copy.length >= 4)
  graphics.forEach(animation => animation.finish())
  await flush()
  assert.equal(test.scene().dataset.phase, 'assemble')
  copy.slice(0, -1).forEach(animation => animation.finish())
  await flush()
  assert.equal(test.scene().dataset.phase, 'assemble', 'CTA or another trailing copy track keeps the full scene in assembly')
  copy.at(-1).finish()
  await flush()
  assert.equal(test.scene().dataset.phase, 'perform')
  assert.equal(test.pendingAnimations().length, 0)
  test.copyParts().forEach(node => {
    for (const property of ['opacity', 'translate', 'rotate', 'scale']) assert.equal(node.style[property], undefined)
  })
})

check('rapid selection snapshots title and CTA poses, then latest copy and graphic win together', async () => {
  const test = harness()
  await test.manifest()
  test.visible(true)
  await test.loaded('viral')
  const before = copySnapshot(test)
  const cohort = test.pendingAnimations()
  const title = test.copyAnimations().find(animation => animation.element.dataset.copyKind === 'title-0')
  const cta = test.copyAnimations().find(animation => animation.element.dataset.copyKind === 'cta')
  title.samplePose({ opacity: .46, translate: '0px 54%', rotate: '1.4deg', scale: '.97' })
  cta.samplePose({ opacity: .31, translate: '9px 8px' })
  test.click(1)
  assert.equal(cohort.every(animation => animation.cancelled), true)
  assert.deepEqual(copySnapshot(test), before)
  assert.equal(Number(title.element.style.opacity), .46)
  assert.equal(title.element.style.translate, '0px 54%')
  assert.equal(cta.element.style.translate, '9px 8px')
  await flush()
  await test.loaded('performance')
  const outgoingTitle = test.copyAnimations().find(animation => animation.element === title.element)
  assert.equal(Number(outgoingTitle.keyframes[0].opacity), .46)
  assert.equal(outgoingTitle.keyframes[0].translate, '0px 54%')
  outgoingTitle.samplePose({ opacity: .22, translate: '-8px 32%' })
  const interrupted = test.pendingAnimations()
  test.click(4)
  assert.equal(interrupted.every(animation => animation.cancelled), true)
  assert.equal(test.nodes.hsvcPanelLink.inert, false, 'A new selection releases the frozen old CTA while the next asset prepares')
  assert.deepEqual(copySnapshot(test), before)
  interrupted.forEach(animation => animation.finish())
  await flush()
  assert.deepEqual(copySnapshot(test), before, 'A stale exit completion cannot replace only the copy')
  await test.loaded('review')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'review')
  assertCopyFor(test, 4)
  assert.equal(test.nodes.hsvcPanelLink.inert, false)
  assert.equal(test.panel.getAttribute('aria-busy'), 'false')
})

check('an interrupted partially finished exit retains hidden copy fill and can replay the displayed scene', async () => {
  const test = harness()
  await ready(test)
  test.click(1)
  await flush()
  await test.loaded('performance')
  const title = test.copyAnimations().find(animation => animation.element.dataset.copyKind === 'title-0')
  const cta = test.copyAnimations().find(animation => animation.element.dataset.copyKind === 'cta')
  title.finish()
  cta.finish()
  await flush()
  assert.equal(test.scene().dataset.phase, 'exit')
  test.click(4)
  assert.equal(Number(title.element.style.opacity), 0, 'A finished held-fill copy exit stays hidden instead of flashing back at interruption')
  assert.equal(Number(cta.element.style.opacity), 0)
  assert.equal(test.nodes.hsvcPanelLink.inert, false)
  assertCopyFor(test, 0)
  test.click(0)
  assert.equal(test.scene().dataset.phase, 'assemble')
  assert.equal(title.element.style.opacity, undefined)
  assert.equal(cta.element.style.opacity, undefined)
  assert.ok(test.copyAnimations().length >= 4)
  await test.settle()
  assert.equal(test.scene().dataset.service, 'viral')
  assert.equal(test.scene().dataset.phase, 'perform')
  assertCopyFor(test, 0)
})

check('copy tracks pause with graphic tracks offscreen or when the document is hidden', async () => {
  const test = harness()
  await test.manifest()
  await test.loaded('viral')
  assert.ok(test.copyAnimations().length >= 4)
  assert.equal(test.copyAnimations().every(animation => animation.playState === 'paused'), true)
  test.visible(true)
  assert.equal(test.copyAnimations().every(animation => animation.playState === 'running'), true)
  test.hide(true)
  assert.equal(test.pendingAnimations().every(animation => animation.playState === 'paused'), true)
  test.hide(false)
  assert.equal(test.copyAnimations().every(animation => animation.playState === 'running'), true)
  test.visible(false)
  assert.equal(test.copyAnimations().every(animation => animation.playState === 'paused'), true)
  test.visible(true)
  await test.settle()
  assert.equal(test.scene().dataset.phase, 'perform')
})

check('reduced motion clears interrupted copy poses and commits latest copy, link and graphic statically', async () => {
  const test = harness()
  await ready(test)
  test.click(1)
  await flush()
  await test.loaded('performance')
  const outgoing = test.pendingAnimations()
  test.copyAnimations().forEach(animation => animation.samplePose({ opacity: .28, translate: '-14px -7px' }))
  await test.motion(true)
  assert.equal(outgoing.every(animation => animation.cancelled), true)
  assert.equal(test.scene().dataset.service, 'performance')
  assert.equal(test.scene().dataset.phase, 'static')
  assertCopyFor(test, 1)
  assert.equal(test.nodes.hsvcPanelLink.inert, false)
  assert.equal(test.pendingAnimations().length, 0)
  test.copyParts().forEach(node => {
    for (const property of ['opacity', 'translate', 'rotate', 'scale']) assert.equal(node.style[property], undefined)
  })
  await test.motion(false)
  assert.equal(test.scene().dataset.phase, 'idle')
  assert.equal(test.pendingAnimations().length, 0, 'Removing reduced motion does not replay the copy entrance')
})

check('same-displayed rapid reselect cancels exit and replays a complete assembly', async () => {
  const test = harness()
  await ready(test)
  test.click(1)
  await flush()
  await test.loaded('performance')
  const exiting = test.pendingAnimations()
  exiting.forEach(animation => animation.samplePose({ opacity: .35, translate: '-24px 9px', rotate: '-7deg', scale: '.8' }))
  test.click(0)
  await flush()
  assert.equal(test.scene().dataset.phase, 'assemble')
  assert.ok(test.pendingAnimations().length > 1)
  await test.settle()
  assert.equal(exiting.every(animation => animation.cancelled), true)
  assert.equal(test.scene().dataset.service, 'viral')
  assert.equal(test.scene().dataset.phase, 'perform')
  assert.equal(test.viewport().style.opacity, '1')
  assert.equal(test.panel.dataset.iconState, 'ready', 'Reselecting the already displayed service must not leave a loading state')
  assert.equal(test.panel.getAttribute('aria-busy'), 'false')
})

check('reduced-motion change during outgoing part exit commits latest static scene', async () => {
  const test = harness()
  await ready(test)
  test.click(1)
  await flush()
  await test.loaded('performance')
  const outgoing = test.pendingAnimations()
  outgoing.forEach(animation => animation.samplePose({ opacity: .3, translate: '-16px 12px' }))
  await test.motion(true)
  await flush()
  assert.equal(outgoing.every(animation => animation.cancelled), true)
  assert.equal(test.scene().dataset.service, 'performance')
  assert.equal(test.scene().dataset.phase, 'static')
  assert.equal(test.viewport().style.opacity, '1')
  assert.equal(test.panel.dataset.iconFloat, 'paused')
  await test.motion(false)
  assert.equal(test.scene().dataset.phase, 'idle', 'Removing reduced motion resumes idle instead of replaying entrance')
})

check('interrupted exit preserves each part pose and cannot finish a stale commit', async () => {
  const test = harness()
  await ready(test)
  test.click(1)
  await flush()
  await test.loaded('performance')
  const firstExit = test.pendingAnimations()
  const interruptedPart = firstExit.find(animation => animation.element.getAttribute('data-name') === 'Viral/Megaphone')
  interruptedPart.samplePose({ opacity: .27, translate: '-21px 13px', rotate: '-5deg', scale: '.87' })
  test.click(4)
  await flush()
  assert.equal(firstExit.every(animation => animation.cancelled), true)
  assert.equal(Number(interruptedPart.element.style.opacity), .27)
  assert.equal(interruptedPart.element.style.translate, '-21px 13px')
  firstExit.forEach(animation => animation.finish())
  await flush()
  assert.equal(test.scene().dataset.service, 'viral')
  await test.loaded('review')
  const nextPart = test.pendingAnimations().find(animation => animation.element === interruptedPart.element)
  assert.equal(Number(nextPart.keyframes[0].opacity), .27)
  assert.equal(nextPart.keyframes[0].translate, '-21px 13px')
  assert.equal(nextPart.keyframes[0].rotate, '-5deg')
  assert.equal(nextPart.keyframes[0].scale, '.87')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'review')
  assert.equal(test.viewport().style.opacity, '1')
})

check('viewport and hidden-document pause/resume retain transitions', async () => {
  const test = harness()
  await test.manifest()
  assert.equal(test.panel.dataset.iconFloat, 'paused')
  test.warm()
  await flush()
  assert.equal(test.images.length, 7)
  await test.loaded('viral')
  assert.equal(test.pendingAnimations().every(animation => animation.playState === 'paused'), true)
  test.visible(true)
  assert.equal(test.pendingAnimations().every(animation => animation.playState === 'running'), true)
  test.hide(true)
  assert.equal(test.pendingAnimations().every(animation => animation.playState === 'paused'), true)
  test.hide(false)
  assert.equal(test.pendingAnimations().every(animation => animation.playState === 'running'), true)
  test.visible(false)
  test.hide(true)
  test.hide(false)
  assert.equal(test.animation().playState, 'paused', 'Unhiding the document cannot resume an offscreen panel')
  test.visible(true)
  await test.settle()
})

check('new selection during assembly cancels the complete old cohort and commits only latest', async () => {
  const test = harness()
  await test.manifest()
  test.visible(true)
  await test.loaded('viral')
  const initial = test.scene()
  const assembly = test.pendingAnimations()
  assert.equal(initial.dataset.phase, 'assemble')
  const megaphone = assembly.find(animation => animation.element.getAttribute('data-name') === 'Viral/Megaphone')
  megaphone.samplePose({ opacity: .45, translate: '36px 18px', rotate: '-9deg', scale: '.7' })
  test.click(1)
  await flush()
  assert.equal(assembly.every(animation => animation.cancelled), true)
  assert.equal(initial.dataset.phase, 'static')
  assert.equal(megaphone.element.style.translate, '36px 18px')
  test.click(4)
  await flush()
  assembly.forEach(animation => animation.finish())
  await test.loaded('performance')
  assert.equal(test.scene(), initial)
  await test.loaded('review')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'review')
  assert.equal(test.scene().dataset.phase, 'perform')
  assert.equal(test.panel.dataset.selectedService, 'review')
  assert.equal(test.world().children.length, 1)
})

check('new selection during performance ignores late events from the detached old scene', async () => {
  const test = harness()
  await ready(test)
  const previous = test.scene()
  assert.equal(previous.dataset.phase, 'perform')
  test.click(2)
  await flush()
  test.performEnd(1.6, previous.children[0])
  assert.equal(previous.dataset.phase, 'static')
  await test.loaded('influencer')
  await test.settle()
  assert.equal(test.scene().dataset.phase, 'perform')
  test.performEnd(1.6, previous.children[0])
  assert.equal(test.scene().dataset.phase, 'perform', 'An old scene must not finish the current performance')
  test.performEnd()
  assert.equal(test.scene().dataset.phase, 'idle')
})

check('interrupted stroked-path performance freezes dash state and clears it on cached replay or reduced motion', async () => {
  const test = harness()
  await ready(test)
  test.performEnd()
  test.click(1)
  await flush()
  await test.loaded('performance')
  await test.settle()
  const original = test.scene()
  const path = original.querySelector('path')
  assert.ok(path, 'Performance fixture contains a stroked SVG path nested under its arrow wrapper')
  path.setAttribute('stroke-dasharray', '1 1')
  path.setAttribute('stroke-dashoffset', '0')
  path.cssStrokeSample = { dash: '1px, 1px', offset: '.63px' }

  test.click(4)
  assert.equal(original.dataset.phase, 'static')
  assert.equal(path.style.strokeDasharray, '1px, 1px', 'The CSS-computed dash is sampled before removing the performance phase')
  assert.equal(path.style.strokeDashoffset, '.63px', 'A partially drawn path must not jump complete while the next asset prepares')
  await flush()
  await test.loaded('review')
  assert.equal(path.style.strokeDashoffset, '.63px', 'The frozen drawing persists during outgoing part motion')
  await test.settle()

  test.click(1)
  await flush()
  await test.settle()
  assert.equal(test.scene(), original, 'The same cached inline-SVG scene is reused')
  assert.equal(path.style.strokeDasharray, undefined)
  assert.equal(path.style.strokeDashoffset, undefined)
  assert.equal(path.getAttribute('stroke-dasharray'), '1 1', 'Clearing temporary CSS keeps the exported SVG attributes intact')
  assert.equal(path.getAttribute('stroke-dashoffset'), '0')

  path.cssStrokeSample = { dash: '1px, 1px', offset: '.21px' }
  test.click(1)
  assert.equal(original.dataset.phase, 'assemble')
  assert.equal(path.style.strokeDasharray, undefined, 'Same-service replay clears the newly frozen drawing before assembly')
  assert.equal(path.style.strokeDashoffset, undefined)
  await test.settle()
  test.click(4)
  assert.equal(path.style.strokeDashoffset, '.21px')
  await test.motion(true)
  assert.equal(path.style.strokeDasharray, undefined, 'Reduced motion restores a complete untrimmed native SVG pose')
  assert.equal(path.style.strokeDashoffset, undefined)
  assert.equal(path.getAttribute('stroke-dasharray'), '1 1')
  assert.equal(path.getAttribute('stroke-dashoffset'), '0')
  assert.equal(test.scene().dataset.service, 'review')
  assert.equal(test.scene().dataset.phase, 'static')
})

check('same idle service replays assembly without fetching or replacing cached DOM', async () => {
  const test = harness()
  await ready(test)
  test.performEnd()
  const scene = test.scene()
  const previousCopy = test.copyParts()
  const previousAnimations = test.allAnimations.length
  const previousImages = test.images.length
  test.click(0)
  await flush()
  assert.equal(test.scene(), scene)
  assert.equal(test.scene().dataset.phase, 'assemble')
  assert.ok(test.allAnimations.length > previousAnimations)
  assert.equal(test.images.length, previousImages)
  assert.deepEqual(test.copyParts(), previousCopy, 'Same-service replay reuses the currently presented copy nodes')
  assert.equal(test.copyAnimations().length, previousCopy.length)
  assertCopyFor(test, 0)
  assert.equal(test.panel.getAttribute('aria-busy'), 'false')
  await test.settle()
  assert.equal(scene.dataset.phase, 'perform')
})

check('reduced motion during assembly and performance clears part poses and has no replay', async () => {
  const test = harness()
  await test.manifest()
  test.visible(true)
  await test.loaded('viral')
  const scene = test.scene()
  const assembly = test.pendingAnimations()
  await test.motion(true)
  assert.equal(assembly.every(animation => animation.cancelled), true)
  assert.equal(scene.dataset.phase, 'static')
  assert.equal(test.pendingAnimations().length, 0)
  scene.querySelectorAll('[data-name]').forEach(part => {
    for (const property of ['opacity', 'translate', 'rotate', 'scale']) assert.equal(part.style[property], undefined)
  })
  await test.motion(false)
  assert.equal(scene.dataset.phase, 'idle')
  test.click(0)
  await test.settle()
  assert.equal(scene.dataset.phase, 'perform')
  await test.motion(true)
  assert.equal(scene.dataset.phase, 'static')
  test.performEnd()
  assert.equal(scene.dataset.phase, 'static')
})

check('part transforms preserve authored layout and use separate scale/rotate/translate properties', async () => {
  const test = harness()
  await test.manifest()
  test.visible(true)
  await test.loaded('viral')
  const before = test.scene().querySelectorAll('[data-name]').map(part => ({ part, left: part.style.left, top: part.style.top, width: part.style.width, height: part.style.height }))
  const assembly = test.pendingAnimations().filter(animation => !animation.element.dataset.copyKind)
  assembly.forEach(animation => {
    assert.equal(animation.element.classList.contains('hsvc-motion-world'), false, 'Layout scaling world is never part-animated')
    animation.keyframes.forEach(frame => {
      assert.equal(frame.transform, undefined, 'Individual transforms cannot overwrite Figma transform placement')
      for (const property of ['left', 'top', 'width', 'height']) assert.equal(frame[property], undefined)
    })
    assert.ok(animation.options.duration <= 1000)
    assert.ok(animation.options.delay <= 200)
  })
  await test.settle()
  before.forEach(({ part, left, top, width, height }) => {
    assert.equal(part.style.left, left); assert.equal(part.style.top, top)
    assert.equal(part.style.width, width); assert.equal(part.style.height, height)
  })
  assert.match(test.world().style.transform, /^scale\(/)
})

check('all seven services assemble on independent tracks and settle to one complete scene', async () => {
  const test = harness()
  await ready(test)
  test.performEnd()
  for (let index = 1; index < keys.length; index++) {
    test.click(index)
    await flush()
    await test.loaded(keys[index])
    const exit = test.pendingAnimations()
    assert.ok(exit.length > 1)
    exit.forEach(animation => assert.equal(animation.keyframes.at(-1).opacity, 0))
    exit.forEach(animation => animation.finish())
    await flush()
    assert.equal(test.scene().dataset.service, keys[index])
    assert.equal(test.scene().dataset.phase, 'assemble')
    assertCopyFor(test, index)
    assert.ok(test.pendingAnimations().length > 1)
    assert.equal(test.world().children.length, 1)
    await test.settle()
    assert.equal(test.scene().dataset.phase, 'perform')
    test.performEnd()
    assert.equal(test.scene().dataset.phase, 'idle')
    assert.equal(test.panel.getAttribute('aria-busy'), 'false')
  }
})

check('a completed early cohort part is not replayed when visibility changes', async () => {
  const test = harness()
  await test.manifest()
  test.visible(true)
  await test.loaded('viral')
  const cohort = test.pendingAnimations()
  const completed = cohort[0]
  completed.finish()
  await flush()
  test.hide(true)
  assert.equal(completed.playState, 'finished')
  assert.equal(test.pendingAnimations().every(animation => animation.playState === 'paused'), true)
  test.hide(false)
  assert.equal(completed.playState, 'finished', 'Resuming visibility must not restart a finished held-fill track')
  await test.settle()
  assert.equal(test.scene().dataset.phase, 'perform')
})

check('a stale failed asset cannot replace the current service with its fallback', async () => {
  const test = harness()
  await ready(test)
  test.click(1)
  await flush()
  test.click(2)
  await flush()
  await test.loaded('influencer')
  await test.settle()
  await test.failed('performance')
  assert.equal(test.scene().dataset.service, 'influencer')
  assertCopyFor(test, 2)
  assert.equal(test.fallback.hidden, true)
  assert.equal(test.panel.dataset.iconState, 'ready')
})

check('missing Web Animations API still selects a complete static pose without reduced preference', async () => {
  const test = harness({ observer: false, animations: false })
  await ready(test)
  assert.equal(test.scene().dataset.phase, 'static')
  test.click(4)
  await flush()
  await test.loaded('review')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'review')
  assert.equal(test.scene().dataset.phase, 'static')
  assertCopyFor(test, 4)
  assert.equal(test.nodes.hsvcPanelLink.inert, false)
  assert.equal(test.fallback.hidden, true)
  assert.equal(test.allAnimations.length, 0)
  assert.equal(test.panel.getAttribute('aria-busy'), 'false')
})

check('asset failure fallback, retried request and no stale artwork exposure', async () => {
  const test = harness()
  await ready(test)
  test.click(1)
  await flush()
  await test.failed('performance')
  await test.settle()
  assert.equal(test.panel.dataset.iconState, 'error')
  assert.equal(test.fallback.src, '/fallback/performance.webp')
  assert.equal(test.fallback.hidden, false)
  assert.equal(test.viewport().hidden, true)
  assertCopyFor(test, 1)
  assert.equal(test.nodes.hsvcPanelLink.inert, false)
  assert.equal(test.nodes.hsvcPanelLink.querySelectorAll('svg').length, 1)
  test.copyParts().forEach(node => {
    for (const property of ['opacity', 'translate', 'rotate', 'scale']) assert.equal(node.style[property], undefined)
  })
  const failedImage = test.image('performance')
  test.click(1)
  await flush()
  assert.notEqual(test.image('performance'), failedImage, 'Failed per-scene preparation can be retried')
  assert.equal(test.viewport().hidden, true, 'While retrying, stale artwork must stay hidden beside the fallback')
  await test.loaded('performance')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'performance')
  assertCopyFor(test, 1)
  assert.equal(test.fallback.hidden, true)
  assert.equal(test.viewport().hidden, false)
})

check('a failed manifest fetch is retried after selecting a service again', async () => {
  const test = harness()
  await test.manifest(false)
  await test.settle()
  assert.equal(test.panel.dataset.iconState, 'error')
  assertCopyFor(test, 0)
  test.click(1)
  await flush()
  assert.equal(test.fetches.filter(request => request.url.endsWith('scenes.json')).length, 2, 'A failed manifest Promise must not poison every subsequent retry')
  await test.manifest(true)
  await test.loaded('performance')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'performance')
  assertCopyFor(test, 1)
})

check('decode failure uses fallback and invalidates the preparation cache', async () => {
  const test = harness()
  await ready(test)
  test.click(2)
  await flush()
  const image = test.image('influencer')
  image.decodeFails = true
  await test.loaded('influencer')
  await test.settle()
  assert.equal(test.panel.dataset.iconState, 'error')
  assert.equal(test.fallback.hidden, false)
  assertCopyFor(test, 2)
  test.click(2)
  await flush()
  assert.notEqual(test.image('influencer'), image)
  await test.loaded('influencer')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'influencer')
  assertCopyFor(test, 2)
})

check('keyboard wraps, measured indicator, no-animation/no-observer fallback', async () => {
  const test = harness({ reduced: true, observer: false, animations: false })
  await ready(test)
  assert.equal(test.key(0, 'ArrowLeft'), true)
  await flush()
  await test.loaded('ppl')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'ppl')
  assert.equal(test.tabs[6].focused, true)
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(600px,39px,0) scaleX(96)')
  assert.equal(test.panel.getAttribute('aria-labelledby'), 'hsvcTab-ppl')
  assert.equal(test.key(6, 'Home'), true)
  await flush()
  assert.equal(test.scene().dataset.service, 'viral')
  assert.equal(test.tabs.filter(tab => tab.tabIndex === 0).length, 1)
  assert.equal(test.key(0, 'Tab'), false)
  assert.equal(test.allAnimations.length, 0)
})

check('desktop catalog has a measured vertical indicator and atomic two-digit scene counter', async () => {
  const test = harness({ catalog: true })
  await ready(test)
  assert.equal(test.nodes.hsvcTabs.dataset.indicatorAxis, 'vertical')
  assert.equal(test.nodes.hsvcTabs.getAttribute('aria-orientation'), 'vertical')
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(0px,0px,0) scaleY(56)')
  assertCopyFor(test, 0)
  const before = copySnapshot(test)
  test.click(2)
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(0px,140px,0) scaleY(56)')
  assert.equal(test.panel.dataset.selectedService, 'influencer')
  assert.deepEqual(copySnapshot(test), before)
  await flush()
  await test.loaded('influencer')
  assert.equal(test.nodes.hsvcPanelNumber.textContent, '01', 'The decorative number must not lead the outgoing service copy')
  await test.settle()
  assertCopyFor(test, 2)
  assert.equal(test.nodes.hsvcPanelNumber.textContent, '03')
  test.tabs[2].rect = { left: 37, top: 169, width: 263, height: 68, bottom: 237 }
  test.click(2)
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(13px,157px,0) scaleY(68)', 'The vertical marker uses selected row measurements, not hard-coded index offsets')
})

check('desktop catalog Up and Down follow single rows while Left and Right remain adjacent', async () => {
  const test = harness({ catalog: true, reduced: true, observer: false, animations: false })
  await ready(test)
  assert.equal(test.key(0, 'ArrowDown'), true)
  await flush()
  assert.equal(test.tabs[1].focused, true)
  await test.loaded('performance')
  assertCopyFor(test, 1)
  assert.equal(test.key(1, 'ArrowDown'), true)
  await flush()
  await test.loaded('influencer')
  assertCopyFor(test, 2)
  assert.equal(test.key(2, 'ArrowUp'), true)
  await flush()
  assertCopyFor(test, 1)
  assert.equal(test.key(1, 'ArrowLeft'), true)
  await flush()
  assertCopyFor(test, 0)
  assert.equal(test.key(0, 'ArrowUp'), true)
  await flush()
  await test.loaded('ppl')
  assertCopyFor(test, 6)
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(0px,420px,0) scaleY(56)')
  assert.equal(test.tabs.filter(tab => tab.tabIndex === 0).length, 1)
})

check('mobile catalog uses a horizontal row underline and two-column Up and Down navigation', async () => {
  const test = harness({ catalog: true, viewportWidth: 390, reduced: true, observer: false, animations: false })
  await ready(test)
  assert.equal(test.nodes.hsvcTabs.dataset.indicatorAxis, 'horizontal')
  assert.equal(test.nodes.hsvcTabs.getAttribute('aria-orientation'), 'horizontal')
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(0px,49px,0) scaleX(190)')
  assert.equal(test.key(0, 'ArrowDown'), true)
  await flush()
  await test.loaded('influencer')
  assertCopyFor(test, 2)
  assert.equal(test.tabs[2].focused, true)
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(0px,109px,0) scaleX(190)')
  assert.equal(test.key(2, 'ArrowRight'), true)
  await flush()
  await test.loaded('seeding')
  assertCopyFor(test, 3)
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(200px,109px,0) scaleX(190)')
  assert.equal(test.key(3, 'ArrowUp'), true)
  await flush()
  await test.loaded('performance')
  assertCopyFor(test, 1)
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(200px,49px,0) scaleX(190)')
  assert.equal(test.key(1, 'ArrowLeft'), true)
  await flush()
  assertCopyFor(test, 0)
  assert.equal(test.key(0, 'End'), true)
  await flush()
  await test.loaded('ppl')
  assertCopyFor(test, 6)
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(0px,229px,0) scaleX(190)')
})

check('catalog breakpoint reorients its measured marker without changing presented content or replaying', async () => {
  const test = harness({ catalog: true, viewportWidth: 768 })
  await ready(test)
  test.click(5)
  await flush()
  await test.loaded('oliveyoung')
  await test.settle()
  const before = copySnapshot(test)
  const scene = test.scene()
  const animationsBefore = test.allAnimations.length
  test.resize(760)
  test.frame()
  assert.equal(test.nodes.hsvcTabs.dataset.indicatorAxis, 'horizontal')
  assert.equal(test.nodes.hsvcTabs.getAttribute('aria-orientation'), 'horizontal')
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(200px,169px,0) scaleX(190)')
  assert.deepEqual(copySnapshot(test), before)
  test.resize(761)
  test.frame()
  assert.equal(test.nodes.hsvcTabs.dataset.indicatorAxis, 'vertical')
  assert.equal(test.nodes.hsvcTabs.getAttribute('aria-orientation'), 'vertical')
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(0px,350px,0) scaleY(56)')
  assert.equal(test.scene(), scene)
  assert.equal(test.allAnimations.length, animationsBefore, 'Responsive layout measurement must not replay the scene')
  assert.deepEqual(copySnapshot(test), before)
})

check('catalog counter participates in pause, snapshot, latest selection, replay and reduced motion', async () => {
  const test = harness({ catalog: true })
  await test.manifest()
  await test.loaded('viral')
  const initialCounter = test.copyAnimations().find(animation => animation.element.dataset.copyKind === 'counter')
  assert.ok(initialCounter)
  assert.equal(initialCounter.options.delay, 0)
  assert.equal(initialCounter.playState, 'paused')
  test.visible(true)
  assert.equal(initialCounter.playState, 'running')
  initialCounter.samplePose({ opacity: .41, translate: '10px 9px' })
  test.click(1)
  assert.equal(initialCounter.cancelled, true)
  assert.equal(Number(test.nodes.hsvcPanelNumber.style.opacity), .41)
  assert.equal(test.nodes.hsvcPanelNumber.style.translate, '10px 9px')
  assert.equal(test.nodes.hsvcPanelNumber.textContent, '01')
  await flush()
  test.click(4)
  await flush()
  await test.loaded('performance')
  assert.equal(test.nodes.hsvcPanelNumber.textContent, '01')
  await test.loaded('review')
  await test.settle()
  assertCopyFor(test, 4)
  assert.equal(test.nodes.hsvcPanelNumber.textContent, '05')
  test.click(4)
  assert.ok(test.copyAnimations().some(animation => animation.element === test.nodes.hsvcPanelNumber))
  await test.motion(true)
  assert.equal(test.scene().dataset.phase, 'static')
  assertCopyFor(test, 4)
  for (const property of ['opacity', 'translate', 'rotate', 'scale']) assert.equal(test.nodes.hsvcPanelNumber.style[property], undefined)
  assert.equal(test.pendingAnimations().length, 0)
})

check('catalog asset failure restores the selected static counter and retries coherently', async () => {
  const test = harness({ catalog: true })
  await ready(test)
  test.click(6)
  await flush()
  await test.failed('ppl')
  assert.equal(test.panel.dataset.iconState, 'error')
  assert.equal(test.fallback.hidden, false)
  assert.equal(test.fallback.dataset.service, 'ppl')
  assertCopyFor(test, 6)
  assert.equal(test.nodes.hsvcPanelNumber.textContent, '07')
  assert.equal(test.nodes.hsvcPanelNumber.style.opacity, undefined)
  assert.equal(test.nodes.hsvcPanelNumber.style.translate, undefined)
  test.click(6)
  await flush()
  await test.loaded('ppl')
  await test.settle()
  assert.equal(test.scene().dataset.service, 'ppl')
  assert.equal(test.fallback.hidden, true)
  assertCopyFor(test, 6)
})

check('optional counter works with the old tab layout and catalog navigation does not leak into it', async () => {
  const test = harness({ counter: true, reduced: true, observer: false, animations: false })
  await ready(test)
  assertCopyFor(test, 0)
  assert.equal(test.nodes.hsvcTabs.dataset.indicatorAxis, undefined)
  assert.equal(test.key(0, 'ArrowDown'), false)
  assert.equal(test.key(0, 'ArrowUp'), false)
  test.click(2)
  await flush()
  await test.loaded('influencer')
  assertCopyFor(test, 2)
  assert.equal(test.nodes.hsvcTabIndicator.style.transform, 'translate3d(200px,39px,0) scaleX(92)')
})

check('production panel cannot initialize the DEV renderer', async () => {
  const test = harness({ preview: false })
  assert.equal(test.fetches.length, 0)
  assert.equal(test.images.length, 0)
  assert.equal(test.tabs[0].events.click, undefined)
  assert.equal(test.panel.dataset.iconsInitialized, undefined)
})

let failures = 0
for (const { name, fn } of cases) {
  try { await fn(); console.log(`PASS ${name}`) }
  catch (error) { failures++; console.error(`FAIL ${name}: ${error.message}`) }
}
if (failures) process.exitCode = 1
