import { useMemo, useState } from 'react';
import {
  Drawer,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  List,
  theme,
  useMediaQuery,
  Text,
} from '@chakra-ui/react';
import { SideBarItems } from './SidebarItems';
import { RouteItem, routes } from './routes';
import { matchSorter } from 'match-sorter';
import { usePlausible } from 'next-plausible';
import { MdSearch as SearchIcon, MdClose as CloseIcon } from 'react-icons/md';

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

export const SideBar = ({ navOpen, setNavOpen }: Props) => {
  const plausible = usePlausible();
  const isMobile = useMediaQuery('(max-width: 900px)');

  const [search, setSearch] = useState('');

  const filteredRoutes = useMemo(() => {
    const filterRoutesRecursively = (routes: RouteItem[]): RouteItem[] => {
      return routes.reduce((acc: RouteItem[], route) => {
        const matchKeys = ['label'];
        if (route.keywords) {
          matchKeys.push('keywords');
        }
        const matchesSearch =
          matchSorter([route], search, { keys: matchKeys }).length > 0;

        if (matchesSearch) {
          // If the parent route matches, include all its items and secondary items
          acc.push({
            ...route,
            items: route.items,
            secondaryItems: route.secondaryItems,
          });
        } else {
          // If parent doesn't match, check children
          const filteredItems = route.items
            ? filterRoutesRecursively(route.items)
            : undefined;
          const filteredSecondaryItems = route.secondaryItems
            ? filterRoutesRecursively(route.secondaryItems)
            : undefined;

          if (filteredItems?.length || filteredSecondaryItems?.length) {
            acc.push({
              ...route,
              items: filteredItems,
              secondaryItems: filteredSecondaryItems,
            });
          }
        }
        return acc;
      }, []);
    };

    return filterRoutesRecursively(routes);
  }, [routes, search]);

  return (
    <Drawer
      isOpen={navOpen}
      onClose={() => setNavOpen(false)}
      variant={isMobile ? 'temporary' : 'permanent'}
    >
      <List
        sx={{
          overflow: 'visible',
          overflowY: navOpen ? 'overlay' : 'hidden',
          mt: '52px',
          p: 0,
          pb: '10rem',
          scrollPaddingTop: '20%',
          transition: 'all .2s',
          width: navOpen ? '300px' : 0,
          '@media (max-width: 900px)': {
            mt: '50px',
          },
        }}
      >
        <InputGroup>
          <InputLeftAddon
            sx={{
              opacity: search ? '1' : '0.5',
              transition: 'all .2s',
            }}
          >
            <SearchIcon />
          </InputLeftAddon>
          <Input
            onFocus={() => plausible('page-filter')}
            placeholder="Find Page"
            variant="outline"
            w="full"
            size="small"
            sx={{
              backgroundColor: theme.colors.gray[50],
              mx: '2px',
              my: '0',
              p: 0,
              position: 'sticky',
              top: '1px',
              width: 'calc(100% - 4px)',
              zIndex: 2,
              '&:hover': {
                button: {
                  opacity: '1',
                },
              },
            }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <InputRightAddon
            sx={{
              opacity: search ? '1' : '0.5',
              transition: 'all .2s',
            }}
          >
            <IconButton
              aria-label="Clear Search"
              disabled={!search}
              size="small"
              onClick={() => setSearch('')}
            >
              <CloseIcon />
            </IconButton>
          </InputRightAddon>
        </InputGroup>
        {!filteredRoutes.length ? (
          <Text sx={{ p: 2, textAlign: 'center' }} color="textSecondary">
            No results found for "{search}"
          </Text>
        ) : (
          <SideBarItems
            expandAll={!!search}
            routes={filteredRoutes}
            setNavOpen={setNavOpen}
            setSearch={setSearch}
            search={search}
          />
        )}
      </List>
    </Drawer>
  );
};
