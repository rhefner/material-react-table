import {Box, Text} from '@chakra-ui/react';
import { SourceCodeSnippet } from '../mdx/SourceCodeSnippet';
const TS = require('!!raw-loader!./TableOptionsTable.tsx').default;

const ExampleTable = () => {
  return (
    <Box sx={{ mt: '20rem' }}>
      <Typography>
        Wanna see the source code for this table? Check it out down below!
      </Typography>
      <SourceCodeSnippet tableId="root-props" typeScriptCode={TS} />
    </Box>
  );
};

export default ExampleTable;
