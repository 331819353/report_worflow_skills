# Template Structure

## Project Layout

- `src/config/dashboard.config.ts`: primary entry for assets, screen size, page navigation, per-page `layoutRows`, block-to-widget mapping, and filters.
- `src/types/dashboard.ts`: dashboard shell types, including nav item shape, filter groups, and screen layout fields.
- `src/components/DashboardShell.vue`: fixed 1920x1080 shell, title area, controls, navigation/filter drawers, and grid rendering.
- `src/styles.css`: dashboard shell styles only. Do not put business widget CSS here.
- `src/data/dashboard.data.ts`: static/mock business rows. Keep raw data here instead of `dashboard.config.ts`.
- `src/widgets/templates/WidgetTemplate.vue`: copy this file to start every new business widget.
- `src/widgets/components/`: business widget components. The base template intentionally keeps this folder empty except for `.gitkeep`.
- `src/widgets/types.ts`: widget prop contracts and `WidgetPropsRegistry`.
- `src/widgets/registry.ts`: component registration table used by `WidgetRenderer`.
- `src/widgets/WidgetRenderer.vue`: resolves configured widgets, injects `context`, and applies shared content depth.
- `src/widgets/WidgetViewport.vue`: optional drag/zoom viewport for large widgets.
- `src/actions/registry.ts`: extension point for business-specific custom actions.
- `src/dataSources/registry.ts`: extension point for widget data, dynamic filter option data, and API resolvers.
- `src/utils/dashboardExpressions.ts`: resolves `$event`, `$filters`, `$context`, and `$params` expressions used by action and data-source config.
- `public/`: logo, title background, and tiled background assets.

## Page Layout

`nav[].layoutRows` is the page layout contract:

```ts
layoutRows: ['ABCDEFGH', 'iggkllmm', 'innkoopp']
```

- Each string is one row.
- Each character is one column.
- Adjacent equal characters merge across rows and columns.
- `.` and spaces are empty cells.
- The generated block id is the character itself, so widget keys must match those characters.
- The number of `nav` items is the number of pages shown in the navigation drawer.

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
    title: 'Block Title',
    filterScope: 'revenue',
    data: {
      id: 'staticData',
      params: {
        key: 'revenueMonthly',
        cycle: '$filters.cycle',
        scope: '$filters.scope',
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
  revenueMonthly: [
    { cycle: 'month', scope: 'china', name: '1月', value: 128 },
    { cycle: 'month', scope: 'overseas', name: '1月', value: 92 },
  ],
};
```

Then reference the data source from widget config:

```ts
data: {
  id: 'staticData',
  params: {
    key: 'revenueMonthly',
  },
}
```

`staticData` is built in. It reads `dashboardData[params.key]`, then applies:

- `params`: extra explicit filters by matching param keys that exist on the row.
- `context.filters`: current widget-visible filters, automatically matched to row fields with the same name.
- `data.filterFields`: optional mapping when filter ids and row fields differ.
- `data.requiredFilters`: filters that must find a mapped row field; otherwise the row is excluded.
- `data.ignoredFilters`: global filters this component intentionally ignores.

Use option id `all` or `__all` for "no filtering".

Example field mapping:

```ts
data: {
  id: 'staticData',
  params: {
    key: 'revenueMonthly',
  },
  filterFields: {
    scope: 'regionId',
    cycle: ['period', 'cycle'],
  },
  requiredFilters: ['scope', 'cycle'],
  ignoredFilters: ['range'],
}
```

For API data, add a resolver in `src/dataSources/registry.ts` and use its key as `data.id`.

`WidgetRenderer` passes resolved rows into the component as a `data` prop. Business widgets should declare `data?: RowType[]` and render from it.

Avoid mixing two filter mechanisms for the same field. Prefer `filterFields` for normal filter-to-data binding. Use explicit `params` only for fixed component parameters or source-specific API parameters.

## Filter Scope

Filters without `scope` are global and affect every widget. Filters with `scope` affect only widgets whose `filterScope` overlaps:

```ts
filters: [
  {
    id: 'scope',
    label: '经营范围',
    scope: 'revenue',
    options: [
      { id: 'china', label: '中国区' },
      { id: 'overseas', label: '海外' },
    ],
  },
]
```

```ts
widgets: {
  A: {
    type: 'RevenueChart',
    filterScope: 'revenue',
    data: {
      id: 'staticData',
      params: {
        key: 'revenueMonthly',
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
  name: 'barClick',
  payload: {
    regionId: 'east',
  },
});
```

Then configure the response on the widget:

```ts
actions: {
  barClick: {
    type: 'openModal',
    target: 'RevenueDetail',
    params: {
      regionId: '$event.regionId',
      cycle: '$filters.cycle',
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

## Dynamic Filters

Static filters use `options`. Dynamic filters use `source`:

```ts
{
  id: 'region',
  label: '区域',
  source: {
    id: 'regionOptions',
    labelField: 'name',
    valueField: 'id',
    params: {
      cycle: '$filters.cycle',
    },
  },
}
```

Register `regionOptions` in `src/dataSources/registry.ts`. A data source returns an array of strings, numbers, or objects. For objects, `labelField` and `valueField` decide how options are generated.

When loading dynamic options, the shell passes all active filters except the filter currently being loaded, so a selected value does not collapse its own option list. Use `source.params` only when a filter option source intentionally needs the current selected value.

## Modals

When a modal opens, the shell stores the filter context in `context.sourceFilters` and `context.params.__filters`. If global filters change while the modal is open, modal widgets receive `context.isStale = true` and the modal header shows a sync action. Use that state to clear row selections, hide old evidence, or ask the user to synchronize before acting.

Modals are configured in `dashboard.config.ts` and use the same layout model as pages:

```ts
modals: {
  RevenueDetail: {
    title: '收入明细',
    width: 960,
    height: 640,
    layoutRows: ['A'],
    widgets: {
      A: {
        type: 'RevenueDetailTable',
        title: '明细列表',
        props: {
          dataSource: 'revenueDetail',
        },
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

The widget should render at its natural size inside its own root. `WidgetViewport` handles centering, dragging, zooming, and double-click reset.

## Acceptance Checklist

- `npm run build` passes.
- `rg "MetricCard|SimpleBarChart" src` returns no result in the clean template.
- Business widget CSS is scoped inside the widget file.
- `dashboard.config.ts` is enough to change assets, pages, layouts, filters, and widget placement.
- Empty blocks render cleanly when no widget is registered.
