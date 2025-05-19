import { defineConfig } from 'vite';
import path from 'path';
import { qrcode } from 'vite-plugin-qrcode'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig({
  plugins: [qrcode(), ViteMinifyPlugin({})],
  server: {
    port: 777
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      // Указываем точки входа для каждой страницы
      input: {
        main: path.resolve(__dirname, 'index.html'), // Главная страница
        catalog: path.resolve(__dirname, 'stores/index.html'), // Страница каталога магазинов
        main_en: path.resolve(__dirname, 'en/index.html'), // Английская Главная страница
        catalog_en: path.resolve(__dirname, 'en/stores/index.html'), // Английская Страница каталога магазинов
        // external: ['contentful'], // Исключаем contentful из сборки
      },
    },
  },
});