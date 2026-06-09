---
name: report-info-component-mapping
description: "用于把报表业务问题映射为组件、数据集、筛选、交互和绑定矩阵。用户提到指标怎么放、问题怎么变组件、图表选择、卡片/表格/图形组合、数据集设计、mock字段、筛选查询、联动状态、钻取路径、组件绑定矩阵、页面信息架构落地时触发；不负责页面模板复制或组件视觉细节。"
---

# Report Info Component Mapping

## Core Positioning

Use this as the integrated design flow between business meaning and runnable report implementation.

This skill turns:

`business question -> answer atoms -> component bundle -> mock data model -> filter/query model -> interaction state -> implementation contract`

It does not define a new report type. It decides how information should become real report components, then makes the component, data, filter, and interaction design mutually verifiable.

## Core Principle

A business question does not equal one chart, and a chart is not complete until its data, filters, and interactions are defined.

Example: `人员流失情况` should not default to one pie chart. It may need KPI cards, trend chart, organization/job/rank distribution, reason contribution, employee detail table, and retention task block. The same design must also define employee-level mock rows, time/org/job filters, row drawer, stale-selection behavior, and KPI-to-detail reconciliation. Use a funnel only when there is a real ordered HR process stage.

Choose the smallest component bundle that answers the decision question. Do not add multiple charts for the same message.

## Low-Freedom Stability Contract

Use this contract for implementation-ready specs, mock data, widget config, or generated files.

- Select one generation mode from `references/08-generation-stability.md`: `concept-map`, `spec-contract`, or `prototype-config`.
- For `spec-contract` and `prototype-config`, always load `references/06-binding-implementation-contract.md` and `references/08-generation-stability.md`.
- Use only the controlled vocabularies in `08-generation-stability.md` for `answerAtom`, `semanticRole`, `priority`, `componentType`, `visualType`, `actionType`, `filterValueType`, and `dataPolicy`.
- Preserve generated IDs across revisions unless the business meaning changes.
- Keep quantities within the default bounds in `08-generation-stability.md` unless the user explicitly requests a dense suite.
- If a required field, dataset, filter, action payload, permission scope, or layout span is unknown, create a named assumption or placeholder contract and include a validation case.
- Do not output a final implementation mapping without the binding matrix columns defined in `06-binding-implementation-contract.md`.
- Do not use a chart or interaction whose fallback rule in `08-generation-stability.md` says it is unsupported by the available data.

## Integrated Workflow

For every report requirement or extracted information set:

1. Normalize the input: theme, audience, scenario, primary question, decision, time scope, organization scope, object, metrics, dimensions, baseline, process stage, rules, risks, tasks, evidence, source, permissions.
2. Decompose the question into answer atoms: status, target gap, trend, structure, ranking, process, cause, anomaly, detail, action, evidence, data trust, narrative.
3. Map answer atoms to parent content blocks, optional internal sub-blocks, and component bundles with priority: must-have, should-have, optional. For sample/source restoration, also classify visible source modules as `businessRequired`, `sampleStructure`, or `optionalEnhancement`.
4. Define and validate the mock/data model before filter binding: dimensions, fact tables, row grain, formulas, rollups, signals, edge cases, time coverage, default state, non-default filter states, empty/no-permission states, and resolver/API branch needs.
5. Define the filter/query model only after the data model can support it: main filter surface, advanced filters, option sources, defaults, cascades, permission scope, query params, and affected components. For bundled templates, the main filter surface is the template's native `filters[]` invocation and binding contract, not a new toolbar component.
6. Define interactions: tooltip/value reveal, cross-filtering, drilldown, drawer, modal, jump, export, refresh, fullscreen, batch action, and stale-state behavior.
7. Produce the binding matrix: parent block -> sub-block when present -> component -> dataset -> fields -> formulas -> filters -> interactions -> update triggers -> validation cases.
8. Route to primary and secondary report-type skills for business logic.
9. Apply local layout and visual constraints from `references/07-routing-layout-quality.md`, including grid fit, component density, exact-value access, and visual QA notes.
10. Validate that KPI totals, chart totals, table rows, drawers, exports, filters, and jumps share the same context.

## Reference Map

Read only the reference files needed for the current task. The files are numbered in workflow order.

| Need | Read |
| --- | --- |
| Decide answer atoms, content blocks, charts, tables, and component constraints | `references/01-question-component-flow.md` |
| Use typical component bundles such as personnel attrition, target completion, variance diagnosis, anomaly monitoring, reconciliation, execution follow-up | `references/02-business-bundle-patterns.md` |
| Design realistic mock data, dimensions, facts, formulas, time coverage, scenarios, rollups, and data consistency | `references/03-mock-data-modeling.md` |
| Design filters, option data, defaults, cascades, query behavior, permissions, and filter-to-component linkage | `references/04-filter-scope-query.md` |
| Design drilldowns, cross-filtering, hover/value reveal, drawers, modals, jumps, state preservation, and failure states | `references/05-interaction-state-flow.md` |
| Produce implementation-ready component contracts, unified binding matrix, template config rules, and prototype technology choices | `references/06-binding-implementation-contract.md` |
| Route to report-type skills, define layout/style constraints, output format, quality checklist, and avoid list | `references/07-routing-layout-quality.md` |
| Make generation repeatable with controlled vocabularies, naming rules, quantity bounds, fallback rules, and acceptance gates | `references/08-generation-stability.md` |

Loading guidance:

- For a quick conceptual mapping, use this `SKILL.md` plus `01-question-component-flow.md`.
- For a concrete business scenario, also read `02-business-bundle-patterns.md` if a pattern matches.
- For prototype/data tasks, read `03-mock-data-modeling.md`, `04-filter-scope-query.md`, and `06-binding-implementation-contract.md`.
- For interaction-heavy tasks, read `05-interaction-state-flow.md` and `06-binding-implementation-contract.md`.
- For final report design/spec output, always read `06-binding-implementation-contract.md`, `07-routing-layout-quality.md`, and `08-generation-stability.md`.
- For any task that will generate files, widget config, mock data, API-facing contracts, or reusable specifications, `08-generation-stability.md` is mandatory.
- For every report, dashboard, cockpit, BI, data-screen, business-analysis, detail-query, or topic-analysis mapping task, also use `$report-design-system-governance` `references/04-report-requirements-metrics-layout-guidelines.md` as the report baseline for requirement fields, metric dictionary, calculation口径, page hierarchy, and module priority.

## Hard Constraints

- A component is valid only when it answers a named business question.
- For sample/source restoration, do not promote a visible sample module to `must-have` only because it exists in the source. Mark it as `businessRequired` only when it directly answers the user's stated report question; otherwise use `sampleStructure` or `optionalEnhancement`.
- For status-overview reports, process/path/flow diagrams are secondary unless the core question explicitly asks for value chain, dependency, lineage, transmission, process conversion, or flow attribution.
- A component without a data source is decorative unless it is explicitly static narrative.
- First-screen cards and large panels cannot remain unbound "暂无数据" placeholders.
- Mock data must make KPI totals, chart totals, table rows, drawers, and exports reconcile under the same active filters.
- Multi-period filters, trends, MoM, YoY, quarter, or rolling-period views require complete matching time rows.
- Data completeness must be checked before filter binding. Do not finalize `filterMap`, `filterFields`, `requiredFilters`, API params, or resolver params until the underlying option data, row grain, required fields, default/non-default states, and resolver/API support are present or explicitly marked as gaps.
- A filter without affected components is dead UI unless it controls navigation or permissions.
- Data-bearing filter options must derive from dimension data, fact data, or a resolver unless they are stable enums.
- Filter IDs must map explicitly to dataset fields or query params.
- A primary/global filter expected to affect a component must map through `filterMap`, `filterFields`, `requiredFilters`, query params, or resolver params. Do not list that filter in `ignoredFilters`; `ignoredFilters` is only for components whose business scope is intentionally invariant under that filter and must be labeled in the scope notes.
- Mock/offline data must have the same grain as the affected primary filters. View, month, period, organization, industry, status, or scenario switches need distinct rows or a resolver that returns different component values; one default snapshot plus selected-state changes is not an implementation-ready contract.
- Filter/query execution must distinguish global/page-level filters from component-internal filters. Global/page-level and permission filters should execute through SQL `WHERE`, source/provider/repository queries, resolver params, Redis/precompute keys, or equivalent source-side scope. Component-internal filters may run locally on the already fetched component dataset. Do not design pages that fetch/build all candidate data and then apply global filters, pagination, ranking, grouping, or aggregation locally.
- Clickable visual elements must define emitted event, target action, parameters, permission behavior, and stale-state behavior.
- Drawers, exports, jumps, refresh, and fullscreen views must reuse the same filtered context as the source component.
- Funnel charts require ordered stages and a shared population or documented cohort logic.
- Waterfall charts require additive contribution logic.
- Maps are valid only when geography itself matters.
- Pie/donut charts are not the default for ranking, trend, or precise comparison.
- Vue report prototypes should use Element Plus for standard UI controls: filters, inputs, selects, cascaders, date pickers, buttons, tabs, tags, popovers, dialogs, drawers, pagination, and simple tables/lists when S2 analytical behavior is unnecessary.
- Dense analytical tables, pivot tables, cross tables, and wide metric matrices should use AntV S2.
- Every implementation mapping must declare data source, grain, required fields, formulas, filter mapping, interaction state, update triggers, and validation cases.
- Every layout must fit the local `8 * N` rectangular grid and legal span rules documented in `references/07-routing-layout-quality.md`.
- The top-level `8 * N` grid maps to parent blocks. A parent block may define internal sub-blocks, and components are placed in those sub-blocks when the components answer one shared business question. Sub-block composition always preserves `5px` parent inset and `5px` sibling gap. Do not flatten every component into its own top-level block when a composed parent block is clearer and passes fit checks.
- Generated IDs, dataset names, filter IDs, `visualType`, action types, and matrix columns must follow the controlled vocabulary and naming rules in `08-generation-stability.md`.
- When information is missing, use the documented fallback rule and mark the assumption; do not invent unsupported component types, visual types, filters, or actions.

## Minimal Output

When this skill is used, produce at least:

1. Report theme, primary question, business decision, and user scenario.
2. Answer atom decomposition.
3. Parent block, sub-block, and component bundle mapping with priority.
   For sample/source restoration, include `sampleModuleRole`: `businessRequired`, `sampleStructure`, or `optionalEnhancement`.
4. Mock/data model: datasets, grain, fields, formulas, signals, edge cases.
5. Filter/query model: filter surface, filters, option sources, defaults, cascades, permissions, query params.
6. Interaction model: clickable objects, interaction type, parameters, state preservation, failure states.
7. Unified parent-block/sub-block/data/filter/component/interaction binding matrix.
8. Report type routing.
9. Layout and style constraints.
10. Missing information, assumptions, and removed decorative components.

For implementation tasks, items 3-7 are mandatory.

## Quick Quality Gate

Before finalizing, verify:

- Every key business concern maps to at least one visible block or interaction.
- There is one primary answer area, not a flat wall of equal-weight charts.
- Every component has a distinct semantic role, dimension, grain, or workflow purpose.
- Parent blocks and sub-blocks are explicit when one `8 * N` block contains multiple components.
- Exact-value tasks have table/card support.
- Cause-analysis tasks have decomposition support.
- Process/conversion tasks prove ordered stage logic before using funnel.
- Action tasks have owner, deadline, status, operation entry, and closure evidence.
- Data-trust tasks have source, version, difference, and audit evidence.
- Mock data includes enough time, hierarchy, contrast, and edge cases to prove the story.
- Each primary filter has a real data-field, resolver-param, permission-scope, and affected-component binding.
- Each primary filter has an execution-stage contract proving it narrows data before full component/page construction, or a bounded exception is documented.
- Each primary filter has at least one validation case proving the affected component's data changes, not only the control selected state.
- Hovering or clicking dense chart marks reveals exact values or meaningful detail.
- Filtered KPI totals, chart totals, table rows, drawer records, exports, jumps, and refresh share context.
- Selected objects reset or show stale-selection state when filters remove them from scope.
- Dense components have overflow, zoom, drawer, or fullscreen strategy.
- Stable generation constraints pass: same input should produce the same primary report type, component IDs, dataset IDs, filter IDs, action names, and binding matrix structure unless the business question changes.
