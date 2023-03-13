import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({template: { transformAssetUrls }}), vueJsx(), VueI18nPlugin({
    include: resolve(
      dirname(fileURLToPath(import.meta.url)),
      './src/i18n/locales/**'
    ),
  }), quasar({ sassVariables: 'src/quasar-variables.sass' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
