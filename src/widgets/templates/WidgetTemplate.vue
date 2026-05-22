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
 *      MetricCard: MetricCardWidgetProps;
 *      SimpleBarChart: SimpleBarChartWidgetProps;
 *      MyWidget: MyWidgetProps;
 *    }
 *
 * 4. 在 src/widgets/registry.ts 中注册组件，例如：
 *    import MyWidget from './components/MyWidget.vue';
 *
 *    export const widgetRegistry: Record<RegisteredWidgetType, WidgetRegistration> = {
 *      ...,
 *      MyWidget: {
 *        component: MyWidget,
 *        description: '这里写组件用途，方便维护者理解。',
 *      },
 *    };
 *
 * 5. 在 src/config/dashboard.config.ts 的对应导航页 widgets 中使用，例如：
 *    widgets: {
 *      A: {
 *        type: 'MyWidget',
 *        title: '业务标题',
 *        props: {
 *          value: '128.6',
 *          unit: '亿',
 *        },
 *      },
 *    }
 *
 * 6. 如果组件内容很大，需要拖拽/缩放，在配置中加 viewport：
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
 * - 组件根元素必须撑满 100% 宽高，避免在分块里塌陷。
 * - 大图、关系图、杜邦图这类组件建议声明 naturalWidth/naturalHeight，
 *   再用 viewport 承接拖拽和缩放。
 */
import type { WidgetContext } from '../types';

interface Props {
  /**
   * context 是模板自动提供的上下文，不需要在配置文件里写。
   * 常用字段：
   * - context.navId：当前导航页 id
   * - context.navLabel：当前导航页名称
   * - context.blockId：当前分块字符，例如 A、B、g
   * - context.filters：当前筛选项选中值
   */
  context: WidgetContext;

  /**
   * 以下字段只是示例 props。
   * 复制模板后，请替换成你的组件真实参数，并同步更新 src/widgets/types.ts。
   */
  value?: string;
}

defineProps<Props>();
</script>

<template>
  <!-- 根元素必须保留 width/height: 100%，让组件填满分块内容区域。 -->
  <section class="custom-widget">
    <!-- 在这里开发你的图表、指标卡、表格或关系图。 -->
    <div>{{ value }}</div>
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
}
</style>
