import React from 'react';
import { 
  Table as ChakraTable,
  type TableRootProps
} from '@chakra-ui/react';

export interface TableProps extends TableRootProps {
  size?: 'small' | 'medium';
  stickyHeader?: boolean;
  padding?: 'checkbox' | 'none' | 'normal';
  children?: React.ReactNode;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ 
    size = 'medium',
    stickyHeader,
    padding = 'normal',
    children,
    ...props 
  }, ref) => {
    
    const chakraSize = size === 'small' ? 'sm' : 'md';
    
    return (
      <ChakraTable.Root
        ref={ref}
        size={chakraSize}
        variant="simple"
        {...props}
      >
        <ChakraTable.ScrollArea>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              position: stickyHeader ? 'relative' : 'static',
            }}
          >
            {children}
          </table>
        </ChakraTable.ScrollArea>
      </ChakraTable.Root>
    );
  }
);

Table.displayName = 'Table';

export default Table;
export { Table };
export type { TableProps };
