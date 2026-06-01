# Source Logical Response Mapping

Use this reference when mapping raw data into business and API-facing models.

## Mapping Order

Always map in this order:

1. Source system and physical object.
2. Source model and physical fields.
3. Logical/business model.
4. Response/view model.
5. Metric and transformation rules.
6. Gap IDs for anything unresolved.

Do not jump directly from mock fields to response fields without checking source and logical models.

## Source Model Rules

For each source model, state:

- Physical object name and source ID.
- Business meaning.
- Grain, such as one row per order, project, product-day, organization-month, or alert event.
- Primary key or natural key.
- Date/partition field.
- Dimensions, measures, enums, and nullable fields.
- Owner, refresh cadence, permission, and known quality risks.

If grain, key, owner, or refresh cadence is unknown, create a `GAP-*` item.

## Logical Model Rules

Logical models should represent business objects, not screens. Good examples:

- Organization.
- Product.
- Customer.
- Order.
- Contract.
- Payment.
- Inventory snapshot.
- Project.
- Alert.
- Task.
- Period summary.

For each logical model, define:

- Source models used.
- Grain after joins or aggregation.
- Keys and relationship cardinality.
- Whether historical, snapshot, or event data is required.
- Permission boundary, such as user org scope, region scope, project scope, or role scope.

## Response/View Model Rules

Response/view models should represent API/frontend shapes. They may be page-specific when the shape is genuinely page-specific.

For each response field:

- Map to a source field, logical field, metric ID, static enum, or `GAP-*`.
- State type, unit, precision, enum label, null rule, and example.
- State sensitivity, masking rule, and field-level permission when the field can expose customer, employee, financial, operational-risk, or commercially sensitive data.
- Mark calculated fields explicitly.
- Keep display labels separate from field names.

## Stable Field Naming

Use stable lower camel case for response fields unless the project already has a convention.

Examples:

- `period`
- `orgId`
- `orgName`
- `metricValue`
- `targetValue`
- `completionRate`
- `momRate`
- `yoyRate`
- `riskLevel`
- `ownerName`

Do not mix Chinese field names and English field names in the same response model unless the existing prototype/API contract already does so.

## Blank Cell Rule

For model tables, fill non-applicable cells with `none` and unknown cells with `TBD(GAP-*)`. Do not leave blanks for type, unit, precision, null rule, sensitivity, mapping, permission, owner, refresh cadence, or status.
