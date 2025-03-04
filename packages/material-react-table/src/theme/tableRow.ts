import { type ComponentStyleConfig } from '@chakra-ui/react';

/**
 * Chakra UI style configuration for MRT table row components
 */
export const tableRowStyles: ComponentStyleConfig = {
  baseStyle: {
    cursor: 'inherit',
    display: 'table-row',
    outline: 'none',
    width: '100%',
    _dark: {
      backgroundColor: 'gray.800',
      borderBottomColor: 'gray.600',
    },
    _light: {
      backgroundColor: 'white',
      borderBottomColor: 'gray.200',
    },
    borderBottom: '1px solid',
    transition: 'all 100ms ease-in-out',
  },
  variants: {
    normal: {
      _hover: {
        _dark: {
          backgroundColor: 'gray.700',
        },
        _light: {
          backgroundColor: 'gray.50',
        },
      },
    },
    selected: {
      _dark: {
        backgroundColor: 'blue.900',
      },
      _light: {
        backgroundColor: 'blue.50',
      },
      _hover: {
        _dark: {
          backgroundColor: 'blue.800',
        },
        _light: {
          backgroundColor: 'blue.100',
        },
      },
    },
    pinned: {
      _dark: {
        backgroundColor: 'gray.700',
      },
      _light: {
        backgroundColor: 'gray.100',
      },
      position: 'sticky',
      bottom: 0,
      zIndex: 1,
      _hover: {
        _dark: {
          backgroundColor: 'gray.600',
        },
        _light: {
          backgroundColor: 'gray.200',
        },
      },
    },
    'pinned-selected': {
      _dark: {
        backgroundColor: 'blue.800',
      },
      _light: {
        backgroundColor: 'blue.100',
      },
      position: 'sticky',
      bottom: 0,
      zIndex: 1,
      _hover: {
        _dark: {
          backgroundColor: 'blue.700',
        },
        _light: {
          backgroundColor: 'blue.200',
        },
      },
    },
    detail: {
      _dark: {
        backgroundColor: 'gray.900',
      },
      _light: {
        backgroundColor: 'gray.50',
      },
    },
    'group-outline': {
      _dark: {
        outlineColor: 'gray.500',
      },
      _light: {
        outlineColor: 'gray.300',
      },
      outline: '1px solid',
      outlineOffset: '-1px',
    },
    dragging: {
      _dark: {
        backgroundColor: 'gray.600',
        outlineColor: 'blue.400',
      },
      _light: {
        backgroundColor: 'gray.100',
        outlineColor: 'blue.400',
      },
      boxShadow: 'lg',
      outline: '2px dashed',
      outlineOffset: '-2px',
      zIndex: 3,
      cursor: 'grabbing',
    },
  },
  defaultProps: {
    variant: 'normal',
  },
};
