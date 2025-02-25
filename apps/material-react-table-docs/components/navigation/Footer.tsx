import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
import {
  Box,
  Button,
  Divider,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdEdit as EditIcon } from 'react-icons/md';
import TableOfContentsList from './TableOfContentsList';
import { routes } from './routes';
import { EthicalAd } from '../mdx/EthicalAd';

export const Footer = () => {
  const { pathname } = useRouter();
  const plausible = usePlausible();
  const linkColor = useColorModeValue('teal.600', 'teal.200');

  return (
    <Box
      as="footer"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      marginTop="50px"
    >
      <Button
        colorScheme="teal"
        rightIcon={<EditIcon />}
        as="a"
        href={`https://github.com/KevinVandy/chakra-react-table/edit/v3/apps/material-react-table-docs/pages${pathname}${
          ['/'].includes(pathname)
            ? 'index.tsx'
            : ['/docs', '/docs/api', '/docs/examples', '/docs/guides'].includes(
                  pathname,
                )
              ? '/index.mdx'
              : '.mdx'
        }`}
        onClick={() => plausible('edit-on-github')}
        rel="noopener"
        target="_blank"
        height="3rem"
        margin="2rem auto"
        cursor="pointer"
        textAlign="center"
        variant="outline"
      >
        Suggest an Edit for this page on GitHub
      </Button>
      <Text fontSize="md" mt="2rem" textAlign="center">
        Using{' '}
        <Link
          color={linkColor}
          href="https://mantine.dev/"
          target="_blank"
          rel="noopener"
        >
          Mantine
        </Link>{' '}
        instead of Chakra UI?
        <br />
        Check out{' '}
        <Link
          href="https://mantine-react-table.com"
          target="_blank"
          textDecoration="none"
          _hover={{
            textDecoration: 'underline',
            textDecorationColor: 'teal.400',
          }}
          bgGradient="linear(to-r, teal.400, blue.500)"
          bgClip="text"
        >
          Mantine&nbsp;React&nbsp;Table
        </Link>
      </Text>
      <EthicalAd id="footer" text />
      <Box
        boxShadow="md"
        borderRadius="8px"
        borderBottomLeftRadius="0"
        borderBottomRightRadius="0"
        mt="50px"
        p="1.5rem"
      >
        <Text color="gray.500" textAlign="center">
          © {new Date().getFullYear()} Kevin&nbsp;Van&nbsp;Cott
        </Text>
        <Box display="flex" justifyContent="center" gap="1rem" flexWrap="wrap">
          <Link
            color="gray.500"
            href="https://www.npmjs.com/package/chakra-react-table"
            target="_blank"
            rel="noopener"
          >
            NPM
          </Link>
          <Link
            color="gray.500"
            href="https://github.com/KevinVandy/chakra-react-table"
            target="_blank"
            rel="noopener"
          >
            Source Code
          </Link>
          <Link
            color="gray.500"
            href="https://github.com/KevinVandy/chakra-react-table/issues"
            target="_blank"
            rel="noopener"
          >
            Submit a Bug Report
          </Link>
          <Link
            color="gray.500"
            href="https://discord.gg/5wqyRx6fnm"
            target="_blank"
            rel="noopener"
          >
            Join&nbsp;the&nbsp;Discord!
          </Link>
          <Link
            color="gray.500"
            href="https://twitter.com/kevinvancott"
            target="_blank"
            rel="noopener"
          >
            Twitter
          </Link>
        </Box>
        <Divider my="2rem" />
        <Box
          display="flex"
          flexWrap="wrap"
          mt="1rem"
          gap="0.5rem"
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent={{
            base: 'flex-start',
            sm: 'space-around',
            md: 'space-between',
          }}
        >
          <Box>
            <Text>Site Directory</Text>
            <TableOfContentsList items={routes} isFooter />
          </Box>
          <Box>
            <Text>API Reference</Text>
            <TableOfContentsList
              items={
                routes.find((item) => item.href === '/docs/getting-started')
                  ?.items ?? []
              }
              isFooter
            />
            <TableOfContentsList
              items={
                routes
                  .find((item) => item.href === '/docs/api')
                  ?.items?.find((item) => item.label === 'Props and Options')
                  ?.secondaryItems ?? []
              }
              isFooter
            />
            <TableOfContentsList
              items={
                routes
                  .find((item) => item.href === '/docs/api')
                  ?.items?.find((item) => item.label === 'Instance APIs')
                  ?.secondaryItems ?? []
              }
              isFooter
            />
            <TableOfContentsList
              items={
                routes
                  .find((item) => item.href === '/docs/api')
                  ?.items?.find((item) => item.label === 'Components and Hooks')
                  ?.secondaryItems ?? []
              }
              isFooter
            />
          </Box>
          <Box>
            <Text>Examples</Text>
            <TableOfContentsList
              items={
                routes.find((item) => item.href === '/docs/examples')?.items ??
                []
              }
              isFooter
            />
          </Box>
          <Box>
            <Text>Guides</Text>
            {routes
              .find((item) => item.href === '/docs/guides')
              ?.items?.map((item) => (
                <TableOfContentsList
                  key={item.href}
                  items={item?.items ?? []}
                  isFooter
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
