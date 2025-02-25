import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'chakra-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        footer: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        footer: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        footer: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'City',
        footer: 'City',
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: false,
    muiTableContainerProps: { sx: { maxHeight: '400px' } },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor:
          colorMode === 'dark' ? theme.colors.gray[900] : theme.colors.gray[50],
      }),
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
