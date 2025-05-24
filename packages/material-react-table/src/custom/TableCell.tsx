import React from 'react';
import {
  Table,
  type TableCellProps as ChakraTableCellProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface TableCellProps extends ChakraTableCellProps, WithSxProps {
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  padding?: 'normal' | 'checkbox' | 'none';
  scope?: string;
  size?: 'small' | 'medium';
  sortDirection?: 'asc' | 'desc' | false;
  variant?: 'head' | 'body' | 'footer';
  component?: React.ElementType;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      align,
      padding = 'normal',
      scope,
      size = 'medium',
      sortDirection,
      variant = 'body',
      component,
      sx,
      children,
      ...props
    },
    ref,
  ) => {
    // Handle sx prop
    const sxStyles = useSxProp(sx);

    // Determine the element type
    const as = component || (variant === 'head' ? 'th' : 'td');

    // Map padding to Chakra styles
    const paddingStyles =
      padding === 'none'
        ? { p: 0 }
        : padding === 'checkbox'
          ? { p: 1 }
          : size === 'small'
            ? { p: 2 }
            : { p: 3 };

    return (
      <Table.Cell
        ref={ref}
        as={as}
        textAlign={align}
        scope={scope}
        css={sxStyles}
        {...paddingStyles}
        {...props}
      >
        {children}
      </Table.Cell>
    );
  },
);

TableCell.displayName = 'TableCell';

export default TableCell;
export { TableCell };
export type { TableCellProps };
