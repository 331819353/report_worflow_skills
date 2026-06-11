# Placement Foundation And Local Controls

This file was split from `12-internal-placement-algorithms.md`. Load it only when the matching component family is present.

## Required Placement Chapter

Every reusable report component should include a chapter named `Positioning And Alignment Rules` or `位置排布与对齐规则`.

Minimum content:

| Required item | What to define |
| --- | --- |
| Coordinate system | Container origin, padding, content box, main axis, cross axis |
| Container variables | `W`, `H`, `P`, `CW = W - 2P`, `CH = H - 2P` |
| Anatomy slots | Required and optional elements, owned title/header/action areas, body, footer, state mask |
| Main visual center | Which element is the visual anchor and whether it centers in the content box or a sub-zone |
| Slot x/y algorithm | `x`, `y`, width, height, alignment, and reserved gap for each visible element |
| Size tiers | Small, standard, enhanced, wide, and what content is hidden, moved, or disclosed |
| Height budget | Padding, row line-heights, vertical gaps, fixed bands, and `requiredContentHeight <= H` |
| Horizontal budget | Text widths, icon slots, unit gaps, legend/control bands, and overflow fallback |
| Responsive degradation | Which element stays permanent, which moves to tooltip/drawer, which is hidden |
| State geometry | Loading, empty, error, no-permission, stale, and disabled states preserve the same slot geometry |

Avoid vague placement statements such as "center the content", "adjust responsively", or "align neatly" unless they are paired with measurable slot rules.

## Shared Coordinate Contract

Use this default coordinate system unless the component has a domain-specific coordinate model:

```text
containerWidth = W
containerHeight = H
padding = P
contentWidth = CW = W - 2P
contentHeight = CH = H - 2P
contentOrigin = (P, P)
centerX = P + CW / 2
centerY = P + CH / 2
```

Rules:

- The surrounding block/container owns the outer title/function band when present. Component body coordinates start after subtracting that block-owned title/action band.
- Every visual slot must have a reserved rectangle before rendering text, icons, charts, or controls.
- Main values, legends, labels, controls, and state messages cannot overlap their reserved rectangles.
- Hidden or abbreviated content needs tooltip, focus tooltip, drawer, fullscreen, expansion, or table fallback.
- `overflow: hidden` is not a placement algorithm. It is only acceptable after a disclosure path and fit proof exist.

## Component-Internal Local Filter Placement Algorithm

Use this for the fixed component spec section named `组件内筛选区 / 局部筛选区`. It is a component-scoped filter and affects only the current component or one explicitly declared block-scoped component group. It must not take over page/global filter, permission, pagination, aggregation, export, or backend query responsibilities.

### Scope And Option Rules

| Rule | Requirement |
| --- | --- |
| Scope | Only current component or declared local group |
| Default surface | Capsule sliding button / segmented control |
| Option count | `2-4` short options use capsule; `> 4` options use compact dropdown |
| Group count | Default one group; maximum two visible groups only in wide components |
| Priority | `time range -> metric口径/view -> display granularity -> sort/ranking` |
| Unsuitable fields | Region, channel, store, category, owner, status, permission, and other complex business dimensions unless proven component-local |
| Semantic boundary | A control that changes metric set, component role, table columns, first-level perspective, or domain vocabulary is not an ordinary local filter |

### Size And Fit

```text
filterH = clamp(24px, H * 0.08, 32px)
defaultFilterH = 28px
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + innerPadding * 2
filterMaxW = min(CW * 0.45, 280px)

if filterW > filterMaxW:
  render as single compact capsule dropdown
```

Style defaults:

- Capsule radius: `999px`.
- Capsule inner padding: `2px`.
- Text: `12px`, no wrapping.
- Option padding: `10-14px`.
- Option width: minimum `44-52px`, maximum `96-120px` depending on label length and component width.

### Header-Right Placement

Prefer the title/header right side when fit passes:

```text
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - filterW - 12px
```

Rules:

- Title keeps priority; it must remain readable before the filter is accepted.
- Definition/help icon follows the title rather than being pushed after the filter.
- Unit text moves to subtitle or chart metadata when title, unit, icon, actions, and filter compete.
- Detail/download/fullscreen/more actions collapse before the title becomes unreadable.

### Under-Title Placement

Use an under-title lightweight row only when title-right placement fails and the component has enough vertical space:

```text
filterX = P
filterY = P + titleH + 6px
filterRowH = filterH + 6px
titleAreaH = titleH + filterRowH
```

Do not add this row when `H < 180px`; collapse to a compact dropdown or selected-value pill instead.

### No-Overlay Rule

Component-local filters cannot sit over:

- KPI value or value/unit group.
- Bar/line/pie plot area.
- Axis labels, legend, or data labels.
- Table header, frozen columns, or pagination.
- Empty/loading/error/no-permission state messages.

The filter must be separated from the plot/body through the title, subtitle, metric strip, or legend band. It should read as a light switch, not a filter form.

### Responsive Collapse

| Condition | Behavior |
| --- | --- |
| `W >= 480px` | Header-right capsule may show when title fit passes |
| `320px <= W < 480px` | Header-right only when it fits; otherwise under-title row or dropdown |
| `240px <= W < 320px` | Single compact capsule dropdown |
| `W < 240px` | Selected value plus chevron, for example `本月 ▾` |
| `H < 180px` | No added row; inline or collapse |
| Option count `> 4` | Dropdown |
| More than one group | Collapse secondary group first; two visible groups require wide-component fit proof |

Every future component spec should include local filter fit, unsuitable filter types, style, placement, relationship with title/unit/legend/metrics, responsive collapse, and aesthetic simplicity.
