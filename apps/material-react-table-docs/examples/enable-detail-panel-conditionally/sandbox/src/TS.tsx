import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'chakra-react-table';
import { Box, Text } from '@chakra-ui/react';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
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
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: false, //disable expand all button
    muiDetailPanelProps: () => ({
      sx: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        _dark: {
          backgroundColor: 'rgba(255,210,244,0.1)',
        },
      },
    }),
    //custom expand button rotation
    muiExpandButtonProps: ({ row, table }) => ({
      'aria-label': 'Expand/Collapse Row',
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    }),
    //conditionally render detail panel
    renderDetailPanel: ({ row }) =>
      row.original.address ? (
        <Box
          display="grid"
          margin="auto"
          gridTemplateColumns="1fr 1fr"
          width="100%"
        >
          <Text>Address: {row.original.address}</Text>
          <Text>City: {row.original.city}</Text>
          <Text>State: {row.original.state}</Text>
          <Text>Country: {row.original.country}</Text>
        </Box>
      ) : null,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
