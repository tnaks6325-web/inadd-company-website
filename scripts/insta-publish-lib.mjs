// 인스타 카드뉴스 자동 게시(scripts/insta-publish.mjs)의 판단 규칙만 모은 곳.
// 노션·메타를 부르지 않는 순수 함수라 tests/insta-publish.test.mjs 에서 그대로 시험한다.

export const ACCOUNT = 'inadcompany.official' // 이 계정이 아니면 절대 올리지 않는다
export const POST_HOUR_KST = 12 // 한국 시각 12시 이후에만 올린다
export const MIN_CARDS = 2
export const MAX_CARDS = 10 // 메타 공식 API 캐러셀 한도
export const CAPTION_MAX = 2200
export const HASHTAG_MAX = 5

const KST = 9 * 3600e3
export const kstDate = (now = Date.now()) => new Date(now + KST).toISOString().slice(0, 10)
export const kstHour = (now = Date.now()) => new Date(now + KST).getUTCHours()

// 카드 이미지 파일만 이름순으로 고른다(01-cover.png, 02-… 순서가 곧 게시 순서)
export function pickCardFiles(names) {
  return names
    .filter(n => /\.(png|jpe?g)$/i.test(n) && !n.startsWith('.') && !n.startsWith('_'))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
}

export function checkCardCount(n) {
  if (n < MIN_CARDS) return `카드 이미지가 ${n}장입니다. ${MIN_CARDS}장 이상 필요해요.`
  if (n > MAX_CARDS) return `카드 이미지가 ${n}장입니다. 공식 게시는 ${MAX_CARDS}장까지예요.`
  return null
}

// 해시태그 칸: 공백·쉼표로 나눠 #을 붙이고 중복을 빼고 최대 5개
export function normalizeHashtags(text = '') {
  const tags = []
  for (const raw of String(text).split(/[\s,]+/)) {
    const t = raw.replace(/^#+/, '').trim()
    if (t && !tags.includes(`#${t}`)) tags.push(`#${t}`)
  }
  return tags.slice(0, HASHTAG_MAX)
}

export function buildCaption(caption = '', hashtags = '') {
  const body = String(caption).trim()
  if (!body) throw new Error('캡션이 비어 있습니다.')
  const tags = normalizeHashtags(hashtags).filter(t => !body.includes(t))
  const out = tags.length ? `${body}\n\n${tags.join(' ')}` : body
  if (out.length > CAPTION_MAX) throw new Error(`캡션이 ${out.length}자입니다. 인스타는 ${CAPTION_MAX}자까지예요.`)
  return out
}

// 오늘 올릴 것 하나를 고른다.
//   - 게시 예정일(카드뉴스 게시일)이 비었거나 오늘보다 뒤면 기다린다
//   - 오늘 이미 하나 올렸으면 아무것도 고르지 않는다(하루 1세트)
//   - 12시 전이면 아무것도 고르지 않는다
//   - 여러 개면 예정일이 이른 것 → 만든 순서
export function pickDue(confirmed, { postedToday = 0, now = Date.now() } = {}) {
  if (postedToday > 0) return { item: null, reason: '오늘 이미 1세트를 올렸어요' }
  if (kstHour(now) < POST_HOUR_KST) return { item: null, reason: `${POST_HOUR_KST}시 전이에요` }
  const today = kstDate(now)
  const due = confirmed
    .filter(c => c.date && c.date.slice(0, 10) <= today)
    .sort((a, b) => a.date.localeCompare(b.date) || String(a.created || '').localeCompare(String(b.created || '')))
  if (!due.length) return { item: null, reason: '예정일이 된 확정 카드뉴스가 없어요' }
  return { item: due[0], reason: '' }
}
