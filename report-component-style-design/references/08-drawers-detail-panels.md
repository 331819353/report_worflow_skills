# Drawers And Detail Panel Rules

Use for row detail, object profile, evidence drawer, source trace, log panel, attachment panel, and modal detail.

In Vue report prototypes, use Element Plus `ElDrawer`, `ElDialog`, `ElTabs`, `ElDescriptions`, `ElForm`, `ElButton`, `ElTag`, `ElTable`, `ElTooltip`, and `ElPopover` for standard drawer, modal, evidence, and detail interactions unless an existing project design system supersedes Element Plus. Keep custom DOM only for unsupported visualizations or highly specialized content.

## Structure

- Header includes object title, status, key metadata, and primary action.
- Body uses sections, tabs, or accordions instead of a wall of fields.
- Footer or header action area stays sticky for important actions.
- Evidence, logs, attachments, and source links use consistent table/list style.

## Width And Scrolling

- Drawer width adapts to content: simple detail 420-520px, analytical detail 640-860px, evidence-heavy detail 70-80vw.
- Long content scrolls inside the drawer body, not the whole page unexpectedly.
- Sticky header/footer must not cover the first or last content row.
- Wide evidence tables scroll horizontally inside the drawer and freeze identifiers when possible.

## Text And Field Rules

- Field labels align consistently and remain readable.
- Long field values wrap or use copyable full text blocks.
- IDs, source paths, and error messages may use monospace if it improves scanning.
- Do not truncate audit reasons, exception cause, or correction suggestions without expand/full-text access.

## Relationship To Source Component

- The drawer must visually reflect the active filter state or selected object from the source component.
- Closing the drawer should preserve the source component scroll, selection, and filter state.
- Tooltip-level details stay lightweight; use drawer when users need evidence, history, or actions.
