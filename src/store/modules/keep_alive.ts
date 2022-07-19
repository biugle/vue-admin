/*
 * @Author: HxB
 * @Date: 2022-05-07 18:16:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 17:03:53
 * @Description: keep-alive state
 * @FilePath: \vue-admin\src\store\modules\keep_alive.ts
 */

const state: keepAliveState = {
  // 需缓存路由名称
  includeList: [],
};

const keepAlive = {
  namespaced: true,

  state,

  mutations: {
    addKeepAlive(state: keepAliveState, routeName: string) {
      if (routeName && !state.includeList.includes(routeName)) {
        state.includeList.push(routeName);
      }
    },
    removeKeepAlive(state: keepAliveState, routeName: string) {
      if (routeName && state.includeList.includes(routeName)) {
        state.includeList.splice(state.includeList.indexOf(routeName), 1);
      }
    },
  },
};

export default keepAlive;
// 路由缓存(白)名单
export type keepAliveState = {
  includeList: string[];
};
