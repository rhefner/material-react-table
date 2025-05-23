import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import Inspect from 'vite-plugin-inspect';

const port =
  typeof process.env.PORT === 'string' && process.env.PORT.match(/^\d+$/)
    ? parseInt(process.env.PORT)
    : 5173;

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    build: {
      sourcemap: true,
    },
    css: {
      devSourcemap: isDev,
    },
    esbuild: {
      sourcemap: true,
    },
    optimizeDeps: {
      esbuildOptions: {
        sourcemap: true,
        sourcesContent: true,
      },
    },
    plugins: [reactRouter(), tsconfigPaths(), Inspect()],
    server: {
      port,
      sourcemap: true,
    },
  };
});
