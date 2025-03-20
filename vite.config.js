import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // 确保JSON文件被复制到构建目录
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  // 确保数据文件被作为静态资源处理
  publicDir: 'public',
  // 添加这个配置来复制src/data到构建目录
  experimental: {
    // 确保能复制src/data目录到构建目录
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js' && filename.includes('src/data/')) {
        return { relative: true };
      }
      return { relative: true };
    },
  },
})
