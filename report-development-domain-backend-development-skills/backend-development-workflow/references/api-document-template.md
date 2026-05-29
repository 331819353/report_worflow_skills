# Backend API Document Template

Use this structure when a backend workflow must output interface documentation.

## 1. Overview

- Service name:
- Purpose:
- Runtime:
- Base URL:
- Auth mode:

## 2. Input Files

| File | Format | Role | Key Fields | Parsing Notes |
| --- | --- | --- | --- | --- |

## 3. Data Sources

| Source | Type | Used By APIs | Key/Join Fields | Freshness | Fallback |
| --- | --- | --- | --- | --- | --- |

## 4. Data Models

### Raw Model: `{SourceModelName}`

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |

Relationships:

- 

Example:

```json
{}
```

### Response Model: `{ResponseModelName}`

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |

Example:

```json
{}
```

## 5. Source-To-Response Transformations

Use this section whenever source data and mock/frontend/API display shape differ.

| Source Field | Source Example | Response Field | Response Example | Rule |
| --- | --- | --- | --- | --- |
| `biz_date` | `20260529` | `period` | `202605` | Convert `YYYYMMDD` to `YYYYMM`; aggregate daily rows by month when endpoint grain is monthly. |

Document:

- Date/period normalization:
- Aggregation grain:
- Field rename/mapping:
- Enum code-to-label mapping:
- Unit conversion and precision:
- Derived formulas:
- Default/fill behavior:
- Sort/group rules:

## 6. Contract Verification

### Mock/Frontend Contract Alignment

| Frontend/Mock Field | API Field | Type Match | Unit/Precision | Empty-State Shape | Notes |
| --- | --- | --- | --- | --- | --- |

### Transformation Test Samples

| Case | Input Source Rows | Request Params | Expected Response | Checks |
| --- | --- | --- | --- | --- |
| Date normalization | `{"biz_date":"20260529","amount":100}` | `period=202605` | `{"period":"202605","amount":100}` | `YYYYMMDD -> YYYYMM`; amount reconciles. |

### Reconciliation Checks

- Totals/counts:
- Derived KPI formulas:
- Filtered result consistency:
- Empty-state behavior:

### Performance Limits

- Default page size:
- Maximum page size:
- Maximum export rows:
- Cache/precompute strategy:
- Refresh cadence:
- Timeout behavior:
- Large-file/database fallback:

## 7. API Inventory

| Method | Path | Purpose | Auth | Request Model | Response Model |
| --- | --- | --- | --- | --- | --- |

## 8. API Contracts

### `{METHOD} {PATH}`

Purpose:

Auth:

Data source:

Transformation:

Contract verification:

Request:

| Location | Field | Type | Required | Description |
| --- | --- | --- | --- | --- |

Response:

| Field | Type | Description |
| --- | --- | --- |

Success example:

```json
{}
```

Error examples:

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid request"
  }
}
```

## 9. Error Codes

| Code | HTTP Status | Meaning | Recovery |
| --- | --- | --- | --- |

## 10. Startup And Smoke Test

- Install:
- Run:
- Health check:
- Example curl:
