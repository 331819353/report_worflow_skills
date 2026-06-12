# Design Improvement Checklist

Use this checklist after the route is selected.

## Page-Level Checks

- Page shell, navigation, topbar, filter area, toolbar, and content grid have clear hierarchy.
- First viewport shows the most important decision content without crowding or empty decorative space.
- Blocks use stable dimensions, legal grid spans, and responsive fallbacks.
- Text, controls, legends, table headers, and chart labels do not overlap or clip.
- Fixed-height summary/ranking/cards/KPI/composite blocks prove fit with height budget and DOM overflow assertions, not only screenshots.
- Template-owned controls and component-owned controls are separated. Refresh, export/download, copy/share, global filters, and topbar actions are not duplicated inside business components unless ownership is explicitly moved and the template counterpart is disabled.
- Loading, empty, error, no-permission, stale, and disabled states preserve layout geometry.

## Component-Level Checks

- Every KPI, chart, table, summary, drawer, dialog, and local control has a business purpose and data contract.
- Exact values, metric口径, source/freshness, unit/precision, baseline, and next action are visible or discoverable.
- Component-internal local filters do not silently change global scope, permission, backend aggregation, pagination, export, or other components.
- KPI/metric cards prove the rendered value+unit group is centered in the value anchor on both X and Y axes and is not overridden by template/global CSS.
- Component contracts such as `compositePanelContract` and `analysisInsightContract` map to actual DOM/CSS/renderer behavior instead of remaining config-only metadata.
- Shape-sensitive charts preserve aspect ratio and use the appropriate engine/library.
- ECharts chart checks inspect option/config details, not only chart existence. Combo charts with top-centered legends prove legend centering, `grid.top` reserve, and legend/axis-name spacing.
- Dense charts and tables have tooltip/detail/table/fullscreen/scroll strategies instead of shrinking until unreadable.

## Runtime Checks

- Build/startup succeeds or blockers are explicit.
- Browser screenshot evidence exists for relevant viewports and non-default states.
- DOM overflow checks cover fixed-height cards, navigation, KPI tiles, and compact controls.
- Runtime evidence covers KPI alignment, duplicate controls, fixed-height clipping, chart legend/option details, contract-to-DOM/CSS/renderer binding, and component crops when those surfaces exist.
- Console and network do not show blocking errors.
- Hover/focus/tabs/drawers/modals/filter changes do not cause clipping, stale data, or state mismatch.
