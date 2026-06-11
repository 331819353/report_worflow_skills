import type { DashboardConfig } from '../types/dashboard';

// 经营驾驶舱模板的唯一入口配置。
// 新页面通常只需要改这个文件：换图片、改标题、调位置、增删导航页、配置每页布局和筛选项。
export const cockpitConfig: DashboardConfig = {
  // 静态资源配置。文件放在 public 目录下时，路径以 "/" 开头。
  assets: {
    // 左上角 Haier logo，当前文件来自 public/haier-logo.svg。
    logoSrc: '/haier-logo.svg',
    // logo 的无障碍描述，图片加载失败时也会作为替代文本。
    logoAlt: 'Haier logo',
    // 标题栏背景图，当前按 1920px 宽展示，透明区域由 titleVisibleHeight 控制显示高度。
    titleBackgroundSrc: '/title-bg.png',
    // 页面整体背景图，按 backgroundTileWidth/backgroundTileHeight 平铺。
    backgroundSrc: '/cockpit-bg.jpg',
  },
  screen: {
    // 大屏主标题，显示在标题背景中心。
    title: '经营驾驶舱',
    // 导航抽屉顶部标题。
    navTitle: '功能导航',
    // 筛选抽屉顶部标题。
    filterTitle: '筛选项',
    // 默认主题。当前样式主要按 dark 设计，light 仅保留基础变量支持。
    defaultTheme: 'dark',
    // 首次进入页面时，导航抽屉是否默认打开。
    defaultNavOpen: false,
    // 首次进入页面时，筛选抽屉是否默认打开。
    defaultFiltersOpen: false,

    // 画布、标题栏和顶部控件的尺寸配置。除特别说明外，单位都是 px。
    layout: {
      // 大屏设计稿宽度。页面会固定为该宽度，浏览器不够宽时出现横向滚动。
      designWidth: 1920,
      // 大屏设计稿高度。页面内容区以这个高度为基准布局。
      designHeight: 1080,
      // 标题背景图片的原始展示宽度，需要和 title-bg.png 的设计宽度一致。
      titleBackgroundWidth: 1920,
      // 标题背景图片的原始高度。图片透明区域不会自动裁剪，需要配合 titleVisibleHeight。
      titleBackgroundHeight: 164,
      // 标题背景从图片 y=多少开始显示。当前非透明内容从顶部开始，所以为 0。
      titleVisibleTop: 0,
      // 标题区实际占用高度。当前根据标题图非透明区域测得为 116。
      titleVisibleHeight: 116,
      // 主标题文字的垂直微调。负数向上，正数向下。
      titleOffsetY: -8,
      // 顶部普通图标按钮尺寸，包括刷新、导航、筛选、下载等按钮高度。
      controlSize: 20,
      // 左侧 logo 的视觉宽度。
      controlLogoWidth: 48,
      // logo 横向微调。以左侧导航标题区域的左边界为基准，正数向右。
      controlLogoOffsetX: 0,
      // logo 和全屏按钮相对普通顶部工具行的上移距离。
      controlLogoLift: 50,
      // 普通图标按钮宽度。刷新、导航、筛选、下载保持这个宽度。
      controlIconWidth: 30,
      // 顶部工具按钮之间的间距。
      controlGroupGap: 10,
      // 顶部普通工具行距离标题区底部的距离。数值越大，按钮越向上。
      controlBottom: 30,
      // 左右两侧顶部控件距离画布边缘的距离。
      controlInset: 20,
      // 背景图平铺单元宽度，通常和设计稿宽度一致。
      backgroundTileWidth: 1920,
      // 背景图平铺单元高度，通常和设计稿高度一致。
      backgroundTileHeight: 1080,
      // 内容分块之间的间距。只影响块与块之间，不影响块内部 padding。
      contentGap: 10,
    },

    // 内容网格的公共样式配置。每个页面具体怎么分块，在 nav[].layoutRows 里配置。
    grid: {
      // 内容区起始 y 坐标。标题冻结后，内容仍从设计稿的 118px 位置开始。
      contentStartY: 118,
      // 内容区结束 y 坐标。默认铺到 1080px 底部。
      contentEndY: 1080,
      // 每个分块外层留白，控制透明块和块内背景之间的距离。
      cellPadding: 5,
      // 标题背景中占比最高的亮色，用于分块边框和高亮混色。
      dominantTitleColor: '#20a8ff',
      // 分块内部主体背景色。建议使用透明色，避免压住大屏背景。
      innerBackgroundColor: 'rgba(32, 168, 255, 0.16)',
    },

    // 顶部按钮的 aria-label/title 文案，也会作为浏览器悬浮提示。
    controls: {
      navigation: '显示或隐藏导航栏',
      filters: '显示或隐藏筛选项',
      download: '下载',
      refresh: '刷新',
      fullscreen: '全屏',
    },
  },

  // 导航页配置。数组里有几个对象，导航抽屉里就显示几个页面。
  // layoutRows 是当前导航页的分块布局：
  // 1. 每个字符串代表一行，每个字符代表一列。
  // 2. 相邻且相同的字符会合并成一个块，例如 "gg" 会横向跨两列。
  // 3. 同一个字符上下相邻也会合并，例如两行同列都是 "A" 会纵向合并。
  // 4. "." 或空格表示留空，不生成块。
  // 5. 字符本身就是当前块的默认标题；大小写不同会被视为不同块。
  // 6. icon 可选值见 types/dashboard.ts 的 NavItem['icon']。
  // 7. widgets 用于给某个块挂载组件，key 必须和 layoutRows 里的块字符一致。
  // 8. 模板默认不内置业务组件；复制 WidgetTemplate.vue 后，再到 registry.ts 和 types.ts 注册。
  // 9. 组件数据不要写死在这里。默认 JSON 数据放到 src/data/dashboard.dataset.json；
  //    常规 API 使用 data.id: 'apiData' + data.api 配置；复杂 API/provider 再到 src/dataSources/registry.ts 注册。
  //    这里仅保留引用关系。
  // 10. visualType 用来声明组件视觉类型，校验脚本会用它检查当前块占位是否合法。
  // 11. filterScope 用来声明当前组件受哪些有 scope 的筛选项影响。
  //     没有 scope 的筛选项是全局筛选，所有组件都会收到。
  // 12. localFilters 用来声明组件标题区筛选，只过滤组件已加载 data，不作为接口参数。
  //     标题带左侧为分块标题，右侧为功能区；功能区可放本地筛选或“查看详情”等轻量链接。
  //     单个筛选且 2-4 个短选项、标题区放得下时显示滑动胶囊按钮；>4 个选项、长标签或放不下时显示下拉框；多个筛选组显示筛选面板。
  // 13. 弹窗、跳转、下钻等业务交互由组件内部自行实现。
  //     如需让外部系统感知组件事件，可 emit('dashboard-action', { name, payload })；
  //     壳层只转发到 actions/registry.ts 的同名钩子或 dashboardAction 兜底钩子。
  nav: [
    {
      // 页面唯一标识，用于记录当前选中导航页，不要重复。
      id: 'overview',
      // 导航抽屉显示名称，也会显示在标题区左侧当前导航位置。
      label: '经营总览',
      // 当前导航页图标。
      icon: 'Gauge',
      // 经营总览页布局：8列3行；A-H 单格，i/k 跨两行，g/l/m/n/o/p 按相邻字符合并。
      layoutRows: ['ABCDEFGH', 'iggkllmm', 'innkoopp'],
    },
    {
      id: 'industry',
      label: '产业经营',
      icon: 'Factory',
      // 产业经营页布局示例：每两个相同字符合并成 2 列宽块。
      layoutRows: ['AABBCCDD', 'eeffgghh', 'iijjkkll'],
    },
    {
      id: 'finance',
      label: '指标分析',
      icon: 'BarChart3',
      // 指标分析页布局示例：A 和 F/J 是更宽的重点块。
      layoutRows: ['AAAAFFFF', 'bbccddgg', 'hhiiJJJJ'],
    },
    {
      id: 'network',
      label: '组织链路',
      icon: 'Network',
      // 组织链路页布局示例：A/B 跨两行，用于放更高的信息块。
      layoutRows: ['AABBCCDD', 'AABBeeff', 'gghhiijj'],
    },
    {
      id: 'settings',
      label: '模板配置',
      icon: 'Settings',
      // 模板配置页布局示例：上方两个宽块，下方多个小块。
      layoutRows: ['AAAABBBB', 'ccddeeff', 'gghhiijj'],
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
