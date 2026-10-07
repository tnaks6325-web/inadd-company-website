# IN AD SERVICE — split vector motion preview

DEV-only integration in `src/routes/home.tsx`. Production routing and original service layout/copy remain unchanged.

Source: Figma file `MjYi6OwodeGA4YMTVXNtB0`, page `118:421`.

| Key | Source timeline frame |
| --- | --- |
| viral | 120:3157 |
| performance | 120:3354 |
| influencer | 120:3483 |
| seeding | 120:3616 |
| review | 120:3743 |
| oliveyoung | 120:3879 |
| ppl | 120:3982 |

- `part-*.svg`: 52 original static Figma assets; native root dimensions unchanged.
- `scenes.json`: design-context hierarchy/placement and motion-context provenance joined by node ID.
- `entrance.css`: retained original five-second Figma proof keyframes and easing, unchanged for provenance. The current preview instead uses the explicitly requested selection choreography below.
- `../service-motion-preview.css`: optical scene centering, web hinge origins and separate restrained idle motion. Play symbols/stars share their moving card's track to stay aligned; shadows stay fixed.
- `../service-motion-preview.js`: measured tab indicator; directional 230ms part exit; 660ms staged overshoot assembly (plus up to 190ms stagger); per-part pose and SVG-stroke snapshots on interruption; latest-selection wins; same-tab replay; async SVG preparation/cache; visibility pausing; reduced-motion static pose; loading fallback/retry. Individual translate/rotate/scale leave source layout transforms intact. Web choreography is authored for this request, not claimed as source Figma timeline fidelity.
- `../service-motion-action.css`: seven distinct 1.6s selection-triggered actions after assembly: viral broadcast, performance growth/target, influencer playback/reactions, sample unboxing, review verification, beauty product search, and PPL spotlight. Then return to restrained idle; no automatic action replay while idle.
- `../service-scene-preview.css`: whole-introduction trial; Review uses a larger two-row semantic title, while all services share masked title beats, subsequent description/CTA entrances and atomic graphic/copy commits. The shared native Web Animations cohort pauses and cancels copy alongside vector parts; visible copy, CTA URL and panel label stay paired while assets load. No new dependencies. Tablet/mobile copy blocks reserve a stable height. All original wording and native CTA SVG remain intact.
- `../service-redesign-preview.css` and `src/routes/home-services-preview.tsx`: complete DEV service-section replacement, superseding the card trial. An editorial header, numbered vertical directory and open typographic/graphic stage replace the old horizontal tabs and rounded white card. All seven services share the same composition. The measured directory indicator uses a vertical bar on desktop and a horizontal bar within the two-column mobile menu. The stage counter is committed and animated with the selected service, not updated ahead of its visible copy. No Figma assets, service descriptions or destination URLs are changed.
- `../service-header-motion.js` and `../service-header-motion.css`: one-shot viewport entrance for the editorial header (kicker, two headline lines, four accent letters, then two intro lines). A committed service selection briefly responds through only the blue `움직임.` letters. Text stays visible without JavaScript; semantic heading text is preserved. Native Web Animations tracks pause outside the viewport/hidden document, continue from the displayed pose on rapid selections, and become static for reduced motion or unsupported browsers. No looping text effect, underline, dependency or Figma-file change.

Prototype Smart Animate routes are not replayed verbatim. The web controller owns current selection and transition interruption independently, so arbitrary tab order does not assume a fixed previous service.

Validation: `node scripts/test-service-motion-assets.mjs` and `node scripts/test-service-motion-controller.mjs`.

Header validation: `node scripts/test-service-header-motion.mjs` (14 cases), syntax check, production build, live entrance/selection checks and typography/overflow checks at 375px, 768px, 1024px and the default desktop viewport. Reduced-motion and interruption fallbacks are verified in the controller harness.

Whole-section redesign checks: 35 controller regressions (including catalog axes, keyboard rows and atomic counter), seven services at 1440px and 375px, responsive visual checks at 768px/1024px, CSS syntax and production build. Reduced motion, asset failure and visibility interruption are covered by the controller harness. This is a DEV test-page change; no live deployment or Figma-file update was performed.
