import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      // Указываем точки входа для каждой страницы
      input: {
        main: path.resolve(__dirname, 'index.html'), // Главная страница
        catalog: path.resolve(__dirname, 'stores/index.html'), // Страница каталога магазинов
        // external: ['contentful'], // Исключаем contentful из сборки
      },
    },
  },
});