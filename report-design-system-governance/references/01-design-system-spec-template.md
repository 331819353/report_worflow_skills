# Report Design System Spec Template

Use this template to produce a complete, non-empty report design system specification. Each table should contain actual values, inherited source references, or explicit gaps. Do not leave a section as an empty placeholder.

## Document Header

| Field | Required content |
| --- | --- |
| Design system name | Product/project family name |
| Version | Semantic or dated version, for example `v1.0` or `2026-06-09` |
| Mode | `create-standard`, `audit-standard`, `merge-standards`, `extend-haier-standard`, or `migration-plan` |
| Source hierarchy | Company standard -> template standard -> report extension -> project exception |
| Target surfaces | Reports, dashboards, cockpits, detail pages, lists, workbench pages, mobile/tablet if relevant |
| Implementation target | Existing frontend, bundled report template, design-only spec, or migration plan |
| Owners | Design owner, frontend owner, data/report owner, QA owner |

## Principles

| Principle | Rule | Acceptance check |
| --- | --- | --- |
| Enterprise density | Prioritize scanning, comparison, and repeated work over marketing-style decoration | First viewport answers a business question without decorative-only blocks |
| Anti-AI realism | Product context, real content, states, accessibility, and engineering constraints outrank generic polish | `AI-*` findings are absent, remediated, or documented as scoped exceptions |
| Report decision usefulness | Report pages must support judgment, diagnosis, trust, and action instead of only looking like dashboards | `RPT-*` findings are absent, remediated, or documented as scoped exceptions |
| Semantic tokens | Use role-based tokens instead of one-off raw styles | Every raw color/spacing/shadow maps to a token or exception |
| Stable geometry | Hover/focus/loading/error states preserve layout size | No cards, buttons, charts, or tables shift on interaction |
| Measurable component placement | Implementation-ready components define internal coordinates and alignment before visual polish | Each component family has slot x/y rules, main visual center, size tiers, and state geometry |
| Parent/sub-block composition | `8 * N` defines parent blocks; parent blocks may contain internal sub-blocks | Parent block and sub-block layout are both documented and pass fit checks |
| Exact value access | Dense visuals must expose exact values | Tooltip, table, drawer, export, or label path exists |
| Reusable governance | Every rule has source, owner, status, and exception policy | Governance matrix contains no ownerless stable rule |

## Token Specification

Minimum rows: color, typography, spacing, grid, radius, border, shadow, state, density, icon, z-index, breakpoint.

| Token type | Token name | Value/source | Usage | Accessibility/contrast note | Status |
| --- | --- | --- | --- | --- | --- |
| Color | `surface.page` | Inherited or value | Page background | Contrast against body text | stable/variant/gap |
| Color | `surface.card` | Inherited or value | KPI/chart/table containers | Contrast against borders/text | stable/variant/gap |
| Color | `text.primary` | Inherited or value | Page/block titles and primary values | Must pass text contrast | stable/variant/gap |
| Color | `text.secondary` | Inherited or value | Descriptions, helper text, secondary labels | Must remain readable in dense cards | stable/variant/gap |
| Color | `state.success/warning/error/info` | Inherited or value | Status tags, alerts, trend indicators | Semantic color cannot be decorative | stable/variant/gap |
| Typography | `font.title/page/block/body/caption` | Size, weight, line-height | Page titles, block titles, body text, captions | No viewport-width font scaling | stable/variant/gap |
| Spacing | `space.page/block/card/control` | Value scale | Page padding, block gap, card padding, controls | Must support 1280px and baseline viewport | stable/variant/gap |
| Grid | `grid.report` | Column/row/gap rule | Top-level parent report blocks | Legal rectangular spans only | stable/variant/gap |
| Grid | `grid.subBlock` | Local grid/flex rule | Internal sub-blocks inside parent blocks | Explicit tracks, 5px parent inset, 5px sibling gap, min size, overflow | stable/variant/gap |
| Spacing | `space.subBlock.inset/gap` | `5px / 5px` unless approved exception | Parent-to-sub-block and sibling sub-block spacing | Must be subtracted during fit checks | stable/variant/gap |
| Radius | `radius.card/control/tag` | Value scale | Cards, buttons, chips, panels | Consistent with component library | stable/variant/gap |
| Shadow | `shadow.popout/focus/hover` | Value/source | Popovers, drawers, hover/focus | Must not be clipped | stable/variant/gap |
| Breakpoint | `bp.desktop/tablet/mobile` | Widths | Responsive layout and navigation | Main content remains complete | stable/variant/gap |

## Template Layout Token Rule

Use this when the design system is implemented through bundled or existing report templates.

| Template family | Design frame | Shell frame | Content range | Grid gap/row height | Cell padding | Card padding/radius | Title band | Widget viewport rule |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Topbar scroll dashboard | Source/value | Source/value | Source/value | Source/value | Source/value | Source/value | Source/value | Chart/table/KPI body viewport must be measured after title/actions |
| Left-nav workbench | Source/value | Source/value | Source/value | Source/value | Source/value | Source/value | Source/value | Nav pages share shell tokens but can vary content density |
| Fixed cockpit | Source/value | Source/value | Source/value | Source/value | Source/value | Source/value | Source/value | Fixed canvas needs aspect-preserving fit and overflow strategy |

Block title band default:

| Zone | Alignment | Content | Control choice | Fit rule |
| --- | --- | --- | --- | --- |
| Left title | Left | Block title/business question | Plain text, no duplicate component title | Keeps priority; one-line with tooltip or approved wrapping |
| Right function area | Right | Component-local filter, filter-panel trigger, detail link, more action | One filter with `2-4` short values and fit proof -> capsule; one filter with `>4` values, long labels, or failed fit -> dropdown; multiple groups -> panel; detail -> lightweight link | One line; collapse secondary actions before crowding title |

## Component Rule

Minimum component families: shell/header, filter/control, KPI card, chart block, table block, detail drawer/modal, action/button/tag, feedback state.

| Component | Anatomy | Size/density | States | Data behavior | Interaction | Responsive rule | Do / Avoid |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Page shell/header | Logo/title/status/nav/actions | Reserved title and action areas | loading/stale/auth | Shows report scope and refresh state | Breadcrumb, return, refresh, export | Collapse or simplify navigation on small screens | Do not duplicate title areas |
| Filter/control surface | Trigger/panel/fields/chips/reset/apply | Stable height or native template surface | default/changed/disabled/loading/error | Options have source and affected components | Apply/reset/cascade/query | Template-native filters when template owns them | Avoid standalone duplicate filter bars |
| Component-internal local filter | Title/header capsule/dropdown/panel trigger | `24-32px` high; title-right or under-title row | default/changed/disabled/loading/error | Affects only current component/local group and already bounded component data | Immediate local update; no page/global scope change | Capsule for `2-4` short values, dropdown for `>4` or failed fit, panel only for multiple groups | Avoid form-like controls, plot overlays, and hiding core value/plot/table |
| KPI card | Title/value/unit/trend/helper/action | Long labels wrap or disclose | loading/empty/error/no-permission | Value grain, unit, precision, trend basis explicit | Tooltip/drilldown/detail | Stack or scroll small groups | Avoid hiding critical values by ellipsis only |
| Chart block | Block-owned title/function area, legend, chart, tooltip | Body viewport measured after block-owned title/legend | loading/empty/error/no-permission | Dataset, grain, sort, baseline explicit | Tooltip/drilldown/fullscreen/export | Label sampling or zoom for density | Avoid chart types that hide exact-value tasks |
| Table block | Toolbar/table/pagination/actions | Horizontal/vertical overflow policy | loading/empty/error/no-permission | Columns, units, sort, pagination explicit | Row action/drawer/export | Frozen action column for wide tables | Avoid action access hidden off-screen |
| Detail drawer/modal | Header/body/footer/actions | Max height and scroll area | loading/error/no-permission | Reuses source filter context | Close/save/export/jump | Fullscreen or route for complex flows | Avoid replacing long workflows with cramped modal |
| Feedback states | Illustration/message/action | Preserve component geometry | loading/empty/error/no-permission/stale | Explains data or permission condition | Retry/contact/reset/create | Component-level and page-level variants | Avoid graphic-only feedback |

## Component Internal Placement Rule

Use this table when a component is implementation-ready or reusable across reports. A component family is incomplete if it only defines colors, font sizes, and radius while leaving element placement to guesswork.

| Component | Coordinate variables | Main visual center | Slot ownership and x/y algorithm | Size tiers | Fallback order | State geometry |
| --- | --- | --- | --- | --- | --- | --- |
| KPI card | `W`, `H`, `P`, `CW`, `CH`, `centerX`; source from `$report-component-style-design` `12-internal-placement-algorithms.md` | `value + unit` group centered in the card body or left primary zone | Title top-left, definition top-right, comparison/target centered, sparkline centered or right-zone, metadata bottom | small/standard/enhanced/wide | description -> summary -> sparkline -> second comparison -> target progress | loading/empty/error/no-permission/stale preserve slot geometry |
| Chart block | Body viewport after block-owned title/actions/legend; plot rect, legend band, axis bands | Plot area, not the full card | Legend/title/action owned by the block/container; axes and labels reserve bands before marks; target/actual bars also reserve metric strip, target-label right gap, and x-axis label band | compact/standard/dense/fullscreen | hide labels -> sample labels -> zoom/fullscreen -> table fallback | empty/loading/error mask covers chart body without moving title/actions |
| Table block | Table viewport after toolbar/pagination; column min widths | Row/column scan path | Toolbar top, header sticky, body scroll, pagination/footer reserved | compact/standard/wide/S2 | wrap/tooltip -> horizontal scroll -> frozen action -> drawer/export | state rows preserve header and action access |
| Filter/control | Trigger/panel/chip area and control widths | Active filter recognition and apply/reset path | Labels, fields, chips, reset/apply, overflow counter have reserved slots; component-local filters use title-right `filterX = W - P - filterW`, `filterW <= min(CW * 0.45, 280px)` or dropdown | inline/panel/drawer/mobile | chip counter -> panel -> drawer; local filter collapse order is secondary group -> dropdown -> selected-value pill | disabled/loading/error preserve control height |
| Summary text | Text viewport after title/action; line boxes | Primary conclusion line | Conclusion, evidence, action/follow-up slots | compact/standard/expanded | clamp -> expand -> drawer | empty/error states keep summary block geometry |

## Parent Block And Sub-Block Rule

Use this when a single report block carries multiple components that answer one shared business question.

| Parent block | Parent span | Sub-blocks | Local layout | Component owner | State/overflow rule | Split condition |
| --- | --- | --- | --- | --- | --- | --- |
| Example business block | `8*2` or source value | `summarySubBlock`, `chartSubBlock`, `rankingSubBlock` | Named CSS grid/flex areas with `5px` parent inset and `5px` sibling gap | One component per sub-block unless micro-group | State may be parent-level or sub-block-level; for no-data masks, all children empty -> parent mask, partial empty -> affected child mask including child title/control + body; one internal scroll area max | Split if sub-blocks need independent titles/actions or fail min size |

## Metric Display Rule

Minimum rows: amount/count, percentage/rate, change/variance, rank/score, time/duration.

| Metric family | Raw value scale | Display scale/unit | Precision | Label wording | Trend/icon semantics | Forbidden terms | Exception owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Amount/count | Source unit | Unit suffix or thousands separator | Business-approved decimals | Keep unit visible near value | Trend optional | Hidden unit | Owner |
| Percentage/rate | Ratio or percent source declared | `%` in Chinese report UI by default | Declared rounding | Use rate/completion/change wording consistently | Direction must match business semantics | `pt`, `p.p.`, `percentage point` unless approved | Owner |
| Change/variance | Difference or ratio source declared | `%` for rate change, source unit for absolute diff | Declared rounding | Explain baseline | Positive-red-up and negative-green-down unless domain says otherwise | Ambiguous "increase" without baseline | Owner |
| Rank/score | Score model declared | Score/rank label | Declared decimals | Show ranking scope | Up/down only if comparable | Rank without population | Owner |
| Time/duration | Timestamp or duration source | Date/time/days/hours | Declared granularity | Show timezone/period if relevant | SLA status optional | Time without period | Owner |

## Internal Fit Rule

| Component | Long text surface | Wrap/line clamp | Min size | Tooltip/expand/scroll rule | Critical text that must remain visible | Regression viewport |
| --- | --- | --- | --- | --- | --- | --- |
| KPI card | Title, value, unit, helper | 1-2 line title, value never hidden | Declared by template/component | Tooltip/drawer for full label and value basis | Metric value, unit, status | 1280px and design baseline |
| Chart | Axis labels, legends, tooltip | Label budget with sampling/rotation rules | Aspect-compatible viewport | Tooltip/fullscreen/table fallback | Axis meaning, unit, key outliers | 1280px and design baseline |
| Table | Headers, cells, action names | Header/cell wrap or tooltip | Column min widths | Horizontal scroll, frozen action, drawer | Row key, values, actions | 1280px and design baseline |
| Filter | Field label, selected chips | Chip wrap or overflow counter | Stable filter surface | Popover/panel for overflow | Active filters and reset path | 1280px and design baseline |
| Summary text | Conclusion, reason, action | Multiline with max height or expand | Stable card height | Expand/drawer for long narrative | Main conclusion and action | 1280px and design baseline |

## Interaction Feedback Rule

| Surface | Hover/focus style | Motion allowed | Glow/focus token | Overflow/clipping guard | Reduced-motion behavior | Regression check |
| --- | --- | --- | --- | --- | --- | --- |
| Card/block | Border or inset glow | No translate/scale unless proven | `focus.block` | Effect stays inside bounds | Disable animation, keep color/border | Hover/focus at all block edges |
| Button/control | Border/background/token state | No layout shift | `focus.control` | Stable height/width | Instant state swap | Hover/focus/disabled/loading |
| Chart mark | Tooltip highlight | No geometry warp | `focus.dataMark` | Tooltip does not cover key label when avoidable | No animated travel required | Dense data hover |
| Table row | Row background/focus ring | No row height shift | `focus.row` | Sticky/frozen columns remain aligned | Static highlight | Hover/focus with horizontal scroll |
| Popout/drawer/modal | Shadow and mask | Entrance motion allowed if bounded | `shadow.popout` | z-index and mask defined | Reduced or no transition | Open/close and viewport edges |

## Visualization Rule

| Chart/table type | Use when | Avoid when | Axis/legend/tooltip | Color semantics | Data label rule | Drilldown/export | Regression check |
| --- | --- | --- | --- | --- | --- | --- | --- |
| KPI cards | Current state, target gap, alerts | Detailed row comparison is primary | Tooltip explains basis | Semantic trend/status | Value/unit always visible | Drill to detail when actionable | Long labels and extreme values |
| Target/actual column | Target attainment by category | Too many/long categories, exact audit task without table | Y-axis includes actual and target; target line/tick/bar encoding declared | Actual, target, completion, gap, and change semantics explicit | Labels budgeted; tooltip contains full actual/target/attainment/gap | Drill to category detail/table/export | Target label, value label, x-axis, and legend collision |
| Line/area | Time trend, ordered sequence, target/reference monitoring | Few unordered categories or pure size comparison | Chronological/order x-axis, consistent period granularity, y-axis range declared | Series color stable; target/average/warning lines semantic | Labels sampled; key points only | Point/detail drilldown, brush/dataZoom for dense periods | Dense periods, missing values, non-zero y-baseline, multi-series overload |
| Candlestick/K-line | OHLC price/quote volatility over ordered time | Single-value trend, non-OHLC data, precise row audit without table, or audiences unfamiliar with K-line | Ordered time, `open/high/low/close`, unit, price axis, time axis, crosshair tooltip | Market color convention explicit; MA/volume secondary | High/low/latest/selected only; no per-candle OHLC labels | Drill/detail/table/export for row evidence; dataZoom for dense history | Invalid OHLC, wrong red/green convention, overloaded indicators, tiny main plot, missing volume/OHLC states |
| Boxplot | Distribution/stability, median/IQR spread, and outlier comparison across categories | Single aggregate ranking, tiny samples, trend, composition, or exact row audit without table | Sample count, Q1/median/Q3/IQR, declared whisker/outlier rule, axis/unit, five-number tooltip | Median, outlier, target/benchmark, and group semantics explicit | Key labels only; no full-stat labels | Detail/table/export for raw samples, outliers, and category evidence | Tiny samples, label clutter, outlier overplot, unspecified outlier rule |
| Heatmap | Two-dimensional density, time pattern, cohort/utilization grid, or correlation structure | One-dimensional ranking, few exact values, tiny variance, unclear color semantics, or too many cells without aggregation | Row/column/value/aggregation contract, unit, visualMap/color scale, missing-vs-zero rule, exact-value tooltip | Sequential/stepped/diverging scale chosen by metric meaning; zero and missing distinct | Cell values only when large enough; sampled row/column labels | Detail/table/export for exact cells and high-cardinality evidence | Missing shown as zero, unclear legend, label clutter, all-cell text, overloaded cells |
| Path chart | Ordered movement, user journey, conversion path, workflow/approval flow, drop-off, or abnormal path | Ranking, composition, unordered entity relationships, geographic routes, exact row audit, or too many paths without Top N/aggregation | Step schema, transition schema, start/end/order, metric basis, conversion/drop-off, Top N, path depth | Main/secondary/drop-off/abnormal path semantics explicit | Main path and key drop-off labels only | Node/link detail, expand/collapse, table/export fallback | All branches, all labels, no start/end, no transition evidence |
| Treemap | Hierarchical composition, parent/leaf contribution, scale/share distribution, long-tail structure | Trend, negative area values, exact comparison of similar values, unclear hierarchy, high-cardinality unaggregated leaves, ordinary tree expansion | Hierarchy schema, parent/leaf aggregation, non-negative additive area metric, color metric, Top N/`其他`, visible depth, label thresholds | Area metric and color metric meanings explicit; color legend/visualMap required | Parent labels and large-leaf labels only; tiny rectangles tooltip-only | Breadcrumb/drilldown, detail table/bar fallback | Decorative mosaic, negative area, tiny labels forced, no hierarchy, no tooltip share |
| Sunburst | Hierarchy path plus composition share, parent-child split, current-path contribution, first-level branch share | Single-level share, trend, exact ranking, negative/rate/score angle values, too many siblings, `>4` visible levels without drilldown, decorative multi-ring pie | Hierarchy schema or `children`, non-negative additive angle metric, total/parent share, visible depth/ring width, Top N/`其他`, sector label thresholds, center content | Angle and color meanings explicit; first-level colors stable; color legend distinguishes angle/color | First-level, large second-level, selected path, Top/anomaly labels only; tiny sectors tooltip-only | Breadcrumb/drilldown, center return, detail table/bar/Treemap fallback | Decorative rings, negative angle, ringW too small, all labels forced, no hierarchy, no total/parent-share tooltip |
| Tree chart | Hierarchy, parent-child ownership, organization/category/product structure, metric decomposition, cost/permission tree, lineage, or dependency hierarchy | Many-to-many relationship network, area-based composition, ranking, exact row audit, or too many nodes without collapse/search/tree-list fallback | Root node, node schema, parent-child schema, depth/layer, visible depth, Top N/`+N`, orientation | Normal/abnormal/key/collapsed/leaf semantics explicit | Root/current path/key/abnormal labels; dense nodes tooltip-only | Expand/collapse, search/locate, node detail, tree-list/table fallback | All nodes expanded, missing root, multiple parents, decorative hierarchy |
| Relation graph | Entity connection, dependency, ownership, call path, transaction relation, community/risk cluster, or knowledge graph structure | Simple ranking, trend, exact row audit, decorative network background, or too many nodes/edges without aggregation | Node schema, edge schema, layout type, direction/weight, node/edge density, fitView/zoom/drag, tooltip | Node category/status and edge type/strength semantics explicit | Core/Top/anomaly/selected labels only; edge labels hover/selected | Node/edge detail, search, neighborhood focus, table/export fallback | Hairball, all labels, edge clutter, missing direction, no node/edge evidence |
| Scatter/bubble | Relationship, cluster, outlier, quadrant, or high-value object diagnosis across two numeric metrics | One metric, time trend, composition, category comparison, dense points without aggregation | X/Y metric names and units, declared axis ranges, optional target/average/quadrant lines | Color groups stable; bubble size metric declared | Key labels only; hover/detail for ordinary points | Object/detail drilldown, brush/zoom, table fallback | Missing units, label clutter, overlarge bubbles, unsupported quadrant/trend line |
| Parallel coordinates | Multi-metric object profile, similarity, anomaly, Top/selected comparison, or multi-factor screening across `3+` metrics | `1-2` metrics, single ranking, precise row audit without table, too many dimensions/samples without filtering | Object id/name, `3-12` ordered dimensions, per-axis range/unit/direction, scaling mode, axis spacing, tooltip | Group/status/anomaly/selected line semantics explicit; ordinary lines low opacity | Highlight Top/anomaly/selected/hover only; ordinary values tooltip-only | Brush/filter/detail/table fallback for dense samples or exact values | Decorative line web, random dimension order, missing axis units, line clutter, no exact tooltip |
| Map/geographic | Region distribution, spatial cluster, abnormal area, coverage, target attainment by geography, or origin-destination flow | No real geography field, few categories without spatial meaning, precise ranking/audit, or too-small map container | Region code or lon/lat binding, map resource/projection, visualMap/legend, tooltip exact values | Basemap weak; data layer/status color semantic; missing regions neutral | Key labels only; Top/selected/abnormal/hover | Drilldown, zoom/reset, detail/table/export when actionable | Stretched geography, legend covering data, label clutter, dense points without cluster/heatmap, tangled flows |
| Pie/donut | Part-to-whole composition with `2-6` categories; donut default for reports | `>8` unmerged categories, negative/all-zero data, precise ranking, trend, or similar shares requiring exact comparison | Legend/category + percent, tooltip exact value/rank/change-rate, center total for donut | Category colors stable; `其他` weak/neutral | Legend-first labels; outside labels only for large `<=5` category charts | Detail/table fallback for category evidence | Legend/label/center collision, `其他` too large, fake all-zero shares |
| Radar | Multi-dimensional score, operating health, actual-vs-target profile, small object comparison | `>10` dimensions, `>3` visible series, mixed raw units, or precise value audit | Shared score scale, circular geometry, outside dimension labels, legend separate from local filter | Actual/target/previous/object semantics explicit; target weak/dashed | Dimension labels permanent; value labels key-only; exact/raw values in tooltip | Drill/detail or table fallback for dimension evidence | Ellipse distortion, label collision, mixed units, too many dimensions/series |
| Bar/column | Ranking/comparison | Continuous trend with many periods | Sorted by business rule | Highlight threshold/top N | Top/selected labels | Drill to table | Long category names |
| Stacked/grouped bar | Composition comparison | Too many groups or exact totals required | Legend visible | Group colors stable | Use tooltip/table fallback | Drill by group | Legend overflow |
| Table/S2 | Exact values, dense comparison, audit | Quick visual pattern only | Headers/units/sort explicit | Status colors semantic | Cell values visible/disclosed | Export and row drawer | Wide columns |
| Complex diagram | Process, lineage, dependency | No real ordered relation | Labels and connectors reserved | Stage/status semantics | Avoid overlapping labels | Zoom/pan/fullscreen | Node and label collision |

## Governance

Use this table for stable rules and for gaps found during audit.

| Version | Owner | Source | Changed rule | Affected projects | Migration action | Exception policy | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| v1.0 | Design owner | Company/template/report | Rule name | Project list | Adopt/repair/deprecate | Who can approve, duration, evidence | stable/variant/deprecated/gap |

## Audit Finding Matrix

Use this when the task is an audit or when the current design system appears empty.

| Finding ID | Severity | Surface | Missing/conflicting rule | Evidence | Required fix | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DSG-001 | P0/P1/P2/P3 | Token/component/chart/state/governance | Description | Screenshot/file/rule | Concrete repair | Owner | open/fixed/waived |

## Anti-AI Gate Matrix

Use this when creating, auditing, or migrating a report design system.

| Cause ID | Surface | Evidence | Severity | Required constraint/token/component rule | Exception owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `AI-CONTEXT-THIN` | Page/component/copy/code | Missing user task, first action, or real content | P0/P1/P2/P3 | Add context, priority, and workflow rule | Owner | open/fixed/waived |
| `AI-TEMPLATE-AESTHETIC` | Visual tokens/layout/assets | Generic gradient/glass/glow/oversized radius | P0/P1/P2/P3 | Bind visual choice to approved token/source | Owner | open/fixed/waived |
| `AI-GENERIC-COPY` | Headings/CTA/states | Empty slogan or placeholder copy | P0/P1/P2/P3 | Require concrete action/object/condition/evidence | Owner | open/fixed/waived |
| `AI-FIRSTSCREEN-ONLY` | Layout/QA | Missing mobile, scroll, states, long content | P0/P1/P2/P3 | Add responsive and state acceptance | Owner | open/fixed/waived |
| `AI-ENGINEERING-SAMPLE` | Frontend implementation | Hardcoded styles, fake rows, no labels/focus | P0/P1/P2/P3 | Add tokens, typed view model, states, accessibility | Owner | open/fixed/waived |

## Report Decision Anti-AI Gate Matrix

Use this when the standard covers report, dashboard, cockpit, BI, detail-query, topic-analysis, or report-designer surfaces. A report can pass the generic anti-AI gate and still fail because it cannot support a decision.

| Cause ID | Surface | Evidence | Severity | Required constraint/token/component rule | Exception owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `RPT-METRIC-SHELL` | Metric/KPI/card/view model | Primary metrics lack formula, denominator, grain, period, source, owner, or drill path | P0/P1/P2/P3 | Require metric dictionary and metric tree before layout acceptance | Owner | open/fixed/waived |
| `RPT-TEMPLATE-LAYOUT` | Page/grid/first viewport | Default equal-weight dashboard layout replaces decision path | P0/P1/P2/P3 | Layout follows status -> target -> driver -> abnormality -> detail -> action | Owner | open/fixed/waived |
| `RPT-DECORATIVE-CHART` | Chart/table/component | Chart exists for visual variety rather than a task | P0/P1/P2/P3 | Chart/table choice maps to target gap, trend, ranking, composition, driver, detail, or action task | Owner | open/fixed/waived |
| `RPT-NO-DATA-STORY` | Page/component/copy | Result has no baseline, driver, abnormality, or explanation | P0/P1/P2/P3 | Require diagnostic narrative and evidence path | Owner | open/fixed/waived |
| `RPT-TOO-CLEAN-DATA` | Mock/provider/QA | Only smooth, positive, complete sample data exists | P0/P1/P2/P3 | Require realistic messy states and reconciliation cases | Owner | open/fixed/waived |
| `RPT-STATIC-FILTERS` | Filter/drilldown/export | Controls change selected UI only or lose context | P0/P1/P2/P3 | Filters map to fields/API params and carry context into detail/export/share | Owner | open/fixed/waived |
| `RPT-VISUAL-OVER-DATA` | Visual tokens/component style | Decoration reduces numeric, axis, label, table, or anomaly readability | P0/P1/P2/P3 | Data readability outranks polish; use semantic color and exact-value access | Owner | open/fixed/waived |
| `RPT-NO-INDUSTRY-SENSE` | Copy/metric/dimension | Domain vocabulary and metric families are generic or wrong | P0/P1/P2/P3 | Require domain terms, business objects, dimensions, and constraints | Owner | open/fixed/waived |
| `RPT-NO-ACTION` | Interaction/workflow | No detail, owner, export, assignment, approval, runbook, or next step | P0/P1/P2/P3 | Every primary concern has a next action or documented read-only exception | Owner | open/fixed/waived |
| `RPT-DESIGNER-SHELL` | Report designer/editor | Three-panel designer shell lacks data source, binding, aggregation, validation, version, or publish flow | P0/P1/P2/P3 | Designer standard covers data-to-report behavior and validation workflow | Owner | open/fixed/waived |
