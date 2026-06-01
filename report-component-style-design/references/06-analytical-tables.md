# Analytical Table Rules

Use for AntV S2, pivot tables, cross tables, wide metric matrices, financial grids, and detailed record tables.

## Viewport

- The table body is the viewport. The table must scroll inside the block instead of expanding the page.
- Mount S2 only after width and height are measurable.
- Synchronize S2 width/height with the assigned grid block and resize on container changes.
- Keep header, pagination, and toolbar outside the scrollable data body when possible.

## Columns And Width

- Freeze key identifier columns when horizontal scroll is needed.
- Text/name columns get more width and may wrap to two lines.
- Numeric, percent, status, date, and action columns use stable compact widths.
- Do not compress all columns until values are unreadable. Prefer horizontal scroll.
- Ellipsis is allowed only with tooltip/full text and never as the only access to decision-critical content.

## Typography And Alignment

- Header: 12-13px, weight 600.
- Cell text: 12-13px minimum.
- Text left-aligns, numbers right-align, status aligns center or left with icon/text.
- Financial and percentage values use tabular numerals and consistent precision.
- Row height must be stable. Wrapping rows should use a defined two-line height rather than auto-growing unpredictably.

## Tags, Status, And Operations

- Status text renders as badge or icon plus text, not plain colored text.
- Too many colored tags create noise. Show primary status permanently and move secondary tags to hover/detail.
- Operation buttons must keep a stable column width and not wrap awkwardly.
- Risk/warning cells need tooltip explaining rule, threshold, or source when available.

## Empty, Loading, Error

- Preserve columns and header where useful so users know what data is missing.
- Loading rows should not resize the component.
- Error state should offer retry and not destroy table scroll layout.
