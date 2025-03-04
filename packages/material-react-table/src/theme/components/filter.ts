import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '../utils';

/**
 * Chakra UI component style configuration for MRT filters
 */
export const filterStyles: ComponentStyleConfig = {
  baseStyle: (props) => {
    return {
      // Filter container
      '.mrt-filter-container': {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        minW: '250px',
        bg: mode('white', 'gray.800')(props),
        borderRadius: 'md',
        boxShadow: mode(
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.24)',
        )(props),
      },

      // Filter header
      '.mrt-filter-header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        pb: 2,
        borderBottomWidth: '1px',
        borderBottomColor: mode('gray.100', 'gray.700')(props),

        '& .mrt-filter-heading': {
          fontWeight: 'bold',
          fontSize: 'md',
        },
      },

      // Filter input
      '.mrt-filter-input': {
        width: '100%',
        p: 2,
        borderWidth: '1px',
        borderColor: mode('gray.200', 'gray.600')(props),
        borderRadius: 'md',
        bg: mode('white', 'gray.700')(props),
        color: mode('gray.800', 'white')(props),
        _hover: {
          borderColor: mode('gray.300', 'gray.500')(props),
        },
        _focus: {
          borderColor: mode('blue.500', 'blue.400')(props),
          boxShadow: `0 0 0 1px ${mode('blue.500', 'blue.400')(props)}`,
        },
        _placeholder: {
          color: mode('gray.500', 'gray.400')(props),
        },
      },

      // Range filter inputs
      '.mrt-filter-range-inputs': {
        display: 'flex',
        gap: 2,

        '& input': {
          width: '100%',
          p: 2,
          borderWidth: '1px',
          borderColor: mode('gray.200', 'gray.600')(props),
          borderRadius: 'md',
          bg: mode('white', 'gray.700')(props),
          color: mode('gray.800', 'white')(props),
          _hover: {
            borderColor: mode('gray.300', 'gray.500')(props),
          },
          _focus: {
            borderColor: mode('blue.500', 'blue.400')(props),
            boxShadow: `0 0 0 1px ${mode('blue.500', 'blue.400')(props)}`,
          },
        },
      },

      // Filter actions
      '.mrt-filter-actions': {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        mt: 2,
        pt: 2,
        borderTopWidth: '1px',
        borderTopColor: mode('gray.100', 'gray.700')(props),
      },

      // Filter chips
      '.mrt-filter-chip': {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        p: '0 8px',
        h: '24px',
        borderRadius: 'full',
        fontSize: 'xs',
        bg: mode('blue.100', 'blue.700')(props),
        color: mode('blue.800', 'white')(props),

        '& .mrt-filter-chip-delete': {
          cursor: 'pointer',
          _hover: {
            opacity: 0.7,
          },
        },
      },
    };
  },

  variants: {
    // Standard filter
    standard: () => ({}),

    // Compact filter with smaller elements
    compact: {
      '.mrt-filter-container': {
        p: 2,
        minW: '200px',
      },
      '.mrt-filter-input': {
        p: 1,
        fontSize: 'sm',
      },
      '.mrt-filter-range-inputs input': {
        p: 1,
        fontSize: 'sm',
      },
    },

    // Filter with outlined elements
    outlined: (props) => {
      return {
        '.mrt-filter-input': {
          bg: 'transparent',
          borderWidth: '1px',
          borderColor: mode('gray.300', 'gray.500')(props),
        },
        '.mrt-filter-range-inputs input': {
          bg: 'transparent',
          borderWidth: '1px',
          borderColor: mode('gray.300', 'gray.500')(props),
        },
      };
    },
  },

  // Default props
  defaultProps: {
    variant: 'standard',
  },
};
