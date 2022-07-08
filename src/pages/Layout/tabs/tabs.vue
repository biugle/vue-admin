<!--
 * @Author: HxB
 * @Date: 2022-05-05 16:49:53
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-08 16:21:57
 * @Description: 标签页组件
 * @FilePath: \vue-admin\src\pages\Layout\tabs\tabs.vue
-->
<template>
  <div style="width: 100%; height: 100%">
    <a-tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      :tabBarGutter="3"
      @tabClick="jump"
      @edit="removeTab"
      hide-add
      class="tabs-view"
      :class="{ 'only-child': onlyChild }"
    >
      <a-tab-pane :key="item.path" v-for="(item, index) in tabList">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <div style="display: inline-block">{{ item.title }}</div>
            <template #overlay>
              <a-menu @click="condition(item, index, $event)">
                <a-menu-item key="refresh">刷新标签</a-menu-item>
                <a-menu-item key="current">删除标签</a-menu-item>
                <a-menu-item key="right">关闭右侧</a-menu-item>
                <a-menu-item key="left">关闭左侧</a-menu-item>
                <a-menu-item key="other">关闭其他</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
    </a-tabs>
    <div class="main-container">
      <div class="loading" v-if="!showRoute">
        <a-spin tip="Loading..." :spinning="!showRoute" size="large"></a-spin>
      </div>
      <router-view v-slot="{ Component }" v-if="showRoute">
        <transition name="fade" mode="out-in">
          <keep-alive :max="20" :include="includeList">
            <component :is="Component" :key="$route.params.refresh" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { mapState, useStore } from 'vuex';
import { TabItem } from '@/store/modules/tabs';
import {
  defineComponent,
  watch,
  onBeforeMount,
  ref,
  inject,
  nextTick,
  provide,
  onBeforeUpdate,
  getCurrentInstance,
  ComponentInternalInstance,
} from 'vue';
import {
  useRoute,
  useRouter,
  RouteLocationNormalizedLoaded,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from 'vue-router';
import { DEFAULT_ROUTE } from '@/router';

export default defineComponent({
  name: 'LayoutTabs',
  computed: {
    ...mapState({
      tabList: (state: any) => state.tabs.tabList as TabItem[],
      includeList: (state: any) => state.keepAlive.includeList,
    }),
  },
  setup() {
    // 激活的tab
    let activeKey = ref<string>();

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    // 添加tab方法
    const addTab = (data: RouteLocationNormalizedLoaded) => {
      store.commit('tabs/addTab', {
        fullPath: data.fullPath,
        path: data.path,
        name: data.name,
        title: data.meta.title,
      });
    };

    // 设置路由缓存(白)名单方法
    const setKeepAlive = (data: RouteLocationNormalizedLoaded) => {
      const routeName: string = (data.meta.keepAliveName ?? data.name) as string; // keep-alive include 中的名称必须与组件名称相同
      if (data.meta.keepAlive) {
        store.commit('keepAlive/addKeepAlive', routeName);
      } else {
        store.commit('keepAlive/removeKeepAlive', routeName);
      }
    };

    watch(route, to => {
      if (!to.meta.hidden) {
        addTab(to);
        setKeepAlive(to);
        activeKey.value = to.path;
        store.commit('settings/setSettings', {
          lastRoute: to.fullPath,
        });
      }
      checkTabs();
    });

    onBeforeRouteUpdate((to, from, next) => {
      // 动态 keepAlive 功能补丁，方便实现根据路由变化动态更新 keepAlive 名单。
      if (!from.meta.hidden) {
        if (from.meta.defaultKeepAlive != undefined) {
          from.meta.keepAlive = from.meta.defaultKeepAlive;
        }
        setKeepAlive(from);
      }
      next();
    });

    onBeforeMount(() => {
      addTab(route);
      setKeepAlive(route);
      activeKey.value = route.path;
      store.commit('settings/setSettings', {
        lastRoute: route.fullPath,
      });
      checkTabs();
    });

    const jump = (targetKey: string) => {
      if (route.path !== targetKey) {
        let jumpRoute: TabItem = store.state.tabs.tabList.find((tab: any) => tab.path === targetKey);
        router.push(jumpRoute.fullPath);
      }
    };

    const removeTab = (targetKey: string, antdAction: string) => {
      if (antdAction === 'remove') {
        store.commit('tabs/removeTab', targetKey);
      }
    };

    const condition = (tab: TabItem, index: number, item: any) => {
      switch (item.key) {
        case 'refresh':
          store.commit('tabs/refreshTab', index);
          break;
        case 'current':
          store.commit('tabs/removeTab', tab.path);
          break;
        case 'right':
          store.commit('tabs/removeRight', index);
          break;
        case 'left':
          store.commit('tabs/removeLeft', index);
          break;
        case 'other':
          store.commit('tabs/removeOther', index);
          break;
      }
    };

    const showRoute: boolean | undefined = inject<boolean>('showRoute');
    // const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    // proxy?.$forceUpdate();

    const onlyChild = ref<boolean>(false);

    watch(store.state.tabs.tabList, tabList => {
      checkTabs();
    });

    const checkTabs = () => {
      nextTick(() => {
        // let result: boolean = document.querySelectorAll('.tabs-view .ant-tabs-tab').length === 1;
        // onlyChild.value = result;
        onlyChild.value = store.state.tabs.tabList.length === 1;
        store.commit('tabs/storageTabs');
      });
    };

    return { activeKey, jump, removeTab, condition, showRoute, onlyChild };
  },
});
</script>
<style lang="scss" scoped>
.main-container {
  background-color: #fff;
  width: 100%;
  height: 100%;
  min-height: 280px;
  overflow: hidden;
}

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="scss">
.tabs-view {
  z-index: 98;
  padding: 5px 0;
  top: 27px;
  position: sticky;
  background: #f0f2f5;

  &.only-child {
    .ant-tabs-tab-remove {
      display: none !important;
    }

    & .ant-dropdown-trigger {
      padding-right: 10px !important;
    }
  }

  & .ant-tabs-tab {
    user-select: none;

    & .ant-dropdown-trigger {
      padding-left: 10px;
    }
  }

  & .ant-tabs-ink-bar {
    visibility: visible !important;
  }

  & .ant-tabs-nav {
    margin-bottom: 0px;
  }

  & .ant-tabs-tab-active {
    font-weight: normal;
    border-bottom: 1px solid #f0f0f0 !important;
  }
}
</style>
