import React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface ListItemIconProps extends BoxProps, WithSxProps {
  alignItems?: 'flex-start' | 'flex-end' | 'center';
}

const ListItemIcon = React.forwardRef<HTMLDivElement, ListItemIconProps>(
  ({ 
    alignItems = 'center',
    sx,
    children,
    ...props 
  }, ref) => {
    
    const sxStyles = useSxProp(sx);

    return (
      <Box
        ref={ref}
        display="flex"
        alignItems={alignItems}
        justifyContent="center"
        minW={6}
        mr={2}
        color="gray.500"
        _dark={{
          color: 'gray.400'
        }}
        css={sxStyles}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

ListItemIcon.displayName = 'ListItemIcon';

export default ListItemIcon;
export { ListItemIcon };
export type { ListItemIconProps };
