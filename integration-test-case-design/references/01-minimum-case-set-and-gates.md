# Minimum Case Set And Gates

## Minimum Case Set

- Runtime URL smoke and environment alignment.
- First access, valid token, invalid token, and no-permission SSO behavior.
- One API/display consistency case per major KPI/chart/table/drawer/export.
- Data completeness cases before filter-linkage cases: option rows, business rows/provider responses, required fields, default/non-default/empty/permission states, and resolver/API branches are available or blocked.
- Default filter, single filter, combined filters, reset, cascade, no-result, and permission-limited filter cases. At least one non-default filter state must prove changed values, row sets, series, totals, or empty/no-permission state for each affected component group.
- Non-default perspective cases for every business domain/theme/management-object/subject-area view. Verify metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, risk focus, and口径 labels, not only numeric changes.
- Cross-perspective consistency cases for every domain and statistical口径: navigation percentages, overview KPIs, journey cards, and chart summaries come from the same data chain. Include at least one concrete field assertion such as navigation satisfaction equals current `experienceProfiles.satisfaction`.
- Metric display cases for rate/change/completion/YoY/MoM/variance-rate fields, including absence of `pt`, `p.p.`, and `percentage point` in Chinese report UI unless explicitly accepted.
- Layout/data visibility cases that check KPI/summary/card internal titles and values wrap or resize without clipping, nowrap ellipsis loss, or hidden critical text.
- Fixed-height navigation/card/KPI budget cases at `1920x1080` and `1280x768`: declared padding, explicit line-height, gaps, row count, badge/status/footer heights, `requiredContentHeight <= componentHeight`, and DOM assertions where `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`.
- Common enterprise app UI baseline cases for form/list/detail/table/navigation/dialog/feedback/empty/error/cross-platform surfaces when those pages exist.
- Report UI baseline cases for layout hierarchy, chart/table formatting, filters, states, permissions, export, performance, and acceptance when report pages exist.
- Backend resilience cases when database/upstream pools exist: simulate repeated `ApiError`/timeout/exception after connection acquire, verify later requests still acquire connections, and record pool max such as `STARROCKS_POOL_MAX`.
- Drilldown/drawer/modal/page-jump parameter preservation.
- Loading, empty, error, timeout, null, and partial data states.
- Export/download inherits active filters and permissions.


## Quality Checklist

- Every important frontend feature maps to at least one test case.
- Every documented API used by the frontend has a contract or display-consistency case.
- Filters and interactions include both happy path and edge cases.
- Perspective switches are tested separately from ordinary filters when they change metrics, components, table schema,口径, or domain vocabulary.
- Filter-linkage cases are preceded by data-completeness preconditions; missing non-default data is a blocked data case, not a passed filter case.
- Blocked cases state the missing account, URL, data, permission, or documentation item.
