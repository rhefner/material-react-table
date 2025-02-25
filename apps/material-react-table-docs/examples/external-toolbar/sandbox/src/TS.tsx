import {
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer,
} from 'chakra-react-table';
import { Box, Button, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { FiPrinter } from 'react-icons/fi';
import { data, type Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
  },
];

const Example = () => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    initialState: { showGlobalFilter: true },
  });

  return (
    <Box border="gray 2px dashed" padding="16px">
      {/* Our Custom External Top Toolbar */}
      <Box
        display="flex"
        backgroundColor="inherit"
        borderRadius="4px"
        flexDirection="row"
        gap="16px"
        justifyContent="space-between"
        padding="24px 16px"
        sx={{
          '@media max-width: 768px': {
            flexDirection: 'column',
          },
        }}
      >
        <Box>
          <Button
            colorScheme="blue"
            onClick={() => {
              alert('Add User');
            }}
          >
            Create New Account
          </Button>
        </Box>
        <MRT_GlobalFilterTextField table={table} />
        <Box display="flex" alignItems="center" gap="8px">
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
          <Tooltip label="Print">
            <IconButton
              aria-label="Print"
              icon={<FiPrinter />}
              onClick={() => window.print()}
            />
          </Tooltip>
        </Box>
      </Box>
      {/* Some Page Content */}
      <Text p="16px 4px">
        {
          "Hey I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
        }
      </Text>
      {/* The MRT Table with no toolbars built-in */}
      <MRT_TableContainer table={table} />
      {/* Our Custom Bottom Toolbar */}
      <Box>
        <Box display="flex" justifyContent="flex-end">
          <MRT_TablePagination table={table} />
        </Box>
        <Box display="grid" width="100%">
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Box>
      </Box>
    </Box>
  );
};

export default Example;
