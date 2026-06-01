# Page Layout Modes

## 1. Entry Decision

Before designing a report page, decide which mode controls the page shell:

- Blank report page: no template is specified, the page starts from an empty canvas, or the user asks for a custom report shell.
- Template-based report page: the selected implementation uses one of this skill's bundled assets under `assets/templates/`: `single-page-dashboard-template`, `left-nav-analytics-dashboard-template`, `sci-fi-dashboard-template`, or another existing project template.

This decision comes before choosing cards, charts, filters, or navigation.

## 2. Blank Report Page

Blank pages need these capabilities, but they do not need to be three separate visual regions:

- Title identity: Haier logo, report title, period/scope, data status, and primary actions.
- Navigation: view switching, report hierarchy, chapter jump, or cross-report entry when needed.
- Filter access: scope setting and active filter feedback.
- Content display: the `8 * N` report grid.

Design title, navigation, and filter access as one coherent header/control area when that improves simplicity. Do not force a separate title strip, separate nav strip, and separate filter strip unless the product style or task genuinely needs them.

Good blank-page shell patterns:

- Integrated top control area: logo + title on the left, compact tabs or breadcrumb below/near the title, filter trigger and actions on the right.
- Title + segmented views: logo/title/scope in one row, view tabs as small segmented controls, filters opened from a button with active chips.
- Compact workbench header: logo/title/status plus icon actions; filter drawer or popover opens from the toolbar.
- Low-intrusion side navigation: icon-collapsed or narrow nav only when many report chapters must be visible.

Blank-page content rules:

- The content display area starts after the unified control area.
- Use an `8 * N` rectangular grid.
- `N` grows with content. Enable vertical scrolling when the grid exceeds the first viewport.
- Do not compress row heights to force all blocks into one screen.

## 3. Template-Based Report Page

When a template is selected, the template owns the shell.

Rules:

- Follow the selected template's layout zones, logo slot, navigation style, filter mechanism, toolbar, modal/drawer model, sizing model, and grid mechanics.
- Configure the template through its intended fields: title, assets/logo, nav, filters, toolbar actions, `layoutRows`, widgets, modals, theme, and data source bindings.
- Do not redesign the template's global frame unless the task explicitly asks to modify the template.
- If the template exposes `public/haier-logo.svg`, keep that asset for the light/default logo slot unless a dark theme requires the white logo variant.
- If the template defines invoked filters, keep that pattern. If it defines persistent filters, keep them compact and aligned with the template's own controls.
- For scrollable templates, keep row/block heights and enable vertical scrolling when the `8 * N` content exceeds the active viewport height.
- Treat `1920 * 1080` and `1280 * 768` as visible viewport baselines, not full report height limits.
- For fixed big-screen templates, respect the fixed 1920*1080 canvas and do not force the 220px scrollable-row rule.

## 4. Navigation Guidance

Navigation should help orientation without competing with the report.

Prefer:

- Breadcrumb text for hierarchy.
- Compact tabs for peer views.
- Segmented controls for mode switching.
- Icon-collapsed side navigation for many chapters.
- Drawer navigation for low-frequency report switching.

Avoid:

- Large persistent menus for single-report pages.
- Heavy sidebars when a top tab or breadcrumb is enough.
- Repeating global navigation inside every report block.
- Navigation that pushes the first useful report answer below the fold.

## 5. Filter Guidance

Filters should be easy to invoke, but should not dominate the page.

Prefer:

- Filter button/popover/drawer/bottom sheet for the full filter form.
- Active filter chips near the title, toolbar, or filter trigger.
- 0-3 persistent high-frequency filters only when they are essential for comprehension.
- Reset, apply, and saved-view actions for complex filter sets.
- Sticky behavior only when repeated filtering is a primary task.

Avoid:

- A large permanent filter region by default.
- Hiding active scope after a filter is applied.
- Making users scroll before they can understand or change the report scope.
- Filter layouts that create a separate visual block heavier than the report answer.
