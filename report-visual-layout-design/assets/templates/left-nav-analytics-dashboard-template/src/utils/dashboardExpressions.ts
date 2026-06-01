import type { DashboardExpressionValue, DashboardParams } from '../types/actions';

export interface DashboardExpressionScope {
  event?: Record<string, unknown>;
  filters?: Record<string, unknown>;
  context?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

const expressionPattern = /^\$(event|filters|context|params)(?:\.(.+))?$/;

const getByPath = (source: unknown, path?: string) => {
  if (!path) {
    return source;
  }

  return path.split('.').reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
};

// 配置表达式解析器：
// - '$event.regionId' 读取组件事件 payload 里的 regionId。
// - '$filters.cycle' 读取当前全局筛选值。
// - '$context.blockId' 读取当前分块上下文。
// - '$params.xxx' 读取弹窗参数。
// - '$$event.xxx' 会保留字面量 '$event.xxx'，用于需要显示美元符号的场景。
export const resolveDashboardValue = (
  value: DashboardExpressionValue | undefined,
  scope: DashboardExpressionScope,
): unknown => {
  if (typeof value === 'string') {
    if (value.startsWith('$$')) {
      return value.slice(1);
    }

    const expression = value.match(expressionPattern);

    if (!expression) {
      return value;
    }

    const [, namespace, path] = expression;
    return getByPath(scope[namespace as keyof DashboardExpressionScope], path);
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveDashboardValue(item, scope));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveDashboardValue(item, scope)]),
    );
  }

  return value;
};

export const resolveDashboardParams = (
  params: DashboardParams | undefined,
  scope: DashboardExpressionScope,
): Record<string, unknown> => {
  if (!params) {
    return {};
  }

  return resolveDashboardValue(params, scope) as Record<string, unknown>;
};
