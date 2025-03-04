import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '../utils';

/**
 * Chakra UI component style configuration for MRT detail panel
 */
export const detailPanelStyles: ComponentStyleConfig = {
  baseStyle: (props) => {
    return {
      width: '100%',
      py: 3,
      px: 4,
      borderBottomWidth: '1px',
      borderBottomColor: mode('gray.200', 'gray.700')(props),
      bg: mode('gray.50', 'gray.750')(props),
      transition: 'all 150ms ease-in-out',

      // Animation for expanding panel
      '.mrt-detail-panel-content': {
        overflow: 'hidden',
        opacity: 1,
        transition: 'height 200ms ease-in-out, opacity 200ms ease-in-out',
      },

      // Panel being opened
      '&[data-expanding="true"] .mrt-detail-panel-content': {
        opacity: 0,
      },

      // Shadow effect when expanded
      '&[data-expanded="true"]': {
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    };
  },

  variants: {
    // Standard detail panel
    standard: () => ({}),

    // Panel with subtle styling
    subtle: (props) => {
      return {
        bg: mode('white', 'gray.800')(props),
        borderLeftWidth: '4px',
        borderLeftColor: mode('blue.400', 'blue.500')(props),
      };
    },

    // Card-like style for the detail panel
    card: (props) => {
      return {
        m: 2,
        p: 4,
        borderRadius: 'md',
        borderWidth: '1px',
        borderColor: mode('gray.200', 'gray.700')(props),
        bg: mode('white', 'gray.800')(props),
        boxShadow: 'sm',
        borderBottomWidth: '1px',
      };
    },

    // Panel with accent color
    accent: (props) => {
      return {
        bg: mode('blue.50', 'blue.900')(props),
        color: mode('blue.800', 'white')(props),
      };
    },
  },

  // Default props
  defaultProps: {
    variant: 'standard',
  },
};
