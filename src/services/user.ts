/* eslint-disable indent */
/*
 * @Author: HxB
 * @Date: 2022-04-13 11:52:00
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-06-01 18:24:08
 * @Description: user service
 * @FilePath: \vue-admin\src\services\user.ts
 */
import XHttp from '@/utils/xhttp';

export function login(data: any) {
  return import.meta.env.MODE === 'development'
    ? new Promise(resolve => {
        resolve({
          code: 0,
          data: {
            token: 'token',
          },
        });
      })
    : XHttp.post('/login', data);
}
