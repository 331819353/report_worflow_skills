# Page Layout Modes

## 1. Entry Decision

Before designing a report page, decide which mode controls the page shell:

- `pageShellPath: template`: default for report layout work. Use the selected implementation asset under `assets/templates/`: `topbar-dark-scroll-dashboard-template`, `topbar-light-scroll-dashboard-template`, `left-nav-analytics-workbench-template`, `frozen-title-sci-fi-cockpit-template`, or another existing project template.
- `pageShellPath: custom`: use only when the user explicitly asks for 自行设计开发 / 自由设计 / custom development, explicitly asks to 百分百复刻 / exactly restore a provided sample/HTML/source, or a documented template limitation makes all bundled templates unsuitable.

This decision comes before choosing cards, charts, filters, or navigation.

Declare `pageStyleSource` before implementation:

- `templateDefault`: no style specified and no HTML/source/sample styling provided; use a bundled template.
- `userSpecified`: user names the design style or shell; choose the bundled template that best satisfies that direction unless the user explicitly asks for custom development.
- `sampleProvided`: screenshot, HTML source, image, or display sample supplies style; use custom `htmlReplica` only for explicit exact restoration, otherwise choose the closest bundled template and use the sample as evidence.

Declare `brandMode` before `visualMode`:

- `haierBranded`: default for Haier enterprise pages, Haier-branded prototypes, and custom report pages unless the user clearly asks otherwise.
- `sampleNative`: only when a provided HTML/source/sample is explicitly non-Haier and the user asks to keep source-native branding.
- `neutral`: only when the user explicitly asks for a generic non-branded page.
- If `brandMode: haierBranded`, configure the Haier logo and global UI tokens while preserving the selected shell's main hierarchy.
- If `brandMode: sampleNative` or `neutral`, record why Haier branding is not required instead of silently omitting the decision.

## 2. Custom Report Page

When `pageShellPath: custom`, choose exactly one `customDesignPath`:

- `htmlReplica`: replicate provided HTML/source/sample structure. Preserve the source shell, module order, container hierarchy, main control count, layer structure, and card proportions unless the user explicitly asks for redesign.
- `freeDesign`: create a custom shell from requirements without an HTML/source/sample visual authority. Use this only when the user asks for custom/free design or a template limitation is documented.

Hard logo rule for both custom paths when `brandMode: haierBranded`:

- `htmlReplica` and `freeDesign` must use the bundled Haier logo in the unified title/control area, header, or sidebar brand area.
- Prefer `haier-logo.svg` / original color on light backgrounds and `haier-logo-white.svg` on dark backgrounds.
- If the provided HTML/sample lacks a logo, add Haier logo as a required brand element while preserving the sample's main layout.
- A logo placeholder is a blocking gap for `brandMode: haierBranded` custom pages, not an accepted final state. Do not mark that custom page complete until a real Haier logo asset is configured.
- If `brandMode: sampleNative` or `neutral`, do not add Haier logo only because the page is custom; keep the source/native identity and record the brand decision.

Global UI rule for custom paths:

- `htmlReplica` preserves the source shell, module order, container hierarchy, main control count, layer structure, and card proportions.
- `freeDesign` follows the selected custom layout pattern.
- Both paths must use the project/global UI tokens for palette, typography, spacing, radius, shadows, semantic states, and Element Plus/control styling unless the user explicitly asks for exact color restoration.
- Do not let copied HTML inline colors, one-off card surfaces, or ad hoc control styles override the global UI system.

Custom pages need these capabilities, but they do not need to be three separate visual regions:

- Title identity: Haier logo, report title, period/scope, data status, and primary actions.
- Navigation: view switching, report hierarchy, chapter jump, or cross-report entry when needed.
- Filter access: scope setting and active filter feedback.
- Content display: the `8 * N` report grid.

Design title, navigation, and filter access as one coherent header/control area when that improves simplicity. Do not force a separate title strip, separate nav strip, and separate filter strip unless the product style or task genuinely needs them.

Choose exactly one `customLayoutPattern` before designing a custom page:

- `symmetricBalance` / 对称式: balanced left-right or top-bottom blocks for comparison, paired metric groups, or two-side diagnosis.
- `threePart` / 三部式: summary, analysis, and detail/action zones; useful when the page needs a clear top answer and two supporting layers.
- `masterDetail` / 主从式: primary list/map/chart with detail panel/drawer/table; useful for record exploration, monitoring, and traceability.
- `narrativeStack` / 分层叙事式: vertical conclusion-evidence-diagnosis-detail-action flow; useful for recap, diagnosis, and leadership reading.

Do not invent another custom layout pattern unless the user explicitly asks for it.

Good custom-page shell patterns:

- Integrated top control area: logo + title on the left, compact tabs or breadcrumb below/near the title, filter trigger and actions on the right.
- Title + segmented views: logo/title/scope in one row, view tabs as small segmented controls, filters opened from a button with active chips.
- Compact workbench header: logo/title/status plus icon actions; filter drawer or popover opens from the toolbar.
- Low-intrusion side navigation: icon-collapsed or narrow nav only when many report chapters must be visible.

Custom-page content rules:

- The content display area starts after the unified control area.
- Use an `8 * N` rectangular grid.
- `N` grows with content. Enable vertical scrolling when the grid exceeds the first viewport.
- Do not compress row heights to force all blocks into one screen.

## 3. Template-Based Report Page

When a template is selected, the template owns the shell.

Rules:

- Follow the selected template's layout zones, logo slot, navigation style, filter mechanism, toolbar, action hook boundary, sizing model, and grid mechanics.
- Configure the template through its intended fields: title, assets/logo, nav/page, filters, toolbar actions, `layoutRows`, widgets, theme, and data source bindings.
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
