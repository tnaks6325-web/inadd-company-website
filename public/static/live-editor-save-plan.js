export function hasLiveEditorChanges(dirty) {
  return Boolean(dirty?.home || dirty?.route || dirty?.global);
}

export function createLiveEditorSavePlan({ dirty, route, config, routePatches, globalPatches }) {
  const plan = [];
  if (dirty?.home && config) plan.push({ scope: 'home', path: '/editor/home', body: config });
  if (dirty?.route) plan.push({ scope: 'route', path: `/editor/live?route=${encodeURIComponent(route)}`, body: { patches: routePatches } });
  if (dirty?.global) plan.push({ scope: 'global', path: '/editor/live-global', body: { patches: globalPatches } });
  return plan;
}
