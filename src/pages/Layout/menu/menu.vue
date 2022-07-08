<!--
 * @Author: HxB
 * @Date: 2022-05-05 16:49:53
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-08 15:10:29
 * @Description: 菜单组件
 * @FilePath: \vue-admin\src\pages\Layout\menu\menu.vue
-->
<template>
  <div>
    <div class="menu-logo">
      <div class="menu-logo-icon">
        <img src="@/static/img/logo.png" />
      </div>
      <span v-show="!collapsed">通用管理后台</span>
    </div>
    <a-menu
      triggerSubMenuAction="click"
      theme="dark"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      ref="menu"
    >
      <menu-item :router="item" v-for="item in menuRouter" :key="item.name" />
    </a-menu>
  </div>
</template>
<script lang="ts">
import MenuItem from './menu_create';
import { useRoute } from 'vue-router';
import { mapState, useStore } from 'vuex';
import { defineComponent, ref, watch, onBeforeMount, nextTick } from 'vue';
import { ROUTE_MENU_CONFIGS } from '@/router';
export default defineComponent({
  name: 'LayoutMenu',
  computed: {
    ...mapState({
      menuRouter: (state: any) => state.user.routes,
    }),
  },
  components: {
    MenuItem,
  },
  props: {
    collapsed: {
      required: true,
      type: Boolean,
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);

    const setMenuKey = () => {
      if (!route.meta.hidden) {
        selectedKeys.value = [route.name as string];
        openKeys.value = ROUTE_MENU_CONFIGS[route.name as string].openKeys as string[];
        // route.matched.forEach(item => {
        //   console.log(item);
        // });
      }
    };

    onBeforeMount(setMenuKey);

    watch(route, setMenuKey);

    // var timer: any;
    // const openChange = ($props: any) => {
    //   // 自动关闭菜单栏 :openChange="openChange($props)"
    //   clearTimeout(timer);
    //   if ($props.collapsed) {
    //     timer = setTimeout(() => {
    //       alert('关闭菜单栏'); // 改用 triggerSubMenuAction 解决
    //       const $subMenu = document.querySelector('.ant-menu-submenu.ant-menu-submenu-popup');
    //       if (!$subMenu?.getAttribute('style')?.includes('none')) {
    //         $subMenu?.dispatchEvent(new MouseEvent('mouseleave'));
    //       }
    //     }, 5000)
    //   }
    // };

    return { selectedKeys, openKeys };
  },
});
</script>
<style lang="scss" scoped>
.d-none {
  display: none;
}

.menu-logo {
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  & .menu-logo-icon {
    width: 32px;
    margin-right: 8px;

    img {
      display: block;
      width: 100%;
    }
  }

  & span {
    display: inline-block;
    font-size: 20px;
    color: #fff;
  }
}
</style>
