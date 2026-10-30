// ─────────────────────────────────────────────
//  노션 재발행이 따로 고친 검색 설명(metaDescription)을 덮어쓰지 않게 한다.
//  노션 발행기는 metaDescription 을 요약(summary)과 같은 값으로 보낸다.
//  저장된 글의 검색 설명이 저장된 요약과 다르면 누군가 따로 고친 것이므로 유지한다.
//  (2026-10-30 검색 결과에서 잘리던 3편의 설명을 80자 이내로 줄인 뒤 추가)
// ─────────────────────────────────────────────

type MetaFields = { summary?: string; metaDescription?: string }

export function keepCustomMeta<T extends MetaFields>(existing: MetaFields, incoming: T): T {
  const custom = !!existing.metaDescription && existing.metaDescription !== existing.summary
  if (custom && incoming.metaDescription !== undefined && incoming.metaDescription === incoming.summary) {
    const { metaDescription: _drop, ...rest } = incoming
    return rest as T
  }
  return incoming
}
