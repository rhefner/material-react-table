import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from 'chakra-react-table';
import { Box, Button } from '@chakra-ui/react';
import { MdFileDownload as FileDownloadIcon } from 'react-icons/md';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import { data, type Person } from './makeData';

const columnHelper = createMRTColumnHelper<Person>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 40,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    size: 120,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    size: 120,
  }),
  columnHelper.accessor('company', {
    header: 'Company',
    size: 300,
  }),
  columnHelper.accessor('city', {
    header: 'City',
  }),
  columnHelper.accessor('country', {
    header: 'Country',
    size: 220,
  }),
];

const Example = () => {
  const handleExportRows = (rows: MRT_Row<Person>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box display="flex" gap="4" p="2" flexWrap="wrap">
        <Button
          leftIcon={<FileDownloadIcon />}
          isDisabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          colorScheme="blue"
        >
          Export All Rows
        </Button>
        <Button
          leftIcon={<FileDownloadIcon />}
          isDisabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          colorScheme="blue"
        >
          Export Page Rows
        </Button>
        <Button
          leftIcon={<FileDownloadIcon />}
          isDisabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          colorScheme="blue"
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
