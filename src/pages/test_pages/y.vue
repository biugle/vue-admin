<!--
 * @Author: HxB
 * @Date: 2022-05-12 16:33:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-08-30 15:43:18
 * @Description: test Y
 * @FilePath: \vue-admin\src\pages\test_pages\y.vue
-->
<template>
  <test msg="TestY"></test>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Test from '@/components/HelloWorld.vue';

let timer: any;
export default defineComponent({
  name: 'TestY',
  components: {
    Test,
  },
  activated() {
    // 在首次挂载、以及每次从缓存中被重新插入的时候调用
    if (!timer) {
      timer = setInterval(() => {
        console.log('activated');
      }, 1000);
    }
  },
  deactivated() {
    // 在从 DOM 上移除、进入缓存以及组件卸载时调用
    clearInterval(timer);
    timer = null;
  },
});
</script>
