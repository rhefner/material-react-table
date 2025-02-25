//Import Material React Table and its Types
import { MaterialReactTable, type MRT_ColumnDef } from 'chakra-react-table';

//Import Material React Table Translations
import { MRT_Localization_FI } from 'chakra-react-table/locales/fi';

//mock data
import { data, type Person } from './makeData';

const columns: MRT_ColumnDef<Person>[] = [
  //column definitions...
  {
    accessorKey: 'firstName',
    header: 'Etunimi',
  },
  {
    accessorKey: 'lastName',
    header: 'Sukunimi',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'age',
    header: 'Ikä',
  },
  //end
];

const Example = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      enableColumnOrdering
      enableEditing
      enableColumnPinning
      enableRowActions
      enableRowSelection
      enableSelectAll={false}
      initialState={{ showColumnFilters: true, showGlobalFilter: true }}
      localization={MRT_Localization_FI}
    />
  );
};

//App.tsx or similar
import { ThemeProvider, useTheme } from '@chakra-ui/react';

const ExampleWithThemeProvider = () => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={theme}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
