# Matrix Inputs Execution And Gates

## Inputs

Required:

- 测试矩阵 file: JSON, YAML, CSV, or Markdown table.

Recommended matrix fields:

- Case ID / 用例ID.
- Category / 类别.
- Priority / 优先级.
- Feature/Page/Module / 页面模块.
- Test Type / 自动化类型: `api`, `e2e`, `visual`, or comma-separated combinations.
- Related API / Endpoint / Method / Path.
- Preconditions / 前置条件.
- Steps / 操作步骤.
- Test Data / Params / Body / Headers.
    - Expected API Result / Expected Status.
    - Expected Frontend Result / Expected UI.
    - Control Semantics / 控制语义: `perspective-switch`, `global-filter`, `local-filter`, or `drilldown-param`.
    - Component Schema Impact / 组件结构影响: metric names, component set, table headers, dimensions,口径, domain vocabulary, or row-scope-only.
    - Navigation Metric Lineage / 导航指标血缘: `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, `periodBehavior`.
    - Cross-Perspective Assertion / 跨视角一致性断言: a field equality assertion such as `navigation.satisfaction == experienceProfiles.satisfaction`.
    - Height Budget DOM Check / 高度预算DOM检查: padding, explicit line-height rows, gaps, component height, and DOM overflow assertion.
    - Connection Pool Release Check / 连接池释放检查: repeated `ApiError`/timeout/exception after acquire must release/close pooled connections and not exhaust the pool.
    - Forbidden Text / 禁止文案: page text that must not appear, such as `pt`, `p.p.`, or `percentage point` for Chinese rate labels.
    - Change Selector / 变化值选择器: a locator whose text must change after the case steps exercise a non-default filter or perspective.
    - Evidence / 证据.
    - Tags / 标签.

Use `$delivery-artifact-template-management` when the user needs the automation test matrix schema, supported field aliases, step DSL, or input examples.


## Execution Script

The generator supports optional execution:

```bash
python3 automated-test-generation/scripts/generate_test_automation.py <matrix-file> --out <output-dir> --overwrite --run all
```

Use `--run install`, `--run api`, `--run e2e`, `--run visual`, or `--run all`. Running tests may install npm packages and start browser dependencies, so only use it when the local environment is ready.


## Quality Checklist

- Generated tests preserve traceability to the original case ID and title.
- API cases include method, path/url, expected status, headers/query/body when available.
- E2E cases use executable selectors/actions or are clearly annotated as manual/unsupported.
- Metric display cases use forbidden-text assertions when the expected result says Chinese rate/change labels must not use `pt`, `p.p.`, or `percentage point`.
- Control-semantics cases preserve whether the case is a perspective switch, global filter, local filter, or drilldown param.
- Filter-linkage automation includes or references a data-completeness case before UI value-change assertions; single-snapshot data cannot produce a passing filter-linkage automation result for affecting filters.
- Filter-linkage cases use a change selector or explicit `capture_text`/`expect_text_changed`/`expect_value_change_after_filter` steps when the expected behavior is visible data change.
- Perspective-switch automation includes label/schema assertions for non-default perspectives, not only value-change assertions.
- Cross-perspective consistency automation preserves navigation metric lineage and includes at least one field-level assertion against overview/journey/chart data.
- Fixed-height navigation/card/KPI automation preserves height-budget DOM checks and records `scrollHeight <= clientHeight` plus `scrollWidth <= clientWidth` expectations when supplied.
- Backend pool-resilience automation preserves connection-pool release checks and records repeated-failure non-exhaustion expectations when supplied.
- Visual cases define a route/page and produce deterministic Playwright snapshots.
- CI workflow uploads Playwright report, test results, screenshots, and traces.
- Credentials, tokens, and environment-specific URLs are read from env variables, not hard-coded into committed tests.
