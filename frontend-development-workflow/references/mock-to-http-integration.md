# Mock To HTTP Integration Reference

Use this reference only when the chosen runtime provider is REST/BFF HTTP. For GraphQL, SDKs, static files, realtime feeds, data-source registries, or mixed provider work, start with `mock-to-provider-integration.md` first.

## Discovery Commands

Search for mock data and fake request patterns:

```bash
rg -n "mock|fixture|fixtures|staticData|dashboard\\.data|Promise\\.resolve|setTimeout|localStorage|sessionStorage|fetch\\(|axios|request\\(" src
rg --files | rg "(mock|fixture|data|api|service|request|http|client|store|composable)"
```

Inspect package and framework clues:

```bash
rg -n "vite|vue|react|axios|fetch|pinia|vuex|router|proxy|baseURL|VITE_" package.json vite.config.* src
```

## Mapping Template

Build this mapping before editing data flow:

```text
Mock source:
Consumer pages/components:
Current view model fields:
Current UI interactions:
Endpoint:
Method:
Request params/body:
Auth/header requirements:
Response data path:
Response-to-view-model adapter:
Empty/error behavior:
Verification case:
```

## Request Layer Pattern

Prefer the existing request utility. If none exists, add the smallest project-native client.

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
```

For axios projects, use the existing axios instance and interceptors instead of adding `fetch`.

## Service Function Pattern

Keep endpoint knowledge in service modules and keep component data close to the previous mock shape.

```ts
export interface ApiMetricRow {
  orgName: string;
  value: number;
  target: number;
}

export interface MetricViewModel {
  name: string;
  actual: number;
  target: number;
}

export async function fetchMetrics(params: { orgId?: string; period?: string }): Promise<MetricViewModel[]> {
  const res = await requestJson<{ data: ApiMetricRow[] }>(
    `/api/metrics?${new URLSearchParams(removeEmpty(params))}`,
  );

  return res.data.map(row => ({
    name: row.orgName,
    actual: row.value,
    target: row.target,
  }));
}
```

Use a small helper such as `removeEmpty` only if the project does not already have query serialization utilities.

## Component Or Store Integration

When a component previously imported a mock array:

1. Replace the import with a service call, composable, or store action consistent with the project.
2. Add reactive `loading`, `error`, and `data` state if absent.
3. Pass current filters, route params, pagination, and sorting into the service call.
4. Re-fetch when those state values change.
5. Keep chart/table props shaped like the existing view model unless a narrow refactor is necessary.

Vue example:

```ts
const loading = ref(false);
const error = ref<string>();
const rows = ref<MetricViewModel[]>([]);

async function load() {
  loading.value = true;
  error.value = undefined;

  try {
    rows.value = await fetchMetrics({
      orgId: selectedOrg.value,
      period: selectedPeriod.value,
    });
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Request failed";
  } finally {
    loading.value = false;
  }
}

watch([selectedOrg, selectedPeriod], load, { immediate: true });
```

## Environment And Proxy

Use environment variables for base URLs:

```text
VITE_API_BASE_URL=/api
```

Use a dev-server proxy when browser CORS blocks local development and the API docs provide a backend host:

```ts
server: {
  proxy: {
    "/api": {
      target: "https://backend.example.com",
      changeOrigin: true,
    },
  },
}
```

Do not hard-code production-only hosts into components.

## Runnability Loop

Use the commands already present in `package.json`. A typical loop is:

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev -- --host 0.0.0.0 --port 5173
```

If the repo uses `pnpm`, `yarn`, or `bun`, follow the lockfile/package-manager convention. If a command is missing, skip it and state that it is not defined.

After startup, verify:

- The target page loads without blocking runtime errors.
- Network calls hit documented endpoints or the configured proxy.
- 401/403/auth behavior follows the project auth rules.
- Loading, empty, and failed request states are visible and do not break layout.
- API response adapters handle missing optional fields and empty arrays.
- Build output succeeds after mock imports are removed.

Repeat edits and checks until verification passes or an external service dependency blocks progress.

## Post-Integration Prototype QA

Before deployment or final handoff, run a focused page-by-page pass after mock data has been replaced:

- Exercise each visible control, route jump, tab, drawer, modal, table operation, chart click, export, refresh, and empty/error state.
- Confirm interactions still use live HTTP-backed data and the current filters, route params, pagination, and selected records.
- Search user-facing source text for stale prototype copy:

```bash
rg -n "原型|mock|demo|示例|TODO|占位|placeholder|lorem|测试标题|未命名" src public index.html
```

- Clean titles, menus, breadcrumbs, labels, button text, placeholders, tooltips, document title, download names, and error messages that still describe the prototype instead of the delivered page.
- Fix dead controls, mismatched titles, wrong metric names, malformed units, stale explanatory text, and any copy that no longer matches the HTTP-backed feature.
