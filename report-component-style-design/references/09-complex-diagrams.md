# Complex Diagram Rules

Use for decomposition trees, relation graphs, Sankey, flows, DuPont, attribution paths, process chains, and org/path diagrams.

## Safe Spacing Calculation Gate

Run this gate before drawing or accepting any flow, Sankey, graph, tree, decomposition, DuPont, lineage, attribution, or process-chain diagram.

Required inputs:

- `viewportPadding`: left/right/top/bottom padding inside the diagram body.
- `leftRailWidth`: width reserved for level numbers, stage labels, axis rail, or side category labels.
- `nodeHalfWidth` and `nodeHalfHeight`: half of the rendered node box size.
- `labelReserve`: extra width/height for node labels, value labels, and badges when they render outside the node.
- `edgeBendReserve`: horizontal/vertical space required for curved links, arrowheads, and link-value labels.
- `minGutter`: minimum safe spacing; use at least 16px.

Coordinate rules:

- First node column: `firstNodeLeftEdge >= viewportPadding.left + leftRailWidth + minGutter`.
- Any node near a rail: `nodeX - nodeHalfWidth - labelReserve >= viewportPadding.left + leftRailWidth + minGutter`.
- Adjacent node columns: `nextNodeLeftEdge - currentNodeRightEdge >= max(minGutter, edgeBendReserve)`.
- Adjacent rows: `nextNodeTopEdge - currentNodeBottomEdge >= minGutter`; increase when labels or curved edges pass between rows.
- Edge bend zone: curve control points and arrowheads must stay outside node boxes and label boxes by at least `minGutter`.
- Right/bottom bounds: `nodeRightEdge + labelReserve + edgeBendReserve + viewportPadding.right <= viewportWidth`; same principle for bottom bounds.

Acceptance:

- Layer numbers, labels, nodes, edges, arrowheads, and edge labels must never overlap, touch, or sit within less than 16px of each other.
- If the formula cannot pass inside the current block, use zoom/pan, collapse branches, aggregate tails, split the diagram, move to fullscreen, or switch to a hierarchy table/tree list.

## Viewport First

- Complex diagrams must live inside an explicit viewport with clipping, zoom, pan, reset, and fit-to-screen.
- The diagram must not expand the page horizontally or vertically.
- Provide fullscreen when node count, edge count, or label length exceeds the block body.
- Use minimap only when it helps navigation and does not cover labels.

## Labels And Nodes

- Node text must fit inside the node box. Wrap to two lines, abbreviate, or show full text in tooltip.
- Do not let labels sit outside nodes if they collide with edges or neighboring nodes.
- Keep node padding sufficient for Chinese labels and numeric values.
- If child branches are too dense, collapse low-priority branches and show expand controls.

## Edge And Flow Density

- Avoid edge labels unless they are necessary. Show edge values on hover when dense.
- Use consistent edge thickness/value mapping and provide legend when mapping is not obvious.
- Do not allow crossing edges to hide node labels. Change layout direction, spacing, or branch grouping.
- For Sankey/flow, aggregate long tails into `其他` or secondary groups.

## Interaction

- Hover highlights the node, connected edges, and exact values without moving layout.
- Click opens a detail drawer when users need evidence, decomposition path, or task action.
- Provide reset view, fit view, zoom in/out, and export where useful.
- Touch devices need visible controls, not hover-only discovery.

## Fallbacks

- If the diagram cannot remain readable at the required size, switch to hierarchy table, expandable tree list, small multiples, or a fullscreen-first view.
- If exact values are more important than path shape, pair the diagram with a table or detail drawer.
