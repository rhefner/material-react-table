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
      '@mui/material/IconButton': resolve(
        __dirname,
        'src/custom/IconButton.tsx',
      ),
      '@mui/material/Tooltip': resolve(__dirname, 'src/custom/Tooltip.tsx'),
      '@mui/material/Stack': resolve(__dirname, 'src/custom/Stack.tsx'),
      '@mui/material/TableCell': resolve(__dirname, 'src/custom/TableCell.tsx'),
      '@mui/material/TableRow': resolve(__dirname, 'src/custom/TableRow.tsx'),
      '@mui/material/TableHead': resolve(__dirname, 'src/custom/TableHead.tsx'),
      '@mui/material/TableBody': resolve(__dirname, 'src/custom/TableBody.tsx'),
      '@mui/material/TableFooter': resolve(
        __dirname,
        'src/custom/TableFooter.tsx',
      ),
      '@mui/material/TableContainer': resolve(
        __dirname,
        'src/custom/TableContainer.tsx',
      ),
      '@mui/material/useMediaQuery': resolve(
        __dirname,
        'src/custom/useMediaQuery.ts',
      ),
      '@mui/material/styles': resolve(__dirname, 'src/utils/color.utils.ts'),
      '@mui/icons-material': resolve(__dirname, 'src/custom/icons'),
      // Additional components for pagination and filtering
      '@mui/material/InputLabel': resolve(
        __dirname,
        'src/custom/InputLabel.tsx',
      ),
      '@mui/material/MenuItem': resolve(__dirname, 'src/custom/MenuItem.tsx'),
      '@mui/material/Select': resolve(__dirname, 'src/custom/Select.tsx'),
      '@mui/material/Typography': resolve(
        __dirname,
        'src/custom/Typography.tsx',
      ),
      '@mui/material/Pagination': resolve(
        __dirname,
        'src/custom/Pagination.tsx',
      ),
      '@mui/material/PaginationItem': resolve(
        __dirname,
        'src/custom/PaginationItem.tsx',
      ),
      '@mui/material/Autocomplete': resolve(
        __dirname,
        'src/custom/Autocomplete.tsx',
      ),
      '@mui/material/Checkbox': resolve(__dirname, 'src/custom/Checkbox.tsx'),
      '@mui/material/Chip': resolve(__dirname, 'src/custom/Chip.tsx'),
      '@mui/material/TextField': resolve(__dirname, 'src/custom/TextField.tsx'),
      '@mui/material/InputAdornment': resolve(
        __dirname,
        'src/custom/InputAdornment.tsx',
      ),
      '@mui/material/Skeleton': resolve(__dirname, 'src/custom/Skeleton.tsx'),
      '@mui/material/Table': resolve(__dirname, 'src/custom/Table.tsx'),
      '@mui/material/utils': resolve(__dirname, 'src/custom/utils.ts'),
      '@mui/material/Collapse': resolve(__dirname, 'src/custom/Collapse.tsx'),
      '@mui/material/CircularProgress': resolve(
        __dirname,
        'src/custom/CircularProgress.tsx',
      ),
      '@mui/material/Menu': resolve(__dirname, 'src/custom/Menu.tsx'),
      '@mui/material/Popover': resolve(__dirname, 'src/custom/Popover.tsx'),
      '@mui/material/Grow': resolve(__dirname, 'src/custom/Grow.tsx'),
      '@mui/material/Divider': resolve(__dirname, 'src/custom/Divider.tsx'),
      '@mui/material/Badge': resolve(__dirname, 'src/custom/Badge.tsx'),
      '@mui/material/TableSortLabel': resolve(
        __dirname,
        'src/custom/TableSortLabel.tsx',
      ),
      '@mui/material/FormControlLabel': resolve(
        __dirname,
        'src/custom/FormControlLabel.tsx',
      ),
      '@mui/material/FormHelperText': resolve(
        __dirname,
        'src/custom/FormHelperText.tsx',
      ),
      '@mui/material/Slider': resolve(__dirname, 'src/custom/Slider.tsx'),
      '@mui/material/Radio': resolve(__dirname, 'src/custom/Radio.tsx'),
      '@mui/material/ListItemIcon': resolve(
        __dirname,
        'src/custom/ListItemIcon.tsx',
      ),
    },
  },
});
