# Text Summary Rules

Use for executive conclusions, diagnostic findings, risk explanations, abstracts, and recommendations.

## Structure

- Start with the conclusion, then show supporting metric, reason, and suggested action if space allows.
- Keep short summaries vertically centered. Top-align multi-line narratives.
- Highlight only key numbers, status words, or action verbs.
- Avoid paragraph-length content in small grid blocks.
- In `sampleRestore`, added conclusions, insights, or status summaries must be embedded into an existing sample-equivalent region such as the header/control area, panorama header, section head, or summary card. Do not create a new standalone horizontal band unless the source sample already has an equivalent band.
- Added summary components must be labeled as enhancements when they are not present in the sample and must not change the first viewport or main body layout.

## Fit

- One-row text summaries need at least 4 grid columns.
- Two-row compact summaries can use 3 columns only when the copy is short.
- Prefer 2-3 visible lines for first-screen summaries.
- Longer explanation moves to expandable text, drawer, or full-width lower section.
- Main conclusion must not be truncated. Supporting details may clamp only with tooltip or expand action.
- If a summary block contains small metric cells, the summary text zone and metric grid must both have minimum widths. Do not squeeze summary copy into a narrow strip while forcing metrics into fixed columns.
- Summary labels and metric titles may wrap to two lines with reserved height; avoid single-line ellipsis for decision-critical wording.

## Typography

- Conclusion text: 14-16px, weight 500-600 when it is the main answer.
- Supporting explanation: 12-14px, regular weight.
- Numbers inside summaries should use the same precision and semantic colors as related KPI/chart components.
- Text summaries must inherit the surrounding page shell tokens: surface, spacing, border/radius, typography, density, and semantic colors. Do not introduce a new visual surface or rhythm that conflicts with adjacent report sections.
- Rate/change numbers inside summaries use `%` for Chinese UI labels. Positive change rates use red text with an upward SVG/icon, negative change rates use green text with a downward SVG/icon, and zero values use neutral styling.

## Overflow

- Long organization, customer, product, or project names can wrap to two lines.
- Do not let text overlap actions or decorative icons.
- Reserve space for inline status badge before rendering text.
- If the sentence cannot fit after concise rewriting, move reason/evidence to drawer instead of shrinking text.
