#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import shutil
import subprocess
import sys
import textwrap
from pathlib import Path
from typing import Any, Dict, List, Optional

try:
    import yaml  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    yaml = None


HTTP_METHODS = {"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"}

ALIASES = {
    "id": ["case id", "case_id", "caseid", "id", "用例id", "用例编号", "编号"],
    "title": ["title", "case name", "casename", "name", "用例名称", "场景", "测试点", "标题"],
    "category": ["category", "type", "类别", "类型", "测试类别"],
    "priority": ["priority", "优先级", "等级"],
    "feature": ["feature", "page", "module", "功能", "页面", "模块", "页面模块"],
    "test_type": ["test type", "automation type", "automation_type", "kind", "测试类型", "自动化类型"],
    "api": ["related api", "api", "endpoint", "接口", "相关接口", "接口路径"],
    "method": ["method", "http method", "请求方法"],
    "path": ["path", "url", "route", "路径", "页面路径", "地址"],
    "headers": ["headers", "header", "请求头"],
    "query": ["query", "params", "parameters", "param", "参数", "查询参数", "请求参数"],
    "body": ["body", "payload", "data", "请求体", "请求body"],
    "expected_status": ["expected status", "status", "status code", "状态码", "期望状态码"],
    "steps": ["steps", "step", "操作步骤", "步骤", "执行步骤"],
    "expected_frontend": [
        "expected frontend result",
        "expected ui",
        "frontend expected",
        "前端预期",
        "页面预期",
        "预期前端结果",
    ],
    "expected_api": [
        "expected api result",
        "api expected",
        "backend expected",
        "后端预期",
        "接口预期",
        "预期接口结果",
    ],
    "forbidden_text": [
        "forbidden text",
        "must not contain",
        "must not contain text",
        "forbidden ui text",
        "禁止文案",
        "禁用文案",
        "不可出现",
        "不应出现",
        "不得出现",
    ],
    "change_selector": [
        "change selector",
        "value change selector",
        "changed value selector",
        "filter change selector",
        "变化值选择器",
        "数值变化选择器",
        "筛选后变化选择器",
        "必须变化选择器",
    ],
    "evidence": ["evidence", "证据", "截图证据", "取证"],
    "tags": ["tags", "tag", "标签"],
}


def compact_key(value: str) -> str:
    return re.sub(r"[\s_\-:/：（）()]+", "", str(value).strip().lower())


ALIAS_LOOKUP = {
    compact_key(alias): field for field, aliases in ALIASES.items() for alias in aliases + [field]
}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig")


def split_markdown_row(line: str) -> List[str]:
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]
    return [cell.strip().replace("\\|", "|") for cell in line.split("|")]


def is_separator_row(line: str) -> bool:
    cells = split_markdown_row(line)
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", cell.strip()) for cell in cells)


def parse_markdown_table(text: str) -> List[Dict[str, Any]]:
    lines = [line for line in text.splitlines() if "|" in line]
    for index in range(len(lines) - 1):
        if is_separator_row(lines[index + 1]):
            headers = split_markdown_row(lines[index])
            rows: List[Dict[str, Any]] = []
            for line in lines[index + 2 :]:
                if "|" not in line or is_separator_row(line):
                    if rows:
                        break
                    continue
                cells = split_markdown_row(line)
                if len(cells) < 2:
                    continue
                padded = cells + [""] * (len(headers) - len(cells))
                rows.append(dict(zip(headers, padded[: len(headers)])))
            if rows:
                return rows
    raise ValueError("No Markdown table found in input file.")


def load_matrix(path: Path) -> List[Dict[str, Any]]:
    suffix = path.suffix.lower()
    text = read_text(path)
    if suffix == ".json":
        data = json.loads(text)
        return extract_cases(data)
    if suffix in {".yml", ".yaml"}:
        if yaml is None:
            raise RuntimeError("YAML input requires PyYAML. Install it or use JSON/CSV/Markdown.")
        data = yaml.safe_load(text)
        return extract_cases(data)
    if suffix == ".csv":
        return [dict(row) for row in csv.DictReader(text.splitlines())]
    return parse_markdown_table(text)


def extract_cases(data: Any) -> List[Dict[str, Any]]:
    if isinstance(data, list):
        return [ensure_dict(item) for item in data]
    if isinstance(data, dict):
        for key in ("cases", "test_cases", "matrix", "rows", "items"):
            value = data.get(key)
            if isinstance(value, list):
                return [ensure_dict(item) for item in value]
        if all(isinstance(value, dict) for value in data.values()):
            rows = []
            for key, value in data.items():
                row = dict(value)
                row.setdefault("id", key)
                rows.append(row)
            return rows
    raise ValueError("Input must be a case array or an object containing cases/test_cases/matrix.")


def ensure_dict(item: Any) -> Dict[str, Any]:
    if not isinstance(item, dict):
        raise ValueError(f"Each case must be an object/row, got {type(item).__name__}.")
    return dict(item)


def normalize_row_keys(row: Dict[str, Any]) -> Dict[str, Any]:
    normalized: Dict[str, Any] = {}
    extras: Dict[str, Any] = {}
    for key, value in row.items():
        canonical = ALIAS_LOOKUP.get(compact_key(key))
        if canonical:
            normalized[canonical] = value
        else:
            extras[str(key)] = value
    normalized["extra"] = extras
    return normalized


def clean_string(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, (dict, list)):
        return json.dumps(value, ensure_ascii=False)
    return str(value).strip()


def parse_json_or_key_values(value: Any) -> Any:
    if value is None or value == "":
        return None
    if isinstance(value, (dict, list, int, float, bool)):
        return value
    text = str(value).strip()
    if not text:
        return None
    try:
        return json.loads(text)
    except Exception:
        pass
    if any(separator in text for separator in ("&", ";", "；", "=>", "=")):
        parsed = parse_key_values(text)
        if isinstance(parsed, dict):
            return parsed
    if yaml is not None and ("\n" in text or ":" in text):
        try:
            loaded = yaml.safe_load(text)
            if isinstance(loaded, (dict, list)):
                return loaded
        except Exception:
            pass
    return parse_key_values(text)


def parse_key_values(text: str) -> Any:
    separators = ["&", ";", "\n", "；"]
    parts = [text]
    for separator in separators:
        if separator in text:
            parts = [part.strip() for part in re.split(r"[&;\n；]+", text) if part.strip()]
            break
    result: Dict[str, str] = {}
    for part in parts:
        if "=>" in part:
            key, value = part.split("=>", 1)
        elif "=" in part:
            key, value = part.split("=", 1)
        elif ":" in part:
            key, value = part.split(":", 1)
        else:
            return text
        result[key.strip()] = value.strip()
    return result if result else text


def split_steps(value: Any) -> List[Any]:
    if value is None or value == "":
        return []
    if isinstance(value, list):
        return value
    text = str(value).strip()
    if not text:
        return []
    lines = [line.strip() for line in re.split(r"\n|；|;\s*(?=[a-zA-Z_\u4e00-\u9fa5]+[:：])", text) if line.strip()]
    return [re.sub(r"^\d+[.)、]\s*", "", line) for line in lines]


def split_tags(value: Any) -> List[str]:
    if value is None or value == "":
        return []
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    return [part.strip() for part in re.split(r"[,，;；\s]+", str(value)) if part.strip()]


def split_assertion_list(value: Any) -> List[str]:
    if value is None or value == "":
        return []
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    text = str(value).strip()
    if not text:
        return []
    try:
        loaded = json.loads(text)
        if isinstance(loaded, list):
            return [str(item).strip() for item in loaded if str(item).strip()]
    except Exception:
        pass
    return [part.strip() for part in re.split(r"[,，;；\n]+", text) if part.strip()]


def parse_api_method_and_url(api: str, method: str, path: str) -> tuple[str, str]:
    method = method.strip().upper()
    target = path.strip() or api.strip()
    match = re.match(r"^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(.+)$", target, re.I)
    if match:
        method = method or match.group(1).upper()
        target = match.group(2).strip()
    if not method:
        match = re.match(r"^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(.+)$", api.strip(), re.I)
        if match:
            method = match.group(1).upper()
            target = match.group(2).strip()
    return (method if method in HTTP_METHODS else "GET", target)


def infer_kinds(row: Dict[str, Any]) -> List[str]:
    raw = " ".join(
        clean_string(row.get(key))
        for key in ("test_type", "category", "evidence", "tags")
        if clean_string(row.get(key))
    ).lower()
    kinds: List[str] = []
    if re.search(r"\bapi\b|接口|后端", raw):
        kinds.append("api")
    if re.search(r"\be2e\b|\bui\b|页面|前端|浏览器|端到端", raw):
        kinds.append("e2e")
    if re.search(r"visual|screenshot|snapshot|regression|截图|视觉|回归|布局", raw):
        kinds.append("visual")
    if not kinds:
        if clean_string(row.get("api")) or clean_string(row.get("method")):
            kinds.append("api")
        if row.get("steps") or clean_string(row.get("expected_frontend")) or clean_string(row.get("feature")):
            kinds.append("e2e")
        if re.search(r"截图|视觉|回归|布局|screenshot|visual", raw):
            kinds.append("visual")
    return list(dict.fromkeys(kinds or ["e2e"]))


def normalize_cases(rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    normalized_cases: List[Dict[str, Any]] = []
    for index, raw_row in enumerate(rows, start=1):
        row = normalize_row_keys(raw_row)
        kinds = infer_kinds(row)
        raw_api = clean_string(row.get("api"))
        raw_method = clean_string(row.get("method"))
        raw_path = clean_string(row.get("path"))
        method, api_url = (
            parse_api_method_and_url(raw_api, raw_method, raw_path)
            if "api" in kinds or raw_api or raw_method
            else ("GET", "")
        )
        case_id = clean_string(row.get("id")) or f"CASE-{index:03d}"
        title = clean_string(row.get("title")) or clean_string(row.get("feature")) or case_id
        ui_path = raw_path
        if ui_path and re.match(r"^/api(/|$)", ui_path):
            ui_path = ""
        case = {
            "id": case_id,
            "title": title,
            "category": clean_string(row.get("category")),
            "priority": clean_string(row.get("priority")),
            "feature": clean_string(row.get("feature")),
            "kinds": kinds,
            "method": method,
            "apiUrl": api_url,
            "route": ui_path or "/",
            "headers": parse_json_or_key_values(row.get("headers")) or {},
            "query": parse_json_or_key_values(row.get("query")) or {},
            "body": parse_json_or_key_values(row.get("body")),
            "expectedStatus": clean_string(row.get("expected_status")) or "2xx",
            "steps": split_steps(row.get("steps")),
            "expectedFrontend": clean_string(row.get("expected_frontend")),
            "expectedApi": clean_string(row.get("expected_api")),
            "forbiddenText": split_assertion_list(row.get("forbidden_text")),
            "changeSelector": clean_string(row.get("change_selector")),
            "evidence": clean_string(row.get("evidence")),
            "tags": split_tags(row.get("tags")),
            "extra": row.get("extra", {}),
        }
        normalized_cases.append(case)
    return {
        "all": normalized_cases,
        "api": [case for case in normalized_cases if "api" in case["kinds"]],
        "e2e": [case for case in normalized_cases if "e2e" in case["kinds"]],
        "visual": [case for case in normalized_cases if "visual" in case["kinds"]],
    }


def package_json(project_name: str) -> str:
    return json.dumps(
        {
            "name": project_name,
            "version": "0.1.0",
            "private": True,
            "scripts": {
                "test": "playwright test",
                "test:api": "playwright test tests/api.generated.spec.ts",
                "test:e2e": "playwright test tests/e2e.generated.spec.ts",
                "test:visual": "playwright test tests/visual.generated.spec.ts",
                "test:all": "playwright test",
                "update:snapshots": "playwright test tests/visual.generated.spec.ts --update-snapshots",
                "show-report": "playwright show-report",
            },
            "devDependencies": {
                "@playwright/test": "^1.44.0",
                "typescript": "^5.4.0",
                "wait-on": "^7.2.0",
            },
        },
        ensure_ascii=False,
        indent=2,
    ) + "\n"


PLAYWRIGHT_CONFIG = """import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
"""


API_SPEC = """import { expect, test } from '@playwright/test';

const fixture = require('../fixtures/test-cases.json');
const cases = fixture.api || [];

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\\/\\//i.test(value);
}

function buildApiUrl(input: string): string {
  if (!input) return '';
  if (isAbsoluteUrl(input)) return input;
  const base = process.env.API_BASE_URL || process.env.BACKEND_BASE_URL || '';
  if (!base) return input;
  return new URL(input, base.endsWith('/') ? base : `${base}/`).toString();
}

function expectedStatusMatches(actual: number, expected: unknown): boolean {
  if (expected === undefined || expected === null || expected === '') return actual >= 200 && actual < 300;
  const text = String(expected).trim().toLowerCase();
  if (/^\\d{3}$/.test(text)) return actual === Number(text);
  if (/^[1-5]xx$/.test(text)) {
    const start = Number(text[0]) * 100;
    return actual >= start && actual < start + 100;
  }
  if (/^\\d{3}\\s*-\\s*\\d{3}$/.test(text)) {
    const [min, max] = text.split('-').map((item) => Number(item.trim()));
    return actual >= min && actual <= max;
  }
  return actual >= 200 && actual < 300;
}

function authHeaders(headers: Record<string, string>): Record<string, string> {
  const token = process.env.AUTH_TOKEN || process.env.ACCESS_TOKEN || '';
  if (!token) return headers || {};
  return { Authorization: `Bearer ${token}`, ...(headers || {}) };
}

for (const tc of cases) {
  test(`[${tc.id}] ${tc.title}`, async ({ request }) => {
    if (!tc.apiUrl) test.skip(true, 'No API endpoint was provided for this case.');
    if (!process.env.API_BASE_URL && !process.env.BACKEND_BASE_URL && /^\\//.test(tc.apiUrl)) {
      test.skip(true, 'API_BASE_URL or BACKEND_BASE_URL is required for relative API paths.');
    }

    const response = await request.fetch(buildApiUrl(tc.apiUrl), {
      method: tc.method || 'GET',
      headers: authHeaders(tc.headers || {}),
      params: tc.query || undefined,
      data: tc.body || undefined,
    });

    expect(
      expectedStatusMatches(response.status(), tc.expectedStatus),
      `Expected status ${tc.expectedStatus || '2xx'}, got ${response.status()}`
    ).toBeTruthy();

    if (tc.expectedApi) {
      test.info().annotations.push({
        type: 'expected-api',
        description: String(tc.expectedApi),
      });
    }
  });
}
"""


E2E_SPEC = """import { expect, test, type Page } from '@playwright/test';

const fixture = require('../fixtures/test-cases.json');
const cases = fixture.e2e || [];

type Step = string | { action?: string; selector?: string; value?: string; url?: string; name?: string };
type StepState = { capturedText: Record<string, string> };

function parseStep(step: Step): { action: string; selector?: string; value?: string; url?: string; name?: string; raw?: string } {
  if (typeof step !== 'string') {
    return {
      action: String(step.action || '').toLowerCase(),
      selector: step.selector,
      value: step.value,
      url: step.url,
      name: step.name,
    };
  }
  const raw = step.trim();
  const match = raw.match(/^([a-zA-Z_\\-\\u4e00-\\u9fa5]+)\\s*[:：]\\s*(.*)$/);
  if (!match) return { action: 'manual', raw };
  const action = match[1].trim().toLowerCase().replace(/-/g, '_');
  const rest = match[2].trim();
  if (['goto', 'open', 'visit'].includes(action)) return { action: 'goto', url: rest };
  if (['click', 'check', 'uncheck', 'wait', 'expect_visible', 'expect_hidden', 'expect_url', 'screenshot'].includes(action)) {
    return { action, selector: rest, url: rest, name: rest };
  }
  const parts = rest.split(/\\s*=>\\s*/);
  if (parts.length >= 2) return { action, selector: parts[0], value: parts.slice(1).join(' => ') };
  return { action, selector: rest, raw };
}

function normalizeText(value: string): string {
  return value.replace(/\\s+/g, ' ').trim();
}

async function locatorText(page: Page, selector: string): Promise<string> {
  return normalizeText(await page.locator(selector).first().innerText({ timeout: 10_000 }));
}

async function expectTextChanged(page: Page, selector: string, before: string, message: string): Promise<void> {
  await expect
    .poll(async () => locatorText(page, selector), { timeout: 10_000, message })
    .not.toBe(normalizeText(before));
}

function requireValue(value: string | undefined, message: string): string {
  if (!value) throw new Error(message);
  return value;
}

async function runStep(page: Page, step: Step, tc: any, state: StepState): Promise<void> {
  const parsed = parseStep(step);
  const action = parsed.action;
  if (action === 'goto') {
    await page.goto(parsed.url || tc.route || '/');
  } else if (action === 'click') {
    await page.locator(parsed.selector || '').click();
  } else if (action === 'fill') {
    await page.locator(parsed.selector || '').fill(parsed.value || '');
  } else if (action === 'select') {
    await page.locator(parsed.selector || '').selectOption(parsed.value || '');
  } else if (action === 'check') {
    await page.locator(parsed.selector || '').check();
  } else if (action === 'uncheck') {
    await page.locator(parsed.selector || '').uncheck();
  } else if (action === 'press') {
    await page.locator(parsed.selector || '').press(parsed.value || 'Enter');
  } else if (action === 'wait') {
    const target = parsed.selector || '';
    if (/^\\d+$/.test(target)) await page.waitForTimeout(Number(target));
    else await page.locator(target).waitFor();
  } else if (action === 'expect_visible') {
    await expect(page.locator(parsed.selector || '')).toBeVisible();
  } else if (action === 'expect_hidden') {
    await expect(page.locator(parsed.selector || '')).toBeHidden();
  } else if (action === 'expect_text') {
    await expect(page.locator(parsed.selector || '')).toContainText(parsed.value || '');
  } else if (action === 'expect_no_text' || action === 'expect_not_text') {
    const selector = parsed.value ? parsed.selector || 'body' : 'body';
    const forbidden = parsed.value || parsed.selector || '';
    requireValue(forbidden, 'expect_no_text requires text to reject.');
    await expect(page.locator(selector)).not.toContainText(forbidden);
  } else if (action === 'capture_text') {
    const name = requireValue(parsed.selector, 'capture_text requires a capture name before =>.');
    const selector = requireValue(parsed.value, 'capture_text requires a selector after =>.');
    state.capturedText[name] = await locatorText(page, selector);
  } else if (action === 'expect_text_changed') {
    const name = requireValue(parsed.selector, 'expect_text_changed requires a capture name before =>.');
    const selector = requireValue(parsed.value, 'expect_text_changed requires a selector after =>.');
    const before = state.capturedText[name];
    requireValue(before, `No captured text found for "${name}". Add capture_text first.`);
    await expectTextChanged(page, selector, before, `Expected text for ${selector} to change from captured "${name}".`);
  } else if (action === 'expect_value_change_after_filter') {
    const valueSelector = requireValue(parsed.selector, 'expect_value_change_after_filter requires value selector before =>.');
    const triggerSelector = requireValue(parsed.value, 'expect_value_change_after_filter requires filter trigger selector after =>.');
    const before = await locatorText(page, valueSelector);
    await page.locator(triggerSelector).click();
    await page.waitForLoadState('networkidle').catch(() => undefined);
    await expectTextChanged(page, valueSelector, before, `Expected ${valueSelector} to change after ${triggerSelector}.`);
  } else if (action === 'expect_url') {
    await expect(page).toHaveURL(new RegExp(parsed.url || parsed.selector || ''));
  } else if (action === 'screenshot') {
    const name = sanitize(parsed.name || `${tc.id}-step`);
    await page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  } else {
    const message = `Unsupported or manual step: ${parsed.raw || JSON.stringify(step)}`;
    test.info().annotations.push({ type: 'manual-step', description: message });
    if (process.env.STRICT_E2E_STEPS === 'true') throw new Error(message);
  }
}

function sanitize(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120) || 'screenshot';
}

for (const tc of cases) {
  test(`[${tc.id}] ${tc.title}`, async ({ page }) => {
    await page.goto(tc.route || '/');
    await page.waitForLoadState('networkidle').catch(() => undefined);
    const state: StepState = { capturedText: {} };
    const changeSelector = String(tc.changeSelector || '').trim();
    const initialChangeText = changeSelector ? await locatorText(page, changeSelector) : '';
    for (const step of tc.steps || []) {
      await runStep(page, step, tc, state);
    }
    if (changeSelector) {
      await expectTextChanged(
        page,
        changeSelector,
        initialChangeText,
        `Expected ${changeSelector} to change after case steps.`
      );
    }
    for (const forbidden of tc.forbiddenText || []) {
      await expect(page.locator('body')).not.toContainText(String(forbidden));
    }
    if (tc.expectedFrontend) {
      test.info().annotations.push({
        type: 'expected-frontend',
        description: String(tc.expectedFrontend),
      });
    }
  });
}
"""


VISUAL_SPEC = """import { expect, test } from '@playwright/test';

const fixture = require('../fixtures/test-cases.json');
const cases = fixture.visual || [];

function parseViewports(): Array<{ name: string; width: number; height: number }> {
  const raw = process.env.VISUAL_VIEWPORTS || '1440x900,390x844';
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [width, height] = item.split('x').map((part) => Number(part));
      return { name: item, width, height };
    })
    .filter((item) => item.width > 0 && item.height > 0);
}

function sanitize(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120) || 'snapshot';
}

for (const tc of cases) {
  for (const viewport of parseViewports()) {
    test(`[${tc.id}] ${tc.title} @ ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(tc.route || '/');
      await page.waitForLoadState('networkidle').catch(() => undefined);
      const maxDiffPixelRatio = Number(process.env.VISUAL_MAX_DIFF_PIXEL_RATIO || '0.01');
      await expect(page).toHaveScreenshot(`${sanitize(tc.id)}-${sanitize(viewport.name)}.png`, {
        fullPage: true,
        maxDiffPixelRatio,
      });
    });
  }
}
"""


ENV_EXAMPLE = """# Generated automation environment
FRONTEND_BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:8080

# Optional auth header support for API tests
AUTH_TOKEN=
ACCESS_TOKEN=

# Optional local/CI start commands. Keep secrets out of these values.
APP_START_COMMAND=
API_START_COMMAND=

# Screenshot regression tuning
VISUAL_VIEWPORTS=1440x900,390x844
VISUAL_MAX_DIFF_PIXEL_RATIO=0.01
STRICT_E2E_STEPS=false
"""


GITIGNORE = """node_modules/
playwright-report/
test-results/
.env
"""


RUN_SCRIPT = """#!/usr/bin/env bash
set -euo pipefail

if [ ! -d node_modules ]; then
  npm install
fi

npx playwright install
npm run test:all
"""


CI_WORKFLOW = """name: Generated Automated Tests

on:
  pull_request:
  push:
  workflow_dispatch:

jobs:
  automated-tests:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    env:
      FRONTEND_BASE_URL: ${{ vars.FRONTEND_BASE_URL }}
      API_BASE_URL: ${{ vars.API_BASE_URL }}
      APP_START_COMMAND: ${{ vars.APP_START_COMMAND }}
      API_START_COMMAND: ${{ vars.API_START_COMMAND }}
      AUTH_TOKEN: ${{ secrets.AUTH_TOKEN }}
      ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
      VISUAL_VIEWPORTS: ${{ vars.VISUAL_VIEWPORTS }}
      VISUAL_MAX_DIFF_PIXEL_RATIO: ${{ vars.VISUAL_MAX_DIFF_PIXEL_RATIO }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci || npm install

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Start optional services
        shell: bash
        run: |
          if [ -n "${API_START_COMMAND:-}" ]; then
            bash -lc "$API_START_COMMAND" &
          fi
          if [ -n "${APP_START_COMMAND:-}" ]; then
            bash -lc "$APP_START_COMMAND" &
          fi
          if [ -n "${API_BASE_URL:-}" ]; then
            npx wait-on "$API_BASE_URL" --timeout 60000 || true
          fi
          if [ -n "${FRONTEND_BASE_URL:-}" ]; then
            npx wait-on "$FRONTEND_BASE_URL" --timeout 60000 || true
          fi

      - name: Run generated tests
        run: npm run test:all

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: |
            playwright-report/
            test-results/
          if-no-files-found: ignore
"""


def env_override(name: str, value: str) -> str:
    if not value:
        return ""
    return f"{name}={value}\n"


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def safe_project_name(path: Path) -> str:
    name = re.sub(r"[^a-zA-Z0-9._-]+", "-", path.name.lower()).strip("-")
    return name or "generated-test-automation"


def generate_project(
    matrix_path: Path,
    out_dir: Path,
    overwrite: bool,
    project_name: Optional[str],
    frontend_base_url: str,
    api_base_url: str,
) -> Dict[str, int]:
    rows = load_matrix(matrix_path)
    fixture = normalize_cases(rows)

    if out_dir.exists() and any(out_dir.iterdir()):
        if not overwrite:
            raise FileExistsError(f"{out_dir} is not empty. Pass --overwrite to replace generated files.")
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    name = project_name or safe_project_name(out_dir)
    write_file(out_dir / "package.json", package_json(name))
    write_file(out_dir / "playwright.config.ts", PLAYWRIGHT_CONFIG)
    write_file(out_dir / "tests/api.generated.spec.ts", API_SPEC)
    write_file(out_dir / "tests/e2e.generated.spec.ts", E2E_SPEC)
    write_file(out_dir / "tests/visual.generated.spec.ts", VISUAL_SPEC)
    write_file(out_dir / "fixtures/test-cases.json", json.dumps(fixture, ensure_ascii=False, indent=2) + "\n")
    env_content = ENV_EXAMPLE
    if frontend_base_url:
        env_content = re.sub(r"^FRONTEND_BASE_URL=.*$", f"FRONTEND_BASE_URL={frontend_base_url}", env_content, flags=re.M)
    if api_base_url:
        env_content = re.sub(r"^API_BASE_URL=.*$", f"API_BASE_URL={api_base_url}", env_content, flags=re.M)
    write_file(out_dir / ".env.example", env_content)
    write_file(out_dir / ".gitignore", GITIGNORE)
    write_file(out_dir / "scripts/run-generated-tests.sh", RUN_SCRIPT)
    write_file(out_dir / ".github/workflows/automated-tests.yml", CI_WORKFLOW)
    os.chmod(out_dir / "scripts/run-generated-tests.sh", 0o755)

    return {key: len(value) if isinstance(value, list) else 0 for key, value in fixture.items()}


def run_command(command: List[str], cwd: Path) -> None:
    print(f"+ {' '.join(command)}", flush=True)
    subprocess.run(command, cwd=str(cwd), check=True)


def run_generated(out_dir: Path, mode: str) -> None:
    if mode == "none":
        return
    if mode in {"install", "api", "e2e", "visual", "all"}:
        run_command(["npm", "install"], out_dir)
        run_command(["npx", "playwright", "install"], out_dir)
    if mode == "install":
        return
    script = {
        "api": "test:api",
        "e2e": "test:e2e",
        "visual": "test:visual",
        "all": "test:all",
    }[mode]
    run_command(["npm", "run", script], out_dir)


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Generate API, E2E, visual regression, and CI test automation from a test matrix."
    )
    parser.add_argument("matrix", help="Path to JSON/YAML/CSV/Markdown test matrix.")
    parser.add_argument("--out", default="generated-test-automation", help="Output directory.")
    parser.add_argument("--project-name", default=None, help="Generated npm package name.")
    parser.add_argument("--frontend-base-url", default="", help="Default FRONTEND_BASE_URL in .env.example.")
    parser.add_argument("--api-base-url", default="", help="Default API_BASE_URL in .env.example.")
    parser.add_argument("--overwrite", action="store_true", help="Replace an existing output directory.")
    parser.add_argument(
        "--run",
        choices=["none", "install", "api", "e2e", "visual", "all"],
        default="none",
        help="Optionally install dependencies and run generated tests.",
    )
    args = parser.parse_args(argv)

    matrix_path = Path(args.matrix).expanduser().resolve()
    out_dir = Path(args.out).expanduser().resolve()
    if not matrix_path.exists():
        raise FileNotFoundError(matrix_path)

    counts = generate_project(
        matrix_path=matrix_path,
        out_dir=out_dir,
        overwrite=args.overwrite,
        project_name=args.project_name,
        frontend_base_url=args.frontend_base_url,
        api_base_url=args.api_base_url,
    )
    print(
        textwrap.dedent(
            f"""
            Generated automation project: {out_dir}
            Cases: all={counts['all']} api={counts['api']} e2e={counts['e2e']} visual={counts['visual']}

            Next:
              cd {out_dir}
              npm install
              npx playwright install
              npm run test:all
            """
        ).strip()
    )
    run_generated(out_dir, args.run)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1)
