import { useMediaQuery as chakraUseMediaQuery, type UseMediaQueryOptions } from '@chakra-ui/react';

export type { UseMediaQueryOptions };

export default function useMediaQuery(query: string, options?: UseMediaQueryOptions) {
  return chakraUseMediaQuery(query, options)[0];
}
