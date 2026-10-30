// 페이지별 구조화 데이터(JSON-LD) — 구글·AI 검색이 페이지 종류·경로·서비스·시작 금액을 읽어 가도록.
// 홈의 회사 정보(Organization)와 같은 @id 로 이어 붙여, 페이지마다 회사 정보를 다시 쓰지 않는다.
// 숫자는 화면에 이미 공개된 시작 금액(OFFERS)만 쓴다. 홈 hasOfferCatalog 와 같은 목록을 공유한다.

const SITE = 'https://www.inadcompany.co.kr'
// 다른 페이지에서도 이름이 읽히도록 @id 와 함께 이름·주소를 붙인다(전체 정보는 홈에 있음)
const ORG = { '@type': 'Organization', '@id': `${SITE}/#organization`, name: '(주)인애드컴퍼니', url: SITE }
const WEBSITE = { '@type': 'WebSite', '@id': `${SITE}/#website`, name: '인애드컴퍼니', url: SITE }

// 서비스 시작 금액(부가세 별도) — 홈 Organization.hasOfferCatalog 와 서비스 페이지 Service.offers 가 함께 쓴다
export const OFFERS = [
  {
    "@type": "Offer",
    "url": "https://www.inadcompany.co.kr/marketing/subscription",
    "itemOffered": {
      "@type": "Service",
      "name": "마케팅팀 구독",
      "description": "광고·기획·디자인·영상·바이럴·체험단 전담 TF팀, 월 단위 계약"
    },
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "minPrice": 3000000,
      "priceCurrency": "KRW",
      "valueAddedTaxIncluded": false,
      "unitText": "월"
    }
  },
  {
    "@type": "Offer",
    "url": "https://www.inadcompany.co.kr/marketing/seeding",
    "itemOffered": {
      "@type": "Service",
      "name": "네이버 블로그 체험단",
      "description": "일반 블로거 10명 기준 시작 금액"
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 200000,
      "priceCurrency": "KRW",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "url": "https://www.inadcompany.co.kr/marketing/seeding",
    "itemOffered": {
      "@type": "Service",
      "name": "인스타그램 체험단",
      "description": "일반 피드 10명 기준 시작 금액"
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 200000,
      "priceCurrency": "KRW",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "url": "https://www.inadcompany.co.kr/marketing/review",
    "itemOffered": {
      "@type": "Service",
      "name": "리뷰 마케팅",
      "description": "기획형 리뷰 10건 기준 시작 금액(단순 리뷰 50건 20만 원부터)"
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 100000,
      "priceCurrency": "KRW",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "url": "https://www.inadcompany.co.kr/marketing/influencer",
    "itemOffered": {
      "@type": "Service",
      "name": "인플루언서 마케팅",
      "description": "마이크로 인플루언서 1명 출연료 기준 시작 금액, 대행 수수료 별도"
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 50000,
      "priceCurrency": "KRW",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "url": "https://www.inadcompany.co.kr/marketing/viral",
    "itemOffered": {
      "@type": "Service",
      "name": "카페 바이럴",
      "description": "카페 바이럴 10건 기준 시작 금액"
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 300000,
      "priceCurrency": "KRW",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "url": "https://www.inadcompany.co.kr/marketing/viral",
    "itemOffered": {
      "@type": "Service",
      "name": "언론 바이럴",
      "description": "네이버 뉴스 검색 제휴 매체 기사 1건 기준 시작 금액"
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 100000,
      "priceCurrency": "KRW",
      "valueAddedTaxIncluded": false
    }
  },
  {
    "@type": "Offer",
    "url": "https://www.inadcompany.co.kr/marketing/oliveyoung",
    "itemOffered": {
      "@type": "Service",
      "name": "올리브영 랭킹 마케팅",
      "description": "올리브영 랭킹 마케팅 시작 금액"
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 1000000,
      "priceCurrency": "KRW",
      "valueAddedTaxIncluded": false
    }
  }
]

type Kind = 'service' | 'about' | 'collection' | 'webpage'

// 경로 → 이름(이동 경로·서비스 이름에 쓰는 짧은 이름)
const NAMES: Record<string, string> = {
  '/about': '회사 소개',
  '/works': '포트폴리오',
  '/insight': '마케팅 인사이트',
  '/development': '마케팅 자동화 개발',
  '/marketing/subscription': '마케팅팀 구독',
  '/marketing/performance': '퍼포먼스 마케팅',
  '/marketing/viral': '바이럴 마케팅',
  '/marketing/influencer': '인플루언서 마케팅',
  '/marketing/seeding': '체험단 마케팅',
  '/marketing/review': '리뷰 마케팅',
  '/marketing/oliveyoung': '올리브영 마케팅',
  '/marketing/ppl': 'PPL 마케팅',
}

export function pageSchema(path: string, kind: Kind): string {
  const url = `${SITE}${path}`
  const name = NAMES[path] || path
  const pageType = kind === 'about' ? 'AboutPage' : kind === 'collection' ? 'CollectionPage' : 'WebPage'
  const page: any = {
    '@type': pageType, '@id': `${url}#webpage`, url, name, inLanguage: 'ko-KR',
    isPartOf: WEBSITE, publisher: ORG, breadcrumb: { '@id': `${url}#breadcrumb` },
  }
  if (kind === 'about') page.mainEntity = ORG
  else page.about = ORG
  const graph: any[] = [
    page,
    {
      '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    },
  ]
  if (kind === 'service') {
    const offers = OFFERS.filter((o: any) => o.url === url)
      .map((o: any) => ({ '@type': 'Offer', name: o.itemOffered.name, description: o.itemOffered.description, url, priceSpecification: o.priceSpecification }))
    const service: any = {
      '@type': 'Service', '@id': `${url}#service`, name, serviceType: name, url,
      provider: ORG, areaServed: { '@type': 'Country', name: '대한민국' }, availableChannel: { '@type': 'ServiceChannel', serviceUrl: url },
    }
    if (offers.length) service.offers = offers
    page.mainEntity = { '@id': `${url}#service` }
    graph.push(service)
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
}
