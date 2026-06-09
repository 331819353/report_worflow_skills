# Haier Enterprise App Layout Structures

Use this reference for common application page structure, not report/dashboard-specific block design.

## Basic Layout

- Content areas are usually vertical waterfall structures.
- Depending on business complexity, the content area can be split into at most `4` regions.

## Front-Office Layout

- Usually uses a top/bottom structure.
- Suitable for display, reading, and browsing pages.
- Common structure: PageHeader + content.
- Front-office content area should be centered and no wider than `1200px` where applicable.

## Back-Office Layout

- Usually uses a left/right structure.
- Suitable for management, configuration, and operation pages.
- Common structure: side navigation + content area.
- Side navigation width adapts by resolution; see `07-cross-platform.md`.

## Layout Ratio Templates

Use fixed ratio templates for fast content partitioning and grid division:

- `1 : 1`
- `1 : 1 : 1`
- `1 : 1 : 1 : 1`

## Form + Table Page

Structure:

- Form area.
- Table area.

Use for:

- Query + list.
- Filter + table.
- Data entry + result display.

## Description List + Table Page

Structure:

- Description-list area.
- Table area.

Use for:

- Detail information + detail list.
- Document detail + operation record.
- Basic information + child data table.

## Description List

Rules:

- Content area minimum recommended width: `1120px`.
- Use `3` equal columns when width allows.
- Middle gutter: `16px`.
- Top/bottom safe area: `16px`.
- When content area is less than `1120px`, change to `2` equal columns.
- Description title color: `#000000 85%`.
- Description content color: `#000000 65%`.

## Modal / Dialog Layout

Structure:

- Dialog frame.
- Mask.
- Title area.
- Content area.
- Operation area.

Use for:

- Process confirmation.
- Form entry.
- Information prompt.
- Secondary confirmation.
- Lightweight task handling.

If the task becomes long or multi-step, use a page, drawer, or stepped flow rather than a cramped modal.

## Empty / Abnormal Page Layout

No-data state:

- Illustration size: `288px x 288px`.
- Illustration uses Haier brand blue.
- Text stays close to the illustration.
- Illustration and text are centered as one group.

404 page:

- Illustration and text centered.
- Text close to illustration.
- Whole group centered in the page and content area.
