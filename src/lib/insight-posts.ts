import { kvGet, kvPut } from '../admin/store'

// ─────────────────────────────────────────────
//  인사이트 글 저장소 헬퍼 (KV `insight_posts` 한 곳에 배열로 저장)
//  관리자 페이지 · 자동 발행 API · 서버 렌더링이 모두 이 형식을 공유한다.
// ─────────────────────────────────────────────

export interface InsightPost {
  id: string
  title: string
  summary?: string
  content?: string          // HTML
  mainCategory?: string     // 'content-strategy' | 'case-study'
  subCategory?: string      // viral | influencer | seeding | seo | review | oliveyoung | ppl
  thumbnail?: string
  metaDescription?: string  // 검색 결과 설명문 (없으면 summary)
  keywords?: string[]
  notionId?: string         // 자동 발행 시 노션 페이지 ID (중복 발행 방지)
  createdAt?: string
  updatedAt?: string
}

export const SITE_URL = 'https://www.inadcompany.co.kr'

export const CAT_LABEL: Record<string, string> = {
  'case-study': '실전 사례',
  'content-strategy': '콘텐츠 별 전략',
}
export const SUB_LABEL: Record<string, string> = {
  viral: '바이럴 마케팅', influencer: '인플루언서', seeding: '시딩',
  seo: 'SEO', review: '리뷰', oliveyoung: '올리브영', ppl: 'PPL',
}

export async function getPosts(kv: KVNamespace | undefined): Promise<InsightPost[]> {
  try {
    const raw = await kvGet(kv, 'insight_posts')
    const posts = raw ? JSON.parse(raw) : []
    return Array.isArray(posts) ? posts : []
  } catch {
    return []
  }
}

export async function savePosts(kv: KVNamespace | undefined, posts: InsightPost[]): Promise<void> {
  await kvPut(kv, 'insight_posts', JSON.stringify(posts))
}

/** URL 경로의 id(`admin_ins_...`)를 실제 글 id로 바꾼다 */
export function realId(pathId: string): string {
  return pathId.replace(/^admin_/, '')
}

export function postPath(post: Pick<InsightPost, 'id'>): string {
  return `/insight/admin_${post.id}`
}

export function absoluteUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  if (/^https?:\/\//.test(url)) return url
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

/** HTML 태그를 걷어내고 공백을 정리한 평문 (설명문 · RSS 용) */
export function plainText(html: string | undefined, max = 160): string {
  const text = (html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > max ? text.slice(0, max - 1) + '…' : text
}

export function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}
