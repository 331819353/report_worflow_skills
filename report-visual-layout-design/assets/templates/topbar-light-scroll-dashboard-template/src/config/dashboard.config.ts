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
    defaultTheme: 'light',
    defaultFiltersOpen: false,

    layout: {
      // 固定设计稿宽度。浏览器显示区域不够时，页面使用原生滚动条。
      designWidth: 1920,
      // 最小设计稿高度。单页报表内容超过 1080px 时允许页面继续向下增长并滚动，不压缩组件。
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
      // Every resolved content block must be at least 220px tall. If the grid is taller than the first 1080px viewport, the page grows and scrolls vertically.
      rowHeight: 316,
      cellPadding: 0,
      dominantTitleColor: '#20a8ff',
      innerBackgroundColor: 'rgba(9, 30, 48, 0.68)',
    },

    controls: {
      filters: '筛选',
      download: '下载',
      refresh: '刷新',
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
  // 8. 组件数据不要写死在这里。默认 JSON 数据放到 src/data/dashboard.dataset.json；
  //    常规 API 使用 data.id: 'apiData' + data.api 配置；复杂 API/provider 再到 src/dataSources/registry.ts 注册。
  //    这里仅保留引用关系。
  // 9. visualType 用来声明组件视觉类型，校验脚本会用它检查当前块占位是否合法。
  // 10. filterScope 用来声明当前组件受哪些有 scope 的筛选项影响。
  //    没有 scope 的筛选项是全局筛选，所有组件都会收到。
  // 11. localFilters 用来声明组件标题区筛选，只过滤组件已加载 data，不作为接口参数。
  //     少量选项自动显示为滑动胶囊按钮，多条件或多选项自动显示为筛选面板。
  // 12. 弹窗、跳转、下钻等业务交互由组件内部自行实现。
  //     如需让外部系统感知组件事件，可 emit('dashboard-action', { name, payload })；
  //     壳层只转发到 actions/registry.ts 的同名钩子或 dashboardAction 兜底钩子。
  page: {
    layoutRows: ['AAAABBBB', 'CCDDEEFF', 'gghhiijj'],
    widgets: {},
  },

  // 筛选项配置。模板默认保持空白，只保留全局传参入口。
  // 需要新增筛选时，优先把选项写到 src/data/dashboard.dataset.json 的 filterData 中，
  // 再在这里增加 source 引用；若选项来自接口，使用 source.id: 'apiData' + source.api。
  // 不写 scope 即为全局筛选，会传给所有组件和预留接口。
  filters: [
    {
      id: 'globalParams',
      label: '全局传参',
      defaultValue: '',
      source: {
        id: 'filterData',
        params: {
          key: 'globalParameters',
        },
        labelField: 'label',
        valueField: 'id',
      },
    },
  ],
};
