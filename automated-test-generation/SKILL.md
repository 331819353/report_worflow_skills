---
name: automated-test-generation
description: "用于根据测试矩阵、测试用例表、验收用例、API/页面覆盖矩阵生成可运行自动化测试工程。用户提到自动化测试生成、根据测试矩阵生成API测试、E2E测试、截图回归测试、Playwright/Cypress测试、CI执行脚本、GitHub Actions、把测试样例转成代码、回归测试脚本时触发；不负责人工测试结论。"
---

# Automated Test Generation

## Overview

Use this skill to turn a structured 测试矩阵 into runnable automation artifacts: API tests, E2E/browser tests, screenshot regression tests, local execution scripts, and CI workflow files.

The bundled generator is intentionally generic. It produces a standalone Playwright-based test project from JSON/YAML/CSV/Markdown table input, then the generated project can run locally or in CI with environment variables. If the user explicitly asks for Cypress, use the same matrix schema and adapt the generated structure to Cypress, or state that the bundled deterministic generator currently targets Playwright.

## Inputs

Required:

- 测试矩阵 file: JSON, YAML, CSV, or Markdown table.

Recommended matrix fields:

- Case ID / 用例ID.
- Category / 类别.
- Priority / 优先级.
- Feature/Page/Module / 页面模块.
- Test Type / 自动化类型: `api`, `e2e`, `visual`, or comma-separated combinations.
- Related API / Endpoint / Method / Path.
- Preconditions / 前置条件.
- Steps / 操作步骤.
- Test Data / Params / Body / Headers.
    - Expected API Result / Expected Status.
    - Expected Frontend Result / Expected UI.
    - Forbidden Text / 禁止文案: page text that must not appear, such as `pt`, `p.p.`, or `percentage point` for Chinese rate labels.
    - Change Selector / 变化值选择器: a locator whose text must change after the case steps exercise a non-default filter.
    - Evidence / 证据.
    - Tags / 标签.

Use `$delivery-artifact-template-management` when the user needs the automation test matrix schema, supported field aliases, step DSL, or input examples.

## Workflow

1. Normalize the matrix.
   Confirm each executable case has a stable ID, title, type, and enough target information. If type is absent, infer `api` from endpoint/method fields, infer `e2e` from UI steps/page fields, and infer `visual` from screenshot/regression/layout evidence.

2. Generate the automation project.
   Run:

   ```bash
   python3 automated-test-generation/scripts/generate_test_automation.py <matrix-file> --out <output-dir> --overwrite
   ```

   Optional:

   ```bash
   python3 automated-test-generation/scripts/generate_test_automation.py <matrix-file> \
     --out <output-dir> \
     --frontend-base-url http://localhost:3000 \
     --api-base-url http://localhost:8080 \
     --overwrite
   ```

3. Inspect generated files.
   The generator creates:

   - `fixtures/test-cases.json`: normalized case fixture.
   - `tests/api.generated.spec.ts`: API request/contract smoke tests.
   - `tests/e2e.generated.spec.ts`: browser E2E tests using the matrix step DSL.
   - `tests/visual.generated.spec.ts`: screenshot regression tests.
   - `playwright.config.ts`, `package.json`, `.env.example`.
   - `.github/workflows/automated-tests.yml`.
   - `scripts/run-generated-tests.sh`.

4. Fill environment and secrets.
   Use `FRONTEND_BASE_URL`, `API_BASE_URL`, `AUTH_TOKEN`, and optional start commands. For protected systems, prefer CI variables/secrets rather than committing credentials.

5. Run locally.

   ```bash
   cd <output-dir>
   npm install
   npx playwright install
   npm run test:api
   npm run test:e2e
   npm run test:visual
   npm run test:all
   ```

6. Update screenshots intentionally.
   Baselines are created/updated only when the current UI is accepted as correct:

   ```bash
   npm run update:snapshots
   ```

7. Use executable regression assertions when matrix intent is specific.
   Supported E2E step DSL includes `expect_text`, `expect_no_text`, `capture_text`, `expect_text_changed`, and `expect_value_change_after_filter`. Prefer these over free-text expectations for metric unit checks and filter-linked value-change checks.

8. Report limitations instead of overstating coverage.
   If matrix steps are natural language and cannot be mapped to the DSL, the generated E2E test records an annotation and can be made strict with `STRICT_E2E_STEPS=true`. Mark these cases as pending/manual in the handoff unless selectors/actions are supplied.

## Execution Script

The generator supports optional execution:

```bash
python3 automated-test-generation/scripts/generate_test_automation.py <matrix-file> --out <output-dir> --overwrite --run all
```

Use `--run install`, `--run api`, `--run e2e`, `--run visual`, or `--run all`. Running tests may install npm packages and start browser dependencies, so only use it when the local environment is ready.

## Quality Checklist

- Generated tests preserve traceability to the original case ID and title.
- API cases include method, path/url, expected status, headers/query/body when available.
- E2E cases use executable selectors/actions or are clearly annotated as manual/unsupported.
- Metric display cases use forbidden-text assertions when the expected result says Chinese rate/change labels must not use `pt`, `p.p.`, or `percentage point`.
- Filter-linkage cases use a change selector or explicit `capture_text`/`expect_text_changed`/`expect_value_change_after_filter` steps when the expected behavior is visible data change.
- Visual cases define a route/page and produce deterministic Playwright snapshots.
- CI workflow uploads Playwright report, test results, screenshots, and traces.
- Credentials, tokens, and environment-specific URLs are read from env variables, not hard-coded into committed tests.
