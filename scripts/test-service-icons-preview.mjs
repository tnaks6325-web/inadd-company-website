import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source = fs.readFileSync(new URL('../public/static/service-icons-preview-v2.js', import.meta.url), 'utf8')
const keys = ['viral', 'performance', 'influencer', 'seeding', 'review', 'oliveyoung', 'ppl']

class Element {
  constructor(id, attributes = {}) {
    this.id = id
    this.attributes = { ...attributes }
    this.dataset = {}
    this.events = {}
    this.classes = new Set()
    this.properties = {}
    this.styleHistory = []
    this.rect = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }
    this.classList = {
      contains: name => this.classes.has(name),
      toggle: (name, active) => active ? this.classes.add(name) : this.classes.delete(name),
    }
    this.history = []
    this.style = {
      setProperty: (key, value) => { this.properties[key] = String(value); this.styleHistory.push({ key, value: String(value) }) },
      removeProperty: key => { delete this.properties[key]; this.styleHistory.push({ key, value: null }) },
      get opacity() { return this.element.properties.opacity || '' },
      get transform() { return this.element.properties.transform || '' },
      element: this,
    }
  }
  getAttribute(key) { return this.attributes[key] ?? null }
  setAttribute(key, value) {
    this.attributes[key] = String(value)
    this.history.push({ key, value: String(value), opacity: this.properties.opacity })
  }
  addEventListener(name, handler) { (this.events[name] ||= []).push(handler) }
  dispatch(name, event = {}) { this.events[name]?.forEach(handler => handler(event)) }
  focus() { this.focused = true }
  getBoundingClientRect() { return { ...this.rect } }
  get offsetWidth() { this.transitionAtLayoutRead = this.properties.transition; return this.rect.width }
}

function deferred() {
  let resolve
  let reject
  const promise = new Promise((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

function harness({ reduced = false, observerAvailable = true, preview = true, animationsAvailable = true, indicatorAvailable = true, resizeObserverAvailable = true, initiallyHidden = false } = {}) {
  const panel = new Element('hsvcPanel')
  if (preview) panel.classes.add('hsvc-panel--icons')
  const asset = new Element('hsvcIconAsset', { src: '/static/service-icons-v2/viral.webp', alt: '바이럴 마케팅 3D 아이콘' })
  const tabs = keys.map((key, index) => new Element(`hsvcTab-${key}`, {
    'data-service': key,
    'data-img': `/static/service-icons-v2/${key}.webp`,
    'data-icon-scale': String(1 + index * .01),
    'data-en': key.toUpperCase(),
    'data-ko': `서비스 ${index}`,
    'data-desc': `설명 ${index}`,
    'data-href': `/service/${key}`,
  }))
  const tabsRoot = new Element('hsvcTabs')
  tabsRoot.rect = { left: 80, top: 100, right: 1080, bottom: 160, width: 1000, height: 60 }
  const indicator = indicatorAvailable ? new Element('hsvcTabIndicator') : null
  tabs.forEach((tab, index) => {
    const width = 100 + index * 13
    tab.rect = { left: 90 + index * 137, top: 102, right: 90 + index * 137 + width, bottom: 140, width, height: 38 }
  })
  if (initiallyHidden) { tabsRoot.rect.width = 0; tabs.forEach(tab => { tab.rect.width = 0 }) }
  tabs[0].classes.add('active')
  const nodes = Object.fromEntries([panel, asset, tabsRoot, ...(indicator ? [indicator] : []), ...['hsvcPanelEn', 'hsvcPanelName', 'hsvcPanelDesc', 'hsvcPanelLink'].map(id => new Element(id))].map(node => [node.id, node]))
  const requests = []
  const animations = []
  const intersections = []
  let motionChange
  let resizeObserver
  const frames = new Map()
  let nextFrame = 0
  const windowEvents = {}
  const documentEvents = {}
  const fontEvents = {}
  const fontReady = deferred()
  const motion = { matches: reduced, addEventListener: (_, handler) => { motionChange = handler } }
  if (animationsAvailable) {
    asset.animate = (frames, options) => {
      const completion = deferred()
      const animation = {
        frames, options, cancelled: false,
        current: { ...frames[0] },
        finished: completion.promise,
        sample(opacity, transform = this.current.transform) { this.current = { opacity, transform } },
        finish() { this.current = { ...frames.at(-1) }; completion.resolve() },
        cancel() { this.cancelled = true; completion.reject(new Error('Animation cancelled')) },
      }
      animations.push(animation)
      return animation
    }
  }
  class Image {
    constructor() { this.complete = false; this.naturalWidth = 0; requests.push(this) }
    decode() {
      if (this.decodeFailure) return Promise.reject(new Error('Decode failed'))
      if (this.holdDecode) { this.decodeCompletion = deferred(); return this.decodeCompletion.promise }
      return Promise.resolve()
    }
    succeed() { this.complete = true; this.naturalWidth = 1024; this.onload() }
    fail() { this.onerror() }
  }
  const context = {
    document: {
      hidden: false,
      addEventListener: (name, handler) => { documentEvents[name] = handler },
      getElementById: id => nodes[id], querySelectorAll: () => tabs,
      fonts: { ready: fontReady.promise, addEventListener: (name, handler) => { fontEvents[name] = handler } },
    },
    window: {
      matchMedia: () => motion,
      addEventListener: (name, handler) => { windowEvents[name] = handler },
      requestAnimationFrame: handler => { frames.set(++nextFrame, handler); return nextFrame },
      getComputedStyle: () => {
        const active = animations.findLast(animation => !animation.cancelled)
        return active?.current || { opacity: asset.style.opacity || '1', transform: asset.style.transform || 'none' }
      },
    },
    Image,
  }
  if (observerAvailable) {
    context.window.IntersectionObserver = true
    context.IntersectionObserver = class {
      constructor(handler, options) {
        this.registration = { handler, options, disconnected: false }
        intersections.push(this.registration)
      }
      observe(node) { this.registration.node = node }
      disconnect() { this.registration.disconnected = true }
    }
  }
  if (resizeObserverAvailable) {
    context.window.ResizeObserver = true
    context.ResizeObserver = class {
      constructor(handler) { resizeObserver = { handler, nodes: [] } }
      observe(node) { resizeObserver.nodes.push(node) }
    }
  }
  vm.runInNewContext(source, context)
  return {
    panel, asset, tabs, tabsRoot, indicator, nodes, requests, animations, motion,
    reload: () => vm.runInNewContext(source, context),
    enter: () => intersections.find(entry => entry.options.rootMargin === '500px 0px').handler([{ isIntersecting: true }]),
    floatView: visible => intersections.find(entry => entry.options.rootMargin === '0px').handler([{ isIntersecting: visible }]),
    hidePage: hidden => { context.document.hidden = hidden; documentEvents.visibilitychange?.() },
    motionChange: value => { motion.matches = value; motionChange() },
    activeAnimation: () => animations.findLast(animation => !animation.cancelled),
    pendingFrames: () => frames.size,
    frame: () => { const batch = [...frames.values()]; frames.clear(); batch.forEach(handler => handler()) },
    resizeObserver: () => resizeObserver,
    resize: () => windowEvents.resize?.(),
    fontReady: () => fontReady.resolve(),
    fontDone: () => fontEvents.loadingdone?.(),
    image: key => requests.find(image => image.src.endsWith(`/${key}.webp`)),
    key: (index, key) => { let prevented = false; tabs[index].dispatch('keydown', { key, preventDefault() { prevented = true } }); return prevented },
  }
}
const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve() }
const selectedCount = test => test.tabs.filter(tab => tab.getAttribute('aria-selected') === 'true').length
const url = key => `/static/service-icons-v2/${key}.webp`
const src = test => test.asset.getAttribute('src')
const finish = async test => { test.activeAnimation()?.finish(); await flush() }
const initialize = async test => { test.image('viral').succeed(); await flush() }
const indicatorTransform = (test, index) => {
  const root = test.tabsRoot.rect
  const tab = test.tabs[index].rect
  return `translate3d(${tab.left - root.left}px, ${tab.bottom - root.top - 1}px, 0) scaleX(${tab.width})`
}

{
  const test = harness()
  assert.equal(test.panel.dataset.iconFloat, 'paused', 'Float waits for actual viewport visibility')
  test.enter()
  assert.equal(test.panel.dataset.iconFloat, 'paused', 'Early preloading must not start offscreen floating')
  test.floatView(true)
  assert.equal(test.panel.dataset.iconFloat, 'running')
  test.hidePage(true)
  assert.equal(test.panel.dataset.iconFloat, 'paused')
  test.hidePage(false)
  assert.equal(test.panel.dataset.iconFloat, 'running')
  test.floatView(false)
  test.hidePage(true)
  test.hidePage(false)
  assert.equal(test.panel.dataset.iconFloat, 'paused', 'A visible document must not resume an offscreen icon')
  test.floatView(true)
  test.motionChange(true)
  assert.equal(test.panel.dataset.iconFloat, 'paused')
  test.motionChange(false)
  assert.equal(test.panel.dataset.iconFloat, 'running')
  assert.equal(test.animations.length, 0, 'Floating must not use the icon swap animation channel')
  const reduced = harness({ reduced: true })
  reduced.floatView(true)
  assert.equal(reduced.panel.dataset.iconFloat, 'paused')
  const fallback = harness({ observerAvailable: false })
  assert.equal(fallback.panel.dataset.iconFloat, 'running')
  fallback.hidePage(true)
  assert.equal(fallback.panel.dataset.iconFloat, 'paused')
  fallback.hidePage(false)
  fallback.motionChange(true)
  assert.equal(fallback.panel.dataset.iconFloat, 'paused')
  console.log('PASS floating stage: viewport/preload separation, visibility, reduced motion, observer fallback')
}

{
  const test = harness()
  assert.equal(test.requests.length, 1, 'Only the initial asset loads before the service section is near the viewport')
  await initialize(test)
  test.enter()
  assert.equal(test.requests.length, 7, 'All seven small WebP assets preload near the service section')
  test.enter()
  assert.equal(test.requests.length, 7, 'Preloading deduplicates requests')
  test.reload()
  assert.equal(test.tabs[0].events.click.length, 1, 'Controller initialization is idempotent')

  test.tabs[1].dispatch('click')
  assert.equal(test.tabs[1].getAttribute('aria-selected'), 'true')
  assert.equal(test.tabs[1].tabIndex, 0)
  assert.equal(test.panel.getAttribute('aria-labelledby'), 'hsvcTab-performance')
  assert.equal(test.nodes.hsvcPanelName.textContent, '서비스 1')
  assert.equal(test.nodes.hsvcPanelLink.getAttribute('href'), '/service/performance')
  assert.equal(src(test), url('viral'), 'Visible image remains while the next asset loads')
  assert.equal(test.animations.length, 0, 'No exit starts before the replacement is decoded')

  test.tabs[2].dispatch('click')
  test.image('influencer').holdDecode = true
  test.image('influencer').succeed()
  await flush()
  assert.equal(test.animations.length, 0, 'Network load alone is not sufficient: decoding must finish')
  test.image('influencer').decodeCompletion.resolve()
  await flush()
  const exit = test.activeAnimation()
  assert.equal(src(test), url('viral'), 'The old source stays in place for the entire exit')
  assert.equal(test.panel.dataset.iconPhase, 'exiting')
  assert.equal(exit.frames[0].opacity, 1)
  assert.equal(exit.frames[1].opacity, 0, 'The outgoing image reaches complete transparency')
  assert.equal(exit.frames[1].transform, 'translateY(-5px) scale(.96)')
  assert.equal(exit.options.duration, 140)
  assert.equal(test.panel.getAttribute('aria-busy'), 'true')
  await finish(test)
  assert.equal(src(test), url('influencer'))
  assert.equal(test.asset.getAttribute('alt'), '서비스 2 서비스를 표현한 3D 아이콘')
  assert.equal(test.panel.properties['--service-icon-scale'], '1.02')
  assert.equal(test.asset.history.filter(item => item.key === 'src').at(-1).opacity, '0', 'The source swaps only at full transparency')
  const enter = test.activeAnimation()
  assert.equal(enter.frames[0].opacity, 0, 'The incoming icon starts fully transparent')
  assert.equal(enter.frames[0].transform, 'translateY(7px) scale(.96)')
  assert.equal(enter.frames[1].opacity, 1)
  assert.equal(enter.options.duration, 260)
  assert.equal(exit.options.duration + enter.options.duration, 400)
  test.image('performance').succeed()
  await flush()
  assert.equal(src(test), url('influencer'), 'Late previous loads never overwrite the latest selection')
  assert.equal(selectedCount(test), 1)
  assert.equal(test.panel.getAttribute('aria-busy'), 'false')
  assert.equal(test.animations.length, 2)
  await finish(test)
  assert.equal(test.panel.dataset.iconPhase, 'idle')
  assert.equal(test.asset.style.opacity, '')
  assert.equal(test.asset.style.transform, '')
  console.log('PASS visible preloading/decode, ordered transparent exit/source-swap/entrance, 400ms timing, latest-wins')
}

{
  const test = harness()
  await initialize(test)
  test.tabs[1].dispatch('click')
  test.image('performance').succeed()
  await flush()
  const oldExit = test.activeAnimation()
  const exitTransform = 'matrix(.96, 0, 0, .96, 0, -3)'
  oldExit.sample(.37, exitTransform)
  test.tabs[2].dispatch('click')
  assert.equal(oldExit.cancelled, true)
  assert.equal(test.asset.style.opacity, '0.37', 'Cancel preserves the sampled outgoing opacity')
  assert.equal(test.asset.style.transform, exitTransform, 'Cancel preserves the sampled outgoing transform')
  assert.equal(test.activeAnimation().frames[0].opacity, .37)
  oldExit.finish()
  await flush()
  assert.equal(src(test), url('viral'), 'A canceled exit cannot commit its stale icon')
  test.image('influencer').succeed()
  await flush()
  const latestExit = test.activeAnimation()
  assert.equal(latestExit.frames[0].opacity, .37, 'A replacement exit continues from the current opacity')
  assert.equal(latestExit.frames[0].transform, exitTransform)
  assert.ok(latestExit.options.duration <= 140)
  await finish(test)
  assert.equal(src(test), url('influencer'))
  const oldEnter = test.activeAnimation()
  const enterTransform = 'matrix(.98, 0, 0, .98, 0, 4)'
  oldEnter.sample(.43, enterTransform)
  test.tabs[6].dispatch('click')
  assert.equal(oldEnter.cancelled, true)
  assert.equal(test.activeAnimation().frames[0].opacity, .43, 'An interrupted entrance also restarts without snapping')
  test.image('ppl').succeed()
  await flush()
  assert.equal(test.activeAnimation().frames[0].opacity, .43)
  assert.equal(test.activeAnimation().frames[0].transform, enterTransform)
  await finish(test)
  assert.equal(src(test), url('ppl'))
  await finish(test)
  assert.equal(test.asset.style.opacity, '')
  console.log('PASS rapid interrupted exits/entrances, computed opacity/transform continuity, stale-finished race')
}

{
  const test = harness()
  await initialize(test)
  test.tabs[1].dispatch('click')
  test.image('performance').succeed()
  await flush()
  const exit = test.activeAnimation()
  exit.sample(0, 'translateY(-5px) scale(.96)')
  test.tabs[0].dispatch('click')
  await flush()
  assert.equal(src(test), url('viral'))
  assert.equal(test.panel.dataset.iconPhase, 'recovering')
  assert.equal(test.activeAnimation().frames[0].opacity, 0)
  assert.equal(test.activeAnimation().frames[1].opacity, 1)
  assert.equal(test.tabs[0].getAttribute('aria-selected'), 'true')
  await finish(test)
  assert.equal(test.asset.style.opacity, '', 'Reselecting the displayed asset cannot leave it hidden')
  exit.finish()
  await flush()
  assert.equal(src(test), url('viral'))
  console.log('PASS same-displayed selection recovery from a fully transparent interrupted exit')
}

{
  const test = harness()
  await initialize(test)
  test.tabs[1].dispatch('click')
  test.image('performance').succeed()
  await flush()
  const exit = test.activeAnimation()
  exit.sample(.4)
  test.motionChange(true)
  assert.equal(exit.cancelled, true)
  assert.equal(src(test), url('performance'), 'Enabling reduced motion during exit immediately commits the latest decoded icon')
  assert.equal(test.panel.dataset.iconPhase, 'idle')
  assert.equal(test.asset.style.opacity, '')
  assert.equal(test.asset.style.transform, '')
  exit.finish()
  await flush()
  assert.equal(test.animations.length, 1, 'No entrance starts after reduced motion was enabled')
  test.motionChange(false)
  test.tabs[2].dispatch('click')
  test.image('influencer').succeed()
  await flush()
  await finish(test)
  const enter = test.activeAnimation()
  enter.sample(.2)
  test.motionChange(true)
  assert.equal(enter.cancelled, true)
  assert.equal(src(test), url('influencer'))
  assert.equal(test.asset.style.opacity, '', 'Enabling reduced motion during entrance shows the new icon immediately')
  console.log('PASS reduced-motion changes during exit and entrance')
}

{
  const test = harness({ reduced: true })
  await initialize(test)
  assert.equal(test.panel.dataset.iconMotion, 'reduced')
  assert.equal(test.key(0, 'ArrowLeft'), true)
  assert.equal(test.tabs[6].getAttribute('aria-selected'), 'true')
  assert.equal(test.tabs[6].focused, true)
  test.image('ppl').succeed()
  await flush()
  assert.equal(src(test), url('ppl'))
  assert.equal(test.animations.length, 0, 'Reduced motion never starts an entrance')
  assert.equal(test.panel.getAttribute('role'), 'tabpanel')
  test.tabs.forEach(tab => assert.equal(tab.getAttribute('aria-controls'), 'hsvcPanel'))
  test.key(6, 'ArrowRight')
  assert.equal(test.tabs[0].getAttribute('aria-selected'), 'true')
  test.key(0, 'End')
  assert.equal(test.tabs[6].getAttribute('aria-selected'), 'true')
  test.key(6, 'Home')
  assert.equal(test.tabs[0].getAttribute('aria-selected'), 'true')
  assert.equal(test.key(0, 'Tab'), false)
  assert.equal(selectedCount(test), 1)
  assert.equal(test.tabs.filter(tab => tab.tabIndex === 0).length, 1)
  console.log('PASS keyboard wrap/Home/End, roving focus, panel relationships, reduced motion')
}

{
  const test = harness({ observerAvailable: false })
  assert.equal(test.requests.length, 7, 'Browsers without IntersectionObserver still preload the icon set')
  await initialize(test)
  test.tabs[4].dispatch('click')
  test.image('review').fail()
  await flush()
  assert.equal(test.panel.dataset.iconState, 'error')
  assert.equal(src(test), url('viral'), 'A loading failure never replaces the current image with a broken box')
  assert.equal(test.tabs[4].getAttribute('aria-selected'), 'true')
  test.tabs[4].dispatch('click')
  const retry = test.requests.filter(image => image.src.endsWith('/review.webp')).at(-1)
  assert.notEqual(retry, test.image('review'), 'Failed loads can be retried')
  retry.succeed()
  await flush()
  await finish(test)
  assert.equal(src(test), url('review'))
  const failedEntrance = test.activeAnimation()
  test.asset.dispatch('error')
  assert.equal(failedEntrance.cancelled, true)
  assert.equal(src(test), url('viral'), 'A displayed element failure restores the previous good source')
  assert.equal(test.asset.getAttribute('alt'), '서비스 0 서비스를 표현한 3D 아이콘')
  assert.equal(test.asset.style.opacity, '')
  assert.equal(test.asset.style.transform, '')
  failedEntrance.finish()
  await flush()
  assert.equal(test.panel.dataset.iconState, 'error', 'A stale entrance completion cannot undo failure recovery')

  test.tabs[5].dispatch('click')
  test.image('oliveyoung').decodeFailure = true
  test.image('oliveyoung').succeed()
  await flush()
  assert.equal(test.panel.dataset.iconState, 'error')
  assert.equal(src(test), url('viral'), 'Decode failures preserve the current good asset too')
  console.log('PASS failed request/retry, decode failure, mid-entrance rollback, no observer fallback')
}

{
  const test = harness()
  await initialize(test)
  test.tabs[1].dispatch('click')
  test.image('performance').succeed()
  await flush()
  const exit = test.activeAnimation()
  exit.sample(.21)
  test.tabs[2].dispatch('click')
  test.image('influencer').fail()
  await flush()
  assert.equal(src(test), url('viral'))
  assert.equal(test.panel.dataset.iconState, 'error')
  assert.equal(test.activeAnimation().frames[0].opacity, .21)
  await finish(test)
  assert.equal(test.asset.style.opacity, '')
  assert.equal(test.panel.dataset.iconState, 'error')
  console.log('PASS latest replacement failure restores visibility after an interrupted exit')
}

{
  const test = harness({ animationsAvailable: false })
  await initialize(test)
  test.tabs[1].dispatch('click')
  test.image('performance').succeed()
  await flush()
  assert.equal(src(test), url('performance'))
  assert.equal(test.asset.style.opacity, '')
  console.log('PASS Web Animations unavailable: decoded icons commit immediately')
}

{
  const test = harness()
  assert.equal(test.tabsRoot.dataset.indicatorReady, 'true')
  assert.equal(test.indicator.properties.transform, indicatorTransform(test, 0))
  assert.equal(test.indicator.transitionAtLayoutRead, 'none', 'The initial position snaps before the CSS transition is restored')
  assert.equal(test.indicator.properties.transition, undefined)
  test.frame()
  const baseline = test.indicator.styleHistory.length
  test.tabs[1].dispatch('click')
  assert.equal(test.indicator.properties.transform, indicatorTransform(test, 1), 'Selection immediately sets the new position and width')
  assert.equal(test.indicator.styleHistory.slice(baseline).some(entry => entry.key === 'transition' && entry.value === 'none'), false, 'Clicks keep the CSS motion enabled')
  assert.ok(test.indicator.properties.transform.endsWith('scaleX(113)'))
  test.tabs[5].dispatch('click')
  test.tabs[2].dispatch('click')
  test.tabs[6].dispatch('click')
  assert.equal(test.indicator.properties.transform, indicatorTransform(test, 6), 'Rapid clicks retarget the same bar to the latest tab')
  test.key(6, 'ArrowLeft')
  assert.equal(test.indicator.properties.transform, indicatorTransform(test, 5))
  test.key(5, 'Home')
  assert.equal(test.indicator.properties.transform, indicatorTransform(test, 0))
  test.key(0, 'End')
  assert.equal(test.indicator.properties.transform, indicatorTransform(test, 6))
  assert.equal(test.tabs[6].getAttribute('aria-selected'), 'true')
  assert.equal(test.tabs[6].tabIndex, 0)
  console.log('PASS moving underline: initial snap, width change, immediate rapid-click retarget, keyboard')
}

{
  const test = harness()
  test.frame()
  const observed = test.resizeObserver()
  assert.equal(observed.nodes.length, 8, 'ResizeObserver watches the tablist and every tab')
  assert.equal(observed.nodes[0], test.tabsRoot)
  test.tabsRoot.rect = { left: 24, top: 200, right: 354, bottom: 320, width: 330, height: 120 }
  test.tabs[4].rect = { left: 152, top: 250, right: 260, bottom: 282, width: 108, height: 32 }
  test.tabs[4].dispatch('click')
  assert.equal(test.indicator.properties.transform, 'translate3d(128px, 81px, 0) scaleX(108)', 'Mobile wrapped tabs use both the horizontal and vertical tab position')
  const beforeLayout = test.indicator.styleHistory.length
  test.tabs[4].rect.width = 126
  observed.handler()
  test.resize()
  test.fontDone()
  assert.equal(test.pendingFrames(), 1, 'ResizeObserver, resize, and font events coalesce into one frame')
  assert.equal(test.indicator.properties.transform, 'translate3d(128px, 81px, 0) scaleX(108)', 'Layout events defer measurements until the shared frame')
  test.frame()
  assert.equal(test.indicator.properties.transform, 'translate3d(128px, 81px, 0) scaleX(126)')
  assert.equal(test.indicator.styleHistory.slice(beforeLayout).filter(entry => entry.key === 'transform').length, 1)
  assert.equal(test.indicator.transitionAtLayoutRead, 'none', 'Layout changes snap instead of replaying the click transition')
  assert.equal(test.indicator.properties.transition, undefined)
  test.tabs[4].rect.width = 131
  test.fontReady()
  await flush()
  assert.equal(test.pendingFrames(), 1, 'Font readiness also schedules a fresh layout measurement')
  test.frame()
  assert.equal(test.indicator.properties.transform, 'translate3d(128px, 81px, 0) scaleX(131)')
  test.motionChange(true)
  assert.equal(test.pendingFrames(), 1)
  test.frame()
  assert.equal(test.indicator.transitionAtLayoutRead, 'none')
  console.log('PASS moving underline: mobile rows, resize/font RAF coalescing, snap remeasure, motion preference')
}

{
  const test = harness()
  test.frame()
  const lastValid = test.indicator.properties.transform
  test.tabsRoot.rect.width = 0
  test.tabs[1].dispatch('click')
  assert.equal(test.indicator.properties.transform, lastValid, 'A hidden tablist preserves the last valid position')
  test.resizeObserver().handler()
  test.frame()
  assert.equal(test.indicator.properties.transform, lastValid)
  test.tabsRoot.rect.width = 700
  test.tabs[1].rect.width = 0
  test.resize()
  test.frame()
  assert.equal(test.indicator.properties.transform, lastValid, 'A zero-width selected tab also preserves the last placement')
  test.tabs[1].rect.width = 144
  test.resizeObserver().handler()
  test.frame()
  assert.equal(test.indicator.properties.transform, indicatorTransform(test, 1), 'A later valid observation recovers the latest selected position')

  const hidden = harness({ initiallyHidden: true })
  assert.equal(hidden.tabsRoot.dataset.indicatorReady, undefined, 'The old underline stays available until the first valid measurement')
  assert.equal(hidden.indicator.properties.transform, undefined)
  hidden.tabsRoot.rect.width = 1000
  hidden.tabs[0].rect.width = 100
  hidden.resizeObserver().handler()
  hidden.frame()
  assert.equal(hidden.tabsRoot.dataset.indicatorReady, 'true')
  assert.equal(hidden.indicator.transitionAtLayoutRead, 'none')
  console.log('PASS moving underline: hidden/zero-size preservation and later visibility recovery')
}

{
  const test = harness({ indicatorAvailable: false })
  await initialize(test)
  assert.equal(test.tabsRoot.dataset.indicatorReady, undefined)
  assert.equal(test.pendingFrames(), 0)
  test.tabs[1].dispatch('click')
  test.image('performance').succeed()
  await flush()
  await finish(test)
  await finish(test)
  assert.equal(src(test), url('performance'), 'Missing indicator preserves the existing image controller')
  assert.equal(test.panel.getAttribute('aria-labelledby'), 'hsvcTab-performance')

  const fallback = harness({ resizeObserverAvailable: false })
  fallback.frame()
  fallback.tabs[0].rect.width = 118
  fallback.resize()
  fallback.frame()
  assert.equal(fallback.indicator.properties.transform, indicatorTransform(fallback, 0))
  console.log('PASS missing indicator gracefully falls back; window resize works without ResizeObserver')
}

{
  const test = harness({ preview: false })
  assert.equal(test.requests.length, 0, 'The controller does not initialize on the production panel')
  assert.equal(test.tabs[0].events.click, undefined)
  assert.equal(test.indicator.properties.transform, undefined)
  assert.equal(test.tabsRoot.dataset.indicatorReady, undefined)
  assert.equal(test.pendingFrames(), 0)
  console.log('PASS production-panel guard')
}
