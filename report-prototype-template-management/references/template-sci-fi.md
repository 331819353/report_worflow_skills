# Sci-Fi Dashboard Template

Use `assets/templates/frozen-title-sci-fi-cockpit-template` only for fixed 1920*1080 big-screen/cockpit presentations with frozen title/background assets.

## Shell

- Fixed 1920*1080 design canvas; this is the exception to ordinary scrollable report pages.
- Strong dark cockpit framing.
- Title area and page navigation suitable for large screens.
- Navigation/filter drawers instead of office-style dense controls.
- `nav[].layoutRows` and `nav[].widgets` per cockpit page.
- Exempt from the 220px scrollable-row rule; fit content inside 1920*1080.
- Use the sci-fi 1920 preset from `$report-visual-layout-design`; 3 visible rows are about `314px` tall, while 4 visible rows drop to about `233px`.

## Core Config

```ts
screen: {
  layout: { titleVisibleHeight: 116, contentGap: 10 },
  grid: { contentStartY: 118, contentEndY: 1080, cellPadding: 5 },
},
assets: {
  logoSrc: '/haier-logo.svg',
  titleBackgroundSrc: '/title-bg.png',
  backgroundSrc: '/cockpit-bg.jpg',
},
nav: [
  {
    id: 'cockpit',
    label: 'Cockpit',
    layoutRows: ['ABCDEFGH', 'iijjkkll'],
    widgets: {},
  },
],
filters: [],
```

## Shared Layout Contract

- This family follows `template-layout-design-system.md`; shared spacing, cockpit card radius, block-owned title/function placement, widget viewport, and hover/focus behavior are template-level design decisions.
- Default content range is `118 -> 1080`; visible title band is `116px`; block gap is `contentGap: 10`.
- Default block anatomy is `placeholder-cell` -> `placeholder-cell-inner` -> 32px title band -> body viewport -> `widget-renderer`.
- Card padding and card radius are both `8px`; `cellPadding: 5` leaves a small outer inset for cockpit frame effects.

## `nav[]` Content Gate

- Choose this template only when the cockpit can be organized into multiple substantial nav pages.
- Every retained `nav` item must represent a real cockpit view such as 总览, 预警, 产线/区域, 趋势, 指挥调度, or 事件详情.
- Each nav page must fit a complete 1920*1080 business view: clear page question, high-signal widgets, dataset scope, filter/drawer behavior when relevant, and non-placeholder data.
- Do not populate only the first cockpit page while leaving other nav pages empty, duplicated, or skeletal. If the content is only one large-screen view, do not choose or retain this nav template.

## Adjustments

- Keep all primary content visible within 1920*1080.
- Use fewer, stronger blocks with high signal.
- Avoid long text, dense editable forms, and office-style large tables.
- Use semantic color for status pressure, warning, and health.
- Avoid uncontrolled multi-color noise.
- Use white Haier logo on dark backgrounds.
- Configure title/background assets through `assets`.
- Keep business widgets inside block body viewports; do not paint across the cockpit frame.
- Avoid putting dense table/chart composites into one-row sci-fi blocks; promote to taller spans or split the cockpit page.

## Best Use Cases

- Exhibition or monitoring wall.
- Command center.
- Leadership cockpit presentation.
- Real-time or near-real-time status monitoring.
