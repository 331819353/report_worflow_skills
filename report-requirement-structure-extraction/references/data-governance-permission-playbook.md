# Data Governance And Permission Playbook

Use as a secondary layer whenever source credibility, data trust, privacy, security,口径, lineage, reconciliation, masking, audit, or permission design matters.

## Extract

- Data owner, source owner, business口径 owner, system owner.
- Source lineage: source table/file/API, transform job, model/view, service response, frontend component.
- 口径 and version: metric definition, effective date, comparison rule, historical change, reconciliation rule.
- Quality rules: completeness, uniqueness, timeliness, valid range, referential integrity, exception handling.
- Permission model: identity, role, organization hierarchy, row scope, column masking, operation permission, export approval.
- Audit and traceability: access logs, export logs, change logs, approval records, correction workflow.

## Required Handoff

Output governance details that downstream work can enforce:

- Source and口径 ownership.
- Lineage path from source to UI/API/export.
- Data quality checks and exception behavior.
- Row, field, operation, and export permissions.
- Masking and privacy constraints.
- Audit log and traceability requirements.
