import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const assetDir = fileURLToPath(new URL('../public/static/service-motion-v1/', import.meta.url))
const manifestPath = path.join(assetDir, 'scenes.json')
const dimensionsPath = path.join(assetDir, 'asset-dimensions.json')
const entrancePath = path.join(assetDir, 'entrance.css')
const expectedKeys = ['viral', 'performance', 'influencer', 'seeding', 'review', 'oliveyoung', 'ppl']

assert.ok(fs.existsSync(manifestPath), 'Missing generated service-motion-v1/scenes.json')
assert.ok(fs.existsSync(entrancePath), 'Missing generated service-motion-v1/entrance.css')
const scenes = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const dimensions = JSON.parse(fs.readFileSync(dimensionsPath, 'utf8'))
assert.ok(Array.isArray(scenes), 'scenes.json must contain an array')
assert.deepEqual(scenes.map(scene => scene.key).sort(), [...expectedKeys].sort(), 'Exactly the seven existing service keys must be present')
assert.equal(new Set(scenes.map(scene => scene.key)).size, 7, 'Service keys must be unique')

const dimensionMap = new Map(dimensions.map(entry => [entry.file, entry]))
const svgFiles = fs.readdirSync(assetDir).filter(file => file.endsWith('.svg'))
assert.equal(svgFiles.length, 52, 'All 52 original Figma SVG assets must be retained')
assert.equal(dimensionMap.size, 52, 'The native dimension manifest must cover all 52 SVG assets')
const svgCache = new Map()

function close(actual, expected, message) {
  assert.ok(Number.isFinite(actual) && Number.isFinite(expected) && Math.abs(actual - expected) <= .0001, `${message}: expected ${expected}, got ${actual}`)
}

function rootAttribute(svg, name) {
  const root = svg.match(/<svg\b[^>]*>/i)?.[0]
  assert.ok(root, 'SVG file must contain an SVG root')
  const raw = root.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, 'i'))?.[1]
  assert.ok(raw && /^\d+(?:\.\d+)?(?:px)?$/.test(raw), `SVG root requires a numeric ${name}`)
  return Number.parseFloat(raw)
}

function localAsset(src, context) {
  assert.equal(typeof src, 'string', `${context}: source must be a string`)
  assert.ok(src.startsWith('/static/service-motion-v1/'), `${context}: runtime SVG must use a local service-motion-v1 source`)
  const file = src.slice('/static/service-motion-v1/'.length)
  assert.equal(path.basename(file), file, `${context}: asset paths must not escape their directory`)
  assert.ok(file.endsWith('.svg'), `${context}: expected a local SVG file`)
  assert.ok(dimensionMap.has(file), `${context}: asset must have declared native dimensions`)
  if (!svgCache.has(file)) {
    const filename = path.join(assetDir, file)
    assert.ok(fs.existsSync(filename), `${context}: missing SVG ${file}`)
    const svg = fs.readFileSync(filename, 'utf8')
    assert.ok(svg.trim().length > 50, `${context}: SVG cannot be empty`)
    assert.ok(!/<(?:script|foreignObject)\b/i.test(svg), `${context}: SVG cannot require executable or foreign content`)
    assert.ok(!/\b(?:href|xlink:href)\s*=\s*["']\s*(?:https?:|\/\/|data:)/i.test(svg), `${context}: SVG cannot reference remote or embedded runtime assets`)
    assert.ok(!/url\(\s*["']?(?:https?:|\/\/|data:)/i.test(svg), `${context}: SVG CSS cannot reference remote runtime assets`)
    const native = dimensionMap.get(file)
    close(rootAttribute(svg, 'width'), Number(native.width), `${file} native root width`)
    close(rootAttribute(svg, 'height'), Number(native.height), `${file} native root height`)
    svgCache.set(file, svg)
  }
  return { file, svg: svgCache.get(file), dimensions: dimensionMap.get(file) }
}

// Check assets independently of the scene references, so unused originals cannot silently regress.
svgFiles.forEach(file => localAsset(`/static/service-motion-v1/${file}`, file))

function walk(node, visit) {
  assert.ok(node && ['div', 'img'].includes(node.tag), 'Artwork node must be a div or img')
  assert.ok(node.attrs && typeof node.attrs === 'object', 'Artwork node must contain attributes')
  visit(node)
  assert.ok(Array.isArray(node.children), 'Artwork node must contain a children array')
  node.children.forEach(child => walk(child, visit))
}

function styleValue(attrs, property) {
  const style = attrs.style
  if (style && typeof style === 'object') return style[property]
  return typeof style === 'string' ? style.match(new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*([^;]+)`, 'i'))?.[1]?.trim() : undefined
}

function placementDimension(attrs, property, label) {
  const raw = attrs[property] ?? styleValue(attrs, property)
  const value = typeof raw === 'number' ? raw : /^\d+(?:\.\d+)?(?:px)?$/.test(String(raw)) ? Number.parseFloat(raw) : NaN
  assert.ok(Number.isFinite(value) && value > 0, `${label}: top-level part requires a positive numeric ${property}`)
}

function splitCssList(value) {
  const entries = []
  let depth = 0
  let start = 0
  for (let index = 0; index < value.length; index++) {
    if (value[index] === '(') depth++
    else if (value[index] === ')') depth--
    else if (value[index] === ',' && depth === 0) { entries.push(value.slice(start, index)); start = index + 1 }
  }
  entries.push(value.slice(start))
  return entries.map(entry => entry.trim())
}

const animationKeywords = new Set(['none', 'initial', 'inherit', 'unset', 'revert', 'revert-layer', 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end', 'infinite', 'normal', 'reverse', 'alternate', 'alternate-reverse', 'forwards', 'backwards', 'both', 'running', 'paused', 'auto'])

function animationNames(css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const names = []
  for (const declaration of clean.matchAll(/(?:^|[;{}])\s*(?:-webkit-)?animation(?:-name)?\s*:\s*([^;}]+)/g)) {
    const isName = /animation-name\s*:/.test(declaration[0])
    for (const entry of splitCssList(declaration[1])) {
      const tokens = isName ? [entry] : entry.match(/(?:[\w-]+\([^)]*\)|[^\s]+)/g) || []
      const candidates = tokens.filter(token => !animationKeywords.has(token) && !/^[\d.]+(?:m?s)?$/.test(token) && !token.includes('('))
      assert.ok(candidates.length <= 1, `Ambiguous CSS animation shorthand: ${entry}`)
      if (candidates[0]) names.push(candidates[0].replace(/^["']|["']$/g, ''))
    }
  }
  return names
}

let partCount = 0
let motionNodeCount = 0
let inlineCount = 0
const entranceCss = fs.readFileSync(entrancePath, 'utf8')
const cssPieces = [entranceCss]
const referencedFiles = new Set()

for (const scene of scenes) {
  assert.ok(scene.figmaName && typeof scene.figmaName === 'string', `${scene.key}: original Figma name must be present`)
  assert.ok(scene.motion && Array.isArray(scene.motion.nodes) && Array.isArray(scene.motion.timelineCohorts), `${scene.key}: motion inventory must include nodes and timelineCohorts arrays`)
  const nodes = new Map()
  walk(scene.artwork, node => {
    const attrs = node.attrs
    const label = `${scene.key}/${attrs['data-name'] || attrs['data-node-id'] || node.tag}`
    const id = attrs['data-node-id']
    // Figma's original nodes retain IDs; export-created inset/image wrappers need no Figma ID.
    if (id) {
      assert.ok(!nodes.has(id), `${label}: duplicate data-node-id ${id} inside one artwork`)
      nodes.set(id, node)
    }
    if (attrs.src) {
      const asset = localAsset(attrs.src, label)
      referencedFiles.add(asset.file)
      partCount++
      if (node.tag === 'img') {
        close(Number(attrs.width), Number(asset.dimensions.width), `${label} native image width`)
        close(Number(attrs.height), Number(asset.dimensions.height), `${label} native image height`)
      }
      if (attrs.inline) {
        inlineCount++
        assert.match(asset.svg, /<path\b[^>]*\bd\s*=\s*["'][^"']+/, `${label}: inline target must contain nonempty local SVG path data`)
      }
    } else {
      assert.ok(!attrs.inline, `${label}: inline target requires its original local SVG source`)
      assert.equal(node.tag, 'div', `${label}: image requires a local SVG source`)
    }
    for (const value of Object.values(attrs)) {
      assert.ok(typeof value !== 'string' || !/(?:https?:\/\/|\/\/)/i.test(value), `${label}: artwork cannot retain a remote runtime URL`)
    }
  })
  const placementRoot = [...nodes.values()].find(node => node.attrs['data-name'] === 'Artwork') || scene.artwork
  assert.ok(placementRoot.children.length > 0, `${scene.key}: artwork must include placed parts`)
  placementRoot.children.forEach(part => {
    const label = `${scene.key}/${part.attrs['data-name'] || part.attrs['data-node-id']}`
    placementDimension(part.attrs, 'width', label)
    placementDimension(part.attrs, 'height', label)
  })
  for (const motionNode of scene.motion.nodes) {
    assert.ok(nodes.has(motionNode.nodeId), `${scene.key}: motion target ${motionNode.nodeName || motionNode.nodeId} is missing from artwork`)
    assert.ok(typeof motionNode.codeSnippets?.css === 'string', `${scene.key}: motion target ${motionNode.nodeId} needs a CSS snippet`)
    cssPieces.push(motionNode.codeSnippets.css)
    motionNodeCount++
  }
}

const css = cssPieces.join('\n')
const keyframes = new Set([...css.matchAll(/@(?:-webkit-)?keyframes\s+([\w-]+)/g)].map(match => match[1]))
const usedAnimations = new Set(animationNames(css))
assert.ok(keyframes.size > 0, 'Generated motion must include keyframe definitions')
assert.ok(usedAnimations.size > 0, 'Generated motion must apply at least one named animation')
usedAnimations.forEach(name => assert.ok(keyframes.has(name), `Animation ${name} is used without a keyframe definition`))
// Runtime CSS must be complete on its own, not merely backed by a handoff-only snippet.
const runtimeKeyframes = new Set([...entranceCss.matchAll(/@(?:-webkit-)?keyframes\s+([\w-]+)/g)].map(match => match[1]))
animationNames(entranceCss).forEach(name => assert.ok(runtimeKeyframes.has(name), `Runtime entrance animation ${name} is missing its keyframe definition`))
assert.ok(!/url\(\s*["']?(?:https?:|\/\/|data:)/i.test(css), 'Generated motion CSS cannot require remote runtime assets')

// Web-authored selection actions are separate from the preserved Figma proof.
const actionCss = fs.readFileSync(new URL('../public/static/service-motion-action.css', import.meta.url), 'utf8')
const actionKeyframes = new Set([...actionCss.matchAll(/@keyframes\s+([\w-]+)/g)].map(match => match[1]))
const actionNames = new Set(animationNames(actionCss.replace(/\s*!important/g, '')))
assert.ok(actionNames.size >= 7, 'Each service needs a distinct semantic action')
actionNames.forEach(name => assert.ok(actionKeyframes.has(name), `Selection action ${name} needs a keyframe definition`))
const partNames = new Set()
scenes.forEach(scene => walk(scene.artwork, node => { if (node.attrs['data-name']) partNames.add(node.attrs['data-name']) }))
for (const match of actionCss.matchAll(/\[data-name="([^"]+)"\]/g)) {
  assert.ok(partNames.has(match[1]), `Selection action targets a missing source part: ${match[1]}`)
}
for (const namespace of ['Viral', 'Performance', 'Influencer', 'Experience', 'Review', 'OliveYoung', 'PPL']) {
  assert.ok(actionCss.includes(`[data-name="${namespace}/`), `${namespace} needs its own selection action`)
}
for (const match of actionCss.matchAll(/animation:\s*([^;]+);/g)) {
  if (match[1].startsWith('none')) continue
  assert.match(match[1], /\b1\.6s\b/, 'All action tracks must share the 1.6s completion clock')
  assert.ok(!/\binfinite\b/.test(match[1]), 'Selection actions must not automatically repeat')
}
assert.ok(!/animation-delay\s*:/.test(actionCss), 'Encode action staggering in keyframes, not delayed completion')
assert.match(actionCss, /prefers-reduced-motion:\s*reduce/, 'Selection action CSS needs a reduced-motion guard')

console.log(`PASS seven existing service keys; ${partCount} local SVG references (${referencedFiles.size} unique assets)`)
console.log('PASS all 52 original SVGs nonempty, local-only, native root/image dimensions retained')
console.log(`PASS ${motionNodeCount} motion targets present; ${inlineCount} inline targets retain local path data`)
console.log(`PASS top-level placement dimensions; ${usedAnimations.size} applied animations have keyframe definitions`)
console.log(`PASS ${actionNames.size} one-shot selection actions; all source parts and shared completion clock valid`)
