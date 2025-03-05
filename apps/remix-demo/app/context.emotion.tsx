import { createContext } from 'react';

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
