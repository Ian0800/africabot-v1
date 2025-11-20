
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This allows process.env.API_KEY to work in the browser for this project
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    server: {
      proxy: {
        '/api/meta': {
          target: 'https://graph.facebook.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/meta/, '')
        }
      }
    }
  };
});
