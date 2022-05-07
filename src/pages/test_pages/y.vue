<!--
 * @Author: HxB
 * @Date: 2022-05-12 16:33:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 17:10:27
 * @Description: test Y
 * @FilePath: \vue-admin\src\pages\test_pages\y.vue
-->
<template>
  <test msg="TestY"></test>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Test from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'TestY',
  components: {
    Test,
  },
});
</script>
