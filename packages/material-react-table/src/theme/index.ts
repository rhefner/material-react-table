import { ThemeComponents, extendTheme } from '@chakra-ui/react';

// Import types
import { MRTChakraTheme, MRTChakraThemeOverride } from './types';

// Import default theme
import { createBaseTheme } from './defaultTheme';

// Import component styles
import { tableStyles } from './components/table';
import { tableCellStyles } from './components/tableCell';
import { tableHeadStyles } from './components/tableHead';
import { toolbarStyles } from './components/toolbar';
import { paginationStyles } from './components/pagination';
import { filterStyles } from './components/filter';
import { detailPanelStyles } from './components/detailPanel';
import { tableRowStyles } from './tableRow';

/**
 * Creates a Chakra UI theme extension for Material React Table
 *
 * @param themeOverride Optional theme overrides to customize the MRT theme
 * @returns A Chakra UI theme with MRT components
 */
export function createMRTChakraTheme(
  themeOverride?: MRTChakraThemeOverride,
): MRTChakraTheme {
  // Get the base theme configuration
  const baseTheme = createBaseTheme();

  // Define MRT component styles
  const components: ThemeComponents = {
    MRTTable: {
      baseStyle: {
        width: '100%',
        tableLayout: 'fixed',
        borderCollapse: 'separate',
        borderSpacing: 0,
      },
    },
    MRTTablePaper: {
      baseStyle: {
        borderRadius: 'md',
        boxShadow: 'md',
        overflow: 'hidden',
      },
    },
    MRTTableContainer: {
      baseStyle: {
        maxWidth: '100%',
        overflow: 'auto',
        position: 'relative',
      },
    },
    MRTTableHead: {
      baseStyle: {
        position: 'relative',
        zIndex: 1,
      },
    },
    MRTTableHeadRow: {
      baseStyle: {
        outline: 'none',
      },
    },
    MRTTableHeadCell: {
      baseStyle: {
        fontWeight: 'bold',
        textAlign: 'left',
        outline: 'none',
        padding: 4,
        position: 'relative',
        transition: 'all 100ms ease-in-out',
      },
    },
    MRTTableBody: {
      baseStyle: {
        position: 'relative',
        zIndex: 0,
      },
    },
    MRTTableRow: tableRowStyles,
    MRTTableCell: tableCellStyles,
    MRTToolbar: toolbarStyles,
    MRTPagination: paginationStyles,
    MRTFilter: filterStyles,
    MRTDetailPanel: detailPanelStyles,
  };

  // Extend theme with MRT components and any overrides
  return extendTheme({
    ...baseTheme,
    components,
    ...themeOverride,
  }) as MRTChakraTheme;
}

// Export types
export * from './types';
export * from './defaultTheme';
export * from './utils';
export * from './MRTChakraProvider';
export * from './useMRTTheme';
export * from './MRTThemeContext';

// Export all style objects for individual usage
export {
  tableStyles,
  tableCellStyles,
  tableHeadStyles,
  toolbarStyles,
  paginationStyles,
  filterStyles,
  detailPanelStyles,
  tableRowStyles,
};
