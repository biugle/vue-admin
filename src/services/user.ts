/* eslint-disable indent */
/*
 * @Author: HxB
 * @Date: 2022-05-07 11:52:00
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-09-18 17:25:46
 * @Description: user service
 * @FilePath: \vue-admin\src\services\user.ts
 */
import XHttp from '@/utils/xhttp';

export function login(data: any) {
  // return import.meta.env.MODE === 'development'
  //   ?
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: {
        token: 'token',
      },
    });
  });
  // : XHttp.post('/login', data);
}
