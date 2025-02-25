import '../styles/globals.css';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import PlausibleProvider from 'next-plausible';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import { ThemeContextProvider } from '../styles/ThemeContext';
import { mdxComponents } from '../components/mdx/mdxComponents';
import { Layout } from '../components/navigation/Layout';

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>Chakra React Table V3</title>
        <meta
          name="description"
          content="Chakra React Table, a fully featured Chakra UI V2 implementation of TanStack React Table V8. Written from the ground up in TypeScript."
        />
        <link rel="canonical" href={`http://localhost${pathname}`} />
        <link rel="icon" href="/mrt_logo.png" />
        <meta property="og:image" content="/mrt_logo.png" />
        <meta property="og:url" content={`http://localhost${pathname}`} />
        {process.env.NODE_ENV === 'production' && (
          <>
            <link
              rel="preconnect"
              href="https://1W9SWN5ZAH-dsn.algolia.net"
              crossOrigin="anonymous"
            />
            <script
              async
              src="https://media.ethicalads.io/media/client/ethicalads.min.js"
            />
          </>
        )}
      </Head>
      <PlausibleProvider
        domain="localhost:3000"
        enabled={process.env.NODE_ENV === 'production'}
      >
        <ThemeContextProvider>
          <MDXProvider components={mdxComponents}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MDXProvider>
        </ThemeContextProvider>
      </PlausibleProvider>
    </>
  );
}

export default App;
