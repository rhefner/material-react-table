import React from 'react';
import {
  Table,
  type TableScrollAreaProps as ChakraTableScrollAreaProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface TableContainerProps
  extends ChakraTableScrollAreaProps,
    WithSxProps {
  component?: React.ElementType;
}

const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>(
  ({ component, sx, children, ...props }, ref) => {
    const sxStyles = useSxProp(sx);

    return (
      <Table.ScrollArea ref={ref} as={component} css={sxStyles} {...props}>
        {children}
      </Table.ScrollArea>
    );
  },
);

TableContainer.displayName = 'TableContainer';

export default TableContainer;
export { TableContainer };
export type { TableContainerProps };
