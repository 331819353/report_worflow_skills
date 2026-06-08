<script setup lang="ts">
/**
 * Widget 组件开发模板
 *
 * 使用方式：
 * 1. 复制本文件到 src/widgets/components，例如：
 *    src/widgets/components/MyWidget.vue
 *
 * 2. 在 src/widgets/types.ts 里增加你的 props 类型，例如：
 *    export interface MyWidgetProps extends Record<string, unknown> {
 *      value: string;
 *      unit?: string;
 *    }
 *
 * 3. 在 src/widgets/types.ts 的 WidgetPropsRegistry 中注册 props 类型，例如：
 *    export interface WidgetPropsRegistry {
 *      MyWidget: MyWidgetProps;
 *    }
 *
 * 4. 在 src/widgets/registry.ts 中注册组件，例如：
 *    import MyWidget from './components/MyWidget.vue';
 *
 *    export const widgetRegistry: Partial<Record<RegisteredWidgetType, WidgetRegistration>> &
 *      Record<string, WidgetRegistration | undefined> = {
 *      MyWidget: {
 *        component: MyWidget,
 *        description: '这里写组件用途，方便维护者理解。',
 *      },
 *    };
 *
 * 5. 组件样式写在本文件底部的 <style scoped> 中。
 *    不要把自定义组件的 class 写到 src/styles.css：
 *    - src/styles.css 只放大屏页面骨架、标题区、网格、弹窗等模板级样式。
 *    - 每个业务组件自己的布局、字体、图表、卡片、动效都放在自己的 .vue 文件里。
 *    - 这样复制组件、改组件、删除组件时，不会污染其他 Widget。
 *
 * 6. 不需要在业务组件中手动引入 WidgetRenderer 或 WidgetViewport。
 *    它们是模板框架层，职责已经固定：
 *    - WidgetRenderer 会读取 dashboard.config.ts 的 widgets 配置，找到注册组件并渲染。
 *    - WidgetRenderer 会自动传入 context，并给已配置组件的分块增加统一内容层次底纹。
 *    - WidgetViewport 只在 widgets 配置里声明 viewport 时自动启用。
 *    - WidgetViewport 负责拖拽、缩放、双击复位和初始居中，不应写进业务组件。
 *    - 除非要改整套模板机制，否则不要修改 WidgetRenderer.vue 和 WidgetViewport.vue。
 *
 * 7. 在 src/config/dashboard.config.ts 的 page.widgets 中使用，例如：
 *    page: {
 *      layoutRows: ['AAAABBBB', 'CCDDEEFF'],
 *      widgets: {
 *        A: {
 *          type: 'MyWidget',
 *          visualType: 'other',
 *          title: '业务标题',
 *          props: {
 *            value: '128.6',
 *            unit: '亿',
 *          },
 *          filterScope: 'revenue',
 *          localFilters: [
 *            {
 *              id: 'productLine',
 *              label: '产品线',
 *              field: 'productLine',
 *              mode: 'auto',
 *              maxButtonOptions: 5,
 *            },
 *          ],
 *          data: {
 *            id: 'staticData',
 *            params: {
 *              key: 'revenueMonthly',
 *            },
 *            filterFields: {
 *              cycle: 'period',
 *              scope: 'regionId',
 *            },
 *            requiredFilters: ['cycle', 'scope'],
 *          },
 *          // 弹窗、跳转、下钻由 MyWidget 内部自行实现。
 *          // 如果需要通知外部系统，可在组件里 emit('dashboard-action', { name, payload })。
 *        },
 *      },
 *    },
 *
 * 8. 数据不要直接写在 dashboard.config.ts。
 *    离线/mock 数据放到 src/data/dashboard.dataset.json；常规 API 使用 data.id: 'apiData' + data.api 配置。
 *    复杂 API/provider 数据源再到 src/dataSources/registry.ts 注册自定义 resolver。
 *    组件配置只写 data.id、data.params、data.api 和 filterFields；框架会把数据源结果作为 data prop 传入组件。
 *    如果组件必须受某个筛选影响，写 requiredFilters，避免字段漏配后筛选静默失效。
 *    如果固定 params 必须过滤 staticData，写 requiredParams，避免参数字段拼错后静默不过滤。
 *    如果组件明确不受某个全局筛选影响，写 ignoredFilters，并同步写 ignoredFilterReasons 说明不可变范围。
 *    无 data 的组件必须在配置里写 dataPolicy: 'static' | 'external'，否则 validate:dashboard 会失败。
 *    每个组件必须写 visualType，框架会用它校验当前 layoutRows 占位是否合法。
 *    多月/趋势/月环比/同比页面必须提供完整周期数据，不要只给默认单月数据。
 *    折线/面积/柱状等类目轴图表必须先排序整行数据，再从同一个 sortedRows 同步生成 xAxis labels 和 series.data。
 *    不要只对 labels/xAxisData/categories 排序后继续用原始 data.map(...) 生成数值，否则点位和值会错位。
 *    可复用 src/widgets/chartDataUtils.ts 的 sortRowsForCategoryAxis 或 buildSingleSeriesCategoryData；这里是工具函数，不存放 mock 行数据。
 *    说明、摘要、总结类文本组件使用 visualType: 'text-summary'，合法占位为 4x1/5x1/6x1/7x1/8x1 或 3x2。
 *
 * 9. 筛选作用域通过 filterScope 控制：
 *    - filter 配置没有 scope 时是全局筛选，所有组件都能拿到。
 *    - filter 配置有 scope 时，只有 widget.filterScope 命中的组件能拿到。
 *    - 组件里 context.filters 是当前组件作用域内的筛选，context.allFilters 是全量筛选。
 *
 * 10. 组件标题区筛选通过 localFilters 控制：
 *    - 只过滤当前组件已加载的 data，不参与接口或 dataSource 参数传递。
 *    - field/valueField/labelField 指向 data 行里的字段名；未写 options 时会从 data 自动推导选项。
 *    - 单个筛选且选项少时标题区显示滑动胶囊按钮；多条件或选项多时显示筛选面板。
 *    - 组件里可读取 context.localFilters 获取当前本地筛选值。
 *
 * 11. 组件触发跳转、下钻、弹窗时，由组件内部独立实现。
 *    如需让外部系统感知，可额外 emit('dashboard-action', { name, payload })：
 *    - name 是事件名，例如 itemClick、rowClick。
 *    - payload 是业务数据。
 *    - 壳层只转发到 actions/registry.ts 的同名钩子或 dashboardAction 兜底钩子。
 *
 * 12. 如果组件内容很大，需要拖拽/缩放，在配置中加 viewport：
 *    viewport: {
 *      pannable: true,
 *      zoomable: true,
 *      minZoom: 0.5,
 *      maxZoom: 2,
 *      defaultZoom: 1,
 *      naturalWidth: 800,
 *      naturalHeight: 600,
 *    }
 *
 * 注意：
 * - props 中不要写 context，context 由 WidgetRenderer 自动传入。
 * - props 中不要写 data，data 由 WidgetRenderer 根据 widget.data 自动传入。
 * - 组件根元素必须撑满 100% 宽高，避免在分块里塌陷。
 * - 本组件只负责“内容区”内部显示，外层统一卡片由模板生成：白底、8px 圆角、轻阴影、24px 安全内边距。
 * - 不要在组件根节点再包一层硬边框卡片，也不要把标题做成带框的小盒子。
 * - 内容区背景由模板铺满整个 body，不要再做一个缩进背景或默认边框。
 * - KPI 核心数字使用 28-32px；单位/同比/辅助标签使用 12-14px；表格/列表里的财务和指标数字右对齐。
 * - 多系列 ECharts 必须显示 legend；隐藏外边框和纵向网格，横向网格用浅色虚线。
 * - 折线图排序时先 sort rows，再用同一份 rows 生成 xAxis.data 和所有 series.data。
 *   不要写 labels.sort() 后让 series.data 继续读取未排序 data。
 * - 状态文字必须渲染成 badge/pill 或 icon+text，不要只输出纯文本。
 * - 简单表格默认按列内容自适应；单元格内容必须可换行或通过表格内部横向滚动完整查看，不用省略号表达未展示。
 * - WidgetRenderer/WidgetViewport 是外层能力，业务组件只写自己的展示逻辑和私有样式。
 * - WidgetRenderer 已经提供统一内容层次底纹，业务组件无需再重复外框。
 * - context.filters 已经按 filterScope 裁剪；需要全量筛选时读取 context.allFilters。
 * - context.localFilters 是组件标题区筛选的当前值；该筛选只处理组件 data，不请求接口。
 * - 数据型筛选默认来自 filters[].source；options 仅用于状态、等级、周期粒度、是否类等稳定枚举。
 * - dashboard-action 只作为外部扩展接口，不再由壳层统一执行弹窗、跳转、下钻。
 * - 如果确实要做组件自己的内部卡片或图表背景，请写在当前组件的 <style scoped>。
 * - 大图、关系图、杜邦图这类组件建议声明 naturalWidth/naturalHeight，
 *   再用 viewport 承接拖拽和缩放。
 * - 雷达图必须显式配置 axisName/nameGap、legend 和 radius，避免维度标签与分类/图例重叠。
 * - 组件占位必须符合 visualType 的合法尺寸；不够用时换更大的合法分块，不要靠溢出或缩字解决。
 */
import type { DashboardWidgetActionEvent } from '../../types/actions';
import type { WidgetContext } from '../types';

interface Props {
  /**
   * context 是模板自动提供的上下文，不需要在配置文件里写。
   * 常用字段：
   * - context.area：当前区域，模板主画布固定为 page
   * - context.navId：兼容字段，单页模板固定为 single-page
   * - context.navLabel：兼容字段，单页模板为当前页面标题
   * - context.blockId：当前分块字符，例如 A、B、g
   * - context.filters：当前组件作用域内的筛选项选中值
   * - context.allFilters：全量筛选项选中值
   * - context.filterScope：当前组件声明的筛选作用域
   * - context.localFilters：组件标题区本地筛选项选中值
   */
  context: WidgetContext;

  /**
   * data 由 WidgetRenderer 根据 dashboard.config.ts 里的 widget.data 自动传入。
   * 建议复制模板后改成更精确的业务类型，例如 RevenueRow[]。
   */
  data?: unknown[];

  /**
   * 以下字段只是示例 props。
   * 复制模板后，请替换成你的组件真实参数，并同步更新 src/widgets/types.ts。
   */
  value?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'dashboard-action', payload: DashboardWidgetActionEvent): void;
}>();

const triggerExampleAction = () => {
  emit('dashboard-action', {
    name: 'itemClick',
    payload: {
      value: props.value ?? '',
      blockId: props.context.blockId,
    },
  });
};
</script>

<template>
  <!-- 根元素必须保留 width/height: 100%，让组件填满分块内容区域。 -->
  <section class="custom-widget">
    <!-- 在这里开发你的图表、指标卡、表格或关系图。 -->
    <div>{{ value }}</div>
    <div>数据行数：{{ data?.length ?? 0 }}</div>
    <!-- 示例：真实组件中可在柱子、表格行、关系图节点点击时触发 dashboard-action。 -->
    <button type="button" class="custom-widget-action" @click="triggerExampleAction">触发动作</button>
  </section>
</template>

<style scoped>
.custom-widget {
  /* 必备：填满 WidgetRenderer 提供的组件视窗，也就是分块的组件区，不包含标题区。 */
  width: 100%;
  height: 100%;
  color: var(--text);
  font-size: 14px;
  line-height: 1.5;

  /* 必备：允许组件在 CSS Grid/Flex 容器中正确收缩，避免撑破分块。 */
  min-width: 0;
  min-height: 0;

  /*
   * 必备：不要给根节点或图表容器写大于组件视窗的固定宽高。
   * ECharts、AntV S2、SVG、Canvas 都应从当前根节点读取尺寸并在 resize 时重算。
   */

  /* 可选：如果组件内部自己滚动，打开下面两行；否则交给 WidgetRenderer 兜底裁剪。 */
  /* overflow: auto; */
  /* overscroll-behavior: contain; */

  /*
   * 组件私有样式写在这里。
   * 例如指标字号、柱状图颜色、表格行高、内部网格、组件自己的 hover/focus 边框或内发光等。
   *
   * 不要写到 src/styles.css：
   * - 全局文件只维护驾驶舱壳层，不维护某一个 Widget 的视觉细节。
   * - scoped 能避免 MyWidget 的 .title、.chart、.value 等类名影响其他组件。
   * - 新人复制本模板开发新组件时，只需要改本文件、types.ts、registry.ts、dashboard.config.ts。
   */
}

.custom-widget-action {
  width: fit-content;
  min-height: 30px;
  margin-top: 12px;
  padding: 0 12px;
  border: 0;
  border-radius: 8px;
  color: var(--text-strong);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  cursor: pointer;
}
</style>
