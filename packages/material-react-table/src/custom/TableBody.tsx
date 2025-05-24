import React from 'react';
import {
  Table,
  type TableBodyProps as ChakraTableBodyProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface TableBodyProps extends ChakraTableBodyProps, WithSxProps {
  component?: React.ElementType;
}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ component, sx, children, ...props }, ref) => {
    const sxStyles = useSxProp(sx);

    return (
      <Table.Body ref={ref} as={component} css={sxStyles} {...props}>
        {children}
      </Table.Body>
    );
  },
);

TableBody.displayName = 'TableBody';

export default TableBody;
export { TableBody };
export type { TableBodyProps };
