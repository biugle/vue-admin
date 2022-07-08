<!--
 * @Author: HxB
 * @Date: 2022-07-07 16:57:08
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-08 10:26:09
 * @Description: 面包屑导航
 * @FilePath: \vue-admin\src\pages\Layout\nav\nav.vue
-->
<template>
  <div style="margin: 5px 5px 0">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1 || !route.path">
          <Icon :icon="route.icon" />
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="`/${paths.join('/')}`">
          <Icon :icon="route.icon" />
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { ROUTE_MENU_CONFIG } from '@/router';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LayoutNav',
  setup() {
    const store = useStore();
    const route = useRoute();

    const routes = ref(ROUTE_MENU_CONFIG[store.state.user.routeKey][route.name as string].breadcrumbRoutes);

    watch(route, to => {
      routes.value = ROUTE_MENU_CONFIG[store.state.user.routeKey][to.name as string].breadcrumbRoutes;
    });

    return {
      routes,
    };
  },
});
</script>
<style lang="scss">
.ant-breadcrumb {
  cursor: pointer;
}
.ant-breadcrumb > span:last-child,
.ant-breadcrumb > span:last-child a {
  font-weight: bold !important;
}
.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
  font-weight: bold !important;
}
</style>
