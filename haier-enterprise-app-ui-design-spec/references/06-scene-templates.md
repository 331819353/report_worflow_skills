# Haier Enterprise App Scene Templates

Use this reference for common application scene templates. For report/dashboard runnable templates, use `report-prototype-template-management` instead.

## Form Page

### Normal Layout

- Form items are flatly listed.
- Suitable for few form items that are hard to group.
- Suitable for small tasks, quick creation, and lightweight information entry.

### Step Form

- Split complex tasks into multiple steps.
- Each step focuses on the current task.
- Use Steps to show progress.
- Confirm on the last step before final submission when needed.

### Grouped Form

- Suitable for many form items that can be classified.
- Use group titles or regions to split content.

### Editable List

Use when users dynamically add or delete data items.

Rules:

- If one record has `<= 3` entry items, input items may not need labels.
- If form item count is `2-5`, use editable table.
- If form item count is `6-8`, use collapsible panel editing.
- If form item count is `> 8`, use drawer editing.

## Empty / Abnormal Template

Exclusive prompt:

- Use for whole-page large-area no-data situations.
- Use blue exclusive icon + text prompt.

Component-level prompt:

- Use when one component has no data.
- Use monochrome empty-state prompt.

## Exception Template

| Template | Scenario |
| --- | --- |
| `404` | Page, project, or resource not found |
| `403` | No permission to access application or data |
| `500` | Server error, unable to provide service |

## Workbench

Design strategy:

- Arrange content by usage frequency.
- Show the most frequently used content in the first screen.
- Provide role-based differentiated views.
- Keep total modules at `5-9`.

Navigation:

- If users clearly know the function, provide quick entries.
- If users are unsure of the function, provide discovery navigation.

Common modules:

- Help.
- Core data.
- Quick entries.
- Todo list.
- Followed content.
- Operation modules.

## Detail Page

### Basic Detail

- Main content is shown in one card.
- Use non-full-width dividers to group related content.
- Suitable for low-complexity content.

### Document Detail

- Suitable for approval documents.
- Use cards to split complex modules.
- Show approval flow and approval details.

Common operations:

- 通过.
- 驳回.
- 转交.
- 加签.
- 挂起.
- 撤回.

### Advanced Detail

- Use Tabs to split large or complex content.
- Tabs act as auxiliary navigation to guide users through information.
