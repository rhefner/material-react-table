import { ComponentStyleConfig } from '@chakra-ui/react';

/**
 * Chakra UI component style configuration for MRT pagination
 */
export const paginationStyles: ComponentStyleConfig = {
  baseStyle: (props) => {
    const { colorMode } = props;
    const isDark = colorMode === 'dark';

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 2,
      p: 2,
      color: isDark ? 'gray.200' : 'gray.700',
      transition: 'all 150ms ease-in-out',

      // Page buttons container
      '.mrt-pagination-buttons': {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      },

      // Individual page button
      '.mrt-pagination-button': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minW: '32px',
        h: '32px',
        borderRadius: 'md',
        fontSize: 'sm',
        cursor: 'pointer',
        _hover: {
          bg: isDark ? 'gray.700' : 'gray.100',
        },
        _active: {
          bg: isDark ? 'gray.600' : 'gray.200',
        },
      },

      // Active page button
      '.mrt-pagination-button-active': {
        bg: isDark ? 'blue.700' : 'blue.500',
        color: 'white',
        _hover: {
          bg: isDark ? 'blue.600' : 'blue.400',
        },
        _active: {
          bg: isDark ? 'blue.800' : 'blue.600',
        },
      },

      // Disabled buttons
      '.mrt-pagination-button-disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        _hover: {
          bg: 'transparent',
        },
        _active: {
          bg: 'transparent',
        },
      },

      // Page info text
      '.mrt-pagination-info': {
        fontSize: 'sm',
        whiteSpace: 'nowrap',
      },

      // Rows per page select
      '.mrt-pagination-rows-per-page': {
        display: 'flex',
        alignItems: 'center',
        fontSize: 'sm',
        ml: 4,

        '& select': {
          mx: 2,
          py: 1,
          px: 2,
          borderRadius: 'md',
          borderWidth: '1px',
          borderColor: isDark ? 'gray.600' : 'gray.200',
          bg: isDark ? 'gray.700' : 'white',
          _hover: {
            borderColor: isDark ? 'gray.500' : 'gray.300',
          },
          _focus: {
            borderColor: isDark ? 'blue.400' : 'blue.500',
            boxShadow: `0 0 0 1px ${isDark ? 'blue.400' : 'blue.500'}`,
          },
        },
      },
    };
  },

  variants: {
    // Standard pagination
    standard: () => ({}),

    // Compact pagination with smaller elements
    compact: {
      p: 1,
      '.mrt-pagination-button': {
        minW: '24px',
        h: '24px',
        fontSize: 'xs',
      },
      '.mrt-pagination-info': {
        fontSize: 'xs',
      },
      '.mrt-pagination-rows-per-page': {
        fontSize: 'xs',
        ml: 2,
        '& select': {
          mx: 1,
          py: 0,
          px: 1,
        },
      },
    },

    // Rounded pagination buttons
    rounded: {
      '.mrt-pagination-button': {
        borderRadius: 'full',
      },
    },
  },

  // Default props
  defaultProps: {
    variant: 'standard',
  },
};
