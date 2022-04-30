import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePublish from 'vite-plugin-publish'
import viteCompression from 'vite-plugin-compression'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    // 项目插件
    plugins: [
      vue(),
      vueJsx(),
      ViteComponents({
        customComponentResolvers: [AntDesignVueResolver()],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 1025,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      vitePublish({
        enable: true,
        ftp: {
          host: 'xxx.xxx.xxx.xxx',
          port: 21,
          websiteDir: 'admin.lwp.fun',
          user: 'xxxxxxx',
          password: 'xxxxx',
        },
        oss: {
          accessKeyId: 'xxxxx',
          accessKeySecret: 'xxxxxxxx',
          bucket: 'cdn200',
          region: 'oss-cn-hangzhou',
        },
      }),
    ],
    // 基础配置
    base: mode === 'development' ? '/' : 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/next-admin/',
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
      brotliSize: false,
      sourcemap: false,
      terserOptions: {
        compress: {
          // 生产环境去除console及debug
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  }
})


