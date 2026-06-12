import type { DashboardConfig } from '../src/types/dashboard';
import type { DashboardActionConfig } from '../src/types/actions';
import type { DashboardDataSourceRef } from '../src/types/data-source';
import type { RegisteredWidgetConfig } from '../src/widgets/types';

// Template: frozen-title-sci-fi-cockpit-template
// 用法：复制需要的对象片段到 src/config/dashboard.config.ts。
// 组件 type 需要先在 src/widgets/types.ts 与 src/widgets/registry.ts 中注册。

export const datasetTemplate = {
  filterData: {
    regions: [
      { id: '__all', label: '全部' },
      { id: 'china', label: '中国区' },
      { id: 'overseas', label: '海外区' },
    ],
  },
  businessData: {
    revenueRows: [
      {
        period: '2026-05',
        regionId: 'china',
        productLine: 'refrigerator',
        productLineName: '冰箱',
        amount: 1280.5,
        completion: 96.4,
      },
      {
        period: '2026-03',
        regionId: 'china',
        productLine: 'refrigerator',
        productLineName: '冰箱',
        amount: 1168.2,
        completion: 91.7,
      },
      {
        period: '2026-04',
        regionId: 'china',
        productLine: 'refrigerator',
        productLineName: '冰箱',
        amount: 1212.9,
        completion: 93.8,
      },
    ],
  },
} as const;

export const actionConfigTemplates = {
  nodeClick: {
    type: 'nodeClick',
    params: {
      id: '$event.id',
      nodeType: '$event.nodeType',
      navId: '$context.navId',
    },
  },
  sendExternalSignal: {
    type: 'sendExternalSignal',
    params: {
      sourceBlock: '$context.blockId',
      filters: '$filters',
    },
  },
} satisfies Record<string, DashboardActionConfig>;

export const dataSourceTemplates = {
  jsonRevenueRows: {
    id: 'businessData',
    params: {
      key: 'revenueRows',
    },
    requiredFilters: ['regionId'],
  },
  apiRevenueRows: {
    id: 'apiData',
    api: {
      url: '/api/revenue/rows',
      method: 'GET',
      query: {
        regionId: '$filters.regionId',
        period: '$filters.period',
      },
      responsePath: 'data.rows',
      adapter: 'rows',
    },
    requiredFilters: ['regionId'],
  },
  apiRegionOptions: {
    id: 'apiData',
    api: {
      url: '/api/filter-options/regions',
      method: 'GET',
      query: {
        period: '$filters.period',
      },
      responsePath: 'data.options',
      adapter: 'rows',
    },
    labelField: 'label',
    valueField: 'id',
  },
} satisfies Record<string, DashboardDataSourceRef>;

export const widgetTemplates = {
  dataBackedTable: {
    type: 'RevenueTable',
    visualType: 'table',
    title: '收入明细',
    props: {
      precision: 1,
    },
    data: {
      ...dataSourceTemplates.jsonRevenueRows,
    },
  },
  apiBackedTable: {
    type: 'RevenueTable',
    visualType: 'table',
    title: 'API 收入明细',
    props: {
      precision: 1,
    },
    data: {
      ...dataSourceTemplates.apiRevenueRows,
    },
  },
  cockpitTrend: {
    type: 'CockpitTrendChart',
    visualType: 'line',
    title: '收入趋势',
    props: {
      categoryField: 'period',
      valueField: 'amount',
      sortField: 'period',
      sortDirection: 'asc',
    },
    data: {
      id: 'businessData',
      params: {
        key: 'revenueRows',
      },
    },
  },
  localButtonFilters: {
    type: 'RevenueTable',
    visualType: 'table',
    title: '标题区胶囊筛选',
    props: {},
    data: {
      id: 'businessData',
      params: {
        key: 'revenueRows',
      },
      ignoredFilters: ['regionId'],
      ignoredFilterReasons: {
        regionId: 'This local-filter demo intentionally shows already loaded rows and does not inherit the global region filter.',
      },
    },
    localFilters: [
      {
        id: 'productLine',
        label: '产品线',
        field: 'productLine',
        labelField: 'productLineName',
        mode: 'auto',
        maxButtonOptions: 5,
      },
    ],
  },
  localPanelFilters: {
    type: 'RevenueTable',
    visualType: 'table',
    title: '标题区筛选面板',
    props: {},
    data: {
      id: 'businessData',
      params: {
        key: 'revenueRows',
      },
    },
    localFilters: [
      {
        id: 'productLine',
        label: '产品线',
        field: 'productLine',
        labelField: 'productLineName',
        mode: 'panel',
      },
      {
        id: 'period',
        label: '期间',
        field: 'period',
      },
    ],
  },
  viewportDiagram: {
    type: 'RelationDiagram',
    visualType: 'graph',
    title: '关系图',
    props: {},
    data: {
      id: 'businessData',
      params: {
        key: 'relationRows',
      },
    },
    actions: {
      nodeClick: actionConfigTemplates.nodeClick,
    },
    viewport: {
      pannable: true,
      zoomable: true,
      minZoom: 0.5,
      maxZoom: 2,
      defaultZoom: 1,
      naturalWidth: 1200,
      naturalHeight: 720,
    },
  },
  staticSummary: {
    type: 'SummaryText',
    visualType: 'text-summary',
    title: '经营摘要',
    props: {
      text: '本月收入保持稳定增长。',
    },
    dataPolicy: 'static',
  },
  externalRealtime: {
    type: 'RealtimeMap',
    visualType: 'map',
    title: '实时地图',
    props: {},
    dataPolicy: 'external',
  },
} satisfies Record<string, RegisteredWidgetConfig>;

export const sciFiDashboardConfigTemplate = {
  assets: {
    logoSrc: '/haier-logo.svg',
    logoAlt: 'Haier logo',
    titleBackgroundSrc: '/title-bg.png',
    backgroundSrc: '/cockpit-bg.jpg',
  },
  screen: {
    title: '经营驾驶舱',
    navTitle: '功能导航',
    filterTitle: '筛选项',
    defaultTheme: 'dark',
    defaultNavOpen: false,
    defaultFiltersOpen: false,
    layout: {
      designWidth: 1920,
      designHeight: 1080,
      titleBackgroundWidth: 1920,
      titleBackgroundHeight: 164,
      titleVisibleTop: 0,
      titleVisibleHeight: 116,
      titleOffsetY: -8,
      controlSize: 20,
      controlLogoWidth: 48,
      controlLogoOffsetX: 0,
      controlLogoLift: 50,
      controlIconWidth: 30,
      controlGroupGap: 10,
      controlBottom: 30,
      controlInset: 20,
      backgroundTileWidth: 1920,
      backgroundTileHeight: 1080,
      contentGap: 10,
    },
    grid: {
      contentStartY: 118,
      contentEndY: 1080,
      cellPadding: 5,
      dominantTitleColor: '#20a8ff',
      innerBackgroundColor: 'rgba(32, 168, 255, 0.16)',
    },
    controls: {
      navigation: '显示或隐藏导航栏',
      filters: '显示或隐藏筛选项',
      download: '下载',
      refresh: '刷新',
      fullscreen: '全屏',
    },
  },
  nav: [
    {
      id: 'overview',
      label: '经营总览',
      icon: 'Gauge',
      layoutRows: ['AAAABBBB', 'AAAABBBB', 'CCCCDDDD', 'EEEEFFFF'],
      widgets: {
        A: widgetTemplates.cockpitTrend,
        B: widgetTemplates.localButtonFilters,
        C: widgetTemplates.localPanelFilters,
        D: widgetTemplates.viewportDiagram,
        E: widgetTemplates.staticSummary,
        F: widgetTemplates.externalRealtime,
      },
    },
    {
      id: 'industry',
      label: '产业经营',
      icon: 'Factory',
      layoutRows: ['AAAABBBB', 'AAAABBBB', 'CCCCDDDD'],
      widgets: {
        A: widgetTemplates.dataBackedTable,
        B: widgetTemplates.viewportDiagram,
        C: widgetTemplates.localPanelFilters,
        D: widgetTemplates.staticSummary,
      },
    },
  ],
  filters: [
    {
      id: 'regionId',
      label: '区域',
      defaultValue: '',
      source: {
        id: 'filterData',
        params: {
          key: 'regions',
        },
        labelField: 'label',
        valueField: 'id',
      },
    },
  ],
} satisfies DashboardConfig;
