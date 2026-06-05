---
name: delivery-version-management
description: "用于报表项目交付物版本管理、交付物索引、版本链路和迭代追踪。用户提到版本化交付、原型/API/数据模型/后端/前端/测试报告版本对应关系、交付物索引、版本对齐、迭代记录、发布包清单、哪个文档对应哪个版本时触发；不负责生成各交付物正文。"
---

# Delivery Version Management

## Overview

Use this skill to create a single delivery index that links prototype, requirements, API docs, data models, backend, frontend, test reports, automation, defects, and release notes across iterations.

The goal is to answer: "Which version of each artifact belongs together, and what changed?"

## Inputs

- Artifact folders/files, current version naming, PRD/prototype/API/model/frontend/backend/test documents, release notes, branch/commit, environment, or defect reports.
- Optional: target version, release date, owner, status, dependency chain, and change request IDs.

Read `references/01-delivery-index-template.md` when producing the index table. Use `scripts/build_delivery_index.py` to create a first-pass index from files.

## Workflow

1. Define version chain.
   Use a stable chain such as `requirement-v1 -> prototype-v1 -> model-v1 -> api-v1 -> backend-v1 -> frontend-v1 -> test-v1 -> release-v1`. Keep patch/minor versions when one artifact updates without full-cycle redesign.

2. Inventory artifacts.
   List every artifact path, type, version, owner, source date, status, and related change IDs. Mark missing or stale artifacts.

3. Link dependencies.
   Connect each artifact to upstream/downstream versions. For example, `frontend-v2` consumes `api-v2` and is validated by `test-v2`.

4. Record compatibility.
   Mark compatible, partial, breaking, deprecated, or blocked. Breaking changes must route to `$change-impact-analysis`.

5. Define release bundle.
   State exactly which artifacts belong in the current delivery package and which remain draft/obsolete.

6. Maintain index.
   Update the index after every approved change, test result, defect repair, or release. Do not overwrite history; append a new version row.

## Script

Create a first-pass Markdown index:

```bash
python3 delivery-version-management/scripts/build_delivery_index.py <artifact-root> --out DELIVERY_INDEX.md
```

Use `--version release-v1` to stamp a target bundle version.

## Required Output

- Version chain: requirement/prototype/model/API/backend/frontend/test/release mapping.
- Delivery artifact index: artifact type, name, version, path, owner, status, upstream/downstream versions, change IDs, evidence.
- Compatibility and freshness check: stale, missing, obsolete, breaking, partial, or ready.
- Release bundle: included artifacts, excluded drafts, required approvals, rollout/rollback notes.
- Follow-up actions: missing versions, required updates, owner workflows, and blockers.

## Quality Checklist

- Every delivery artifact has type, version, path/source, owner, and status.
- Version relationships are explicit and not inferred silently.
- Test reports and automation runs point to the exact frontend/backend/API versions tested.
- Obsolete documents are marked obsolete rather than left ambiguous.
- Breaking or mismatched versions route to `$change-impact-analysis`.
