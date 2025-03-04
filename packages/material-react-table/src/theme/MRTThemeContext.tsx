import React, { createContext, useContext } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { MRTChakraTheme } from './types';
import { useMRTTheme } from './useMRTTheme';

/**
 * Context interface for the MRT theme context
 */
export interface MRTThemeContextValue {
  /**
   * The current color mode ('light' or 'dark')
   */
  colorMode: 'light' | 'dark';

  /**
   * Function to toggle between light and dark mode
   */
  toggleColorMode: () => void;

  /**
   * Convenience boolean to check if in dark mode
   */
  isDark: boolean;

  /**
   * The current theme object
   */
  theme: MRTChakraTheme;
}

/**
 * Context for Material React Table theme
 */
export const MRTThemeContext = createContext<MRTThemeContextValue | undefined>(
  undefined,
);

/**
 * Provider component for the MRT theme context
 */
export const MRTThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme, colorMode, toggleColorMode, isDark } = useMRTTheme();

  const contextValue: MRTThemeContextValue = {
    colorMode,
    toggleColorMode,
    isDark,
    theme,
  };

  return (
    <MRTThemeContext.Provider value={contextValue}>
      {children}
    </MRTThemeContext.Provider>
  );
};

/**
 * Hook to access the MRT theme context
 *
 * @returns The MRT theme context value
 *
 * @example
 * ```jsx
 * const { colorMode, toggleColorMode, isDark, theme } = useMRTThemeContext();
 *
 * return (
 *   <div style={{ color: isDark ? 'white' : 'black' }}>
 *     Current mode: {colorMode}
 *     <button onClick={toggleColorMode}>Toggle</button>
 *   </div>
 * );
 * ```
 */
export function useMRTThemeContext(): MRTThemeContextValue {
  const context = useContext(MRTThemeContext);

  if (context === undefined) {
    throw new Error(
      'useMRTThemeContext must be used within a MRTThemeProvider',
    );
  }

  return context;
}

/**
 * HOC to wrap a component with the MRT theme provider
 */
export function withMRTTheme<P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P> {
  const WithMRTTheme: React.FC<P> = (props) => {
    return (
      <MRTThemeProvider>
        <Component {...props} />
      </MRTThemeProvider>
    );
  };

  WithMRTTheme.displayName = `WithMRTTheme(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WithMRTTheme;
}
