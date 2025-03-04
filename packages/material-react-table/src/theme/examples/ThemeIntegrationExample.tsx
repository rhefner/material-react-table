import React, { ReactNode } from 'react';
import { Box, useColorMode, Button, BoxProps } from '@chakra-ui/react';
import {
  colorModeValue,
  getMRTCommonStyles,
  useMRTComponentStyles,
} from '../themeUtils';
import { MRTChakraProvider } from '../MRTChakraProvider';

/**
 * Props interface for the MRT_ExampleTableCell component
 */
interface MRT_ExampleTableCellProps extends BoxProps {
  children: ReactNode;
  isHead?: boolean;
  variant?: string;
  muiTableCellProps?: Record<string, any>;
}

/**
 * Example of a migrated MRT component that uses our theme system
 * This demonstrates how to apply theming to components during migration
 */
const MRT_ExampleTableCell = ({
  children,
  isHead = false,
  variant,
  // Preserve original Material UI prop names for backward compatibility
  muiTableCellProps = {},
  ...rest
}: MRT_ExampleTableCellProps) => {
  // Apply appropriate component styles based on whether it's a header or regular cell
  const componentType = isHead ? 'MRTTableHead' : 'MRTTableCell';
  const variantName = variant || (isHead ? 'head' : 'normal');

  // Get styles and color mode from our theme system
  const { styles, isDark } = useMRTComponentStyles(componentType, variantName);

  // Create a safe subset of props for Chakra UI (this would filter out MUI-specific props)
  const safeProps = { ...muiTableCellProps };

  return (
    <Box
      as={isHead ? 'th' : 'td'}
      __css={styles}
      data-color-mode={isDark ? 'dark' : 'light'}
      px={4}
      py={2}
      borderBottomWidth="1px"
      borderColor={colorModeValue('gray.200', 'gray.700')}
      {...safeProps}
      {...rest}
    >
      {children}
    </Box>
  );
};

/**
 * Props interface for the MRT_ExampleToolbar component
 */
interface MRT_ExampleToolbarProps extends BoxProps {
  children: ReactNode;
}

/**
 * Example of a migrated MRT component that uses common styles from our theme system
 */
const MRT_ExampleToolbar = ({ children, ...rest }: MRT_ExampleToolbarProps) => {
  // Use the useTheme hook and getMRTCommonStyles utility to get common styles
  const { colorMode } = useColorMode();
  const styles = getMRTCommonStyles(undefined, colorMode);

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={2}
      bg={colorModeValue('gray.50', 'gray.700')}
      borderBottomWidth="1px"
      borderColor={colorModeValue('gray.200', 'gray.600')}
      {...rest}
    >
      {children}
    </Box>
  );
};

/**
 * Root example component that demonstrates how to use our theme system
 * This wraps everything in the MRTChakraProvider to provide theme context
 */
export const ThemeIntegrationExample = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MRTChakraProvider>
      <Box p={4}>
        <Button onClick={toggleColorMode} mb={4}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>

        {/* Example table with themed components */}
        <Box
          as="table"
          width="100%"
          borderWidth="1px"
          borderRadius="md"
          borderColor={colorModeValue('gray.200', 'gray.700')}
          overflow="hidden"
        >
          {/* Toolbar example */}
          <MRT_ExampleToolbar>
            <Box fontWeight="bold">Example Table</Box>
            <Box>Toolbar Actions</Box>
          </MRT_ExampleToolbar>

          {/* Table header */}
          <Box as="thead">
            <Box as="tr">
              <MRT_ExampleTableCell
                isHead
                variant="head"
                muiTableCellProps={{}}
              >
                ID
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell
                isHead
                variant="head"
                muiTableCellProps={{}}
              >
                Name
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell
                isHead
                variant="head"
                muiTableCellProps={{}}
              >
                Email
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell
                isHead
                variant="head"
                muiTableCellProps={{}}
              >
                Role
              </MRT_ExampleTableCell>
            </Box>
          </Box>

          {/* Table body */}
          <Box as="tbody">
            {/* Example row 1 */}
            <Box as="tr" _hover={{ bg: colorModeValue('gray.50', 'gray.700') }}>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                1
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                John Doe
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                john@example.com
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                Admin
              </MRT_ExampleTableCell>
            </Box>

            {/* Example row 2 */}
            <Box as="tr" _hover={{ bg: colorModeValue('gray.50', 'gray.700') }}>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                2
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                Jane Smith
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                jane@example.com
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                User
              </MRT_ExampleTableCell>
            </Box>

            {/* Example row 3 */}
            <Box as="tr" _hover={{ bg: colorModeValue('gray.50', 'gray.700') }}>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                3
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                Bob Johnson
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                bob@example.com
              </MRT_ExampleTableCell>
              <MRT_ExampleTableCell variant="normal" muiTableCellProps={{}}>
                Editor
              </MRT_ExampleTableCell>
            </Box>
          </Box>
        </Box>

        <Box
          mt={4}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          borderColor={colorModeValue('gray.200', 'gray.700')}
        >
          <Box fontWeight="bold" mb={2}>
            Integration Notes:
          </Box>
          <Box>
            <ul>
              <li>
                The example components above demonstrate how to use our theme
                system with migrated MRT components.
              </li>
              <li>
                Original prop names like `muiTableCellProps` are preserved for
                backward compatibility.
              </li>
              <li>
                The `useMRTComponentStyles` hook provides theme values and
                helper functions.
              </li>
              <li>
                The `colorModeValue` function simplifies conditional styling
                based on color mode.
              </li>
              <li>
                The `data-color-mode` attribute helps with color mode in
                virtualized components.
              </li>
            </ul>
          </Box>
        </Box>
      </Box>
    </MRTChakraProvider>
  );
};
