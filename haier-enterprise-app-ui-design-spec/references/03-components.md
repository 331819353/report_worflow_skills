# Haier Enterprise App Common Components

Use this reference for common application components. For report-specific KPI cards, chart containers, S2 tables, analytical filters, or data-dense report widgets, use `report-component-style-design` first and inherit this file only for base Haier component conventions.

## Button

Buttons trigger immediate operations.

| Type | Usage | Rule |
| --- | --- | --- |
| 主按钮 | 完成、确认、提交等关键操作 | One button area has at most `1` primary button |
| 次按钮 | 取消、重置、返回等次要操作 | Use when operations have no clear primary/secondary hierarchy |
| 文本按钮 | Low-priority operations, table operations, function entry | Lighter visual weight |

Rules:

- One operation area has at most `1` primary button.
- One page should have no more than `2` primary buttons when possible.
- Two-character Chinese button text should add spacing, for example `取 消`.
- Button width changes with copy length.
- Button sizes include large, medium, and small.
- Do not place two icons in one button.
- Pure icon buttons must have Tooltip.

Special buttons:

| Type | Usage |
| --- | --- |
| Dashed | Guide users to add content inside an area |
| Danger | Delete, clear, and other high-risk operations |
| Ghost | Use on dark or complex backgrounds |
| Icon button | Improve recognition; must pair with Tooltip when icon-only |

## Input

Input is the basic form container for mouse or keyboard text entry.

| Type | Rule |
| --- | --- |
| 通用类 | Basic input; lightweight before input and clear after input |
| 按钮类 | Input needs confirmation, such as search |
| 文本类 | Long-text editing; can limit word count; height is not fixed and can stretch |

## Select

Select opens a dropdown menu for user choice.

| Type | Rule |
| --- | --- |
| 单项选择器 | Select only one item; selected content displays in the input and dropdown closes |
| 多项选择器 | Select multiple items; selected content displays as removable tags |

State colors for hover, selected, and disabled states must follow the system theme color and neutral color systems.

## Form

Forms create entities or collect information.

### Label Layout

| Layout | Use when |
| --- | --- |
| 上下布局 | Long labels, English labels, advanced forms |
| 左右布局 | Short labels, basic forms |

Label rules:

- Top/bottom layout: label should not exceed input width; truncate overflow.
- Left/right layout: label should not exceed `6` Chinese characters; truncate after the `5th` character when exceeded.
- Required mark appears before label content.
- Align form labels by label colon.
- Do not mix top/bottom and left/right layouts on the same page.

Width guidance:

| Form type | Width |
| --- | --- |
| Basic form | About `8` grid columns |
| Advanced two-column layout | About `10` grid columns |
| Advanced three-column layout | About `8` grid columns |

## Menu

Menu types:

- Front-office navigation.
- Back-office navigation.
- Dark navigation.
- Light navigation.

Side navigation rules:

- After collapse, content-area card spacing remains unchanged.
- Card width and content stretch according to the grid.
- Side-navigation width adapts by resolution. See `07-cross-platform.md`.

## PageHeader

PageHeader sits at the top of a page and provides content overview plus page-level operation guidance.

Common elements:

- Breadcrumb.
- Title.
- Content description.
- Page-level operation.
- Page-level navigation.
- Avatar.
- Main title.
- Subtitle.
- Right-side buttons.
- Description list.
- Key data.

Background rules:

- Home pages or shallow pages: use a light PageHeader.
- Deeper pages: use a dark PageHeader.
- Return PageHeader color follows the parent page background.

## Table

Tables display row/column data and are suitable for large data and comparison.

Base rules:

- Content is left-aligned by default.
- The last operation column can be right-aligned.
- Amount and quantity columns should be right-aligned.
- Content should stay horizontal and avoid wrapping where possible.
- Column content character count is constrained by product/business needs.
- Allow horizontal scrolling when there are many content items.
- Operation column can float in the first screen for easy access.
- Empty cells display `-`.

Header/body style:

| Area | Style |
| --- | --- |
| Header background | `#000000 4%` |
| Header font | `14px / Medium / #000000 85%` |
| Body font | `14px / Regular / #000000 65%` |

Column width guidance:

| Size | Total width | Chinese characters | Numeric characters |
| --- | ---: | --- | --- |
| Form-XS | About height | Operation/sequence item | Operation/sequence item |
| Form-S | `80px` | Best `1-3`, max `4` | Best `1-6`, max `8` |
| Form-M | `120px` | Best `4-5`, max `7` | Best `8-10`, max `13` |
| Form-L | `160px` | Best `6-7`, max `10` | Best `11-13`, max `17` |
| Form-XL | `280px` | Best `10-16`, max `18` | Best `14-30`, max `33` |

## Modal / Dialog

Structure:

- Dialog frame.
- Mask.
- Title area.
- Content area.
- Operation area.

Use for:

- Process confirmation.
- Form entry.
- Information prompts.
- Secondary confirmation.
- Lightweight task handling.

Dialog operation priority follows button rules: one operation area has at most one primary button.

## Empty / Abnormal Page

Empty or abnormal pages handle missing page information or abnormal responses.

Purpose:

- Give a clear prompt.
- Guide the next action.
- Reduce uncertainty in abnormal scenarios.

No-data state:

- Illustration size: `288px x 288px`.
- Illustration uses Haier brand blue.
- Text stays close to the illustration.
- Illustration and text are centered as a group.

404 page:

- Illustration and text are centered.
- Text stays close to illustration.
- The group is centered in the page and content area.

## Result

Result pages can contain:

1. Result feedback: clearly tell the user the submitted result.
2. Result explanation: optional short explanation.
3. Suggested action: guide the next step.
4. Supplemental information: optional auxiliary or operation module.
