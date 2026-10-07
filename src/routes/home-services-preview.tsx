type ServicePreview = {
  key: string
  en: string
  ko: string
  desc: string
  href: string
}

const ServiceArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

// DEV-only replacement of the service chapter, reusing the existing content.
export const HomeServicesPreview = ({ services }: { services: ServicePreview[] }) => (
  <section class="section hsvc-section hsvc-redesign" id="services" aria-labelledby="hsvcSectionHeading">
    <div class="container hsvc-redesign-container">
      <header class="hsvc-redesign-header">
        <div>
          <p class="hsvc-redesign-kicker"><span class="hsvc-header-part" data-header-part="kicker">SERVICE <span aria-hidden="true">/</span> 07</span></p>
          <h2 class="hsvc-redesign-heading" id="hsvcSectionHeading" aria-label="브랜드에 필요한, 다음 움직임.">
            <span class="hsvc-heading-line" aria-hidden="true"><span class="hsvc-header-part" data-header-part="headline-0">브랜드에 필요한,</span></span>
            <span class="hsvc-heading-line" aria-hidden="true"><span class="hsvc-header-part" data-header-part="headline-1">다음 <span class="hsvc-heading-accent">{['움', '직', '임', '.'].map(letter => <span class="hsvc-heading-letter" data-header-letter>{letter}</span>)}</span></span></span>
          </h2>
        </div>
        <p class="hsvc-redesign-intro">
          <span class="hsvc-intro-line"><span class="hsvc-header-part" data-header-part="intro-0">브랜드의 과제에 맞춰, </span></span>
          <span class="hsvc-intro-line"><span class="hsvc-header-part" data-header-part="intro-1">일곱 가지 서비스를 연결합니다.</span></span>
        </p>
      </header>
      <div class="hsvc-redesign-layout">
        <aside class="hsvc-service-directory" aria-label="서비스 선택">
          <p class="hsvc-directory-label">OUR SERVICES</p>
          <div class="hsvc-tabs hsvc-tabs--moving hsvc-service-menu" id="hsvcTabs" data-layout="catalog" role="tablist" aria-label="마케팅 서비스" aria-orientation="vertical">
            {services.map((service, index) => (
              <button type="button" class={`hsvc-tab${index === 0 ? ' active' : ''}`} role="tab" id={`hsvcTab-${service.key}`} aria-label={service.ko} aria-controls="hsvcPanel" aria-selected={index === 0 ? 'true' : 'false'} tabindex={index === 0 ? 0 : -1}
                data-en={service.en} data-ko={service.ko} data-desc={service.desc} data-href={service.href} data-img={`/static/service-icons-v2/${service.key}.webp`} data-service={service.key}>
                <span class="hsvc-service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span class="hsvc-service-label">{service.ko.replace(/ 마케팅$/, '')}</span>
                <span class="hsvc-service-arrow"><ServiceArrow /></span>
              </button>
            ))}
            <span class="hsvc-tab-indicator" id="hsvcTabIndicator" aria-hidden="true" />
          </div>
          <p class="hsvc-directory-hint">서비스를 선택해보세요</p>
        </aside>
        <div class="hsvc-panel hsvc-panel--icons hsvc-stage-panel" id="hsvcPanel" role="tabpanel" aria-labelledby={`hsvcTab-${services[0].key}`}>
          <div class="hsvc-stage-meta" aria-hidden="true">
            <span class="hsvc-stage-count"><span id="hsvcPanelNumber">01</span><span class="hsvc-stage-count-total"> / 07</span></span>
            <span class="hsvc-stage-caption">IN AD / EXPERTISE</span>
          </div>
          <div class="hsvc-panel-slide" id="hsvcPanelSlide">
            <div class="hsvc-panel-text">
              <span class="hsvc-panel-en" id="hsvcPanelEn">{services[0].en}</span>
              <h3 class="hsvc-panel-name" id="hsvcPanelName">{services[0].ko}</h3>
              <div class="hsvc-stage-footer">
                <p class="hsvc-panel-desc" id="hsvcPanelDesc">{services[0].desc}</p>
                <a class="hsvc-panel-link" id="hsvcPanelLink" href={services[0].href}><span>자세히 보기</span><span class="hsvc-cta-arrow"><ServiceArrow /></span></a>
              </div>
            </div>
            <div class="hsvc-panel-img" id="hsvcPanelImg">
              <img id="hsvcIconAsset" data-service={services[0].key} src={`/static/service-icons-v2/${services[0].key}.webp`} width="1024" height="1024" alt={`${services[0].ko} 서비스를 표현한 3D 아이콘`} decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="/static/service-header-motion.js" defer />
    <script src="/static/service-motion-preview.js" defer />
  </section>
)
