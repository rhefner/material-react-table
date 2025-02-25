import { Box, type MenuProps } from '@chakra-ui/react';
import { MRT_ActionMenuItem } from './MRT_ActionMenuItem';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { openEditingCell } from '../../utils/cell.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_CellActionMenuProps<TData extends MRT_RowData>
  extends Partial<MenuProps> {
  table: MRT_TableInstance<TData>;
}

export const MRT_CellActionMenu = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_CellActionMenuProps<TData>) => {
  const {
    getState,
    options: {
      editDisplayMode,
      enableClickToCopy,
      enableEditing,
      icons: { ContentCopy, EditIcon },
      localization,
      mrtTheme: { menuBackgroundColor },
      renderCellActionMenuItems,
    },
    refs: { actionCellRef },
  } = table;
  const { actionCell, density } = getState();
  const cell = actionCell!;
  const { row } = cell;
  const { column } = cell;
  const { columnDef } = column;

  const handleClose = (event?: any) => {
    event?.stopPropagation();
    table.setActionCell(null);
    actionCellRef.current = null;
  };

  const internalMenuItems = [
    (parseFromValuesOrFunc(enableClickToCopy, cell) === 'context-menu' ||
      parseFromValuesOrFunc(columnDef.enableClickToCopy, cell) ===
        'context-menu') && (
      <MRT_ActionMenuItem
        icon={<ContentCopy />}
        key={'mrt-copy'}
        label={localization.copy}
        onClick={(event) => {
          event.stopPropagation();
          navigator.clipboard.writeText(cell.getValue() as string);
          handleClose();
        }}
        table={table}
      />
    ),
    parseFromValuesOrFunc(enableEditing, row) && editDisplayMode === 'cell' && (
      <MRT_ActionMenuItem
        icon={<EditIcon />}
        key={'mrt-edit'}
        label={localization.edit}
        onClick={() => {
          openEditingCell({ cell, table });
          handleClose();
        }}
        table={table}
      />
    ),
  ].filter(Boolean);

  const renderActionProps = {
    cell,
    closeMenu: handleClose,
    column,
    internalMenuItems,
    row,
    table,
  };

  const menuItems =
    columnDef.renderCellActionMenuItems?.(renderActionProps) ??
    renderCellActionMenuItems?.(renderActionProps);

  if (!menuItems?.length && !internalMenuItems?.length) return null;
  if (!actionCellRef.current || !cell) return null;

  // Using the same positioned Box approach as in other menus
  const anchorRect = actionCellRef.current.getBoundingClientRect();

  return (
    <Box
      position="absolute"
      zIndex={1000}
      top={anchorRect.bottom}
      left={anchorRect.left - 100} // Matching transformOrigin from MUI version
      bg={menuBackgroundColor}
      borderRadius="md"
      boxShadow="md"
      maxHeight="calc(var(--chakra-vh, 1vh) * 70)"
      maxWidth="340px"
      minWidth="200px"
      overflowY="auto"
      p={density === 'compact' ? 1 : 2}
      onClick={(event) => event.stopPropagation()}
      {...rest}
    >
      {menuItems ?? internalMenuItems}
    </Box>
  );
};
