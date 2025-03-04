import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '../utils';

/**
 * Chakra UI component style configuration for MRT table header
 */
export const tableHeadStyles: ComponentStyleConfig = {
  baseStyle: (props) => {
    return {
      position: 'sticky',
      top: 0,
      zIndex: 2,
      bg: mode('white', 'gray.800')(props),
      borderBottomWidth: '2px',
      borderBottomColor: mode('gray.200', 'gray.600')(props),
      transition: 'all 150ms ease-in-out',
    };
  },

  variants: {
    // Standard header
    standard: () => ({}),

    // Sticky header that stays at the top during scrolling
    sticky: (props) => {
      return {
        position: 'sticky',
        top: 0,
        zIndex: 3,
        boxShadow: mode(
          '0px 3px 5px -1px rgba(0,0,0,0.1)',
          '0px 3px 5px -1px rgba(0,0,0,0.2)',
        )(props),
      };
    },

    // Header with gradient background
    gradient: (props) => {
      return {
        bg: mode(
          'linear-gradient(180deg, white 0%, gray.50 100%)',
          'linear-gradient(180deg, gray.800 0%, gray.700 100%)',
        )(props),
      };
    },
  },

  // Default props
  defaultProps: {
    variant: 'standard',
  },
};
