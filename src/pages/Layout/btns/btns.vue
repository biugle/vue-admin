<!--
 * @Author: HxB
 * @Date: 2022-07-07 16:57:08
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-08-29 18:27:01
 * @Description: 路由菜单切换按钮
 * @FilePath: \vue-admin\src\pages\Layout\btns\btns.vue
-->
<template>
  <div class="header-btns-view" v-if="routeKeys.length > 1">
    <a-button
      style="margin: 0 5px"
      type="primary"
      shape="round"
      v-for="routeKey in routeKeys"
      :key="routeKey"
      ghost
      @click="changeSubRoutes(routeKey)"
      :disabled="routeKey == activeRouteKey()"
    >
      {{ ROUTE_KEYS_NAME[routeKey] }}
    </a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, nextTick, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ROUTE_KEYS_NAME } from '@/router/sub_routes_config';
import { DEFAULT_ROUTE } from '@/router';

export default defineComponent({
  name: 'HeaderBtns',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const routeKeys = ref<string[]>(Object.keys(ROUTE_KEYS_NAME));
    const activeRouteKey = () => store.state.user.routeKey;
    const changeSubRoutes = (routeKey: string) => {
      store.commit('user/setRouteKey', routeKey);
      store.commit('tabs/clearTabs');
      router.push(DEFAULT_ROUTE).then(() => {
        store.commit('tabs/addTab', {
          fullPath: route.fullPath,
          path: route.path,
          name: route.name,
          keepAliveName: route?.meta?.keepAliveName ?? route.name,
          title: route.meta.title,
        });
        store.commit('tabs/storageTabs');
      });
    };
    return { routeKeys, activeRouteKey, ROUTE_KEYS_NAME, changeSubRoutes };
  },
});
</script>
<style lang="scss" scoped>
.header-btns-view {
  margin-left: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  align-content: space-evenly;
}
</style>
