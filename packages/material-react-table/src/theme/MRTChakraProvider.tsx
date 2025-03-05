// import React from 'react';
// import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';
// import { createMRTChakraTheme } from './index';
// import { MRTChakraThemeOverride } from './types';
// import { MRTThemeProvider } from './MRTThemeContext';

// export interface MRTChakraProviderProps
//   extends Omit<ChakraProviderProps, 'theme'> {
//   /**
//    * Optional theme overrides for the MRT Chakra theme
//    */
//   themeOverride?: MRTChakraThemeOverride;
// }

// /**
//  * A ChakraProvider with the Material React Table theme pre-configured
//  *
//  * @example
//  * ```jsx
//  * <MRTChakraProvider>
//  *   <App />
//  * </MRTChakraProvider>
//  * ```
//  *
//  * @example With theme overrides
//  * ```jsx
//  * <MRTChakraProvider
//  *   themeOverride={{
//  *     colors: {
//  *       primary: { 500: '#ff0000' },
//  *     },
//  *   }}
//  * >
//  *   <App />
//  * </MRTChakraProvider>
//  * ```
//  */
// export const MRTChakraProvider: React.FC<MRTChakraProviderProps> = ({
//   children,
//   themeOverride,
//   ...rest
// }) => {
//   // Create the MRT theme with any overrides
//   const theme = React.useMemo(() => {
//     return createMRTChakraTheme(themeOverride);
//   }, [themeOverride]);

//   return (
//     <ChakraProvider theme={theme} {...rest}>
//       <MRTThemeProvider>{children}</MRTThemeProvider>
//     </ChakraProvider>
//   );
// };

// /**
//  * A higher-order component that wraps the provided component with MRTChakraProvider
//  *
//  * @example
//  * ```jsx
//  * const AppWithMRTTheme = withMRTChakraTheme(App);
//  * ```
//  */
// export const withMRTChakraTheme = <P extends object>(
//   Component: React.ComponentType<P>,
//   themeOverride?: MRTChakraThemeOverride,
// ) => {
//   const WithMRTChakraTheme = (props: P) => {
//     return (
//       <MRTChakraProvider themeOverride={themeOverride}>
//         <Component {...props} />
//       </MRTChakraProvider>
//     );
//   };

//   WithMRTChakraTheme.displayName = `WithMRTChakraTheme(${
//     Component.displayName || Component.name || 'Component'
//   })`;

//   return WithMRTChakraTheme;
// };
