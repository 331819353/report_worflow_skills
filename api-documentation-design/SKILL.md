---
name: api-documentation-design
description: "Create implementation- and handoff-ready API documentation from API inventories, product/backend requirements, implemented routes, OpenAPI snippets, source/data model files, or integration contracts. Use for generic API documentation, backend/API handoff, frontend integration specs, test contracts, endpoint request/response examples, auth/error/pagination/filter conventions, model traceability, transformation notes, performance limits, and unresolved items."
---

# API Documentation Design

## Overview

Use this skill independently when the task is to turn known or inferred API intent into precise API documentation. The input can be an API inventory, backend routes, product requirements, frontend integration needs, source/data models, OpenAPI fragments, tests, or prior docs.

Do not implement backend code merely because this skill is triggered. Produce documentation that is ready for implementation, frontend integration, testing, or delivery.

## Core Workflow

1. Collect inputs and select the documentation mode.
   Use inventory-to-document, route-to-document, requirement-to-contract, contract-refresh, async-job, webhook/callback, streaming, or file-transfer mode based on the available artifacts.

2. Establish shared conventions.
   Define base URL, version, auth, headers, response envelope, errors, pagination, sorting, filters, date/time format, enum format, and file behavior before documenting endpoint details.

3. Document endpoint behavior.
   For each endpoint, capture purpose, trigger, method/path, auth, request params/body, response schema, examples, errors, performance limits, compatibility notes, and status.

4. Trace dependencies.
   Link response fields to models, routes, repositories, source systems, upstream APIs, formulas, or explicit pending items. Avoid silently inventing fields or business rules.

5. Expose unresolved items.
   Mark partial or blocked endpoint behavior when source fields, formulas, auth values, permissions, samples, or performance decisions are missing.

6. Prepare handoff.
   Include enough examples and edge states for frontend contract validation, backend implementation, integration tests, runtime QA, and delivery review.

## References

- Read [references/01-inputs-and-traceability.md](references/01-inputs-and-traceability.md) when identifying source artifacts, authority, dependency trace, or unresolved model/API items.
- Read [references/02-document-structure.md](references/02-document-structure.md) when creating the document skeleton, common conventions, overview tables, and appendix.
- Read [references/03-endpoint-detail-rules.md](references/03-endpoint-detail-rules.md) when writing endpoint-level request, response, example, auth, error, performance, and compatibility sections.
- Read [references/04-handoff-quality-gate.md](references/04-handoff-quality-gate.md) before final delivery or when preparing frontend/backend/testing handoff.

## Required Outputs

- API documentation grouped by module, domain, page, resource, or service boundary.
- Common conventions plus endpoint details.
- Dependency trace from endpoint response to the relevant implementation/model/source/contract artifacts.
- Unresolved item list with endpoint impact and owner/confirmation question.

## Quality Checklist

- Every expected endpoint appears in the API document or is explicitly removed with a reason.
- Request params cover required filters, drilldowns, pagination, sorting, exports, defaults, and invalid-param behavior.
- Response schemas include field names, types, nullability, units, precision, enums, nesting, empty states, and examples.
- Auth, permission, no-data, invalid-param, unauthorized, no-permission, and upstream/backend failure behavior are documented when relevant.
- Pending items remain visible and do not masquerade as confirmed API behavior.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
