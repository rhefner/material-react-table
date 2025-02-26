import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Switch,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleFiltersButton,
  type MRT_Cell,
  type MRT_DensityState,
} from 'chakra-react-table';
import { ClientOnly } from 'remix-utils/client-only';
import { faker } from '@faker-js/faker';

// Define a type for our data
type Person = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  state: string;
  visits: number;
  status: 'active' | 'inactive' | 'pending';
  progress: number;
  createdAt: Date;
  subRows?: Person[];
};

// Create sample data using faker
const createData = (count = 50): Person[] => {
  const data: Person[] = [];
  for (let i = 0; i < count; i++) {
    const person: Person = {
      id: i + 1,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
      state: faker.location.state(),
      visits: faker.number.int({ min: 1, max: 100 }),
      status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
      progress: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      createdAt: faker.date.past(),
    };

    // Add sub-rows for some entries (about 20%)
    if (Math.random() > 0.8) {
      person.subRows = Array(Math.floor(Math.random() * 3) + 1)
        .fill(null)
        .map((_, subIndex) => ({
          id: (i + 1) * 1000 + subIndex,
          firstName: faker.person.firstName(),
          lastName: person.lastName, // Same last name for "family members"
          email: faker.internet.email(),
          age: faker.number.int({ min: 1, max: 17 }), // Children are under 18
          state: person.state, // Same state as parent
          visits: faker.number.int({ min: 1, max: 20 }),
          status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
          progress: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
          createdAt: faker.date.recent(),
        }));
    }

    data.push(person);
  }
  return data;
};

// Create a client-side only component for the table
function DataTable() {
  const [data] = useState<Person[]>(() => createData());
  const [density, setDensity] = useState<MRT_DensityState>('comfortable');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [showGlobalFilter, setShowGlobalFilter] = useState(false);

  // Memoize columns definition
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        filterVariant: 'autocomplete',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        filterVariant: 'autocomplete',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        filterVariant: 'text',
        size: 200,
      },
      {
        accessorKey: 'age',
        header: 'Age',
        size: 80,
        filterVariant: 'range',
        filterFn: 'betweenInclusive',
        Cell: ({ cell }: { cell: MRT_Cell<Person> }) => (
          <Box>{cell.getValue<number>()}</Box>
        ),
      },
      {
        accessorKey: 'state',
        header: 'State',
        filterVariant: 'select',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        filterVariant: 'select',
        Cell: ({ cell }: { cell: MRT_Cell<Person> }) => {
          const status = cell.getValue<string>();
          let color = 'gray.500';
          if (status === 'active') color = 'green.500';
          if (status === 'inactive') color = 'red.500';
          if (status === 'pending') color = 'orange.500';
          return (
            <Box color={color} fontWeight="bold">
              {status}
            </Box>
          );
        },
      },
      {
        accessorKey: 'visits',
        header: 'Visits',
        size: 80,
        filterVariant: 'range',
        filterFn: 'betweenInclusive',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 100,
        Cell: ({ cell }: { cell: MRT_Cell<Person> }) => {
          const progress = cell.getValue<number>();
          let color = 'gray.500';
          if (progress > 75) color = 'green.500';
          else if (progress > 50) color = 'blue.500';
          else if (progress > 25) color = 'yellow.500';
          else color = 'red.500';
          return <Box color={color}>{progress.toFixed(1)}%</Box>;
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        filterVariant: 'date-range',
        Cell: ({ cell }: { cell: MRT_Cell<Person> }) =>
          cell.getValue<Date>().toLocaleDateString(),
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableSorting: true,
    enableExpandAll: true,
    enableColumnResizing: true,
    enablePagination: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enablePinning: true,
    enableRowActions: true,
    enableColumnFilterModes: true,
    enableColumnVirtualization: true,
    enableRowVirtualization: true,
    enableStickyHeader: true,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
      density,
      showColumnFilters,
      showGlobalFilter,
    },
    muiPaginationProps: {
      showRowsPerPage: true,
      rowsPerPageOptions: [5, 10, 20, 50, 100],
    },
    positionToolbarAlertBanner: 'bottom',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Actions',
        size: 100,
      },
    },
    renderRowActions: () => (
      <HStack spacing={2}>
        <Button size="sm" colorScheme="blue">
          Edit
        </Button>
        <Button size="sm" colorScheme="red">
          Delete
        </Button>
      </HStack>
    ),
  });

  return (
    <VStack spacing={4} align="stretch">
      <Stack
        direction={['column', 'row']}
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bg="gray.100"
        _dark={{ bg: 'gray.700' }}
        borderRadius="md"
      >
        <HStack spacing={4}>
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ToggleGlobalFilterButton table={table} />
        </HStack>
        <HStack spacing={4}>
          <HStack>
            <Text>Dense Padding</Text>
            <Switch
              isChecked={density === 'compact'}
              onChange={() =>
                setDensity(density === 'compact' ? 'comfortable' : 'compact')
              }
            />
          </HStack>
          <HStack>
            <Text>Column Filters</Text>
            <Switch
              isChecked={showColumnFilters}
              onChange={() => setShowColumnFilters(!showColumnFilters)}
            />
          </HStack>
          <HStack>
            <Text>Global Filter</Text>
            <Switch
              isChecked={showGlobalFilter}
              onChange={() => setShowGlobalFilter(!showGlobalFilter)}
            />
          </HStack>
        </HStack>
      </Stack>
      <MaterialReactTable table={table} />
    </VStack>
  );
}

export default function TableDemo() {
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Chakra React Table Demo
          </Heading>
          <Text fontSize="lg" color={textColor}>
            A demonstration of chakra-react-table integration with Remix
            (Kitchen Sink Example)
          </Text>
        </Box>

        <Box p={4} borderRadius="md" shadow="md">
          <ClientOnly fallback={<Box p={4}>Loading table...</Box>}>
            {() => <DataTable />}
          </ClientOnly>
        </Box>
      </VStack>
    </Container>
  );
}
