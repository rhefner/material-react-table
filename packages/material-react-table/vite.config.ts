import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/material/Paper': resolve(__dirname, 'src/custom/Paper.tsx'),
      '@mui/material/Box': resolve(__dirname, 'src/custom/Box.tsx'),
      '@mui/material/Button': resolve(__dirname, 'src/custom/Button.tsx'),
      '@mui/material/IconButton': resolve(__dirname, 'src/custom/IconButton.tsx'),
      '@mui/material/Tooltip': resolve(__dirname, 'src/custom/Tooltip.tsx'),
      '@mui/material/Stack': resolve(__dirname, 'src/custom/Stack.tsx'),
      '@mui/material/TableCell': resolve(__dirname, 'src/custom/TableCell.tsx'),
      '@mui/material/TableRow': resolve(__dirname, 'src/custom/TableRow.tsx'),
      '@mui/material/TableHead': resolve(__dirname, 'src/custom/TableHead.tsx'),
      '@mui/material/TableBody': resolve(__dirname, 'src/custom/TableBody.tsx'),
      '@mui/material/TableFooter': resolve(__dirname, 'src/custom/TableFooter.tsx'),
      '@mui/material/TableContainer': resolve(__dirname, 'src/custom/TableContainer.tsx'),
      '@mui/material/styles': resolve(__dirname, 'src/utils/color.utils.ts'),
      '@mui/icons-material': resolve(__dirname, 'src/custom/icons'),
    },
  },
});
