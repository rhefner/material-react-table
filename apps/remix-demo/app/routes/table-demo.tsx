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
  Icon,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleFiltersButton,
  type MRT_DensityState,
  createMRTColumnHelper,
  MRT_ActionMenuItem,
} from 'chakra-react-table';
import { faker } from '@faker-js/faker';
import { HiPencil, HiX } from 'react-icons/hi';

const columnHelper = createMRTColumnHelper<Person>();

// Create a client-side only component for the table
function DataTable() {
  const [data] = useState<Person[]>(() => createData());
  const [density, setDensity] = useState<MRT_DensityState>('comfortable');
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [showGlobalFilter, setShowGlobalFilter] = useState(false);

  // Memoize columns definition
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        size: 80,
        enableColumnFilter: false,
      }),
      columnHelper.accessor('avatar', {
        header: 'Avatar',
        size: 100,
        Cell: ({ cell }) => (
          <Box>
            <img
              src={cell.getValue<string>()}
              alt="avatar"
              style={{ width: 40, height: 40, borderRadius: '50%' }}
            />
          </Box>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('firstName', {
        header: 'First Name',
        filterVariant: 'autocomplete',
      }),
      columnHelper.accessor('lastName', {
        header: 'Last Name',
        filterVariant: 'autocomplete',
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        filterVariant: 'text',
        size: 200,
      }),
      columnHelper.accessor('phoneNumber', {
        header: 'Phone',
        filterVariant: 'text',
        size: 150,
      }),
      columnHelper.accessor('company', {
        header: 'Company',
        filterVariant: 'autocomplete',
        size: 180,
      }),
      columnHelper.accessor('jobTitle', {
        header: 'Job Title',
        filterVariant: 'autocomplete',
        size: 180,
      }),
      columnHelper.accessor('department', {
        header: 'Department',
        filterVariant: 'select',
        size: 150,
      }),
      columnHelper.accessor('salary', {
        header: 'Salary',
        size: 120,
        filterVariant: 'range',
        filterFn: 'betweenInclusive',
        // Cell: ({ cell }) => (
        //   <Box>${cell.getValue<number>().toLocaleString()}</Box>
        // ),
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        size: 200,
        filterVariant: 'text',
      }),
      columnHelper.accessor('city', {
        header: 'City',
        filterVariant: 'autocomplete',
      }),
      columnHelper.accessor('state', {
        header: 'State',
        filterVariant: 'select',
      }),
      columnHelper.accessor('zipCode', {
        header: 'Zip Code',
        size: 100,
        filterVariant: 'text',
      }),
      columnHelper.accessor('age', {
        header: 'Age',
        size: 80,
        filterVariant: 'range',
        filterFn: 'betweenInclusive',
        Cell: ({ cell }) => <Box>{cell.getValue<number>()}</Box>,
      }),
      columnHelper.accessor('subscription', {
        header: 'Subscription',
        filterVariant: 'select',
        size: 120,
        Cell: ({ cell }) => {
          const subscription = cell.getValue<string>();
          let color = 'gray.500';
          if (subscription === 'enterprise') color = 'purple.500';
          if (subscription === 'premium') color = 'gold.500';
          return (
            <Box color={color} fontWeight="medium" textTransform="capitalize">
              {subscription}
            </Box>
          );
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        filterVariant: 'select',
        Cell: ({ cell }) => {
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
      }),
      columnHelper.accessor('visits', {
        header: 'Visits',
        size: 80,
        filterVariant: 'range',
        filterFn: 'betweenInclusive',
      }),
      columnHelper.accessor('progress', {
        header: 'Progress',
        size: 100,
        Cell: ({ cell }) => {
          const progress = cell.getValue<number>();
          let color = 'gray.500';
          if (progress > 75) color = 'green.500';
          else if (progress > 50) color = 'blue.500';
          else if (progress > 25) color = 'yellow.500';
          else color = 'red.500';
          return <Box color={color}>{progress.toFixed(1)}%</Box>;
        },
      }),
      columnHelper.accessor('lastLogin', {
        header: 'Last Login',
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleString(),
        size: 180,
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
        size: 150,
      }),
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
    enablePagination: false,
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
    enableTopToolbar: true,
    enableBottomToolbar: true,
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
      <ButtonGroup spacing={1} size="xs">
        <IconButton aria-label="Edit" colorScheme="blue">
          <Icon as={HiPencil} />
        </IconButton>
        <IconButton aria-label="Delete" colorScheme="red">
          <Icon as={HiX} />
        </IconButton>
      </ButtonGroup>
    ),
    renderCellActionMenuItems: ({ internalMenuItems, table }) => [
      ...internalMenuItems,
      <MRT_ActionMenuItem
        key={1}
        label="Item 1"
        onClick={() => {
          alert('Cell Action Menu Item 1 clicked');
        }}
        icon={<Icon as={HiX} />}
        table={table}
      />,
      <MRT_ActionMenuItem
        key={2}
        label="Item 2"
        icon={<Icon as={HiX} />}
        onClick={() => {
          alert('Cell Action Menu Item 2 clicked');
        }}
        table={table}
      />,
    ],
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
          <DataTable />
          {/* <ClientOnly fallback={<TableLoading />}>
            {() => <DataTable />}
          </ClientOnly> */}
        </Box>
      </VStack>
    </Container>
  );
}

// function TableLoading() {
//   return (
//     <Stack>
//       <Skeleton height="20px" />
//       <Skeleton height="20px" />
//       <Skeleton height="20px" />
//       <Skeleton height="30px" />
//       <Flex align="center" justify="center">
//         <Skeleton
//           height="40px"
//           flex="1"
//           roundedTopRight="md"
//           roundedBottomRight="md"
//         />
//         <Heading size="md" mx={8}>
//           Loading...
//         </Heading>
//         <Skeleton
//           height="40px"
//           flex="1"
//           roundedTopLeft="md"
//           roundedBottomLeft="md"
//         />
//       </Flex>
//       <Skeleton height="30px" />
//       <Skeleton height="20px" />
//       <Skeleton height="20px" />
//       <Skeleton height="20px" />
//     </Stack>
//   );
// }

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
  // New fields
  avatar: string;
  company: string;
  jobTitle: string;
  department: string;
  salary: number;
  phoneNumber: string;
  address: string;
  city: string;
  zipCode: string;
  lastLogin: Date;
  subscription: 'basic' | 'premium' | 'enterprise';
  subRows?: Person[];
};

// Create sample data using faker
const createData = (count = 500): Person[] => {
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
      // New field values
      avatar: faker.image.avatar(),
      company: faker.company.name(),
      jobTitle: faker.person.jobTitle(),
      department: faker.commerce.department(),
      salary: faker.number.int({ min: 30000, max: 200000 }),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      lastLogin: faker.date.recent(),
      subscription: faker.helpers.arrayElement([
        'basic',
        'premium',
        'enterprise',
      ]),
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
          // New field values for subRows
          avatar: faker.image.avatar(),
          company: person.company,
          jobTitle: 'Student',
          department: person.department,
          salary: 0,
          phoneNumber: faker.phone.number(),
          address: person.address,
          city: person.city,
          zipCode: person.zipCode,
          lastLogin: faker.date.recent(),
          subscription: 'basic',
        }));
    }

    data.push(person);
  }
  return data;
};
