export const HOME_EDITOR_FIELD_KEYS = [
  'heroEyebrow', 'heroLine1', 'heroLine2', 'heroLine3', 'heroSub', 'heroCta',
  'servicesLabel', 'servicesTitleLead', 'servicesTitleAccent', 'servicesTitleTail', 'servicesSub',
  'historyLabel', 'historyTitleLead', 'historyTitleAccent', 'historySub',
  'testimonialsLabel', 'testimonialsTitleLead', 'testimonialsTitleAccent',
  'ctaBadge', 'ctaTitleLead', 'ctaTitleAccent', 'ctaSub', 'ctaButton',
] as const

export const HOME_EDITOR_SECTION_KEYS = [
  'hero', 'services', 'stats', 'history', 'testimonials', 'cta',
] as const

type FieldKey = typeof HOME_EDITOR_FIELD_KEYS[number]
type SectionKey = typeof HOME_EDITOR_SECTION_KEYS[number]
type FontFamily = 'pretendard' | 'display' | 'serif' | 'mono'
type TextAlign = 'left' | 'center' | 'right'

export type HomeEditorField = {
  text: string
  color: string
  backgroundColor: string
  fontFamily: FontFamily
  fontWeight: 400 | 500 | 600 | 700 | 800
  fontSize: number
  textAlign: TextAlign
}

export type HomeEditorSection = {
  backgroundColor: string
  accentColor: string
}

export type HomeEditorConfig = {
  fields: Record<FieldKey, HomeEditorField>
  sections: Record<SectionKey, HomeEditorSection>
}

const field = (text: string, overrides: Partial<HomeEditorField> = {}): HomeEditorField => ({
  text,
  color: '#ffffff',
  backgroundColor: 'transparent',
  fontFamily: 'pretendard',
  fontWeight: 700,
  fontSize: 100,
  textAlign: 'left',
  ...overrides,
})

export const DEFAULT_HOME_EDITOR_CONFIG: HomeEditorConfig = {
  fields: {
    heroEyebrow: field('THE CREATIVE MARKETING AGENCY', { color: '#8eb5ff', fontSize: 85 }),
    heroLine1: field('크리에이티브가', { fontWeight: 800 }),
    heroLine2: field('성과를', { color: '#4f8fff', fontWeight: 800 }),
    heroLine3: field('만듭니다', { fontWeight: 800 }),
    heroSub: field('데이터가 말하고, 크리에이티브가 설득하고,\n전략이 전환을 만듭니다.', { color: '#d9e0ea', fontWeight: 400, fontSize: 95 }),
    heroCta: field('상담 신청하기', { fontWeight: 700, fontSize: 90 }),
    servicesLabel: field('What We Do', { color: '#1a6bff', fontSize: 85 }),
    servicesTitleLead: field('당신은 아직 ', { color: '#16191f', fontWeight: 700 }),
    servicesTitleAccent: field('진짜 마케팅의 힘', { color: '#1a6bff', fontWeight: 700 }),
    servicesTitleTail: field('만나지 못했습니다', { color: '#16191f', fontWeight: 700 }),
    servicesSub: field('단순한 노출을 넘어 브랜드의 가치를 전달하고\n실질적인 성과로 이어지는 인애드만의 솔루션을 경험해보세요', { color: '#657080', fontWeight: 400, fontSize: 95 }),
    historyLabel: field('Company Growth', { color: '#1a6bff', fontSize: 85 }),
    historyTitleLead: field('IN AD ', { color: '#ffffff' }),
    historyTitleAccent: field('HISTORY', { color: '#4f8fff' }),
    historySub: field('2019 – 2026 Continuous Growth', { color: '#8d96a4', fontWeight: 400, fontSize: 90 }),
    testimonialsLabel: field('Client Voice', { color: '#1a6bff', fontSize: 85 }),
    testimonialsTitleLead: field('광고주가', { color: '#151820' }),
    testimonialsTitleAccent: field('직접 전하는 리얼 후기', { color: '#1a6bff' }),
    ctaBadge: field('FREE CONSULTATION', { color: '#a9c5ff', fontSize: 85 }),
    ctaTitleLead: field('지금 당신의 브랜드에', { color: '#ffffff' }),
    ctaTitleAccent: field('필요한 것은 무엇인가요?', { color: '#73a4ff' }),
    ctaSub: field('검색 → 발견 → 신뢰 → 구매 → 재방문, 퍼널 전 단계를 책임집니다.', { color: '#b2bccb', fontWeight: 400, fontSize: 95 }),
    ctaButton: field('무료 상담 신청하기', { color: '#ffffff', fontSize: 90 }),
  },
  sections: {
    hero: { backgroundColor: 'transparent', accentColor: '#4f8fff' },
    services: { backgroundColor: 'transparent', accentColor: '#1a6bff' },
    stats: { backgroundColor: 'transparent', accentColor: '#4f8fff' },
    history: { backgroundColor: 'transparent', accentColor: '#4f8fff' },
    testimonials: { backgroundColor: 'transparent', accentColor: '#1a6bff' },
    cta: { backgroundColor: 'transparent', accentColor: '#4f8fff' },
  },
}

const FONT_FAMILIES = new Set<FontFamily>(['pretendard', 'display', 'serif', 'mono'])
const FONT_WEIGHTS = new Set([400, 500, 600, 700, 800])
const TEXT_ALIGNS = new Set<TextAlign>(['left', 'center', 'right'])

function safeColor(value: unknown, fallback: string): string {
  if (value === 'transparent') return 'transparent'
  if (typeof value !== 'string') return fallback
  const short = value.match(/^#([0-9a-f]{3})$/i)
  if (short) return '#' + short[1].split('').map((char) => char + char).join('').toLowerCase()
  return /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : fallback
}

function safeField(value: unknown, fallback: HomeEditorField): HomeEditorField {
  const input = value && typeof value === 'object' ? value as Partial<HomeEditorField> : {}
  const text = typeof input.text === 'string' ? input.text.replace(/\r\n?/g, '\n').slice(0, 300) : fallback.text
  const fontSize = Number.isFinite(Number(input.fontSize)) ? Math.min(150, Math.max(70, Number(input.fontSize))) : fallback.fontSize
  return {
    text,
    color: safeColor(input.color, fallback.color),
    backgroundColor: safeColor(input.backgroundColor, fallback.backgroundColor),
    fontFamily: FONT_FAMILIES.has(input.fontFamily as FontFamily) ? input.fontFamily as FontFamily : fallback.fontFamily,
    fontWeight: FONT_WEIGHTS.has(Number(input.fontWeight)) ? Number(input.fontWeight) as HomeEditorField['fontWeight'] : fallback.fontWeight,
    fontSize,
    textAlign: TEXT_ALIGNS.has(input.textAlign as TextAlign) ? input.textAlign as TextAlign : fallback.textAlign,
  }
}

function safeSection(value: unknown, fallback: HomeEditorSection): HomeEditorSection {
  const input = value && typeof value === 'object' ? value as Partial<HomeEditorSection> : {}
  return {
    backgroundColor: safeColor(input.backgroundColor, fallback.backgroundColor),
    accentColor: safeColor(input.accentColor, fallback.accentColor),
  }
}

export function sanitizeHomeEditorConfig(value: unknown): HomeEditorConfig {
  const input = value && typeof value === 'object' ? value as Partial<HomeEditorConfig> : {}
  const inputFields = input.fields && typeof input.fields === 'object' ? input.fields as Record<string, unknown> : {}
  const inputSections = input.sections && typeof input.sections === 'object' ? input.sections as Record<string, unknown> : {}
  const fields = {} as HomeEditorConfig['fields']
  const sections = {} as HomeEditorConfig['sections']

  for (const key of HOME_EDITOR_FIELD_KEYS) fields[key] = safeField(inputFields[key], DEFAULT_HOME_EDITOR_CONFIG.fields[key])
  for (const key of HOME_EDITOR_SECTION_KEYS) sections[key] = safeSection(inputSections[key], DEFAULT_HOME_EDITOR_CONFIG.sections[key])

  return { fields, sections }
}
