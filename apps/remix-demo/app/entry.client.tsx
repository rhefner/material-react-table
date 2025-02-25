/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { HydratedRouter } from 'react-router/dom';
import { startTransition, StrictMode, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import createEmotionCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ClientStyleContext } from './context.emotion';

// Proxy window.localStorage.setItem so that an event is fired when localStorage.setItem is called
// window.localStorage.setItem = new Proxy(window.localStorage.setItem, {
//   apply(target, thisArg, args) {
//     target.apply(thisArg, args as [string, string]);
//     window.dispatchEvent(new CustomEvent('local-storage', { detail: args }));
//     console.log(`localStorage.setItem(${args})`);
//     return true;
//   },
// });

function ClientCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState(createEmotionCache({ key: 'css' }));

  function reset() {
    setCache(createEmotionCache({ key: 'css' }));
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

function hydrate(el = document) {
  startTransition(() => {
    hydrateRoot(
      el,
      <StrictMode>
        <ClientCacheProvider>
          <HydratedRouter />
        </ClientCacheProvider>
      </StrictMode>,
    );
  });
}

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(() => hydrate());
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
