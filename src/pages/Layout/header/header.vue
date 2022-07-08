<template>
  <div class="layout-header">
    <div class="header-left">
      <Icon icon="MenuUnfoldOutlined" v-if="collapsed" class="trigger" @click="collapsedChange(!collapsed)" />
      <Icon icon="MenuFoldOutlined" v-else class="trigger" @click="collapsedChange(!collapsed)" />
      <header-btns />
    </div>
    <div class="header-right">
      <a-button type="ghost" shape="circle" :loading="!showRoute" @click="reloadRoute">
        <template #icon>
          <Icon icon="RedoOutlined" />
        </template>
      </a-button>
      <a-dropdown :trigger="['click']">
        <!-- <a-dropdown :trigger="['click', 'hover']">  -->
        <div class="header-avatar">
          <a-avatar>
            <template #icon>
              <img :src="avatar" v-if="avatar.length > 0" />
              <img src="@/static/img/icon.png" v-else />
            </template>
          </a-avatar>
          <div class="header-avatar-name">{{ name.length > 0 ? name : 'unknown' }}</div>
        </div>
        <template #overlay>
          <a-menu triggerSubMenuAction="click">
            <a-menu-item key="logout" @click="logout()">
              <template #icon>
                <Icon icon="PoweroffOutlined" />
              </template>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { mapState, useStore } from 'vuex';
import {
  defineComponent,
  watch,
  computed,
  onBeforeMount,
  inject,
  ComponentInternalInstance,
  getCurrentInstance,
} from 'vue';
import HeaderBtns from '../btns/btns.vue';

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    HeaderBtns,
  },
  computed: {
    ...mapState({
      name: (state: any) => state.user.name,
      avatar: (state: any) => state.user.avatar,
    }),
  },
  // inject: ['reloadRoute', 'showRoute'],
  emits: ['update:collapsed'],
  props: {
    collapsed: {
      required: true,
      type: Boolean,
    },
  },
  setup() {
    const store = useStore();

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const collapsedChange = (collapsed: boolean) => {
      proxy?.$emit('update:collapsed', collapsed);
      store.commit('settings/setSettings', {
        collapsed,
      });
    };
    // 退出登录
    const logout = () => {
      store.dispatch('user/logout').then((msg: string) => {
        proxy?.$message.success(msg);
        // router.push({ name: 'Login' });
        router.go(0);
      });
    };

    const showRoute: boolean | undefined = inject<boolean>('showRoute');
    // eslint-disable-next-line @typescript-eslint/ban-types
    const reloadRoute: Function | undefined = inject<Function>('reloadRoute');

    return { logout, showRoute, reloadRoute, collapsedChange };
  },
});
</script>
<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  font-size: 20px;

  & .header-left {
    display: flex;
    align-items: center;
    flex-grow: 1;

    & .group-tabs {
      width: 500px;
      margin-left: 22px;
      margin-right: 22px;
      flex-grow: 1;
    }
  }

  & .header-right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;

    & .header-avatar {
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;

      & .header-avatar-name {
        margin-left: 6px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
}
</style>
<style lang="scss">
.layout-header {
  & .header-left {
    & .ant-tabs-bar {
      margin: 0;
      border: none;
    }
  }
}
</style>
