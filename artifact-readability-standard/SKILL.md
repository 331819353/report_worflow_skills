---
name: artifact-readability-standard
description: "用于设计或审计交付物是否同时便于人类评审和下游AI/自动化抽取。用户提到人和AI都可读、交付物结构、文档结构可复用、稳定ID、状态值、字段/接口/缺口/证据可抽取、不要AI式key-value墙、文档太难读、交付说明需要机器可读时触发；不替代具体API文档、测试报告或技术方案正文生成。"
---

# Artifact Readability Standard

## Positioning

Use this skill to shape stage artifacts so business users, product owners, developers, testers, maintainers, and downstream AI agents can all understand and extract the same canonical contract.

It is a structure and readability standard. Load the owning domain skill for the content itself, such as API documentation, technical solution, frontend function description, test evidence, or data model mapping.

## Reference Loading

- Read `references/human-ai-readable-artifact-standard.md` before producing, restructuring, or accepting a dual-readable artifact.

## Workflow

1. Identify artifact type, audience, downstream consumer, and canonical source of truth.
2. Decide whether one dual-readable artifact is enough or whether a human summary plus machine appendix is necessary.
3. Structure the output with human summary first, then source context, business/delivery flow, structured contract tables, decisions/gaps, verification, and optional schema appendix.
4. Preserve stable IDs, exact field names, endpoint paths, status values, owners, evidence, and linked gaps.
5. Check that tables support the narrative instead of replacing it.

## Required Output

- Artifact type and canonical source.
- Human-readable summary shape.
- Machine-extractable IDs, statuses, mappings, fields, endpoints, gaps, and evidence.
- Section/table structure and appendix decision.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not produce separate human and AI documents unless the relationship and canonical source are explicit.
- Do not leave opaque IDs without human labels or blocked/partial statuses without impact and next action.
- Do not use long AI-only key/value walls as the main artifact.
