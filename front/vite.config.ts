import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
      resolvers: [NaiveUiResolver()],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __APP_BUILD_TIME__: JSON.stringify(new Date().toLocaleString())
  },
  server:{
    host: '127.0.0.1', // 主机ip
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器打开
    port: 5173, // 端口号默认值5173
    // /api/XXX to http://127.0.0.1:8033/
    proxy: {
      "/api": {
        target: `http://127.0.0.1:8000/`, // 接口前缀
        changeOrigin: true, // 是否允许跨域
        secure: false, // https
        // rewrite: (path) => path.replace(/^\/api/, ""), api的地址是统一的
      }
    }

  },
  build:{
    rollupOptions:{
      output:{
        entryFileNames: "assets/js/entry.[hash].js",
        chunkFileNames: "assets/js/chunk.[hash].js",
        assetFileNames: "assets/[ext]/static.[hash].[ext]",
      }
    }
  }
});
