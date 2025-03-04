# Theme Integration Guide for Material React Table Migration

This guide explains how to integrate the Chakra UI theme system with MRT_ components during the migration from Material UI to Chakra UI.

## Overview

When migrating MRT_ components from Material UI to Chakra UI, we need to ensure that components respect the Chakra UI theme and properly handle color mode switching. This guide provides strategies for consistent theme integration.

## Key Integration Points

1. **Component Styling**: Use the theme utilities to apply consistent styling to components
2. **Color Mode Support**: Ensure components adapt to light/dark mode changes
3. **Theme Token Usage**: Access theme tokens for colors, spacing, etc.
4. **Variant Support**: Apply different variants to components based on user preferences

## Theme Integration Utilities

We've created several utilities to make theme integration easier:

### 1. `useMRTComponentStyles` Hook

This hook provides theme values and helper functions for a specific component type:

```jsx
import { useMRTComponentStyles } from '../theme/themeUtils';

function MRT_SomeComponent({ variant, size, ...props }) {
  // Get themed styles for this component
  const { styles, isDark, mode } = useMRTComponentStyles('MRTTable', variant, size);
  
  return (
    <Box
      as="div"
      sx={styles} // Apply the theme styles
      bg={mode('white', 'gray.800')} // Conditional styling based on color mode
      {...props}
    >
      {/* Component content */}
    </Box>
  );
}
```

### 2. `getMRTCommonStyles` Utility

This function provides commonly used styles for MRT components:

```jsx
import { getMRTCommonStyles } from '../theme/themeUtils';

function MRT_SomeComponent(props) {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  
  // Get common styles based on the current theme and color mode
  const commonStyles = getMRTCommonStyles(theme, colorMode);
  
  return (
    <Box as="div" sx={commonStyles.headerCell} {...props}>
      {/* Component content */}
    </Box>
  );
}
```

### 3. `colorModeValue` Function

This helper function simplifies color mode-based styling:

```jsx
import { colorModeValue } from '../theme/themeUtils';

function MRT_SomeComponent(props) {
  return (
    <Box
      as="div"
      bg={colorModeValue('white', 'gray.800')}
      color={colorModeValue('gray.800', 'white')}
      {...props}
    >
      {/* Component content */}
    </Box>
  );
}
```

## Integration Strategy

When migrating a component from Material UI to Chakra UI, follow these steps:

1. **Identify Theme Dependencies**:
   - What colors does the component use?
   - Does it have different variants or sizes?
   - How should it respond to color mode changes?

2. **Use Theme Utilities**:
   - Import the appropriate theme utilities
   - Use the hooks to get themed styles
   - Apply the styles to the components

3. **Maintain Original Props**:
   - Keep props like `muiTableHeadProps` for backward compatibility
   - Map these props to the appropriate Chakra UI props

4. **Handle Refs Properly**:
   - Preserve ref props to avoid breaking functionality
   - Use proper ref forwarding when necessary

## Example: Converting a Table Component

Here's an example of converting a table component to use the theme system:

```jsx
// Original Material UI component
import { TableCell } from '@mui/material';

function MRT_TableHeadCell({ table, column, ...props }) {
  // Material UI implementation
  return (
    <TableCell {...props}>
      {column.Header}
    </TableCell>
  );
}

// Converted Chakra UI component with theme integration
import { Box } from '@chakra-ui/react';
import { useMRTComponentStyles } from '../theme/themeUtils';

function MRT_TableHeadCell({ table, column, ...props }) {
  // Get themed styles for the head cell
  const { styles, isDark } = useMRTComponentStyles('MRTTableCell', 'head');
  
  return (
    <Box
      as="th"
      __css={styles}
      data-color-mode={isDark ? 'dark' : 'light'} // Add data attribute for virtualization fix
      {...props}
    >
      {column.Header}
    </Box>
  );
}
```

## Handling Color Mode in Virtualized Components

For virtualized components that might not properly inherit the color mode context:

1. Add a `data-color-mode` attribute to the component:
   ```jsx
   <Box data-color-mode={isDark ? 'dark' : 'light'} {...props}>
   ```

2. In the CSS or styles, use attribute selectors if needed:
   ```jsx
   const styles = {
     '[data-color-mode="dark"] &': {
       bg: 'gray.800',
     },
     '[data-color-mode="light"] &': {
       bg: 'white',
     }
   };
   ```

## Working with Existing `muiProps`

The migration plan specifies that we should keep original variable names like `muiTableHeadProps`. Here's how to handle these with the theme system:

```jsx
import { Box } from '@chakra-ui/react';
import { useMRTComponentStyles } from '../theme/themeUtils';

function MRT_TableHeadCell({ 
  table,
  column,
  muiTableHeadCellProps, // Keep original prop name for backward compatibility
  ...props 
}) {
  const { styles } = useMRTComponentStyles('MRTTableCell', 'head');
  
  // Create a safe subset of props for Chakra
  const safeProps = { ...muiTableHeadCellProps };
  // Handle any incompatible props if needed
  
  return (
    <Box
      as="th"
      __css={styles}
      // Apply the muiTableHeadCellProps to Chakra component
      {...safeProps}
      {...props}
    >
      {column.Header}
    </Box>
  );
}
```

## Conclusion

By using these theme integration strategies, we can ensure that all migrated components maintain a consistent look and feel while respecting the host application's theme and color mode preferences.

Remember to:
- Use the theme utilities consistently across components
- Maintain backward compatibility with original prop names
- Handle color mode switching properly
- Test components in both light and dark modes

## Additional Resources

- [Chakra UI Theming Documentation](https://chakra-ui.com/docs/styled-system/theming/theme)
- [Theme System README](./README.md)
- [Migration Plan](../../migration-plan.md) 