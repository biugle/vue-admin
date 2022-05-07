<!--
 * @Author: HxB
 * @Date: 2022-05-06 18:17:55
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 17:12:43
 * @Description: 404
 * @FilePath: \vue-admin\src\pages\error_pages\404.vue
-->
<template>
  <error-page status="404" title="404 Not Found." sub-title="对不起，页面找不到啦！" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ErrorPage from '@/components/ErrorPage.vue';

export default defineComponent({
  name: '404',
  components: {
    ErrorPage,
  },
});
</script>
