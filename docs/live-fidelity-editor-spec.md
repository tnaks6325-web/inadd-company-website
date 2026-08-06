# Spec: Live fidelity website editor

## Objective

Turn the IN AD COMPANY administrator editor into a live fidelity editor: the canvas must render the same route, shared header, styles, scripts, media, and interaction behaviour as the visitor site. An editor can navigate and use the page normally, including the Marketing hover dropdown, then switch to select mode to choose an editable region without leaving the actual rendered page.

The editor must cover every public route exposed by the primary navigation and its Marketing submenu. It must not maintain a second, approximate page renderer as the source of truth.

### Success criteria

- The canvas loads the production route renderer in a same-origin iframe; it does not reproduce page markup in the admin shell.
- Hovering Marketing in interaction mode opens the same dropdown as the visitor site, and its submenu links navigate inside the canvas.
- The canvas route and the editor page picker remain synchronized for direct clicks, browser-like navigation inside the frame, and editor navigation.
- Select mode identifies a registered region, highlights it without preventing normal scroll, and opens the matching inspector. Interaction mode does not add editor outlines or block controls.
- First-page text changes retain existing authenticated save, undo/redo, and preview behaviour. New route support is additive and no unregistered visitor content becomes editable by accident.
- A preview deployment is verified before any production deployment.

## Assumptions

- The Cloudflare Pages source in this repository remains the authoritative renderer and the current admin authentication mechanism remains unchanged in this first phase.
- The advanced external demo remains a design prototype; it is not the source of visitor-facing rendering.
- All framed routes are same-origin. Cross-origin embedding, external admin data, and anonymous edit access are explicitly out of scope.
- “Actual operation” means visitor behaviour is preserved in interaction mode. Editing uses an explicit Select mode rather than intercepting every visitor click.

## Tech stack

- Hono JSX routes in `src/`, Cloudflare Pages runtime, and Cloudflare KV-backed content settings.
- Plain browser JavaScript for the existing editor and iframe bridge.
- Vite build and Node test runner. No dependency is added for the first slices.

## Commands

```powershell
npm test
npm run build
npm run dev
```

## Project structure

```text
src/renderer.tsx            Shared visitor header, footer, and scripts
src/routes/*.tsx            Actual public route markup
src/admin/editor-page.ts    Admin editor shell
src/admin/api.ts            Authenticated editor persistence endpoints
public/static/main.js       Shared visitor interactions including dropdown
public/static/home-editor.js Existing home editor bridge
public/static/admin-editor.js Editor shell behaviour
public/static/*-editor.js   Route-specific live bridge modules
tests/*.test.mjs            Node regression and contract tests
docs/                       Product and implementation specifications
```

## Live editor contract

The editor and canvas use same-origin, explicit `postMessage` events so that the page renderer remains independent from the editor shell.

```ts
type LiveEditorMessage =
  | { channel: 'inad-live-editor'; version: 1; type: 'ready'; route: string; regions: LiveRegion[] }
  | { channel: 'inad-live-editor'; version: 1; type: 'route-change'; route: string }
  | { channel: 'inad-live-editor'; version: 1; type: 'select'; regionId: string }
  | { channel: 'inad-live-editor'; version: 1; type: 'set-mode'; mode: 'interact' | 'select' }
  | { channel: 'inad-live-editor'; version: 1; type: 'apply'; patch: LivePatch };
```

Both sides must accept messages only from `window.location.origin`, require the exact channel and version, and use an allowlisted region manifest. The iframe never receives the administrator token; saving remains in the parent editor through the existing authenticated API.

## Code style

Use small DOM helpers and explicit names. Keep route scripts self-contained, and do not replace visitor handlers with editor-specific clones.

```js
function isLiveEditorMessage(event) {
  return event.origin === window.location.origin
    && event.data?.channel === 'inad-live-editor'
    && event.data?.version === 1;
}
```

## Testing strategy

- Small Node tests verify the route manifest, message schema allowlist, and mode defaults.
- Existing home editor tests continue to cover save sanitation and first-page behaviour.
- Build verifies all Hono routes and static script references.
- Manual preview verification covers hover dropdown, keyboard and mobile menu behaviour, page navigation, selection, undo/redo, and saved reload.

## Boundaries

- Always: preserve visitor scripts and route markup; validate bridge messages; keep selection disabled until Select mode; run focused tests and the production build per slice.
- Ask first: change the login or authorization scheme; change KV schemas; add a dependency; deploy this branch to the production domain.
- Never: put administrator tokens into iframe messages; make an anonymous public editing endpoint; modify production site content during bridge development; commit secrets.

## Task plan

### Phase 1: Prove the real canvas contract

- [ ] Task 1: Add a route manifest and a live canvas bootstrap that reports the rendered route and supports safe `interact` / `select` modes.
  - Acceptance: the existing home route runs unchanged in the frame; editor mode events are origin and schema checked.
  - Verify: new contract test and `npm run build`.
  - Files: `public/static/live-editor-bridge.js`, `src/renderer.tsx`, `tests/live-editor-bridge.test.mjs`.

- [ ] Task 2: Upgrade the admin frame toolbar with route picker, interaction/select switch, and route synchronization.
  - Acceptance: Marketing hover dropdown works in interaction mode and a submenu link changes the canvas route while the picker updates.
  - Verify: focused tests, build, manual preview.
  - Files: `src/admin/editor-page.ts`, `public/static/admin-editor.js`, `public/static/admin-editor.css`.

### Checkpoint: real canvas

- [ ] Actual route header and dropdown function inside the editor canvas.
- [ ] No editor selections appear in interaction mode.
- [ ] Home's existing editing and saving still work.

### Phase 2: Make real content editable page by page

- [ ] Task 3: Migrate the existing home field registry to the shared bridge with selection overlays.
- [ ] Task 4: Add inspectable, allowlisted regions for About, Works, Contact, and Marketing overview.
- [ ] Task 5: Add route-specific region adapters for each Marketing submenu route.

### Checkpoint: content and safety

- [ ] Every primary and submenu route opens actual markup and declares its editable regions.
- [ ] Unregistered elements remain view-only.
- [ ] Saving changes is authenticated and scoped to the active route.

### Phase 3: Editorial quality and release readiness

- [ ] Task 6: Add per-route drafts, undo/redo boundaries, reload recovery, and a visitor preview toggle.
- [ ] Task 7: Add keyboard selection, reduced-motion behaviour, and visual regression checklist.
- [ ] Task 8: Deploy to a private preview and compare live interactions before requesting production release.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| An iframe steals normal page interactions | High | Default to interaction mode; enable selection only through explicit mode switch. |
| A crafted message applies an unauthorized edit | High | Exact origin, schema/version validation, parent-only authenticated persistence, and region allowlist. |
| Route-by-route adapters drift from the page | Medium | Each adapter attaches to the page's own actual DOM and has a route contract test. |
| Editing one page changes another page's shared header | Medium | Model global header regions separately and require confirmation before global save. |
| Production deployment disrupts the live site | High | Use a preview branch and private verification before production release. |

## Open questions

- No blocking question for the first contract slice. The visible mode names and detailed inspector design will follow the established IN AD editor style, then be refined from a working preview.
