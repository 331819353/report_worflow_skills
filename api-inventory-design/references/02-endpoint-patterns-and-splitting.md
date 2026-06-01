# Endpoint Patterns And Splitting

Use this reference to decide API boundaries.

## Common Endpoint Patterns

| Pattern | Use for | Typical trigger |
| --- | --- | --- |
| Summary KPI | first-screen totals, rates, target attainment | initial-load, filter-change |
| Trend | time-series lines, bars, area charts | initial-load, filter-change |
| Ranking | top/bottom lists, organization/product/customer ranking | initial-load, filter-change, drilldown |
| Structure | distribution, composition, mix analysis | initial-load, filter-change |
| Analytical table | paged detail, metric matrix, S2 table | initial-load, filter-change |
| Detail drawer | row click, chart drilldown, evidence detail | drilldown |
| Filter options | dynamic/cascaded/permission-limited options | initial-load, filter-change |
| Export | file download or async export task | export |
| Action | submit, assign, close, acknowledge, create task | action |

## Split APIs When

- Grains differ, such as monthly KPI vs order-level detail.
- Permissions differ, such as summary visible but detail restricted.
- Refresh cadence differs, such as daily KPI vs real-time alerts.
- Payload sizes differ sharply, such as cards vs paged table.
- Interaction lifecycle differs, such as initial load vs row drawer.
- Export is asynchronous or returns a file/task rather than JSON page data.
- Dynamic filter options need cascades or permission filtering.

## Merge APIs Only When

- Components load together.
- They share the same filters, grain, permission, refresh cadence, and source dependency.
- Payload remains small and coherent.
- The response model remains understandable.

## Forbidden Shortcuts

- Do not make one API for an entire complex report unless the page is truly static and small.
- Do not create separate APIs for every tiny visual mark when one coherent model supports them.
- Do not hide dynamic filter option data inside unrelated business data.
- Do not treat export as a frontend-only action when server-side permission, volume, or async generation is needed.
