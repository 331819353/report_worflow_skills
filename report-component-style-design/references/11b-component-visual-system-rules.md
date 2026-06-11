# Component Visual System Rules

This file was split from `11-detailed-style-rules.md`. Load it only for this focused rule group; use `11-detailed-style-rules.md` as the routing index.

## Block Fit Rules

When placing a component into a grid block, first estimate its minimum viable size.

Minimum viable size includes:

- Header: title, subtitle, unit, status, actions.
- Body: chart plot, table rows, cards, text, or diagram viewport.
- Labels: axes, legends, values, annotations.
- Footer: source, pagination, notes, or operation hint.
- Padding: safe space on all sides.

If the minimum viable size is larger than the assigned block:

- Give the component more columns or rows.
- Reduce optional labels or move them to tooltip.
- Move secondary narrative to drawer.
- Switch chart to table/list if exact reading matters.
- Enable zoom/pan for complex diagrams.
- Split the component into multiple grid-aligned rectangles.

Do not solve fit problems by simply shrinking typography below readability.

### Default Span And Fit Rules

When the page uses an `8 * N` grid, use `$report-visual-layout-design` for default span distribution and block-size constraints, then check whether the assigned body viewport remains readable after padding, title, legend, axes, controls, table headers, and footer are reserved.

Rules:

- Keep the default span when the component fits.
- If the assigned viewport fails fit, try a larger default candidate span, split, paginate, collapse, aggregate, or move details to drilldown.
- For scrollable page templates, final spans are valid only after the row-height rule is satisfied: every resulting block must be at least 220px tall.
- Do not calculate row height by dividing the viewport height by `N`; increase `N`, scroll, split, or paginate.

If the selected default span still feels cramped after validation, choose a larger candidate span or redesign the component placement.


## Complex Diagram Viewport Rules

Some components cannot naturally fit, such as:

- DuPont analysis diagrams.
- Metric trees and decomposition trees.
- Data lineage graphs.
- Sankey diagrams.
- Organization/process flow diagrams.
- Large topology, relation, or dependency graphs.

For these, treat the assigned grid block as a viewport:

- The component's block is the visible window.
- The diagram itself may have an internal logical size larger than the block.
- Provide zoom in, zoom out, reset, fit-to-screen, and drag/pan.
- Provide minimap or breadcrumbs when the diagram is large.
- Default to fit-to-screen while keeping labels readable.
- Allow node focus to center the selected branch.
- Keep key controls pinned inside the component header or corner.
- Do not let the diagram force the page layout to expand horizontally.
- Do not shrink labels below readability just to fit the whole diagram.

For print/export, provide a fit-to-page version, a split-by-section version, or a high-resolution export.


## Component Style System

Keep all report components visually related.

Use shared rules:

- Card base: white background, 8px radius, 24px padding, and `0 2px 10px rgba(0, 0, 0, 0.05)` shadow in light enterprise pages.
- Border radius: 8px by default, 12px only when the page style intentionally uses softer cards.
- Border: no hard default border on cards. Use subtle dividers inside dense tables/lists only when needed.
- Shadow: light and consistent; do not mix heavy shadows, glows, and borders across components.
- Background: white card surfaces for light theme; controlled dark blue/black panels only for explicitly dark monitoring or cockpit cases.
- Spacing: 8px rhythm, with 24px card padding as the default component safe area.
- Typography: consistent label, value, title, helper, and metadata sizes.
- Icon style: consistent stroke width and size.
- Status labels: same color semantics across all components.
- Hover/focus/selected/disabled states: visible and consistent.

Use component variants intentionally:

- Primary: core component on the page.
- Secondary: supporting component.
- Warning: risk/exception component.
- Actionable: component with direct operation.
- Evidence: component for details, proof, or source trace.


## Component Title Rules

Every component title area should be deliberate. Do not rely on generic card titles such as "Chart" or "Data".

Title structure:

- Main title: what this component shows.
- Optional subtitle: scope,口径, unit, or comparison baseline.
- Optional status tag: warning, updated, locked, delayed, high risk.
- Optional actions: more, fullscreen, download, settings, refresh, explain.

Title rules:

- Keep titles short and specific.
- Put long definitions in popovers.
- Align all block-owned titles consistently, usually top-left inside the block header.
- Vertically center title text with header actions.
- Do not let title text overlap action icons.
- Do not wrap ordinary component titles in a visible boxed title card. Use plain text plus a subtle underline/divider/accent mark unless a very specific visual system asks for boxed headers.
- Do not truncate decision-critical titles; wrap to two lines or shorten wording.
- If a template provides a one-line block title, the title must have `min-width: 0`, ellipsis, and full-title tooltip. If that hides decision-critical meaning, shorten the title or move口径 into subtitle/popover instead of letting it overflow.
- Use a block-owned title only when it helps scanning. Tiny KPI cards may use a compact label in the block/container header area.
- For charts, the block-owned title should state the measure and comparison dimension, such as "收入完成率 by 区域"; do not repeat it inside the chart option body.
- For tables, the block-owned title should describe the record set, such as "逾期回款明细"; table body should start with headers/rows, not another title.
- For text summaries, the block-owned title can be omitted if the summary itself starts with a clear conclusion.

Recommended title hierarchy:

- Layout/block title: 14-16px, semibold.
- Component subtitle/helper: 12-13px, regular, medium contrast.
- Metadata such as unit/source/update: 12px, muted but readable.


## Background Rules

Use background layers to separate content without visual noise.

Recommended light-theme layers:

- Page background: very light neutral, such as `#F5F7FA` or `#F7F8FA`.
- Component background: white or near-white, such as `#FFFFFF`.
- Subtle nested area: very light neutral, such as `#F8FAFC`, used sparingly.
- Hover row/card: light blue or neutral tint.
- Selected state: light blue tint with clear border or indicator.
- Warning background: very light semantic tint, never saturated blocks unless urgency is high.

Dark-theme or monitoring/presentation components:

- Use dark background only when the report mode requires it.
- Use the white Haier logo if a logo appears.
- Keep text and labels high contrast.
- Avoid pure black; use deep neutral or navy-like backgrounds.

Rules:

- Do not stack many background colors inside one component.
- Do not use decorative gradients as primary component backgrounds.
- Avoid transparent backgrounds that make text hard to read.
- Use subtle backgrounds to group related fields, not to decorate.


## Font Size And Typography Rules

Use a small, consistent type scale.

Recommended desktop scale:

- Page/report title: 20-24px.
- Section title: 16-18px.
- Layout/block title: 14-16px.
- KPI value: 24-36px depending on card size and importance.
- Secondary metric value: 18-24px.
- Body/table text: 13-14px.
- Label/helper/metadata: 12-13px.
- Tiny annotation: 11-12px only when non-critical and still readable.

Rules:

- Do not scale font size directly with viewport width.
- Do not use negative letter spacing.
- Use tabular numerals for KPI rows, tables, rankings, and financial values when possible.
- Keep line height around 1.35-1.6 for Chinese text.
- Values should be visually stronger than labels.
- Labels should remain readable; avoid ultra-light gray.
- Do not use more than 3-4 font sizes inside one component.

Responsive behavior:

- Step down typography only within safe bounds.
- Wrap or move secondary information before shrinking core values.
- For narrow cards, keep value readable and move trend/baseline below.


## Color Specification Rules

Define colors by role, not by decoration.

Recommended semantic roles:

- Primary action/selection: Haier blue or product primary blue.
- Text primary: near-black neutral.
- Text secondary: medium neutral.
- Text muted: muted neutral with readable contrast.
- Border: light neutral.
- Background: page neutral and component white.
- Success: green.
- Warning: orange/yellow.
- Danger: red.
- Info: blue.

Rules:

- Use Haier blue as the brand/primary accent, not as the only chart color.
- Use status colors consistently across every component.
- Use chart palettes with enough distinction and sufficient contrast.
- Do not make labels, axis text, legend text, or helper text too pale.
- Keep gridlines subtle but visible.
- Use tint backgrounds for low-intensity status; use strong fills only for severe alerts or selected elements.
- When encoding multiple categories, avoid relying on red/green only.

Minimum contrast intent:

- Primary text must be clearly readable on its background.
- Secondary text must remain readable without strain.
- Disabled text may be muted but should still be distinguishable.
- White text on colored backgrounds should be used only when contrast is strong.


## Border And Shadow Rules

Use borders and shadows to clarify hierarchy, not to decorate.

Recommended border style:

- Component border: 1px solid light neutral.
- Table row divider: 1px subtle neutral.
- Selected border: 1px or 2px primary/semantic color.
- Warning border: semantic color only when attention is required.

Recommended radius:

- Components/cards: 6-8px.
- Buttons/inputs/tags: follow product system, usually 4-8px.
- Tables: outer container radius only; avoid rounding every cell.

Recommended shadow:

- Default components: no shadow or very subtle shadow.
- Hover/elevated cards: low shadow.
- Drawers/modals/popovers: stronger but clean elevation.
- Sticky headers/toolbars: subtle shadow or border separator.

Avoid:

- Heavy dark shadows.
- Multiple shadow layers on dense dashboards.
- Thick borders on every component.
- Excessively rounded cards that feel playful instead of enterprise-grade.
