# Report Design System Rule Catalog

Use this catalog when a design-system output needs concrete rules rather than an empty framework. It is intentionally reusable across report products; project-specific values should come from source systems such as `$haier-enterprise-app-ui-design-spec`, bundled templates, existing CSS tokens, or approved brand files.

## Source Hierarchy

When multiple design sources exist, resolve conflicts in this order:

1. Company-level standard, such as `$haier-enterprise-app-ui-design-spec`.
2. Approved template design system, such as `$report-prototype-template-management` template layout tokens.
3. Product/report-family extension.
4. Project-specific exception with owner, expiry, and regression evidence.

If a lower-level source conflicts with a higher-level source, record the conflict instead of silently choosing the newer-looking style.

## Required Rule Families

A report design system is incomplete unless it covers all of these:

| Family | Must define |
| --- | --- |
| Tokens | Color, typography, spacing, grid, radius, border, shadow, icon, density, z-index, breakpoint |
| Layout | Shell, header, navigation, filter surface, content grid, parent block anatomy, internal sub-block anatomy, title band, responsive behavior |
| Components | Filters, KPI cards, summaries, charts, tables, drawers/modals, actions, tags, feedback states |
| Visualization | Chart choice, axis, legend, tooltip, data labels, color semantics, thresholds, drilldown/export |
| Data display | Unit, precision, percent/rate wording, trend direction, empty/null/zero/stale data |
| Interaction | Hover, focus, active, selected, disabled, loading, reduced motion, no layout shift |
| States | Loading, empty, error, no-permission, stale, disabled, partial data, offline/mock |
| Governance | Version, owner, source, status, allowed variants, deprecated patterns, exception process, QA baseline |

## Token Rules

- Tokens must be semantic. Prefer `text.primary`, `surface.card`, `border.default`, `state.error`, `chart.series.primary`, `space.block`, not raw names such as `blue-1` unless the raw token is inherited from a company source.
- Each token needs `value/source`, `usage`, `accessibility note`, and `status`.
- If the value is inherited, write the source name and section, not a copied paraphrase.
- If a token is unknown, mark it `gap` and name the owner needed to close it.
- Do not allow one-off colors in chart series, KPI status, hover glow, or badges without a semantic role.

## Layout Rules

- Define page shell areas: logo/brand, title, scope/status, navigation, filter surface, toolbar/actions, content blocks, feedback area.
- Top-level report blocks must use stable rectangular `8 * N` parent spans. A parent block may contain internal sub-blocks; sub-blocks are local layout regions, not page-grid cells, and they need their own fit rules.
- Internal sub-blocks must declare component owner, local grid/flex tracks, `5px` parent inset, `5px` sibling gap, min width/height, state behavior, and overflow policy.
- Template-based pages must use template-owned filters, title bands, card padding/radius, row height, and hover/focus behavior unless a template-level redesign is approved.
- Define first-viewport priority: primary conclusion or action, supporting evidence, breakdown, detail, and next action.
- Responsive behavior must declare what collapses, stacks, scrolls, moves to drawer, or remains fixed.
- Loading, empty, error, and no-permission states must preserve the planned geometry unless the state is explicitly page-level.

## Component Rules

### Filter And Control Surfaces

- Define filter source, default value, active-state display, reset path, changed-state display, disabled/loading/error states, and affected components.
- In template-based report pages, main filters should map to template-native `filters[]` and its trigger/panel/popover/drawer behavior.
- Filter chips and selected labels need wrapping, overflow counter, or panel expansion.
- Primary filters must not be visual-only; affected components need binding and validation.

### KPI And Metric Cards

- Card anatomy: title, value, unit, trend/comparison, helper, status/action when needed.
- Value and unit must remain visible. Long titles may wrap or disclose, but critical values cannot be ellipsis-only.
- Trend direction and color semantics must be explicit. For Chinese report UI, rate/change/completion labels use `%` unless an approved exception says otherwise.
- Cards need loading, empty, error, no-permission, and stale-data variants.

### Summary And Narrative Blocks

- Summary text must follow the surrounding layout tokens and density.
- A summary block must have conclusion, reason/evidence, and action/follow-up when the business task requires decisions.
- Long narrative should use expand/drawer or a larger block instead of tiny text.

### Charts

- Chart type must match the task: trend, ranking, composition, distribution, correlation, process, or exact-value lookup.
- Axis order, unit, tooltip payload, legend behavior, threshold lines, and drilldown target must be specified.
- Dense charts require label budgets, tooltip exact values, zoom/fullscreen/table fallback, or sampling rules.
- Do not use pie/donut as a default for ranking, trend, or precise comparison.

### Tables

- Tables need column definitions, unit/precision, sorting, pagination, empty/error/no-permission states, row actions, export rule, and overflow behavior.
- Wide tables should preserve operation access through frozen/sticky action columns or row detail drawers.
- Analytical matrices, pivot tables, and dense comparison grids should use S2-class table behavior when implementation supports it.

### Drawers, Modals, And Popouts

- Use drawer/modal for focused detail or short editing flows; move long workflows to a page or route.
- Define mask, z-index, close path, footer actions, scroll area, loading/error states, and context preservation.
- Popout shadow and focus rules must be inherited from the token system.

### Feedback States

- Every reusable component family needs loading, empty, error, no-permission, stale, disabled, and partial-data states.
- Empty states should explain whether data is absent, filtered out, unauthorized, not loaded, or not configured.
- Error states need retry/contact/reset action when appropriate.

## Visualization Semantics

| Question | Preferred visual | Required rule |
| --- | --- | --- |
| Current status or target gap | KPI card, status table, progress indicator | Baseline, threshold, status color, and owner |
| Trend over time | Line/area/bar by period | Chronological order and period granularity |
| Ranking/comparison | Sorted bar/table | Sort basis, top/bottom rule, exact values |
| Composition | Stacked bar, treemap, donut only for few parts | Total basis and percent/value tooltip |
| Cause or contribution | Waterfall, decomposition chart, ranked factors, table | Additive or attribution logic |
| Process/conversion | Funnel/process/flow only with ordered stages | Shared population/cohort rule |
| Audit/detail lookup | Table/S2/detail drawer | Row grain, key fields, export permission |

## Metric Display Rules

- Every metric must define raw scale, display scale, unit, precision, null/zero rule, period, comparison baseline, and owner.
- Chinese report UI should display rate, completion, change-rate, variance-rate, YoY, and MoM with `%` by default.
- Use positive-red-up and negative-green-down for change-rate indicators unless a named domain rule overrides it.
- A displayed percentage must distinguish ratio value `0.42`, percent value `42`, and formatted value `42%`.
- Avoid terms such as `pt`, `p.p.`, and `percentage point` in Chinese UI unless the product explicitly requires them.

## Interaction Feedback Rules

- Hover/focus must not move, scale, or resize fixed-grid blocks.
- Prefer border color, outline, inset glow, or stable box-shadow inside component bounds.
- Focus-visible must be visible for keyboard users and must not rely only on color when possible.
- Reduced-motion behavior should keep state feedback but remove nonessential transitions.
- Disabled states must preserve layout and explain unavailable actions when the action is important.

## Governance Status

Use these statuses consistently:

| Status | Meaning |
| --- | --- |
| `stable` | Approved source, owner, scope, and acceptance checks exist |
| `variant` | Allowed alternative for a named scenario, with limits |
| `deprecated` | Existing pattern should be migrated away |
| `gap` | Required rule is missing or source conflict is unresolved |
| `exception` | Temporary project-specific deviation with owner and expiry |

## Minimum Audit Checks

- Are color, typography, spacing, radius, shadow, and breakpoint tokens semantic and sourced?
- Are filter, KPI, chart, table, drawer/modal, action, and feedback components specified?
- Are metric display rules explicit for unit, precision, percentage/rate, and trend semantics?
- Are loading, empty, error, no-permission, stale, disabled, and partial-data states present?
- Are hover/focus effects geometry-safe and accessible?
- Are template rules inherited rather than rediscovered or changed ad hoc?
- Are allowed variants and deprecated patterns named?
- Does each stable rule have source, owner, adoption status, and regression check?
