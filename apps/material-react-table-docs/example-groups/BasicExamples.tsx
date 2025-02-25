import { useRouter } from 'next/router';
import { Box, Icon, Tab, TabList, Tabs } from '@chakra-ui/react';
import BasicExample from '../examples/basic';
import MinimalExample from '../examples/minimal';
import AdvancedExample from '../examples/advanced';
import CustomHeadlessExample from '../examples/custom-headless';
import { useState } from 'react';
import Link from 'next/link';
import { MdLaunch as LaunchIcon } from 'react-icons/md';

const BasicExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState(
    isPage ? pathname.split('/').pop() : 'basic',
  );

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
          value={isPage ? pathname.split('/').pop() : activeTab}
          onChange={(_e, newPath) =>
            isPage && newPath !== 'more'
              ? push(newPath as string)
              : setActiveTab(newPath as string)
          }
        >
          <TabList>
            <Tab>Basic</Tab>
            <Tab>Minimal</Tab>
            <Tab>Advanced</Tab>
            <Tab>Custom Headless</Tab>
            <Link href="/docs/examples/export-csv" passHref legacyBehavior>
              <Tab>
                <Box>
                  Data Export
                  <Icon as={LaunchIcon} sx={{ fontSize: '1rem' }} />
                </Box>
              </Tab>
            </Link>
            <Link href="/docs/examples/column-ordering" passHref legacyBehavior>
              <Tab>
                <Box>
                  DnD
                  <Icon as={LaunchIcon} sx={{ fontSize: '1rem' }} />
                </Box>
              </Tab>
            </Link>
            <Link href="/docs/examples/editing-crud" passHref legacyBehavior>
              <Tab>
                <Box>
                  Editing
                  <Icon as={LaunchIcon} sx={{ fontSize: '1rem' }} />
                </Box>
              </Tab>
            </Link>
            <Link href="/docs/examples/filter-variants" passHref legacyBehavior>
              <Tab>
                <Box>
                  Filtering
                  <Icon as={LaunchIcon} sx={{ fontSize: '1rem' }} />
                </Box>
              </Tab>
            </Link>
            <Link href="/docs/examples/react-query" passHref legacyBehavior>
              <Tab>
                <Box>
                  Fetching
                  <Icon as={LaunchIcon} sx={{ fontSize: '1rem' }} />
                </Box>
              </Tab>
            </Link>
            <Link href="/docs/examples/sticky-header" passHref legacyBehavior>
              <Tab>
                <Box>
                  Pinning
                  <Icon as={LaunchIcon} sx={{ fontSize: '1rem' }} />
                </Box>
              </Tab>
            </Link>
            <Link href="/docs/examples/virtualized" passHref legacyBehavior>
              <Tab>
                <Box>
                  Virtualization
                  <Icon as={LaunchIcon} sx={{ fontSize: '1rem' }} />
                </Box>
              </Tab>
            </Link>
            <Link href="/docs/examples" passHref legacyBehavior>
              <Tab>
                <Box>
                  More Examples
                  <Icon as={LaunchIcon} sx={{ fontSize: '1rem' }} />
                </Box>
              </Tab>
            </Link>
          </TabList>
        </Tabs>
      </Box>
      <Box>
        {activeTab === 'basic' && <BasicExample showTopRow={isPage} />}
        {activeTab === 'minimal' && <MinimalExample showTopRow={isPage} />}
        {activeTab === 'advanced' && <AdvancedExample showTopRow={isPage} />}
        {activeTab === 'custom-headless' && (
          <CustomHeadlessExample showTopRow={isPage} />
        )}
      </Box>
    </>
  );
};

export default BasicExamples;
