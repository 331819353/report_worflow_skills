import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, 'src/config/dashboard.config.ts');
const widgetComponentsPath = path.join(projectRoot, 'src/widgets/components');
const errors = [];
const warnings = [];

const readText = (filePath) => readFileSync(filePath, 'utf8');
const sourceText = readText(configPath);
const sourceFile = ts.createSourceFile(configPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

const getName = (name) => {
  if (!name) {
    return '';
  }

  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return String(name.text);
  }

  return name.getText(sourceFile);
};

const getProperty = (objectNode, propertyName) =>
  objectNode?.properties?.find((property) => ts.isPropertyAssignment(property) && getName(property.name) === propertyName)
    ?.initializer;

const hasProperty = (objectNode, propertyName) => Boolean(getProperty(objectNode, propertyName));
const isObject = (node) => Boolean(node && ts.isObjectLiteralExpression(node));
const isArray = (node) => Boolean(node && ts.isArrayLiteralExpression(node));

const getStringValue = (node) => {
  if (!node) {
    return '';
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  return '';
};

const getNumberValue = (node) => {
  if (!node) {
    return undefined;
  }

  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }

  return undefined;
};

const getObjectKeys = (objectNode) =>
  isObject(objectNode)
    ? objectNode.properties
        .filter((property) => ts.isPropertyAssignment(property))
        .map((property) => getName(property.name))
        .filter(Boolean)
    : [];

const getStringArray = (node) =>
  isArray(node)
    ? node.elements.map((element) => getStringValue(element)).filter(Boolean)
    : [];

const collectGridRowHeights = () => {
  const rowHeights = [];

  const visit = (node) => {
    if (ts.isPropertyAssignment(node) && getName(node.name) === 'grid' && isObject(node.initializer)) {
      const rowHeight = getNumberValue(getProperty(node.initializer, 'rowHeight'));

      if (rowHeight !== undefined) {
        rowHeights.push(rowHeight);
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return rowHeights;
};

const collectFilterIds = () => {
  const filterIds = [];

  const visit = (node) => {
    if (ts.isPropertyAssignment(node) && getName(node.name) === 'filters' && isArray(node.initializer)) {
      node.initializer.elements.forEach((item) => {
        const id = getStringValue(getProperty(item, 'id'));

        if (id) {
          filterIds.push(id);
        }
      });
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return Array.from(new Set(filterIds));
};

const filterIds = collectFilterIds();
const gridRowHeights = collectGridRowHeights();
const minimumBlockHeight = 220;
const reservedActionHooks = new Set(['dashboardAction']);

const allowedSpansByVisualType = {
  line: ['2x1', '2x2', '3x2', '3x3', '4x4', '4x2', '4x3'],
  bar: ['2x1', '2x2', '3x2', '3x3', '4x4', '4x2', '4x3'],
  candlestick: ['2x1', '2x2', '3x2', '3x3', '4x4', '4x2', '4x3'],
  heatmap: ['2x1', '2x2', '3x2', '3x3', '4x4', '4x2', '4x3'],
  pie: ['1x1', '2x2', '3x2', '2x3', '3x3', '4x4'],
  radar: ['1x1', '2x2', '3x2', '2x3', '3x3', '4x4'],
  path: ['1x1', '2x2', '3x2', '2x3', '3x3', '4x4'],
  sunburst: ['1x1', '2x2', '3x2', '2x3', '3x3', '4x4'],
  gauge: ['1x1', '2x2', '3x2', '2x3', '3x3', '4x4'],
  scatter: ['3x1', '2x2', '3x2', '2x3', '3x3', '2x4', '4x4', '4x2', '4x3', '3x4'],
  boxplot: ['3x1', '2x2', '3x2', '2x3', '3x3', '2x4', '4x4', '4x2', '4x3', '3x4'],
  parallel: ['3x1', '2x2', '3x2', '2x3', '3x3', '2x4', '4x4', '4x2', '4x3', '3x4'],
  map: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  graph: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  tree: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  treemap: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  sankey: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  funnel: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  'metric-card': ['1x1', '2x1'],
  'text-summary': ['4x1', '5x1', '6x1', '7x1', '8x1', '3x2'],
  table: ['3x2', '4x2', '5x2', '3x3', '4x3', '5x3', '6x3', '7x3', '8x3', '4x4', '5x4', '6x4', '7x4', '8x4'],
  other: ['2x1', '2x2', '3x2', '3x3', '4x4', '4x2', '4x3'],
};

const emptyGridMarks = new Set(['.', ' ']);

const formatAllowedSpans = (visualType) => allowedSpansByVisualType[visualType]?.join(', ') ?? '';

const buildLayoutBlockSpans = (rowsToBuild, location) => {
  const cells = new Map();
  const spans = new Map();

  rowsToBuild.forEach((row, rowIndex) => {
    Array.from(row).forEach((label, columnIndex) => {
      if (!emptyGridMarks.has(label)) {
        cells.set(`${rowIndex}:${columnIndex}`, label);
      }
    });
  });

  const visited = new Set();
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const toKey = (row, column) => `${row}:${column}`;

  cells.forEach((label, cellKey) => {
    if (visited.has(cellKey)) {
      return;
    }

    const queue = [cellKey];
    const component = [];
    visited.add(cellKey);

    while (queue.length > 0) {
      const currentKey = queue.shift();

      if (!currentKey) {
        continue;
      }

      const [row, column] = currentKey.split(':').map(Number);
      component.push([row, column]);

      directions.forEach(([rowOffset, columnOffset]) => {
        const nextKey = toKey(row + rowOffset, column + columnOffset);

        if (!visited.has(nextKey) && cells.get(nextKey) === label) {
          visited.add(nextKey);
          queue.push(nextKey);
        }
      });
    }

    const rows = component.map(([row]) => row);
    const columns = component.map(([, column]) => column);
    const minRow = Math.min(...rows);
    const maxRow = Math.max(...rows);
    const minColumn = Math.min(...columns);
    const maxColumn = Math.max(...columns);
    const isRectangle = component.length === (maxRow - minRow + 1) * (maxColumn - minColumn + 1);

    if (!isRectangle) {
      errors.push(`${location}: layout block "${label}" must form one rectangle.`);
      return;
    }

    if (spans.has(label)) {
      errors.push(`${location}: layout block "${label}" appears in disconnected rectangles; use unique block ids.`);
      return;
    }

    spans.set(label, {
      columns: maxColumn - minColumn + 1,
      rows: maxRow - minRow + 1,
    });
  });

  return spans;
};

const validateActionObject = (actionNode, location) => {
  if (!isObject(actionNode)) {
    return;
  }

  const type = getStringValue(getProperty(actionNode, 'type'));

  if (!type) {
    errors.push(`${location}: action is missing type.`);
    return;
  }


  if (!reservedActionHooks.has(type)) {
    warnings.push(`${location}: custom action "${type}" must be registered in src/actions/registry.ts.`);
  }
};

const validateActions = (actionsNode, location) => {
  if (!isObject(actionsNode)) {
    return;
  }

  actionsNode.properties.forEach((property) => {
    if (!ts.isPropertyAssignment(property)) {
      return;
    }

    const actionName = getName(property.name);
    const actionValue = property.initializer;
    const actionLocation = `${location}.actions.${actionName}`;

    if (isArray(actionValue)) {
      actionValue.elements.forEach((item, index) => validateActionObject(item, `${actionLocation}[${index}]`));
      return;
    }

    validateActionObject(actionValue, actionLocation);
  });
};

const validateWidget = (widgetNode, location, span) => {
  if (!isObject(widgetNode)) {
    errors.push(`${location}: widget config must be an object.`);
    return;
  }

  const widgetType = getStringValue(getProperty(widgetNode, 'type'));
  const visualType = getStringValue(getProperty(widgetNode, 'visualType'));
  const dataNode = getProperty(widgetNode, 'data');
  const dataPolicy = getStringValue(getProperty(widgetNode, 'dataPolicy'));

  if (!widgetType) {
    errors.push(`${location}: widget is missing type.`);
  }

  if (!visualType) {
    errors.push(`${location}: widget must set visualType so the 8*N span can be validated.`);
  } else if (!allowedSpansByVisualType[visualType]) {
    errors.push(`${location}: unsupported visualType "${visualType}".`);
  } else if (!span) {
    errors.push(`${location}: widget key does not match any layoutRows block.`);
  } else {
    const spanText = `${span.columns}x${span.rows}`;

    if (!allowedSpansByVisualType[visualType].includes(spanText)) {
      errors.push(
        `${location}: visualType "${visualType}" cannot use span ${spanText}. Allowed spans: ${formatAllowedSpans(visualType)}.`,
      );
    }
  }

  if (!dataNode && dataPolicy !== 'static' && dataPolicy !== 'external') {
    errors.push(`${location}: widget must configure data or explicitly set dataPolicy: 'static' | 'external'.`);
  }

  if (dataNode) {
    const dataSourceId = getStringValue(getProperty(dataNode, 'id'));

    if (!dataSourceId) {
      errors.push(`${location}: widget.data is missing id.`);
    }

    if (filterIds.length > 0) {
      const hasFilterContract =
        hasProperty(dataNode, 'filterFields') || hasProperty(dataNode, 'requiredFilters') || hasProperty(dataNode, 'ignoredFilters');

      if (!hasFilterContract) {
        errors.push(
          `${location}: widget.data must declare filterFields, requiredFilters, or ignoredFilters so filter linkage is explicit.`,
        );
      }
    }

    const requiredFilters = getStringArray(getProperty(dataNode, 'requiredFilters'));
    const filterFieldKeys = getObjectKeys(getProperty(dataNode, 'filterFields'));
    const ignoredFilters = getStringArray(getProperty(dataNode, 'ignoredFilters'));
    const ignoredFilterReasonsNode = getProperty(dataNode, 'ignoredFilterReasons');

    [...requiredFilters, ...filterFieldKeys, ...ignoredFilters].forEach((filterId) => {
      if (filterIds.length > 0 && !filterIds.includes(filterId)) {
        warnings.push(`${location}: data binding references filter "${filterId}", but no filters[] entry uses that id.`);
      }
    });

    ignoredFilters.forEach((filterId) => {
      const reason = getStringValue(getProperty(ignoredFilterReasonsNode, filterId));

      if (!reason) {
        errors.push(
          `${location}: ignoredFilters includes "${filterId}" but data.ignoredFilterReasons.${filterId} is missing; explain the invariant scope instead of hiding missing filter grain.`,
        );
      }
    });

    getObjectKeys(ignoredFilterReasonsNode).forEach((filterId) => {
      if (!ignoredFilters.includes(filterId)) {
        warnings.push(`${location}: ignoredFilterReasons.${filterId} is set but ignoredFilters does not include "${filterId}".`);
      }
    });

    if (dataSourceId === 'staticData') {
      const paramsNode = getProperty(dataNode, 'params');
      const paramKeys = getObjectKeys(paramsNode).filter((key) => key !== 'key');
      const requiredParams = getStringArray(getProperty(dataNode, 'requiredParams'));

      if (!hasProperty(paramsNode, 'key')) {
        errors.push(`${location}: staticData must set data.params.key.`);
      }

      paramKeys.forEach((key) => {
        if (!requiredParams.includes(key)) {
          errors.push(`${location}: staticData param "${key}" must be listed in data.requiredParams or moved to filterFields.`);
        }
      });
    }
  }

  validateActions(getProperty(widgetNode, 'actions'), location);
};

const collectWidgets = () => {
  const widgets = [];

  const visit = (node) => {
    if (isObject(node)) {
      const widgetsNode = getProperty(node, 'widgets');

      if (isObject(widgetsNode)) {
        const layoutRows = getStringArray(getProperty(node, 'layoutRows'));
        const layoutSpans = buildLayoutBlockSpans(layoutRows, 'layoutRows');

        if (widgetsNode.properties.length > 0 && layoutRows.length === 0) {
          errors.push('widgets: cannot validate widget spans because sibling layoutRows is missing.');
        }

        widgetsNode.properties.forEach((property) => {
          if (ts.isPropertyAssignment(property)) {
            const blockId = getName(property.name);
            widgets.push({
              location: `widgets.${blockId}`,
              node: property.initializer,
              span: layoutSpans.get(blockId),
            });
          }
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return widgets;
};

const walkVueFiles = (dirPath) => {
  if (!existsSync(dirPath)) {
    return [];
  }

  return readdirSync(dirPath).flatMap((entry) => {
    const entryPath = path.join(dirPath, entry);
    const stat = statSync(entryPath);

    if (stat.isDirectory()) {
      return walkVueFiles(entryPath);
    }

    return entryPath.endsWith('.vue') ? [entryPath] : [];
  });
};

const validateWidgetSource = (filePath) => {
  const text = readText(filePath);
  const label = path.relative(projectRoot, filePath);
  const hasRadar = /type\s*:\s*['"]radar['"]|radar\s*:/.test(text);
  const hasLineChart =
    /type\s*:\s*['"]line['"]|visualType\s*:\s*['"]line['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]line['"]/.test(
      text,
    );
  const sortsCategoryLabelsOnly =
    /\b(?:labels|xAxisData|categories|categoryLabels)\b[\s\S]{0,260}(?:\.sort\s*\(|\.toSorted\s*\()/.test(text) ||
    /xAxis\s*:[\s\S]{0,520}data\s*:[\s\S]{0,260}(?:\.sort\s*\(|\.toSorted\s*\()/.test(text);
  const mapsSeriesFromRawRows =
    /series\s*:[\s\S]{0,1400}data\s*:\s*(?:props\.)?(?:data|rows|chartRows|filteredRows)\s*\.\s*map\s*\(/.test(
      text,
    );
  const usesAlignedCategoryHelper =
    /sortRowsForCategoryAxis|buildSingleSeriesCategoryData|\b(?:sortedRows|orderedRows)\b/.test(text);

  if (hasLineChart && sortsCategoryLabelsOnly && mapsSeriesFromRawRows && !usesAlignedCategoryHelper) {
    errors.push(
      `${label}: line chart categories are sorted separately while series data maps raw rows; sort rows first, then derive xAxis labels and every series.data from the same sorted rows.`,
    );
  } else if (hasLineChart && sortsCategoryLabelsOnly && !usesAlignedCategoryHelper) {
    warnings.push(
      `${label}: line chart sorts labels/categories directly; verify every series is built from that same ordered category list or use sortRowsForCategoryAxis/buildSingleSeriesCategoryData.`,
    );
  }

  if (hasRadar) {
    if (!/nameGap|axisName/.test(text)) {
      errors.push(`${label}: radar charts must configure axisName/nameGap so dimension labels do not collide with the plot.`);
    }

    if (!/legend\s*:/.test(text)) {
      errors.push(`${label}: radar charts must place legend outside the plot area or hide it intentionally.`);
    }

    if (!/radius\s*:/.test(text)) {
      warnings.push(`${label}: radar charts should set radius explicitly after reserving label and legend space.`);
    }
  }
};

if (gridRowHeights.length === 0) {
  errors.push(`screen.grid.rowHeight must be configured and at least ${minimumBlockHeight}.`);
}

gridRowHeights.forEach((rowHeight) => {
  if (rowHeight < minimumBlockHeight) {
    errors.push(`screen.grid.rowHeight must be at least ${minimumBlockHeight}; received ${rowHeight}.`);
  }
});

collectWidgets().forEach(({ node, location, span }) => validateWidget(node, location, span));
walkVueFiles(widgetComponentsPath).forEach(validateWidgetSource);

warnings.forEach((warning) => console.warn(`[dashboard-contract warning] ${warning}`));

if (errors.length > 0) {
  errors.forEach((error) => console.error(`[dashboard-contract error] ${error}`));
  process.exit(1);
}

console.log('[dashboard-contract] ok');
