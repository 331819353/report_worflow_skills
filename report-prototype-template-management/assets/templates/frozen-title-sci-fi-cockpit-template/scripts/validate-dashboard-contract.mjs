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
const reservedActionHooks = new Set(['dashboardAction']);

const allowedSpansByVisualType = {
  line: ['2x1', '2x2', '3x2', '3x3', '4x4', '4x2', '4x3'],
  bar: ['2x1', '2x2', '3x2', '3x3', '4x4', '4x2', '4x3'],
  combo: ['2x2', '3x2', '4x2', '3x3', '4x3', '4x4'],
  candlestick: ['2x1', '2x2', '3x2', '3x3', '4x4', '4x2', '4x3'],
  heatmap: ['2x1', '2x2', '3x2', '3x3', '4x4', '4x2', '4x3'],
  pie: ['1x1', '2x2', '3x2', '2x3', '3x3', '4x4'],
  radar: ['1x1', '2x2', '3x2', '2x3', '3x3', '4x4'],
  path: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  sunburst: ['3x3', '4x3', '3x4', '4x4'],
  gauge: ['1x1', '2x2', '3x2', '2x3', '3x3', '4x4'],
  scatter: ['3x1', '2x2', '3x2', '2x3', '3x3', '2x4', '4x4', '4x2', '4x3', '3x4'],
  boxplot: ['3x1', '2x2', '3x2', '2x3', '3x3', '2x4', '4x4', '4x2', '4x3', '3x4'],
  parallel: ['3x2', '3x3', '4x2', '4x3', '3x4', '4x4'],
  map: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  graph: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  tree: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  treemap: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  sankey: ['3x2', '3x3', '4x3', '4x4'],
  funnel: ['2x2', '3x2', '3x3', '4x3', '4x4'],
  'metric-card': ['1x1', '2x1'],
  'text-summary': ['4x1', '5x1', '6x1', '7x1', '8x1', '3x2'],
  table: ['3x2', '4x2', '5x2', '3x3', '4x3', '5x3', '6x3', '7x3', '8x3', '4x4', '5x4', '6x4', '7x4', '8x4'],
  pivot: ['4x3', '5x3', '6x3', '7x3', '8x3', '4x4', '5x4', '6x4', '7x4', '8x4', '6x5', '7x5', '8x5'],
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


const validateAnalysisInsightContract = (contractNode, location) => {
  if (!isObject(contractNode)) {
    errors.push(`${location}: analysisInsightContract must be an object.`);
    return;
  }

  const requiredFields = ['subtype', 'insightFamily', 'conclusion', 'validationRules'];

  requiredFields.forEach((field) => {
    if (!hasProperty(contractNode, field)) {
      errors.push(`${location}: analysisInsightContract must declare ${field}.`);
    }
  });

  if (!hasProperty(contractNode, 'evidence') && !hasProperty(contractNode, 'confidence')) {
    errors.push(`${location}: analysisInsightContract must include evidence or an explicit confidence/insufficient-data signal.`);
  }

  if (!hasProperty(contractNode, 'recommendedActions') && !hasProperty(contractNode, 'detailRoute') && !hasProperty(contractNode, 'tooltipPayload')) {
    errors.push(`${location}: analysisInsightContract must include recommendedActions, detailRoute, or tooltipPayload for action/evidence disclosure.`);
  }
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
  const analysisInsightNode = getProperty(widgetNode, 'analysisInsightContract') || getProperty(getProperty(widgetNode, 'props'), 'analysisInsightContract');

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

  if (analysisInsightNode) {
    validateAnalysisInsightContract(analysisInsightNode, location);
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
  const hasGaugeChart =
    /(?:visualType|type)\s*:\s*['"]gauge['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]gauge['"]|gauge(?:Data|Rows?|Metric|Value|Option|Config|Thresholds?)|仪表盘图|GaugeChart/.test(
      text,
    );
  const hasBoxplot =
    /type\s*:\s*['"]boxplot['"]|visualType\s*:\s*['"]boxplot['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]boxplot['"]/.test(
      text,
    );
  const hasHeatmap =
    /type\s*:\s*['"]heatmap['"]|visualType\s*:\s*['"]heatmap['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]heatmap['"]/.test(
      text,
    );
  const hasParallelChart =
    /(?:visualType|type)\s*:\s*['"]parallel['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]parallel['"]|parallel(?:Axis|Axes|Data|Dimensions?|Rows?)|平行坐标/.test(
      text,
    );
  const hasPathChart =
    /visualType\s*:\s*['"]path['"]|path(?:Nodes?|Links?|Steps?)|路径图|用户路径|流程路径/.test(text);
  const hasFunnelChart =
    /(?:visualType|type)\s*:\s*['"]funnel['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]funnel['"]|funnel(?:Data|Rows?|Stages?)|漏斗图|Funnel/.test(
      text,
    );
  const hasSankeyChart =
    /(?:visualType|type)\s*:\s*['"]sankey['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]sankey['"]|sankey(?:Data|Nodes?|Links?|Edges?)|桑基图|Sankey/.test(
      text,
    );
  const hasTreemapChart =
    /(?:visualType|type)\s*:\s*['"]treemap['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]treemap['"]|treemap(?:Data|Nodes?|Leaves?)|矩形树图|面积树图/.test(
      text,
    );
  const hasSunburstChart =
    /(?:visualType|type)\s*:\s*['"]sunburst['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]sunburst['"]|sunburst(?:Data|Nodes?|Root)|旭日图/.test(
      text,
    );
  const hasTreeChart =
    !hasTreemapChart &&
    !hasSunburstChart &&
    /(?:visualType|type)\s*:\s*['"]tree['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]tree['"]|tree(?:Nodes?|Data|Root)|hierarchy(?:Nodes?|Data)|层级树|树图/.test(
      text,
    );
  const hasGraph =
    /type\s*:\s*['"]graph['"]|visualType\s*:\s*['"]graph['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]graph['"]/.test(
      text,
    );
  const hasLineChart =
    /type\s*:\s*['"]line['"]|visualType\s*:\s*['"]line['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]line['"]/.test(
      text,
    );
  const hasComboChart =
    /(?:visualType|type)\s*:\s*['"]combo['"]|combo(?:Data|Rows?|Series|Option|Config)|柱线组合图|柱状图\s*\+\s*折线图|ComboChart|series\s*:[\s\S]{0,1600}type\s*:\s*['"]bar['"][\s\S]{0,1600}type\s*:\s*['"]line['"]|series\s*:[\s\S]{0,1600}type\s*:\s*['"]line['"][\s\S]{0,1600}type\s*:\s*['"]bar['"]/.test(
      text,
    );
  const hasCompositePanel =
    /(?:visualType|type)\s*:\s*['"]composite-panel['"]|CompositePanel|compositePanelContract|composite(?:Panel|Children|Layout|State|Tooltip)|multiComponent|multi-component|多组件组合图|组合面板|复合面板/.test(
      text,
    );
  const hasAnalysisInsight =
    /analysisInsightContract|AnalysisInsight|ConclusionCard|InsightCard|AnomalyAlert|AttributionCard|RecommendationCard|RiskCard|DataQualityCard|ForecastNote|ChartAnnotation|ExplanatoryEmpty|结论卡|洞察卡|关键发现|异常告警|归因分析|影响因素|目标达成诊断|行动建议|风险提示|数据口径|指标定义|数据质量|预测说明|图表注释|分析摘要|关键变化说明|排名解读|解释型空态|无结果说明|数据延迟说明/.test(text);
  const hasPivotTable =
    /(?:visualType|type)\s*:\s*['"]pivot['"]|PivotTable|pivot(?:Rows?|Columns?|Measures?|Data|Config)|s2(?:Options?|DataConfig)|SheetComponent|@antv\/s2|@antv\/s2-vue|rowDimensions?|columnDimensions?|rowFields?|columnFields?|valueFields?|透视表/.test(
      text,
    );
  const hasGroupedTableHeader =
    /groupedHeader|groupedHeaders|groupedColumns|columnGroups?|columnTree|multiLevelHeader|complexHeader|GroupedTableHeader|复杂表头|多级表头|columns\s*:[\s\S]{0,1200}children\s*:/.test(
      text,
    );
  const hasDetailTable =
    !hasPivotTable &&
    /(?:visualType|type)\s*:\s*['"]table['"]|<el-table\b|<ElTable\b|tableColumns|detail(?:Rows?|Table)|row-key=|rowKey\s*=/.test(
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


  if (hasAnalysisInsight) {
    if (!/analysisInsightContract|subtype|insightFamily/.test(text)) {
      errors.push(`${label}: Analysis & Insight components must declare analysisInsightContract or equivalent subtype/family metadata.`);
    }

    if (!/(?:conclusion|mainConclusion|primaryInsight|summaryText|结论|洞察|判断)/.test(text)) {
      errors.push(`${label}: Analysis & Insight components must declare a conclusion before evidence.`);
    }

    if (!/(?:evidence|supportingMetric|baseline|compareWith|changeValue|affectedObjects?|reasonFields?|sourceDataset|freshnessField|证据|基线|对比|变化|影响对象|原因|来源|更新时间)/.test(text)) {
      errors.push(`${label}: Analysis & Insight components must expose evidence, affected object, comparison/change, reason, source, or freshness fields.`);
    }

    if (!/(?:recommendedActions?|detailRoute|tooltipPayload|confidence|definitionRefs?|dataQualityScope|stateRules|insufficient|noPermission|empty|error|loading|建议|行动|详情|可信度|口径|状态|空态|权限|错误|加载)/.test(text)) {
      errors.push(`${label}: Analysis & Insight components must expose action/detail/trust/definition/state behavior.`);
    }
  }

  if (hasCompositePanel) {
    if (!/(?:compositePanelContract|CompositePanel|children\s*:|childComponents?|compositeChildren|子组件|组合面板)/.test(text)) {
      errors.push(`${label}: Composite Panels must declare compositePanelContract or child component metadata.`);
    }

    if (!/(?:topic|businessQuestion|analysisSequence|summary|trend|structure|contribution|exception|detail|action|主题|分析顺序|闭环)/.test(text)) {
      errors.push(`${label}: Composite Panels must declare one shared topic and analysis sequence.`);
    }

    if (!/(?:primaryChildId|primaryChild|mainChild|mainVisual|P1|主组件|主图|主视觉)/.test(text)) {
      errors.push(`${label}: Composite Panels must declare one primary child/main visual.`);
    }

    if (!/(?:role|priority|P1|P2|P3|P4|minW|minH|minWidth|minHeight|childCount|childrenLimit|maxChildren|子组件数量|优先级|最小尺寸)/.test(text)) {
      errors.push(`${label}: Composite Panels must declare child roles, priorities, count limits, and minimum sizes.`);
    }

    if (!/(?:layoutPattern|metric-main|main-side|main-detail|main-two-side|two-by-two|metric-main-side|contentH|primaryVisualWeight|50-70|0\.60|CH\s*\*\s*0\.60|主从布局|内容区)/.test(text)) {
      errors.push(`${label}: Composite Panels must declare layout pattern, primary visual weight, and content-height budget.`);
    }

    if (!/(?:sharedLocalFilters?|panelFilter|localFilters?|childLocalFilter|filterScope|局部筛选|组件内筛选|子组件筛选)/.test(text)) {
      errors.push(`${label}: Composite Panels must declare panel-level local filters and any child-only filter exception.`);
    }

    if (!/(?:sharedLegend|legend|sharedUnit|unit|单位|图例)/.test(text)) {
      errors.push(`${label}: Composite Panels must declare shared legend or unit behavior.`);
    }

    if (!/(?:linkedInteraction|hover|click|selected|selection|highlight|tooltip|detailPreview|detailRoute|查看全部|联动|高亮|明细)/.test(text)) {
      errors.push(`${label}: Composite Panels must declare hover/click linkage, tooltip, and detail-preview or detail-route behavior.`);
    }

    if (!/(?:responsiveFallback|fallback|collapse|hide|small|compact|P4|P3|P2|P1|降级|收起|隐藏|响应式)/.test(text)) {
      errors.push(`${label}: Composite Panels must declare responsive fallback and child-priority collapse order.`);
    }

    if (!/(?:loading|empty|error|noPermission|permission|partial|暂无数据|加载|错误|权限|局部空态)/.test(text)) {
      errors.push(`${label}: Composite Panels must define parent/child loading, empty, error, no-permission, and partial-state behavior.`);
    }
  }

  if (hasComboChart) {
    if (!/(?:type\s*:\s*['"]bar['"]|series\s*:[\s\S]{0,1200}type\s*:\s*['"]bar['"])/.test(text)) {
      errors.push(`${label}: combo charts must include an ECharts bar series for the scale/count/amount metric.`);
    }

    if (!/(?:type\s*:\s*['"]line['"]|markLine\s*:|targetLine|referenceLine|目标线|参考线)/.test(text)) {
      errors.push(`${label}: combo charts must include an ECharts line, markLine, target, or reference series for the rate/trend/target metric.`);
    }

    if (!/xAxis\s*:/.test(text) || !/yAxis\s*:/.test(text) || !/series\s*:/.test(text)) {
      errors.push(`${label}: combo charts must declare xAxis, yAxis, and data-driven series.`);
    }

    if (!/legend\s*:/.test(text)) {
      errors.push(`${label}: combo charts must declare a legend separate from component-local filters.`);
    }

    if (!/tooltip\s*:/.test(text) || !/(?:trigger\s*:\s*['"]axis['"]|axisPointer\s*:)/.test(text)) {
      errors.push(`${label}: combo charts must provide axis-trigger tooltip or axisPointer access to every bar, line, and target value.`);
    }

    if (!/(?:pairedRelationship|relationship|barMetric|lineMetric|primaryMetric|secondaryMetric|growth|rate|conversion|target|attainment|efficiency|ROI|CTR|关系|增长率|转化率|完成率|达成率|利润率|目标)/.test(text)) {
      errors.push(`${label}: combo charts must declare a paired business relationship and the bar/line metric roles.`);
    }

    if (!/(?:leftAxis|rightAxis|yAxisIndex|dualAxis|axisUnit|unit|单位|%|percent|rate|金额|数量|万元|元)/.test(text)) {
      errors.push(`${label}: combo charts must declare axis units and left/right y-axis mapping.`);
    }

    if (!/(?:maxSeries|seriesLimit|totalSeries|seriesCount|legendItems|barSeries|lineSeries|<=\s*4|categoryCount|labelStep|dataZoom|sampling|visibleSeries|系列上限|类目密度)/.test(text)) {
      errors.push(`${label}: combo charts must declare visible series limits and category-density fallback.`);
    }

    if (/(?:yAxisIndex\s*:\s*1|rightAxis|dualAxis|双轴)/.test(text) && !/(?:unit|单位|tooltip|axisLabel|rightAxisUnit|percent|%)/.test(text)) {
      errors.push(`${label}: dual-axis combo charts must expose right-axis units and exact tooltip values.`);
    }
  }

  if (hasGroupedTableHeader) {
    if (!/(?:columnTree|groupedColumns?|columnGroups?|columns\s*:|children\s*:|复杂表头|多级表头)/.test(text)) {
      errors.push(`${label}: grouped table headers must declare a columnTree, groupedColumns, columnGroups, or nested columns contract.`);
    }

    if (!/(?:field|dataIndex|prop|key|leafColumns?|leafField|字段|叶子列)/.test(text)) {
      errors.push(`${label}: grouped table headers must tie visible leaf headers to real data fields.`);
    }

    if (!/(?:colSpan|rowSpan|spanRules|maxDepth|headerLevel|headerDepth|leafColumnCount|computedSpan|合并单元格|表头层级)/.test(text)) {
      errors.push(`${label}: grouped table headers must declare span/depth rules such as colSpan, rowSpan, maxDepth, or leafColumnCount.`);
    }

    if (!/(?:width|minWidth|maxWidth|align|fixed|sticky|frozen|freeze|scroll|overflow-x|固定表头|固定列|冻结)/.test(text)) {
      errors.push(`${label}: grouped table headers must declare widths/alignment and fixed header or frozen column behavior.`);
    }

    if (!/(?:localFilters?|componentLocal|columnHeaderFilters?|headerFilter|filterable|sortable|sort|排序|表头筛选|局部筛选)/.test(text)) {
      errors.push(`${label}: grouped table headers must separate component-local filters from per-column header sort/filter icons.`);
    }

    if (!/(?:tooltip|definition|unit|formula|formatter|show-overflow-tooltip|口径|单位|定义)/.test(text)) {
      errors.push(`${label}: grouped table headers must expose units, definitions, formulas, or long header text through tooltip/formatter metadata.`);
    }

    if (!/(?:collapse|collapsed|columnSettings|horizontalScroll|fullscreen|detailRoute|densityFallback|visibleRowCount|maxVisibleColumns|低优先级|折叠|列设置|全屏|密度)/.test(text)) {
      errors.push(`${label}: grouped table headers must declare density fallback such as group collapse, column settings, horizontal scroll, fullscreen, or split/detail view.`);
    }

    if (!/(?:loading|empty|error|noPermission|permission|暂无数据|加载|错误|权限)/.test(text)) {
      errors.push(`${label}: grouped table headers must define loading, empty, error, and no-permission states.`);
    }
  }

  if (hasPivotTable) {
    if (!/(?:@antv\/s2|@antv\/s2-vue|SheetComponent|PivotSheet|S2DataConfig|s2Options|s2DataConfig|S2)/.test(text)) {
      errors.push(`${label}: Pivot Tables must use AntV S2 or a declared project S2-equivalent analytical table renderer.`);
    }

    if (!/(?:rowDimensions?|rowFields?|rowHierarchy|rows\s*:|行维度)/.test(text)) {
      errors.push(`${label}: Pivot Tables must declare row dimensions or row hierarchy fields.`);
    }

    if (!/(?:columnDimensions?|columnFields?|colFields?|columnHierarchy|columns\s*:|列维度)/.test(text)) {
      errors.push(`${label}: Pivot Tables must declare column dimensions or column hierarchy fields.`);
    }

    if (!/(?:measures?|valueFields?|metrics?|values\s*:|指标)/.test(text)) {
      errors.push(`${label}: Pivot Tables must declare measure/value fields.`);
    }

    if (!/(?:aggregation|aggregate|aggregator|sum\s*\(|avg\s*\(|count\s*\(|weighted|numerator|denominator|聚合|加权|分子|分母)/.test(text)) {
      errors.push(`${label}: Pivot Tables must declare aggregation functions or formulas, including numerator/denominator rules for rate measures.`);
    }

    if (!/(?:subtotal|subTotals?|grandTotals?|totals?|小计|总计)/.test(text)) {
      errors.push(`${label}: Pivot Tables must declare subtotal and grand-total behavior.`);
    }

    if (!/(?:frozen|freeze|fixed|sticky|rowHeader|columnHeader|scroll|virtual|rowHeaderW|headerRowH|measureColumnW)/.test(text)) {
      errors.push(`${label}: Pivot Tables must declare fixed/frozen header behavior, scroll/virtualization, or row/measure sizing.`);
    }

    if (!/tooltip\s*:|tooltip|drilldown|下钻|明细/.test(text)) {
      errors.push(`${label}: Pivot Tables must provide tooltip or drilldown access to exact row path, column path, measure, formula, and source evidence.`);
    }

    if (!/(?:loading|empty|error|noPermission|permission|暂无数据|加载|错误|权限)/.test(text)) {
      errors.push(`${label}: Pivot Tables must define loading, empty, error, and no-permission states.`);
    }

    if (/(?:percent|rate|ratio|完成率|转化率|占比|%)/.test(text) && !/(?:numerator|denominator|weighted|sum\s*\(|分子|分母|加权|rateFormula|ratioFormula)/.test(text)) {
      errors.push(`${label}: Pivot Table rate/percent measures must recompute totals from numerator/denominator instead of naive sum or average.`);
    }
  }

  if (hasDetailTable) {
    if (!/(?:rowKey|row-key|primaryKey|idField|keyField|recordId|orderId|customerId|storeId|工单号|订单号|主键|对象字段)/.test(text)) {
      errors.push(`${label}: Detail Tables must declare row grain and a primary key/object identity field.`);
    }

    if (!/(?:columns|tableColumns|columnDefs|字段列表|列元数据)/.test(text) || !/(?:width|minWidth|align|fixed|sortable|type|formatter|ellipsis)/.test(text)) {
      errors.push(`${label}: Detail Tables must declare column metadata including width/minWidth, alignment, type, sorting, fixed-column, or ellipsis behavior.`);
    }

    if (!/(?:defaultSort|sortBy|sortOrder|orderBy|sortable|默认排序|排序字段)/.test(text)) {
      errors.push(`${label}: Detail Tables must declare a default sort or sortable evidence path.`);
    }

    if (!/(?:visibleColumns|columnPriority|priority|columnSettings|maxVisibleColumns|hiddenColumns|列优先级|列设置|隐藏列)/.test(text)) {
      errors.push(`${label}: Detail Tables must declare first-view column priority and a secondary-field disclosure strategy.`);
    }

    if (!/(?:pageSize|currentPage|pagination|el-pagination|virtual|loadMore|加载更多|分页)/.test(text)) {
      errors.push(`${label}: Detail Tables must declare pagination, virtual scrolling, or load-more behavior.`);
    }

    if (!/(?:search|keyword|query|filterFields|localFilter|exportScope|exportRows|params|resolver|provider|搜索|筛选|导出范围)/.test(text)) {
      errors.push(`${label}: Detail Tables must declare search/filter/export scope so controls affect the intended rows only.`);
    }

    if (!/(?:detail|rowDetail|drawer|onRowClick|operation|actions|查看|详情|操作|抽屉)/.test(text)) {
      errors.push(`${label}: Detail Tables must provide row detail, row action, drawer, or an explicit operation contract.`);
    }

    if (!/(?:loading|empty|error|noPermission|permission|暂无数据|加载|错误|权限)/.test(text)) {
      errors.push(`${label}: Detail Tables must define loading, empty, error, and no-permission states.`);
    }
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

  if (hasGaugeChart) {
    if (!/(?:type\s*:\s*['"]gauge['"]|series\s*:[\s\S]{0,900}type\s*:\s*['"]gauge['"])/.test(text)) {
      errors.push(`${label}: gauge charts must use ECharts series.type 'gauge' instead of hand-authored arcs, needles, or decorative CSS.`);
    }

    if (!/(?:currentValue|current|value\s*:|metricValue|指标|当前值)/.test(text)) {
      errors.push(`${label}: gauge charts must declare the current metric value.`);
    }

    if (!/(?:minValue|maxValue|range|min\s*:|max\s*:|下限|上限|范围)/.test(text)) {
      errors.push(`${label}: gauge charts must declare a bounded min/max range.`);
    }

    if (!/(?:unit|单位|%|percent|score|分)/.test(text)) {
      errors.push(`${label}: gauge charts must declare unit or score semantics.`);
    }

    if (!/(?:status|threshold|range|level|状态|阈值|区间|预警|异常|达标|风险)/.test(text)) {
      errors.push(`${label}: gauge charts must declare threshold/status semantics and business color direction.`);
    }

    if (!/(?:startAngle|endAngle|radius|center|gaugeAreaH|arcW|半圆|圆形|环形)/.test(text)) {
      errors.push(`${label}: gauge charts must declare angle/radius/center or gauge-area geometry so the arc and center value fit the block.`);
    }

    if (!/(?:clamp|overflow|overMax|underMin|超出|超过|低于|上限|下限|真实值)/.test(text)) {
      errors.push(`${label}: gauge charts must declare clamp/overflow behavior while preserving the true displayed value.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: gauge charts must provide tooltip access to current value, range, target/threshold, status, period, and source details.`);
    }

    if (/(?:target|目标)/.test(text) && !/(?:targetValue|targetRatio|targetMarker|markLine|目标值|目标线|目标标记)/.test(text)) {
      errors.push(`${label}: gauge target mode must declare target value or target-marker encoding.`);
    }

    if (/(?:pointer|指针)/.test(text) && !/(?:risk|load|pressure|temperature|health|monitor|风险|负载|压力|温度|健康|监控)/.test(text)) {
      errors.push(`${label}: gauge pointer mode is allowed only for monitoring, risk, load, pressure, temperature, or health semantics.`);
    }
  }

  if (hasBoxplot) {
    if (!/sampleCount|sampleSize|samples|样本/.test(text)) {
      errors.push(`${label}: boxplot charts must expose sample count or sample-size state before rendering.`);
    }

    if (!/Q1|q1|median|中位数|Q3|q3|IQR|whisker|须线|outlier|异常值/.test(text)) {
      errors.push(`${label}: boxplot charts must declare Q1/median/Q3/IQR and whisker/outlier rule.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: boxplot charts must provide tooltip access to five-number summary and outlier details.`);
    }
  }

  if (hasHeatmap) {
    if (!/visualMap\s*:|colorScale|色阶|颜色范围/.test(text)) {
      errors.push(`${label}: heatmap charts must declare visualMap/color scale and color range.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: heatmap charts must provide tooltip access to exact cell values.`);
    }

    if (!/(xAxis[\s\S]{0,600}yAxis|yAxis[\s\S]{0,600}xAxis|calendar\s*:|row(?:Key|Field|Dimension)|col(?:Key|Field|Dimension)|column(?:Key|Field|Dimension))/.test(text)) {
      errors.push(`${label}: heatmap charts must declare row/column dimensions or a calendar coordinate system.`);
    }

    if (!/missing|null|undefined|zero|缺失|空值|0值/.test(text)) {
      errors.push(`${label}: heatmap charts must distinguish missing cells from real zero values.`);
    }
  }

  if (hasParallelChart) {
    if (!/(?:object|sample|entity|store|user|product)(?:Id|Name|Key|Field)?|对象|样本|门店|用户|产品/.test(text)) {
      errors.push(`${label}: parallel-coordinate charts must declare object/sample identity fields.`);
    }

    if (!/parallelAxis|dimensions?|dimensionFields|axisFields|metricFields|指标|维度/.test(text)) {
      errors.push(`${label}: parallel-coordinate charts must declare 3-12 ordered dimensions or parallelAxis definitions.`);
    }

    if (!/min\s*:|max\s*:|unit|单位|range|axisRange|reverseAxis|lowerIsBetter|direction|标准化|normalize|scale/.test(text)) {
      errors.push(`${label}: parallel-coordinate charts must declare per-axis range, unit, direction, or standardization mode.`);
    }

    if (!/maxDimensions|visibleDimensions|axisGap|minAxisGap|plotH|plotHeight|维度数量|横向滚动|scroll/.test(text)) {
      errors.push(`${label}: parallel-coordinate charts must declare dimension-count or axis-gap/plot-height density limits.`);
    }

    if (!/sampleCount|samples|opacity|lineStyle|sampling|aggregate|density|抽样|聚合|透明度/.test(text)) {
      errors.push(`${label}: parallel-coordinate charts must declare sample-density, line-opacity, sampling, or aggregation strategy.`);
    }

    if (!/highlight|selected|anomaly|topN|TopN|group|status|异常|高亮|选中/.test(text)) {
      errors.push(`${label}: parallel-coordinate charts must declare Top/anomaly/selected/group highlight semantics.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: parallel-coordinate charts must provide tooltip access to exact object values across visible dimensions.`);
    }

    if (/brush|刷选/.test(text) && !/selectedCount|brushRange|rangeSelected|intersection|union|交集|并集|重置/.test(text)) {
      errors.push(`${label}: parallel-coordinate brush interactions must declare selected count, range semantics, and reset behavior.`);
    }
  }

  if (hasPathChart) {
    if (!/(?:steps?|nodes?|pathNodes|pathSteps)\s*:|step(?:Id|Key|Field|Order|Layer)|node(?:Id|Key|Field)|步骤|节点/.test(text)) {
      errors.push(`${label}: path charts must declare step/node data schema.`);
    }

    if (
      !/(?:links?|transitions?|pathLinks|pathEdges)\s*:|transition(?:Id|Key|Field)|流转|路径|连线/.test(text) ||
      !/source\s*:|target\s*:|from\s*:|to\s*:|sourceField|targetField|start(?:Node|Id)|end(?:Node|Id)|起点|终点/.test(text)
    ) {
      errors.push(`${label}: path charts must declare directed transition data with source/target or start/end relationships.`);
    }

    if (!/start(?:Node|Id)|end(?:Node|Id)|order|stepOrder|layer|depth|起点|终点|顺序|层级/.test(text)) {
      errors.push(`${label}: path charts must declare start/end and step order or layer.`);
    }

    if (!/conversion|convert|dropoff|dropOff|loss|churn|转化|流失/.test(text)) {
      errors.push(`${label}: path charts must declare conversion or drop-off metric semantics.`);
    }

    if (!/topN|TopN|topPaths|maxPaths|aggregate|other|其他|聚合|密度|depth|maxDepth/.test(text)) {
      errors.push(`${label}: path charts must declare Top N, aggregation, path depth, or density fallback.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: path charts must provide tooltip access to exact node and transition details.`);
    }
  }

  if (hasFunnelChart) {
    if (!/(?:stages?|steps?|funnelRows|funnelStages)\s*:|stage(?:Id|Key|Name|Order|Index)|阶段/.test(text)) {
      errors.push(`${label}: funnel charts must declare ordered stage data/schema.`);
    }

    if (!/order|stageOrder|sort|sequence|index|顺序|排序/.test(text)) {
      errors.push(`${label}: funnel charts must declare stage order or deterministic sorting.`);
    }

    if (!/entryValue|entryRate|share|cohort|population|denominator|入口|占比|人群|队列|口径/.test(text)) {
      errors.push(`${label}: funnel charts must declare entry value/share and shared population or cohort logic.`);
    }

    if (!/unit|单位|metric|指标|value\s*:|amount|count|人数|金额|订单|数量/.test(text)) {
      errors.push(`${label}: funnel charts must declare value metric basis and unit.`);
    }

    if (!/stepConversion|conversionRate|convert|totalConversion|转化|总转化/.test(text)) {
      errors.push(`${label}: funnel charts must declare stage conversion and total conversion calculations.`);
    }

    if (!/drop(?:Value|Rate)|loss|churn|流失/.test(text)) {
      errors.push(`${label}: funnel charts must declare drop value or drop-rate semantics.`);
    }

    if (!/maxStages|stageCount|fold|scroll|fallback|tooMany|density|TopN|其他|密度|折叠/.test(text)) {
      errors.push(`${label}: funnel charts must declare stage-count density and fallback behavior.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: funnel charts must provide tooltip access to exact stage values, shares, conversion, and drop-off details.`);
    }

    if (!/(?:type\s*:\s*['"]funnel['"]|type\s*:\s*['"]bar['"]|horizontal|barWidth|xAxis|yAxis|横向|条形)/.test(text)) {
      errors.push(`${label}: funnel charts must use ECharts funnel or a data-driven horizontal bar funnel representation.`);
    }

    if (/target|目标/.test(text) && !/target(?:Value|Rate|Line|Tick)|markLine|目标线|目标值/.test(text)) {
      errors.push(`${label}: funnel target mode must declare target values or target-line/tick encoding.`);
    }

    if (/compare|comparison|previous|last|同比|环比|对比/.test(text) && !/legend\s*:|series\s*:|current|previous|本期|上期/.test(text)) {
      errors.push(`${label}: funnel comparison mode must declare comparison series or legend encoding.`);
    }
  }

  if (hasSankeyChart) {
    if (!/(?:nodes?|sankeyNodes|nodeData|data)\s*:|node(?:Id|Key|Field|Name|Type|Status|Value)|节点/.test(text)) {
      errors.push(`${label}: sankey charts must declare node data/schema.`);
    }

    if (
      !/(?:links?|edges?|sankeyLinks|sankeyEdges)\s*:|link(?:Id|Key|Field)|edge(?:Id|Key|Field)|流向|流带|连线/.test(
        text,
      ) ||
      !/source\s*:|target\s*:|from\s*:|to\s*:|sourceField|targetField|sourceKey|targetKey|来源|去向|目标/.test(text) ||
      !/value\s*:|flowValue|flowMetric|amount|count|流量|金额|人数|次数|订单|数量/.test(text)
    ) {
      errors.push(`${label}: sankey charts must declare directed links with source, target, and value.`);
    }

    if (!/layer|level|stage|step|depth|nodeAlign|layoutIterations|阶段|层级|顺序/.test(text)) {
      errors.push(`${label}: sankey charts must declare layer/stage order or Sankey layout direction.`);
    }

    if (!/unit|单位|metric|指标|人数|金额|次数|订单|数量/.test(text)) {
      errors.push(`${label}: sankey charts must declare metric basis and unit.`);
    }

    if (!/topN|TopN|maxNodes|maxLinks|aggregate|other|其他|聚合|密度|threshold|share/.test(text)) {
      errors.push(`${label}: sankey charts must declare Top N/other aggregation or node-link density fallback.`);
    }

    if (!/nodeValue|inbound|outbound|nodeIn|nodeOut|loss|unknown|流失|未知|守恒|conservation|nonNegative|negative|>=\s*0/.test(text)) {
      errors.push(`${label}: sankey charts must handle node-value, non-negative values, and loss/unknown flow semantics.`);
    }

    if (!/nodeWidth|nodeGap|lineStyle|curveness|linkW|flowWidth|opacity|itemStyle|width|流带宽度|透明度/.test(text)) {
      errors.push(`${label}: sankey charts must declare flow-width, node-gap, or ribbon styling based on value.`);
    }

    if (!/label\s*:|labelLayout|formatter|labelThreshold|keyOnly|标签/.test(text)) {
      errors.push(`${label}: sankey charts must declare node/link label strategy and thresholds.`);
    }

    if (!/emphasis\s*:|focus\s*:\s*['"]adjacency['"]|highlight|selected|hover|adjacency|上游|下游|高亮/.test(text)) {
      errors.push(`${label}: sankey charts must declare hover/click adjacency highlight semantics.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: sankey charts must provide tooltip access to exact node and link details.`);
    }
  }

  if (hasTreemapChart) {
    if (!/children\s*:|parent(?:Id|Key|Field)\s*:|treePath|path(?:Field|Key)?|hierarchy|层级|父级|子级/.test(text)) {
      errors.push(`${label}: treemap charts must declare hierarchy data through children, parent fields, or path fields.`);
    }

    if (!/value\s*:|areaMetric|sizeMetric|面积指标|销售额|金额|数量|订单|成本|库存|用户数/.test(text)) {
      errors.push(`${label}: treemap charts must declare the non-negative additive value used for rectangle area.`);
    }

    if (!/nonNegative|non-negative|>=\s*0|negative|负数|additive|可累加|sum\s*\(|reduce\s*\(|合计/.test(text)) {
      errors.push(`${label}: treemap charts must handle non-negative/additive area metric validation.`);
    }

    if (!/topN|TopN|visibleMin|leafDepth|aggregate|other|其他|聚合|密度|minRect|labelThreshold/.test(text)) {
      errors.push(`${label}: treemap charts must declare Top N/other aggregation, visible depth, or density fallback.`);
    }

    if (!/label\s*:|labelLayout|formatter|minRect|labelThreshold|标签/.test(text)) {
      errors.push(`${label}: treemap charts must declare label thresholds so tiny rectangles do not force permanent text.`);
    }

    if (!/visualMap\s*:|colorMetric|colorScale|itemStyle|levels\s*:|颜色|色阶/.test(text)) {
      errors.push(`${label}: treemap charts must declare color semantics or a visualMap/color scale.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: treemap charts must provide tooltip access to full path, value, total share, parent share, and aggregation details.`);
    }
  }

  if (hasSunburstChart) {
    if (!/children\s*:|parent(?:Id|Key|Field)\s*:|treePath|path(?:Field|Key)?|hierarchy|层级|父级|子级/.test(text)) {
      errors.push(`${label}: sunburst charts must declare hierarchy data through children, parent fields, or path fields.`);
    }

    if (!/value\s*:|angleMetric|sizeMetric|角度|销售额|金额|数量|订单|成本|库存|用户数|访问量/.test(text)) {
      errors.push(`${label}: sunburst charts must declare the non-negative additive value used for sector angle.`);
    }

    if (!/nonNegative|non-negative|>=\s*0|negative|负数|additive|可累加|sum\s*\(|reduce\s*\(|合计/.test(text)) {
      errors.push(`${label}: sunburst charts must handle non-negative/additive angle metric validation.`);
    }

    if (!/levels\s*:|radius\s*:|innerR|outerR|ringW|visibleDepth|depth|层级|环宽|半径/.test(text)) {
      errors.push(`${label}: sunburst charts must declare visible depth, radius, or ring-width budget.`);
    }

    if (!/topN|TopN|aggregate|other|其他|聚合|密度|nodeClick|drill|breadcrumb|leafDepth/.test(text)) {
      errors.push(`${label}: sunburst charts must declare Top N/other aggregation, drilldown, breadcrumb, or density fallback.`);
    }

    if (!/label\s*:|labelLayout|formatter|sectorAngle|arcLength|labelThreshold|标签/.test(text)) {
      errors.push(`${label}: sunburst charts must declare sector label thresholds so tiny arcs do not force permanent text.`);
    }

    if (!/center\s*:|centerText|中心/.test(text)) {
      errors.push(`${label}: sunburst charts must declare center content for total/current node/path state.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: sunburst charts must provide tooltip access to full path, value, total share, parent share, and aggregation details.`);
    }

    if (!/visualMap\s*:|colorMetric|colorScale|itemStyle|levels\s*:|颜色|色阶/.test(text)) {
      errors.push(`${label}: sunburst charts must declare color semantics or a visualMap/color scale.`);
    }
  }

  if (hasTreeChart) {
    if (!/(?:treeData|treeNodes|nodes?|data)\s*:|node(?:Id|Key|Field|Name|Type|Status|Value)|节点/.test(text)) {
      errors.push(`${label}: tree charts must declare node data/schema.`);
    }

    if (!/root(?:Node|Id|Key)?\s*:|rootNode|rootId|根节点/.test(text)) {
      errors.push(`${label}: tree charts must declare a root node.`);
    }

    if (!/children\s*:|parent(?:Id|Key|Field)\s*:|parentId|父节点|子节点|父子/.test(text)) {
      errors.push(`${label}: tree charts must declare parent-child relationships or children arrays.`);
    }

    if (!/depth|level|layer|visibleDepth|initialTreeDepth|defaultExpanded|expandedLevel|层级|展开层级/.test(text)) {
      errors.push(`${label}: tree charts must declare depth/layer and default visible/expanded levels.`);
    }

    if (!/expandAndCollapse|expand|collapse|expanded|collapsed|\+N|展开|收起/.test(text)) {
      errors.push(`${label}: tree charts must declare expand/collapse behavior.`);
    }

    if (!/topN|TopN|maxChildren|childCount|aggregate|other|其他|聚合|密度|visibleDepth|initialTreeDepth/.test(text)) {
      errors.push(`${label}: tree charts must declare child density control such as Top N, +N, aggregation, or visible depth.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: tree charts must provide tooltip access to exact node, parent, child, value, and status details.`);
    }
  }

  if (hasGraph) {
    if (!/(?:nodes?|graphNodes|nodeData)\s*:|node(?:Id|Key|Field|Type|Category)|节点/.test(text)) {
      errors.push(`${label}: relation graph charts must declare node data/schema.`);
    }

    if (
      !/(?:links?|edges?|graphEdges)\s*:|edge(?:Id|Key|Field|Type)|关系|连线/.test(text) ||
      !/source\s*:|target\s*:|sourceField|targetField|sourceId|targetId|起点|终点/.test(text)
    ) {
      errors.push(`${label}: relation graph charts must declare edge data with source/target relationships.`);
    }

    if (!/direction|directed|edgeSymbol|arrow|source[\s\S]{0,160}target|方向|箭头|weight|权重/.test(text)) {
      errors.push(`${label}: relation graph charts must declare relationship direction and weight semantics.`);
    }

    if (!/layout\s*:|force\s*:|circular|radial|hierarch|层级|力导向/.test(text)) {
      errors.push(`${label}: relation graph charts must declare graph layout type and layout strategy.`);
    }

    if (!/density|maxNodes|maxEdges|aggregate|cluster|filter|neighborhood|hairball|密度|聚合|筛选|邻域/.test(text)) {
      errors.push(`${label}: relation graph charts must declare density control, aggregation, filtering, or neighborhood fallback.`);
    }

    if (!/tooltip\s*:/.test(text)) {
      errors.push(`${label}: relation graph charts must provide tooltip access to exact node and edge details.`);
    }

    if (!/roam|draggable|zoom|fitView|reset|search|定位|缩放|拖拽/.test(text)) {
      errors.push(`${label}: relation graph charts must expose fitView, zoom/drag, reset, search, or locate behavior.`);
    }
  }
};

collectWidgets().forEach(({ node, location, span }) => validateWidget(node, location, span));
walkVueFiles(widgetComponentsPath).forEach(validateWidgetSource);

warnings.forEach((warning) => console.warn(`[dashboard-contract warning] ${warning}`));

if (errors.length > 0) {
  errors.forEach((error) => console.error(`[dashboard-contract error] ${error}`));
  process.exit(1);
}

console.log('[dashboard-contract] ok');
