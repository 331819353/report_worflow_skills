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

### Model: `{ModelName}`

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |

Relationships:

- 

Example:

```json
{}
```

## 5. API Inventory

| Method | Path | Purpose | Auth | Request Model | Response Model |
| --- | --- | --- | --- | --- | --- |

## 6. API Contracts

### `{METHOD} {PATH}`

Purpose:

Auth:

Data source:

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

## 7. Error Codes

| Code | HTTP Status | Meaning | Recovery |
| --- | --- | --- | --- |

## 8. Startup And Smoke Test

- Install:
- Run:
- Health check:
- Example curl:
