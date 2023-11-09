import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    VueRouter(),
    AutoImport({
      dts: true,
      dirs: ['src/composables', 'src/stores'],
      imports: ['vue', VueRouterAutoImports],
    }),
    Components({
      dts: true,
      dirs: ['src/components/svg'],
    }),
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    // this is a workaround for dot in url
    pluginRewriteAll(),
  ],
})
