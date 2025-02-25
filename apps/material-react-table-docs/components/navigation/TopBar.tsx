import { useEffect, useRef } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
import {
  Box,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useMediaQuery,
  Select,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { useThemeContext } from '../../styles/ThemeContext';
import docsearch from '@docsearch/js';
import '@docsearch/css';

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

export const TopBar = ({ navOpen, setNavOpen }: Props) => {
  const isMounted = useRef(false);
  const { pathname } = useRouter();
  const plausible = usePlausible();
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const [isTablet] = useMediaQuery('(max-width: 900px)');
  const [isDesktop] = useMediaQuery('(min-width: 1500px)');
  const [isXLDesktop] = useMediaQuery('(min-width: 1800px)');
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('teal.500', 'teal.700');
  const textColor = useColorModeValue('white', 'gray.100');

  const { isLightTheme, setIsLightTheme } = useThemeContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      docsearch({
        appId: '1W9SWN5ZAH',
        apiKey: '680b219eaef484622046bf76cef8544a',
        indexName: 'chakra-react-table',
        container: '#docsearch',
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isMounted.current && isXLDesktop) {
      try {
        (window as any).ethicalads?.load?.();
      } catch (e) {
        console.log(e);
      }
    }
    isMounted.current = true;
  }, [isXLDesktop, isTablet, isDesktop, isMobile, pathname, colorMode]);

  return (
    <>
      <style global jsx>
        {`
          :root {
            --docsearch-primary-color: #319795;
            --docsearch-highlight-color: #319795;
            --docsearch-logo-color: #319795;
            ${!isLightTheme
              ? `--docsearch-container-background: rgba(11, 11, 11, 0.8);
         --docsearch-footer-background: #222;
         --docsearch-hit-background: #333;
         --docsearch-hit-color: #fff;
         --docsearch-hit-shadow: none;
         --docsearch-modal-background: #222;
         --docsearch-modal-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
         --docsearch-searchbox-background: #000;
         --docsearch-searchbox-focus-background: #000;
         --docsearch-text-color: #fff;
        `
              : ''}
          }
        `}
      </style>
      <Box
        as="header"
        position="fixed"
        width="100%"
        zIndex={5}
        bg={bgColor}
        opacity={0.95}
      >
        <Flex justify="space-between" textAlign="center" p="2px 8px" height="48px">
          <Flex textAlign="center">
            {!isDesktop && (
              <IconButton
                color={textColor}
                height="3rem"
                width="3rem"
                aria-label="Open nav menu"
                icon={navOpen ? <CloseIcon /> : <HamburgerIcon />}
                onClick={() => setNavOpen(!navOpen)}
                variant="ghost"
              />
            )}
            <NextLink href="/" passHref legacyBehavior>
              <Text
                as="a"
                display="flex"
                alignItems="center"
                cursor="pointer"
                fontSize={isTablet ? '1.6rem' : '1.5rem'}
                gap="1rem"
                fontWeight="bold"
                color={textColor}
              >
                <Image
                  alt="CRT logo"
                  src="/mrt_logo.svg"
                  height={isTablet ? 35 : 40}
                  width={isTablet ? 35 : 40}
                />
                {!isMobile && 'Chakra React Table'}
              </Text>
            </NextLink>
            <Select
              onFocus={() => plausible('version-select')}
              value="v3"
              size="sm"
              ml="8px"
              height="30px"
              width="80px"
              bg="teal.600"
              color={textColor}
              borderColor="teal.400"
            >
              <option value="v1">
                <NextLink
                  href={`https://v1.chakra-react-table.com/${pathname}`}
                  passHref
                >
                  V1
                </NextLink>
              </option>
              <option value="v2">
                <NextLink
                  href={`https://v2.chakra-react-table.com/${pathname}`}
                  passHref
                >
                  V2
                </NextLink>
              </option>
              <option value="v3">V3</option>
            </Select>
          </Flex>
          <Box
            onClick={() => plausible('open-search')}
            id="docsearch"
            display="grid"
            width={isDesktop ? '400px' : !isTablet ? '250px' : undefined}
          />
          <Flex textAlign="center" gap="0.25rem">
            <Tooltip label="Github">
              <IconButton
                as="a"
                href="https://github.com/KevinVandy/chakra-react-table"
                rel="noopener"
                target="_blank"
                color={textColor}
                height="3rem"
                width="3rem"
                aria-label="Github"
                size="sm"
                variant="ghost"
                icon={
                  <Image
                    alt="GitHub"
                    height={20}
                    width={20}
                    src="/github-mark-white.svg"
                  />
                }
              />
            </Tooltip>
            <Tooltip label="Discord">
              <IconButton
                as="a"
                href="https://discord.gg/5wqyRx6fnm"
                rel="noopener"
                target="_blank"
                color={textColor}
                height="3rem"
                width="3rem"
                aria-label="Discord"
                size="sm"
                variant="ghost"
                icon={
                  <Image
                    alt="Discord"
                    height={20}
                    width={20}
                    style={{
                      padding: '-3px',
                      borderRadius: '50%',
                    }}
                    src="/Discord-Logo-White.svg"
                  />
                }
              />
            </Tooltip>
            <Tooltip label="Toggle Light/Dark Mode">
              <IconButton
                color={textColor}
                height="3rem"
                width="3rem"
                aria-label="Toggle Light/Dark Mode"
                icon={isLightTheme ? <MoonIcon /> : <SunIcon />}
                onClick={() => {
                  setIsLightTheme(!isLightTheme);
                }}
                variant="ghost"
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
