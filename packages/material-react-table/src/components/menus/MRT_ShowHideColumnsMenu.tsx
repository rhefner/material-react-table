import { useMemo, useState } from 'react';
import { Box, Button, Divider, Menu, type MenuProps } from '@chakra-ui/react';
import { MRT_ShowHideColumnsMenuItems } from './MRT_ShowHideColumnsMenuItems';
import {
  type MRT_Column,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { getDefaultColumnOrderIds } from '../../utils/displayColumn.utils';

export interface MRT_ShowHideColumnsMenuProps<TData extends MRT_RowData>
  extends Partial<MenuProps> {
  anchorEl: HTMLElement | null;
  isSubMenu?: boolean;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  table: MRT_TableInstance<TData>;
}

export const MRT_ShowHideColumnsMenu = <TData extends MRT_RowData>({
  anchorEl,
  setAnchorEl,
  table,
  ...rest
}: MRT_ShowHideColumnsMenuProps<TData>) => {
  const {
    getAllColumns,
    getAllLeafColumns,
    getCenterLeafColumns,
    getIsAllColumnsVisible,
    getIsSomeColumnsPinned,
    getIsSomeColumnsVisible,
    getLeftLeafColumns,
    getRightLeafColumns,
    getState,
    initialState,
    options: {
      enableColumnOrdering,
      enableColumnPinning,
      enableHiding,
      localization,
      mrtTheme: { menuBackgroundColor },
    },
  } = table;
  const { columnOrder, columnPinning, density } = getState();

  const handleToggleAllColumns = (value?: boolean) => {
    getAllLeafColumns()
      .filter((col) => col.columnDef.enableHiding !== false)
      .forEach((col) => col.toggleVisibility(value));
  };

  const allColumns = useMemo(() => {
    const columns = getAllColumns();
    if (
      columnOrder.length > 0 &&
      !columns.some((col) => col.columnDef.columnDefType === 'group')
    ) {
      return [
        ...getLeftLeafColumns(),
        ...Array.from(new Set(columnOrder)).map((colId) =>
          getCenterLeafColumns().find((col) => col?.id === colId),
        ),
        ...getRightLeafColumns(),
      ].filter(Boolean);
    }
    return columns;
  }, [
    columnOrder,
    columnPinning,
    getAllColumns(),
    getCenterLeafColumns(),
    getLeftLeafColumns(),
    getRightLeafColumns(),
  ]) as MRT_Column<TData>[];

  const isNestedColumns = allColumns.some(
    (col) => col.columnDef.columnDefType === 'group',
  );

  const hasColumnOrderChanged = useMemo(
    () =>
      columnOrder.length !== initialState.columnOrder.length ||
      !columnOrder.every(
        (column, index) => column === initialState.columnOrder[index],
      ),

    [columnOrder, initialState.columnOrder],
  );

  const [hoveredColumn, setHoveredColumn] = useState<MRT_Column<TData> | null>(
    null,
  );

  if (!anchorEl) return null;

  return (
    <Box
      position="absolute"
      zIndex={1000}
      top={anchorEl.getBoundingClientRect().bottom}
      left={anchorEl.getBoundingClientRect().left}
      bg={menuBackgroundColor}
      borderRadius="md"
      boxShadow="md"
      maxHeight="calc(var(--chakra-vh, 1vh) * 70)"
      maxWidth="340px"
      minWidth="200px"
      overflowY="auto"
      {...rest}
    >
      <Box display="flex" justifyContent="space-between" p="0.5rem" pt={0}>
        {enableHiding && (
          <Button
            isDisabled={!getIsSomeColumnsVisible()}
            onClick={() => handleToggleAllColumns(false)}
            size="sm"
            variant="ghost"
          >
            {localization.hideAll}
          </Button>
        )}
        {enableColumnOrdering && (
          <Button
            onClick={() =>
              table.setColumnOrder(
                getDefaultColumnOrderIds(table.options, true),
              )
            }
            isDisabled={!hasColumnOrderChanged}
            size="sm"
            variant="ghost"
          >
            {localization.resetOrder}
          </Button>
        )}
        {enableColumnPinning && (
          <Button
            isDisabled={!getIsSomeColumnsPinned()}
            onClick={() => table.resetColumnPinning(true)}
            size="sm"
            variant="ghost"
          >
            {localization.unpinAll}
          </Button>
        )}
        {enableHiding && (
          <Button
            isDisabled={getIsAllColumnsVisible()}
            onClick={() => handleToggleAllColumns(true)}
            size="sm"
            variant="ghost"
          >
            {localization.showAll}
          </Button>
        )}
      </Box>
      <Divider />
      <Menu>
        {allColumns.map((column, index) => (
          <MRT_ShowHideColumnsMenuItems
            allColumns={allColumns}
            column={column}
            hoveredColumn={hoveredColumn}
            isNestedColumns={isNestedColumns}
            key={`${index}-${column.id}`}
            setHoveredColumn={setHoveredColumn}
            table={table}
          />
        ))}
      </Menu>
    </Box>
  );
};
