<!--
 * @Author: HxB
 * @Date: 2022-05-05 16:49:53
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-24 14:25:14
 * @Description: app 入口
 * @FilePath: \vue-admin\src\App.vue
-->
<template>
  <a-config-provider v-bind="antdConfig" :key="lang" :title="lang">
    <router-view v-slot="{ Component }" v-if="showPage">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'App',
  created() {
    // 同步持久化数据
    this.$store.commit('user/asyncUserInfo');
    this.$store.commit('tabs/asyncTabs');
    this.$store.commit('settings/asyncSettings');
  },
  beforeMount() {
    // 恢复上一次页面访问
    if (this.$route.redirectedFrom || this.$route.meta.hidden) {
      this.$router.push(this.$store.state.settings.lastRoute);
    }
  },
  computed: {
    ...mapState({
      lang: (state: any) => state.settings.lang,
    }),
  },
  data() {
    // https://www.antdv.com/components/config-provider-cn#API
    return {
      antdConfig: {
        locale: zhCN,
        input: {
          autocomplete: 'off',
        },
      },
      showPage: true, // 用于刷新主界面路由 可添加 loading 效果
    };
  },
  methods: {
    reloadPage() {
      this.showPage = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.showPage = true;
        }, 500);
      });
    },
  },
  provide() {
    return {
      reloadPage: this.reloadPage,
      showPage: this.showPage,
    };
  },
});
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
</style>
