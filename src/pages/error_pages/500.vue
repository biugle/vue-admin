<!--
 * @Author: HxB
 * @Date: 2022-05-06 18:17:55
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-11 15:44:09
 * @Description: 500
 * @FilePath: \vue-admin\src\pages\error_pages\500.vue
-->
<template>
  <error-page status="500" title="500 Internal Server Error." sub-title="对不起，服务器出错了！" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ErrorPage from '@/components/ErrorPage.vue';

export default defineComponent({
  name: '500',
  components: {
    ErrorPage,
  },
});
</script>
