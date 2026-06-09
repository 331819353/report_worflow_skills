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
| Semantic tokens | Use role-based tokens instead of one-off raw styles | Every raw color/spacing/shadow maps to a token or exception |
| Stable geometry | Hover/focus/loading/error states preserve layout size | No cards, buttons, charts, or tables shift on interaction |
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

## Component Rule

Minimum component families: shell/header, filter/control, KPI card, chart block, table block, detail drawer/modal, action/button/tag, feedback state.

| Component | Anatomy | Size/density | States | Data behavior | Interaction | Responsive rule | Do / Avoid |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Page shell/header | Logo/title/status/nav/actions | Reserved title and action areas | loading/stale/auth | Shows report scope and refresh state | Breadcrumb, return, refresh, export | Collapse or simplify navigation on small screens | Do not duplicate title areas |
| Filter/control surface | Trigger/panel/fields/chips/reset/apply | Stable height or native template surface | default/changed/disabled/loading/error | Options have source and affected components | Apply/reset/cascade/query | Template-native filters when template owns them | Avoid standalone duplicate filter bars |
| KPI card | Title/value/unit/trend/helper/action | Long labels wrap or disclose | loading/empty/error/no-permission | Value grain, unit, precision, trend basis explicit | Tooltip/drilldown/detail | Stack or scroll small groups | Avoid hiding critical values by ellipsis only |
| Chart block | Title owned by layout, legend, chart, tooltip | Body viewport measured after title/legend | loading/empty/error/no-permission | Dataset, grain, sort, baseline explicit | Tooltip/drilldown/fullscreen/export | Label sampling or zoom for density | Avoid chart types that hide exact-value tasks |
| Table block | Toolbar/table/pagination/actions | Horizontal/vertical overflow policy | loading/empty/error/no-permission | Columns, units, sort, pagination explicit | Row action/drawer/export | Frozen action column for wide tables | Avoid action access hidden off-screen |
| Detail drawer/modal | Header/body/footer/actions | Max height and scroll area | loading/error/no-permission | Reuses source filter context | Close/save/export/jump | Fullscreen or route for complex flows | Avoid replacing long workflows with cramped modal |
| Feedback states | Illustration/message/action | Preserve component geometry | loading/empty/error/no-permission/stale | Explains data or permission condition | Retry/contact/reset/create | Component-level and page-level variants | Avoid graphic-only feedback |

## Parent Block And Sub-Block Rule

Use this when a single report block carries multiple components that answer one shared business question.

| Parent block | Parent span | Sub-blocks | Local layout | Component owner | State/overflow rule | Split condition |
| --- | --- | --- | --- | --- | --- | --- |
| Example business block | `8*2` or source value | `summarySubBlock`, `chartSubBlock`, `rankingSubBlock` | Named CSS grid/flex areas with `5px` parent inset and `5px` sibling gap | One component per sub-block unless micro-group | State may be parent-level or sub-block-level; one internal scroll area max | Split if sub-blocks need independent titles/actions or fail min size |

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
| Line/area | Time trend | Few unrelated categories | Chronological x-axis | Series color stable | Labels sampled | Point/detail drilldown | Dense periods |
| Bar/column | Ranking/comparison | Continuous trend with many periods | Sorted by business rule | Highlight threshold/top N | Top/selected labels | Drill to table | Long category names |
| Stacked/grouped bar | Composition comparison | Too many groups or exact totals required | Legend visible | Group colors stable | Use tooltip/table fallback | Drill by group | Legend overflow |
| Pie/donut | Simple composition with few slices | Ranking, trend, precise comparison | Tooltip with percent and value | Slice colors semantic or stable | Avoid dense labels | Drill or table fallback | Small slices |
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
