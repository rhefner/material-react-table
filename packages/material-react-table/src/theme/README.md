# Material React Table Chakra UI Theme System

This directory contains the Chakra UI theme integration for Material React Table. The theme system allows tables to respect the host application's Chakra UI theme and provides a consistent styling experience.

## Overview

The theme system is designed to:

1. Respect the host application's Chakra UI theme
2. Support color mode switching (light/dark)
3. Provide consistent styling for all table components
4. Allow for easy customization

## Usage

### Basic Usage

The simplest way to use the theme system is to wrap your application with the `MRTChakraProvider`:

```jsx
import { MRTChakraProvider } from 'material-react-table/theme';

function App() {
  return (
    <MRTChakraProvider>
      <YourApp />
    </MRTChakraProvider>
  );
}
```

### With Theme Overrides

You can customize the theme by providing overrides:

```jsx
import { MRTChakraProvider } from 'material-react-table/theme';

function App() {
  return (
    <MRTChakraProvider
      themeOverride={{
        colors: {
          primary: {
            500: '#1a73e8', // Custom primary color
          },
        },
        components: {
          MRTTable: {
            baseStyle: {
              borderRadius: 'lg', // Custom border radius
            },
          },
        },
      }}
    >
      <YourApp />
    </MRTChakraProvider>
  );
}
```

### Using with Existing Chakra Provider

If you already have a Chakra UI theme in your application, you can extend it with the MRT theme:

```jsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createMRTChakraTheme } from 'material-react-table/theme';

// Your existing theme
const yourTheme = {
  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c',
    },
  },
};

// Extend your theme with MRT theme
const theme = extendTheme(yourTheme, createMRTChakraTheme());

function App() {
  return (
    <ChakraProvider theme={theme}>
      <YourApp />
    </ChakraProvider>
  );
}
```

### Higher-Order Component

For convenience, you can also use the HOC pattern:

```jsx
import { withMRTChakraTheme } from 'material-react-table/theme';

function App() {
  return <YourApp />;
}

// Wrap your app with the MRT theme
export default withMRTChakraTheme(App);
```

## Theme Structure

The theme system is organized into several components:

- `MRTTable`: Styles for the main table component
- `MRTTableCell`: Styles for table cells
- `MRTTableHead`: Styles for the table header
- `MRTToolbar`: Styles for the toolbar
- `MRTPagination`: Styles for pagination
- `MRTFilter`: Styles for filters
- `MRTDetailPanel`: Styles for detail panels

Each component has its own style configuration with:

- `baseStyle`: Base styles applied to all instances
- `variants`: Different style variants
- `sizes`: Size variations
- `defaultProps`: Default properties

## Color Mode Support

The theme system automatically respects the Chakra UI color mode (light/dark). All components are designed to adapt their styling based on the current color mode.

## Customization

You can customize the theme at different levels:

1. **Global Theme Overrides**: Provide overrides to the `MRTChakraProvider`
2. **Component-Level Customization**: Override specific component styles
3. **Instance-Level Props**: Apply props to individual table instances

## Utilities

The theme system includes several utility functions:

- `createMRTChakraTheme`: Creates a Chakra UI theme with MRT components
- `mode`: Helper function for color mode conditional styling
- `isDarkMode`: Check if the current color mode is dark
- `colorModeStyles`: Apply different styles based on color mode

## Example: Custom Table Variant

```jsx
import { MRTChakraProvider } from 'material-react-table/theme';

const customTheme = {
  components: {
    MRTTable: {
      variants: {
        custom: (props) => ({
          borderWidth: '2px',
          borderColor: props.colorMode === 'dark' ? 'purple.500' : 'purple.200',
          boxShadow: 'lg',
        }),
      },
    },
  },
};

function App() {
  return (
    <MRTChakraProvider themeOverride={customTheme}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        tableProps={{ variant: 'custom' }}
      />
    </MRTChakraProvider>
  );
}