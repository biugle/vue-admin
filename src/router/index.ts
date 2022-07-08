/* eslint-disable indent */
/*
 * @Author: HxB
 * @Date: 2022-05-06 18:04:44
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-08 17:32:40
 * @Description: 主路由配置文件
 * @FilePath: \vue-admin\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import * as subRoutesConfig from './sub_routes_config';
import { authRoute } from './auth_route';

const Layout = () => import('@/pages/Layout/index.vue');

const defaultRoute = '/test/x';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: defaultRoute,
    component: () => Layout(),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/login',
    name: 'login',
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

interface BreadcrumbRoute {
  path: string;
  breadcrumbName: string;
  icon: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
    icon: string;
  }>;
}
const ROUTE_MENU_CONFIG_ALL_OBJ: {
  [propName: string]: {
    [propName: string]: {
      path: string;
      title: string;
      name: string;
      openKeys: string[];
      breadcrumbRoutes: BreadcrumbRoute[];
      [propName: string]: any;
    };
  };
} = {};
function getRoutesConfig(
  subRoutesKey: string,
  routes: any[],
  openKeys: string[] = [],
  breadcrumbRoutes: BreadcrumbRoute[] = [{ path: '/', breadcrumbName: '首页', icon: 'HomeOutlined' }],
): void {
  if (!ROUTE_MENU_CONFIG_ALL_OBJ[subRoutesKey]) {
    ROUTE_MENU_CONFIG_ALL_OBJ[subRoutesKey] = {};
  }
  routes.forEach((routeConfig: any) => {
    if (routeConfig.routes) {
      getRoutesConfig(
        subRoutesKey,
        routeConfig.routes,
        openKeys.length == 0 ? [routeConfig.name] : [...openKeys, routeConfig.name],
        [
          ...breadcrumbRoutes,
          {
            path: routeConfig.path,
            breadcrumbName: routeConfig.meta.title,
            icon: routeConfig.icon ?? 'FolderOpenOutlined',
            children:
              routeConfig.routes.length === 1
                ? undefined
                : routeConfig.routes.map((childRoute: any) => {
                    return {
                      path: childRoute.path,
                      breadcrumbName: childRoute.meta.title,
                      icon: childRoute.icon ?? 'UnorderedListOutlined',
                    };
                  }),
          },
        ],
      );
    } else {
      ROUTE_MENU_CONFIG_ALL_OBJ[subRoutesKey][routeConfig.name] = {
        ...routeConfig,
        path: routeConfig.path,
        title: routeConfig.meta.title,
        name: routeConfig.name,
        openKeys: openKeys,
        breadcrumbRoutes: [
          ...breadcrumbRoutes,
          {
            path: routeConfig.path,
            breadcrumbName: routeConfig.meta.title,
            icon: routeConfig.icon ?? 'UnorderedListOutlined',
          },
        ],
      };
      router.addRoute('home', routeConfig);
    }
  });
}
for (const subRoutesKey in subRoutesConfig) {
  if ('ROUTE_KEYS_NAME' == subRoutesKey) {
    continue;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getRoutesConfig(subRoutesKey, subRoutesConfig[subRoutesKey]);
}

authRoute(router);

export default router;
export const whiteList: string[] = ['/login', '/403', '/404', '/500'];
export const DEFAULT_ROUTE: string = defaultRoute;
export const ROUTE_MENU_CONFIGS = Object.keys(ROUTE_MENU_CONFIG_ALL_OBJ).reduce((configs: any, key: string) => {
  return { ...configs, ...ROUTE_MENU_CONFIG_ALL_OBJ[key] };
}, {});
