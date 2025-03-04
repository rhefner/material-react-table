import { ThemeConfig } from '@chakra-ui/react';
import { MRTChakraTheme } from './types';

/**
 * Default theme configuration for Material React Table
 * This ensures that the theme behaves consistently and
 * respects the user's system color mode by default
 */
export const defaultConfig: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
  disableTransitionOnChange: false,
};

/**
 * Basic color palette for Material React Table theme
 * These tokens can be referenced and extended in component styles
 */
export const colors = {
  // Basic colors that can be referenced in component styles
  primary: {
    50: '#e6f7ff',
    100: '#bae7ff',
    200: '#91d5ff',
    300: '#69c0ff',
    400: '#40a9ff',
    500: '#1890ff',
    600: '#096dd9',
    700: '#0050b3',
    800: '#003a8c',
    900: '#002766',
  },
  // Semantic colors for specific states
  success: {
    50: '#f0fdf4',
    500: '#10b981',
    700: '#047857',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    700: '#b45309',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    700: '#b91c1c',
  },
  info: {
    50: '#eff6ff',
    500: '#3b82f6',
    700: '#1d4ed8',
  },
};

/**
 * Default semantic tokens for Material React Table theme
 * This maps color mode specific values to semantic design tokens
 */
export const semanticTokens = {
  colors: {
    'mrt.background': {
      _light: 'white',
      _dark: 'gray.800',
    },
    'mrt.background.alt': {
      _light: 'gray.50',
      _dark: 'gray.700',
    },
    'mrt.border': {
      _light: 'gray.200',
      _dark: 'gray.600',
    },
    'mrt.text.primary': {
      _light: 'gray.900',
      _dark: 'gray.100',
    },
    'mrt.text.secondary': {
      _light: 'gray.600',
      _dark: 'gray.400',
    },
    'mrt.selected.background': {
      _light: 'blue.50',
      _dark: 'blue.900',
    },
    'mrt.selected.text': {
      _light: 'blue.700',
      _dark: 'blue.200',
    },
  },
};

/**
 * Default global styles
 */
export const styles = {
  global: {
    '.mrt-virtualized-container': {
      // Fix for color mode sync issues in virtualized components
      colorScheme: 'inherit',
      colorMode: 'inherit',
    },
  },
};

/**
 * Creates a base default theme without component styles
 * This is useful for integration with existing themes
 */
export const createBaseTheme = (): Partial<MRTChakraTheme> => ({
  config: defaultConfig,
  colors,
  semanticTokens,
  styles,
});
