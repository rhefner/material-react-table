import { extendTheme } from '@chakra-ui/react';

export const theme = ({
  isLightTheme,
  primaryColor,
  secondaryColor,
}: {
  isLightTheme: boolean;
  primaryColor?: string;
  secondaryColor: string;
}) =>
  extendTheme({
    config: {
      initialColorMode: isLightTheme ? 'light' : 'dark',
      useSystemColorMode: false,
    },
    colors: {
      primary: {
        main: primaryColor || '#3182ce', // Default to blue if no primary color is provided
      },
      secondary: {
        main: secondaryColor,
      },
    },
    components: {
      Button: {
        baseStyle: {
          textTransform: 'none',
        },
      },
      Tabs: {
        baseStyle: {
          tab: {
            textTransform: 'none',
          },
        },
      },
    },
    styles: {
      global: (props) => ({
        body: {
          bg: props.colorMode === 'dark' ? '#111' : '#fff',
        },
      }),
    },
    fonts: {
      heading: 'system-ui, sans-serif',
      body: 'system-ui, sans-serif',
    },
    textStyles: {
      h1: {
        fontSize: '1.8rem',
        lineHeight: '3rem',
        paddingLeft: '1rem',
      },
      h2: {
        fontSize: '2rem',
        lineHeight: '3.5rem',
        fontWeight: 'bold',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
      },
      h3: {
        fontSize: '1.5rem',
        lineHeight: '3rem',
        marginBottom: '1rem',
        fontWeight: 'bold',
      },
      h4: {
        fontSize: '1.25rem',
        lineHeight: '2rem',
        fontWeight: 'bold',
      },
      h5: {
        fontSize: '1.1rem',
        lineHeight: '3rem',
        fontWeight: 'bold',
      },
      h6: {
        fontSize: '1rem',
        lineHeight: '3rem',
        fontWeight: 'bold',
      },
      subtitle1: {
        marginBottom: '1rem',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: '2rem',
        marginBottom: '0.5rem',
      },
    },
  });
