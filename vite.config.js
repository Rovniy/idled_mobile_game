import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { join } from "path";

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  define: { "process.env": {} },
})