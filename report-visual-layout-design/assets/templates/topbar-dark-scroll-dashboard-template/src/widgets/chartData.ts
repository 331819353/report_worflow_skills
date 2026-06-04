export type CategorySortDirection = 'asc' | 'desc';

type RowField<T> = Extract<keyof T, string>;

export interface BuildSingleSeriesCategoryDataOptions<T extends Record<string, unknown>> {
  categoryField: RowField<T>;
  valueField: RowField<T>;
  sortField?: RowField<T>;
  sortDirection?: CategorySortDirection;
}

const toComparableText = (value: unknown) => {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value);
};

const toFiniteNumber = (value: unknown) => {
  const numericValue = typeof value === 'number' ? value : Number(value);

  return Number.isFinite(numericValue) ? numericValue : null;
};

export const compareCategoryValues = (left: unknown, right: unknown) => {
  const leftNumber = toFiniteNumber(left);
  const rightNumber = toFiniteNumber(right);

  if (leftNumber !== null && rightNumber !== null) {
    return leftNumber - rightNumber;
  }

  return toComparableText(left).localeCompare(toComparableText(right), 'zh-Hans-CN', {
    numeric: true,
    sensitivity: 'base',
  });
};

export const sortRowsForCategoryAxis = <T extends Record<string, unknown>>(
  rows: readonly T[] | undefined,
  sortField: RowField<T>,
  direction: CategorySortDirection = 'asc',
) => {
  const multiplier = direction === 'desc' ? -1 : 1;

  return [...(rows ?? [])]
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      const diff = compareCategoryValues(left.row[sortField], right.row[sortField]);

      return diff === 0 ? left.index - right.index : diff * multiplier;
    })
    .map(({ row }) => row);
};

export const buildSingleSeriesCategoryData = <T extends Record<string, unknown>>(
  rows: readonly T[] | undefined,
  options: BuildSingleSeriesCategoryDataOptions<T>,
) => {
  const sortedRows = sortRowsForCategoryAxis(
    rows,
    options.sortField ?? options.categoryField,
    options.sortDirection ?? 'asc',
  );

  return {
    rows: sortedRows,
    labels: sortedRows.map((row) => toComparableText(row[options.categoryField])),
    values: sortedRows.map((row) => toFiniteNumber(row[options.valueField])),
  };
};
