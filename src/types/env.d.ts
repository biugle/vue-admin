// eslint-disable-next-line vue/comment-directive
// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />;

interface ImportMetaEnv {
  readonly VITE_REQUEST_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'js-xcall';
