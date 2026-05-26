---
name: left-nav-analytics-dashboard-template
description: Use this skill when creating, copying, or adapting a Vue 3 + TypeScript 1920x1080 multi-page analytics dashboard template with a Chinese collapsible left sidebar, filter popover, right-side full content canvas, 8*N card layout, dashboard.config.ts page/layout configuration, WidgetTemplate-based component development, independent data files, scoped filters, configurable actions, modal drilldowns, and pan/zoom widget viewport setup for Codex or hgermes workflows.
---

# Left-Nav Analytics Dashboard Template

Use this skill to produce a clean enterprise analytics dashboard template. The bundled asset is a Vue 3 + TypeScript + Vite project designed around a fixed 1920x1080 canvas, Chinese collapsible left navigation, a sidebar-anchored filter popover, a right-side full content canvas, 8*N card-style page layouts, independent data files, scoped filters, configurable actions, modal drilldowns, and WidgetTemplate-driven custom content.

## Quick Workflow

1. Copy `assets/dashboard-template/` into the target project, or merge its `src/`, `public/`, and config files into an existing Vue 3 + TypeScript + Vite app.
2. Run `npm install` if dependencies are not present.
3. Configure pages in `src/config/dashboard.config.ts`.
   - `nav` controls page count and left-sidebar navigation labels.
   - `layoutRows` controls the 8*N card layout for each page.
   - `filters` controls the sidebar-anchored filter popover.
   - `assets.logoSrc` controls the left navigation logo.
4. Create business widgets by copying `src/widgets/templates/WidgetTemplate.vue` into `src/widgets/components/MyWidget.vue`.
5. Register the widget in three places:
   - Add `MyWidgetProps` and `WidgetPropsRegistry.MyWidget` in `src/widgets/types.ts`.
   - Import and register `MyWidget` in `src/widgets/registry.ts`.
   - Mount it under the matching page block key in `dashboard.config.ts` through `nav[].widgets`.
6. Keep business data out of `dashboard.config.ts`. Put static/mock rows in `src/data/dashboard.data.ts` or register API resolvers in `src/dataSources/registry.ts`, then reference them through `widget.data`.
7. Use `filterScope` on widgets and `scope` on filters when a filter should affect only part of the dashboard.
8. For interactions, make widgets emit `dashboard-action` events and configure `widgets[block].actions` in `dashboard.config.ts`. Keep navigation, drilldown, modal, filter mutation, print, fullscreen, and URL navigation in the framework layer.
9. Configure modal drilldowns in `modals`. Modals use the same `layoutRows + widgets` model as pages.
10. For large widgets such as relation graphs, DuPont analysis, or wide canvases, configure `viewport` in `dashboard.config.ts` instead of implementing pan/zoom inside the widget.
11. Keep widget-specific CSS inside each widget's `<style scoped>` block. Keep `src/styles.css` for the dashboard shell only.
12. Run `npm run build` before handing off.

## Layout Rules

- The design canvas is fixed at 1920x1080. If the browser viewport is smaller, native scrollbars expose the full canvas.
- The left sidebar is part of the fixed canvas and supports expanded/collapsed states.
- The right side is entirely page content. It has no extra page header or footer.
- The right content area scrolls vertically and uses card-style blocks.
- Page layouts use the 8*N rule: each `layoutRows` string must contain 8 characters; the array length is the row count N.
- Each `layoutRows` string is one grid row. Each character is one grid cell. Adjacent equal characters merge into one block; `.` and spaces create empty cells.
- The template ships without demo business components. Empty blocks are valid placeholders until registered widgets are added.

## Widget Rules

- `WidgetRenderer.vue` and `WidgetViewport.vue` are framework pieces. Do not ask users to import them from business widgets.
- `WidgetRenderer` reads `dashboard.config.ts`, finds the component in `widgetRegistry`, injects `context`, and adds the shared content layer.
- `WidgetViewport` handles drag, zoom, reset, and initial centering when `viewport` is enabled.
- Business widgets should receive data through typed props and `context`, fill their parent with `width: 100%; height: 100%`, and own their private styles locally.
- Widget `data` is resolved by the shell and passed as a `data` prop. `context.filters` contains only filters visible to that widget's `filterScope`; `context.allFilters` contains every filter.
- Business widgets should emit `dashboard-action` with `{ name, payload }` for cross-widget behavior. The shell executes configured actions.

## References

Read `references/template-structure.md` when you need the file map, registration checklist, or more detailed configuration rules.
