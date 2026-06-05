import type { DashboardConfig } from '../types/dashboard';

// 左侧导航分析工作台模板的唯一入口配置。
// 新项目通常先改这里：换 logo、改标题、增删导航页、调整每页 layoutRows、配置筛选项和组件挂载关系。
export const cockpitConfig: DashboardConfig = {
  assets: {
    // 左侧导航顶部 logo。文件放在 public 目录下时，路径以 "/" 开头。
    logoSrc: '/haier-logo.svg',
    // logo 的无障碍描述，图片加载失败时也会作为替代文本。
    logoAlt: '海尔 logo',
  },

  screen: {
    // 左侧品牌区标题。右侧区域只渲染内容分块，不额外渲染页面头和页脚。
    title: '经营分析工作台',
    // 左侧导航的无障碍标题。
    navTitle: '功能导航',
    // 筛选浮层标题。
    filterTitle: '查询筛选',
    // 该框架按浅色企业分析台设计；如果改为 dark，需要同步调整 src/styles.css 的变量。
    defaultTheme: 'light',
    // 左侧导航默认展开。用户点击底部“收起导航”后会折叠为图标栏。
    defaultNavOpen: true,
    // 首次进入页面时筛选浮层是否默认打开。
    defaultFiltersOpen: false,

    layout: {
      // 固定设计稿宽度。浏览器显示区域不够时，页面使用原生滚动条。
      designWidth: 1920,
      // 固定设计稿高度。右侧内容区内部支持纵向滚动。
      designHeight: 1080,
      // 左侧导航展开宽度，对应参考稿中的 256px 侧栏。
      sidebarWidth: 256,
      // 左侧导航折叠宽度，只保留图标和 logo。
      sidebarCollapsedWidth: 80,
      // 内容分块之间的间距。只控制块与块之间，不控制块内部 padding。
      contentGap: 16,
    },

    grid: {
      // 右侧内容区从顶部到下方全部用于页面内容。
      // contentEndY - contentStartY 是右侧内容画布的最小高度。
      contentStartY: 0,
      contentEndY: 1032,
      // 每一行的基础高度。layoutRows 有 N 行时，右侧内容高度会按 N 自动计算；
      // 如果超过屏幕高度，右侧内容区会出现纵向滚动条。
      rowHeight: 320,
      // 每个分块外层留白。浅色卡片模板通常保持 0，让卡片对齐更干净。
      cellPadding: 0,
      // 保留给组件卡片的主题色，框架样式会用它做弱高亮。
      dominantTitleColor: '#004ac6',
      // 分块内部主体背景色。这里使用白色卡片，业务组件可在自己的 scoped style 中覆盖内部视觉。
      innerBackgroundColor: '#ffffff',
    },

    controls: {
      // 底部工具区按钮文案，也作为 aria-label/title。
      navigation: '收起',
      filters: '筛选',
      download: '下载',
      refresh: '刷新',
      fullscreen: '全屏',
    },
  },

  // 导航页配置。数组里有几个对象，左侧导航就显示几个页面。
  // layoutRows 是当前导航页的内容分块布局，采用 8*N 规则：
  // 1. 每个字符串代表一行，每个字符代表一列。
  // 2. 每行必须保持 8 个字符，即固定 8 列；数组有几行就是 N。
  // 3. 相邻且相同的字符会合并成一个块，例如 "AAAA" 会横向跨四列。
  // 4. 同一个字符上下相邻也会合并，例如两行同列都是 "A" 会纵向合并。
  // 5. "." 或空格表示留空，不生成块。
  // 6. 字符本身就是当前块默认标题；大小写不同会被视为不同块。
  // 7. widgets 用于给某个块挂载组件，key 必须和 layoutRows 里的块字符一致。
  // 8. 模板默认不内置业务组件；复制 WidgetTemplate.vue 后，再到 registry.ts 和 types.ts 注册。
  // 9. 组件数据不要写死在这里。默认 JSON 数据放到 src/data/dashboard.dataset.json；
  //    常规 API 使用 data.id: 'apiData' + data.api 配置；复杂 API/provider 再到 src/dataSources/registry.ts 注册。
  //    这里仅保留引用关系。
  // 10. visualType 用来声明组件视觉类型，校验脚本会用它检查当前块占位是否合法。
  // 11. filterScope 用来声明当前组件受哪些有 scope 的筛选项影响。
  //     组件的数据源用 filterFields 映射筛选字段；用 requiredFilters 防止漏配后静默失效；
  //     用 ignoredFilters + ignoredFilterReasons 显式声明组件不受某些全局筛选影响。
  // 12. localFilters 用来声明组件标题区筛选，只过滤组件已加载 data，不作为接口参数。
  //     少量选项自动显示为滑动胶囊按钮，多条件或多选项自动显示为筛选面板。
  // 13. 弹窗、跳转、下钻等业务交互由组件内部自行实现。
  //     如需让外部系统感知组件事件，可 emit('dashboard-action', { name, payload })；
  //     壳层只转发到 actions/registry.ts 的同名钩子或 dashboardAction 兜底钩子。
  nav: [
    {
      id: 'dashboard',
      label: '数据看板',
      icon: 'Gauge',
      // 8列3行：第一行 8 个单块，第二/三行示例包含横向合并块。
      layoutRows: ['ABCDEFGH', 'iijjkkll', 'mmnnoopp'],
    },
    {
      id: 'analytics',
      label: '分析查询',
      icon: 'BarChart3',
      // 8列4行：适合明细表、筛选结果、趋势卡片混排；超过可视高度时右侧滚动。
      layoutRows: ['AAAABBBB', 'CCCCDDDD', 'eeffgghh', 'iijjkkll'],
    },
    {
      id: 'reports',
      label: '报表中心',
      icon: 'Factory',
      // 8列3行：左右重点区 + 底部多个小块。
      layoutRows: ['AAAABBBB', 'AAAABBBB', 'ccddeeff'],
    },
    {
      id: 'team',
      label: '组织协同',
      icon: 'Network',
      // 8列3行：左侧高块 + 右侧列表块。
      layoutRows: ['AABBCCDD', 'AABBEEFF', 'gghhiijj'],
    },
    {
      id: 'security',
      label: '安全审计',
      icon: 'Settings',
      // 8列3行：配置、审计、告警类内容占位。
      layoutRows: ['AAAABBBB', 'CCDDEEFF', 'gghhiijj'],
    },
  ],

  // 筛选项配置。模板默认保持空白，只保留全局传参入口。
  // 需要新增筛选时，优先把选项写到 src/data/dashboard.dataset.json 的 filterData 中，
  // 再在这里增加 source 引用；若选项来自接口，使用 source.id: 'apiData' + source.api。
  // 不写 scope 即为全局筛选，会传给所有页面、组件和预留接口。
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
