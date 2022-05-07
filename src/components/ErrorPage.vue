<!--
 * @Author: HxB
 * @Date: 2022-05-07 15:48:46
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 17:10:33
 * @Description: 错误组件
 * @FilePath: \vue-admin\src\components\ErrorPage.vue
-->
<template>
  <a-result :status="status" :title="title" :subTitle="subTitle">
    <template #extra>
      <a-button type="ghost" danger @click="back">
        <Icon icon="HomeOutlined" />
        返回主页
      </a-button>
      <a-input style="margin-top: 10px" type="text" placeholder="Test Dynamic KeepAlive" />
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const PROPS_TYPE = {
  status: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
};

export default defineComponent({
  name: 'ErrorPage',
  props: PROPS_TYPE,
  setup(props, context) {
    const router = useRouter();

    const back = () => {
      router.replace('/');
    };

    return { back };
  },
});
</script>
