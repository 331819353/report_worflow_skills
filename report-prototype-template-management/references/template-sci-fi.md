# Sci-Fi Dashboard Template

Use `assets/templates/frozen-title-sci-fi-cockpit-template` only for fixed 1920*1080 big-screen/cockpit presentations with frozen title/background assets.

## Shell

- Fixed 1920*1080 design canvas; this is the exception to ordinary scrollable report pages.
- Strong dark cockpit framing.
- Title area and page navigation suitable for large screens.
- Navigation/filter drawers instead of office-style dense controls.
- `nav[].layoutRows` and `nav[].widgets` per cockpit page.
- Exempt from the 220px scrollable-row rule; fit content inside 1920*1080.
- Use the sci-fi 1920 preset in `block-size-constraints.md`; 3 visible rows are about `314px` tall, while 4 visible rows drop to about `233px`.

## Core Config

```ts
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
