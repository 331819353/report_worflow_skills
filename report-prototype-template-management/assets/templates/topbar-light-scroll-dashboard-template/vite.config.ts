import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, process.cwd(), '');
  const apiBaseUrl = envConfig.VITE_API_BASE_URL;

  return {
    base: './',
    plugins: [vue()],
    define: {
      'process.env': {},
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/global.scss" as *;\n',
        },
      },
    },
    server: {
      proxy: apiBaseUrl
        ? {
            '/api': {
              target: apiBaseUrl,
              changeOrigin: true,
            },
          }
        : undefined,
    },
  };
});
