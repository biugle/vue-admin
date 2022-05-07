<!--
 * @Author: HxB
 * @Date: 2022-05-06 18:17:55
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 17:11:32
 * @Description: 403
 * @FilePath: \vue-admin\src\pages\error_pages\403.vue
-->
<template>
  <error-page status="403" title="403 Forbidden." sub-title="对不起，您没有权限访问该页面！" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ErrorPage from '@/components/ErrorPage.vue';

export default defineComponent({
  name: '403',
  components: {
    ErrorPage,
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
});
</script>
