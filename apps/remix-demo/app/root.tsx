import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  data,
} from 'react-router';
import type { LinksFunction, LoaderFunctionArgs } from 'react-router';
import {
  ColorModeProvider,
  ColorModeScript,
  Container,
  cookieStorageManagerSSR,
  CSSReset,
  Flex,
  localStorageManager,
  ThemeProvider,
  useColorMode,
} from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import { useContext, useEffect } from 'react';
import { ServerStyleContext, ClientStyleContext } from './context.emotion';
import { ColorModeToggle } from './components/ColorModeToggle';
import {
  colorModeCookieKey,
  parseChakraColorModeCookie,
  setChakraColorModeCookie,
} from './config';
import { theme } from './theme';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

// Get the color mode preference from cookies
export async function loader({ request }: LoaderFunctionArgs) {
  const colorMode = parseChakraColorModeCookie(request);
  const cookies = request.headers.get('Cookie') ?? '';
  console.log('[loader] colorMode:', colorMode, 'cookies:', cookies);

  return data(
    {
      colorMode,
      cookies,
    },
    {
      headers: [['Set-Cookie', setChakraColorModeCookie(colorMode)]],
    },
  );
}

// Document component enhanced with emotion cache
const Document = withEmotionCache(
  (
    { children, cookies }: { children: React.ReactNode; cookies?: string },
    emotionCache,
  ) => {
    const { cookies: cookiesFromLoader } = useLoaderData<typeof loader>();
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);
    const hasCookies =
      typeof cookies === 'string' || typeof cookiesFromLoader === 'string';
    const colorModeManager = hasCookies
      ? cookieStorageManagerSSR(cookies || cookiesFromLoader)
      : localStorageManager;
    const colorMode = colorModeManager.get(theme.config.initialColorMode);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // @ts-expect-error Using private _insertTag irrespective of emotion recommendation: https://github.com/emotion-js/emotion/issues/2676
        emotionCache.sheet._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body className={`chakra-ui-${colorMode}`}>
          <CSSReset />
          {/* ColorModeScript must be placed before any content to prevent flashing */}
          <ColorModeScript
            type="cookie"
            initialColorMode={colorMode}
            storageKey={colorModeCookieKey}
            key={colorModeCookieKey}
          />
          <ThemeProvider theme={theme}>
            <ColorModeProvider
              colorModeManager={colorModeManager}
              key={colorModeCookieKey}
            >
              {children}
            </ColorModeProvider>
          </ThemeProvider>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  },
);

export function Layout({ children }: { children: React.ReactNode }) {
  const { cookies } = useLoaderData<typeof loader>();

  return (
    <Document cookies={cookies}>
      <Container className="layout-container" maxW="container.xl">
        {children}
      </Container>
    </Document>
  );
}

export default function App() {
  const { colorMode } = useColorMode();
  console.log('[App] colorMode:', colorMode);

  return (
    <Flex
      minH="calc(100vh - 32px)"
      pt="32px"
      direction="column"
      alignItems="center"
    >
      <ColorModeToggle />
      <Outlet />
    </Flex>
  );
}
