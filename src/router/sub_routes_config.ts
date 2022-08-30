/*
 * @Author: HxB
 * @Date: 2022-07-07 10:14:09
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-08-30 15:06:34
 * @Description: 子路由配置
 * @FilePath: \vue-admin\src\router\sub_routes_config.ts
 */
interface RouteConfig {
  path?: string;
  name: string;
  component?: any;
  icon?: string;
  redirect?: string;
  children?: RouteConfig[];
  alias?: string | string[];
  beforeEnter?: (to: any, from: any, next: any) => void;
  props?: boolean | object | (() => object);
  sensitive?: boolean;
  strict?: boolean;
  meta?: {
    title?: string;
    hidden?: boolean;
    keepAlive?: boolean;
    defaultKeepAlive?: boolean;
    keepAliveName?: string;
    roles?: string[] | string;
    routes?: RouteConfig[];
    [propName: string]: any;
  };
  [propName: string]: any;
}

const defaultRoutes: RouteConfig[] = [
  {
    path: '/test/x',
    name: 'test_x',
    meta: {
      title: 'TestX 页面',
      keepAlive: true,
      roles: ['admin'],
      // hidden: true,
    },
    icon: 'HeartOutlined',
    component: () => import('@/pages/test_pages/x.vue'),
  },
];

export const SUB_ROUTES_A: RouteConfig[] = [
  ...defaultRoutes,
  {
    // path: "/test",
    name: 'test',
    meta: {
      title: 'Test 菜单',
    },
    icon: 'FolderViewOutlined',
    routes: [
      {
        path: '/test/a',
        name: 'test_a',
        meta: {
          title: 'TestA 页面',
          defaultKeepAlive: true, // 动态 keepAlive
          keepAliveName: '403', // keepAlive 名称必须与组件名称一致
        },
        icon: 'FontColorsOutlined',
        component: () => import('@/pages/error_pages/403.vue'),
        beforeEnter: (to: any, from: any, next: any) => {
          // 在 test_c 路由跳转过来时 需刷新 test_a 路由
          if (from.name == 'test_c') {
            to.meta.keepAlive = false;
          } else {
            to.meta.keepAlive = true;
          }
          next();
        },
      },
      {
        path: '/test/b',
        name: 'test_b',
        meta: {
          title: 'TestB 页面',
        },
        icon: 'SmileFilled',
        component: () => import('@/pages/error_pages/404.vue'),
      },
      {
        path: '/test/c',
        name: 'test_c',
        meta: {
          title: 'TestC 页面',
          keepAlive: true,
          keepAliveName: '500',
        },
        icon: 'SmileTwoTone',
        component: () => import('@/pages/error_pages/500.vue'),
      },
      {
        name: 'sub_menu_a',
        meta: {
          title: '多级菜单 MenuA',
        },
        // icon: 'PicRightOutlined',
        routes: [
          {
            name: 'sub_menu_b',
            meta: {
              title: '多级菜单 MenuB',
            },
            icon: 'PicLeftOutlined',
            routes: [
              {
                path: '/test/sub_menu_a/sub_menu_b/test_demo',
                name: 'test_demo',
                icon: 'HeatMapOutlined',
                meta: {
                  title: '最小子路由 Demo 页面',
                  keepAlive: true,
                  keepAliveName: 'Demo', // keepAlive 名称必须与组件名称一致
                },
                component: () => import('@/pages/test_pages/demo.vue'),
                // 若页面有多个 router-view，可以指定显示在哪个 router-view 中。
                // <router-view name="test_demo" />
                // components: { test_demo: TestDemo }
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/test/y',
    name: 'test_y',
    meta: {
      title: 'TestY 页面',
      keepAlive: true,
      keepAliveName: 'TestY',
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

export const SUB_ROUTES_B: RouteConfig[] = [
  ...defaultRoutes,
  {
    path: '/demo/x',
    name: 'DemoX',
    meta: {
      title: 'DemoX',
      roles: ['admin'],
    },
    component: () => import('@/pages/test_pages/x.vue'),
  },
  {
    path: '/demo/y',
    name: 'DemoY',
    meta: {
      title: 'DemoY',
      roles: ['admin'],
    },
    component: () => import('@/pages/test_pages/y.vue'),
  },
  {
    path: '/demo/z',
    name: 'DemoZ',
    meta: {
      title: 'DemoZ',
      roles: ['admin'],
    },
    component: () => import('@/pages/test_pages/z.vue'),
  },
];

export const ROUTE_KEYS_NAME: any = {
  SUB_ROUTES_A: '测试路由A',
  SUB_ROUTES_B: '测试路由B',
};
