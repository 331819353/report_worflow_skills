# Template Redevelopment Playbook

Use this file when building a new business report from a copied template or heavily adjusting an existing copied template.

## Sequence

1. Convert business content into page structure:
   - Single-page: one `page.layoutRows` and one `page.widgets`.
   - Left-nav / sci-fi: one `nav[]` item per page/chapter.
2. Define filters:
   - Use `options` for stable enum filters.
   - Use `source` for time, organization, product, customer, project, owner, source system, and data version.
   - Default templates keep only a global parameter entry; add business filters only when the requirement needs them.
3. Design the `8 * N` grid:
   - Use 8 characters per row.
   - Use repeated characters for rectangular merged blocks.
   - Keep block ids stable.
   - Before finalizing `layoutRows`, calculate each block's actual size with `$report-visual-layout-design`.
   - Check whether the block can safely hold its component count and component mix at the `1920 * 1080` and `1280 * 768` viewport baselines.
   - Let `layoutRows` grow when the report needs more content; do not cap the report at one viewport.
4. Define widgets:
   - Every widget needs `type`, `visualType`, `title`, and either `data` or `dataPolicy`.
   - Data-bound widgets declare row/prop shape in `src/widgets/types.ts`.
5. Add data:
   - Put static/mock rows in `src/data/dashboard.dataset.json`.
   - Keep `filterData` for filter option rows and `businessData` for business rows.
   - Use built-in JSON resolvers (`filterData`, `businessData`, `staticData`) for offline data.
   - Use built-in standard API resolvers (`apiData`, `httpData`) for ordinary REST/BFF endpoints.
   - Register custom API/provider resolvers in `src/dataSources/registry.ts` only for signatures, special auth, complex pagination, SDKs, realtime streams, or multi-step requests.
   - Map filters with same-name fields or `filterFields`.
   - Use `requiredFilters` when a widget must respond to a filter.
   - Use `ignoredFilters` when a widget intentionally ignores a global filter.
   - For line, area, and category-axis charts, keep each category label and value in the same row tuple. Sort rows first, then derive `xAxis.data`, every `series.data`, tooltip payloads, and click payloads from that same ordered row list.
6. Implement widgets:
   - Copy `WidgetTemplate.vue`.
   - Render only inside the body viewport.
   - Use `width: 100%; height: 100%; min-width: 0; min-height: 0;`.
   - Mount ECharts/S2 against the widget body, not the card frame.
   - If one block needs multiple subcomponents, implement one composite widget and keep internal subcomponent labels subordinate to the block title.
   - If the composite needs 2/4/6/8 visible subcomponents, follow the count limits from `$report-visual-layout-design`.
7. Add interactions:
   - Emit `dashboard-action` from widgets.
   - Configure `actions` in widget config.
   - Keep popup, navigation, drilldown, and detail behavior inside the component unless the host product intentionally observes events through `actions/registry.ts`.
8. Validate:
   - Run `npm run validate:dashboard`.
   - Run `npm run build`.
   - Preview and check clipping, filter effects, modal stale state, export/fullscreen/refresh.

## Minimal Widget Config

```ts
widgets: {
  A: {
    type: 'RevenueTrend',
    visualType: 'line',
    title: 'Revenue Trend',
    filterScope: 'revenue',
    data: {
      id: 'staticData',
      params: { key: 'revenueTrend' },
      filterFields: {
        org: 'orgId',
        cycle: ['period', 'cycle'],
      },
      requiredFilters: ['org', 'cycle'],
    },
    props: {
      categoryField: 'period',
      valueField: 'revenue',
      sortField: 'period',
      sortDirection: 'asc',
      unit: 'CNY',
    },
    actions: {
      pointClick: {
        type: 'pointClick',
        params: {
          org: '$filters.org',
          period: '$event.period',
        },
      },
    },
  },
}
```

## Minimal JSON Data And Dynamic Filter

```json
{
  "filterData": {
    "orgs": [
      { "id": "china", "name": "中国区" }
    ]
  },
  "businessData": {
    "revenueTrend": [
      { "orgId": "china", "cycle": "month", "period": "2026-01", "revenue": 128.6 }
    ]
  }
}
```

```ts
filters: [
  {
    id: 'org',
    label: 'Organization',
    scope: 'revenue',
    source: {
      id: 'orgOptions',
      labelField: 'name',
      valueField: 'id',
    },
  },
]
```

Register `orgOptions` in `src/dataSources/registry.ts`.

## Minimal API Data Source

```ts
widgets: {
  A: {
    type: 'RevenueTable',
    visualType: 'table',
    title: '收入明细',
    data: {
      id: 'apiData',
      api: {
        url: '/api/revenue/rows',
        method: 'GET',
        query: {
          org: '$filters.org',
          cycle: '$filters.cycle',
        },
        responsePath: 'data.rows',
        adapter: 'rows',
      },
      filterFields: {
        org: 'orgId',
      },
      requiredFilters: ['org'],
    },
  },
}
```

```ts
filters: [
  {
    id: 'org',
    label: 'Organization',
    source: {
      id: 'apiData',
      api: {
        url: '/api/filter-options/orgs',
        responsePath: 'data.options',
        adapter: 'rows',
      },
      labelField: 'name',
      valueField: 'id',
    },
  },
]
```

For provider payloads that do not already match widget row fields, add a named adapter in `src/dataSources/registry.ts` and reference it with `api.adapter`.

## Component Local Filter Example

```ts
localFilters: [
  {
    id: 'productLine',
    label: '产品线',
    field: 'productLine',
    labelField: 'productLineName',
    mode: 'auto',
    maxButtonOptions: 5,
  },
]
```

This filter reads options from the widget's already loaded rows. It does not call an API and does not change provider-level totals.
