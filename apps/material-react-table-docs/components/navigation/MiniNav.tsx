import { useEffect, useState } from 'react';
import {
  Box,
  Link,
  Text,
  theme,
  useMediaQuery,
  useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { EthicalAd } from '../mdx/EthicalAd';

export const MiniNav = () => {
  const { pathname } = useRouter();
  const isXLDesktop = useMediaQuery('(min-width: 1800px)');
  const { colorMode } = useColorMode();
  const [headings, setHeadings] = useState<NodeListOf<HTMLElement>>();

  useEffect(() => {
    setHeadings(
      document.querySelectorAll(isXLDesktop ? 'h2, h3, h4, h5' : 'h3'),
    );
  }, [isXLDesktop, pathname]);

  return (
    <Box
      sx={{
        position: isXLDesktop ? 'fixed' : undefined,
        top: '60px',
        right: '2rem',
        minWidth: '100px',
        maxWidth: isXLDesktop ? '250px' : '500px',
      }}
    >
      <Text mt="1rem" as="div" variant="h6">
        On This Page
      </Text>
      <ul
        style={{
          padding: 0,
          maxHeight: isXLDesktop ? 'calc(100vh - 9rem)' : undefined,
          overflowY: isXLDesktop ? 'auto' : undefined,
        }}
      >
        {Array.from(headings ?? []).map((heading, index) => {
          if (
            !isXLDesktop &&
            ['demo', 'source code'].includes(
              heading.innerText.toLowerCase().trim(),
            )
          ) {
            return;
          }
          return (
            <li
              key={index}
              style={{
                listStyle: 'none',
                paddingLeft:
                  heading.localName === 'h3'
                    ? '1rem'
                    : heading.localName === 'h4'
                      ? '2rem'
                      : heading.localName === 'h5'
                        ? '3rem'
                        : 0,
              }}
            >
              <Link
                href={`#${heading.id}`}
                sx={{
                  color: colorMode === 'dark' ? 'gray.400' : 'gray.700',
                }}
              >
                <Text as="span" variant="subtitle2">
                  {heading.innerText}
                </Text>
              </Link>
            </li>
          );
        })}
      </ul>
      {isXLDesktop && <EthicalAd id="mini-nav" vertical />}
    </Box>
  );
};
