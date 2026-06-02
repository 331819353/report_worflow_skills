# Data Consistency Matrix Template

Use this template when comparing backend API responses with frontend display values.

## Component Comparison Columns

| Component | API endpoint | Request params | Response fields | Adapter/formula | Display fields | Expected value | Actual value | Evidence | Env/version/data context | Retest defect ID | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Required Checks

- KPI cards, charts, tables, drawers, exports, and drilldowns.
- Units, precision, date/period format, sorting, Top N, totals/subtotals, null/empty values.
- Backend response -> adapter output -> rendered UI value trace.
- Active filters and permissions used by the request.
- Production/retest context when applicable: environment, version/build, account/role, data seed/source mode, defect ID, and closure criteria.

## Mismatch Classification

- Backend contract mismatch.
- Frontend adapter/binding mismatch.
- Filter/request parameter mismatch.
- Mock/static data residue.
- Display formatting or precision mismatch.
