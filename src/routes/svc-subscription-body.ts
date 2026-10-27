// 마케팅팀 구독 상세페이지 본문 — 디자인 시안(Claude Design '종합 마케팅 구독 상세페이지 A 채용고민형', 860px 상세페이지 규격)을 그대로 옮긴 것.
// 시안의 인라인 스타일을 유지한다. 문구·사진을 바꿀 때는 이 파일을 직접 고친다.
// <!--ESTIMATE--> 자리에 견적 조합 화면(svc-subscription-estimate.ts)이 들어간다 — '04 포함 항목' 표를 대신한다(10가지 모두 담긴 상태로 시작).
// 사진: public/static/subscription/*.webp · 효과(숫자 올라가기·등장 효과·하단 고정 버튼): public/static/subscription/subscription.js
export const SUBSCRIPTION_BODY = `
<div class="mts-page" id="mtsPage" style="width:860px;margin:0 auto;background:#FFFFFF;color:#111318;word-break:keep-all;letter-spacing:-0.02em;">


<section data-screen-label="01 히어로" style="position:relative;padding:88px 64px 0;">
  <div style="font-size:24px;font-weight:700;margin-bottom:32px;">인애드 종합 마케팅 구독</div>
  <h1 style="margin:0;font-size:58px;line-height:1.32;font-weight:800;letter-spacing:-0.04em;text-wrap:pretty;">신입마케터 1명 비용<br>월 300만 원+α,<br>기획·디자인·광고·분석까지<br>혼자 다 할 수 있을까요?</h1>
  <div style="position:relative;z-index:3;display:flex;flex-wrap:wrap;gap:12px;margin-top:40px;">
    <a href="/contact" data-mts-cta="1" data-mts-pos="hero" style="display:inline-flex;align-items:center;justify-content:center;max-width:100%;min-height:calc(48px / var(--mts-zoom, 1));padding:22px 48px;border-radius:4px;background:#21306F;color:#FFFFFF;font-size:max(28px, calc(16px / var(--mts-zoom, 1)));font-weight:800;line-height:1.4;text-decoration:none;">무료 상담 신청</a>
    <a href="#estimate" data-mts-pos="hero" style="display:inline-flex;align-items:center;justify-content:center;max-width:100%;min-height:calc(48px / var(--mts-zoom, 1));padding:22px 24px;border-radius:4px;background:#FFFFFF;color:#21306F;box-shadow:inset 0 0 0 3px #21306F;font-size:max(28px, calc(16px / var(--mts-zoom, 1)));font-weight:800;line-height:1.4;text-decoration:none;">견적 직접 맞춰 보기</a>
  </div>
    <svg width="480" height="750" viewBox="0 0 480 750" fill="none" style="position:absolute;left:380px;top:200px;z-index:2;pointer-events:none;overflow:visible;"><path d="M64 62 C160 48 320 40 390 80 C420 110 425 190 420 250 C420 320 340 340 345 290 C350 240 440 260 425 340 C410 463 290 563 150 573" stroke="#21306F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M173 557 L150 573 L175 585" stroke="#21306F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  </section>

<div style="position:relative;margin-top:64px;"><img src="/static/subscription/watermark.webp" width="600" height="821" loading="lazy" decoding="async" alt="" style="position:absolute;right:28px;bottom:24px;width:110px;height:auto;opacity:0.6;pointer-events:none;"><img src="/static/subscription/hero-new-marketer.webp" width="1400" height="941" alt="사원증을 맨 신입 마케터가 햇살 드는 광고대행사 사무실에서 정면을 보며 웃는 모습" style="display:block;width:100%;height:auto;"></div>
<section data-screen-label="01 히어로 비교" style="background:#F8F7F4;padding:72px 64px;">
  <div style="text-align:center;font-size:24px;font-weight:700;">같은 비용</div>
  <div style="display:flex;align-items:baseline;justify-content:center;gap:8px;margin-top:8px;color:#21306F;">
    <span style="font-size:40px;font-weight:700;">월</span>
    <span style="font-size:112px;font-weight:800;line-height:1;letter-spacing:-0.05em;" data-mts-count="300">300</span>
    <span style="font-size:40px;font-weight:700;">만 원</span>
  </div>
  <div style="text-align:center;font-size:20px;margin-top:12px;">부가세 별도</div>
  <div style="display:flex;flex-direction:column;gap:32px;margin-top:48px;">
    <div style="background:#FFFFFF;border-radius:16px;overflow:hidden;text-align:center;">
      <div style="font-size:38px;font-weight:800;padding:36px 32px;">마케터 1명 채용시</div>
  <div style="position:relative;">
    <img src="/static/subscription/dog-meme.webp" width="1400" height="1055" loading="lazy" decoding="async" alt="밀짚모자를 쓴 강아지가 깡통 4개 위에 겨우 서 있는 사진" style="display:block;width:100%;height:auto;">
    <div style="position:absolute;left:4%;right:4%;top:2%;background:#111318;padding:18px 16px;text-align:center;color:#FFFFFF;font-size:29px;font-weight:600;line-height:1.4;letter-spacing:-0.02em;">마케터 한 명 신규채용하고 편해질 줄 알았는데<br>서 있는 것조차 힘든 마케터.jpg</div>
    <div style="position:absolute;left:17%;top:28%;width:15%;aspect-ratio:1/1;background:#111318;transform:rotate(-20deg);display:flex;align-items:center;justify-content:center;text-align:center;color:#FFFFFF;font-size:26px;font-weight:800;line-height:1.2;letter-spacing:-0.02em;">우리<br>브랜드</div>
    <div style="position:absolute;left:52%;top:39%;transform:translate(-50%,-50%);text-align:center;color:#FFE94A;font-size:34px;font-weight:800;line-height:1.25;white-space:nowrap;text-shadow:-2px -2px 0 #111318,2px -2px 0 #111318,-2px 2px 0 #111318,2px 2px 0 #111318,0 2px 0 #111318,0 -2px 0 #111318,2px 0 0 #111318,-2px 0 0 #111318;">우리 브랜드<br>마케팅 세팅</div>
    <div style="position:absolute;left:54.5%;top:67%;transform:translate(-50%,-50%);color:#FFFFFF;font-size:26px;font-weight:600;white-space:nowrap;text-shadow:0 0 6px rgba(17,19,24,0.9),0 1px 2px #111318;">노가다</div>
    <div style="position:absolute;left:67.5%;top:81%;transform:translate(-50%,-50%);color:#FFFFFF;font-size:34px;font-weight:600;white-space:nowrap;text-shadow:0 0 6px rgba(17,19,24,0.9),0 1px 2px #111318;">운빨</div>
    <div style="position:absolute;left:35%;top:88%;transform:translate(-50%,-50%);text-align:center;color:#FFFFFF;font-size:24px;font-weight:600;line-height:1.3;white-space:nowrap;text-shadow:0 0 6px rgba(17,19,24,0.9),0 1px 2px #111318;">영끌한<br>예산</div>
    <div style="position:absolute;left:51.5%;top:91%;transform:translate(-50%,-50%);text-align:center;color:#FFFFFF;font-size:24px;font-weight:600;line-height:1.3;white-space:nowrap;text-shadow:0 0 6px rgba(17,19,24,0.9),0 1px 2px #111318;">트러블집행<br>릴리즈</div>
  </div>
    </div>
    <div style="background:#FBF0CF;border:2.5px solid #21306F;border-radius:16px;overflow:hidden;text-align:center;">
      <div style="padding:40px 32px;">
      <div style="font-size:22px;font-weight:700;">인애드 마케팅 팀구독시</div>
      <div style="font-size:38px;font-weight:800;margin-top:12px;">분야별 전담 TF팀이</div>
      <div style="font-size:21px;line-height:1.55;margin-top:16px;">광고·기획·디자인·영상 바이럴·체험단을 전부 수행해요</div>
      </div>
    <div><div style="position:relative;"><img src="/static/subscription/tf-rangers.webp" width="960" height="504" loading="lazy" decoding="async" alt="기획·디자인·바이럴·퍼포먼스·체험단·인플루언서 파트를 맡은 레인저 6명" style="display:block;width:100%;height:auto;"><div style="position:absolute;left:6%;top:46%;background:#111318;color:#FFFFFF;font-size:22px;font-weight:800;padding:4px 8px;line-height:1.2;">기획</div><div style="position:absolute;left:27.5%;top:48%;background:#111318;color:#FFFFFF;font-size:22px;font-weight:800;padding:8px 4px;line-height:1.15;writing-mode:vertical-rl;text-orientation:upright;">디자인</div><div style="position:absolute;left:36.5%;top:2%;background:#111318;color:#FFFFFF;font-size:22px;font-weight:800;padding:8px 4px;line-height:1.15;writing-mode:vertical-rl;text-orientation:upright;">바이럴</div><div style="position:absolute;left:57.5%;top:0;background:#111318;color:#FFFFFF;font-size:22px;font-weight:800;padding:8px 4px;line-height:1.15;writing-mode:vertical-rl;text-orientation:upright;">체험단</div><div style="position:absolute;left:55%;top:42%;background:#111318;color:#FFFFFF;font-size:22px;font-weight:800;padding:4px 8px;line-height:1.2;">퍼포먼스</div><div style="position:absolute;right:2%;top:4%;background:#111318;color:#FFFFFF;font-size:22px;font-weight:800;padding:8px 4px;line-height:1.15;writing-mode:vertical-rl;text-orientation:upright;">인플루언서</div></div><div style="font-size:20px;font-weight:700;padding:18px 32px 22px;">같은 돈으로 인애드 마케팅 TF팀 6명이 붙어요</div></div>
    </div>
  </div>
</section>

<section data-screen-label="02 담당자 고민" style="padding:96px 64px 120px;">
  <div style="text-align:center;margin-bottom:96px;">
    <div style="font-size:24px;line-height:1.6;">광고 운영, 소재 제작, 랜딩페이지, 바이럴, 체험단에서 언론보도까지</div>
    <div style="font-size:38px;font-weight:800;line-height:1.4;letter-spacing:-0.03em;margin-top:10px;">브랜드를 위한 <span style="color:#21306F;">전담 마케팅 팀</span>을 통째로 !</div>
  </div>
  <div style="font-size:24px;font-weight:800;color:#21306F;">01</div>
  <h2 style="margin:16px 0 0;font-size:48px;line-height:1.36;font-weight:800;letter-spacing:-0.04em;">마케터 1명 뽑고 나서,<br>이런 일 겪어 보셨죠?</h2>
  <div style="position:relative;margin-top:48px;border-radius:20px;overflow:hidden;">
  <img src="/static/subscription/marketer-leaving.webp" width="1400" height="783" loading="lazy" decoding="async" alt="왕관을 쓴 신입 마케터가 하늘을 배경으로 손을 흔들며 떠나는 모습" style="display:block;width:100%;height:auto;">
  <img src="/static/subscription/watermark.webp" width="600" height="821" loading="lazy" decoding="async" alt="" style="position:absolute;right:24px;top:22px;width:96px;height:auto;opacity:0.6;pointer-events:none;">
  <div style="position:absolute;left:0;right:0;bottom:5%;text-align:center;color:#FFFFFF;font-size:30px;font-weight:600;line-height:1.45;letter-spacing:-0.01em;text-shadow:-2px -2px 0 #111318,2px -2px 0 #111318,-2px 2px 0 #111318,2px 2px 0 #111318,0 2px 0 #111318,0 -2px 0 #111318,2px 0 0 #111318,-2px 0 0 #111318,0 0 6px #111318;">안녕히 계세요 여러분~ 전 이 세상의 모든<br>굴레와 속박을 벗어던지고 제 행복을 찾아 떠납니다~</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px;">
    <div style="background:#F8F7F4;border-radius:16px;padding:32px;">
      <div style="color:#21306F;font-size:64px;font-weight:800;letter-spacing:-0.04em;line-height:1;"><span data-mts-count="28.87">28.87</span><span style="font-size:32px;">%</span></div>
      <div style="font-size:21px;line-height:1.5;margin-top:14px;">국내 기업 신입직 중<br>1년 안에 퇴사한 비율</div>
    </div>
    <div style="background:#F8F7F4;border-radius:16px;padding:32px;">
      <div style="color:#21306F;font-size:64px;font-weight:800;letter-spacing:-0.04em;line-height:1;"><span data-mts-count="56.4">56.4</span><span style="font-size:32px;">%</span></div>
      <div style="font-size:21px;line-height:1.5;margin-top:14px;">중소기업 신입 조기 퇴사자 중<br>3개월 안에 나간 비율</div>
    </div>
  </div>
  <div style="font-size:18px;line-height:1.5;margin-top:14px;">출처: 한국직업능력연구원 조기퇴사율 연구(2020년 기준), 잡코리아 중소기업 신입직 조기 퇴사 조사</div>
  <div style="display:flex;flex-direction:column;gap:16px;margin-top:56px;">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;background:#F8F7F4;border-radius:14px;padding:30px 36px;">
      <div style="font-size:27px;font-weight:600;line-height:1.45;">“들어오고 3개월은 가르치기만 했어요”</div>
      <div style="flex:none;font-size:20px;font-weight:700;border:2px solid #D9C59A;border-radius:4px;padding:8px 18px;">신입 교육</div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;background:#F8F7F4;border-radius:14px;padding:30px 36px;">
      <div style="font-size:27px;font-weight:600;line-height:1.45;">“겨우 손에 익으니 그만두더라고요”</div>
      <div style="flex:none;font-size:20px;font-weight:700;border:2px solid #D9C59A;border-radius:4px;padding:8px 18px;">잦은 퇴사</div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;background:#F8F7F4;border-radius:14px;padding:30px 36px;">
      <div style="font-size:27px;font-weight:600;line-height:1.45;">“새로 온 사람한테 또 처음부터 설명해요”</div>
      <div style="flex:none;font-size:20px;font-weight:700;border:2px solid #D9C59A;border-radius:4px;padding:8px 18px;">재교육</div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;background:#F8F7F4;border-radius:14px;padding:30px 36px;">
      <div style="font-size:27px;font-weight:600;line-height:1.45;">“광고 계정 비밀번호를 아무도 몰라요”</div>
      <div style="flex:none;font-size:20px;font-weight:700;border:2px solid #D9C59A;border-radius:4px;padding:8px 18px;">인수인계</div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;background:#F8F7F4;border-radius:14px;padding:30px 36px;">
      <div style="font-size:27px;font-weight:600;line-height:1.45;">“광고는 돌리는데 랜딩페이지는 못 만들어요”</div>
      <div style="flex:none;font-size:20px;font-weight:700;border:2px solid #D9C59A;border-radius:4px;padding:8px 18px;">좁은 업무 범위</div>
    </div>
  </div>
  <div style="margin-top:48px;border-top:2px solid #F4EDDC;padding-top:40px;font-size:26px;line-height:1.65;text-wrap:pretty;">구독하면 그 분야를 이미 하고 있던 전담자가 맡아요. 담당자가 바뀌어도 TF팀 안에서 넘겨받으니, <strong style="font-weight:800;">처음부터 다시 설명하실 필요가 없어요.</strong></div>
</section>

<section data-screen-label="03 회사 비용" style="background:#F8F7F4;padding:120px 64px;">
  <div style="font-size:24px;font-weight:800;color:#21306F;">02</div>
  <h2 style="margin:16px 0 0;font-size:48px;line-height:1.36;font-weight:800;letter-spacing:-0.04em;">월급 말고도 나가는<br>채용 비용 7가지</h2>
  <div style="position:relative;margin-top:48px;border-radius:20px;overflow:hidden;">
    <img src="/static/subscription/cost-pile.webp" width="1320" height="1752" loading="lazy" decoding="async" data-mts-pile="1" alt="채용공고·면접·복지·상여·퇴직금·4대보험·급여가 산더미처럼 쌓여 대표를 짓누르는 모습" style="display:block;width:100%;height:auto;">
    <img src="/static/subscription/inad-logo.webp" width="480" height="480" loading="lazy" decoding="async" alt="" style="position:absolute;left:24px;bottom:24px;width:72px;height:72px;opacity:0.55;pointer-events:none;">
    <div style="position:absolute;top:4%;left:0;width:36%;display:flex;align-items:center;">
      <div style="flex:none;width:196px;background:#FFFFFF;border:2px solid #21306F;border-radius:12px;padding:12px 16px;"><div style="font-size:22px;font-weight:800;">채용공고</div><div style="font-size:18px;line-height:1.4;margin-top:4px;">공고비, 안 오면 재게재</div></div>
      <div style="flex:1;height:2px;background:#21306F;"></div><div style="flex:none;width:12px;height:12px;border-radius:50%;background:#21306F;"></div>
    </div>
    <div style="position:absolute;top:14%;right:0;left:62%;display:flex;align-items:center;">
      <div style="flex:none;width:12px;height:12px;border-radius:50%;background:#21306F;"></div><div style="flex:1;height:2px;background:#21306F;"></div>
      <div style="flex:none;width:196px;background:#FFFFFF;border:2px solid #21306F;border-radius:12px;padding:12px 16px;"><div style="font-size:22px;font-weight:800;">면접</div><div style="font-size:18px;line-height:1.4;margin-top:4px;">서류 검토·면접에 쓰는 대표·실무자 시간</div></div>
    </div>
    <div style="position:absolute;top:25%;left:0;width:33%;display:flex;align-items:center;">
      <div style="flex:none;width:196px;background:#FFFFFF;border:2px solid #21306F;border-radius:12px;padding:12px 16px;"><div style="font-size:22px;font-weight:800;">복지</div><div style="font-size:18px;line-height:1.4;margin-top:4px;">식대, 노트북·장비, 교육비</div></div>
      <div style="flex:1;height:2px;background:#21306F;"></div><div style="flex:none;width:12px;height:12px;border-radius:50%;background:#21306F;"></div>
    </div>
    <div style="position:absolute;top:35%;right:0;left:65%;display:flex;align-items:center;">
      <div style="flex:none;width:12px;height:12px;border-radius:50%;background:#21306F;"></div><div style="flex:1;height:2px;background:#21306F;"></div>
      <div style="flex:none;width:196px;background:#FFFFFF;border:2px solid #21306F;border-radius:12px;padding:12px 16px;"><div style="font-size:22px;font-weight:800;">상여</div><div style="font-size:18px;line-height:1.4;margin-top:4px;">명절·연말 상여, 성과급</div></div>
    </div>
    <div style="position:absolute;top:45%;left:0;width:37%;display:flex;align-items:center;">
      <div style="flex:none;width:196px;background:#FFFFFF;border:2px solid #21306F;border-radius:12px;padding:12px 16px;"><div style="font-size:22px;font-weight:800;">퇴직금</div><div style="font-size:18px;line-height:1.4;margin-top:4px;">1년마다 30일분 이상 적립</div></div>
      <div style="flex:1;height:2px;background:#21306F;"></div><div style="flex:none;width:12px;height:12px;border-radius:50%;background:#21306F;"></div>
    </div>
    <div style="position:absolute;top:57%;right:0;left:61%;display:flex;align-items:center;">
      <div style="flex:none;width:12px;height:12px;border-radius:50%;background:#21306F;"></div><div style="flex:1;height:2px;background:#21306F;"></div>
      <div style="flex:none;width:196px;background:#FFFFFF;border:2px solid #21306F;border-radius:12px;padding:12px 16px;"><div style="font-size:22px;font-weight:800;">4대보험</div><div style="font-size:18px;line-height:1.4;margin-top:4px;">국민연금·건강·고용·산재 회사 부담분</div></div>
    </div>
    <div style="position:absolute;top:71%;left:0;width:30%;display:flex;align-items:center;">
      <div style="flex:none;width:196px;background:#FFFFFF;border:2px solid #21306F;border-radius:12px;padding:12px 16px;"><div style="font-size:22px;font-weight:800;">급여</div><div style="font-size:18px;line-height:1.4;margin-top:4px;">성과와 관계없이 매달 고정</div></div>
      <div style="flex:1;height:2px;background:#21306F;"></div><div style="flex:none;width:12px;height:12px;border-radius:50%;background:#21306F;"></div>
    </div>
    <div style="position:absolute;right:0;bottom:6%;left:62%;display:flex;align-items:center;">
      <div style="flex:none;width:12px;height:12px;border-radius:50%;background:#21306F;"></div><div style="flex:1;height:2px;background:#21306F;"></div>
      <div style="flex:none;width:196px;background:#21306F;border-radius:12px;padding:12px 16px;"><div style="font-size:22px;font-weight:800;color:#FFFFFF;">이걸 다 지는 건</div><div style="font-size:18px;line-height:1.4;margin-top:4px;color:#FFFFFF;">마케터 1명 뽑은 대표님</div></div>
    </div>
  </div>
  <div style="background:#FFFFFF;border-radius:20px;padding:44px;margin-top:24px;">
    <div style="font-size:28px;font-weight:800;">월급 250만 원 신입 마케터, 회사가 매달 내는 돈</div>
    <div style="display:grid;grid-template-columns:130px 1fr;gap:20px 20px;align-items:center;margin-top:36px;">
      <div style="font-size:22px;font-weight:800;">신입1명 채용</div>
      <div style="display:flex;align-items:stretch;height:72px;"><div style="position:relative;overflow:hidden;background:#D9C59A;border-radius:8px 0 0 8px;height:72px;width:88%;display:flex;align-items:center;justify-content:flex-end;padding:0 24px;font-size:26px;font-weight:800;color:#111318;"><img src="/static/subscription/rookie-face.webp" width="400" height="400" loading="lazy" decoding="async" alt="신입 마케터 얼굴" style="position:absolute;top:0;left:50%;transform:translateX(-50%);height:100%;width:auto;opacity:0.5;"><span style="position:relative;">약 300만 원</span></div><div style="flex:1;border:2.5px dashed #D9C59A;border-left:none;border-radius:0 8px 8px 0;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;">+α</div></div>
      <div style="font-size:22px;font-weight:800;">인애드팀구독</div>
      <div style="position:relative;overflow:hidden;background:#21306F;border-radius:8px;height:72px;width:88%;display:flex;align-items:center;justify-content:flex-end;padding:0 24px;font-size:26px;font-weight:800;color:#FFFFFF;"><img src="/static/subscription/ranger-strip.webp" width="418" height="79" loading="lazy" decoding="async" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.5;"><span style="position:relative;">300만 원</span></div>
    </div>
  </div>
  <div style="background:#FFFFFF;border-radius:20px;padding:44px;margin-top:24px;">
    <div style="font-size:30px;font-weight:800;line-height:1.4;">인애드마케팅 TF팀의 능력,<br>자체 구현하려면?</div>
    <div style="display:flex;align-items:flex-end;justify-content:center;gap:18px;margin-top:40px;">
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px;"><img src="/static/subscription/ace-1.webp" width="300" height="300" loading="lazy" decoding="async" alt="에이스 마케터" style="display:block;width:124px;height:124px;border-radius:50%;border:4px solid #21306F;object-fit:cover;"><div style="background:#21306F;color:#FFFFFF;font-size:19px;font-weight:800;padding:5px 14px;border-radius:4px;">에이스</div></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px;"><img src="/static/subscription/ace-2.webp" width="300" height="300" loading="lazy" decoding="async" alt="에이스 마케터" style="display:block;width:124px;height:124px;border-radius:50%;border:4px solid #21306F;object-fit:cover;"><div style="background:#21306F;color:#FFFFFF;font-size:19px;font-weight:800;padding:5px 14px;border-radius:4px;">에이스</div></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px;"><img src="/static/subscription/ace-3.webp" width="300" height="300" loading="lazy" decoding="async" alt="에이스 마케터" style="display:block;width:124px;height:124px;border-radius:50%;border:4px solid #21306F;object-fit:cover;"><div style="background:#21306F;color:#FFFFFF;font-size:19px;font-weight:800;padding:5px 14px;border-radius:4px;">에이스</div></div>
      <div style="align-self:center;font-size:44px;font-weight:800;color:#21306F;margin:0 4px 40px;">+</div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px;"><img src="/static/subscription/rookie-face.webp" width="400" height="400" loading="lazy" decoding="async" alt="루키 마케터" style="display:block;width:124px;height:124px;border-radius:50%;border:4px dashed #D9C59A;object-fit:cover;"><div style="border:2px solid #D9C59A;font-size:19px;font-weight:800;padding:3px 14px;border-radius:4px;">루키</div></div>
    </div>
    <div style="text-align:center;font-size:26px;font-weight:800;margin-top:28px;">최소 <span style="color:#21306F;">에이스 3명</span>에 <span style="color:#21306F;">루키 1명</span>은 뽑아야 해요</div>
    <div style="display:flex;justify-content:flex-end;margin-top:20px;">
      <div style="position:relative;border:2px dashed #D9C59A;border-radius:18px 18px 4px 18px;padding:12px 20px;font-size:20px;line-height:1.5;font-style:italic;letter-spacing:0.02em;">소곤소곤… 월 천만 원으로도 택도 없죠</div>
    </div>
    <div style="font-size:26px;font-weight:800;margin-top:44px;">이제 시작하려니…</div>
    <div style="position:relative;margin-top:16px;border-radius:16px;overflow:hidden;">
      <img src="/static/subscription/ox-cart.webp" width="811" height="478" loading="lazy" decoding="async" alt="소달구지가 시골길을 천천히 가는 흑백 사진" style="display:block;width:100%;height:auto;">
      <div style="position:absolute;left:4%;top:8%;background:#FFFFFF;border:2.5px solid #111318;border-radius:999px;padding:8px 18px;font-size:21px;font-weight:800;">집행 예산은?</div>
      <div style="position:absolute;left:36%;top:3%;background:#FFFFFF;border:2.5px solid #111318;border-radius:999px;padding:8px 18px;font-size:21px;font-weight:800;">소재 제작비는?</div>
      <div style="position:absolute;right:4%;top:8%;background:#FFFFFF;border:2.5px solid #111318;border-radius:999px;padding:8px 18px;font-size:21px;font-weight:800;">랜딩 제작비는?</div>
      <div style="position:absolute;left:55%;top:24%;background:#FFFFFF;border:2.5px solid #111318;border-radius:999px;padding:8px 18px;font-size:21px;font-weight:800;">대행사 관리는요?</div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:14px;margin-top:40px;">
      <div style="width:10px;height:10px;border-radius:50%;background:#21306F;"></div>
      <div style="width:10px;height:10px;border-radius:50%;background:#21306F;"></div>
      <div style="width:10px;height:10px;border-radius:50%;background:#21306F;"></div>
    </div>
    <div style="text-align:center;font-size:30px;font-weight:800;margin-top:28px;">인애드 마케팅 팀구독 시</div>
    <div style="position:relative;margin-top:28px;border-radius:16px;overflow:hidden;">
      <img src="/static/subscription/inad-suv.webp" width="1260" height="709" loading="lazy" decoding="async" alt="인애드 원형 로고를 단 흰색 SUV가 고속도로를 빠르게 달리는 모습" style="display:block;width:100%;height:auto;">
      <div style="position:absolute;left:58.5%;top:13%;background:#FFFFFF;border:2.5px solid #111318;border-radius:18px;padding:8px 16px;font-size:22px;font-weight:800;line-height:1.3;text-align:center;white-space:nowrap;z-index:1;" data-pop="1">오오오..!!<br>오오오오!!!<div style="position:absolute;right:18px;bottom:-11px;width:16px;height:16px;background:#FFFFFF;border-right:2.5px solid #111318;border-bottom:2.5px solid #111318;transform:rotate(45deg);"></div></div>
      <div style="position:absolute;top:0;bottom:0;left:0;width:62%;background:linear-gradient(90deg,rgba(17,19,24,0.82) 0%,rgba(17,19,24,0.6) 65%,rgba(17,19,24,0) 100%);"></div>
      <div style="position:absolute;left:28px;top:22px;bottom:22px;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="position:absolute;left:10px;top:12px;bottom:12px;width:2px;background:#FFFFFF;"></div>
        <div style="position:relative;display:flex;align-items:center;gap:14px;font-size:19px;font-weight:700;color:#FFFFFF;"><div style="flex:none;width:24px;height:24px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 L6.5 12 L13 4.5" stroke="#21306F" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>A/B테스트 결과 보고</div>
        <div style="position:relative;display:flex;align-items:center;gap:14px;font-size:19px;font-weight:700;color:#FFFFFF;"><div style="flex:none;width:24px;height:24px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 L6.5 12 L13 4.5" stroke="#21306F" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>새 소재 시안 및 카피 공유</div>
        <div style="position:relative;display:flex;align-items:center;gap:14px;font-size:19px;font-weight:700;color:#FFFFFF;"><div style="flex:none;width:24px;height:24px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 L6.5 12 L13 4.5" stroke="#21306F" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>바이럴 시딩 전반 현황 공유</div>
        <div style="position:relative;display:flex;align-items:center;gap:14px;font-size:19px;font-weight:700;color:#FFFFFF;"><div style="flex:none;width:24px;height:24px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 L6.5 12 L13 4.5" stroke="#21306F" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>랜딩페이지 시안 승인 요청</div>
        <div style="position:relative;display:flex;align-items:center;gap:14px;font-size:19px;font-weight:700;color:#FFFFFF;"><div style="flex:none;width:24px;height:24px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 L6.5 12 L13 4.5" stroke="#21306F" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>이번 달 릴스 소재 편집본 보고</div>
        <div style="position:relative;display:flex;align-items:center;gap:14px;font-size:19px;font-weight:700;color:#FFFFFF;"><div style="flex:none;width:24px;height:24px;border-radius:50%;background:#FFFFFF;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 L6.5 12 L13 4.5" stroke="#21306F" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>주간 브랜드 시장조사 보고</div>
      </div>
    </div>
  </div>
</section>

<section data-screen-label="04 비교표" style="padding:120px 64px;">
  <div style="font-size:24px;font-weight:800;color:#21306F;">03</div>
  <h2 style="margin:16px 0 0;font-size:48px;line-height:1.36;font-weight:800;letter-spacing:-0.04em;">채용과 구독, 한 표로 비교</h2>
  <div style="margin-top:56px;display:grid;grid-template-columns:150px 1fr 1fr;font-size:22px;line-height:1.5;">
    <div style="background:#21306F;color:#FFFFFF;font-weight:700;padding:22px 20px;border-radius:14px 0 0 0;">비교 기준</div>
    <div style="background:#21306F;color:#FFFFFF;font-weight:700;padding:22px 20px;">마케터 1명 채용</div>
    <div style="background:#21306F;color:#FFFFFF;font-weight:700;padding:22px 20px;border-radius:0 14px 0 0;">인애드 종합 마케팅 구독</div>

    <div style="font-weight:800;padding:26px 20px;border-bottom:2px solid #F4EDDC;">시작</div>
    <div style="padding:26px 20px;border-bottom:2px solid #F4EDDC;">공고·면접·처우 협의 뒤 입사</div>
    <div style="padding:26px 20px;background:#FBF0CF;border-left:2.5px solid #21306F;border-right:2.5px solid #21306F;font-weight:600;">계약하면 초기진단·세팅부터 무료로 시작</div>

    <div style="font-weight:800;padding:26px 20px;border-bottom:2px solid #F4EDDC;">월 비용</div>
    <div style="padding:26px 20px;border-bottom:2px solid #F4EDDC;">월 300만 원+α (급여 250만 원 + 4대보험·퇴직금·상여·복지)</div>
    <div style="padding:26px 20px;background:#FBF0CF;border-left:2.5px solid #21306F;border-right:2.5px solid #21306F;font-weight:600;">월 300만 원 정액(부가세 별도)</div>

    <div style="font-weight:800;padding:26px 20px;border-bottom:2px solid #F4EDDC;">맡는 일</div>
    <div style="padding:26px 20px;border-bottom:2px solid #F4EDDC;">1명이 할 수 있는 만큼</div>
    <div style="padding:26px 20px;background:#FBF0CF;border-left:2.5px solid #21306F;border-right:2.5px solid #21306F;font-weight:600;">광고부터 언론보도까지 10가지</div>

    <div style="font-weight:800;padding:26px 20px;border-bottom:2px solid #F4EDDC;">교육</div>
    <div style="padding:26px 20px;border-bottom:2px solid #F4EDDC;">신입 교육, 퇴사하면 다시 교육</div>
    <div style="padding:26px 20px;background:#FBF0CF;border-left:2.5px solid #21306F;border-right:2.5px solid #21306F;font-weight:600;">그 일을 하던 전담자가 바로 투입</div>

    <div style="font-weight:800;padding:26px 20px;border-bottom:2px solid #F4EDDC;">퇴사·교체</div>
    <div style="padding:26px 20px;border-bottom:2px solid #F4EDDC;">인수인계 공백, 다시 채용</div>
    <div style="padding:26px 20px;background:#FBF0CF;border-left:2.5px solid #21306F;border-right:2.5px solid #21306F;font-weight:600;">TF팀 안에서 넘겨받아 공백 없음</div>

    <div style="font-weight:800;padding:26px 20px;">보고</div>
    <div style="padding:26px 20px;">담당자마다 다름</div>
    <div style="padding:26px 20px;background:#FBF0CF;border:2.5px solid #21306F;border-top:none;border-radius:0 0 14px 14px;font-weight:600;">매주 브랜드 주간보고서</div>
  </div>
</section>

<section data-screen-label="05 포함 항목" style="background:#F8F7F4;padding:120px 64px 0;">
  <div style="font-size:24px;font-weight:800;color:#21306F;">04</div>
  <h2 id="mteTitle" style="margin:16px 0 0;font-size:48px;line-height:1.36;font-weight:800;letter-spacing:-0.04em;">따로 맡기면 450만 원,<br>팀구독은 월 300만 원</h2>
  <p style="margin:24px 0 0;font-size:24px;line-height:1.6;">10가지가 모두 담겨 있어요.<br>필요 없는 항목은 빼서 견적을 직접 맞춰 보세요.</p>
</section>
<!--ESTIMATE-->
<div style="background:#F8F7F4;padding:0 64px 120px;"><div style="font-size:17px;line-height:1.6;">광고비, 체험단 제품·배송비, 구매평에 쓰이는 상품 비용, 촬영 모델·장소 비용은 별도예요 · 소재 무제한은 월 운영 범위 안에서 제작해요</div></div>
<section data-screen-label="06 TF팀" style="padding:120px 64px;">
  <div style="font-size:24px;font-weight:800;color:#21306F;">05</div>
  <h2 style="margin:16px 0 0;font-size:48px;line-height:1.36;font-weight:800;letter-spacing:-0.04em;">우리 브랜드 전담 TF팀 구성</h2>
  <p style="margin:24px 0 0;font-size:24px;line-height:1.6;text-wrap:pretty;">마케터 1명이 혼자 하던 일을 6개 파트 전담자가 나눠 맡아요.</p>
  <div style="position:relative;margin-top:48px;"><img src="/static/subscription/tf-meeting.webp" width="1400" height="941" loading="lazy" decoding="async" alt="인애드 마케팅 TF팀 6명이 광고 시안을 펼쳐 놓고 회의하는 모습" style="display:block;width:100%;height:auto;border-radius:20px;"><img src="/static/subscription/inad-logo.webp" width="480" height="480" loading="lazy" decoding="async" alt="" style="position:absolute;right:24px;top:22px;width:68px;height:68px;opacity:0.55;pointer-events:none;"></div>
  <div style="margin-top:48px;display:grid;grid-template-columns:200px 1fr;font-size:22px;line-height:1.5;">
    <div style="background:#21306F;color:#FFFFFF;font-weight:700;padding:22px 24px;border-radius:14px 0 0 0;">전담 파트</div>
    <div style="background:#21306F;color:#FFFFFF;font-weight:700;padding:22px 24px;border-radius:0 14px 0 0;">맡는 항목</div>
    <div style="font-weight:800;font-size:24px;padding:26px 24px;border-bottom:2px solid #F4EDDC;">광고 운영</div>
    <div style="padding:26px 24px;border-bottom:2px solid #F4EDDC;">퍼포먼스 마케팅, 광고 계정 진단·세팅, GA4·GTM 설치, 브랜드 주간보고서</div>
    <div style="font-weight:800;font-size:24px;padding:26px 24px;border-bottom:2px solid #F4EDDC;">기획·카피라이터</div>
    <div style="padding:26px 24px;border-bottom:2px solid #F4EDDC;">랜딩페이지 기획·원고, 광고 카피, 언론기사 작성</div>
    <div style="font-weight:800;font-size:24px;padding:26px 24px;border-bottom:2px solid #F4EDDC;">디자인</div>
    <div style="padding:26px 24px;border-bottom:2px solid #F4EDDC;">광고 소재 무제한 제작, 랜딩페이지 디자인</div>
    <div style="font-weight:800;font-size:24px;padding:26px 24px;border-bottom:2px solid #F4EDDC;">영상 디렉터</div>
    <div style="padding:26px 24px;border-bottom:2px solid #F4EDDC;">릴스 소재 기획·제작</div>
    <div style="font-weight:800;font-size:24px;padding:26px 24px;border-bottom:2px solid #F4EDDC;">바이럴 운영</div>
    <div style="padding:26px 24px;border-bottom:2px solid #F4EDDC;">카페 바이럴, 언론기사 송출</div>
    <div style="font-weight:800;font-size:24px;padding:26px 24px;">체험단 운영</div>
    <div style="padding:26px 24px;">블로그 체험단, 구매후기 체험단</div>
  </div>
</section>

<section data-screen-label="07 진행 순서" style="background:#F8F7F4;padding:120px 64px;">
  <div style="font-size:24px;font-weight:800;color:#21306F;">06</div>
  <h2 style="margin:16px 0 0;font-size:48px;line-height:1.36;font-weight:800;letter-spacing:-0.04em;">상담부터 첫 보고서까지 5단계</h2>
  <div style="display:flex;flex-direction:column;align-items:stretch;margin-top:56px;">
    <div style="background:#FFFFFF;border-top:5px solid #21306F;border-radius:6px 6px 14px 14px;padding:32px 40px;display:grid;grid-template-columns:110px 1fr;gap:20px;align-items:start;">
      <div style="color:#21306F;font-size:44px;font-weight:800;line-height:1.1;">1</div>
      <div><div style="font-size:28px;font-weight:800;">무료 상담 신청</div><div style="font-size:21px;line-height:1.55;margin-top:8px;">브랜드, 판매 채널, 지금 쓰는 광고비를 알려 주세요.</div></div>
    </div>
    <div style="align-self:center;width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-top:18px solid #D9C59A;margin:14px 0;"></div>
    <div style="background:#FFFFFF;border-top:5px solid #21306F;border-radius:6px 6px 14px 14px;padding:32px 40px;display:grid;grid-template-columns:110px 1fr;gap:20px;align-items:start;">
      <div style="color:#21306F;font-size:44px;font-weight:800;line-height:1.1;">2</div>
      <div><div style="font-size:28px;font-weight:800;">초기진단</div><div style="font-size:21px;line-height:1.55;margin-top:8px;">광고 계정과 GA4·GTM 설치 상태를 점검해요.</div></div>
    </div>
    <div style="align-self:center;width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-top:18px solid #D9C59A;margin:14px 0;"></div>
    <div style="background:#FFFFFF;border-top:5px solid #21306F;border-radius:6px 6px 14px 14px;padding:32px 40px;display:grid;grid-template-columns:110px 1fr;gap:20px;align-items:start;">
      <div style="color:#21306F;font-size:44px;font-weight:800;line-height:1.1;">3</div>
      <div><div style="font-size:28px;font-weight:800;">세팅</div><div style="font-size:21px;line-height:1.55;margin-top:8px;">GA4·GTM을 설치하고 광고 계정을 다시 세팅해요.</div></div>
    </div>
    <div style="align-self:center;width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-top:18px solid #D9C59A;margin:14px 0;"></div>
    <div style="background:#FFFFFF;border-top:5px solid #21306F;border-radius:6px 6px 14px 14px;padding:32px 40px;display:grid;grid-template-columns:110px 1fr;gap:20px;align-items:start;">
      <div style="color:#21306F;font-size:44px;font-weight:800;line-height:1.1;">4</div>
      <div><div style="font-size:28px;font-weight:800;">운영 시작</div><div style="font-size:21px;line-height:1.55;margin-top:8px;">광고, 소재, 바이럴, 체험단, 언론기사를 파트별 전담자가 동시에 진행해요.</div></div>
    </div>
    <div style="align-self:center;width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-top:18px solid #D9C59A;margin:14px 0;"></div>
    <div style="background:#FFFFFF;border-top:5px solid #21306F;border-radius:6px 6px 14px 14px;padding:32px 40px;display:grid;grid-template-columns:110px 1fr;gap:20px;align-items:start;">
      <div style="color:#21306F;font-size:44px;font-weight:800;line-height:1.1;">5</div>
      <div><div style="font-size:28px;font-weight:800;">매주 보고</div><div style="font-size:21px;line-height:1.55;margin-top:8px;">브랜드 주간보고서를 매주 보내 드려요.</div></div>
    </div>
  </div>
</section>

<section data-screen-label="08 상담" style="padding:120px 64px 100px;">
  <div data-screen-label="07-2 성과 레퍼런스" data-ref="1" style="word-break:keep-all;letter-spacing:-0.02em;margin-bottom:24px;">
    <h2 style="margin:0;font-size:48px;line-height:1.36;font-weight:800;letter-spacing:-0.04em;">이런 결과를<br>받아보고 싶다면?</h2>
    <div style="display:flex;justify-content:center;align-items:center;gap:8px;margin-top:48px;font-size:17px;font-weight:600;"><span style="width:20px;height:20px;border-radius:50%;background:#21306F;color:#FFFFFF;font-size:12px;display:flex;align-items:center;justify-content:center;">↓</span>유형별 성과 레퍼런스를 보시려면 선택하세요.</div>
    <div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));border-bottom:2px solid #D9C59A;margin-top:14px;">
      <button type="button" data-ref-tab="0" aria-pressed="true" style="font-family:inherit;font-size:18px;font-weight:800;line-height:1.3;white-space:pre-line;padding:12px 2px 16px;border:0;box-shadow:inset 0 -4px 0 #21306F;margin-bottom:-2px;background:transparent;color:#21306F;cursor:pointer;transition:border-color .25s,color .25s;">구글검색
+메타</button>
      <button type="button" data-ref-tab="1" aria-pressed="false" style="font-family:inherit;font-size:18px;font-weight:600;line-height:1.3;white-space:pre-line;padding:12px 2px 16px;border:0;box-shadow:inset 0 -4px 0 transparent;margin-bottom:-2px;background:transparent;color:#111318;cursor:pointer;transition:border-color .25s,color .25s;">네이버
파워링크</button>
      <button type="button" data-ref-tab="2" aria-pressed="false" style="font-family:inherit;font-size:18px;font-weight:600;line-height:1.3;white-space:pre-line;padding:12px 2px 16px;border:0;box-shadow:inset 0 -4px 0 transparent;margin-bottom:-2px;background:transparent;color:#111318;cursor:pointer;transition:border-color .25s,color .25s;">네이버
쇼핑검색</button>
      <button type="button" data-ref-tab="3" aria-pressed="false" style="font-family:inherit;font-size:18px;font-weight:600;line-height:1.3;white-space:pre-line;padding:12px 2px 16px;border:0;box-shadow:inset 0 -4px 0 transparent;margin-bottom:-2px;background:transparent;color:#111318;cursor:pointer;transition:border-color .25s,color .25s;">구글
디맨드젠</button>
      <button type="button" data-ref-tab="4" aria-pressed="false" style="font-family:inherit;font-size:18px;font-weight:600;line-height:1.3;white-space:pre-line;padding:12px 2px 16px;border:0;box-shadow:inset 0 -4px 0 transparent;margin-bottom:-2px;background:transparent;color:#111318;cursor:pointer;transition:border-color .25s,color .25s;">디스플레이
광고</button>
      <button type="button" data-ref-tab="5" aria-pressed="false" style="font-family:inherit;font-size:18px;font-weight:600;line-height:1.3;white-space:pre-line;padding:12px 2px 16px;border:0;box-shadow:inset 0 -4px 0 transparent;margin-bottom:-2px;background:transparent;color:#111318;cursor:pointer;transition:border-color .25s,color .25s;">SNS
광고</button>
      <button type="button" data-ref-tab="6" aria-pressed="false" style="font-family:inherit;font-size:18px;font-weight:600;line-height:1.3;white-space:pre-line;padding:12px 2px 16px;border:0;box-shadow:inset 0 -4px 0 transparent;margin-bottom:-2px;background:transparent;color:#111318;cursor:pointer;transition:border-color .25s,color .25s;">메타
광고</button>
    </div>
    <div data-ref-panel="0" style="background:#FFFFFF;border-radius:20px;padding:44px;margin-top:24px;">
      <div style="font-size:19px;font-weight:700;color:#21306F;">B2B 광고대행 · 인애드컴퍼니 자사</div>
      <div style="font-size:34px;font-weight:800;line-height:1.4;margin-top:12px;">브랜드 초기 3개월 만에 월 문의 14건 → 74건</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:end;height:300px;margin-top:36px;padding:0 60px;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div style="font-size:26px;font-weight:800;">14건</div><div data-ref-bar="1" style="width:100%;height:18.9189%;background:#D9C59A;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:700;">7월</div></div>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div data-ref-after="1" style="font-size:40px;font-weight:800;line-height:1.2;letter-spacing:-0.03em;color:#21306F;padding:0 8px;background:linear-gradient(#FFE94A,#FFE94A) no-repeat left 88% / 100% 40%;">74건</div><div data-ref-bar="1" style="width:100%;height:100%;background:#21306F;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:800;">9월</div></div>
      </div>
      <div style="text-align:center;font-size:19px;font-weight:600;margin-top:12px;">월 문의 건수</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;border-top:2px solid #F4EDDC;padding-top:28px;">
        <div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">-66%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">문의당 비용
10만 → 3.4만 원</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">1.8배</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">월 광고비
140만 → 250만 원</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">166건</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">누적 문의
7월 ~ 10월 14일</div></div>
      </div>
      <div style="font-size:16px;line-height:1.5;margin-top:24px;">2026년 7월 ~ 10월 14일 · 구글 검색 + 메타 합산</div>
    </div>
    <div data-ref-panel="1" style="background:#FFFFFF;border-radius:20px;padding:44px;margin-top:24px;display:none;">
      <div style="font-size:19px;font-weight:700;color:#21306F;">가전 리테일 · H브랜드</div>
      <div style="font-size:34px;font-weight:800;line-height:1.4;margin-top:12px;">광고비 350만 원 더 쓰고 매출 1억 410만 원 더</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:end;height:300px;margin-top:36px;padding:0 60px;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div style="font-size:26px;font-weight:800;">2.21억</div><div data-ref-bar="1" style="width:100%;height:68%;background:#D9C59A;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:700;">6월</div></div>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div data-ref-after="1" style="font-size:40px;font-weight:800;line-height:1.2;letter-spacing:-0.03em;color:#21306F;padding:0 8px;background:linear-gradient(#FFE94A,#FFE94A) no-repeat left 88% / 100% 40%;">3.25억</div><div data-ref-bar="1" style="width:100%;height:100%;background:#21306F;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:800;">7월</div></div>
      </div>
      <div style="text-align:center;font-size:19px;font-weight:600;margin-top:12px;">월 광고 매출</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;border-top:2px solid #F4EDDC;padding-top:28px;">
        <div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">+1억 410만</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">월 매출 증가</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">1,373%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">ROAS
1,095% → 1,373%</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">1.8배</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">유입당 매출
3,628원 → 6,508원</div></div>
      </div>
      <div style="font-size:16px;line-height:1.5;margin-top:24px;">2025년 6월 vs 7월 · 네이버 키워드광고 기준</div>
    </div>
    <div data-ref-panel="2" style="background:#FFFFFF;border-radius:20px;padding:44px;margin-top:24px;display:none;">
      <div style="font-size:19px;font-weight:700;color:#21306F;">스포츠웨어 E커머스 · S브랜드</div>
      <div style="font-size:34px;font-weight:800;line-height:1.4;margin-top:12px;">한 달 만에 매출 57%, 구매 74% 상승</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:end;height:300px;margin-top:36px;padding:0 60px;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div style="font-size:26px;font-weight:800;">4,436만</div><div data-ref-bar="1" style="width:100%;height:63.5986%;background:#D9C59A;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:700;">3월</div></div>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div data-ref-after="1" style="font-size:40px;font-weight:800;line-height:1.2;letter-spacing:-0.03em;color:#21306F;padding:0 8px;background:linear-gradient(#FFE94A,#FFE94A) no-repeat left 88% / 100% 40%;">6,975만</div><div data-ref-bar="1" style="width:100%;height:100%;background:#21306F;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:800;">4월</div></div>
      </div>
      <div style="text-align:center;font-size:19px;font-weight:600;margin-top:12px;">월 광고 매출</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;border-top:2px solid #F4EDDC;padding-top:28px;">
        <div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">+74%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">구매 건수
326건 → 568건</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">+167%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">장바구니 담기
1,178건 → 3,144건</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">+135%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">회원가입
264건 → 620건</div></div>
      </div>
      <div style="font-size:16px;line-height:1.5;margin-top:24px;">3월 vs 4월 · ROAS 4,700%대 유지 · 네이버 광고관리시스템 기준</div>
    </div>
    <div data-ref-panel="3" style="background:#FFFFFF;border-radius:20px;padding:44px;margin-top:24px;display:none;">
      <div style="font-size:19px;font-weight:700;color:#21306F;">스포츠웨어 E커머스 · S브랜드</div>
      <div style="font-size:34px;font-weight:800;line-height:1.4;margin-top:12px;">영상 시청 비용 92% 절감, 시청은 76배</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:end;height:300px;margin-top:36px;padding:0 60px;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div style="font-size:26px;font-weight:800;">518원</div><div data-ref-bar="1" style="width:100%;height:100%;background:#D9C59A;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:700;">3월</div></div>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div data-ref-after="1" style="font-size:40px;font-weight:800;line-height:1.2;letter-spacing:-0.03em;color:#21306F;padding:0 8px;background:linear-gradient(#FFE94A,#FFE94A) no-repeat left 88% / 100% 40%;">41원</div><div data-ref-bar="1" style="width:100%;height:7.91506%;background:#21306F;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:800;">4월</div></div>
      </div>
      <div style="text-align:center;font-size:19px;font-weight:600;margin-top:12px;">영상 1회 시청 비용 (낮을수록 좋아요)</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;border-top:2px solid #F4EDDC;padding-top:28px;">
        <div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">76배</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">영상 시청
833회 → 63,455회</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">12.5배</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">시청률
0.16% → 2.00%</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">317만</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">월 노출
52만 → 317만 회</div></div>
      </div>
      <div style="font-size:16px;line-height:1.5;margin-top:24px;">3월 vs 4월 · 구글 애즈 기준</div>
    </div>
    <div data-ref-panel="4" style="background:#FFFFFF;border-radius:20px;padding:44px;margin-top:24px;display:none;">
      <div style="font-size:19px;font-weight:700;color:#21306F;">가전 리테일 · H브랜드</div>
      <div style="font-size:34px;font-weight:800;line-height:1.4;margin-top:12px;">웹 DA 광고비 280만 원 더 쓰고 매출 6,560만 원 더</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:end;height:300px;margin-top:36px;padding:0 60px;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div style="font-size:26px;font-weight:800;">1.62억</div><div data-ref-bar="1" style="width:100%;height:71.3656%;background:#D9C59A;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:700;">6월</div></div>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div data-ref-after="1" style="font-size:40px;font-weight:800;line-height:1.2;letter-spacing:-0.03em;color:#21306F;padding:0 8px;background:linear-gradient(#FFE94A,#FFE94A) no-repeat left 88% / 100% 40%;">2.27억</div><div data-ref-bar="1" style="width:100%;height:100%;background:#21306F;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:800;">7월</div></div>
      </div>
      <div style="text-align:center;font-size:19px;font-weight:600;margin-top:12px;">웹 DA 월 매출</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;border-top:2px solid #F4EDDC;padding-top:28px;">
        <div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">385%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">ROAS
288% → 385%</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">+3,870만</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">일반광고 매출 (+82%)</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">+2,690만</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">리타겟팅 매출 (+23%)</div></div>
      </div>
      <div style="font-size:16px;line-height:1.5;margin-top:24px;">2025년 6월 vs 7월 · 웹 일반광고 + 리타겟팅 기준</div>
    </div>
    <div data-ref-panel="5" style="background:#FFFFFF;border-radius:20px;padding:44px;margin-top:24px;display:none;">
      <div style="font-size:19px;font-weight:700;color:#21306F;">어학 교육 · L브랜드</div>
      <div style="font-size:34px;font-weight:800;line-height:1.4;margin-top:12px;">같은 클릭 단가로 구매 전환 2배 이상</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:end;height:300px;margin-top:36px;padding:0 60px;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div style="font-size:26px;font-weight:800;">1.41%</div><div data-ref-bar="1" style="width:100%;height:56.1753%;background:#D9C59A;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:700;">2023</div></div>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div data-ref-after="1" style="font-size:40px;font-weight:800;line-height:1.2;letter-spacing:-0.03em;color:#21306F;padding:0 8px;background:linear-gradient(#FFE94A,#FFE94A) no-repeat left 88% / 100% 40%;">2.51%</div><div data-ref-bar="1" style="width:100%;height:100%;background:#21306F;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:800;">2024</div></div>
      </div>
      <div style="text-align:center;font-size:19px;font-weight:600;margin-top:12px;">SNS 광고 구매 전환율</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;border-top:2px solid #F4EDDC;padding-top:28px;">
        <div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">2.2배</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">구매 전환
6건 → 13건</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">+101%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">전환 매출
103만 → 208만 원</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">+13%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">클릭 수
62,799 → 71,217회</div></div>
      </div>
      <div style="font-size:16px;line-height:1.5;margin-top:24px;">2023년 vs 2024년 연간 · 마지막 클릭 기준 전환</div>
    </div>
    <div data-ref-panel="6" style="background:#FFFFFF;border-radius:20px;padding:44px;margin-top:24px;display:none;">
      <div style="font-size:19px;font-weight:700;color:#21306F;">교육 · P브랜드</div>
      <div style="font-size:34px;font-weight:800;line-height:1.4;margin-top:12px;">신청 0건 계정에서 한 달 만에 신청 179건</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:end;height:300px;margin-top:36px;padding:0 60px;">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div style="font-size:26px;font-weight:800;">0건</div><div data-ref-bar="1" style="width:100%;height:4%;background:#D9C59A;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:700;">11월</div></div>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:12px;height:100%;"><div data-ref-after="1" style="font-size:40px;font-weight:800;line-height:1.2;letter-spacing:-0.03em;color:#21306F;padding:0 8px;background:linear-gradient(#FFE94A,#FFE94A) no-repeat left 88% / 100% 40%;">179건</div><div data-ref-bar="1" style="width:100%;height:100%;background:#21306F;border-radius:10px 10px 0 0;transform-origin:bottom;transform:scaleY(1);"></div><div style="font-size:21px;font-weight:800;">12월</div></div>
      </div>
      <div style="text-align:center;font-size:19px;font-weight:600;margin-top:12px;">신청하기 전환</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;border-top:2px solid #F4EDDC;padding-top:28px;">
        <div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">5.2배</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">클릭 수
1,330 → 6,900회</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">9.46%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">영상 시청률
8.53% → 9.46%</div></div><div><div style="font-size:38px;font-weight:800;color:#21306F;letter-spacing:-0.03em;">1.35%</div><div style="font-size:19px;line-height:1.45;margin-top:6px;white-space:pre-line;">이미지 소재 클릭률
영상 소재의 12배</div></div>
      </div>
      <div style="font-size:16px;line-height:1.5;margin-top:24px;">11월 vs 12월 · 신청당 비용 8.2만 원 · 메타 광고관리자 기준</div>
    </div>
    <div style="font-size:16px;line-height:1.6;margin-top:14px;">실제 운영 계정 데이터 · 광고주명은 업종과 이니셜로 표기</div>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:14px;margin:40px 0;">
    <div style="width:10px;height:10px;border-radius:50%;background:#21306F;"></div>
    <div style="width:10px;height:10px;border-radius:50%;background:#21306F;"></div>
    <div style="width:10px;height:10px;border-radius:50%;background:#21306F;"></div>
  </div>
  <div style="position:relative;overflow:hidden;background:#21306F;border-radius:24px;padding:72px 56px;text-align:center;color:#FFFFFF;">
    <img src="/static/subscription/cta-rangers.webp" width="885" height="662" loading="lazy" decoding="async" alt="" style="position:absolute;left:50%;bottom:0;transform:translateX(-50%);height:100%;width:auto;opacity:0.5;pointer-events:none;">
    <h2 style="position:relative;margin:0;font-size:46px;line-height:1.38;font-weight:800;letter-spacing:-0.04em;color:#FFFFFF;">채용 공고 올리기 전에,<br>무료 진단부터 받아 보세요</h2>
    <p style="position:relative;margin:28px 0 0;font-size:24px;line-height:1.6;color:#FFFFFF;">신청하시면 담당자가 연락드려요.</p>
    <a href="/contact" data-mts-cta="1" data-mts-pos="final" style="position:relative;display:inline-block;margin-top:44px;background:#FFFFFF;color:#21306F;font-size:28px;font-weight:800;text-decoration:none;padding:26px 64px;border-radius:4px;">무료 상담 신청</a>
  </div>
  <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:64px;">
    <img src="/static/subscription/inad-logo.webp" width="480" height="480" loading="lazy" decoding="async" alt="인애드컴퍼니 로고" style="display:block;width:32px;height:32px;">
    <div style="font-size:20px;">올인원 퍼포먼스 마케팅 에이전시,</div>
    <div style="font-size:22px;font-weight:800;">인애드컴퍼니</div>
  </div>
</section>
<div data-sticky="1" class="mts-sticky" style="position:fixed;left:50%;bottom:24px;z-index:50;transform:translate(-50%,160%);opacity:0;pointer-events:none;transition:opacity 0.3s ease, transform 0.45s cubic-bezier(0.2,0.7,0.2,1);display:flex;gap:10px;white-space:nowrap;"><a href="#estimate" data-mts-pos="sticky" style="display:flex;align-items:center;background:#FFFFFF;color:#21306F;text-decoration:none;font-size:max(24px, calc(15px / var(--mts-zoom, 1)));font-weight:800;padding:18px 28px;border-radius:4px;box-shadow:inset 0 0 0 3px #21306F, 0 10px 30px rgba(17,19,24,0.22);">견적 맞춰 보기</a><a href="/contact" data-mts-cta="1" data-mts-pos="sticky" style="display:flex;align-items:center;gap:12px;background:#21306F;color:#FFFFFF;text-decoration:none;font-size:max(24px, calc(15px / var(--mts-zoom, 1)));font-weight:800;padding:18px 44px;border-radius:4px;box-shadow:0 10px 30px rgba(17,19,24,0.28);">무료 상담 신청<span class="mts-sticky-sub" style="font-size:18px;font-weight:600;">초기진단 무료</span></a></div>

</div>
`
