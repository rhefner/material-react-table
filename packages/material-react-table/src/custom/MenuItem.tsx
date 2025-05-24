import React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface MenuItemProps extends BoxProps, WithSxProps {
  disabled?: boolean;
  selected?: boolean;
  dense?: boolean;
  divider?: boolean;
  value?: any;
  autoFocus?: boolean;
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      disabled,
      selected,
      dense,
      divider,
      value,
      autoFocus,
      sx,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const sxStyles = useSxProp(sx);

    return (
      <Box
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        data-value={value}
        px={dense ? 2 : 3}
        py={dense ? 1 : 2}
        minH={dense ? 8 : 10}
        display="flex"
        alignItems="center"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        bg={selected ? 'blue.50' : 'transparent'}
        color={disabled ? 'gray.400' : selected ? 'blue.600' : 'gray.700'}
        opacity={disabled ? 0.6 : 1}
        borderBottom={divider ? '1px solid' : 'none'}
        borderBottomColor="gray.200"
        _hover={
          !disabled
            ? {
                bg: selected ? 'blue.100' : 'gray.50',
              }
            : {}
        }
        _focus={{
          bg: selected ? 'blue.100' : 'gray.100',
          outline: 'none',
        }}
        _dark={{
          bg: selected ? 'blue.900' : 'transparent',
          color: disabled ? 'gray.500' : selected ? 'blue.200' : 'gray.200',
          borderBottomColor: 'gray.600',
          _hover: !disabled
            ? {
                bg: selected ? 'blue.800' : 'gray.700',
              }
            : {},
          _focus: {
            bg: selected ? 'blue.800' : 'gray.600',
          },
        }}
        onClick={disabled ? undefined : onClick}
        css={sxStyles}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
export { MenuItem };
