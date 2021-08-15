import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  // 项目插件
  plugins: [vue()],
  // 基础配置
  base: '/',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 服务配置
  server: {
    port: 9527,
    https: false,
    open: true,
    proxy: {
      '/dev/api': {
        target: 'http://www.lwp.fun:7000',
        changeOrigin: true,
        rewrite: path => path.replace(/\/dev\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@border-color-base': '#dce3e8',
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    terserOptions: {
      compress: {
        // 生产环境去除console
        drop_console: true,
      },
    },
  },
})
