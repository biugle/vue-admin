/*
 * @Author: HxB
 * @Date: 2022-05-07 14:22:43
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-09 17:30:50
 * @Description: 补充全局 message 和 notification
 * @FilePath: \vue-admin\src\types\global.d.ts
 */
import type { message, notification } from 'ant-design-vue';
// import { ComponentCustomProperties } from 'vue';
import type { Store } from 'vuex';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof message;
    $notification: typeof notification;
    $store: Store;
  }
}
