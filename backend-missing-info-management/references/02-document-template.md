# Document Template

Use this reference when creating or updating a missing-information document.

## Location

Prefer `docs/missing-info.md`. If no docs folder exists, use `MISSING_INFO.md`. Follow an existing project convention when one is already present.

## Header

```markdown
# Missing Information

- Last updated:
- Scope:
- Related artifacts:
- Owner:
```

## Item Template

```markdown
## MI-001: <short title>

- Category:
- Severity: P0 blocked / P1 risky / P2 clarify / P3 note
- Status: open / assumed / confirmed / resolved / wontfix
- Affected endpoint/module/file:
- Missing or assumed information:
- Impact:
- Current handling:
- Safety for local/demo/release:
- Owner or confirmation question:
- Due date or review date:
- Escalation path:
- Resolution:
- Resolution log:
```

## Compact Table Template

Use a table when there are many small items:

```markdown
| ID | Category | Severity | Status | Item | Impact | Current handling | Owner/question | Due/review |
|---|---|---|---|---|---|---|---|---|
| MI-001 | API contract | P1 risky | assumed | Unknown max page size | Large queries may timeout | Uses 100 max | Backend owner: confirm max page size | 2026-06-08 |
```

## Empty State

When no gaps are known, still create a short document:

```markdown
# Missing Information

- Last updated:
- Scope:

No known missing information at this time.
```
