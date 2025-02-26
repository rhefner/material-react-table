/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

console.log('Client-side entry point starting...');

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});

// This makes sure the app is accessible
if (typeof window !== 'undefined') {
  console.log('React version:', React.version);
  console.log('React DOM version:', ReactDOM.version);
}
