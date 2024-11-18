import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { join, resolve } from "path";
import fs from 'fs';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": join(__dirname, "src")
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/vars.scss" as *;`
      },
    },
  },
  define: { "process.env": {} },
  server: {
    host: 'testdomain.test', // Настраиваем хост
    port: 443, // Порт, который хотите использовать
    https: {
      key: fs.readFileSync(resolve(__dirname, './cert/testdomain.test-key.pem')),
      cert: fs.readFileSync(resolve(__dirname, './cert/testdomain.test.pem')),
    }
  }
})
