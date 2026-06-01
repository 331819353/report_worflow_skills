# Data Visualization And Frontend Playbook

Use when the requirement is for 前端, 可视化, 报表页面, 仪表盘, dashboard, mock替换, API联调, response adapter, or runtime UI validation.

## Extract

- Page/view inventory: route, layout, components, visible states, data dependencies, actions.
- Component contract: component id, purpose, data source, required fields, formulas, filter dependencies, interaction outputs.
- API mapping: documented endpoint -> frontend request function -> adapter -> component view model.
- Response adaptation: rename fields, flatten/nest, enum mapping, unit/precision formatting, date formatting, derived values.
- Filter state: defaults, option sources, cascades, active chips, reset behavior, permission-limited options.
- Interaction state: selected row/mark, drawer/modal, drill path, jump params, breadcrumb/back behavior, stale-selection handling.
- Runtime states: loading, empty, error, no permission, partial data, stale data, overflow, resize.
- Verification: build/start commands, browser smoke test, filter linkage, visual overlap, data consistency with backend.

## Required Handoff

Output enough detail to replace static/mock data with real HTTP calls:

- Request parameter mapping for every API call.
- Response adapter rules from API fields to component view models.
- Component binding matrix.
- Filter-to-field/query mapping.
- Interaction context propagation rules.
- Runtime QA checklist for visual, data, and API states.
