import type { WidgetMap } from '../widgets/types';
import type { DashboardDataSourceRef, DashboardFilterScope } from './data-source';

export type ThemeMode = 'dark' | 'light';

export interface DashboardAssetConfig {
  logoSrc: string;
  logoAlt: string;
  backgroundSrc?: string;
}

export interface DashboardPageConfig {
  layoutRows: string[];
  widgets?: WidgetMap;
}

export interface DashboardModalConfig {
  title: string;
  width?: number;
  height?: number;
  layoutRows?: string[];
  widgets?: WidgetMap;
}

export interface DashboardGridConfig {
  contentStartY: number;
  contentEndY: number;
  cellPadding: number;
  innerBackgroundColor: string;
  dominantTitleColor: string;
}

export interface DashboardLayoutConfig {
  designWidth: number;
  designHeight: number;
  topbarHeight: number;
  contentGap: number;
}

export interface DashboardControlLabels {
  filters: string;
  download: string;
  refresh: string;
  themeLight: string;
  themeDark: string;
}

export interface DashboardFilterOption {
  id: string;
  label: string;
  disabled?: boolean;
  reason?: string;
  count?: number;
  parentId?: string;
  level?: number;
  sortOrder?: number;
  permissionScope?: string;
  meta?: Record<string, unknown>;
}

export interface DashboardFilterGroup {
  id: string;
  label: string;
  // 静态筛选项。只用于状态、等级、周期粒度、是否类等稳定枚举。
  // 时间、组织、产品、客户、项目、负责人等依赖数据的筛选应使用 source。
  options?: DashboardFilterOption[];
  // 动态筛选项。source.id 对应 src/dataSources/registry.ts 中注册的数据源。
  // 最终业务报表默认使用 source 从维表、事实表或接口派生筛选项。
  source?: DashboardDataSourceRef;
  // 筛选作用域。未配置时为全局筛选，会影响所有组件。
  // 配置后只影响 filterScope 命中的组件，例如 scope: 'revenue'。
  scope?: DashboardFilterScope;
}

export interface DashboardScreenConfig {
  title: string;
  filterTitle: string;
  defaultTheme: ThemeMode;
  defaultFiltersOpen: boolean;
  layout: DashboardLayoutConfig;
  grid: DashboardGridConfig;
  controls: DashboardControlLabels;
}

export interface DashboardConfig {
  assets: DashboardAssetConfig;
  screen: DashboardScreenConfig;
  page: DashboardPageConfig;
  modals?: Record<string, DashboardModalConfig>;
  filters: DashboardFilterGroup[];
}
