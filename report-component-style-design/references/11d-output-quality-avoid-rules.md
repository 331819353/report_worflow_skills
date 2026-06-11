# Output Quality And Avoid Rules

This file was split from `11-detailed-style-rules.md`. Load it only for this focused rule group; use `11-detailed-style-rules.md` as the routing index.

## Output Format

When asked to define or apply component style, use this structure:

Start with `引用规则`: list the reference files applied and any stricter component-specific rules selected.

1. 组件范围: list component types involved, such as filters, text summary, KPI cards, charts, tables, drawers.
2. 可用尺寸: state each component's assigned block size, card inner size, body viewport width/height, and minimum viable size.
3. 标题规范: define title, subtitle, metadata, status tag, and action placement.
4. 背景规范: define page/component/nested/hover/selected/warning backgrounds.
5. 字号规范: define title, value, label, body, table, helper, and annotation sizes.
6. 色彩规范: define brand, text, border, semantic, chart, selected, and disabled colors.
7. 边框阴影: define radius, border, divider, selected border, hover elevation, drawer/modal shadow.
8. 统一风格: define spacing, icon style, control style, states, and component variants.
9. 居中与自适应: explain how each component centers, fits, wraps, scrolls, zooms, or pans inside its block.
10. 溢出策略: define when to grow span, wrap, scroll, clamp, use drawer, fullscreen, zoom, or split component.
11. 防重叠规则: define label, legend, axis, tooltip, text, and graphic collision handling.
12. 复杂图形策略: specify viewport, zoom, drag, reset, fit-to-screen, minimap, and export behavior when needed.
13. 组件内控制器: define capsule switches, dropdowns, compact menus, placement, selected state, option overflow, and affected content.
14. 可读性校验: contrast, font size, truncation, labels, units, precision, and responsive limits.
15. 组件清单: describe each component's structure and states.
16. 最终校验: confirm no overlap, no unreadable labels, no overflow, no inconsistent style.


## Quality Checklist

Before finalizing, verify:

- The needed files from this directory were loaded according to `00-component-reference-index.md`.
- Component-specific display rules from the relevant reference files are reflected in the design or implementation.
- Each component has measured or explicitly estimated usable width and height before its content layout is chosen.
- The selected component form, grid span, font hierarchy, chart/table density, legend position, and metadata count match the measured body viewport.
- Main content is horizontally and vertically centered when appropriate.
- Component title, subtitle, metadata, and actions are aligned and readable.
- Background layers are defined and do not create visual noise.
- Font sizes follow a consistent hierarchy and remain readable.
- Color roles are explicit and contrast is sufficient.
- Borders, radius, shadows, and dividers are consistent and restrained.
- Component content fits inside its assigned block or viewport.
- Each component has an explicit overflow strategy: grow, wrap, scroll, clamp, drawer, fullscreen, zoom/pan, or split.
- If the component cannot carry its content at the available size, the design expands the block, splits the content, or moves secondary details to drawer/fullscreen instead of clipping or squeezing.
- Labels, legends, axes, values, graphics, and actions do not overlap.
- Dense charts use partial label display; hidden label values are available through hover/focus tooltip or another explicit detail surface.
- Axis labels remain readable and are larger than permanent data-label values when both appear.
- Label values, tags, and key text do not overflow their container; any hidden or abbreviated content has full-value disclosure.
- Radar dimension labels, category labels, and legends have separate reserved zones and do not overlap.
- Sparse line/area/trend charts center one point and symmetrically place two or more sparse points instead of pinning the first point to the left edge.
- Core text and values are not truncated.
- Low-priority truncation has tooltip or full-text access.
- Colors are readable and not too pale.
- Typography has minimum readable sizes and consistent hierarchy.
- Filters, text summaries, charts, cards, tables, and drawers share the same visual language.
- In-component capsule switches and dropdowns share one UI style, have clear selected states, and do not overlap titles, legends, axes, tables, KPI values, or empty states.
- Component-level controls state exactly which component content they change and do not behave like hidden page-level filters unless explicitly designed that way.
- Components remain readable after filter-driven data changes, including empty results, long labels, changed totals, hidden series, and stale selections.
- Drawers, fullscreen views, exports, and refreshed components visually reflect the same active filter state as their source component.
- Charts and clickable components have visible entrance/update animation unless intentionally disabled for performance or accessibility.
- Hovering a chart mark, KPI submetric, table row, or interactive graphic reveals exact values or explanatory details through tooltip, emphasis label, popover, or drawer.
- Hidden dense labels remain inspectable through tooltip, hover, selection, fullscreen, or detail drawer.
- Complex diagrams use viewport, zoom, pan, reset, and fit-to-screen instead of forcing page overflow.
- Responsive behavior is defined for narrow and wide blocks.
- Screenshots at target width, narrower laptop width, and fullscreen show no clipped right edge, hidden bottom content, or component collision.


## Avoid

- Do not create fixed-size components that ignore their grid block.
- Do not omit component title, background, typography, color, border, and shadow decisions when defining a component system.
- Do not leave overflow behavior undefined.
- Do not let graphics overlap labels or labels overlap each other.
- Do not shrink text until it becomes unreadable.
- Do not use pale labels or low-contrast chart elements.
- Do not use heavy shadows, thick borders, or decorative backgrounds to compensate for weak hierarchy.
- Do not truncate core values, warnings, task names, or decision-critical labels.
- Do not allow complex diagrams to expand the page layout horizontally.
- Do not mix multiple unrelated visual styles on one page.
- Do not make component styling decorative at the cost of scanning and action.
- Do not deliver static-looking charts with no animation, hover emphasis, or tooltip value inspection unless explicitly required.
