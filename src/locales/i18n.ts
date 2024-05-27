/*
 * @Author: HxB
 * @Date: 2024-05-13 15:08:38
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-27 09:52:41
 * @Description: i18n 国际化支持-需自定义如何兼容切换语言后页面刷新
 * @FilePath: \vue-admin\src\locales\i18n.ts
 */

import { i18n } from 'js-xxx';
import zhCN from './zh-CN.json';
import enUs from './en-US.json';
import store from '@/store';

export const i18nVue = new i18n({
  defaultLang: 'zh-CN',
  resources: {
    'zh-CN': {
      key: 'zh-CN',
      desc: '简体中文',
      translation: zhCN,
    },
    'en-US': {
      key: 'en-US',
      desc: 'English',
      translation: enUs,
    },
  },
});

export const setLang = (lang) =>
  i18nVue.setLang(lang, () => {
    store.commit('settings/setSettings', {
      lang,
    });
  });

export const t$ = (key, obj?: any, newLang?: string) => i18nVue.t$(key, obj, newLang ?? store.state.settings.lang);
