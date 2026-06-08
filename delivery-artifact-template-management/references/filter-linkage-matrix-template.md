# Filter Linkage Matrix Template

Use this template to prove every filter has data completeness first, then request mapping, affected components, and edge-state behavior.

## Filter Matrix Columns

| Filter | Option source | Data completeness before binding | Default/non-default data proof | Request field/param | Binding method | Affected components | Reset behavior | Edge cases | Env/version/role context | Retest defect ID | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Interaction Matrix Columns

| Action | Source component | Active filters inherited | Target request/action | Expected state update | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |

## Required Edge Cases

- Data completeness before binding: option rows, matching fact/business rows or API/provider responses, required fields, default state, at least one non-default state, empty/no-permission state when relevant, and resolver/API branches for scenario filters.
- Empty option list.
- Invalid/expired option.
- All option or cleared selection.
- Multi-select encoding.
- Cascade parent change clears invalid child values.
- Permission-limited options.
- Export, drawer, pagination, sorting, jump, and refresh inherit active filters when required.
- Production/retest context when applicable: environment, version/build, account/role, data seed/source mode, defect ID, and closure criteria.

## Pass Rule

Do not mark filter linkage `pass` when data completeness is missing or only one default snapshot exists for an affecting filter. Record that as a data-completeness/data-grain gap before judging UI or component binding.
