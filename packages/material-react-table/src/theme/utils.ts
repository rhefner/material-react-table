/**
 * Type for color mode props that can be passed to style functions
 */
export interface ColorModeProps {
  colorMode?: 'light' | 'dark';
  [key: string]: any;
}

/**
 * Generic dictionary type for style objects
 */
export type StyleObject = Record<string, any>;

/**
 * Helper function to check if color mode is dark
 * @param props Props object containing colorMode
 * @returns boolean indicating if color mode is dark
 */
export const isDarkMode = (props: ColorModeProps): boolean => {
  return props.colorMode === 'dark';
};

/**
 * Creates a conditional style object based on color mode
 *
 * @param lightValue Value to use in light mode
 * @param darkValue Value to use in dark mode
 * @returns A function that returns the appropriate value based on color mode
 */
export const mode = <T>(lightValue: T, darkValue: T) => {
  return (props: ColorModeProps): T => {
    return isDarkMode(props) ? darkValue : lightValue;
  };
};

/**
 * Helper to create semantic color tokens that respect color mode
 *
 * @param prop Semantic token name (without color mode suffix)
 * @returns Function that returns the appropriate semantic token with color mode suffix
 */
export const getSemanticToken = (prop: string) => {
  return (props: ColorModeProps): string => {
    const colorMode = isDarkMode(props) ? 'dark' : 'light';
    return `${prop}.${colorMode}`;
  };
};

/**
 * Apply color mode specific styles to style objects
 *
 * @param props Props object containing colorMode
 * @param lightStyles Styles to apply in light mode
 * @param darkStyles Styles to apply in dark mode
 * @returns Combined styles object with color mode specific styles
 */
export const colorModeStyles = <T extends StyleObject>(
  props: ColorModeProps,
  lightStyles: T,
  darkStyles: T,
): T => {
  return isDarkMode(props) ? darkStyles : lightStyles;
};
