<!--
 * @Author: HxB
 * @Date: 2022-05-12 16:33:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-24 14:22:41
 * @Description: demo
 * @FilePath: \vue-admin\src\pages\test_pages\demo.vue
-->
<template>
  <div>
    <test msg="Demo"></test>
    <h5>{{ t$('你好世界') }}</h5>
    <h5>{{ t$('语言 ${lang}', { lang }) }}</h5>
    <h5>{{ t$('不存在') }}</h5>
    <button @click="setLang('en-US')">设置英语</button>
    <button @click="setLang('zh-CN')">设置中文</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import Test from '@/components/HelloWorld.vue';
import { t$, setLang } from '@/locales/i18n';

export default defineComponent({
  name: 'Demo',
  components: {
    Test,
  },
  computed: {
    ...mapState({
      lang: (state: any) => state.settings.lang,
    }),
  },
  setup() {
    return {
      setLang,
      t$,
    };
  },
});
</script>
