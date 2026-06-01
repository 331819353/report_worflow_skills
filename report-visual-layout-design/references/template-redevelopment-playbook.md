# Template Redevelopment Playbook

Use this file when building a new business report from a copied template or heavily adjusting an existing copied template.

## Sequence

1. Convert business content into page structure:
   - Single-page: one `page.layoutRows` and one `page.widgets`.
   - Left-nav / sci-fi: one `nav[]` item per page/chapter.
2. Define filters:
   - Use `options` for stable enum filters.
   - Use `source` for time, organization, product, customer, project, owner, source system, and data version.
3. Design the `8 * N` grid:
   - Use 8 characters per row.
   - Use repeated characters for rectangular merged blocks.
   - Keep block ids stable.
   - Before finalizing `layoutRows`, calculate each block's actual size with `block-size-constraints.md`.
   - Check whether the block can safely hold its component count and component mix at the `1920 * 1080` and `1280 * 768` viewport baselines.
   - Let `layoutRows` grow when the report needs more content; do not cap the report at one viewport.
4. Define widgets:
   - Every widget needs `type`, `visualType`, `title`, and either `data` or `dataPolicy`.
   - Data-bound widgets declare row/prop shape in `src/widgets/types.ts`.
5. Add data:
   - Put static/mock rows in `dashboard.data.ts`.
   - Map filters with same-name fields or `filterFields`.
   - Use `requiredFilters` when a widget must respond to a filter.
6. Implement widgets:
   - Copy `WidgetTemplate.vue`.
   - Render only inside the body viewport.
   - Use `width: 100%; height: 100%; min-width: 0; min-height: 0;`.
   - Mount ECharts/S2 against the widget body, not the card frame.
   - If one block needs multiple subcomponents, implement one composite widget and keep internal subcomponent labels subordinate to the block title.
   - If the composite needs 2/4/6/8 visible subcomponents, follow the count limits in `block-size-constraints.md`.
7. Add interactions:
   - Emit `dashboard-action` from widgets.
   - Configure `actions` in widget config.
   - Put contextual detail in `modals`.
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
    props: { unit: 'CNY' },
    actions: {
      pointClick: {
        type: 'openModal',
        target: 'RevenueDetail',
        params: {
          org: '$filters.org',
          period: '$event.period',
        },
      },
    },
  },
}
```

## Minimal Data And Dynamic Filter

```ts
export const dashboardData = {
  revenueTrend: [
    { orgId: 'china', cycle: 'month', period: '2026-01', revenue: 128.6 },
  ],
};
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

## Minimal Modal

```ts
modals: {
  RevenueDetail: {
    title: 'Revenue Detail',
    width: 960,
    height: 640,
    layoutRows: ['AAAA', 'BBBB'],
    widgets: {
      A: {
        type: 'RevenueDetailSummary',
        visualType: 'text-summary',
        title: 'Summary',
        dataPolicy: 'static',
        props: {},
      },
      B: {
        type: 'RevenueDetailTable',
        visualType: 'table',
        title: 'Rows',
        data: {
          id: 'staticData',
          params: {
            key: 'revenueDetails',
            org: '$params.org',
            period: '$params.period',
          },
          requiredParams: ['org', 'period'],
        },
      },
    },
  },
}
```
