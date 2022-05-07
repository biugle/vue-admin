/*
 * @Author: HxB
 * @Date: 2022-05-05 16:49:53
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 16:24:13
 * @Description: app 主文件
 * @FilePath: \vue-admin\src\main.ts
 */
import { createApp } from 'vue';
import '@/static/css/reset.css';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { antd } from '@/plugins/antd';

const app = createApp(App);

// 使用 antd
app.use(antd);

// 使用 vuex
app.use(store);

// 使用 router
app.use(router);

router.isReady().then(() => app.mount('#app'));
