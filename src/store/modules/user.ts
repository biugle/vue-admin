/*
 * @Author: HxB
 * @Date: 2022-05-07 18:16:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-08 10:54:32
 * @Description: user state
 * @FilePath: \vue-admin\src\store\modules\user.ts
 */
import storage from 'store';
import { AllState } from '@/store';
import { ActionContext } from 'vuex';
import { login } from '@/services/user';
import * as ALL_SUB_ROUTES from '@/router/sub_routes_config';
import { catchPromise } from 'js-xxx';

// 处理用户登录、登出、个人信息、权限路由

export type UserState = {
  token: string;
  name: string;
  avatar: string;
  roles: string[];
  routes: any[];
  routeKey: string;
};

const state: UserState = {
  // 标识
  token: storage.get('token'),
  // 昵称
  name: '',
  // 头像
  avatar: '',
  // 角色(鉴权)
  roles: [],
  routes: [],
  routeKey: storage.get('routeKey') ?? 'SUB_ROUTES_A',
};

const user = {
  namespaced: true,

  state,

  mutations: {
    // 设置token
    setToken(state: UserState, token: string) {
      state.token = token;
    },

    setRouteKey(state: UserState, routeKey: string) {
      state.routeKey = routeKey;
      storage.set('routeKey', routeKey);
    },

    // 设置用户信息
    asyncUserInfo(state: UserState, info: UserState) {
      const { name, avatar, roles } = info ?? {};
      state.name = 'name';
      state.avatar = '';
      state.roles = ['admin'];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.routes = ALL_SUB_ROUTES[state.routeKey].filter((route: any) => {
        return !route?.meta?.roles || route?.meta?.roles?.some((role: string) => state.roles.includes(role));
      });
    },

    // 用户退出登录
    clearState(state: UserState) {
      storage.clearAll();
      // 为了重新加载用户信息及路由组
      state.token = '';
      state.name = '';
      state.avatar = '';
      state.roles = [];
      state.routes = [];
      state.routeKey = 'SUB_ROUTES_A';
    },
  },

  actions: {
    // 登录
    login(context: ActionContext<UserState, AllState>, data: any) {
      return catchPromise((resolve: any, reject: any) => {
        login(data).then((data: any) => {
          // alert(JSON.stringify(data));
          if (data?.code == 0) {
            storage.set('token', data?.data?.token);
            context.commit('setToken', data?.data?.token);
            resolve(data);
          } else {
            reject(data);
          }
          // console.log(localStorage.getItem("token"));
          // console.log(storage.get("token"));
        });
      });
    },

    // 退出登录
    logout(context: ActionContext<UserState, AllState>) {
      return new Promise((resolve, reject) => {
        // logout().then((e) => {
        context.commit('clearState');
        resolve('success');
        // });
      });
    },
  },
};

export default user;
