# Single Page Dashboard Template

Use `assets/templates/single-page-dashboard-template` for a standalone, compact, single-theme report.

## Shell

- Top bar only; no sidebar.
- Center title from `screen.title`.
- Top-left Haier logo from `assets.logoSrc`.
- Right controls: theme, refresh, filter, download.
- One page layout: `page.layoutRows`.
- One widget map: `page.widgets`.
- Page height may exceed the first viewport and must scroll vertically.
- Default 1920 planning uses the full-width 1920 preset in `block-size-constraints.md`; 1280 previews use the full-width 1280 preset.

## Core Config

```ts
screen: {
  title: 'Monthly Overview',
  defaultTheme: 'light',
  grid: { rowHeight: 316 },
},
assets: {
  logoSrc: '/haier-logo.svg',
},
page: {
  layoutRows: ['AAAABBBB', 'CCDDEEFF'],
  widgets: {},
},
filters: [],
modals: {},
```

## Adjustments

- Change `screen.title` for title.
- Change `assets.logoSrc` for logo.
- Keep original color logo on light theme and white logo on dark theme.
- Keep filter access through the right-side filter drawer.
- Do not add tabs, side menus, breadcrumbs, or page switching unless explicitly extending the shell.
- Edit `page.layoutRows`; widget keys in `page.widgets` must match block characters.
- Keep `screen.grid.rowHeight >= 220`; use about `316px` for 1920 pages and about `220px` for 1280 previews.
- Add rows when the report needs more content; do not shrink the page to one screen.
- Before placing charts, tables, or composite widgets, verify the chosen span in `block-size-constraints.md`.

## Best Use Cases

- One compact status overview.
- One focused diagnostic page.
- One detail/query dashboard without chapters.
- Meeting preview or shareable standalone report.
