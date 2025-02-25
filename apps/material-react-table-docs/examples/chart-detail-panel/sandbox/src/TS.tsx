import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'chakra-react-table';
import { useTheme, useColorMode, Box } from '@chakra-ui/react';
import { data, type Person } from './makeData';

const Example = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
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
    initialState: { expanded: { 0: true } },
    muiTableBodyRowProps: {
      sx: {
        '.Mui-TableBodyCell-DetailPanel': {
          backgroundColor:
            colorMode === 'dark'
              ? theme.colors.gray[900]
              : theme.colors.gray[100],
        },
      },
    },
    renderDetailPanel: ({ row }) => (
      <Box>TBD</Box>
      // <LineChart
      //   xAxis={[
      //     {
      //       data: row.original.gamesPlayed,
      //       label: 'Games Played',
      //       valueFormatter: (value) => `#${value}`,
      //       tickLabelInterval: (value) => value % 1 === 0,
      //     },
      //   ]}
      //   yAxis={[{ min: 0, max: 60 }]}
      //   series={[
      //     {
      //       color: theme.colors.blue['500'],
      //       data: row.original.points,
      //       label: 'Points',
      //     },
      //     {
      //       color: theme.colors.gray['500'],
      //       data: row.original.assists,
      //       label: 'Assists',
      //     },
      //     {
      //       color: theme.colors.red['500'],
      //       data: row.original.turnovers,
      //       label: 'Turnovers',
      //     },
      //   ]}
      //   height={250}
      // />
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
