import React from 'react';
import {
  Table,
  type TableRowProps as ChakraTableRowProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface TableRowProps extends ChakraTableRowProps, WithSxProps {
  hover?: boolean;
  selected?: boolean;
  component?: React.ElementType;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ hover, selected, component, sx, children, ...props }, ref) => {
    // Handle sx prop
    const sxStyles = useSxProp(sx);

    return (
      <Table.Row
        ref={ref}
        as={component}
        bg={selected ? 'blue.50' : undefined}
        _hover={hover ? { bg: 'gray.50' } : {}}
        _dark={{
          bg: selected ? 'blue.900' : undefined,
          _hover: hover ? { bg: 'gray.700' } : {},
        }}
        css={sxStyles}
        {...props}
      >
        {children}
      </Table.Row>
    );
  },
);

TableRow.displayName = 'TableRow';

export default TableRow;
export { TableRow };
export type { TableRowProps };
