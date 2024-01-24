/*
 * @Author: HxB
 * @Date: 2022-05-05 16:49:53
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-08-23 18:25:01
 * @Description: vite 配置文件
 * @FilePath: \vue-admin\vite.config.ts
 */
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from 'vite-plugin-eslint';

// import.meta.env.VITE_REQUEST_BASE_URL

// eslint-disable-next-line no-undef
const getPath = (_path) => path.resolve(__dirname, _path);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    // envPrefix: 'VITE_', // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。 default: 'VITE_'
    base: './', // https://vitejs.cn/config/#base 公共基础路径
    build: {
      chunkSizeWarningLimit: 2048,
      target: 'modules',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'terser',
      terserOptions: {
        // 生产环境去除 console
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    publicDir: getPath('public'), // 静态资源服务的文件夹
    plugins: [
      eslint({
        fix: true,
      }),
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': getPath('src'),
      },
    },
    preview: {
      port: 9868,
    },
    server: {
      cors: true,
      open: true,
      hmr: true,
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://a.biugle.cn/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
  // https://antdv.com/docs/vue/customize-theme-cn
});
