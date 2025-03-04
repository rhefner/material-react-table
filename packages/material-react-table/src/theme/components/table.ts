import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '../utils';

/**
 * Chakra UI component style configuration for the main MRT table
 */
export const tableStyles: ComponentStyleConfig = {
  // Base styles applied to all tables
  baseStyle: (props) => {
    return {
      width: '100%',
      tableLayout: 'fixed',
      borderCollapse: 'separate',
      borderSpacing: 0,
      position: 'relative',
      overflow: 'auto',

      // Set color mode specific styles
      bg: mode('white', 'gray.800')(props),
      color: mode('gray.800', 'gray.100')(props),
      borderColor: mode('gray.200', 'gray.600')(props),

      // Default border
      borderWidth: '1px',
      borderRadius: 'md',

      // Box shadow
      boxShadow: mode(
        'rgba(0, 0, 0, 0.1) 0px 2px 4px 0px',
        'rgba(0, 0, 0, 0.2) 0px 2px 8px 0px',
      )(props),

      // Transition for color mode changes
      transition: 'all 150ms ease-in-out',
    };
  },

  // Different table variants
  variants: {
    // Default with borders
    outlined: () => ({}),

    // No outer borders
    simple: () => ({
      borderWidth: 0,
      boxShadow: 'none',
    }),

    // Striped rows
    striped: (props) => {
      return {
        '& tbody tr:nth-of-type(odd)': {
          bg: mode('gray.50', 'gray.700')(props),
        },
      };
    },

    // Dense padding
    compact: () => ({
      '& th, & td': {
        p: 2,
      },
    }),
  },

  // Different sizes
  sizes: {
    sm: {
      '& th, & td': {
        p: 2,
        fontSize: 'xs',
      },
    },
    md: {
      '& th, & td': {
        p: 3,
        fontSize: 'sm',
      },
    },
    lg: {
      '& th, & td': {
        p: 4,
        fontSize: 'md',
      },
    },
  },

  // Default props
  defaultProps: {
    variant: 'outlined',
    size: 'md',
  },
};
