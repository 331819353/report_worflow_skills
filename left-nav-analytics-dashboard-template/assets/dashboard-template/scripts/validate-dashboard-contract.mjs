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
const builtinActions = new Set([
  'openModal',
  'closeModal',
  'switchNav',
  'setFilters',
  'resetFilters',
  'navigateUrl',
  'print',
  'fullscreen',
  'refresh',
]);

const validateActionObject = (actionNode, location) => {
  if (!isObject(actionNode)) {
    return;
  }

  const type = getStringValue(getProperty(actionNode, 'type'));

  if (!type) {
    errors.push(`${location}: action is missing type.`);
    return;
  }

  if (type === 'openModal' && !hasProperty(actionNode, 'target') && !hasProperty(actionNode, 'modal')) {
    errors.push(`${location}: openModal action must set target or modal.`);
  }

  if (type === 'navigateUrl' && !hasProperty(actionNode, 'target') && !hasProperty(actionNode, 'url')) {
    errors.push(`${location}: navigateUrl action must set target or url.`);
  }

  if (type === 'setFilters' && !hasProperty(actionNode, 'filters')) {
    errors.push(`${location}: setFilters action must set filters.`);
  }

  if (!builtinActions.has(type)) {
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

const validateWidget = (widgetNode, location) => {
  if (!isObject(widgetNode)) {
    errors.push(`${location}: widget config must be an object.`);
    return;
  }

  const widgetType = getStringValue(getProperty(widgetNode, 'type'));
  const dataNode = getProperty(widgetNode, 'data');
  const dataPolicy = getStringValue(getProperty(widgetNode, 'dataPolicy'));

  if (!widgetType) {
    errors.push(`${location}: widget is missing type.`);
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
    [...requiredFilters, ...filterFieldKeys].forEach((filterId) => {
      if (filterIds.length > 0 && !filterIds.includes(filterId)) {
        warnings.push(`${location}: data binding references filter "${filterId}", but no filters[] entry uses that id.`);
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
    if (ts.isPropertyAssignment(node) && getName(node.name) === 'widgets' && isObject(node.initializer)) {
      node.initializer.properties.forEach((property) => {
        if (ts.isPropertyAssignment(property)) {
          widgets.push({
            location: `widgets.${getName(property.name)}`,
            node: property.initializer,
          });
        }
      });
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

collectWidgets().forEach(({ node, location }) => validateWidget(node, location));
walkVueFiles(widgetComponentsPath).forEach(validateWidgetSource);

warnings.forEach((warning) => console.warn(`[dashboard-contract warning] ${warning}`));

if (errors.length > 0) {
  errors.forEach((error) => console.error(`[dashboard-contract error] ${error}`));
  process.exit(1);
}

console.log('[dashboard-contract] ok');
