# Typography Format And Tokens

This file was split from `05-report-charts-tables-format-guidelines.md`. Load it only for this focused rule group; use `05-report-charts-tables-format-guidelines.md` as the routing index.

## Typography And Format

Fonts:

Use the project or Haier system font stack first. Do not force a one-off font family inside chart/table components when the page shell already defines typography tokens.

| Type | Font |
| --- | --- |
| Chinese | Project/Haier system font stack, with Microsoft YaHei as a Windows fallback |
| English/digits | Project/Haier system font stack, with Arial as a fallback; use tabular numerals for comparable values |

Text:

| Text type | Size | Line height | Color |
| --- | ---: | ---: | --- |
| Page title | `20px` | `30px` | `text.primary` / Haier fallback `#262626` |
| Large title | `16px` | `24px` | `text.primary` / Haier fallback `#262626` |
| Small title | `14px` | `22px` | `text.secondary` / Haier fallback `#595959` |
| Body | `14px` | `22px` | `text.secondary` / Haier fallback `#595959` |
| Note | `12px` | `18px` | `text.tertiary` / Haier fallback `#8C8C8C` |

Number format follows `11-number-precision-display-rules.md`. The table below is only the compact default for common report UI; metric dictionaries or project contracts can override it with explicit `NumericFormatContract` evidence.

| Type | Rule | Example |
| --- | --- | --- |
| Negative / change value | Color by metric direction and business meaning, not raw sign alone; avoid rounded `-0` | `-1,234` |
| Count / integer | Thousands separator, no decimal | `1,234,567` |
| Amount | Declare raw unit, display unit, scale, and precision | `1,234.5 万元` |
| Percent / rate | Display `%`; main UI precision follows contract, default `0-1`, tooltip default `2` | `86.5%` |
| Small non-zero share | Show configured threshold when rounded zero would hide meaning | `<0.1%` |
| Empty / null | Missing data displays `--`; true zero displays `0` | `--` |
| Denominator zero | Display `--` or `不可计算`, with tooltip explanation | `--` |
| Extreme anomaly | Follow口径; never show raw `NaN`, `Infinity`, or `undefined` | `--` |

Date/time:

| Type | Format | Example |
| --- | --- | --- |
| Date | `YYYY-MM-DD` | `2026-06-09` |
| Month | `YYYY-MM` | `2026-06` |
| Year | `YYYY` | `2026` |
| DateTime | `YYYY-MM-DD HH:mm:ss` | `2026-06-09 08:30:00` |
| Range | `YYYY-MM-DD ~ YYYY-MM-DD` | `2026-06-01 ~ 2026-06-09` |

Copywriting:

- Titles use concise noun phrases.
- Buttons use verbs: `查询`, `重置`, `导出`, `确认`.
- Explanations should tell why and how to handle, not only "error".
- Empty state copy explains current state, such as `暂无数据` or `当前筛选条件下暂无数据`.
- Error copy gives next action, such as `加载失败，请刷新重试`.
- Do not expose API field names or technical terms in UI.


## Token Suggestions

Color tokens:

Use semantic project/template tokens first. The values below are Haier-aligned fallbacks or roles, not permission to create one-off raw colors.

| Token | Value/source |
| --- | --- |
| `--color-primary` | `brand.primary` / Haier fallback `#0073E5` |
| `--color-primary-hover` | generated `HBlue` hover token or documented project token |
| `--color-primary-light` | generated `HBlue-1`/light brand token or documented project token |
| `--color-text-title` | `text.primary` / Haier fallback `#262626` |
| `--color-text-primary` | `text.secondary` / Haier fallback `#595959` |
| `--color-text-secondary` | `text.tertiary` / Haier fallback `#8C8C8C` |
| `--color-border` | `border.default` / Haier fallback `#D9D9D9` |
| `--color-divider` | `divider.default` / Haier fallback `#F0F0F0` |
| `--color-grid-line` | chart grid token, default `#E5E5E5` unless brand/template overrides |
| `--color-table-header-bg` | table header surface token, default `#FAFAFA` unless brand/template overrides |
| `--color-disabled-bg` | disabled/background token / Haier fallback `#F5F5F5` |

Spacing tokens:

| Token | Value |
| --- | --- |
| `--spacing-2` | `2px` |
| `--spacing-4` | `4px` |
| `--spacing-8` | `8px` |
| `--spacing-12` | `12px` |
| `--spacing-16` | `16px` |
| `--spacing-24` | `24px` |
| `--module-gap` | `16px` |
| `--module-title-content-gap` | `24px` |
| `--button-gap` | `8px` |
| `--input-inner-padding` | `12px` |
