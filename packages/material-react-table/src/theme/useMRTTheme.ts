import { useTheme, useColorMode } from '@chakra-ui/react';
import { MRTChakraTheme } from './types';

/**
 * Hook to access the Material React Table theme and color mode
 *
 * @returns An object containing the theme, color mode, and a toggle function
 *
 * @example
 * ```jsx
 * const { theme, colorMode, toggleColorMode } = useMRTTheme();
 *
 * // Access theme values
 * const primaryColor = theme.colors.primary[500];
 *
 * // Check color mode
 * const isDark = colorMode === 'dark';
 *
 * // Toggle color mode
 * <Button onClick={toggleColorMode}>
 *   Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
 * </Button>
 * ```
 */
export function useMRTTheme() {
  const theme = useTheme() as MRTChakraTheme;
  const { colorMode, toggleColorMode } = useColorMode();

  return {
    theme,
    colorMode,
    toggleColorMode,
    isDark: colorMode === 'dark',
  };
}

/**
 * Hook to access the current color mode and toggle function
 *
 * @returns An object containing the color mode and a toggle function
 *
 * @example
 * ```jsx
 * const { colorMode, toggleColorMode, isDark } = useMRTColorMode();
 *
 * return (
 *   <Button onClick={toggleColorMode}>
 *     Switch to {isDark ? 'Light' : 'Dark'} Mode
 *   </Button>
 * );
 * ```
 */
export function useMRTColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return {
    colorMode,
    toggleColorMode,
    isDark: colorMode === 'dark',
  };
}
