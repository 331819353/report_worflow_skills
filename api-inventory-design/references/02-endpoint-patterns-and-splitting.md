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

- Default to one data-bearing component or interaction surface per API row. A KPI group, chart, table, drawer, export, dynamic filter option list, and action are separate component/API candidates unless the merge rules below are all satisfied.
- Grains differ, such as monthly KPI vs order-level detail.
- Permissions differ, such as summary visible but detail restricted.
- Refresh cadence differs, such as daily KPI vs real-time alerts.
- Payload sizes differ sharply, such as cards vs paged table.
- Interaction lifecycle differs, such as initial load vs row drawer.
- Export is asynchronous or returns a file/task rather than JSON page data.
- Dynamic filter options need cascades or permission filtering.
- A shared response would force the frontend to split rows, aggregate, rank, compute formulas, filter large arrays, or derive component-specific series/tables from a broad payload.

## Merge APIs Only When

- Components load together and form one coherent component group, such as a KPI card group that shares one response model.
- They share the same filters, grain, permission, refresh cadence, and source dependency.
- Payload remains small and coherent.
- The response model remains understandable.
- The backend/API response is already component-ready, so the frontend does not need business aggregation, ranking, formula calculation, or cross-component data reshaping.

## Forbidden Shortcuts

- Do not make one API for an entire complex report unless the page is truly static and small.
- Do not create separate APIs for every tiny visual mark when one coherent model supports them.
- Do not merge several independent components into one API merely to reduce request count when doing so moves business calculation, filtering, grouping, ranking, or response splitting into the frontend.
- Do not hide dynamic filter option data inside unrelated business data.
- Do not treat export as a frontend-only action when server-side permission, volume, or async generation is needed.
