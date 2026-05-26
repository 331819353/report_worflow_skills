# Template Structure

## Project Layout

- `src/config/dashboard.config.ts`: primary entry for assets, screen size, single-page `layoutRows`, block-to-widget mapping, modals, and filters.
- `src/types/dashboard.ts`: dashboard shell types, including page layout, filter groups, theme labels, and screen layout fields.
- `src/components/DashboardShell.vue`: fixed 1920x1080 shell, top menu bar, filter drawer, modal layer, and grid rendering.
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
- `public/`: logo and optional background assets.

## Page Layout

`page.layoutRows` is the single-page layout contract:

```ts
page: {
  layoutRows: ['AAAABBBB', 'CCDDEEFF', 'gghhiijj'],
  widgets: {},
}
```

- Each string is one row.
- Each character is one column.
- Each row should usually contain 8 characters.
- Adjacent equal characters merge across rows and columns.
- `.` and spaces are empty cells.
- The generated block id is the character itself, so widget keys must match those characters.
- There is no page navigation or sidebar in this template.

## Top Bar Contract

The shell top bar is fixed and intentionally simple:

- Center: `screen.title`.
- Left position one: `assets.logoSrc`.
- Right side from left to right: theme switch, refresh, filter, download.
- The rightmost position is download, the second position from the right is filter, and refresh is also on the right side.
- The theme switch toggles the built-in light and dark layouts and persists the selected theme in `sessionStorage`.

Do not add navigation tabs, side menus, breadcrumbs, extra icons, or page switching to this template unless the user explicitly asks to extend the frame.

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
page: {
  layoutRows: ['AAAABBBB', 'CCDDEEFF'],
  widgets: {
    A: {
      type: 'MyWidget',
      title: 'Block Title',
      filterScope: 'revenue',
      data: {
        id: 'staticData',
        params: {
          key: 'revenueMonthly',
        },
        filterFields: {
          cycle: ['period', 'cycle'],
          scope: 'regionId',
        },
        requiredFilters: ['cycle', 'scope'],
      },
      props: {
        value: '128.6',
      },
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
- `data.requiredParams`: fixed params that must find a matching row field; otherwise the row is excluded. Use this when a widget param is intended to filter `staticData`, so typos do not silently leave rows unfiltered.

Use option id `all` or `__all` for "no filtering".

Avoid mixing two filter mechanisms for the same field. Prefer `filterFields` for normal filter-to-data binding. Use explicit `params` only for fixed component parameters or source-specific API parameters.

For API data, add a resolver in `src/dataSources/registry.ts` and use its key as `data.id`.

`WidgetRenderer` passes resolved rows into the component as a `data` prop. Business widgets should declare `data?: RowType[]` and render from it.

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

Inside widgets, `context.filters` contains only global filters plus filters matching the widget's `filterScope`. Use `context.allFilters` only when a component intentionally needs every filter.

## Interaction Actions

Widgets should not directly open global modals, mutate filters, or navigate. They emit events:

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
- `setFilters`: merge `filters` into the global filter state.
- `resetFilters`: reset every filter to its first option.
- `navigateUrl`: navigate to `url` or `target`; active filters are appended as query parameters by default. Use `query` for extra parameters and `includeFilters: false` to opt out.
- `print`: call browser print.
- `fullscreen`: toggle fullscreen when triggered by widget action or custom action.
- `refresh`: reload the page.

`switchNav` is kept only as a compatibility no-op for older action code; do not use it in new single-page configurations.

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

Object options may also include:

- `disabled`: disabled option that cannot be selected.
- `reason`: tooltip text explaining disabled state.
- `count`: visible result count badge.
- `parentId` or `parent_id`: parent option for cascades.
- `level`, `sortOrder` or `sort_order`, `permissionScope` or `permission_scope`, and `meta`.

When a dynamic option list changes, the shell automatically clears an invalid or disabled current value and selects the first enabled option. If all options are disabled or missing, the filter value becomes empty and downstream widgets should show empty or no-permission states.

When loading dynamic options, the shell passes all active filters except the filter currently being loaded, so a selected value does not collapse its own option list. Use `source.params` only when a filter option source intentionally needs the current selected value.

## Modals

When a modal opens, the shell stores the filter context in `context.sourceFilters` and `context.params.__filters`. If global filters change while the modal is open, modal widgets receive `context.isStale = true` and the modal header shows a sync action. Use that state to clear row selections, hide old evidence, or ask the user to synchronize before acting.

Modals are configured in `dashboard.config.ts` and use the same layout model as page widgets:

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

Do not implement page-level pan/zoom inside business widgets when `WidgetViewport` can provide it.
