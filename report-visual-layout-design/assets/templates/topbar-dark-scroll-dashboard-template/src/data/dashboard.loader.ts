import dashboardDatasetJson from './dashboard.dataset.json';

export type DashboardDataValue = string | number | boolean | null;
export type DashboardDataRow = Record<string, DashboardDataValue | DashboardDataValue[]>;

export interface DashboardDataset {
  filterData: Record<string, DashboardDataRow[]>;
  businessData: Record<string, DashboardDataRow[]>;
}

const normalizeDataset = (value: unknown): DashboardDataset => {
  if (!value || typeof value !== 'object') {
    return {
      filterData: {},
      businessData: {},
    };
  }

  const record = value as Partial<DashboardDataset>;

  return {
    filterData: record.filterData ?? {},
    businessData: record.businessData ?? {},
  };
};

const toDatasetKey = (value: unknown) => {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value);
};

const dashboardDataset = normalizeDataset(dashboardDatasetJson);

export const loadDashboardDataset = () => dashboardDataset;

export const readDashboardFilterRows = (key: unknown) =>
  dashboardDataset.filterData[toDatasetKey(key)] ?? [];

export const readDashboardBusinessRows = (key: unknown) =>
  dashboardDataset.businessData[toDatasetKey(key)] ?? [];
