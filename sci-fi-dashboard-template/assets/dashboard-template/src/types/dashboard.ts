import type { WidgetMap } from '../widgets/types';
import type { DashboardDataSourceRef, DashboardFilterScope } from './data-source';

export type ThemeMode = 'dark' | 'light';

export interface DashboardAssetConfig {
  logoSrc: string;
  logoAlt: string;
  titleBackgroundSrc: string;
  backgroundSrc: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: 'Gauge' | 'Factory' | 'BarChart3' | 'Network' | 'Settings';
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
  titleBackgroundWidth: number;
  titleBackgroundHeight: number;
  titleVisibleTop: number;
  titleVisibleHeight: number;
  titleOffsetY: number;
  controlSize: number;
  controlLogoWidth: number;
  controlLogoOffsetX: number;
  controlLogoLift: number;
  controlIconWidth: number;
  controlGroupGap: number;
  controlBottom: number;
  controlInset: number;
  backgroundTileWidth: number;
  backgroundTileHeight: number;
  contentGap: number;
}

export interface DashboardControlLabels {
  navigation: string;
  filters: string;
  download: string;
  refresh: string;
  fullscreen: string;
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
  // 静态筛选项。简单模板直接配置 options 即可。
  options?: DashboardFilterOption[];
  // 动态筛选项。source.id 对应 src/dataSources/registry.ts 中注册的数据源。
  source?: DashboardDataSourceRef;
  // 筛选作用域。未配置时为全局筛选，会影响所有组件。
  // 配置后只影响 filterScope 命中的组件，例如 scope: 'revenue'。
  scope?: DashboardFilterScope;
}

export interface DashboardScreenConfig {
  title: string;
  navTitle: string;
  filterTitle: string;
  defaultTheme: ThemeMode;
  defaultNavOpen: boolean;
  defaultFiltersOpen: boolean;
  layout: DashboardLayoutConfig;
  grid: DashboardGridConfig;
  controls: DashboardControlLabels;
}

export interface DashboardConfig {
  assets: DashboardAssetConfig;
  screen: DashboardScreenConfig;
  nav: NavItem[];
  modals?: Record<string, DashboardModalConfig>;
  filters: DashboardFilterGroup[];
}
