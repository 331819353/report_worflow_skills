# Brand And Visual Style

## 1. Brand Direction

Report pages should feel simple, elegant, unified, and enterprise-grade. They are work surfaces, not marketing pages.

Primary visual language:

- Main colors: Haier blue and white.
- Base surfaces: white or near-white for ordinary enterprise reports.
- Accent use: Haier blue for primary actions, selected states, key lines, and main current/actual series.
- Neutral support: gray text, subtle dividers, light backgrounds, restrained shadows.
- Semantic colors: red/orange/yellow/green only for status, risk, warnings, health, or completion.

Avoid multi-color interference. A report can have semantic color, but it should not look like every module is using a different palette.

## 2. Logo Rules

Use only bundled Haier logo assets:

- `assets/haier-logo.svg`: preferred light/default logo when this filename is available.
- `assets/haier-logo-original.svg`: original color logo on light backgrounds.
- `assets/haier-logo-white.svg`: white logo on dark backgrounds.

Background rule:

- Light background: show the original color logo.
- Dark background: show the white logo.

Usage:

- Blank report page: the unified title/control area must include the Haier logo.
- Template page: use the template's configured logo slot.
- Export/PDF/PPT: logo may appear on cover, shared header, or footer.

Do not recolor the original logo, stretch it, place it repeatedly inside cards/charts, or make it visually compete with the report title.

## 3. Minimal Enterprise Style

Use:

- 8px spacing rhythm.
- 8px or smaller card radius.
- White card surface: `#FFFFFF`.
- Default light card shadow: `0 2px 10px rgba(0, 0, 0, 0.05)`.
- Subtle dividers instead of heavy borders.
- Clear type hierarchy, with large numbers reserved for top-level KPIs.
- Tabular numerals for comparable values.

Avoid:

- Decorative gradients, large shadows, floating ornaments, and saturated backgrounds.
- One page with many unrelated accent colors.
- Oversized hero typography inside dashboards.
- Cards inside cards.
- Boxed mini-card titles inside chart cards unless the design system requires it.
- Repeating explanatory UI text that says how to use the page.

## 4. Recommended Palette

Use Haier blue as the dominant brand accent:

- Brand primary: `#005BAA`.
- Brand light tint: `#EAF4FF` or another very pale blue tint.
- Background: `#F6F8FB`, `#F7FAFC`, or white.
- Card: `#FFFFFF`.
- Primary text: `#1F2937` or deep neutral gray.
- Secondary text: `#667085` or neutral gray.
- Divider: `#E5E7EB`.

Semantic colors should be restrained and consistent:

- Risk/failure: one red family.
- Warning: one orange/yellow family.
- Healthy/positive: one green family.
- Info/selected/current: Haier blue family.

## 5. Density

Choose density based on report use:

- Comfortable: leadership overview, recap, presentation, and review pages.
- Standard: default business analysis and status pages.
- Compact: detail query, reconciliation, monitoring, task execution, and dense tables.

Even in compact mode, preserve readability and avoid visual clutter.

