/*
 * @Author: HxB
 * @Date: 2022-05-06 18:04:44
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-06-01 18:30:43
 * @Description: 路由配置文件
 * @FilePath: \vue-admin\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
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

export const SUB_ROUTES: any[] = [
  {
    path: '/test/x',
    name: 'TestX',
    meta: {
      title: 'TestX',
      keepAlive: true,
      roles: ['admin'],
      // hidden: true,
    },
    icon: 'HeartOutlined',
    component: () => import('@/pages/test_pages/x.vue'),
  },
  {
    // path: "/test",
    name: 'Test',
    meta: {
      title: 'Test',
    },
    icon: 'FolderViewOutlined',
    routes: [
      {
        path: '/test/a',
        name: 'TestA',
        meta: {
          parentMenuName: 'Test',
          title: 'TestA',
          defaultKeepAlive: true, // 动态 keepAlive
          keepAliveName: '403', // keepAlive 名称必须与组件名称一致
        },
        icon: 'FontColorsOutlined',
        component: () => import('@/pages/error_pages/403.vue'),
        beforeEnter: (to: any, from: any, next: any) => {
          // 在 TestC 路由跳转过来时 需刷新 TestA 路由
          if (from.name == 'TestC') {
            to.meta.keepAlive = false;
          } else {
            to.meta.keepAlive = true;
          }
          next();
        },
      },
      {
        path: '/test/b',
        name: 'TestB',
        meta: {
          parentMenuName: 'Test',
          title: 'TestB',
        },
        icon: 'SmileFilled',
        component: () => import('@/pages/error_pages/404.vue'),
      },
      {
        path: '/test/c',
        name: 'TestC',
        meta: {
          parentMenuName: 'Test',
          title: 'TestC',
          keepAlive: true,
          keepAliveName: '500',
        },
        icon: 'SmileTwoTone',
        component: () => import('@/pages/error_pages/500.vue'),
      },
    ],
  },
  {
    path: '/test/y',
    name: 'TestY',
    meta: {
      title: 'TestY',
    },
    component: () => import('@/pages/test_pages/y.vue'),
  },
  {
    path: '/test/z',
    name: 'TestZ',
    meta: {
      title: 'TestZ',
      roles: ['admin-pro'],
    },
    component: () => import('@/pages/test_pages/z.vue'),
  },
];

SUB_ROUTES.forEach((routeConfig: any) => {
  routeConfig.routes
    ? routeConfig.routes.forEach((subRoute: any) => router.addRoute('Home', subRoute))
    : router.addRoute('Home', routeConfig);
});

authRoute(router);

export default router;

export const whiteList = ['/login', '/403', '/404', '/500'];
