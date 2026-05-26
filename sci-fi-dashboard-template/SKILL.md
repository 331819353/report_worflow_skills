---
name: sci-fi-dashboard-template
description: Use this skill when creating, copying, or adapting a Vue 3 + TypeScript 1920x1080 multi-page sci-fi dashboard/cockpit template for Codex or hgermes workflows. It covers the reusable project boilerplate, dashboard.config.ts page/layout configuration, WidgetTemplate-based component development, widget type registration, independent data files, widget data-source binding, scoped filters, configurable actions, modal drilldowns, and pan/zoom widget viewport setup.
---

# Sci-Fi Dashboard Template

Use this skill to produce a clean, reusable sci-fi big-screen dashboard template. The bundled asset is a Vue 3 + TypeScript + Vite project designed around a fixed 1920x1080 canvas, multi-page navigation, independent data files, data-source-backed widgets and filters, scoped filters, configurable actions, modal drilldowns, and WidgetTemplate-driven custom content.

## Quick Workflow

1. Copy `assets/dashboard-template/` into the target project, or merge its `src/`, `public/`, and config files into an existing Vue 3 + TypeScript + Vite app.
2. Run `npm install` if dependencies are not present.
3. Configure pages in `src/config/dashboard.config.ts`.
   - `nav` controls page count and navigation labels.
   - `layoutRows` controls the block layout for each page.
   - `filters` controls the right-side filter drawer.
   - `assets` controls logo, title background, and tiled page background.
4. Create business widgets by copying `src/widgets/templates/WidgetTemplate.vue` into `src/widgets/components/MyWidget.vue`.
5. Register the widget in three places:
   - Add `MyWidgetProps` and `WidgetPropsRegistry.MyWidget` in `src/widgets/types.ts`.
   - Import and register `MyWidget` in `src/widgets/registry.ts`.
   - Mount it under the matching page block key in `dashboard.config.ts` through `nav[].widgets`.
6. Keep business data out of `dashboard.config.ts`. Put static/mock rows in `src/data/dashboard.data.ts` or register API resolvers in `src/dataSources/registry.ts`, then reference them through `widget.data`.
7. Use `filterScope` on widgets and `scope` on filters when a filter should affect only part of the dashboard.
8. For interactions, make widgets emit `dashboard-action` events and configure `widgets[block].actions` in `dashboard.config.ts`. Keep navigation, drilldown, modal, filter mutation, print, fullscreen, and URL navigation in the framework layer.
9. Register dynamic filter option data sources in `src/dataSources/registry.ts`, then reference them through `filters[].source`.
10. Configure modal drilldowns in `modals`. Modals use the same `layoutRows + widgets` model as pages.
11. For large widgets such as DuPont analysis, relation graphs, or wide canvases, configure `viewport` in `dashboard.config.ts` instead of implementing pan/zoom inside the widget.
12. Keep widget-specific CSS inside each widget's `<style scoped>` block. Keep `src/styles.css` for the dashboard shell only.
13. Run `npm run build` before handing off.

## Layout Rules

- The design canvas is fixed at 1920x1080. If the browser viewport is smaller, native scrollbars should expose the full canvas.
- The title area is fixed and floats above the tiled background.
- Each `layoutRows` string is one grid row. Each character is one grid cell. Adjacent equal characters merge into one block; `.` and spaces create empty cells.
- The template should ship without demo business components. Empty blocks are valid placeholders until registered widgets are added.

## Widget Rules

- `WidgetRenderer.vue` and `WidgetViewport.vue` are framework pieces. Do not ask users to import them from business widgets.
- `WidgetRenderer` reads `dashboard.config.ts`, finds the component in `widgetRegistry`, injects `context`, and adds the shared content layer.
- `WidgetViewport` handles drag, zoom, reset, and initial centering when `viewport` is enabled.
- Business widgets should receive data through typed props and `context`, fill their parent with `width: 100%; height: 100%`, and own their private styles locally.
- Widget `data` is resolved by the shell and passed as a `data` prop. `context.filters` contains only filters visible to that widget's `filterScope`; `context.allFilters` contains every filter.
- Business widgets should emit `dashboard-action` with `{ name, payload }` for cross-widget behavior. The shell executes configured actions.

## References

Read `references/template-structure.md` when you need the file map, registration checklist, or more detailed configuration rules.
