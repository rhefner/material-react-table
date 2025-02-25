import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'chakra-react-table';
import { data, type Person } from './makeData';
import { useColorMode, useTheme, Theme } from '@chakra-ui/react';

const Example = () => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  //light or dark green
  const baseBackgroundColor =
    colorMode === 'dark' ? 'rgba(3, 44, 43, 1)' : 'rgba(244, 255, 233, 1)';

  // Calculate color variations (since we can't use polished library directly)
  const darkened1 =
    colorMode === 'dark' ? 'rgba(2, 33, 32, 1)' : 'rgba(224, 235, 213, 1)';

  const darkened2 =
    colorMode === 'dark' ? 'rgba(1, 22, 21, 1)' : 'rgba(204, 215, 193, 1)';

  const lightened1 =
    colorMode === 'dark' ? 'rgba(4, 55, 54, 1)' : 'rgba(247, 255, 238, 1)';

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 300,
      },
      {
        accessorKey: 'city',
        header: 'City',
      },

      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableRowPinning: true,
    enableRowSelection: true,
    muiTablePaperProps: {
      boxShadow: 'none',
      borderRadius: '0',
    },
    muiTableBodyCellProps: {
      sx: {
        '&[data-row-index="odd"]:not([data-selected="true"]):not([data-pinned="true"])':
          {
            backgroundColor: darkened1,
          },
        '&[data-row-index="odd"]:not([data-selected="true"]):not([data-pinned="true"]):hover':
          {
            backgroundColor: darkened2,
          },
        '&[data-row-index="even"]:not([data-selected="true"]):not([data-pinned="true"])':
          {
            backgroundColor: lightened1,
          },
        '&[data-row-index="even"]:not([data-selected="true"]):not([data-pinned="true"]):hover':
          {
            backgroundColor: darkened2,
          },
      },
    },
    mrtTheme: () => ({
      baseBackgroundColor: baseBackgroundColor,
      draggingBorderColor: theme.colors.purple[500],
    }),
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
