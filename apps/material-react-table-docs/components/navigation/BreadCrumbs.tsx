import { useMemo } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const BreadCrumbs = () => {
  const { route, back } = useRouter();

  const breadCrumbLinks = useMemo(() => {
    const routes = route.split('/');
    routes.shift();
    const links: string[] = [];
    for (let i = 0; i < routes.length + 1; i++) {
      if (routes[i] && routes[i] !== '/')
        links.push(`/${routes.slice(0, i + 1).join('/')}`);
    }
    return links;
  }, [route]);

  if (breadCrumbLinks.length === 0) {
    return null;
  }

  if (breadCrumbLinks.length === 1) {
    breadCrumbLinks.unshift('/');
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadCrumbLinks.map((link, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name:
        link === '/'
          ? 'Home'
          : link.split('/').pop()?.replaceAll('-', ' ') || '',
      item: `https://www.chakra-react-table.com${link}`,
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Box display="flex" alignItems="center" gap="1rem" pt="1rem">
        <Tooltip label="Go Back">
          <IconButton
            aria-label="Go Back"
            icon={<ArrowBackIcon />}
            onClick={back}
            size="sm"
          />
        </Tooltip>
        <Breadcrumb>
          {breadCrumbLinks.map((link, index) => (
            <BreadcrumbItem key={index}>
              <NextLink href={link} passHref legacyBehavior>
                <BreadcrumbLink textTransform="capitalize">
                  {link === '/'
                    ? 'Home'
                    : link
                        .split('/')
                        .pop()
                        ?.replaceAll('-', ' ')
                        ?.replaceAll('mrt', 'MRT')
                        ?.replaceAll('css', 'CSS')
                        ?.replaceAll(' ui', ' UI')
                        ?.replaceAll('api', 'API')}
                </BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Box>
    </>
  );
};
