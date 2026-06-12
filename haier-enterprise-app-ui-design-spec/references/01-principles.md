# Haier Enterprise App UI Principles

Use this reference for common enterprise application design理念, style, and system-building logic.

## Background

Haier enterprise products have many systems, complex functions, and frequent requirement changes. A unified multi-end design standard should:

- Keep cross-application experience consistent.
- Reduce repeated design and development cost.
- Improve page and component reuse.
- Establish one shared design language.
- Support complex enterprise business scenarios.

## Keywords

The first impression of Haier UI Style should be:

- Haier brand tone.
- 简洁.
- 干净.
- 清晰.
- 高效.
- 实用.
- 逻辑性强.

## Design Style

Use a flatter design style:

- Remove redundant decoration.
- Emphasize clear information expression.
- Keep pages lightweight.
- Improve system running efficiency.
- Prioritize readability, usability, consistency, and maintainability.

## Componentization Logic

Common enterprise application UI should be built through this chain:

1. Business demand generates component needs.
2. Components form reusable templates.
3. Templates form pages.
4. Pages form operation flows.
5. Operation flows form user experience.

When designing, start from the business task and choose components that match the business property. Do not treat components as isolated visual assets.

## Report Boundary

This principle reference applies to Haier enterprise application surfaces, including report/dashboard pages as application pages. Report pages must inherit brand tone, token rules, typography, spacing, base component consistency, and state behavior unless an explicit non-Haier/native/neutral exception exists; report-specific decisions such as KPI hierarchy, chart/table choice, data binding, report templates, and visual density belong to `report-design-*` skills.
