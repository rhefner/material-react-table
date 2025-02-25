import { useMemo } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  useMaterialReactTable,
} from 'chakra-react-table';
import { Box, Button, IconButton } from '@chakra-ui/react';
import { FiPrinter } from 'react-icons/fi';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
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
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    positionToolbarAlertBanner: 'bottom', //show selected rows count on bottom toolbar
    //add custom action buttons to top-left of top toolbar
    renderTopToolbarCustomActions: ({ table }) => (
      <Box display="flex" gap="1rem" p="4px">
        <Button
          colorScheme="purple"
          onClick={() => {
            alert('Create New Account');
          }}
        >
          Create Account
        </Button>
        <Button
          colorScheme="red"
          isDisabled={!table.getIsSomeRowsSelected()}
          onClick={() => {
            alert('Delete Selected Accounts');
          }}
        >
          Delete Selected Accounts
        </Button>
      </Box>
    ),
    //customize built-in buttons in the top-right of top toolbar
    renderToolbarInternalActions: ({ table }) => (
      <Box>
        {/* add custom button to print table  */}
        <IconButton
          aria-label="Print"
          onClick={() => {
            window.print();
          }}
          icon={<FiPrinter />}
        />
        {/* along-side built-in buttons in whatever order you want them */}
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
