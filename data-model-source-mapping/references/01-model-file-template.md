# Model File Template

Use this exact structure when producing a 数据模型文件.

## 1. Model Overview

| Field | Value |
| --- | --- |
| Document purpose | TBD(GAP-*) |
| Document version | TBD(GAP-*) |
| Updated at | TBD(GAP-*) |
| Supported pages/modules | TBD(GAP-*) |
| Related API IDs | TBD(GAP-*) |
| Data owner | TBD(GAP-*) |
| Model owner | TBD(GAP-*) |
| Decision source | TBD(GAP-*) |
| Status | partial |
| Gap IDs | TBD(GAP-*) |

## 2. Data Sources

| Source ID | Source name | Type | Location | Owner | Refresh cadence | Permission rule | Reliability notes | Status | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Allowed source types: `table`, `view`, `file`, `upstream-api`, `manual`, `derived`, `unknown`.

## 3. Source Models

| Source model ID | Source ID | Physical object | Business meaning | Grain | Primary key | Natural keys | Date/partition field | Field count | Status | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Field metadata:

| Source model ID | Physical field | Business label | Type | Dimension/measure | Unit | Enum/range | Nullable | Sensitivity | Sample value | Quality note | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## 4. Logical Models

| Logical model ID | Business object | Source models | Grain | Keys | Relationships | Owner | Status | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Relationship metadata:

| From model | To model | Join keys | Cardinality | Join type | Required? | Quality risk | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- |

## 5. Response/View Models

| Response model ID | Used by APIs/pages | Row grain | Backing logical model | Sort/default order | Empty-state behavior | Status | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- |

Field metadata:

| Response model ID | Response field | Display label | Type | Source/logical mapping | Calculation | Unit | Precision | Enum labels | Null rule | Sensitivity | Masking/field permission | Example | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## 6. Metrics

| Metric ID | Metric name | Formula | Numerator | Denominator | Grain | Dimensions | Period logic | Unit | Precision | Direction | Baseline/threshold | Source dependency | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## 7. Transformation Mapping

| Mapping ID | Source field/model | Logical field/model | Response field/model | Transformation | Permission filter | Quality check | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- | --- |

## 8. Security Rules

| Rule ID | Target model/field | Sensitivity | Masking rule | Field-level permission | No-permission behavior | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- |

Sensitivity values: `public`, `internal`, `confidential`, `sensitive`, `unknown`.

## 9. Data Quality Rules

| Rule ID | Target model/field | Rule type | Rule description | Severity | Handling | Gap IDs |
| --- | --- | --- | --- | --- | --- | --- |

Rule types: `uniqueness`, `completeness`, `enum-validation`, `range-check`, `freshness`, `referential-integrity`, `reconciliation`.

## Blank Cell Rule

Do not leave required cells blank. Use `none` when intentionally not applicable, or `TBD(GAP-*)` when unknown. A row with `TBD(GAP-*)` cannot be `ready`.
