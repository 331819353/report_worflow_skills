# Topbar Scroll Dashboard Templates

Use these assets for standalone, compact, single-theme reports:

- `assets/templates/topbar-dark-scroll-dashboard-template`: dark topbar, Haier-branded overview/diagnostic cockpit feel, one scrollable `8 * N` content grid.
- `assets/templates/topbar-light-scroll-dashboard-template`: light topbar, office-readable enterprise report feel, one scrollable `8 * N` content grid.

## Shell

- Top bar only; no sidebar.
- Center title from `screen.title`.
- Top-left Haier logo from `assets.logoSrc`.
- Right controls: refresh, filter, download.
- One page layout: `page.layoutRows`.
- One widget map: `page.widgets`.
- Page height may exceed the first viewport and must scroll vertically.
- This template family is not fixed to 1920*1080; 1920*1080 is only a planning viewport baseline.
- Default 1920 planning uses the full-width 1920 preset from `$report-visual-layout-design`; 1280 previews use the full-width 1280 preset.

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
```

## Adjustments

- Change `screen.title` for title.
- Change `assets.logoSrc` for logo.
- Keep original color logo on the light template and white/light logo on the dark template.
- Keep filter access through the right-side filter drawer.
- Do not add tabs, side menus, breadcrumbs, or page switching unless explicitly extending the shell.
- Edit `page.layoutRows`; widget keys in `page.widgets` must match block characters.
- Keep `screen.grid.rowHeight >= 220`; use about `316px` for 1920 pages and about `220px` for 1280 previews.
- Add rows when the report needs more content; do not shrink the page to one screen.
- Before placing charts, tables, or composite widgets, verify the chosen span with `$report-visual-layout-design`.

## Best Use Cases

- One compact status overview.
- One focused diagnostic page.
- One detail/query dashboard without chapters.
- Meeting preview or shareable standalone report.

Choose the light template for long reading, operational handoff, detail queries, and table-heavy but single-page reports. Choose the dark template for executive summaries, overview cockpits, anomaly/status pages, and stronger visual atmosphere without fixed big-screen constraints.
