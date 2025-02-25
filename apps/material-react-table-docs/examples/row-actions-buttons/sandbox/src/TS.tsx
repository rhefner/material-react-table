import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'chakra-react-table';
import { Box, IconButton } from '@chakra-ui/react';
import { MdEdit, MdDelete, MdEmail } from 'react-icons/md';
import { data as initialData, type Person } from './makeData';

export const Example = () => {
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
        accessorKey: 'address',
        header: 'Address',
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

  const [data, setData] = useState<Person[]>(initialData);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      layoutMode="grid"
      displayColumnDefOptions={{
        'mrt-row-actions': {
          size: 180, //if using layoutMode that is not 'semantic', the columns will not auto-size, so you need to set the size manually
          grow: false,
        },
      }}
      enableRowActions
      renderRowActions={({ row, table }) => (
        <Box display="flex" flexWrap="nowrap" gap="8px">
          <IconButton
            colorScheme="blue"
            aria-label="Email"
            icon={<MdEmail />}
            onClick={() =>
              window.open(
                `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`,
              )
            }
          />
          <IconButton
            colorScheme="purple"
            aria-label="Edit"
            icon={<MdEdit />}
            onClick={() => {
              table.setEditingRow(row);
            }}
          />
          <IconButton
            colorScheme="red"
            aria-label="Delete"
            icon={<MdDelete />}
            onClick={() => {
              data.splice(row.index, 1); //assuming simple data table
              setData([...data]);
            }}
          />
        </Box>
      )}
    />
  );
};

export default Example;
