import { ChakraProvider, CSSReset, useColorMode } from '@chakra-ui/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { theme } from './ChakraTheme';

const ThemeContext = createContext<{
  isLightTheme: boolean;
  setIsLightTheme: (isLightTheme: boolean) => void;
  primaryColor: string | undefined;
  setPrimaryColor: (primaryColor: string | undefined) => void;
  secondaryColor: string;
  setSecondaryColor: (secondaryColor: string) => void;
  isSandboxOpen: boolean;
  setIsSandboxOpen: (isSandboxOpen: boolean) => void;
}>({} as any);

export const ThemeContextProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [primaryColor, setPrimaryColor] = useState<string | undefined>();
  const [secondaryColor, setSecondaryColor] =
    useState<string>('rgb(20,184,166)');
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const { setColorMode } = useColorMode();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLightTheme(localStorage.getItem('isLightTheme') === 'true');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.backgroundColor = isLightTheme ? '#fff' : '#111';
      localStorage.setItem('isLightTheme', isLightTheme.toString());
      setColorMode(isLightTheme ? 'light' : 'dark');
    }
  }, [isLightTheme, setColorMode]);

  return (
    <ThemeContext.Provider
      value={{
        isLightTheme,
        setIsLightTheme,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        isSandboxOpen,
        setIsSandboxOpen,
      }}
    >
      <CSSReset />
      <ChakraProvider
        theme={theme({
          isLightTheme,
          primaryColor,
          secondaryColor,
        })}
      >
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
