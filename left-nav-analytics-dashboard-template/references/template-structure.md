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
    status: '$filters.status',
    dataset: '$filters.dataset',
  },
}
```

`staticData` is built in. It reads `dashboardData[params.key]` and filters rows by matching params that exist on the row. For API data, add a resolver in `src/dataSources/registry.ts` and use its key as `data.id`.

`WidgetRenderer` passes resolved rows into the component as a `data` prop. Business widgets should declare `data?: RowType[]` and render from it.

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
        dataset: '$filters.dataset',
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
- `navigateUrl`: navigate to `url` or `target`.
- `print`: call browser print.
- `fullscreen`: toggle fullscreen.
- `refresh`: reload the page.

For business-only actions, register a handler in `src/actions/registry.ts`.

## Modals

Modals are configured in `dashboard.config.ts` and use the same layout model as pages:

```ts
modals: {
  QueryDetail: {
    title: '查询明细',
    width: 960,
    height: 640,
    layoutRows: ['A'],
    widgets: {
      A: {
        type: 'QueryDetailTable',
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
