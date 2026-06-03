---
name: backend-missing-info-management
description: "用于后端/API/数据服务/部署交付中的缺失信息管理。用户提到信息不全、口径不清、字段缺失、数据源未知、转换规则待定、枚举/公式/筛选项/鉴权头/环境变量/健康检查/日志监控/性能限制/上游依赖/权限/测试证据/回归证据缺少或只是临时假设时触发，提前形成缺口清单、责任人、优先级、到期和阻塞结论。"
---

# Backend Missing Info Management

## Overview

Use this skill independently to make backend/API assumptions visible and actionable. Any unresolved data, model, transformation, API, auth, config, deployment, observability, rollback, integration, testing, retest, or performance issue should be documented instead of being buried in code, comments, or final prose.

Typical inputs are API documentation, API inventories, implementation notes, data/source models, transformation notes, environment config, upstream contracts, test results, runtime findings, and stakeholder assumptions. The output is a missing-information document that can stand alone.

## Core Workflow

1. Collect missing or assumed items.
   Scan source analysis, models, transformations, contracts, tests, auth setup, config, deployment, health checks, observability, rollback, runtime evidence, and consumer alignment. Treat temporary defaults as missing information until confirmed.

2. Classify the gap.
   Use a stable taxonomy so similar gaps land in the same section across projects.

3. Record impact and current handling.
   For each item, state what can go wrong, current behavior, safety for local/demo/release, and required change after confirmation.

4. Add owner or confirmation question.
   Write a concrete question for the relevant owner. For risky or blocking items, add a due date or review date and escalation path. Avoid vague notes like "need confirm"; say exactly what must be confirmed.

5. Keep assumptions consistent.
   Temporary rules must match across code, API docs, fixtures, tests, examples, and the missing-information document.

6. Close or update items.
   When a decision is received, update the resolution log and any affected code/API docs/tests.

## References

- Read [references/01-gap-taxonomy.md](references/01-gap-taxonomy.md) when classifying missing or assumed items.
- Read [references/02-document-template.md](references/02-document-template.md) when creating or updating the missing-information document.
- Read [references/03-consistency-and-resolution.md](references/03-consistency-and-resolution.md) when keeping assumptions synchronized or closing resolved items.

## Document Location

Prefer `docs/missing-info.md`. If the project has no docs folder, use `MISSING_INFO.md`. If a repository already has a decision log, ADR, issue tracker, or delivery-risk file, follow the existing convention and keep a clear missing-information section.

## Verification Checklist

- A missing-information document exists even when there are no known missing items.
- Every temporary default in code appears in the document with the same rule and fallback behavior.
- Every unresolved transformation or API contract mismatch has impact, current handling, owner/question, and status.
- Every missing production-readiness item that affects source authority, health, auth/config, observability, performance, rollback, or retest closure is visible with owner/question and release impact.
- P0/P1 items have a due date or review date and escalation path.
- Resolved items include a resolution log entry and the affected docs/code/tests are updated.
