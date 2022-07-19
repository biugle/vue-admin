<!-- <script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script> -->

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Test',
  props: {
    msg: {
      type: String,
      default: '测试页面',
    },
  },
  setup(props, context) {
    const count = ref(0);
    return { count };
  },
  // 注意组件一定要使用根元素包裹
});
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>

    <a-input style="margin-top: 10px" type="text" placeholder="Test Dynamic KeepAlive" />
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 5rem;
}
</style>
