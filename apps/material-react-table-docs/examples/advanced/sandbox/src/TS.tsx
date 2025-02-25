import { useMemo } from 'react';

// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'chakra-react-table';

// Chakra UI Imports
import {
  Box,
  Button,
  MenuItem,
  Text,
  Image,
  ChakraProvider,
} from '@chakra-ui/react';

// Icons Imports from react-icons
import { FaUserCircle, FaPaperPlane } from 'react-icons/fa';

// Mock Data
import { data } from './makeData';

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        id: 'employee',
        header: 'Employee',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            id: 'name',
            header: 'Name',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box display="flex" alignItems="center" gap="1rem">
                <Image
                  alt="avatar"
                  boxSize="30px"
                  src={row.original.avatar}
                  loading="lazy"
                  borderRadius="full"
                />
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'email',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Email',
            size: 300,
          },
        ],
      },
      {
        id: 'id',
        header: 'Job Info',
        columns: [
          {
            accessorKey: 'salary',
            filterFn: 'between',
            header: 'Salary',
            size: 200,
            Cell: ({ cell }) => (
              <Box
                as="span"
                bg={
                  cell.getValue<number>() < 50000
                    ? 'red.500'
                    : cell.getValue<number>() < 75000
                      ? 'yellow.500'
                      : 'green.500'
                }
                borderRadius="md"
                color="white"
                maxW="9ch"
                p="0.25rem"
              >
                {cell.getValue<number>()?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: 'jobTitle',
            header: 'Job Title',
            size: 350,
          },
          {
            accessorFn: (row) => new Date(row.startDate),
            id: 'startDate',
            header: 'Start Date',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
            Header: ({ column }) => (
              <Text as="em">{column.columnDef.header}</Text>
            ),
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
          },
        ],
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        left="30px"
        maxW="1000px"
        position="sticky"
        width="100%"
      >
        <Image
          alt="avatar"
          boxSize="200px"
          src={row.original.avatar}
          loading="lazy"
          borderRadius="full"
        />
        <Box textAlign="center">
          <Text fontSize="2xl">Signature Catch Phrase:</Text>
          <Text fontSize="4xl">
            &quot;{row.original.signatureCatchPhrase}&quot;
          </Text>
        </Box>
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu();
        }}
      >
        <Box as="span" mr="2">
          <FaUserCircle />
        </Box>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
      >
        <Box as="span" mr="2">
          <FaPaperPlane />
        </Box>
        Send Email
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.getValue('name'));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'));
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('name'));
        });
      };

      return (
        <Box
          bg="gray.50"
          display="flex"
          gap="0.5rem"
          p="8px"
          justifyContent="space-between"
        >
          <Box display="flex" gap="0.5rem" alignItems="center">
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box display="flex" gap="0.5rem">
            <Button
              colorScheme="red"
              isDisabled={!table.getIsSomeRowsSelected()}
              onClick={handleDeactivate}
              variant="solid"
            >
              Deactivate
            </Button>
            <Button
              colorScheme="green"
              isDisabled={!table.getIsSomeRowsSelected()}
              onClick={handleActivate}
              variant="solid"
            >
              Activate
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={!table.getIsSomeRowsSelected()}
              onClick={handleContact}
              variant="solid"
            >
              Contact
            </Button>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

// Wrap the example with ChakraProvider
const ExampleWithChakraProvider = () => (
  <ChakraProvider>
    <Example />
  </ChakraProvider>
);

export default ExampleWithChakraProvider;
