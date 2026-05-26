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
 * 7. 在 src/config/dashboard.config.ts 的对应导航页 widgets 中使用，例如：
 *    widgets: {
 *      A: {
 *        type: 'MyWidget',
 *        title: '业务标题',
 *        props: {
 *          value: '128.6',
 *          unit: '亿',
 *        },
 *        filterScope: 'revenue',
 *        data: {
 *          id: 'staticData',
 *          params: {
 *            key: 'revenueMonthly',
 *          },
 *          filterFields: {
 *            cycle: 'period',
 *            scope: 'regionId',
 *          },
 *          requiredFilters: ['cycle', 'scope'],
 *        },
 *        actions: {
 *          itemClick: {
 *            type: 'openModal',
 *            target: 'DetailModal',
 *            params: {
 *              value: '$event.value',
 *              cycle: '$filters.cycle',
 *            },
 *          },
 *          moreClick: {
 *            type: 'navigateUrl',
 *            target: '/detail',
 *            query: {
 *              objectId: '$event.id',
 *            },
 *            includeFilters: true,
 *          },
 *        },
 *      },
 *    }
 *
 * 8. 数据不要直接写在 dashboard.config.ts。
 *    推荐放到 src/data/dashboard.data.ts，或者在 src/dataSources/registry.ts 接口请求。
 *    组件配置只写 data.id、data.params 和 filterFields；框架会把数据源结果作为 data prop 传入组件。
 *    如果组件必须受某个筛选影响，写 requiredFilters，避免字段漏配后筛选静默失效。
 *    如果组件明确不受某个全局筛选影响，写 ignoredFilters，不要让联动关系变成隐性假设。
 *
 * 9. 筛选作用域通过 filterScope 控制：
 *    - filter 配置没有 scope 时是全局筛选，所有组件都能拿到。
 *    - filter 配置有 scope 时，只有 widget.filterScope 命中的组件能拿到。
 *    - 组件里 context.filters 是当前组件作用域内的筛选，context.allFilters 是全量筛选。
 *
 * 10. 组件触发跳转、下钻、弹窗时，不要直接调用路由或弹窗。
 *    正确做法是 emit('dashboard-action', { name, payload })：
 *    - name 对应 dashboard.config.ts 里的 actions key，例如 itemClick。
 *    - payload 是业务数据，配置中可以通过 $event.xxx 读取。
 *    - 框架层会统一执行 openModal、switchNav、setFilters、navigateUrl 等动作。
 *
 * 11. 如果组件内容很大，需要拖拽/缩放，在配置中加 viewport：
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
 * - 本组件只负责“内容区”内部显示，外层分块标题、边框、角标、背景由模板统一生成。
 * - WidgetRenderer/WidgetViewport 是外层能力，业务组件只写自己的展示逻辑和私有样式。
 * - WidgetRenderer 已经提供统一内容层次底纹，业务组件无需再重复外框。
 * - context.filters 已经按 filterScope 裁剪；需要全量筛选时读取 context.allFilters。
 * - 弹窗打开后如果全局筛选变化，context.isStale 会变为 true，组件应清空旧选择或展示同步提示。
 * - 跳转、下钻、全局弹窗、筛选联动都通过 dashboard-action + config.actions 实现。
 * - navigateUrl 默认会追加当前全局 filters 到 URL；不需要时显式设置 includeFilters: false。
 * - 如果确实要做组件自己的内部卡片或图表背景，请写在当前组件的 <style scoped>。
 * - 大图、关系图、杜邦图这类组件建议声明 naturalWidth/naturalHeight，
 *   再用 viewport 承接拖拽和缩放。
 */
import type { DashboardWidgetActionEvent } from '../../types/actions';
import type { WidgetContext } from '../types';

interface Props {
  /**
   * context 是模板自动提供的上下文，不需要在配置文件里写。
   * 常用字段：
   * - context.area：当前区域，page 或 modal
   * - context.navId：当前导航页 id
   * - context.navLabel：当前导航页名称
   * - context.blockId：当前分块字符，例如 A、B、g
   * - context.filters：当前组件作用域内的筛选项选中值
   * - context.allFilters：全量筛选项选中值
   * - context.filterScope：当前组件声明的筛选作用域
   * - context.params：弹窗参数，只有弹窗内组件通常会用到
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
  /* 必备：填满分块内容区域。 */
  width: 100%;
  height: 100%;

  /* 必备：允许组件在 CSS Grid/Flex 容器中正确收缩，避免撑破分块。 */
  min-width: 0;
  min-height: 0;

  /* 可选：如果组件内部自己滚动，打开下面两行。 */
  /* overflow: auto; */
  /* overscroll-behavior: contain; */

  /*
   * 组件私有样式写在这里。
   * 例如指标字号、柱状图颜色、表格行高、内部网格、组件自己的 hover 动效等。
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
  border: 1px solid rgba(127, 213, 255, 0.28);
  border-radius: 6px;
  color: #f3fbff;
  background: rgba(37, 201, 255, 0.1);
  cursor: pointer;
}
</style>
