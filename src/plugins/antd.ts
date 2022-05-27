/*
 * @Author: HxB
 * @Date: 2022-05-06 18:07:27
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 17:12:38
 * @Description: 按需动态导入 antd 组件
 * @FilePath: \vue-admin\src\plugins\antd.ts
 */
import type { App } from 'vue';
import 'ant-design-vue/dist/antd.min.css';
// import 'moment/dist/locale/zh-cn';

import { createVNode } from 'vue';
import * as Icons from '@ant-design/icons-vue';

const Icon = (props: { icon: string }) => {
  const { icon } = props;
  return createVNode(Icons[icon as keyof typeof Icons]);
};

import {
  Result,
  Button,
  ConfigProvider,
  Row,
  Col,
  Layout,
  Spin,
  Tabs,
  Dropdown,
  Avatar,
  Menu,
  Form,
  Input,
  Checkbox,
  message,
  notification,
} from 'ant-design-vue';

message.config({
  top: '50px',
  duration: 3,
  maxCount: 5,
  rtl: false,
});

notification.config({
  placement: 'topRight',
  duration: 5,
  maxCount: 3,
  rtl: true,
});

const antdComponents = [
  Row,
  Col,
  Layout,
  Tabs,
  Spin,
  Dropdown,
  Avatar,
  Menu,
  Form,
  Button,
  Input,
  Checkbox,
  Result,
  ConfigProvider,
];

// 应用组件
export const antd = {
  install: (app: App) => {
    // 图标
    app.component('Icon', Icon);

    // 循环应用
    antdComponents.forEach((com: any) => {
      app.use(com);
    });
    app.config.globalProperties.$message = message;
    app.config.globalProperties.$notification = notification;
  },
};

export { message, notification, Icon };