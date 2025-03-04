# Material React Table - Chakra UI Theme Migration Guide

This guide provides step-by-step instructions for migrating your existing Material React Table components to use the new Chakra UI theming system.

## Overview

The new theming system allows Material React Table to:
- Respect the host application's Chakra UI theme
- Support light and dark mode seamlessly
- Fix color mode switching issues during virtualization
- Provide a more consistent styling approach across components

## Prerequisites

- Chakra UI v2.x+ installed in your project
- Material React Table with the new theme system

## Integration Steps

### 1. Wrap Your Application with MRTChakraProvider

The `MRTChakraProvider` component provides the theme context for all Material React Table components.

```tsx
import { MRTChakraProvider } from 'material-react-table/theme';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <MRTChakraProvider>
        {/* Your application content */}
        <MaterialReactTable {...tableProps} />
      </MRTChakraProvider>
    </ChakraProvider>
  );
}
```

### 2. Migrating MRT Components

When migrating existing MRT components to use the Chakra UI theme system, follow these patterns:

#### For Component Authors

1. Import necessary utilities from the theme system:

```tsx
import { useMRTComponentStyles, colorModeValue } from 'material-react-table/theme/themeUtils';
```

2. Use the `useMRTComponentStyles` hook to get component-specific styles:

```tsx
const { styles, isDark } = useMRTComponentStyles('MRTTableCell', 'normal');
```

3. Apply styles to your Chakra UI components:

```tsx
<Box
  as="td"
  __css={styles}
  data-color-mode={isDark ? 'dark' : 'light'}
  {...otherProps}
>
  {children}
</Box>
```

4. Use the `colorModeValue` utility for conditional styling based on color mode:

```tsx
<Box
  borderColor={colorModeValue('gray.200', 'gray.700')}
  {...otherProps}
>
  {children}
</Box>
```

#### Example: Migrating a Table Cell Component

Before:
```tsx
// Previous MUI implementation
const MRT_TableCell = ({
  children,
  muiTableCellProps,
  ...rest
}) => {
  return (
    <TableCell
      {...muiTableCellProps}
      {...rest}
    >
      {children}
    </TableCell>
  );
};
```

After:
```tsx
// Chakra UI implementation
const MRT_TableCell = ({
  children,
  muiTableCellProps = {},
  variant = 'normal',
  ...rest
}) => {
  const { styles, isDark } = useMRTComponentStyles('MRTTableCell', variant);
  
  return (
    <Box
      as="td"
      __css={styles}
      data-color-mode={isDark ? 'dark' : 'light'}
      {...muiTableCellProps}
      {...rest}
    >
      {children}
    </Box>
  );
};
```

### 3. Handle Color Mode in Virtualized Components

For virtualized components that might lose context during rendering:

1. Add the `data-color-mode` attribute to all component elements:

```tsx
<Box
  data-color-mode={isDark ? 'dark' : 'light'}
  {...props}
>
  {children}
</Box>
```

2. For components rendered in virtualized lists, access the parent color mode:

```tsx
// Inside a virtualized component
const getColorMode = () => {
  // Try to get from context first
  const { colorMode } = useColorMode();
  if (colorMode) return colorMode;
  
  // Fallback to checking parent element
  const element = document.querySelector('[data-color-mode]');
  return element?.getAttribute('data-color-mode') || 'light';
};
```

### 4. Customizing the Theme

To customize the Material React Table theme:

```tsx
import { createMRTChakraTheme } from 'material-react-table/theme';
import { extendTheme } from '@chakra-ui/react';

// Create a custom MRT theme
const mrtTheme = createMRTChakraTheme({
  // Override specific components
  components: {
    MRTTableCell: {
      baseStyle: {
        fontSize: 'sm',
        padding: '12px',
      },
      variants: {
        head: {
          fontWeight: 'bold',
          bg: 'blue.50',
          _dark: {
            bg: 'blue.900',
          },
        },
      },
    },
  },
});

// Extend your Chakra theme
const theme = extendTheme({
  // Your other theme customizations
  ...mrtTheme,
});

// Use in your app
function App() {
  return (
    <ChakraProvider theme={theme}>
      <MRTChakraProvider>
        <MaterialReactTable {...tableProps} />
      </MRTChakraProvider>
    </ChakraProvider>
  );
}
```

## Common Patterns

### Preserving Backward Compatibility

When migrating components, maintain backward compatibility by:

1. Keep original prop names (e.g., `muiTableCellProps`) for backward compatibility
2. Provide sensible defaults for new props
3. Document both old and new prop patterns

### Optimizing for Performance

For better performance:

1. Memoize complex components
2. Use conditional rendering where appropriate
3. Avoid unnecessary re-renders by using React.memo and useCallback

## Common Issues and Solutions

### Issue: Style Not Applying Correctly

**Solution**: Ensure you're using the `__css` prop rather than `sx` or `style` when applying the theme styles from `useMRTComponentStyles`.

### Issue: Color Mode Not Switching

**Solution**: Check that you've added the `data-color-mode` attribute and are using the `colorModeValue` utility.

### Issue: Theme Not Being Applied

**Solution**: Verify that your component is wrapped with both `ChakraProvider` and `MRTChakraProvider`.

## Further Resources

- See the example implementation in `packages/material-react-table/src/theme/examples/ThemeIntegrationExample.tsx`
- Refer to Chakra UI's [theming documentation](https://chakra-ui.com/docs/theming/theme) for more details on extending themes
- For component-specific styling options, see our component reference documentation 