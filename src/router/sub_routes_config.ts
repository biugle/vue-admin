/*
 * @Author: HxB
 * @Date: 2022-07-07 10:14:09
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-07-08 10:54:20
 * @Description: 子路由配置
 * @FilePath: \vue-admin\src\router\sub_routes_config.ts
 */
export const SUB_ROUTES_A: any[] = [
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
          parentMenuName: 'test',
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
          parentMenuName: 'test',
          title: 'TestB 页面',
        },
        icon: 'SmileFilled',
        component: () => import('@/pages/error_pages/404.vue'),
      },
      {
        path: '/test/c',
        name: 'test_c',
        meta: {
          parentMenuName: 'test',
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
                  parentMenuName: ['test', 'sub_menu_a', 'sub_menu_b'],
                  title: '最小子路由 Demo 页面',
                  keepAlive: true,
                  keepAliveName: 'Demo', // keepAlive 名称必须与组件名称一致
                },
                component: () => import('@/pages/test_pages/demo.vue'),
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
