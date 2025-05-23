import { theme } from './theme';

export const colorModeCookieKey = 'chakra-ui-color-mode';

export function parseChakraColorModeCookie(request: Request) {
  const cookie = request.headers.get('Cookie');
  const value = cookie?.match(
    new RegExp(`(^| )${colorModeCookieKey}=([^;]+)`),
  )?.[2];
  console.log('[parseChakraColorModeCookie] cookie:', cookie, 'value:', value);
  return value ?? theme.config.initialColorMode;
}

export function setChakraColorModeCookie(theme: string) {
  console.log('[setChakraColorModeCookie] theme:', theme);
  return `${colorModeCookieKey}=${theme}; Max-Age=31536000; Path=/; SameSite=lax; HttpOnly`;
}
