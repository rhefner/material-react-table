import { useMemo } from 'react';
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'chakra-react-table';
import { data, type Person } from './makeData';
import { Divider } from '@chakra-ui/react';
import { EmailIcon, NotAllowedIcon } from '@chakra-ui/icons';

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

  const table = useMaterialReactTable({
    columns,
    data,
    enableCellActions: true,
    enableClickToCopy: 'context-menu',
    enableEditing: true,
    editDisplayMode: 'cell',
    renderCellActionMenuItems: ({ closeMenu, table, internalMenuItems }) => [
      ...internalMenuItems,
      <Divider key="divider" />,
      <MRT_ActionMenuItem
        icon={<EmailIcon />}
        key={1}
        label="Item 1"
        onClick={() => {
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        icon={<NotAllowedIcon />}
        key={2}
        label="Item 2"
        onClick={() => {
          closeMenu();
        }}
        table={table}
      />,
    ],
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
