# Object Model And Acceptance Reference

Use when object fields, acceptance criteria, or implementation task lists need more detail than the core output skeleton.

## Object Model Fields

For each important object, capture the fields below when relevant:

- `name`: business/system/display name.
- `type`: business object, data object, API object, UI object, process object, test object.
- `grain`: what one row/card/node/event represents.
- `owner`: business owner, data owner, technical owner, handler, approver.
- `source`: system, table, file, endpoint, mock dataset, user input.
- `identity`: primary key, natural key, composite key, display key.
- `relations`: upstream/downstream objects and relationship type.
- `status`: lifecycle state, processing state, risk state, validity state.
- `permissions`: who can view, operate, export, approve, or audit.
- `acceptance`: how to verify the object behaves correctly.

## Acceptance Criteria Pattern

Write acceptance criteria as measurable checks:

- Given context or precondition.
- When the user/system/action happens.
- Then expected result, data result, permission result, and evidence.
- Include negative cases: empty, error, no-permission, stale, invalid input, timeout, or data mismatch.
- Tie every acceptance criterion to either a test case, API response, UI state, log, export file, or data reconciliation result.

## Development Task List

For implementation-ready tasks, add:

- Task name.
- Target artifact: page, component, endpoint, model, table, adapter, test file, documentation, deployment config.
- Dependency: data source, API, permission, frontend route, backend service, test data, external system.
- Acceptance condition.
- Risk or pending question.
