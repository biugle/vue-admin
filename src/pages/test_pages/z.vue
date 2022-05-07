<!--
 * @Author: HxB
 * @Date: 2022-05-12 16:33:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 17:10:29
 * @Description: test Z
 * @FilePath: \vue-admin\src\pages\test_pages\z.vue
-->
<template>
  <test msg="TestZ"></test>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Test from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'TestZ',
  components: {
    Test,
  },
});
</script>
