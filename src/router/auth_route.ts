/*
 * @Author: HxB
 * @Date: 2022-05-07 17:46:53
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 15:56:54
 * @Description: 权限校验
 * @FilePath: \vue-admin\src\router\auth_route.ts
 */
import storage from 'store';
import type { Router } from 'vue-router';
import { whiteList } from '@/router';

const loginPath = '/login';

const defaultPath = '/';

export const authRoute = (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (storage.get('token')) {
      if (to.path === loginPath) {
        next({ path: defaultPath });
      } else {
        // 权限校验
        const userRoles = ['admin']; // 自己添加定义，任何方式都可以。
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!to.meta?.roles || to?.meta?.roles?.some((role: string) => userRoles.includes(role))) {
          next();
        } else {
          router.replace(storage.get('settings')?.lastRoute ?? '/');
        }
      }
    } else {
      if (whiteList.includes(to.path)) {
        next();
      } else {
        next({ path: loginPath, query: { redirect: to.fullPath } });
      }
    }
  });
};
