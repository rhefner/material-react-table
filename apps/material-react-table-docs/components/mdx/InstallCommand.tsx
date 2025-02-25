import { useState } from 'react';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { SampleCodeSnippet } from './SampleCodeSnippet';

type TabType = 'npm' | 'pnpm' | 'yarn' | 'bun';

const defaultPackagesString =
  'chakra-react-table @chakra-ui/react @chakra-ui/icons @emotion/react @emotion/styled framer-motion';

export const InstallCommand = ({
  packagesString = defaultPackagesString,
  ...rest
}) => {
  const [tab, setTab] = useState<TabType>('npm');

  return (
    <>
      <Tabs
        colorScheme="teal"
        value={tab}
        onChange={(index) => {
          const tabs: TabType[] = ['npm', 'pnpm', 'yarn', 'bun'];
          setTab(tabs[index]);
        }}
        {...rest}
      >
        <TabList>
          <Tab>NPM</Tab>
          <Tab>PNPM</Tab>
          <Tab>Yarn</Tab>
          <Tab>Bun</Tab>
        </TabList>
      </Tabs>
      <SampleCodeSnippet
        className="language-bash"
        margin="0"
        style={{ overflowX: 'hidden' }}
        paperSxProps={{
          '& .token-line': {
            overflowX: 'auto',
          },
        }}
      >
        {tab === 'npm'
          ? `npm i ${packagesString}`
          : tab === 'pnpm'
            ? `pnpm add ${packagesString}`
            : tab === 'yarn'
              ? `yarn add ${packagesString}`
              : `bun add ${packagesString}`}
      </SampleCodeSnippet>
    </>
  );
};
