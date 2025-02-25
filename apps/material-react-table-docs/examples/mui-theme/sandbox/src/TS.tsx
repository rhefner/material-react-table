import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'chakra-react-table';
import { ChakraProvider, extendTheme, useColorMode } from '@chakra-ui/react';

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
};

//column definitions...
const columns: MRT_ColumnDef<Person>[] = [
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
];
//end

//data definitions...
const data = [
  {
    firstName: 'Dylan',
    lastName: 'Murray',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    firstName: 'Raquel',
    lastName: 'Kohler',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    firstName: 'Ervin',
    lastName: 'Reinger',
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    firstName: 'Brittany',
    lastName: 'McCullough',
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    firstName: 'Branson',
    lastName: 'Frami',
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];
//end

const Example = () => {
  const { colorMode } = useColorMode();

  // Create a custom Chakra theme
  const customTheme = useMemo(
    () =>
      extendTheme({
        colors: {
          primary: {
            // Use teal as the primary color
            50: '#E6FFFA',
            100: '#B2F5EA',
            200: '#81E6D9',
            300: '#4FD1C5',
            400: '#38B2AC',
            500: '#319795',
            600: '#2C7A7B',
            700: '#285E61',
            800: '#234E52',
            900: '#1D4044',
          },
          info: {
            // Custom color for alerts
            500: 'rgb(255,122,0)',
          },
          // Custom background color
          background: {
            default: colorMode === 'light' ? 'rgb(254,255,244)' : '#000',
          },
        },
        // Customize components
        components: {
          Tooltip: {
            baseStyle: {
              fontSize: '1.1rem',
            },
          },
          Switch: {
            baseStyle: {
              thumb: {
                bg: 'pink.400',
              },
            },
          },
          Button: {
            baseStyle: {
              textTransform: 'none',
              fontSize: '1.2rem',
            },
          },
        },
      }),
    [colorMode],
  );

  return (
    <ChakraProvider theme={customTheme}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        enableColumnOrdering
        enableColumnPinning
      />
    </ChakraProvider>
  );
};

export default Example;
