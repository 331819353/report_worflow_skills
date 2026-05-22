import type { WidgetMap } from '../widgets/types';

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
}

export interface DashboardFilterGroup {
  id: string;
  label: string;
  options: DashboardFilterOption[];
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
  filters: DashboardFilterGroup[];
}
