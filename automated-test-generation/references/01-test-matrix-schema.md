# Test Matrix Schema

## Supported Input Formats

Use JSON, YAML, CSV, or a Markdown table. JSON/YAML can be either an array of cases or an object with `cases`, `test_cases`, or `matrix`.

## Field Aliases

The generator normalizes common Chinese and English headers:

| Normalized field | Accepted examples |
| --- | --- |
| `id` | `Case ID`, `case_id`, `id`, `用例ID`, `用例编号`, `编号` |
| `title` | `Title`, `Case Name`, `用例名称`, `场景`, `测试点` |
| `category` | `Category`, `类型`, `类别`, `测试类别` |
| `priority` | `Priority`, `优先级`, `P0`, `P1` |
| `feature` | `Feature`, `Page`, `Module`, `页面`, `模块`, `功能` |
| `test_type` | `Test Type`, `automation_type`, `自动化类型`, `测试类型` |
| `api` | `Related API`, `API`, `Endpoint`, `接口`, `相关接口` |
| `method` | `Method`, `HTTP Method`, `请求方法` |
| `path` | `Path`, `URL`, `Route`, `路径`, `页面路径` |
| `headers` | `Headers`, `请求头` |
| `query` | `Query`, `Params`, `参数`, `查询参数` |
| `body` | `Body`, `Payload`, `请求体` |
| `expected_status` | `Expected Status`, `状态码`, `期望状态码` |
| `steps` | `Steps`, `操作步骤`, `步骤` |
| `expected_frontend` | `Expected Frontend Result`, `Expected UI`, `前端预期`, `页面预期` |
| `expected_api` | `Expected API Result`, `后端预期`, `接口预期` |
| `evidence` | `Evidence`, `证据`, `截图证据` |
| `tags` | `Tags`, `标签` |

## Test Type Rules

Set `test_type` to one or more values:

- `api`: generate request-level API tests.
- `e2e`: generate browser interaction tests.
- `visual`: generate screenshot regression tests.

When `test_type` is absent, the generator infers:

- `api` when endpoint/method/API fields exist.
- `e2e` when steps, page, route, or frontend expected result exists.
- `visual` when category/evidence/tags mention screenshot, visual regression, layout, `截图`, `视觉`, `回归`, or `布局`.

## API Case Conventions

Recommended fields:

```json
{
  "Case ID": "API-001",
  "Test Type": "api",
  "Title": "列表接口默认查询成功",
  "Method": "GET",
  "Endpoint": "/api/orders",
  "Params": {"page": 1, "pageSize": 20},
  "Headers": {"X-Client": "qa"},
  "Expected Status": 200
}
```

`Headers`, `Params`, and `Body` may be JSON, YAML objects, or compact key-value strings such as `page=1&pageSize=20` or `X-Client: qa; X-Role: admin`.

## E2E Step DSL

Prefer explicit selector/action lines in the `Steps` field. Separate steps with new lines or semicolons.

Supported forms:

```text
goto: /orders
click: text=查询
fill: input[name="keyword"] => ACME
select: select[name="region"] => 华东
check: input[name="onlyRisk"]
uncheck: input[name="archived"]
press: input[name="keyword"] => Enter
wait: text=加载完成
wait: 500
expect_visible: text=订单列表
expect_hidden: text=加载中
expect_text: [data-testid="total"] => 120
expect_url: /orders
screenshot: orders-filtered
```

Unsupported natural-language steps are kept as annotations. Set `STRICT_E2E_STEPS=true` to fail when a step cannot be automated.

## Visual Case Conventions

Recommended fields:

```json
{
  "Case ID": "VIS-001",
  "Test Type": "visual",
  "Title": "订单总览默认页截图回归",
  "Path": "/orders",
  "Evidence": "screenshot baseline"
}
```

Use `VISUAL_VIEWPORTS` to override default viewport coverage:

```bash
VISUAL_VIEWPORTS=1440x900,390x844 npm run test:visual
```

Use `VISUAL_MAX_DIFF_PIXEL_RATIO` to tune screenshot diff tolerance.
