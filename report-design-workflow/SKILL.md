---
name: report-design-workflow
description: "运行报表原型全流程。仅当中文请求明确包含原型意图时使用，例如：原型、报表原型、页面原型、仪表盘原型、大屏原型、原型设计、生成原型、搭建原型、实现原型、还原原型、截图还原、图片还原、HTML源码还原、优化原型、修复原型、部署原型、启动原型、返回访问地址、本地预览、可运行URL、mock数据原型、筛选联动原型、组件联动原型、Vue报表原型。标准输入为需求文档、指标清单、截图/图片/HTML源码等；输出为原型设计说明或Vue+TypeScript+Element Plus+ECharts+AntV S2可运行项目。不要用于纯报表理论、纯视觉规则、纯数据规则、模板咨询、筛选规则咨询、生产前端联调或后端/API开发，除非用户明确说要做原型。"
---

# Report Design Workflow

## Core Positioning

Use this as the top-level orchestration skill only for business report prototype work whose request explicitly contains `原型` and asks to create, implement, repair, validate, deploy, or return a URL for a report/dashboard/page prototype.

Do not trigger this workflow for pure report design theory, visual rules, data rules, templates, filters, or implementation questions unless the user wording includes `原型`.

Standard prototype-design contract:

- Inputs: 需求文档, 指标清单, optional screenshot/image, optional HTML源码.
- Implementation output: Vue + TypeScript + Element Plus + ECharts + AntV S2 project source, mock/data files, filters, interactions, visual layout, component implementation, self-check report, and verified URL when required.
- HTML源码 and screenshots are references for information architecture, visible metrics, style, controls, and interaction intent; convert them into maintainable Vue/TS/data-source structure instead of copying them as static artifacts.

Default path:

`范围判断 -> 需求提取 -> 八类报表类型路由 -> 类型业务设计 -> 信息/组件映射 -> 数据模型 -> 筛选查询 -> 交互状态 -> 联动门禁 -> 视觉布局 -> 组件样式 -> 技术实现 -> 自检修复循环 -> 本地启动/部署URL -> 质量验收`

## Reference Map

Load only the references needed by the active workflow mode:

| Need | Read |
| --- | --- |
| Cross-workflow stage routing, readiness values, and handoff requirements | `../workflow-shared-references/report-delivery-pipeline-contract.md` |
| Headless browser screenshot, multimodal visual anomaly recognition, and visual finding feedback loop | `../workflow-shared-references/visual-multimodal-browser-check.md` |
| Workflow modes, screenshot/HTML handling, stages 0-10 template/implementation routing | `references/01-workflow-modes-and-stage-gates.md` |
| Self-check repair loop, local startup, free-port handling, deployment, URL return | `references/02-self-check-startup-deployment.md` |
| Skip rules, output formats, quality checklist, avoid list | `references/03-output-quality-and-avoid.md` |

## Active Skill Set

- Requirement front door: `$report-requirement-structure-extraction`.
- Report-type skills: `$status-overview-report-design`, `$analysis-diagnostic-report-design`, `$detail-query-report-design`, `$performance-evaluation-report-design`, `$review-recap-report-design`, `$anomaly-monitoring-report-design`, `$operational-execution-report-design`, and `$reconciliation-traceability-report-design`.
- Implementation bridge: `$report-info-component-mapping`.
- Presentation layer: `$report-visual-layout-design` and `$report-component-style-design`.

## Child Skill Call Checklist

| Child skill | Must call when | May skip when |
| --- | --- | --- |
| `$report-requirement-structure-extraction` | Requirements are rough, mixed, screenshot-based, or need downstream handoff. | The user provides a clean structured brief with metrics, users, scope, and acceptance rules. |
| One primary report-type skill | Every prototype/design task. | Never skip unless the user explicitly supplies a valid report type and asks only for a narrow implementation repair. |
| `$report-info-component-mapping` | Any output becomes specification, mock data, config, source code, or frontend handoff. | Pure high-level conceptual advice with no prototype/spec/code deliverable. |
| `$report-visual-layout-design` | Layout, page shell, template, navigation, grid, or URL/runnable output is in scope. | Pure data/model discussion. |
| `$report-component-style-design` | Components, charts, tables, cards, drawers, or visual QA are in scope. | Pure business requirement extraction. |

Domain words such as `产业`, `区域`, `国家`, `品牌`, or `渠道` are themes, dimensions, filters, objects, or drilldown levels. Do not route by domain keyword alone.

## Low-Freedom Stability Contract

Use this contract whenever the output may become a specification, configuration, code, mock dataset, or runnable prototype.

- Choose exactly one workflow mode, exactly one primary report type, exactly one `pageShellPath`, exactly one `pageStyleSource`, exactly one `brandMode`, and exactly one `visualMode`: `haierEnterprise`, `sampleRestore`, or `sciFiCockpit`. Secondary report types may only support named local blocks.
- Declare `brandMode`: `haierBranded`, `sampleNative`, or `neutral`. Default to `haierBranded` for Haier enterprise/custom report work; use `sampleNative` only when the provided sample is explicitly non-Haier and must remain source-native; use `neutral` only when the user clearly asks for a non-branded page.
- If `pageShellPath: custom`, choose exactly one `customDesignPath`: `htmlReplica` or `freeDesign`.
- If the shell is custom, choose exactly one `customLayoutPattern`: `symmetricBalance`, `threePart`, `masterDetail`, or `narrativeStack`.
- Use `report-info-component-mapping` with its `../report-info-component-mapping/references/06-binding-implementation-contract.md` and `../report-info-component-mapping/references/08-generation-stability.md` references before writing config, data, or code.
- Generate a binding matrix before visual layout. Do not start implementation from a chart list or page sketch.
- Use controlled IDs: component IDs in lowerCamelCase, dataset IDs with `dim_`, `fact_`, `agg_`, `ref_`, or `log_` prefixes, filter IDs in lowerCamelCase, action names in lowerCamelCase.
- Keep component count bounded unless the user explicitly requests a dense suite: first viewport 3-7 meaningful components, full page 6-14 components, main filters 3-6, KPI cards 3-8.
- Every must-have component must declare business question, data source, grain, required fields, formulas, filters, interaction state, update trigger, layout span, empty state, and validation cases.
- Every primary filter must declare affected components and field/query/permission mapping.
- Every clickable object must declare event name, payload fields, target action, and stale-selection behavior.
- Missing information must become an explicit assumption or placeholder contract, not an invented rule, fake API, unsupported chart, or hidden constant.
- If any item above is missing, stop before implementation and repair the specification.

## Implementation Preflight Gates

Before writing or changing prototype code, pass these gates:

- Brand mode gate: before `visualMode`, declare `brandMode`: `haierBranded`, `sampleNative`, or `neutral`. If `brandMode: haierBranded`, logo and global UI token gates override generic sample fidelity while preserving the sample's main hierarchy. If `brandMode: sampleNative` or `neutral`, do not inject a Haier logo only because the shell is custom; record "no Haier brand required by input".
- Brand asset gate: for `brandMode: haierBranded` pages, find and configure a logo asset in the header, unified title area, sidebar brand area, or template logo slot. Search the existing project assets, selected template `public` path, then `report-visual-layout-design/assets`. If missing, keep a visible logo placeholder and list the gap; do not silently omit the logo.
- Shell and style source gate: if the user has not specified page style and has not provided HTML/source/sample styling, set `pageShellPath: template` and use a bundled template by default. If the user specifies a design style or provides a sample/HTML source, follow that user-specified design direction unless it violates hard gates.
- Custom path gate: if `pageShellPath: custom`, set `customDesignPath: htmlReplica` for provided HTML/source/sample replication, or `customDesignPath: freeDesign` for custom design without source visual authority. Custom Haier pages default to `brandMode: haierBranded` and must configure a real bundled Haier logo before final delivery; explicit `sampleNative` or `neutral` pages must record why Haier branding is not required.
- Unique visual mode gate: declare one `visualMode`. Use `haierEnterprise` for ordinary business report prototypes, `sampleRestore` for screenshot/display-sample/HTML-source restoration unless the user asks for redesign, and `sciFiCockpit` only for explicit big-screen/cockpit presentation use.
- Sample fidelity gate: when `visualMode: sampleRestore`, preserve page shell, module order, container hierarchy, main control count, layer structure, and card proportions. Any added filters, summaries, details, matrices, drawers, or jumps must be labeled as enhancements and must not change the first viewport or main body layout unless requested.
- Sample module classification gate: in sample/source restoration, classify each visible sample module as `businessRequired`, `sampleStructure`, or `optionalEnhancement`. Do not promote a visible sample module to `must-have` only because it exists in the source.
- Sample conclusion placement gate: when `visualMode: sampleRestore`, added conclusions, insights, or status summaries must be embedded into an existing sample-equivalent region such as the header/control area, panorama header, section head, or summary card. Do not insert a standalone horizontal band unless the source has an equivalent band.
- Global UI token gate: when layout/style follows HTML, screenshot, or custom design, page colors, typography, spacing, radius, semantic states, and control styles must still use the project/global UI tokens unless the user explicitly requests exact color restoration.
- Chinese metric display gate: for rate/change fields, display percentage values with `%` in Chinese UI. Do not show `pt`, `p.p.`, or `percentage point` in the visible page for rate/completion/change labels unless the user explicitly requires that technical term.
- Trend indicator gate: for change-rate and variance-rate indicators, positive values use red text plus an upward SVG/icon, negative values use green text plus a downward SVG/icon, and zero values are neutral. Do not use color without the icon/sign pairing.
- Custom layout pattern gate: when a custom shell is used, choose one of `symmetricBalance` 对称式, `threePart` 三部式, `masterDetail` 主从式, or `narrativeStack` 分层叙事式; record why it fits the report and how it preserves the `8 * N` grid.
- Complex diagram spacing gate: for flow, Sankey, graph, tree, decomposition, lineage, DuPont, and process-chain visuals, calculate rail, node, label, gutter, and edge-bend spacing before implementation. Layer numbers, labels, nodes, and edges need at least 16px separation.
- Filter control gate: primary filter areas in Vue prototypes must use Element Plus controls such as `ElSelect`, `ElDatePicker`, `ElCascader`, `ElTreeSelect`, `ElInput`, `ElButton`, and `ElPopover` unless an existing project design system explicitly supersedes it. A native `<select>` is only acceptable as a baseline prototype when it is fully styled with `appearance: none`, custom arrow, focus ring, and hover/active/disabled/loading/error states; advanced visual acceptance requires Element Plus or custom popover select behavior.

## Minimal Workflow

1. Enforce the trigger gate: the request contains `原型` and is about prototype creation, implementation, repair, validation, deployment, or URL return.
2. Select the workflow mode: prototype-oriented design, prototype specification, implementation, or review/repair.
3. Extract requirements, user intent, design thinking, core questions, report type, metrics, dimensions, objects, data/filter/interaction needs, assumptions, and gaps.
4. Route to exactly one primary report-type skill and optional secondary skills only for local blocks.
5. Use `report-info-component-mapping` to produce answer atoms, component bundles, data model, filter/query model, interaction model, and binding matrix.
6. Apply the hard data/filter/component linkage gate before visual polish or implementation.
7. Apply the implementation preflight gates for shell path, style source, brand mode, visual mode, brand assets, sample fidelity, sample module classification, conclusion placement, global UI tokens, Chinese metric display, custom design path, custom layout pattern, complex diagrams, and filter controls.
8. Use `report-visual-layout-design` and `report-component-style-design` for page shell, layout, component fit, and visual QA.
9. For implementation, choose the appropriate bundled template or project-native structure, then implement with TypeScript + Vue 3 + Element Plus + ECharts + AntV S2 unless the existing project requires a different stack.
10. Run the self-check repair loop, local startup/free-port handling, deployment, and URL return rules from `references/02-self-check-startup-deployment.md` when runnable output is requested.
   For runnable frontend/prototype output, the visual part of the self-check must first capture headless browser screenshots, then use multimodal visual anomaly recognition, then feed `VIS-*` findings into the repair loop.
11. Use the output and quality rules from `references/03-output-quality-and-avoid.md` before final delivery.

## Required Outputs

For design/specification tasks, output:

1. Workflow mode, report theme, report type, users, and core questions.
2. Business design logic and information/component mapping.
3. Data, filter, interaction, visual layout, and component style strategy.
4. Binding matrix or planning-level equivalent.
5. Assumptions, missing information, and validation checklist.

For implementation tasks, output:

1. Source files changed or created.
2. Data/model/filter/interaction contracts implemented.
3. `pageShellPath`, `pageStyleSource`, `brandMode`, `visualMode`, custom design path and custom layout pattern if any, brand asset discovery result, logo slot/placeholder status, sample module classification, and any sample-restoration enhancement list.
4. Self-check report and repair-loop status.
5. Build/runtime verification evidence, including screenshot paths and multimodal visual findings for runnable output.
6. Verified local URL or public URL, or a precise external blocker.

When the prototype is expected to feed `technical-solution-workflow`, also output a prototype-to-technical-solution handoff bundle following `../workflow-shared-references/report-delivery-pipeline-contract.md`:

1. Component binding matrix.
2. Mock/data-source contract.
3. Filter contract.
4. Interaction payload contract.
5. Data/model assumptions and gaps.
6. Handoff readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

Before final delivery, verify:

- The primary report type is clear and not confused with a chart type.
- The core user question is answered in the first meaningful viewport.
- Components, datasets, filters, and interactions share one explicit binding contract.
- `pageShellPath` is declared as `template` or `custom`.
- `pageStyleSource` is declared; missing style/HTML/sample input uses a bundled template by default.
- Exactly one `brandMode` is declared and its logo/global-token implications are followed.
- Exactly one `visualMode` is declared and matches the selected restoration, enterprise, or cockpit strategy.
- If `pageShellPath: custom`, exactly one `customDesignPath` is declared; `brandMode: haierBranded` custom pages configure a real bundled Haier logo, while `sampleNative` or `neutral` custom pages record the non-Haier decision.
- Any custom shell declares one allowed `customLayoutPattern`.
- Haier/branded pages have a discovered/configured logo asset or an explicit placeholder with a recorded gap.
- Sample/source restoration preserves the sample's shell, module order, hierarchy, control count, and first viewport unless a redesign is requested.
- Sample/source restoration classifies modules as `businessRequired`, `sampleStructure`, or `optionalEnhancement`, and does not treat source visibility alone as `must-have`.
- Added conclusions in `sampleRestore` are embedded into an existing sample-equivalent region rather than a new standalone band.
- Custom or HTML-replica pages use global UI tokens for palette, typography, spacing, radius, semantic states, and controls unless exact restoration is explicitly required.
- Rate/change indicators use Chinese `%` display and positive-red-up / negative-green-down icon semantics.
- Mock data, if used, reconciles with KPI cards, charts, tables, drawers, exports, and filters.
- Filters have stable IDs, defaults, option sources, permission behavior, and affected-component mappings.
- Interactions preserve period, scope, object, metric, filters, permissions, and return path.
- Layout follows the 8*N rectangular grid and components do not overlap, clip, or truncate critical text.
- Flow, Sankey, graph, tree, decomposition, and lineage components pass the 16px safe-spacing gate.
- Primary filters do not rely on naked native `<select>` controls as their final visual surface.
- Runnable prototypes are built, started on an available port, verified, and handed off with an exact URL unless blocked.
- Runnable prototypes have headless browser screenshot evidence and multimodal visual review results before visual QA is marked pass.
- Deployment, when requested, returns a public URL or explains why only a local preview URL is available.
- If the next stage is technical solution, the prototype handoff bundle is present or the missing fields are marked `partial` or `blocked`.

## Avoid

- Do not use this workflow without the keyword `原型` in the user request.
- Do not start from visual layout before classifying the report purpose.
- Do not start implementation before declaring `pageShellPath`, `pageStyleSource`, `brandMode`, `visualMode`, custom design/layout paths when applicable, and passing brand asset discovery.
- Do not use every child skill for every task; use the smallest complete path.
- Do not invent new report categories when one of the eight categories fits.
- Do not finish implementation without a self-check report, repair-loop status, and verified URL or blocker.

## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. 范围与中文触发可靠性：确认用户请求确实匹配本 skill。通用报表设计类 skill 不要因为 `原型设计`、`技术方案`、`前端开发`、`后端开发`、`测试` 等流程词误触发；workflow 类 skill 只有在这些词表达真实阶段意图时才使用。
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
