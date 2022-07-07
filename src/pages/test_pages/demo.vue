<!--
 * @Author: HxB
 * @Date: 2022-05-12 16:33:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-07 11:06:42
 * @Description: demo
 * @FilePath: \vue-admin\src\pages\test_pages\demo.vue
-->
<template>
  <test msg="Demo"></test>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Test from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'Demo',
  components: {
    Test,
  },
});
</script>
