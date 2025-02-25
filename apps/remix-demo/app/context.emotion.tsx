import { createContext, useState } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}

export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null);
export const ClientStyleContext = createContext<{ reset: () => void } | null>(
  null,
);

// Create a function that creates a new emotion cache
export function createEmotionCache() {
  return createCache({ key: 'css' });
}

export function ClientCacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache, setCache] = useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}
