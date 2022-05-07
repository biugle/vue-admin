/*
 * @Author: HxB
 * @Date: 2022-05-09 16:35:35
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 16:28:10
 * @Description: 创建菜单列表
 * @FilePath: \vue-admin\src\pages\Layout\menu\menu_create.tsx
 */
import { Icon } from '@/plugins/antd';
import { defineComponent, Slots } from 'vue';
export default defineComponent({
  components: {},
  props: {
    router: {
      type: Object,
      required: true,
    },
  },
  render() {
    const menuSub = (router: any) => {
      const subSlots: Slots = {
        title: () => [<span>{router.name}</span>],
        icon: () => [<Icon icon={router.icon ?? 'FolderOpenOutlined'} />],
      };
      return (
        <a-sub-menu v-slots={subSlots} key={router.name}>
          {router.routes && router.routes.map((item: any) => menuCreate(item))}
        </a-sub-menu>
      );
    };

    const menuItem = (router: any) => {
      const itemSlots: Slots = {
        icon: () => [<Icon icon={router.icon ?? 'UnorderedListOutlined'} />],
      };
      return (
        <a-menu-item v-slots={itemSlots} key={router.name}>
          <router-link to={router.path}>{router.name}</router-link>
        </a-menu-item>
      );
    };

    const menuCreate = (router: any) => {
      if (router.routes && !router.meta.hidden) {
        return menuSub(router);
      } else if (!router.meta.hidden) {
        return menuItem(router);
      }
    };

    return menuCreate(this.router as any);
  },
});
