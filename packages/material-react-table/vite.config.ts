import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/material/Paper': resolve(__dirname, 'src/custom/Paper.tsx'),
      '@mui/icons-material': resolve(__dirname, 'src/custom/icons'),
    },
  },
});
