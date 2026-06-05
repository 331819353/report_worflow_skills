# Left Nav Analytics Dashboard Template

Use `assets/templates/left-nav-analytics-workbench-template` for multi-page enterprise analytics and dense daily workbenches.

## Shell

- 1920*1080 is a planning viewport baseline, not a fixed page size.
- Chinese collapsible left navigation.
- Right-side content display area.
- Sidebar-anchored filter popover.
- Multiple pages through `nav`.
- Each nav page has its own `layoutRows` and `widgets`.
- Each nav page uses a scrollable `8 * N` content grid.
- Right content area scrolls vertically when grid height exceeds the active viewport.
- Expanded 1920 pages use about `1664px` of content width; 1280 pages should prefer collapsed navigation and the left-nav 1280 preset from `$report-visual-layout-design`.

## Core Config

```ts
assets: {
  logoSrc: '/haier-logo.svg',
},
nav: [
  {
    id: 'overview',
    label: 'Overview',
    layoutRows: ['AAAABBBB', 'CCDDEEFF'],
    widgets: {},
  },
],
filters: [],
```

## Add A Page

1. Add a new item in `nav`.
2. Give it stable `id` and concise `label`.
3. Define `layoutRows` with 8 columns per row.
4. Mount widgets under that nav item's `widgets`.
5. Add page-specific filters through `scope` / `filterScope`.
6. Let components own page jump, popup, drilldown, and detail behavior. Use `actions/registry.ts` only when the shell or host product needs to observe a component event.

## Adjustments

- Use left nav for chapters, modules, related report pages, or daily workbench pages.
- Keep labels short and business-facing.
- Avoid a second top navigation layer unless there is a real sub-view need.
- Use the template filter popover for global and scoped filters.
- Use `filters[].source` for data-bearing filters and `filters[].options` for stable enums.
- Before committing a page `layoutRows`, verify block spans with `$report-visual-layout-design`, especially for tables and composite widgets.
- Add rows for long report content; do not force every page into the first 1920*1080 viewport.

## Best Use Cases

- Multi-chapter business analysis.
- Status + diagnosis + detail + task pages.
- Dense tables, wide metric matrices, repeated filtering.
- Enterprise analytics workbench.
