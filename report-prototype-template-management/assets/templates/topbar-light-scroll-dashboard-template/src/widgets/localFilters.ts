import type { RegisteredWidgetConfig, WidgetLocalFilterConfig, WidgetLocalFilterOption } from './types';

export interface ResolvedWidgetLocalFilterOption extends WidgetLocalFilterOption {
  id: string;
  label: string;
}

export const localFilterButtonLimit = 2;

export const getWidgetLocalFilterConfigs = (widget?: RegisteredWidgetConfig) => widget?.localFilters ?? [];

export const normalizeLocalFilterFields = (field?: string | string[]) => {
  if (!field) {
    return [];
  }

  return Array.isArray(field) ? field : [field];
};

export const normalizeLocalFilterText = (value: unknown) =>
  value === undefined || value === null ? '' : String(value);

const toOptionalNumber = (value: unknown) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : undefined;
};

const toOptionalText = (value: unknown) =>
  value === undefined || value === null || value === '' ? undefined : String(value);

const getRecordValueByFields = (row: unknown, fields: string[]) => {
  if (!row || typeof row !== 'object') {
    return undefined;
  }

  const record = row as Record<string, unknown>;

  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(record, field)) {
      return record[field];
    }
  }

  return undefined;
};

const normalizeWidgetLocalFilterOption = (option: WidgetLocalFilterOption): ResolvedWidgetLocalFilterOption => ({
  ...option,
  id: String(option.id),
  label: String(option.label),
  reason: toOptionalText(option.reason),
  count: toOptionalNumber(option.count),
  sortOrder: toOptionalNumber(option.sortOrder),
});

const sortLocalFilterOptions = (options: ResolvedWidgetLocalFilterOption[]) =>
  options.sort((left, right) => {
    const sortDiff =
      (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER);

    if (sortDiff !== 0) {
      return sortDiff;
    }

    return left.label.localeCompare(right.label, 'zh-Hans-CN');
  });

export const resolveWidgetLocalFilterValues = (
  widget?: RegisteredWidgetConfig,
  selected?: Record<string, string>,
) =>
  Object.fromEntries(
    getWidgetLocalFilterConfigs(widget).map((filter) => [
      filter.id,
      selected?.[filter.id] ?? filter.defaultValue ?? '',
    ]),
  );

export const getLocalFilterOptionsFromRows = (rows: unknown[], filter: WidgetLocalFilterConfig) => {
  if (filter.options?.length) {
    return sortLocalFilterOptions(filter.options.map(normalizeWidgetLocalFilterOption));
  }

  const valueFields = normalizeLocalFilterFields(filter.valueField ?? filter.field);
  const labelFields = normalizeLocalFilterFields(filter.labelField ?? filter.field);
  const optionMap = new Map<string, ResolvedWidgetLocalFilterOption>();

  rows.forEach((row) => {
    if (typeof row === 'string' || typeof row === 'number') {
      const value = String(row);
      const current = optionMap.get(value);
      optionMap.set(value, {
        id: value,
        label: value,
        count: (current?.count ?? 0) + 1,
      });
      return;
    }

    const value = normalizeLocalFilterText(getRecordValueByFields(row, valueFields));

    if (!value) {
      return;
    }

    const label = normalizeLocalFilterText(getRecordValueByFields(row, labelFields)) || value;
    const current = optionMap.get(value);

    optionMap.set(value, {
      id: value,
      label: current?.label ?? label,
      count: (current?.count ?? 0) + 1,
    });
  });

  return sortLocalFilterOptions(Array.from(optionMap.values()));
};

const rowMatchesWidgetLocalFilter = (row: unknown, filter: WidgetLocalFilterConfig, selectedValue: string) => {
  if (!selectedValue) {
    return true;
  }

  if (typeof row === 'string' || typeof row === 'number') {
    return String(row) === selectedValue;
  }

  const valueFields = normalizeLocalFilterFields(filter.valueField ?? filter.field);

  return normalizeLocalFilterText(getRecordValueByFields(row, valueFields)) === selectedValue;
};

export const applyWidgetLocalFilters = (
  rows: unknown[],
  widget: RegisteredWidgetConfig | undefined,
  selected: Record<string, string>,
) => {
  const filters = getWidgetLocalFilterConfigs(widget);

  if (filters.length === 0) {
    return rows;
  }

  return rows.filter((row) =>
    filters.every((filter) => rowMatchesWidgetLocalFilter(row, filter, selected[filter.id] ?? '')),
  );
};

export const shouldUseInlineLocalFilter = (
  filterCount: number,
  filter: WidgetLocalFilterConfig,
  optionCount: number,
) => {
  if (filterCount !== 1 || filter.mode === 'panel') {
    return false;
  }

  if (filter.mode === 'buttons') {
    return true;
  }

  return optionCount <= (filter.maxButtonOptions ?? localFilterButtonLimit);
};
