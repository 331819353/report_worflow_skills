# Haier Enterprise App Cross-Platform Adaptation

Use this reference for common enterprise application resolution and platform adaptation. For report/dashboard fixed-canvas or chart/table responsive behavior, use report-design skills first.

## Platforms

The standard applies to:

- PC Web.
- PC desktop.
- Mobile App adaptation reference.

## Resolution Breakpoints

| Screen width | Adaptation |
| --- | --- |
| `width >= 1440px` | Large-screen layout |
| `990px <= width < 1440px` | Medium-screen layout |
| `768px <= width < 990px` | Small-screen layout; side navigation collapsed |
| `width < 768px` | Mobile layout; side navigation hidden |

## Left Navigation Width

| Screen width | Left navigation width |
| --- | --- |
| `width >= 1440px` | `256px` |
| `990px <= width < 1440px` | `208px` |
| `768px <= width < 990px` | `80px`, collapsed |
| `width < 768px` | Hidden |

## Spacing Adaptation

| Screen width | Spacing |
| --- | ---: |
| `width >= 1440px` | `24px` |
| `width < 1440px` | `16px` |

## Navigation Types

| Type | Rule |
| --- | --- |
| 平移导航 | Move between screens at the same level; access top-level destinations or same-group items |
| 下钻导航 | Enter continuous levels, process steps, or cross-application screens |
| 返回导航 | Move back by time order or hierarchy |
| 联想导航 | Move step by step in a predefined order, usually with Steps |

## Translation Navigation

- Move between screens at the same level.
- Allow access to different application destinations and functions.
- Allow switching between related items.

## Drilldown Navigation

- Enter lower-level content.
- Can be embedded in cards, lists, images, buttons, links, or search results.

## Return Navigation

- Return to browsing history.
- Return to upper-level structure.
- Specific behavior follows the target platform convention.

## Associative Navigation

- Navigate to content by relevance.
- Guide users forward/backward in a predefined order.
- Each page should show Steps and mark current position.
