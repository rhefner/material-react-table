import { type ReactNode } from 'react';
import {
  Box,
  Flex,
  MenuItem,
  MenuDivider,
  IconButton,
  type MenuItemProps,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';

export interface MRT_ActionMenuItemProps<TData extends MRT_RowData>
  extends Omit<MenuItemProps, 'icon'> {
  disabled?: boolean;
  divider?: boolean;
  icon: ReactNode;
  label: string;
  onOpenSubMenu?: MenuItemProps['onClick'];
  selected?: boolean;
  table: MRT_TableInstance<TData>;
  value?: string;
}

export const MRT_ActionMenuItem = <TData extends MRT_RowData>({
  disabled,
  divider,
  icon,
  label,
  onOpenSubMenu,
  selected,
  table,
  ...rest
}: MRT_ActionMenuItemProps<TData>) => {
  const {
    options: {
      icons: { ArrowRightIcon },
    },
  } = table;

  return (
    <>
      <MenuItem
        display="flex"
        justifyContent="space-between"
        minWidth="120px"
        my={0}
        py="6px"
        px={2}
        fontWeight={selected ? 'bold' : 'normal'}
        bg={selected ? 'blue.50' : undefined}
        _hover={{ bg: disabled ? undefined : 'gray.100' }}
        role="menuitem"
        tabIndex={0}
        isDisabled={disabled}
        opacity={disabled ? 0.5 : 1}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        pointerEvents={disabled ? 'none' : undefined}
        {...rest}
      >
        <Flex alignItems="center">
          <Box mr={2} display="flex" alignItems="center" minWidth="20px">
            {icon}
          </Box>
          {label}
        </Flex>
        {onOpenSubMenu && (
          <IconButton
            onClick={onOpenSubMenu}
            aria-label="Open submenu"
            size="sm"
            variant="ghost"
            icon={<ArrowRightIcon />}
            p={0}
          />
        )}
      </MenuItem>
      {divider && <MenuDivider />}
    </>
  );
};
