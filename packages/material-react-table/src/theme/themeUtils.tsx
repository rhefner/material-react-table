// import React from 'react';
// import { useTheme, useColorMode, StyleProps, Theme } from '@chakra-ui/react';
// import { mode } from './utils';
// import { MRTChakraTheme } from './types';

// // Type for the style function props
// interface ColorModeProps {
//   colorMode: 'light' | 'dark';
//   theme?: Theme;
//   colorScheme?: string;
//   [key: string]: any;
// }

// /**
//  * A hook that provides theme values for Material React Table components.
//  * This is particularly useful for components that have been migrated from Material UI to Chakra UI.
//  *
//  * @param componentType The type of component (e.g., 'MRTTable', 'MRTTableCell')
//  * @param variant Optional variant name
//  * @param size Optional size name
//  * @returns An object with theme values and helper functions
//  */
// export function useMRTComponentStyles(
//   componentType: keyof MRTChakraTheme['components'],
//   variant?: string,
//   size?: string,
// ) {
//   const theme = useTheme() as MRTChakraTheme;
//   const { colorMode } = useColorMode();
//   const isDark = colorMode === 'dark';

//   // Get component styles from theme if available
//   const componentTheme = theme.components?.[componentType];

//   // Extract styles based on variant and size
//   const baseStyle =
//     typeof componentTheme?.baseStyle === 'function'
//       ? componentTheme?.baseStyle({
//           colorMode,
//           theme,
//           colorScheme: '',
//         } as ColorModeProps)
//       : componentTheme?.baseStyle || {};

//   const variantStyle =
//     variant && componentTheme?.variants?.[variant]
//       ? typeof componentTheme.variants[variant] === 'function'
//         ? componentTheme.variants[variant]({
//             colorMode,
//             theme,
//             colorScheme: '',
//           } as ColorModeProps)
//         : componentTheme.variants[variant]
//       : {};

//   const sizeStyle =
//     size && componentTheme?.sizes?.[size] ? componentTheme.sizes[size] : {};

//   // Merge styles with proper precedence
//   const styles = {
//     ...baseStyle,
//     ...sizeStyle,
//     ...variantStyle,
//   };

//   return {
//     theme,
//     colorMode,
//     isDark,
//     styles,

//     // Helper function to get color mode conditional values
//     mode: <T,>(lightValue: T, darkValue: T) =>
//       mode(lightValue, darkValue)({ colorMode }),

//     // Function to merge component-specific styles with user-provided props
//     mergeStyles: (props: StyleProps = {}) => ({
//       ...styles,
//       ...props,
//     }),

//     // Function to get a theme token with color mode applied
//     getToken: (token: string, lightVariant = 500, darkVariant = 700) => {
//       if (!theme.colors?.[token]) return token;

//       try {
//         return isDark
//           ? theme.colors[token][darkVariant] || token
//           : theme.colors[token][lightVariant] || token;
//       } catch (e) {
//         return token;
//       }
//     },
//   };
// }

// /**
//  * HOC that provides theme styling to a component
//  * Useful for class components or components that can't use hooks directly
//  */
// export function withMRTComponentStyles<P extends object>(
//   Component: React.ComponentType<P>,
//   componentType: keyof MRTChakraTheme['components'],
//   variant?: string,
//   size?: string,
// ) {
//   const WithStyles = (props: P) => {
//     const styleProps = useMRTComponentStyles(componentType, variant, size);

//     return <Component {...props} themeStyles={styleProps} />;
//   };

//   WithStyles.displayName = `WithMRTComponentStyles(${
//     Component.displayName || Component.name || 'Component'
//   })`;

//   return WithStyles;
// }

// /**
//  * Utility to generate common styles for MRT components based on the theme
//  */
// export const getMRTCommonStyles = (
//   theme: MRTChakraTheme,
//   colorMode: string = 'light',
// ) => {
//   const isDark = colorMode === 'dark';

//   return {
//     // Common table styles
//     table: {
//       width: '100%',
//       borderCollapse: 'separate',
//       borderSpacing: 0,
//       bg: isDark ? 'gray.800' : 'white',
//     },

//     // Common header cell styles
//     headerCell: {
//       fontWeight: 'bold',
//       textAlign: 'left',
//       bg: isDark ? 'gray.700' : 'gray.50',
//       color: isDark ? 'white' : 'gray.800',
//       p: 2,
//     },

//     // Common body cell styles
//     bodyCell: {
//       textAlign: 'left',
//       p: 2,
//       borderBottomWidth: '1px',
//       borderBottomColor: isDark ? 'gray.700' : 'gray.100',
//     },

//     // Common toolbar styles
//     toolbar: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       p: 2,
//       bg: isDark ? 'gray.700' : 'gray.50',
//       borderBottomWidth: '1px',
//       borderBottomColor: isDark ? 'gray.600' : 'gray.200',
//     },

//     // Common button styles
//     button: {
//       transition: 'all 150ms ease-in-out',
//       _hover: {
//         bg: isDark ? 'gray.600' : 'gray.200',
//       },
//     },

//     // Common input styles
//     input: {
//       bg: isDark ? 'gray.700' : 'white',
//       borderColor: isDark ? 'gray.600' : 'gray.200',
//       color: isDark ? 'white' : 'gray.800',
//       _hover: {
//         borderColor: isDark ? 'gray.500' : 'gray.300',
//       },
//       _focus: {
//         borderColor: isDark ? 'blue.400' : 'blue.500',
//         boxShadow: `0 0 0 1px ${isDark ? 'blue.400' : 'blue.500'}`,
//       },
//     },
//   };
// };

// /**
//  * A hook to get the appropriate color for a component based on the current color mode
//  *
//  * @param lightColor The color to use in light mode
//  * @param darkColor The color to use in dark mode
//  * @returns The appropriate color for the current color mode
//  */
// export function useMRTColorMode(lightColor: string, darkColor: string) {
//   const { colorMode } = useColorMode();
//   return colorMode === 'dark' ? darkColor : lightColor;
// }

// /**
//  * Helper for handling color mode-specific styles in JSX expressions
//  *
//  * @example
//  * <Box bg={colorModeValue('white', 'gray.800')} />
//  */
// export function colorModeValue<T>(lightValue: T, darkValue: T) {
//   const { colorMode } = useColorMode();
//   return colorMode === 'dark' ? darkValue : lightValue;
// }
