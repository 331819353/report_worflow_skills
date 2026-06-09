# Haier Enterprise App UI Design Tokens

Source: "海尔集团企业应用 UI 设计规范（Web端）", offline capture. Document creation date: 2023-04-14. Latest local source modification date: 2025-06-24.

Purpose: this file preserves the concrete color, typography, spacing, size, shadow, grid, and layer values that must not be summarized away. Use it as the first reference when producing implementable design specs.

Scope: common Haier enterprise application UI. For report/dashboard-specific layout and chart/table decisions, use report-design skills and inherit these tokens only as the Haier UI baseline.

## Color Tokens

### Color System

- 色彩体系分为系统级色彩体系和产品级色彩体系。
- 系统级色彩体系定义基础色板、中性色板和数据可视化色板。
- 产品级色彩体系基于系统色彩进一步定义符合产品调性和功能诉求的颜色。
- 系统色彩需要保证移动端和电脑端使用体验中的色彩饱和度和对比度充足。
- 对比度需符合 WCAG AA/AAA；AA 要求小文本与背景至少 `4.5:1`，大文本与背景至少 `3:1`。

### Theme Color

| Token | Value | Usage |
| --- | --- | --- |
| System main color / HBlue-6 | `#0073E5` | 海尔色延展色中提取的系统主色 |
| HBlue-1 to HBlue-10 | Generated from `#0073E5` by HSV palette algorithm | 主色延展色板 |
| HBlue-1 / HBlue-5 / HBlue-7 | Captured as named extension colors | 用于 Hover、Pressed、Disabled 等辅助色状态 |

Palette generation rule:

- Haier UI Style 采用 HSV 模型递减/递增得到完整渐变色板。
- 生成逻辑结合加白、加黑、加深、贝塞尔曲线，以及冷暖色不同旋转角度。
- 生成参数包括颜色值、色号与主色色号 `6` 的距离、减淡/加深。
- 产品级色彩支持 `14` 个常用主题色和延展色作为模板色，也支持按规范色板生成算法自定义主色。
- 色板工具：`https://blue-whale.haier.net/color`。

### Functional Colors

| Function | Captured token | Base HEX | Captured extension HEX |
| --- | --- | --- | --- |
| Link | `blue-6` | `#0073E5` | `#0365C6` |
| Success | `green-6` | `#52C41A` | `#49AA19` |
| Warning | `gold-6` | `#FAAD14` | `#D89614` |
| Error | `red-5` | `#FF4D4F` | `#A61D24` |

Functional color guidance:

- `4` 种功能色扩展色可满足后台 `90%` 使用需求。
- 功能色可用于图标、组件、弹层等场景。
- 功能语义包括链接、成功、警告、错误。

### Neutral Text Colors

| Role | Alpha source | HEX |
| --- | --- | --- |
| 标题色 | `#000000 85%` | `#262626` |
| 正文、遮罩色 | `#000000 65%` | `#595959` |
| 描述色 | `#000000 45%` | `#8C8C8C` |
| 禁用、占位色 | `#000000 35%` | `#BFBFBF` |

### Neutral Structure Colors

| Role | Alpha source | HEX |
| --- | --- | --- |
| 边框色 | `#000000 15%` | `#D9D9D9` |
| 分割线色 | `#000000 6%` | `#F0F0F0` |
| 背景色 | `#000000 4%` | `#F5F5F5` |
| 内容区背景色 | `#FFFFFF` | `#FFFFFF` |

### Dark Mode Neutral Steps

Dark-mode neutral opacity steps captured in the source:

- `#FFFFFF 85%`
- `#FFFFFF 65%`
- `#FFFFFF 45%`
- `#FFFFFF 25%`
- `#FFFFFF 15%`
- `#FFFFFF 6%`
- `#FFFFFF 4%`
- `#FFFFFF 2%`

### Layer Background

| Layer | Color |
| --- | --- |
| Background 背景层 | `#000000 4%` |

## Typography Tokens

### Font Family

- 字体类型通过字体家族、字体颜色、字体规范三个方面定义。
- 常规后台系统字体选用时，通常必须使用系统自带字体。

### Font Specification

| Token | Weight | Size | Line height | Usage |
| --- | --- | --- | --- | --- |
| `Font_heading` | `600` | `20px` | `30px` | 页面标题 |
| `Font_title` | `600` | `16px` | `24px` | 大标题 |
| `Font_subhead` | `600` | `14px` | `22px` | 小标题 |
| `Font_base` | `400` | `14px` | `22px` | 正文 |
| `Font_caption` | `400` | `12px` | `18px` | 说明文字 |

### Font Color

Use the neutral text tokens:

- 标题：`#262626`
- 正文：`#595959`
- 描述：`#8C8C8C`
- 禁用/占位：`#BFBFBF`

## Size And Shape Tokens

### Basic Unit

| Token | Value |
| --- | --- |
| `Hd` | `2px` |

Rules:

- 所有间距、所有组件均以 `2px` 的倍数作为参考标准。
- 特殊情况可以调整适配，但需要有明确的业务或兼容性原因。

### Radius

| Token | Formula | Pixel value |
| --- | --- | --- |
| `Radius_xs` | `Hd` | `2px` |
| `Radius_sm` | `2 * Hd` | `4px` |
| `Radius_badge` | `4 * Hd` | `8px` |

### Border Width

| Token | Value |
| --- | --- |
| `Border_width_sm` | `1px inside` |
| `Border_width_lg` | `Hd inside` / `2px inside` |

### Divider

| Token | Value |
| --- | --- |
| `Divider_height_sm` | `1px` |

### Circle

| Token | Size | Border |
| --- | --- | --- |
| `Circle_sm` | `4 * Hd` / `8px` | `1px inside` |
| `Circle_status` | `4 * Hd` / `8px` | Not specified |
| `Circle_badge` | `3 * Hd` / `6px` | `1px outside`, `Color_neutral_8` |

### Icon Size

| Token | Formula | Pixel value |
| --- | --- | --- |
| `Icon_size_xxxs` | `4 * Hd` | `8px` |
| `Icon_size_xxs` | `6 * Hd` | `12px` |
| `Icon_size_xs` | `7 * Hd` | `14px` |
| `Icon_size_sm` | `8 * Hd` | `16px` |
| `Icon_size_md` | `10 * Hd` | `20px` |
| `Icon_size_lg` | `12 * Hd` | `24px` |
| `Icon_size_xl` | `16 * Hd` | `32px` |

## Spacing Tokens

### Responsive Container Spacing

| Screen width | Container inner/outer spacing |
| --- | --- |
| `Screen width >= 1440px` | `24px` |
| `Screen width < 1440px` | `16px` |

### Relationship Spacing

| Relationship | Spacing |
| --- | --- |
| 模块/卡片 与 模块/卡片之间 | `16px` |
| 模块/卡片 与中号 button 之间 | `16px` |
| 模块标题与内容之间 | `24px` |
| 模块内 button 之间 | `8px` or multiples of `8px` |

Spacing method:

1. 明确类型：根据需要的间距类型寻找具体尺寸。
2. 推演关系：参考间距关系推演示例。
3. 先设定最相关元素的间距，再类推出其他元素。
4. 内容越相关，间距越小；通过间距差异表达信息主次和阅读节奏。

## Shadow Tokens

The source table columns are `color`, `X`, `Y`, `blur`, and `z/spread`.

| Token | Color | X | Y | Blur | z/spread | CSS equivalent |
| --- | --- | --- | --- | --- | --- | --- |
| `Shadow_down` | `#000000 10%` | `0` | `1` | `4` | `-2` | `0 1px 4px -2px rgba(0,0,0,.10)` |
| `Shadow_left` | `#000000 10%` | `-4` | `0` | `8` | `-4` | `-4px 0 8px -4px rgba(0,0,0,.10)` |
| `Shadow_right` | `#000000 10%` | `2` | `0` | `4` | `-4` | `2px 0 4px -4px rgba(0,0,0,.10)` |
| `Shadow_popover` | `#000000 10%` | `0` | `2` | `8` | `-4` | `0 2px 8px -4px rgba(0,0,0,.10)` |

Use shadow to express layer distance and hierarchy, especially for popovers, menus, dialogs, Toast, and similar floating surfaces.

## Grid And Resolution Tokens

### Grid

| Token | Value |
| --- | --- |
| Grid base width | `1128px` |
| Grid count | `24` columns |
| Column width reference | `24px` |
| Gutter width reference | `24px` |
| Grid unit reference | `8px` |

Grid rules:

- 栅格由 Column 和 Gutter 组成。
- Column 动态缩放，Gutter 保持不变。
- 网格系统作为参考，不作强制要求。
- 因栅格建立了以 `8px` 为单位的网格系统，建议组件尺寸及间距以 `8px` 的倍数作为设计参考。

### Resolution And Canvas

| Item | Value |
| --- | --- |
| Mainstream resolutions | `1366px`, `1440px`, `1920px` |
| Must-check resolution | `1280px` main content completeness |
| Recommended canvas | `1440px` |
| Front-office content max width | Centered, `<= 1200px` |

### Responsive Breakpoints

| Screen width | Adaptation |
| --- | --- |
| `width >= 1440px` | 大屏布局 |
| `990px <= width < 1440px` | 中屏布局 |
| `768px <= width < 990px` | 小屏布局，侧边导航收起 |
| `width < 768px` | 移动端布局，侧边导航隐藏 |

### Left Navigation Width

| Screen width | Left navigation width |
| --- | --- |
| `width >= 1440px` | `256px` |
| `990px <= width < 1440px` | `208px` |
| `768px <= width < 990px` | `80px`, collapsed |
| `width < 768px` | Hidden |

## Layer Tokens

| Layer | Rule |
| --- | --- |
| `Background` | 背景层，内容层背景，颜色 `#000000 4%` |
| `Content` | 内容层，承载页面主要内容 |
| `Navigation` | 位于内容层之上，滚动内容时可保持位置不动，常位于页面左侧 |
| `Popout` | 内容层和导航层的补充，承载弹窗、通知、操作菜单、Toast、加载/成功状态、表单报错 |
| `Mask` | 配合 Popout 锁定内容层和导航层操作，不单独使用 |
