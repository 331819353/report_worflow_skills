import type { DashboardConfig } from '../types/dashboard';

// 单页顶部栏报表模板的唯一入口配置。
// 新页面通常只需要改这个文件：换 logo、改标题、调整 page.layoutRows、配置筛选项和组件挂载关系。
export const cockpitConfig: DashboardConfig = {
  assets: {
    // 顶部栏左一 logo。深色背景建议使用白色 logo；浅色背景使用原色 logo。
    logoSrc: '/haier-logo.svg',
    logoAlt: 'Haier logo',
    // 可选背景图。没有背景图时使用 styles.css 中的渐变背景。
    backgroundSrc: '/cockpit-bg.jpg',
  },

  screen: {
    // 顶部栏居中标题。
    title: '经营驾驶舱',
    // 右侧筛选抽屉标题。
    filterTitle: '筛选项',
    defaultTheme: 'dark',
    defaultFiltersOpen: false,

    layout: {
      // 固定设计稿宽度。浏览器显示区域不够时，页面使用原生滚动条。
      designWidth: 1920,
      // 固定设计稿高度。内容超过时保持画布滚动，不压缩组件。
      designHeight: 1080,
      // 顶部菜单栏高度。内容区从 grid.contentStartY 开始。
      topbarHeight: 72,
      // 内容分块之间的间距。只影响块与块之间，不影响块内部 padding。
      contentGap: 14,
    },

    grid: {
      // 内容区起始 y 坐标。默认在顶部菜单栏下方留出 16px 呼吸空间。
      contentStartY: 88,
      // 内容区结束 y 坐标。默认铺到 1080px 底部。
      contentEndY: 1064,
      cellPadding: 0,
      dominantTitleColor: '#20a8ff',
      innerBackgroundColor: 'rgba(9, 30, 48, 0.68)',
    },

    controls: {
      filters: '筛选',
      download: '下载',
      refresh: '刷新',
      themeLight: '切换亮色布局',
      themeDark: '切换暗色布局',
    },
  },

  // 单页内容配置。layoutRows 采用 8*N 规则：
  // 1. 每个字符串代表一行，每个字符代表一列，每行建议保持 8 个字符。
  // 2. 相邻且相同的字符会合并成一个矩形块，例如 "AAAA" 会横向跨四列。
  // 3. 同一个字符上下相邻也会合并，例如两行同列都是 "A" 会纵向合并。
  // 4. "." 或空格表示留空，不生成块。
  // 5. 字符本身就是当前块默认标题；大小写不同会被视为不同块。
  // 6. widgets 用于给某个块挂载组件，key 必须和 layoutRows 里的块字符一致。
  // 7. 模板默认不内置业务组件；复制 WidgetTemplate.vue 后，再到 registry.ts 和 types.ts 注册。
  // 8. 组件数据不要写死在这里。真实数据放到 src/data/dashboard.data.ts，
  //    或在 src/dataSources/registry.ts 注册接口数据源；这里仅保留引用关系。
  // 9. visualType 用来声明组件视觉类型，校验脚本会用它检查当前块占位是否合法。
  // 10. filterScope 用来声明当前组件受哪些有 scope 的筛选项影响。
  //    没有 scope 的筛选项是全局筛选，所有组件都会收到。
  // 11. 组件交互不要直接写跳转/弹窗逻辑。组件只 emit('dashboard-action', { name, payload })，
  //     然后在 widgets[块字符].actions 中声明 openModal、setFilters、navigateUrl 等动作。
  //     navigateUrl 默认追加当前 filters；弹窗打开后筛选变化时，context.isStale 会变为 true。
  page: {
    layoutRows: ['AAAABBBB', 'CCDDEEFF', 'gghhiijj'],
    widgets: {},
  },

  // 全局弹窗配置。openModal 的 target/modal 必须对应这里的 key。
  // 弹窗内部同样使用 layoutRows + widgets，因此可以复用任意注册组件。
  modals: {},

  // 筛选项配置。数据型筛选默认使用 source，从维表、事实表或接口派生。
  // options 只用于状态、等级、周期粒度、是否类等稳定枚举。
  // 月/季/年等多周期筛选必须有对应周期的数据行，不能只做默认单月数据。
  // source.id 对应 src/dataSources/registry.ts 中注册的数据源 key。
  // source.params 支持 $filters.xxx、$context.xxx、$params.xxx 表达式。
  // scope 可选：不写 scope 表示全局筛选，会影响所有组件。
  // 写了 scope 后，只影响 filterScope 命中的组件，例如 filter.scope='revenue' 对应 widget.filterScope='revenue'。
  filters: [
    {
      id: 'cycle',
      label: '时间周期',
      options: [
        { id: 'day', label: '日' },
        { id: 'month', label: '月' },
        { id: 'quarter', label: '季' },
      ],
    },
    {
      id: 'scope',
      label: '经营范围',
      options: [
        { id: 'global', label: '全球' },
        { id: 'china', label: '中国区' },
        { id: 'overseas', label: '海外' },
      ],
    },
    {
      id: 'org',
      label: '组织层级',
      options: [
        { id: 'group', label: '集团' },
        { id: 'industry', label: '产业' },
        { id: 'unit', label: '小微' },
      ],
    },
  ],
};
