# Template Structure

## Project Layout

- `src/config/dashboard.config.ts`: primary entry for logo, screen size, left-sidebar navigation, per-page `layoutRows`, block-to-widget mapping, and filters.
- `src/types/dashboard.ts`: dashboard shell types, including nav item shape, filter groups, and layout fields.
- `src/components/DashboardShell.vue`: fixed 1920x1080 shell, Chinese collapsible left sidebar, filter popover, full right-side card grid rendering, and modal layer.
- `src/styles.css`: dashboard shell styles only. Do not put business widget CSS here.
- `src/data/dashboard.data.ts`: static/mock business rows. Keep raw data here instead of `dashboard.config.ts`.
- `src/widgets/templates/WidgetTemplate.vue`: copy this file to start every new business widget.
- `src/widgets/components/`: business widget components. The base template intentionally keeps this folder empty except for `.gitkeep`.
- `src/widgets/types.ts`: widget prop contracts and `WidgetPropsRegistry`.
- `src/widgets/registry.ts`: component registration table used by `WidgetRenderer`.
- `src/widgets/WidgetRenderer.vue`: resolves configured widgets, injects `context`, and applies shared content depth.
- `src/widgets/WidgetViewport.vue`: optional drag/zoom viewport for large widgets.
- `scripts/validate-dashboard-contract.mjs`: build-time contract check for widget data, filter binding, actions, and radar chart safety.
- `scripts/start-available-port.mjs`: auto-selects an available local port and starts Vite through `dev:auto` or `preview:auto`.
- `src/actions/registry.ts`: extension point for business-specific custom actions.
- `src/dataSources/registry.ts`: extension point for widget data, dynamic filter option data, and API resolvers.
- `src/utils/dashboardExpressions.ts`: resolves `$event`, `$filters`, `$context`, and `$params` expressions used by action and data-source config.
- `public/`: logo and static assets.

## Page Layout

`nav[].layoutRows` is the page layout contract. This template uses an 8*N content layout:

```ts
layoutRows: ['ABCDEFGH', 'iijjkkll', 'mmnnoopp']
```

- Each string is one row.
- Each string must contain 8 characters, so every page has 8 columns.
- The number of strings is N, the page row count.
- Adjacent equal characters merge across rows and columns.
- `.` and spaces are empty cells.
- The generated block id is the character itself, so widget keys must match those characters.
- The number of `nav` items is the number of pages shown in the left sidebar.
- `screen.grid.rowHeight` controls the base height for each row. When `N * rowHeight + gaps` exceeds the visible area, the right-side content area scrolls vertically.
- `screen.grid.rowHeight` must be at least 220px, so every one-row block resolves to at least 220px tall.
- If the content grid height plus gaps and vertical offsets exceeds 1080px, keep row heights and use vertical scrolling instead of shrinking rows below 220px.
- Download/print should render the full resolved height of the active page. Content taller than 1080px must paginate into multiple 1920x1080 print/PDF pages instead of clipping to the first viewport.
- The component-area background fills the entire body rectangle. It must not be inset to an internal safety line, and the body does not draw a default nested border.
- The shared card frame owns the visual base. Light theme cards are white, 8px radius, 24px padding, light `0 2px 10px` shadow, and no hard default border. Dark theme keeps the same geometry with enterprise dark tokens.
- Block titles are plain top-left text, 16px and 600 weight. Business widgets should not duplicate the block title or add a boxed internal title.
- Simple HTML tables adapt column width to content and viewport by default. Full cell content must remain readable by wrapping or table-level horizontal scrolling; do not use fixed layout plus ellipsis to hide undisplayed table content.

## Widget Registration Checklist

1. Copy `src/widgets/templates/WidgetTemplate.vue` to `src/widgets/components/MyWidget.vue`.
2. Replace the template props, markup, and `<style scoped>` with the real component implementation.
3. Add props typing:

```ts
export interface MyWidgetProps extends Record<string, unknown> {
  value: string;
}

export interface WidgetPropsRegistry {
  MyWidget: MyWidgetProps;
}
```

4. Register the component:

```ts
import MyWidget from './components/MyWidget.vue';

export const widgetRegistry: Partial<Record<RegisteredWidgetType, WidgetRegistration>> &
  Record<string, WidgetRegistration | undefined> = {
  MyWidget: {
    component: MyWidget,
    description: 'Describe the widget purpose.',
  },
};
```

5. Mount it in `dashboard.config.ts`:

```ts
widgets: {
  A: {
    type: 'MyWidget',
    visualType: 'other',
    title: 'Block Title',
    filterScope: 'query',
    data: {
      id: 'staticData',
      params: {
        key: 'queryRows',
        status: '$filters.status',
      },
    },
    props: {
      value: '128.6',
    },
  },
}
```

## Data Binding

Do not place raw business rows in `dashboard.config.ts`. Put static/mock rows in `src/data/dashboard.data.ts`:

```ts
export const dashboardData = {
  queryRows: [
    { status: 'active', dataset: 'finance', name: 'QRY-8921', value: 128 },
    { status: 'failed', dataset: 'legacy', name: 'QRY-8919', value: 5 },
  ],
};
```

Then reference the data source from widget config:

```ts
data: {
  id: 'staticData',
  params: {
    key: 'queryRows',
  },
}
```

`staticData` is built in. It reads `dashboardData[params.key]`, then applies:

- `params`: extra explicit filters by matching param keys that exist on the row.
- `context.filters`: current widget-visible filters, automatically matched to row fields with the same name.
- `data.filterFields`: optional mapping when filter ids and row fields differ.
- `data.requiredFilters`: filters that must find a mapped row field; otherwise the row is excluded.
- `data.ignoredFilters`: global filters this component intentionally ignores.
- `data.requiredParams`: fixed params that must find a matching row field; otherwise the row is excluded. Use this when a widget param is intended to filter `staticData`, so typos do not silently leave rows unfiltered.

Use option id `all` or `__all` for "no filtering".

Example field mapping:

```ts
data: {
  id: 'staticData',
  params: {
    key: 'queryRows',
  },
  filterFields: {
    dataset: 'dataset',
    org: 'regionId',
  },
  requiredFilters: ['dataset', 'org'],
  ignoredFilters: ['range'],
}
```

For API data, add a resolver in `src/dataSources/registry.ts` and use its key as `data.id`.

`WidgetRenderer` passes resolved rows into the component as a `data` prop. Business widgets should declare `data?: RowType[]` and render from it.

Widgets without `data` must set `dataPolicy: 'static'` for pure narrative/static content or `dataPolicy: 'external'` for externally managed runtime state. Otherwise `npm run validate:dashboard` fails.

Every widget must set `visualType` so the build-time validator can check its actual `layoutRows` span against the legal component span matrix. Use `line`, `bar`, `candlestick`, `heatmap`, `pie`, `radar`, `path`, `sunburst`, `gauge`, `scatter`, `boxplot`, `parallel`, `map`, `graph`, `tree`, `treemap`, `sankey`, `funnel`, `metric-card`, `text-summary`, `table`, or `other`.

Use `text-summary` for explanation, abstract, and conclusion widgets. Its legal spans are `4x1`, `5x1`, `6x1`, `7x1`, `8x1`, and `3x2`.

Avoid mixing two filter mechanisms for the same field. Prefer `filterFields` for normal filter-to-data binding. Use explicit `params` only for fixed component parameters or source-specific API parameters.

## Dynamic Filters

Static filters use `options`; dynamic filters use `source`. Dynamic option resolvers may return strings, numbers, or objects.

- Use dynamic sources for data-bearing filters such as time, organization, product, customer, project, owner, source system, and data version.
- Use static `options` only for true stable enums such as status, severity, period granularity, view mode, and yes/no toggles.
- If a filter exposes month, quarter, year, or rolling-period options, the affected datasets must contain rows for every enabled period option.
- Do not ship a multi-period filter backed by a single-month mock dataset.

Object options may include:

- `id` and `label`: stable value and display text.
- `disabled`: disabled option that cannot be selected.
- `reason`: tooltip text explaining disabled state.
- `count`: visible result count badge.
- `parentId` or `parent_id`: parent option for cascades.
- `level`, `sortOrder` or `sort_order`, `permissionScope` or `permission_scope`, and `meta`.

When a dynamic option list changes, the shell automatically clears an invalid or disabled current value and selects the first enabled option. If all options are disabled or missing, the filter value becomes empty and downstream widgets should show empty or no-permission states.

## Filter Scope

Filters without `scope` are global and affect every widget. Filters with `scope` affect only widgets whose `filterScope` overlaps:

```ts
filters: [
  {
    id: 'dataset',
    label: '数据集',
    scope: 'query',
    options: [
      { id: 'finance', label: '三季度财务' },
      { id: 'legacy', label: '历史日志' },
    ],
  },
]
```

```ts
widgets: {
  A: {
    type: 'QueryTable',
    filterScope: 'query',
    data: {
      id: 'staticData',
      params: {
        key: 'queryRows',
      },
    },
    props: {},
  },
}
```

Inside widgets, `context.filters` contains only global filters plus filters matching the widget's `filterScope`. Use `context.allFilters` only when a component intentionally needs every filter.

## Interaction Actions

Widgets should not directly open global modals, mutate filters, switch pages, or navigate. They emit events:

```ts
emit('dashboard-action', {
  name: 'rowClick',
  payload: {
    queryId: 'QRY-8921',
  },
});
```

Then configure the response on the widget:

```ts
actions: {
  rowClick: {
    type: 'openModal',
    target: 'QueryDetail',
    params: {
      queryId: '$event.queryId',
      status: '$filters.status',
    },
  },
}
```

Built-in actions:

- `openModal`: open `config.modals[target]` and pass `params`.
- `closeModal`: close the active modal.
- `switchNav`: switch to `target` or `navId`.
- `setFilters`: merge `filters` into the global filter state.
- `resetFilters`: reset every filter to its first option.
- `navigateUrl`: navigate to `url` or `target`; active filters are appended as query parameters by default. Use `query` for extra parameters and `includeFilters: false` to opt out.
- `print`: call browser print.
- `fullscreen`: toggle fullscreen.
- `refresh`: reload the page.

For business-only actions, register a handler in `src/actions/registry.ts`.

## Modals

When a modal opens, the shell stores the filter context in `context.sourceFilters` and `context.params.__filters`. If global filters change while the modal is open, modal widgets receive `context.isStale = true` and the modal header shows a sync action. Use that state to clear row selections, hide old evidence, or ask the user to synchronize before acting.

Modals are configured in `dashboard.config.ts` and use the same layout model as pages:

```ts
modals: {
  QueryDetail: {
    title: '查询明细',
    width: 960,
    height: 640,
    layoutRows: ['AAAA', 'AAAA'],
    widgets: {
      A: {
        type: 'QueryDetailTable',
        visualType: 'table',
        title: '明细列表',
        props: {},
      },
    },
  },
}
```

Modal widgets receive `context.area === 'modal'`, `context.modalId`, and `context.params`.

## Large Widget Viewport

Use `viewport` for content that is larger than its block:

```ts
viewport: {
  pannable: true,
  zoomable: true,
  minZoom: 0.5,
  maxZoom: 2,
  defaultZoom: 1,
  naturalWidth: 1200,
  naturalHeight: 720,
}
```
