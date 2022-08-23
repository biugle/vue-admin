/* eslint-disable indent */
/*
 * @Author: HxB
 * @Date: 2022-05-07 11:52:00
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-08-23 18:27:18
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
