# Component Design Spec Template

Use this structure for reusable component standards.

## 1. Scope And Source Of Truth

- Component family:
- Applicable report/page types:
- Source hierarchy: company UI baseline, report design system, template, project exception
- Libraries/renderers:
- Supported viewports:
- Owner/version/status:

## 2. Component Purpose

- Business question supported:
- Decision role: state, trend, target gap, composition, relationship, driver, abnormality, detail, action, evidence, data trust
- Not suitable for:

## 3. Anatomy

- Required slots:
- Optional slots:
- Forbidden slots:
- Parent/container assumptions:
- Local filter or internal control zone:

## 4. Data Contract

- Row grain:
- Required fields:
- Metric formulas and denominators:
- Unit/precision/date format:
- Source/freshness/version fields:
- Permission or masking rules:
- Empty/error/no-permission/stale behavior:

## 5. Placement And Fit

- Variables: `W`, `H`, `P`, `CW`, `CH`
- Slot rectangles and alignment:
- Main visual center:
- Legend/filter/action/table/footer budgets:
- Size tiers:
- Responsive fallback order:
- Overflow and exact-value disclosure:

## 6. Visual And Interaction Rules

- Inherited tokens:
- Component-specific semantic tokens:
- Typography:
- Color semantics:
- Border/shadow/radius:
- Hover/focus/selected/disabled/loading:
- Tooltip/detail/drawer/fullscreen behavior:
- Accessibility:

## 7. Implementation Handoff

- Renderer/component library:
- Config fields:
- API/view-model expectations:
- State model:
- QA crop and DOM overflow checks:
- Regression cases:

## 8. Governance

- Allowed variants:
- Deprecated patterns:
- Exceptions:
- Migration impact:
- Acceptance status: `ready`, `partial`, or `blocked`
