/*
 * @Author: HxB
 * @Date: 2022-05-06 18:04:44
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-07 10:26:19
 * @Description: 主路由配置文件
 * @FilePath: \vue-admin\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import * as subRoutesConfig from './sub_routes_config';
import { authRoute } from './auth_route';

const Layout = () => import('@/pages/Layout/index.vue');

const defaultRoute = '/test/x';

export const routes: any[] = [
  {
    path: '/',
    name: 'Home',
    redirect: defaultRoute,
    component: () => Layout(),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/error_pages/403.vue'),
    meta: {
      title: '403',
      hidden: true,
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/pages/error_pages/500.vue'),
    meta: {
      title: '500',
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/error_pages/404.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function getRoutesConfig(routes: any[]) {
  routes.forEach((routeConfig: any) => {
    if (routeConfig.routes) {
      getRoutesConfig(routeConfig.routes);
    } else {
      router.addRoute('Home', routeConfig);
    }
  });
}

for (const subRoutesKey in subRoutesConfig) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getRoutesConfig(subRoutesConfig[subRoutesKey]);
}

authRoute(router);

export default router;

export const whiteList = ['/login', '/403', '/404', '/500'];
