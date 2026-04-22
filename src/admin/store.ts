// ═══════════════════════════════════════════════════════
//  Admin Store — KV 폴백 메모리 스토어
//  KV 바인딩이 없을 때 인메모리로 동작 (개발 환경)
// ═══════════════════════════════════════════════════════

export type Bindings = {
  ADMIN_KV?: KVNamespace
}

// 기본 데이터
export const DEFAULT_DATA = {
  // ── Home ──
  home_videos: JSON.stringify([
    'HZaDW00sldo','yiWPCX7Qwug','Qh6H3hRXEcs',
    'mdinL3IgKG8','4Vlqt4F1lGY','SjiizDuxmK0'
  ]),
  home_brochure_url: 'https://drive.google.com/file/d/1YsEoDjdrOatvEO1-jQHxoKBEC0vY4ihO/view',
  home_stats: JSON.stringify({
    projects: 320, contracts: 98, experience: 6, partners: 50
  }),
  home_slide_interval: '7',

  // ── About ──
  about_address: '경기도 안산시 단원구 고잔로 51 타워아이즈빌 2F, 204호',
  about_lat: '37.320819',
  about_lng: '126.831592',
  about_logos: JSON.stringify([
    'brand1','brand2','brand3','brand4','brand5','brand6',
    'brand7','brand8','brand9','brand10','brand11','brand12'
  ]),

  // ── Works ──
  works_items: JSON.stringify([
    { id:1, brand:'파파레시피', overlay:'papa recipe', thumb:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', tags:['viral','influencer'], services:'프로모션 바이럴 · 브랜드 콘텐츠 제작 · PPL' },
    { id:2, brand:'롯데제과', overlay:'빼빼로', thumb:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', tags:['viral'], services:'프로모션 바이럴 · 브랜드 콘텐츠 제작 · 신제품 런칭' },
    { id:3, brand:'지마켓', overlay:'G market', thumb:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', tags:['influencer','seo'], services:'프로모션 바이럴 · 마케팅 기획' },
    { id:4, brand:'LG전자', overlay:'LG', thumb:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', tags:['influencer','seeding'], services:'브랜드 런레포 제작 · 소셜미디어 체험단 · 프로모션 바이럴' },
    { id:5, brand:'식품브랜드', overlay:'FOOD', thumb:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', tags:['review','seeding'], services:'리뷰 마케팅 · 시딩 캠페인' },
    { id:6, brand:'뷰티브랜드', overlay:'BEAUTY', thumb:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80', tags:['seeding','oliveyoung'], services:'올리브영 마케팅 · 시딩 캠페인' },
  ]),

  // ── Insight ──
  insight_posts: JSON.stringify([]),

  // ── Contact ──
  contact_privacy_officer: JSON.stringify({
    manager: '김주희',
    officer: '이승노',
    website: 'www.majestade.co.kr',
    email: 'maze_official@majestade.co.kr'
  }),
  contact_faq: JSON.stringify([
    { q: '프로젝트 기간은 얼마나 걸리나요?', a: '프로젝트 규모에 따라 다르지만, 일반적으로 전략 수립 1~2주, 실행 및 운영 1~3개월입니다. 초기 상담에서 상세 일정을 협의합니다.' },
    { q: '최소 예산이 있나요?', a: '단발성 캠페인은 300만원~, 월 운영 계약은 월 150만원~부터 협의 가능합니다.' },
    { q: '성과 보장이 되나요?', a: '명확한 KPI를 함께 설정하고 지속 최적화합니다. 인애드컴퍼니의 재계약률 98%가 그 결과입니다.' },
    { q: '어떤 업종과 주로 일하나요?', a: '뷰티, 식품, 헬스케어, 이커머스, 패션, 생활용품 등 다양한 업종과 함께하고 있습니다.' },
  ]),

  // ── Marketing 성과 수치 ──
  marketing_stats: JSON.stringify({
    viral: {
      case1: { tag:'패션 브랜드 숏폼 캠페인', m1:'2,800만', l1:'조회수', m2:'142,000', l2:'공유 수', m3:'+580%', l3:'매출 증가', desc:'MZ 타겟 숏폼 바이럴 캠페인. SNS 알고리즘 최적화로 유기적 확산' },
      case2: { tag:'식품 브랜드 유튜브 바이럴', m1:'1,800만', l1:'조회수', m2:'+1,200%', l2:'검색량 증가', desc:'유튜브 쇼츠+롱폼 연계 전략' },
      case3: { tag:'뷰티 브랜드 챌린지', m1:'900만', l1:'조회수', m2:'+340%', l2:'브랜드 인지도', desc:'챌린지 포맷 활용 폭발적 확산' }
    },
    influencer: {
      case1: { tag:'뷰티 브랜드 인플루언서', m1:'+420%', l1:'브랜드 검색량', m2:'98%', l2:'캠페인 만족도', m3:'3.2×', l3:'ROAS', desc:'메가~나노 인플루언서 피라미드 전략' },
      case2: { tag:'식품 브랜드 체험단', m1:'+280%', l1:'신규 유입', m2:'62만', l2:'조회수', desc:'타겟 채널 정밀 매칭' },
      case3: { tag:'헬스케어 유튜브 협업', m1:'+520%', l1:'트래픽', m2:'4.1×', l2:'전환율', desc:'전문가 채널 신뢰도 활용' }
    },
    seeding: {
      case1: { tag:'식품 시딩 캠페인', m1:'68%', l1:'후기 전환율', m2:'+230%', l2:'리뷰 전환 효과', m3:'3배', l3:'신뢰도 향상', desc:'300명 체험단 네이버·인스타 동시 진행' },
      case2: { tag:'뷰티 시딩 캠페인', m1:'500+', l1:'후기 콘텐츠', m2:'+180%', l2:'매출 증가', desc:'올리브영 입점 전 시딩' },
      case3: { tag:'헬스케어 시딩', m1:'TOP3', l1:'검색 순위', m2:'+250%', l2:'전환율 상승', desc:'SEO 연계 전략' }
    },
    seo: {
      case1: { tag:'헬스케어 플레이스 SEO', m1:'TOP1', l1:'플레이스 순위 달성', m2:'+1,200%', l2:'검색 트래픽 증가', m3:'3개월', l3:'달성 기간', desc:'구글·네이버 플레이스 통합 최적화' },
      case2: { tag:'뷰티 브랜드 유튜브 SEO', m1:'+340%', l1:'오가닉 트래픽', m2:'6개월', l2:'유지 기간', desc:'유튜브 SEO 키워드 전략' },
      case3: { tag:'이커머스 인스타 검색', m1:'+520%', l1:'해시태그 노출', m2:'2×', l2:'전환율', desc:'인스타 해시태그 캠페인' }
    },
    review: {
      case1: { tag:'스킨케어 리뷰 캠페인', m1:'+230%', l1:'구매 전환율', m2:'4.9', l2:'별점 달성', m3:'68%', l3:'시딩 전환율', desc:'네이버쇼핑+쿠팡 통합 리뷰' },
      case2: { tag:'뷰티 블로그 체험단', m1:'850개', l1:'블로그 리뷰', m2:'+420%', l2:'트래픽', desc:'TOP 블로거 집중 운영' },
      case3: { tag:'건강식품 별점 관리', m1:'★4.8', l1:'평균 별점 유지', m2:'+185%', l2:'매출 상승', desc:'부정리뷰 관리+긍정리뷰 확대' }
    },
    oliveyoung: {
      case1: { tag:'스킨케어 브랜드 통합', m1:'+340%', l1:'3개월 채널 매출', m2:'TOP 5', l2:'카테고리 순위', m3:'별점 4.9', l3:'달성', desc:'리뷰+랭킹+노출 통합 운영' },
      case2: { tag:'헬스케어 랭킹 1위', m1:'카테고리 1위', l1:'랭킹 달성', m2:'2.4×', l2:'3개월 매출', desc:'카테고리 1위 보장 패키지' },
      case3: { tag:'뷰티 신규 브랜드', m1:'1개월', l1:'TOP 10 진입', m2:'+215%', l2:'첫달 목표 초과', desc:'탑리뷰어 조기 확보' }
    },
    ppl: {
      case1: { tag:'케이블 드라마 PPL', m1:'850만', l1:'누적 시청자', m2:'+380%', l2:'브랜드 검색량', m3:'3×', l3:'광고 전환율', desc:'뷰티 브랜드 드라마 PPL' },
      case2: { tag:'에피소드 기획 PPL', m1:'+240%', l1:'신규 유입', m2:'2차 콘텐츠', l2:'SNS 바이럴', desc:'자연스러운 제품 노출' },
      case3: { tag:'웹드라마 브랜디드', m1:'5,000만+', l1:'누적 시청자', m2:'+520%', l2:'SNS 언급량', desc:'전 에피소드 자연 노출' }
    }
  })
}

// 인메모리 폴백 스토어 (KV 없을 때)
const memStore: Record<string,string> = { ...DEFAULT_DATA }

export async function kvGet(kv: KVNamespace|undefined, key: string): Promise<string|null> {
  if (kv) {
    const val = await kv.get(key)
    return val ?? (DEFAULT_DATA as any)[key] ?? null
  }
  return memStore[key] ?? (DEFAULT_DATA as any)[key] ?? null
}

export async function kvPut(kv: KVNamespace|undefined, key: string, value: string): Promise<void> {
  if (kv) { await kv.put(key, value) }
  else { memStore[key] = value }
}

export async function kvDelete(kv: KVNamespace|undefined, key: string): Promise<void> {
  if (kv) { await kv.delete(key) }
  else { delete memStore[key] }
}

// JWT 서명 (HMAC-SHA256, Web Crypto API)
const SECRET = 'inadcompany-admin-secret-2024'

export async function signToken(payload: object): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body   = btoa(JSON.stringify({ ...payload, exp: Date.now() + 24*60*60*1000 }))
  const data   = `${header}.${body}`
  const key    = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
  return `${data}.${sigB64}`
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    const [header, body, sig] = parts
    const data = `${header}.${body}`
    const key  = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    )
    const sigBytes = Uint8Array.from(atob(sig), c => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(data))
    if (!valid) return false
    const payload = JSON.parse(atob(body))
    return payload.exp > Date.now()
  } catch { return false }
}
