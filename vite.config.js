import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'




// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
  plugins: [
      VueRouter(),
      AutoImport({
          dts: true,
          dirs: [
                'src/composables',
                'src/stores',
              ],
          imports: [
              'vue',
              VueRouterAutoImports,
          ]
      }),
      Components({
          dts: true,
          dirs: [
                'src/components/svg',
          ]
      }),
      vue(),
  ],
})
