import React from 'react';
import {
  Table,
  type TableFooterProps as ChakraTableFooterProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface TableFooterProps extends ChakraTableFooterProps, WithSxProps {
  component?: React.ElementType;
}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ component, sx, children, ...props }, ref) => {
    const sxStyles = useSxProp(sx);

    return (
      <Table.Footer ref={ref} as={component} css={sxStyles} {...props}>
        {children}
      </Table.Footer>
    );
  },
);

TableFooter.displayName = 'TableFooter';

export default TableFooter;
export { TableFooter };
export type { TableFooterProps };
