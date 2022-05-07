<!--
 * @Author: HxB
 * @Date: 2022-05-12 16:33:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 17:10:23
 * @Description: test X
 * @FilePath: \vue-admin\src\pages\test_pages\x.vue
-->
<template>
  <test msg="TestX"></test>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Test from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'TestX',
  components: {
    Test,
  },
});
</script>
