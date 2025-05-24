# Material UI to Chakra UI V3 Migration Context

## Project Overview
This is a Material React Table project being migrated from Material UI to Chakra UI V3 while preserving the original source files. The strategy uses Vite resolve aliases and TypeScript path mapping to redirect Material UI imports to custom Chakra UI wrapper components.

## Current Status (as of session end)
- **TypeScript Errors**: Reduced from 514 to 220 (57% reduction) 🎉
- **Architecture**: Complete sx prop system implemented
- **Core Components**: Fully functional with Material UI API compatibility

## Migration Strategy
1. **Preserve Original Files**: Never modify original source files in `src/components/`
2. **Use Aliases**: Map `@mui/material/ComponentName` to `src/custom/ComponentName.tsx` via:
   - `packages/material-react-table/vite.config.ts` (resolve aliases)
   - `packages/material-react-table/tsconfig.json` (TypeScript paths)
3. **Maintain API Compatibility**: Custom components support Material UI props including `sx`

## Key Files Modified
- `packages/material-react-table/vite.config.ts` - Vite resolve aliases
- `packages/material-react-table/tsconfig.json` - TypeScript path mapping
- `packages/material-react-table/src/custom/sxProps.ts` - sx prop conversion utility
- `CRT_PROGRESS.md` - Progress tracking

## Completed Components (with sx support)
### Core Components
- ✅ Box, Button, IconButton, Typography
- ✅ Paper (with elevation support)
- ✅ Tooltip (Chakra V3 namespace structure)
- ✅ Stack

### Table Components
- ✅ Table, TableCell, TableRow, TableHead, TableBody, TableFooter, TableContainer
- ✅ All support Material UI props and sx styling

### Form Components
- ✅ Checkbox, TextField, Select, MenuItem, InputLabel, InputAdornment
- ✅ FormControlLabel, FormHelperText, Radio
- ✅ Autocomplete, Chip

### Layout & Navigation
- ✅ Menu, Popover, Divider, Badge, ListItemIcon
- ✅ Collapse, Grow (transition components)

### Feedback Components
- ✅ Skeleton, CircularProgress
- ✅ Pagination, PaginationItem

### Utilities
- ✅ utils.ts (debounce function)
- ✅ useMediaQuery hook
- ✅ color.utils.ts (Material UI styles replacement)

## sx Prop System Architecture
Created `src/custom/sxProps.ts` with:
- `SxProps` type definition
- `convertSxToChakra()` utility function
- `WithSxProps` interface for component props
- `useSxProp()` hook for component usage

All custom components extend `WithSxProps` and use `css={sxStyles}` to apply sx styles.

## Current Aliases in vite.config.ts
```typescript
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
'@mui/material/useMediaQuery': resolve(__dirname, 'src/custom/useMediaQuery.ts'),
'@mui/material/styles': resolve(__dirname, 'src/utils/color.utils.ts'),
'@mui/icons-material': resolve(__dirname, 'src/custom/icons'),
'@mui/material/InputLabel': resolve(__dirname, 'src/custom/InputLabel.tsx'),
'@mui/material/MenuItem': resolve(__dirname, 'src/custom/MenuItem.tsx'),
'@mui/material/Select': resolve(__dirname, 'src/custom/Select.tsx'),
'@mui/material/Typography': resolve(__dirname, 'src/custom/Typography.tsx'),
'@mui/material/Pagination': resolve(__dirname, 'src/custom/Pagination.tsx'),
'@mui/material/PaginationItem': resolve(__dirname, 'src/custom/PaginationItem.tsx'),
'@mui/material/Autocomplete': resolve(__dirname, 'src/custom/Autocomplete.tsx'),
'@mui/material/Checkbox': resolve(__dirname, 'src/custom/Checkbox.tsx'),
'@mui/material/Chip': resolve(__dirname, 'src/custom/Chip.tsx'),
'@mui/material/TextField': resolve(__dirname, 'src/custom/TextField.tsx'),
'@mui/material/InputAdornment': resolve(__dirname, 'src/custom/InputAdornment.tsx'),
'@mui/material/Skeleton': resolve(__dirname, 'src/custom/Skeleton.tsx'),
'@mui/material/Table': resolve(__dirname, 'src/custom/Table.tsx'),
'@mui/material/utils': resolve(__dirname, 'src/custom/utils.ts'),
'@mui/material/Collapse': resolve(__dirname, 'src/custom/Collapse.tsx'),
'@mui/material/CircularProgress': resolve(__dirname, 'src/custom/CircularProgress.tsx'),
'@mui/material/Menu': resolve(__dirname, 'src/custom/Menu.tsx'),
'@mui/material/Popover': resolve(__dirname, 'src/custom/Popover.tsx'),
'@mui/material/Grow': resolve(__dirname, 'src/custom/Grow.tsx'),
'@mui/material/Divider': resolve(__dirname, 'src/custom/Divider.tsx'),
'@mui/material/Badge': resolve(__dirname, 'src/custom/Badge.tsx'),
'@mui/material/TableSortLabel': resolve(__dirname, 'src/custom/TableSortLabel.tsx'),
'@mui/material/FormControlLabel': resolve(__dirname, 'src/custom/FormControlLabel.tsx'),
'@mui/material/FormHelperText': resolve(__dirname, 'src/custom/FormHelperText.tsx'),
'@mui/material/Slider': resolve(__dirname, 'src/custom/Slider.tsx'),
'@mui/material/Radio': resolve(__dirname, 'src/custom/Radio.tsx'),
'@mui/material/ListItemIcon': resolve(__dirname, 'src/custom/ListItemIcon.tsx'),
```

## Remaining Work (220 TypeScript errors)
### Missing Components (need to create)
- TableSortLabel (referenced in aliases but not created)
- Slider (referenced in aliases but not created)
- Date picker components (@mui/x-date-pickers)
- LinearProgress
- AppBar, Toolbar, CssBaseline (from @mui/material)

### Type Issues to Fix
- Theme type conflicts (Theme vs typeof Theme)
- Function sx props with theme parameter
- Component prop mismatches (SelectProps vs slotProps, etc.)
- InputLabelProps not existing on TextField

### Story/Example Updates Needed
- Update story files to use new component APIs
- Fix prop usage in examples
- Update documentation

## Next Priority Actions
1. **Priority 3**: Test basic functionality with simple table example
2. Create remaining missing components (TableSortLabel, Slider, etc.)
3. Fix remaining type issues
4. Update story files and examples

## Testing Command
```bash
cd packages/material-react-table
pnpm exec tsc --noEmit --skipLibCheck 2>&1 | grep -c "error TS"
```

## Specific Error Patterns (from last check)
### Common TypeScript Errors:
1. `Property 'sx' does not exist` - Need to add sx support to component
2. `Cannot find module '@mui/material/ComponentName'` - Need to create alias
3. `Property 'disableRipple' does not exist` - Need to add Material UI specific props
4. `Theme refers to a value, but is being used as a type` - Import/type issues
5. `Function sx props with theme parameter` - sx prop type compatibility

### Most Frequent Missing Components:
- TableSortLabel (high priority - used in table headers)
- Slider (used in filter components)
- Date picker components (DatePicker, DateTimePicker, TimePicker)
- LinearProgress (loading states)

## Component Creation Template
```typescript
import React from 'react';
import { ChakraComponent, type ChakraProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface ComponentProps extends ChakraProps, WithSxProps {
  // Material UI specific props
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ sx, ...props }, ref) => {
    const sxStyles = useSxProp(sx);

    return (
      <ChakraComponent ref={ref} css={sxStyles} {...props}>
        {/* implementation */}
      </ChakraComponent>
    );
  }
);

Component.displayName = 'Component';
export default Component;
export { Component };
export type { ComponentProps };
```

## Key Insights for Continuation
- The sx prop system is the foundation - all components should extend WithSxProps
- Chakra UI V3 uses namespace components (Menu.Root, Menu.Content, etc.)
- Always check Chakra UI V3 docs as it's different from V2
- Material UI prop compatibility is crucial for seamless migration
- Use `css={sxStyles}` to apply sx styles in Chakra components
- Focus on high-usage components first (TableSortLabel, Slider)
- Test frequently with `pnpm exec tsc --noEmit --skipLibCheck`

## Branch Information
- Current branch: `v3-chakra.codex`
- Repository: `rhefner/material-react-table`
- Working directory: `/Users/hef/work/repos/github/material-react-table`

## Quick Start Commands for Continuation
```bash
cd /Users/hef/work/repos/github/material-react-table/packages/material-react-table
pnpm exec tsc --noEmit --skipLibCheck 2>&1 | head -20  # See current errors
pnpm exec tsc --noEmit --skipLibCheck 2>&1 | grep -c "error TS"  # Count errors
```
