# Chakra UI Theme Integration Plan for Material React Table

## Overview

This document outlines a comprehensive plan to integrate Chakra UI's theming system with Material React Table. The goal is to create a complete theme integration system that ensures tables properly respect the host application's Chakra UI theme, solving issues like the color mode switching problem during virtualization.

## Current State Analysis

Based on the codebase analysis, we've identified several key areas:

1. The current implementation uses a mix of hard-coded colors and partial Chakra UI theme integration
2. The `useTheme` hook in `packages/material-react-table/src/hooks/custom/useTheme.ts` attempts to bridge Chakra UI's theme with MUI-style theming, but doesn't fully leverage Chakra's theme tokens
3. The `getMRTTheme` function in `packages/material-react-table/src/utils/style.utils.ts` creates a basic theme mapping but needs to be expanded
4. Virtualization creates DOM elements that may lose context of the current color mode
5. Some components have hard-coded colors instead of using theme tokens

## Implementation Plan

### Phase 1: Create Comprehensive Theme System (2 weeks)

#### 1.1. Create a Complete Chakra Theme Extension

Create a theme extension for Chakra UI that includes component styles for all Material React Table components:

```ts
// packages/material-react-table/src/theme/index.ts
import { extendTheme } from '@chakra-ui/react';
import { tableStyles } from './table';
import { toolbarStyles } from './toolbar';
import { cellStyles } from './cell';
// ... other component styles

export const createMRTChakraTheme = (overrides = {}) => {
  return extendTheme({
    components: {
      // Define styles for all MRT components
      MRT_Table: tableStyles,
      MRT_TableHead: headStyles,
      MRT_TableBody: bodyStyles,
      MRT_TableRow: rowStyles,
      MRT_TableCell: cellStyles,
      MRT_Toolbar: toolbarStyles,
      MRT_ColumnActions: columnActionsStyles,
      // ... other components
    },
    // Allow users to extend with their own custom theme
    ...overrides
  });
};
```

#### 1.2. Create Style Definitions for Each Component

For each component, create a style definition using Chakra UI's component style API:

```ts
// packages/material-react-table/src/theme/cell.ts
export const cellStyles = {
  baseStyle: (props) => {
    const { colorMode } = props;
    return {
      bg: colorMode === 'dark' ? 'gray.800' : 'white',
      color: colorMode === 'dark' ? 'white' : 'gray.800',
      borderColor: colorMode === 'dark' ? 'gray.600' : 'gray.200',
      // Additional base styles
    };
  },
  variants: {
    normal: (props) => ({}),
    pinned: (props) => {
      const { colorMode } = props;
      return {
        bg: colorMode === 'dark' ? 'gray.700' : 'gray.50',
        // Pinned cell styles
      };
    },
    selected: (props) => {
      const { colorMode } = props;
      return {
        bg: colorMode === 'dark' ? 'blue.700' : 'blue.50',
        // Selected cell styles
      };
    }
    // Other variants
  },
  defaultProps: {
    variant: 'normal'
  }
};
```

#### 1.3. Create a Theme Provider Component

Create a wrapper component that provides the Chakra theme to the Material React Table components:

```tsx
// packages/material-react-table/src/components/providers/MRT_ThemeProvider.tsx
import { ThemeProvider, useStyleConfig } from '@chakra-ui/react';
import { createMRTChakraTheme } from '../../theme';

export interface MRT_ThemeProviderProps {
  children: React.ReactNode;
  theme?: any; // Allow custom theme overrides
}

export const MRT_ThemeProvider: React.FC<MRT_ThemeProviderProps> = ({
  children,
  theme = {}
}) => {
  const mrtTheme = createMRTChakraTheme(theme);
  
  return (
    <ThemeProvider theme={mrtTheme}>
      {children}
    </ThemeProvider>
  );
};
```

### Phase 2: Update Component Styling (3 weeks)

#### 2.1. Refactor All Components to Use Chakra's Style System

Update all components to use Chakra UI's style hooks instead of hard-coded styles:

```tsx
// Example for a cell component
import { useStyleConfig, Box } from '@chakra-ui/react';

export const MRT_Cell = (props) => {
  const { cell, column, row, table, ...rest } = props;
  
  // Get the styles from Chakra's theme
  const isPinned = column.getIsPinned();
  const isSelected = row.getIsSelected();
  
  const variant = isPinned ? 'pinned' : isSelected ? 'selected' : 'normal';
  const styles = useStyleConfig('MRT_TableCell', { variant });
  
  return (
    <Box as="td" __css={styles} {...rest}>
      {/* Cell content */}
    </Box>
  );
};
```

#### 2.2. Create Style Hooks for Each Component Type

Create custom hooks for styling different component types:

```tsx
// packages/material-react-table/src/hooks/useStyles/useTableStyles.ts
import { useStyleConfig } from '@chakra-ui/react';

export const useTableStyles = (props = {}) => {
  return useStyleConfig('MRT_Table', props);
};

export const useCellStyles = (props = {}) => {
  return useStyleConfig('MRT_TableCell', props);
};

// ... Other style hooks
```

#### 2.3. Fix Virtualization Color Mode Issues

Implement special handling for virtualized components to ensure they maintain the correct color mode:

```tsx
// packages/material-react-table/src/components/virtualizer/MRT_VirtualizerComponent.tsx
import { useColorMode, Box } from '@chakra-ui/react';

export const MRT_VirtualizerComponent = (props) => {
  const { colorMode } = useColorMode();
  
  // Pass color mode data to virtualized elements via data attributes
  return (
    <Box 
      className={`chakra-ui-${colorMode}`} 
      data-theme={colorMode}
      data-color-mode={colorMode}
      {...props}
    >
      {/* Virtualized content */}
    </Box>
  );
};
```

### Phase 3: Implement User Customization API (2 weeks)

#### 3.1. Create Theme Customization API

Provide a clear API for users to customize the table theme:

```tsx
// Example usage in applications
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ChakraReactTable, createTableTheme } from 'chakra-react-table';

// Create a custom theme for the table
const tableTheme = createTableTheme({
  // Override specific components
  components: {
    MRT_TableCell: {
      baseStyle: (props) => ({
        // Custom cell styles
      }),
      variants: {
        // Custom variants
      }
    },
    // Other component overrides
  }
});

// Extend the app's main theme with the table theme
const theme = extendTheme({
  // App theme configuration
  ...tableTheme
});

// In the app
function App() {
  return (
    <ChakraProvider theme={theme}>
      <ChakraReactTable {...tableOptions} />
    </ChakraProvider>
  );
}
```

#### 3.2. Create High-Level ChakraReactTable Component

Create a new component that automatically handles theme integration:

```tsx
// packages/material-react-table/src/components/ChakraReactTable.tsx
import { MaterialReactTable } from './MaterialReactTable';
import { MRT_ThemeProvider } from './providers/MRT_ThemeProvider';
import { useColorMode } from '@chakra-ui/react';

export const ChakraReactTable = (props) => {
  const { colorMode } = useColorMode();
  
  // Ensure table is using the current color mode
  return (
    <MRT_ThemeProvider>
      <Box className={`chakra-ui-${colorMode}`} data-theme={colorMode}>
        <MaterialReactTable {...props} />
      </Box>
    </MRT_ThemeProvider>
  );
};
```

### Phase 4: Testing and Documentation (1 week)

#### 4.1. Comprehensive Testing

- Create tests for all theme variants and color modes
- Test virtualization with different color modes
- Test theme customization API
- Test with different Chakra UI versions

#### 4.2. Documentation

- Create comprehensive documentation for theme customization
- Provide examples of common customizations
- Document new theme API and component props
- Update Storybook with theme examples

## Implementation Timeline

1. **Phase 1 (2 weeks)**: Theme system architecture
   - Week 1: Core theme extension and structure
   - Week 2: Component style definitions

2. **Phase 2 (3 weeks)**: Component updates
   - Week 1: Table and header components
   - Week 2: Body and cell components
   - Week 3: Toolbar and utility components

3. **Phase 3 (2 weeks)**: Customization API
   - Week 1: Theme customization API
   - Week 2: High-level component wrappers

4. **Phase 4 (1 week)**: Testing and documentation
   - Testing in different environments
   - Documentation and examples

## Migration Strategy for Existing Users

1. Create a migration guide for users upgrading from previous versions
2. Provide temporary compatibility layer for deprecated theme props
3. Ensure new theme system works with existing table options
4. Create examples showing how to migrate from old styling approaches

## Future Enhancements

After the initial implementation, we can consider:

1. More granular theme customization options
2. Animation and transition theming
3. Responsive theme variants
4. Integration with other Chakra UI extensions

## Conclusion

This comprehensive approach will solve the color mode switching issues and provide a robust theming system that fully integrates with Chakra UI. By aligning with Chakra UI's theming patterns, we'll create a more consistent and maintainable solution that works reliably across different applications and color modes. 