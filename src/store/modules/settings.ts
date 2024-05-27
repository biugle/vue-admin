/*
 * @Author: HxB
 * @Date: 2022-05-07 18:16:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-27 09:53:20
 * @Description: 设置 state
 * @FilePath: \vue-admin\src\store\modules\settings.ts
 */
import storage from 'store';
import { i18nVue } from '@/locales/i18n';

// 处理全局设置持久化

const defaultSettings = {
  collapsed: false,
  lastRoute: '/',
  lang: i18nVue.getLang(),
};

const state = Object.assign(defaultSettings, storage.get('settings') ?? {});

const settings = {
  namespaced: true,

  state,

  mutations: {
    // 设置
    setSettings(state: any, setting: any) {
      for (const key in setting) {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
          state[key] = setting[key];
        }
      }
      storage.set('settings', state);
    },

    asyncSettings(state: any) {
      const newState = Object.assign(defaultSettings, storage.get('settings') ?? {});
      for (const key in newState) {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
          state[key] = newState[key];
        }
      }
    },
  },
};

export default settings;
