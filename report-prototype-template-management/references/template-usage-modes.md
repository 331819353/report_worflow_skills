# Template Usage Modes

Use this file when explaining how a selected template should be used in a delivery flow.

## 1. 零开发 Mode

Purpose: give the user a runnable, brand-correct report shell with placeholders and configuration entry points, without implementing business widgets.

Use when:

- the user wants a blank starter, layout shell, or reusable template;
- business components, APIs, metrics, and data contracts are not ready;
- the next team will fill in widgets later.

What to edit:

- `src/config/dashboard.config.ts`: page title, logo path, `layoutRows`, empty or placeholder `widgets`, and global filter entry.
- `src/data/dashboard.dataset.json`: keep the default `filterData` / `businessData` structure, usually with empty arrays.
- `demo/config-templates.ts`: keep copyable examples for JSON data binding, standard API data binding, local filters, actions, and custom resolver references.

What not to edit:

- Do not implement fake business widgets only to make the page look complete.
- Do not put business data into `dashboard.config.ts`.
- Do not add global modal, navigation, or drilldown behavior. The shell only reserves action hooks.

Verification:

- `npm run validate:dashboard`
- `npm run build`
- Browser opens and shows the shell, Haier logo, favicon, filters/tool buttons, grid blocks, and `建设中` placeholders.

## 2. 复制修改 Mode

Purpose: copy a bundled template into a new report project and make normal configuration-level changes.

Use when:

- the report requirement fits one bundled shell;
- the project can adopt the template's Vue 3 + Vite structure;
- mock/static JSON, standard `apiData` config, or a small number of custom data-source resolvers are enough for the current handoff.

Required changes:

- Copy `assets/templates/<template-id>/` into the project.
- Use `template-layout-design-system.md` before changing template-level spacing, block padding, card radius, block title placement, content range, or shell hover/focus behavior.
- Edit `src/config/dashboard.config.ts` for title, theme, navigation, `layoutRows`, `widgets`, global filters, and toolbar labels, but preserve the copied template's native nav/page shape, filter trigger/panel/popover pattern, toolbar placement, theme fields, and logo slot.
- Adapt requirement-document title/filter/navigation/toolbar requirements into the copied template's existing config slots. Do not add a second title area, standalone filter bar, extra sidebar, or duplicate toolbar unless the task is explicitly a template-level redesign.
- Put mock/static data in `src/data/dashboard.dataset.json`. Do not create generated `src/widgets/*Data.ts`, `src/data/*.ts`, or other TS fixture modules for rows, arrays, or payloads.
- Register business widgets in `src/widgets/types.ts` and `src/widgets/registry.ts`.
- Implement visual components under `src/widgets/components/`.
- Bind widgets through `widget.data.id` and either `widget.data.params.key` for JSON mode or `widget.data.api` for standard API mode.
- Bind component-title filters through `localFilters[].field`, `valueField`, and `labelField`; these filters run on the component's already loaded data.
- Before binding global/page filters, prove data completeness: options, business/API rows, required fields, default and non-default states, empty/no-permission states, and resolver/API branches exist for every affecting filter.
- Bind global/page filters that affect widgets through `widget.data.filterFields`, `requiredFilters`, API query/body params, or resolver params. Do not put an affecting filter in `ignoredFilters`.
- Configure `actions` only as event forwarding or integration hooks; component-level popup, navigation, drilldown, and detail behavior stays inside the component.
- Add, remove, or relabel navigation/filter items through the template's existing `nav`/`page` and `filters` arrays. Do not create a new standalone sidebar, top navigation, filter bar, or filter drawer unless the task is explicitly a template-level redesign.
- Treat "筛选工具栏", "主筛选栏", and "filter bar" wording as a filter contract request, not a visual-surface request. Implement it through `filters[]`, native template filter invocation, local title-band filters, and filter-to-widget binding.
- When `screen.defaultTheme` is `dark`, the logo variant, grid/card surfaces, Element Plus controls, and component scoped backgrounds must follow the same dark token system as the shell; do not leave default white cards, `ElSelect`/`ElInput`/date-picker surfaces, or popovers in a dark page.

Data options:

- JSON mode: use built-in `filterData`, `businessData`, or `staticData` resolvers.
- Standard API mode: use `id: 'apiData'` or `id: 'httpData'`, configure `api.url`, `api.query`, `api.headers`, `api.body`, `api.responsePath`, and optional `api.adapter` directly on `widget.data` or `filters[].source`.
- Custom provider mode: for signatures, special auth, complex pagination, SDKs, realtime streams, multi-step requests, or scenario data that must change by view/month/organization/status but is not row-filterable, add a resolver in `src/dataSources/registry.ts`, adapt the provider payload to component-ready rows, then reference the resolver id in `widget.data.id` or `filters[].source.id`.
- Field mapping: if a global filter id differs from a row field, use `data.filterFields`; if the widget must respond to a filter, add `requiredFilters`; if it should ignore a global filter, add `ignoredFilters` plus `ignoredFilterReasons` only with an intentional invariant-scope reason.
- Mock/offline data: one default snapshot is not enough for an affecting global filter. Add matching rows or resolver branches for every primary filter option that should visibly change component data.

Verification:

- Type-check `demo/config-templates.ts` when examples are changed.
- `npm run validate:dashboard`
- `npm run build`
- Runtime smoke test for the selected local URL.

## 3. 落地项目二开 Mode

Purpose: integrate the template contract into a real project and replace demo/static sources with production providers.

Use when:

- there is an existing frontend app, deployment route, auth/SSO requirement, or API/BFF provider;
- the report needs production adapters, permission scope, environment config, or cross-system embedding;
- the team will keep maintaining the page beyond prototype handoff.

Implementation rules:

- Preserve the selected template's shell contract: logo slot, title/control area, navigation model, filter mechanism, `8 * N` grid, block title ownership, widget viewport, local filter tools, and action hook boundary.
- Use the built-in `apiData` / `httpData` config for ordinary REST/BFF endpoints; templates use a shared axios instance with request/response interceptors under this data-source boundary. Move complex provider calls into `src/dataSources/registry.ts` or the existing project's equivalent service layer; do not scatter axios or legacy fetch calls inside widgets.
- Keep adapters at the data-source boundary so widgets receive stable rows/props.
- Global/page-level filters must be passed through `api.query`, `api.body`, or the provider resolver before shaping component data. Component-title `localFilters` may filter only the already fetched component dataset.
- API response fields may be mapped through an adapter or `filterFields`; do not rename fields randomly across config, data, and component props.
- Component popup, jump, drilldown, and deep interaction logic is implemented inside the component or the hosting product module. The global `actions/registry.ts` remains a hook surface for external event observation or shell-level utilities.
- Keep `demo/config-templates.ts` as copyable reference code, not as production data.

Production handoff should document:

- selected template id and why it fits;
- JSON sources retained for offline/demo mode, if any;
- API source ids, provider endpoints, `responsePath`, and adapter names;
- filter-to-provider input mapping;
- filter-to-widget response proof, including non-default filter states that change visible data;
- response adapter mapping to widget rows;
- component-level local filters and interactions;
- build/runtime verification evidence and remaining blockers.
