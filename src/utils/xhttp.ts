/*
 * @Author: HxB
 * @Date: 2022-04-13 11:18:13
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-06-01 18:25:16
 * @Description: 全局请求工具
 * @FilePath: \vue-admin\src\utils\xhttp.ts
 */
import XHttp from 'js-xhttp';
import { message, notification } from '@/plugins/antd';

let hide: any;

// 可以直接使用 XHttp，也可以全局初始化一个实例即可，所有配置如下，均为可选参数。也可以直接 XHttp.create(); 初始化。
const $http = XHttp.create(
  {
    timeout: 5000, // 超时时间 default: 30000
    cancelDuplicatedRequest: true, // 是否取消重复请求 default: true
    // retryConfig: {
    //   // 重试配置
    //   retry: 1, // 次数
    //   delay: 1000, // 每次重试的基础延迟时间
    // },
    requestHandler: (config: any) => {
      hide = message.loading('正在请求数据...');
      console.log('requestHandler', config); // 请求前的拦截处理 可自行打印日志log
      // console.log(config?.cancelRequest); // 请求取消函数
    },
    responseHandler: (response: any) => {
      // 可在此处统一处理返回数据提示
      if (response.data.code != 0) {
        message.error(response.data.msg);
      }
    },
    errorHandler: (error: any) => {
      // 统一错误处理
      if (!XHttp.isCancel(error) && !error.message?.includes('custom-error')) {
        notification.error({
          message: `${error.status}-${error.statusText}`,
          description: `发生错误了 ${error.data?.msg ?? error?.data?.message ?? '未知错误'}`,
        });
      }
      // return Promise.reject(error); // 是否传递错误到外层 不传递则可以免去每次请求去自定义错误处理
      console.log('errorHandler', error); // 错误处理 可自行打印日志log
    },
    setRequestHeaders: (config: any) => {
      // 设置请求头 可以添加 token 等，也可以通过 $http.setAuthToken 来处理
      return config; // 返回配置对象，可修改请求头。必须返回一个请求头对象，否则会抛出错误。
    },
    requestFinally: () => {
      hide();
      console.log('requestFinally Hooks'); // 请求完成时的回调，无论结果如何。
    },
  },
  // axios 配置
  {
    baseURL: import.meta.env.VITE_REQUEST_BASE_URL, // 根据环境添加 baseURL
    validateStatus: (status: number) => {
      // XHttp 默认的 status 校验规则是全部返回 true
      // 返回 true 则表示成功(resolve)，否则表示失败(reject)。 可以根据 status 自定义
      return status >= 200 && status < 300;
    },
  },
);

export default $http;
// 也可直接导出常用的方法 get post put patch delete request 等，也可以导出原 axios 对象、工具类等等。
