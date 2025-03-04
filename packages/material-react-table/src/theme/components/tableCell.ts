import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '../utils';

/**
 * Chakra UI component style configuration for table cells
 */
export const tableCellStyles: ComponentStyleConfig = {
  // Base styles applied to all cells
  baseStyle: (props) => {
    return {
      p: 3,
      fontSize: 'sm',
      fontWeight: 'normal',
      textAlign: 'left',
      transition: 'background-color 150ms ease-in-out',
      borderColor: mode('gray.200', 'gray.600')(props),
      borderBottomWidth: '1px',
      borderRightWidth: '0px',

      // Focus outline styling
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 2px ${mode('blue.500', 'blue.300')(props)}`,
        zIndex: 1,
      },
    };
  },

  // Cell variants
  variants: {
    // Default cell styling
    normal: () => ({}),

    // Pinned columns
    pinned: (props) => ({
      position: 'sticky',
      left: 0,
      zIndex: 1,
      bg: mode('white', 'gray.800')(props),
      _hover: {
        bg: mode('gray.50', 'gray.700')(props),
      },
    }),

    // Selected row cells
    selected: (props) => ({
      bg: mode('blue.50', 'blue.900')(props),
      _hover: {
        bg: mode('blue.100', 'blue.800')(props),
      },
    }),

    // Header cells
    head: (props) => ({
      bg: mode('gray.50', 'gray.700')(props),
      color: mode('gray.800', 'gray.100')(props),
      fontSize: 'xs',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 'wider',
      borderTopWidth: '0px',
      _hover: {
        bg: mode('gray.100', 'gray.600')(props),
      },
    }),

    // Footer cells
    footer: (props) => ({
      bg: mode('gray.50', 'gray.700')(props),
      color: mode('gray.600', 'gray.400')(props),
      fontWeight: 'medium',
      borderBottomWidth: '0px',
      borderTopWidth: '2px',
    }),

    // Group header cells
    group: () => ({
      textAlign: 'center',
      fontWeight: 'bold',
    }),
  },

  // Default props
  defaultProps: {
    variant: 'normal',
  },
};
