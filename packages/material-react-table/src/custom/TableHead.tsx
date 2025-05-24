import React from 'react';
import {
  Table,
  type TableHeaderProps as ChakraTableHeaderProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface TableHeadProps extends ChakraTableHeaderProps, WithSxProps {
  component?: React.ElementType;
}

const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ component, sx, children, ...props }, ref) => {
    const sxStyles = useSxProp(sx);

    return (
      <Table.Header ref={ref} as={component} css={sxStyles} {...props}>
        {children}
      </Table.Header>
    );
  },
);

TableHead.displayName = 'TableHead';

export default TableHead;
export { TableHead };
export type { TableHeadProps };
