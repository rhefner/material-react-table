import { useRouter } from 'next/router';
import { Box, Tabs, TabList, Tab } from '@chakra-ui/react';
import CSVExport from '../examples/export-to-csv';
import PDFExport from '../examples/export-to-pdf';
import { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

const RemoteFetchingExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const tabValues = ['export-csv', 'export-pdf', 'more'];
  const initialTab = isPage
    ? pathname.split('/').pop() || 'export-csv'
    : 'export-csv';
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabIndex = tabValues.indexOf(activeTab);

  const handleTabsChange = (index) => {
    const newValue = tabValues[index];
    if (isPage && newValue !== 'more') {
      push(newValue);
    } else {
      setActiveTab(newValue);
    }
  };

  return (
    <>
      <Box borderBottom="1px" borderColor="gray.200">
        <Tabs index={tabIndex} onChange={handleTabsChange} variant="line">
          <TabList>
            <Tab>Export to CSV</Tab>
            <Tab>Export to PDF</Tab>
            <Link href="/docs/examples" passHref legacyBehavior>
              <Tab as="a">
                <Box display="flex" alignItems="center">
                  More Examples{' '}
                  <FiExternalLink
                    style={{ marginLeft: '4px', fontSize: '1rem' }}
                  />
                </Box>
              </Tab>
            </Link>
          </TabList>
        </Tabs>
      </Box>
      <Box>
        {activeTab === 'export-csv' && <CSVExport />}
        {activeTab === 'export-pdf' && <PDFExport />}
      </Box>
    </>
  );
};

export default RemoteFetchingExamples;
