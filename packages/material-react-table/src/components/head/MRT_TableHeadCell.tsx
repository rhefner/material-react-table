import { type DragEvent, type ReactNode, useMemo, useRef } from 'react';
import { Box, useColorModeValue, Th } from '@chakra-ui/react';
import { MRT_TableHeadCellColumnActionsButton } from './MRT_TableHeadCellColumnActionsButton';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { MRT_TableHeadCellFilterLabel } from './MRT_TableHeadCellFilterLabel';
import { MRT_TableHeadCellGrabHandle } from './MRT_TableHeadCellGrabHandle';
import { MRT_TableHeadCellResizeHandle } from './MRT_TableHeadCellResizeHandle';
import { MRT_TableHeadCellSortLabel } from './MRT_TableHeadCellSortLabel';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { getCommonMRTCellStyles } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { cellKeyboardShortcuts } from '../../utils/cell.utils';
import { type TableCellProps } from '@chakra-ui/react';
import { useTheme, type Theme } from '../../hooks/custom/useTheme';
export interface MRT_TableHeadCellProps<TData extends MRT_RowData>
  extends TableCellProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  header: MRT_Header<TData>;
  staticColumnIndex?: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCell = <TData extends MRT_RowData>({
  columnVirtualizer,
  header,
  staticColumnIndex,
  table,
  ...rest
}: MRT_TableHeadCellProps<TData>) => {
  const draggingBorderColor = useColorModeValue('gray.500', 'gray.400');
  const borderColorHover = useColorModeValue('gray.300', 'gray.600');
  const cellRef = useRef<HTMLTableCellElement>(null);
  const theme = useTheme<Theme>();
  const {
    getState,
    options: {
      columnFilterDisplayMode,
      columnResizeDirection,
      columnResizeMode,
      enableKeyboardShortcuts,
      enableColumnActions,
      enableColumnDragging,
      enableColumnOrdering,
      enableColumnPinning,
      enableGrouping,
      enableMultiSort,
      layoutMode,
      mrtTheme,
      muiTableHeadCellProps: chakraTableHeadCellProps,
    },
    refs: { tableHeadCellRefs },
    setHoveredColumn,
  } = table;
  const {
    columnSizingInfo,
    density,
    draggingColumn,
    grouping,
    hoveredColumn,
    showColumnFilters,
  } = getState();
  const { column } = header;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const tableCellProps = {
    ...parseFromValuesOrFunc(chakraTableHeadCellProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiTableHeadCellProps, {
      column,
      table,
    }),
    ...rest,
  };

  const isColumnPinned =
    enableColumnPinning &&
    columnDef.columnDefType !== 'group' &&
    column.getIsPinned();

  const showColumnActions =
    (enableColumnActions || columnDef.enableColumnActions) &&
    columnDef.enableColumnActions !== false;

  const showDragHandle =
    enableColumnDragging !== false &&
    columnDef.enableColumnDragging !== false &&
    (enableColumnDragging ||
      (enableColumnOrdering && columnDef.enableColumnOrdering !== false) ||
      (enableGrouping &&
        columnDef.enableGrouping !== false &&
        !grouping.includes(column.id)));

  const headerPL = useMemo(() => {
    let pl = 0;
    if (column.getCanSort()) pl += 1;
    if (showColumnActions) pl += 1.75;
    if (showDragHandle) pl += 1.5;
    return pl;
  }, [showColumnActions, showDragHandle]);

  const draggingBorders = useMemo(() => {
    const showResizeBorder =
      columnSizingInfo.isResizingColumn === column.id &&
      columnResizeMode === 'onChange' &&
      !header.subHeaders.length;

    const borderStyle = showResizeBorder
      ? `2px solid ${draggingBorderColor} !important`
      : draggingColumn?.id === column.id
        ? `1px dashed gray`
        : hoveredColumn?.id === column.id
          ? `2px dashed ${draggingBorderColor}`
          : undefined;

    if (showResizeBorder) {
      return columnResizeDirection === 'ltr'
        ? { borderRight: borderStyle }
        : { borderLeft: borderStyle };
    }
    const draggingBorders = borderStyle
      ? {
          borderLeft: borderStyle,
          borderRight: borderStyle,
          borderTop: borderStyle,
        }
      : undefined;

    return draggingBorders;
  }, [draggingColumn, hoveredColumn, columnSizingInfo.isResizingColumn]);

  const handleDragEnter = (_e: DragEvent) => {
    if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
      setHoveredColumn(null);
    }
    if (enableColumnOrdering && draggingColumn && columnDefType !== 'group') {
      setHoveredColumn(
        columnDef.enableColumnOrdering !== false ? column : null,
      );
    }
  };

  const handleDragOver = (e: DragEvent) => {
    if (columnDef.enableColumnOrdering !== false) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    tableCellProps?.onKeyDown?.(event);
    cellKeyboardShortcuts({
      event,
      cellValue: header.column.columnDef.header,
      table,
      header,
    });
  };

  const HeaderElement =
    parseFromValuesOrFunc(columnDef.Header, {
      column,
      header,
      table,
    }) ?? columnDef.header;

  // Store the ref in the tableHeadCellRefs and use it for virtualization if needed
  useMemo(() => {
    if (cellRef.current) {
      tableHeadCellRefs.current![column.id] = cellRef.current;
      if (columnDefType !== 'group') {
        columnVirtualizer?.measureElement?.(cellRef.current);
      }
    }
  }, [
    cellRef.current,
    column.id,
    columnDefType,
    columnVirtualizer,
    tableHeadCellRefs,
  ]);

  return (
    <Th
      ref={cellRef}
      textAlign={columnDefType === 'group' ? 'center' : 'left'}
      aria-sort={
        column.getIsSorted()
          ? column.getIsSorted() === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
      colSpan={header.colSpan}
      data-can-sort={column.getCanSort() || undefined}
      data-index={staticColumnIndex}
      data-pinned={!!isColumnPinned || undefined}
      data-sort={column.getIsSorted() || undefined}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      tabIndex={enableKeyboardShortcuts ? 0 : undefined}
      {...tableCellProps}
      onKeyDown={handleKeyDown}
      sx={{
        _hover: {
          '.chakra-button': {
            opacity: 1,
          },
        },
        flexDirection: layoutMode?.startsWith('grid') ? 'column' : undefined,
        fontWeight: 'bold',
        overflow: 'visible',
        p:
          density === 'compact'
            ? '0.5rem'
            : density === 'comfortable'
              ? columnDefType === 'display'
                ? '0.75rem'
                : '1rem'
              : columnDefType === 'display'
                ? '1rem 1.25rem'
                : '1.5rem',
        pb:
          columnDefType === 'display'
            ? 0
            : showColumnFilters || density === 'compact'
              ? '0.4rem'
              : '0.6rem',
        pt:
          columnDefType === 'group' || density === 'compact'
            ? '0.25rem'
            : density === 'comfortable'
              ? '.75rem'
              : '1.25rem',
        userSelect: enableMultiSort && column.getCanSort() ? 'none' : undefined,
        verticalAlign: 'top',
        ...getCommonMRTCellStyles({
          column,
          header,
          table,
          tableCellProps,
          theme,
        }),
        ...draggingBorders,
      }}
    >
      {header.isPlaceholder
        ? null
        : (tableCellProps.children ?? (
            <Box
              className="Chakra-TableHeadCell-Content"
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: columnDefType === 'group' ? 'column' : undefined,
                gap: '0.25rem',
                justifyContent:
                  columnDefType === 'group' ? 'center' : 'flex-start',
                pl: `${headerPL}rem`,
                position: 'relative',
                width: '100%',
              }}
            >
              {column.getCanSort() && columnDefType !== 'group' ? (
                <MRT_TableHeadCellSortLabel header={header} table={table} />
              ) : (
                HeaderElement
              )}
              {columnDefType !== 'group' && (
                <>
                  {showColumnActions && (
                    <MRT_TableHeadCellColumnActionsButton
                      header={header}
                      table={table}
                    />
                  )}
                  {column.getCanFilter() && (
                    <MRT_TableHeadCellFilterLabel
                      header={header}
                      table={table}
                    />
                  )}
                  {showDragHandle && (
                    <MRT_TableHeadCellGrabHandle
                      column={column}
                      table={table}
                      tableHeadCellRef={{
                        current: tableHeadCellRefs.current?.[column.id]!,
                      }}
                    />
                  )}
                  {(columnResizeMode === 'onChange' ||
                    columnResizeMode === 'onEnd') &&
                    column.getCanResize() && (
                      <MRT_TableHeadCellResizeHandle
                        header={header}
                        table={table}
                      />
                    )}
                </>
              )}
              {(columnFilterDisplayMode === 'subheader' ||
                columnDef.enableColumnFilterModes === true) &&
                column.getCanFilter() &&
                !header.subHeaders?.length && (
                  <MRT_TableHeadCellFilterContainer
                    header={header}
                    table={table}
                  />
                )}
            </Box>
          ))}
    </Th>
  );
};
