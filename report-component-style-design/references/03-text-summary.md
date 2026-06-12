# Text Summary And Analysis Insight Rules

Use for executive conclusions, diagnostic findings, risk explanations, abstracts, recommendations, and chart annotations. In report products, these are not decorative text areas. They are decision-support components that explain:

- What happened.
- Why it happened.
- How large the impact is.
- Whether it is abnormal.
- What should happen next.
- Whether the data and metric definition are trustworthy.

## Component Family

Analysis & Insight components form a separate component family even when they are implemented as `visualType: 'text-summary'`.

Default subtype groups:

| Group | Subtypes |
| --- | --- |
| Conclusion | 结论卡, 分析摘要条, 复盘卡 |
| Insight | 洞察卡/关键发现卡, 趋势解读卡, 排名解读卡, 关键变化说明卡 |
| Diagnosis | 异常告警卡, 归因分析卡, 影响因素卡, 目标达成诊断卡, 风险提示卡 |
| Recommendation | 建议卡/行动建议卡, 分析任务卡/待办卡 |
| Explanation | 数据口径说明卡/指标定义卡, 数据质量说明卡, 预测说明卡, 图表注释/标注组件 |
| State | 解释型空状态卡, 权限/无结果/数据延迟说明卡 |

One component should carry one subtype and one main point. If a card needs multiple conclusions, split it into a multi-insight list with `2-3` visible items or move the detail to a drawer.

## Required Contract

Implementation-ready specs must declare `analysisInsightContract` or equivalent local metadata:

```ts
type AnalysisInsightContract = {
  subtype: string;
  insightFamily: 'conclusion' | 'insight' | 'diagnosis' | 'recommendation' | 'explanation' | 'state';
  conclusion: string;
  evidence?: string[];
  affectedObjects?: string[];
  compareWith?: string;
  changeValue?: string;
  reasonFields?: string[];
  recommendedActions?: string[];
  confidence?: 'high' | 'medium' | 'low' | 'insufficient';
  definitionRefs?: string[];
  sourceDataset?: string;
  freshnessField?: string;
  localFilters?: string[];
  tooltipPayload?: string[];
  detailRoute?: string;
  stateRules: string[];
};
```

Do not pass a text summary as implementation-ready when it only contains generic copy such as `整体表现良好`, `建议持续关注`, `数据有所波动`, or `智能分析结果`.

## Structure

- Start with the conclusion, then show supporting metric, reason, and suggested action if space allows.
- Keep short summaries vertically centered. Top-align multi-line narratives.
- Highlight only key numbers, status words, or action verbs.
- Avoid paragraph-length content in small grid blocks.
- In `sampleRestore`, added conclusions, insights, or status summaries must be embedded into an existing sample-equivalent region such as the header/control area, panorama header, section head, or summary card. Do not create a new standalone horizontal band unless the source sample already has an equivalent band.
- Added summary components must be labeled as enhancements when they are not present in the sample and must not change the first viewport or main body layout.

## Copy Length Budget

| Element | Budget |
| --- | --- |
| Title | `2-8` Chinese characters |
| Main conclusion | `12-32` Chinese characters |
| Explanation | `1-2` visible lines |
| Multi-insight list | `2-3` visible items by default |
| One insight item | `<=24` Chinese characters when in a compact list |
| Action suggestions | `1-3` items |
| Tooltip/detail popover | `3-6` short lines |

Avoid more than `3` visible decision items, too many icons, full-card red backgrounds, independent filters on every explanation, and long essay blocks inside report cards. Overflow insight items move to tooltip, drawer, detail route, or an expanded state with a stable height.

## Anatomy And Placement

Default anatomy:

- Type marker or weak status label.
- Optional semantic icon, `14-18px`.
- Title.
- Required main conclusion.
- Evidence line: metric, baseline, comparison, affected object, or source.
- Optional suggested action or detail route.
- Optional confidence, definition, freshness, or quality note.
- Optional component-local filter.

Use the shared coordinate system from `12-internal-placement-algorithms.md`:

```text
W/H = component body size
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
```

Padding tiers:

| Width | Padding |
| ---: | ---: |
| `W < 280px` | `12px` |
| `280px <= W < 480px` | `16px` |
| `480px <= W < 720px` | `20px` |
| `W >= 720px` | `24px` |

Slot rules:

- Type marker, title, and icon start top-left.
- Component-local filter, action, or detail link uses top-right only when the title still fits.
- Main conclusion sits below the title and keeps priority over evidence.
- Evidence sits below the conclusion and may clamp before the conclusion.
- Action links use bottom-right or the last line after evidence.
- Freshness, source, definition, and confidence are bottom-left or tooltip-linked.

Height budget:

```text
cardH =
  P * 2
  + headerH      // 20-28
  + conclusionH  // lineHeight * lines
  + evidenceH    // 0-48
  + footerH      // 0-32
  + visibleGaps

cardH <= H
```

If the budget fails, hide in order: decoration icon, secondary evidence, freshness/source line, action text label, then move detail to tooltip/drawer. Never hide the main conclusion without a disclosure path.

## Size Tiers

| Type | Width | Height | Use |
| --- | ---: | ---: | --- |
| Analysis summary bar | `280-960px` | `36-56px` | One-line page/block summary |
| Small insight card | `220-360px` | `88-128px` | One conclusion plus one evidence line |
| Standard insight card | `320-560px` | `120-180px` | Conclusion, evidence, optional action |
| Enhanced diagnosis card | `480-720px` | `160-240px` | Top reasons, actions, confidence |
| Side insight panel | `220-320px` | `240-480px` | Chart-side insight list |
| Annotation bubble | `120-240px` | `40-96px` | Point/range/event note on a chart |

## Component-Internal Local Filters

Local filters are optional. Inherit page/global filters, Composite Panel filters, and chart/table filters first.

Use a component-local filter only when it changes the explanation view without changing report scope, metric definitions, table schema, or page-level data:

- 全部 / 异常 / 建议.
- 本月 / 本季 / 本年.
- 实际 / 预测.
- 高 / 中 / 低风险.
- 原因 / 影响 / 建议.

Filter geometry:

```text
filterH = 24-28px
optionW = clamp(44px, textWidth + 24px, 96px)
filterMaxW = min(CW * 0.45, 280px)
```

Place it top-right only when the title and conclusion still fit. If it fails width or has more than `4` options, collapse to one compact capsule dropdown. The filter affects only this component or declared local group.

## Typography

| Element | Size | Weight | Line height |
| --- | ---: | ---: | ---: |
| Type label | `11-12px` | `500-600` | `16px` |
| Title | `13-14px` | `600` | `18-20px` |
| Main conclusion | `14-16px` | `500-600` | `20-24px` |
| Emphasized value | `16-24px` | `600-700` | `22-30px` |
| Body/evidence | `12-13px` | `400` | `18-20px` |
| Auxiliary/source | `11-12px` | `400` | `16-18px` |
| Action | `12px` | `400-500` | `16px` |
| Tooltip | `12px` | `400` | `18px` |

Numbers inside summaries should use the same precision and semantic colors as related KPI/chart components. Rate/change numbers inside summaries use `%` for Chinese UI labels. Positive change rates use red text with an upward SVG/icon, negative change rates use green text with a downward SVG/icon, and zero values use neutral styling.

## Visual Treatment

- Text summaries inherit the surrounding page shell tokens: surface, spacing, border/radius, typography, density, and semantic colors.
- Default surface is the normal card or a weak neutral surface. Warning, risk, success, and theme tints must be light.
- Avoid strong full-card fills, especially full red warning cards.
- Border is `1px` weak. Radius defaults to `8-12px`; summary bars and annotation bubbles use `6-8px`.
- Icons are semantic only, `14-18px`, and never the visual anchor.
- Text must not compete with the primary chart or table it explains.

## Subtype Rules

- Conclusion card: width `320-560px`, height `96-144px`, one sentence conclusion plus one evidence line, max `3` visible lines.
- Insight card: `2-3` visible insights by default; each item is `22-28px` high; emphasize numbers only. Additional insights use `+N`, tooltip, drawer, or detail route rather than expanding the card.
- Anomaly alert card: object, metric, and magnitude are required; use weak warning tint or a `3-4px` left bar, not full-card red.
- Attribution card: name the cause and preferred contribution value; default max `3` causes.
- Impact factor card: Top `3` default, Top `5` max; positive/negative contribution is clear and values right-align.
- Comparison card: state the comparison baseline and difference amount/rate.
- Trend interpretation card: state direction and duration; avoid vague `有所变化`.
- Target diagnosis card: current, target, and gap are required; forecast content must be marked `预计`.
- Recommendation/action card: `1-3` actionable items, with detail/action entry such as `查看详情`, `创建任务`, or `去处理`.
- Risk card: risk object, level, impact, and action are required; visual style stays weak-warning.
- Definition/metric explanation card: default collapsed or tooltip-based; complex definitions open drawer/popover.
- Data quality card: show status, scope, freshness, confidence, and action; do not confuse data-quality issues with business anomalies.
- Chart annotation: point, interval, threshold, event, or anomaly bubble; max `3` annotations; `120-240px` wide, `40-96px` high; leader line `12-48px`; do not cover main data.
- Summary bar: no title, one sentence, `36-56px` high, `12-16px` horizontal padding, one line preferred and max two lines.
- Prediction card: show forecast value, time range, confidence, and drivers; mark as `预计` and do not state as fact.
- Empty/permission/no-result/delay card: explain reason, impact, and next step; do not show only `暂无数据`.
- Task card: task title/action are required; owner, deadline, and status are recommended.

## With Charts And Composite Panels

- Above chart: conclusion first, then evidence; keep it compact.
- Right of chart: use `insightW = clamp(200px, W * 0.28, 320px)`.
- Below chart: summary or conclusion follows the chart, not a second title band.
- Inside Composite Panels: insight cards may take at most `25%` of the composite area unless the panel is explicitly an explanation panel. The main chart/table remains primary.
- Annotations live in the chart coordinate layer and must not cover axis labels, legends, or selected data marks.

## Responsive Rules

| Condition | Behavior |
| --- | --- |
| `W < 280px` or `H < 96px` | Hide subtitle/evidence, shrink or hide icon, keep conclusion to `1-2` lines, collapse action/filter |
| `280px <= W < 560px` and `H >= 120px` | Title, conclusion, one evidence line, light status |
| `W >= 560px` and `H >= 160px` | Multi-insight list, Top3 reasons, action suggestions, right-side action |

## States

- Loading: skeleton title plus text rows.
- Generating: `分析生成中`, with stable height.
- Insufficient data: `当前数据不足以生成结论`, plus missing reason or next step.
- Empty: explain why no records matched and how to recover.
- Data delay: use data-quality wording and freshness.
- Error: `分析结果获取失败`, with retry/detail action.
- No permission: explain scope and contact/action path.
- Filter no-result: name the filter condition that caused no result.
- Long content: clamp and disclose with expand/drawer.

## Overflow

- Long organization, customer, product, or project names can wrap to two lines.
- Do not let text overlap actions or decorative icons.
- Reserve space for inline status badge before rendering text.
- If the sentence cannot fit after concise rewriting, move reason/evidence to drawer instead of shrinking text.
