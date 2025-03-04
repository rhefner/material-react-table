import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '../utils';

/**
 * Chakra UI component style configuration for MRT toolbar
 */
export const toolbarStyles: ComponentStyleConfig = {
  baseStyle: (props) => {
    return {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 3,
      width: '100%',
      bg: mode('gray.50', 'gray.700')(props),
      color: mode('gray.800', 'white')(props),
      borderBottomWidth: '1px',
      borderBottomColor: mode('gray.200', 'gray.600')(props),
      transition: 'all 150ms ease-in-out',

      // Top toolbar specific styling
      '&[data-toolbar-position="top"]': {
        borderTopLeftRadius: 'md',
        borderTopRightRadius: 'md',
      },

      // Bottom toolbar specific styling
      '&[data-toolbar-position="bottom"]': {
        borderBottomLeftRadius: 'md',
        borderBottomRightRadius: 'md',
        borderTopWidth: '1px',
        borderTopColor: mode('gray.200', 'gray.600')(props),
        borderBottomWidth: 0,
      },
    };
  },

  variants: {
    // Standard toolbar
    standard: () => ({}),

    // Toolbar with more subtle styling
    subtle: (props) => {
      return {
        bg: mode('white', 'gray.800')(props),
        borderBottomColor: mode('gray.100', 'gray.700')(props),
      };
    },

    // Toolbar with elevated appearance
    elevated: (props) => {
      return {
        boxShadow: mode(
          '0 2px 4px 0 rgba(0,0,0,0.1)',
          '0 2px 4px 0 rgba(0,0,0,0.2)',
        )(props),
        zIndex: 1,
      };
    },

    // Toolbar with accent color
    accent: (props) => {
      return {
        bg: mode('blue.50', 'blue.800')(props),
        color: mode('blue.800', 'white')(props),
      };
    },
  },

  // Different sizes
  sizes: {
    sm: {
      p: 2,
      fontSize: 'sm',
    },
    md: {
      p: 3,
      fontSize: 'md',
    },
    lg: {
      p: 4,
      fontSize: 'lg',
    },
  },

  // Default props
  defaultProps: {
    variant: 'standard',
    size: 'md',
  },
};
