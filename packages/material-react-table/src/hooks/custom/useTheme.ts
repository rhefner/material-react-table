import {
  useTheme as useChakraTheme,
  type Theme as ChakraTheme,
  useColorMode,
} from '@chakra-ui/react';

// Augment Theme type to include MUI palette items as well as colorMode and other
// items that MUI uses
export type Theme = ChakraTheme & {
  colorMode: 'light' | 'dark';
  colors: {
    text: string;
  };
  direction: 'ltr' | 'rtl' | any;
  palette: {
    mode: 'light' | 'dark';
    primary?: {
      main: string;
    };
    grey?: {
      [key: number]: string;
    };
  };
};

export function useTheme<T extends Theme>(): T {
  const { colorMode } = useColorMode();
  const theme = useChakraTheme<T>();

  // Add items that MUI uses to the theme
  theme.palette = {
    ...theme.palette,
    mode: colorMode,
  };

  theme.colors = {
    ...theme.colors,
    text: theme.colors.gray[900],
  };

  theme.colorMode = colorMode;
  theme.direction = theme?.direction ?? 'ltr';
  theme.colorMode = colorMode;

  return theme;
}
