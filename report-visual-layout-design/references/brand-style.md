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

When HTML/source/sample or custom design controls layout, keep the source structure but still apply global UI tokens for palette, typography, spacing, radius, semantic colors, and control states unless the user explicitly asks for exact color restoration. Do not let one-off inline sample colors override the unified page UI.

## 2. Logo Rules

Use only bundled Haier logo assets:

- `assets/haier-logo.svg`: preferred light/default logo when this filename is available.
- `assets/haier-logo-original.svg`: original color logo on light backgrounds.
- `assets/haier-logo-white.svg`: white logo on dark backgrounds.

Background rule:

- Light background: show the original color logo.
- Dark background: show the white logo.

Usage:

- Custom report page: the unified title/control area must include the Haier logo.
- Template page: use the template's configured logo slot.
- Export/PDF/PPT: logo may appear on cover, shared header, or footer.

Do not recolor the original logo, stretch it, place it repeatedly inside cards/charts, or make it visually compete with the report title.

### Brand Asset Discovery Gate

Before implementation, check logo availability in this order:

1. Existing project `public`, `assets`, `static`, or documented brand asset folders.
2. Selected dashboard template `public` directory.
3. Bundled skill assets: `assets/haier-logo.svg`, `assets/haier-logo-original.svg`, `assets/haier-logo-white.svg`.

Passing rules:

- A Haier or branded page must configure one logo source in the header, unified title/control area, sidebar brand area, or template logo slot.
- Light shell uses original color logo; dark shell uses white logo.
- Missing asset does not justify removing the logo slot. Render a visible placeholder in the intended logo location and record `logo asset missing` as a gap.
- For custom pages with `brandMode: haierBranded`, both `htmlReplica` and `freeDesign` must use a real bundled Haier logo asset. A placeholder records a blocker and cannot pass final acceptance.
- Screenshot QA must verify visibility, variant, aspect ratio, clipping, and placeholder text when applicable.

Brand-mode exception:

- If `brandMode: sampleNative` or `neutral` is explicitly declared, do not inject Haier logo only because the page is custom; record the non-Haier decision. This exception is not available for Haier/branded pages.

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

Chinese trend indicators:

- Rate, completion, variance-rate, YoY, MoM, and change labels use `%` in visible Chinese UI; avoid `pt`, `p.p.`, and `percentage point` labels unless explicitly requested.
- For change-rate and variance-rate indicators, positive values use red text plus an upward SVG/icon, negative values use green text plus a downward SVG/icon, and zero values use neutral treatment.

## 5. Density

Choose density based on report use:

- Comfortable: leadership overview, recap, presentation, and review pages.
- Standard: default business analysis and status pages.
- Compact: detail query, reconciliation, monitoring, task execution, and dense tables.

Even in compact mode, preserve readability and avoid visual clutter.
