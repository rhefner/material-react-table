import {Box, Text} from '@chakra-ui/react';
import { SourceCodeSnippet } from '../mdx/SourceCodeSnippet';
const TS = require('!!raw-loader!./ColumnOptionsTable.tsx').default;

const ExampleTable = () => {
  return (
    <Box sx={{ mt: '20rem' }}>
      <Typography>
        Wanna see the source code for this table? Check it out down below!
      </Typography>
      <SourceCodeSnippet tableId="column-options" typeScriptCode={TS} />
    </Box>
  );
};

export default ExampleTable;
