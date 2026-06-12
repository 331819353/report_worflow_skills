---
name: code-change-ledger-management
description: "用于维护前端、后端、可运行原型源码文件的文件级代码变更台账。用户提到 code change ledger、代码变更台账、文件级变更记录、__change_logs__、改代码前先读台账、改代码后追加版本、changed code ranges、unified diff、可还原补丁、功能清单、回滚说明、实现可追溯时触发；不负责完整交付物版本索引或发布包管理。"
---

# Code Change Ledger Management

## Positioning

Use this skill whenever scoped frontend, backend, or runnable prototype source code is created, edited, repaired, refactored, or tested and the change needs file-level traceability.

Use `$delivery-version-management` for full delivery artifact version chains and release bundles. Use this skill for the per-code-file ledger discipline inside implementation workflows.

## Reference Loading

- Read `references/code-file-change-ledger.md` before changing scoped source files or judging code-ledger readiness.
- Use `$delivery-version-management` scripts when available:
  - `delivery-version-management/scripts/update_code_change_ledger.py --stage before`
  - `delivery-version-management/scripts/update_code_change_ledger.py --stage after`

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Identify scoped source files: frontend, backend, prototype, config, SQL, or tests that own behavior.
2. Locate each sidecar ledger at `<code-file-directory>/__change_logs__/<code-file-name>.changes.md`.
3. Before editing, read or create the ledger and inspect functional inventory, known ranges, risks, and prior entries.
4. After editing, append a new version entry with summary, changed functionality, code ranges/stable anchors, affected contracts, verification, rollback note, related files, and reversible change evidence.
5. Require one of these reversible evidence forms for every changed text code file: inline unified diff, sidecar patch path plus hash, or explicit external VCS commit/bundle reference. A sha256 snapshot alone is only an integrity check and never proves what changed.
6. Report ledger status with changed files and unresolved follow-ups.

## Required Output

- Changed code files and ledger paths.
- Pre-change ledger read/create evidence.
- Post-change version entry summary.
- Changed code ranges or stable anchors.
- Unified diff, sidecar patch, or external VCS reference that shows the actual line-level change.
- Affected contracts and verification.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not mark changed source code ready when any scoped file lacks a sidecar ledger, pre-change read/create evidence, post-change entry, changed ranges, reversible change evidence, verification, or rollback notes.
- Do not mark a ledger `ready` when it only contains `sha256`, broad summaries, `full file`, or `TBD` code ranges. Those entries are `partial` unless an external VCS/release-bundle reference can reconstruct the exact previous content.
- Do not replace file-level ledger evidence with only a final chat summary, commit message, PR description, or broad delivery index.
