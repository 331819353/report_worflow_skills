# 08 Anti-AI Design Gate

Use this reference whenever a report, dashboard, business analysis page, data screen, common enterprise page, or runnable frontend may be designed, styled, implemented, repaired, or QA-reviewed.

Purpose: prevent "AI-looking" output. An AI-looking interface is not merely a visual style problem; it is a design with high average polish and thin product context. It usually looks modern at first glance, but collapses when real users, real content, real states, accessibility, and engineering constraints arrive.

This gate is derived from the user's pasted note about "一眼 AI" design causes.

For report, dashboard, cockpit, BI, detail-query, topic-analysis, or report-designer work, run `09-report-decision-anti-ai-gate.md` after this generic gate. The generic gate catches thin product context and template polish; the report-specific gate catches pages that look like reports but lack metric systems, diagnostic paths, realistic data, linkage, action, trust details, or report-designer data-binding behavior.

## AI-Looking Causes

Classify findings with these reasons.

| ID | Cause | Typical smell | Required countermeasure |
| --- | --- | --- | --- |
| `AI-CONTEXT-THIN` | Product judgment is thin. | The page is "modern/high-end" but does not state user role, task, first action, priority, or decision. | Start from user task, business question, content priority, and workflow path before visual styling. |
| `AI-TEMPLATE-AESTHETIC` | High-frequency template aesthetics replace product language. | Purple/blue gradients, black neon, glass cards, glow buttons, oversized radius, floating cards, generic three-card sections. | Use approved brand/template tokens and domain-specific surfaces; any decorative style needs product or brand rationale. |
| `AI-FIRSTSCREEN-ONLY` | First-screen screenshot beauty is treated as completion. | Looks good at 1440 desktop but lacks scroll, mobile, long text, real data, and edge states. | Validate full page, mobile/tablet, long/short content, loading/empty/error/no-permission/disabled/success states. |
| `AI-GENERIC-COPY` | Copy is plausible but empty. | "赋能企业增长", "开启智能化新时代", "一站式解决方案", "重新定义", "智能分析", "提升效率". | Replace with concrete nouns, user action, data object, system behavior, result, limitation, or evidence. |
| `AI-BRANDLESS` | The interface has no memory point. | Remove the logo and any company could own it; colors/icons/illustrations are interchangeable. | Tie tokens, layout rhythm, iconography, terminology, and microcopy to the product/domain/brand. |
| `AI-GENERIC-ASSET` | Imagery is decorative and generic. | Abstract 3D balls, grid lines, AI chips, robot heads, glowing particles, vague "tech" illustrations. | Use real product/data/domain visuals, diagrams, tables, screenshots, generated assets with clear business meaning, or omit imagery. |
| `AI-AVERAGE-HIERARCHY` | Space and weight are too even. | Every section/card has similar height, visual weight, and priority; the first thing to read is unclear. | Make priority visible through scale, density, ordering, grouping, and action placement. |
| `AI-COMPONENT-SOUP` | Components are assembled but not owned by a workflow. | Cards, badges, icons, and buttons look neat, but do not support filtering, sorting, action, recovery, or evidence. | Bind each component to data, state, interaction, permission, and validation cases. |
| `AI-DECORATIVE-MOTION` | Motion is ornamental. | Animation exists for excitement, not to explain state, hierarchy, feedback, loading, or transitions. | Keep motion stateful, bounded, reduced-motion aware, and non-shifting. |
| `AI-ENGINEERING-SAMPLE` | Code looks like a demo shell. | Deep `div` nesting, long one-off utility classes, hardcoded colors/spacing/radius, no tokens, no ARIA/label/focus, no real data structure. | Use semantic components, tokens, typed view models, state variants, accessible controls, and reusable abstractions. |

## Mandatory Product Context

Before layout, styling, or implementation, record the following for any new or substantially revised page:

- Target user and usage scenario.
- Core task and next action.
- First meaningful viewport answer.
- Must-show real content, including fields, metrics, units, and examples.
- Business constraints: permissions, refresh/freshness, privacy, export, performance, and device constraints.
- User doubts or failure paths: no data, invalid input, unauthorized, partial data, stale data, operation failed.
- Brand/product personality or inherited design source.

If these are unknown, mark them as assumptions or gaps. Do not replace missing context with generic "modern SaaS", "高级感", "科技感", or "简洁大气".

## Forbidden Defaults

These are rejected unless an approved brand/template/sample source explicitly requires them and the exception is documented:

- Purple-blue gradient hero/background as the default "technology" signal.
- Black neon/glow cockpit styling for ordinary office/report workflows.
- Glassmorphism cards, frosted panels, floating orbs, glowing blobs, or particle/grid backgrounds as generic decoration.
- Oversized rounded cards/buttons beyond the project/template radius scale.
- Three-column feature cards, testimonial/pricing/FAQ/How-it-works sections in a task interface unless the product flow actually needs them.
- Abstract 3D balls, AI chips, robot heads, and decorative "intelligence" imagery when real product/data/domain visuals are available.
- Generic icons used as the main information carrier without labels, data, or task meaning.
- Animation that moves, scales, or distracts without clarifying state or feedback.
- Placeholder slogans, empty metric labels, "示例/mock/demo" residue, or invented claims.

## Copy Specificity Gate

Every visible sentence, CTA, empty state, error, hint, and summary must pass at least one specificity test:

- Names a real user action: upload, filter, approve, export, compare, assign, retry.
- Names a real object: order, alert, contract, SKU, region, account, device, task, report period.
- States a concrete system behavior: calculates, groups, flags, routes, blocks, syncs, exports.
- Gives a condition, limit, or next step: "仅显示当前权限范围", "请先选择月份", "无匹配记录，可重置筛选".
- Provides evidence: metric, period, data source, updated time, version, rule, or owner.

Copy that only says "赋能", "智能化", "高效", "一站式", "重新定义", "无缝", "灵活可扩展", "提升效率", or equivalent generic claims fails unless paired with concrete behavior.

## State And Resilience Gate

Do not accept a page or component as complete until relevant states are designed and, for implementation, rendered:

- Loading, empty, filtered-empty, error, no-permission, disabled, success, stale data, partial data, and retry.
- Long text, short text, missing values, zero values, extreme numbers, multi-language or mixed Chinese/English labels.
- Mobile/tablet layout, keyboard navigation, hover/focus/active/selected/disabled states.
- Data change after filter/sort/pagination/drilldown/refresh/export.
- Dangerous action confirmation, undo/recovery path, or unavailable-action reason when actions are present.

## Accessibility Gate

Minimum checks:

- Text contrast follows the active design baseline; normal body text should meet 4.5:1 unless a documented large-text or disabled-text exception applies.
- UI component boundaries, focus rings, chart markers, and critical graphical objects have enough contrast to be distinguishable.
- Focus-visible is clear, keyboard-reachable, and does not rely only on color.
- Form controls have labels or accessible names; icon-only buttons have tooltip/aria-label.
- Error and status messages are not communicated by color alone.
- Reduced-motion behavior keeps essential feedback while removing decorative motion.

## Engineering Gate

Implementation should look like a product codebase, not a generated sample:

- Semantic view models and typed data structures exist before visual rendering.
- Colors, spacing, radius, shadow, typography, z-index, and state styles come from tokens or approved local variables.
- Repeated visual patterns become components/composables/config, not copy-pasted markup.
- Standard controls use the project design system or Element Plus unless a custom control is justified.
- Standard charts use ECharts options/series; standard analytical tables use S2 when required.
- ARIA, labels, focus-visible, disabled/loading states, and error states are implemented where controls exist.
- Production paths do not depend on fake timers, random rows, unapproved mocks, placeholder APIs, or demo-only SDKs.

## Output Requirements

Any workflow applying this gate should output:

- `antiAiRisk`: pass/partial/fail.
- Main AI-looking causes found or ruled out, using the IDs above.
- Context proof: user task, first action, real content, and priority decisions.
- Visual cliché scan: forbidden defaults used, removed, or approved as exceptions.
- Copy specificity result and rewritten examples when needed.
- State/responsive/accessibility coverage.
- Engineering/tokens/reuse checks when implementation is in scope.
- Remaining gaps, owner, and readiness impact.

## Quality Gate

- `AI-CONTEXT-THIN`, `AI-FIRSTSCREEN-ONLY`, missing required edge states, or missing keyboard/focus support is at least `major` severity for implementation work.
- `AI-GENERIC-COPY` on primary headings, CTAs, empty states, errors, or key summaries is at least `major` severity.
- `AI-TEMPLATE-AESTHETIC`, `AI-GENERIC-ASSET`, or `AI-BRANDLESS` is at least `major` when it defines the first viewport or main product identity.
- A page can be visually polished and still fail this gate.
- Do not mark readiness `ready` when primary AI-looking causes remain unresolved; use `partial` or `blocked` with exact remediation.
