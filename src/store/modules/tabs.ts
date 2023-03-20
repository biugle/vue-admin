/*
 * @Author: HxB
 * @Date: 2022-05-07 18:16:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-19 21:12:25
 * @Description: tabs state
 * @FilePath: \vue-admin\src\store\modules\tabs.ts
 */
import { getRandStr } from 'js-xxx';
import storage from 'store';
import router from '@/router';
// tabs 栏

const state: TabState = {
  tabList: [],
};

const tabs = {
  namespaced: true,

  state,

  mutations: {
    addTab(state: TabState, newTab: TabItem) {
      const tabList = state.tabList;
      let result = true;

      // 防止重复添加 与 防止已存在 tab 移动到最后
      const matchIndex: number = tabList.findIndex((tab) => tab.path === newTab.path || tab.name === newTab.name);
      if (matchIndex != -1) {
        tabList[matchIndex] = newTab;
        result = false;
      }

      // 防止添加不存在的路由
      if (!router.hasRoute(newTab.name || '')) {
        result = false;
      }

      result && tabList.push(newTab);
    },

    removeTab(state: TabState, path: string) {
      const tabList = state.tabList;
      const route = router.currentRoute.value;

      if (tabList.length <= 1) {
        return;
      }

      const matchIndex = tabList.findIndex((tab) => tab.path === path);

      // 如果删除的是当前路由
      if (route.path == path) {
        // 如果删除的是最后一个 tab，则将当前路由跳转到前一个 tab，否则跳转到后一个 tab 。
        router.push(tabList[tabList.length - 1 === matchIndex ? matchIndex - 1 : matchIndex + 1]['fullPath']);
      }

      tabList.splice(matchIndex, 1);
    },

    removeRight(state: TabState, index: number) {
      const tabList = state.tabList;
      const route = router.currentRoute.value;

      if (tabList.length <= 1 || tabList.length - 1 === index) {
        return;
      }

      const nowRouteIndex = tabList.findIndex((tab) => tab.path === route.path);

      // 如果删除包含当前路由，则删除后跳转到触发删除的 tab
      if (index < nowRouteIndex) {
        router.push(tabList[index]['fullPath']);
      }

      tabList.splice(index + 1, tabList.length - 1);
    },

    removeLeft(state: TabState, index: number) {
      const tabList = state.tabList;
      const route = router.currentRoute.value;

      if (tabList.length <= 1 || index === 0) {
        return;
      }

      const nowRouteIndex = tabList.findIndex((tab) => tab.path === route.path);

      // 如果删除包含当前路由，则删除后跳转到触发删除的 tab
      if (index > nowRouteIndex) {
        router.push(tabList[index]['fullPath']);
      }

      tabList.splice(0, index);
    },

    removeOther(state: TabState, index: number) {
      router.push(state.tabList[index]['fullPath']);
      state.tabList = [state.tabList[index]];
    },

    clearTabs(state: TabState) {
      state.tabList = [];
    },

    refreshTab(state: TabState, index: number) {
      const refreshTab: TabItem = state.tabList[index];
      state.tabList.splice(index, 1, refreshTab);
      router.replace({
        name: refreshTab.name,
        params: { refresh: getRandStr() },
      });
    },

    storageTabs(state: TabState) {
      storage.set('tabs', state.tabList);
    },

    asyncTabs(state: TabState) {
      state.tabList = storage.get('tabs') ?? [];
    },
  },
};

export default tabs;
export interface TabItem {
  title: string;
  path: string;
  fullPath: string;
  name?: string;
  icon?: string;
}
export type TabState = {
  tabList: TabItem[];
};
