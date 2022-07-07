<!--
 * @Author: HxB
 * @Date: 2022-05-05 16:49:53
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-07 17:03:41
 * @Description: layout 入口
 * @FilePath: \vue-admin\src\pages\Layout\index.vue
-->
<template>
  <a-layout class="layout">
    <!-- 侧边 -->
    <a-layout-sider width="256" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <layout-menu :collapsed="collapsed" />
    </a-layout-sider>

    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="header">
        <layout-header v-model:collapsed="collapsed" />
      </a-layout-header>

      <!-- 内容 -->
      <a-layout-content class="container">
        <layout-nav />
        <layout-tabs />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, nextTick, provide, ref, watch } from 'vue';
import LayoutMenu from './menu/menu.vue';
import LayoutTabs from './tabs/tabs.vue';
import LayoutHeader from './header/header.vue';
import LayoutNav from './nav/nav.vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Layout',
  components: {
    LayoutMenu,
    LayoutHeader,
    LayoutTabs,
    LayoutNav,
  },
  setup() {
    const store = useStore();
    const collapsed = ref<boolean>(false);

    collapsed.value = store.state.settings.collapsed;

    const showRoute = ref<boolean>(true);
    const reloadRoute = () => {
      showRoute.value = false;
      nextTick(() => {
        setTimeout(() => {
          showRoute.value = true;
        }, 500);
      });
    };
    provide('reloadRoute', reloadRoute);
    provide('showRoute', showRoute);

    return { collapsed };
  },
});
</script>

<style lang="scss" scoped>
.layout {
  overflow: hidden;
  height: 100vh;

  & .header {
    background-color: #fff;
    padding: 0;
  }

  & .container {
    padding: 0 10px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #f0f2f5;
  }

  & .container::-webkit-scrollbar {
    width: 6px;
  }

  & .container::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #c1c1c1;
  }

  & .container::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #ededed;
  }
}
</style>
<style lang="scss">
.layout {
  & .ant-layout-sider-children {
    overflow-y: auto;
    overflow-x: hidden;
  }

  & .ant-layout-sider-children::-webkit-scrollbar {
    width: 6px;
  }

  & .ant-layout-sider-children::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #535353;
  }

  & .ant-layout-sider-children::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #ededed;
  }
}
</style>
