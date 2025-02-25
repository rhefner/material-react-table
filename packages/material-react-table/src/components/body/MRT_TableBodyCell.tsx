import {
  type DragEvent,
  type MouseEvent,
  type RefObject,
  type ReactNode,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Td,
  type TableCellProps,
  Skeleton,
  useColorMode,
  type SystemStyleObject,
} from '@chakra-ui/react';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import {
  type MRT_Cell,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import {
  isCellEditable,
  cellKeyboardShortcuts,
  openEditingCell,
} from '../../utils/cell.utils';
import { getCommonMRTCellStyles } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import { useTheme, type Theme } from '../../hooks/custom/useTheme';
export interface MRT_TableBodyCellProps<TData extends MRT_RowData>
  extends TableCellProps {
  cell: MRT_Cell<TData>;
  numRows?: number;
  rowRef: RefObject<HTMLTableRowElement | null>;
  staticColumnIndex?: number;
  staticRowIndex: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyCell = <TData extends MRT_RowData>({
  cell,
  numRows,
  rowRef,
  staticColumnIndex,
  staticRowIndex,
  table,
  ...rest
}: MRT_TableBodyCellProps<TData>) => {
  const { colorMode } = useColorMode();
  const theme = useTheme<Theme>();

  const {
    getState,
    options: {
      columnResizeDirection,
      columnResizeMode,
      createDisplayMode,
      editDisplayMode,
      enableCellActions,
      enableClickToCopy,
      enableColumnOrdering,
      enableColumnPinning,
      enableGrouping,
      enableKeyboardShortcuts,
      layoutMode,
      mrtTheme: { draggingBorderColor },
      muiSkeletonProps,
      muiTableBodyCellProps,
    },
    setHoveredColumn,
  } = table;
  const {
    actionCell,
    columnSizingInfo,
    creatingRow,
    density,
    draggingColumn,
    draggingRow,
    editingCell,
    editingRow,
    hoveredColumn,
    hoveredRow,
    isLoading,
    showSkeletons,
  } = getState();
  const { column, row } = cell;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const args = { cell, column, row, table };
  const tableCellProps = {
    ...parseFromValuesOrFunc(muiTableBodyCellProps, args),
    ...parseFromValuesOrFunc(columnDef.muiTableBodyCellProps, args),
    ...rest,
  };

  const skeletonProps = parseFromValuesOrFunc(muiSkeletonProps, {
    cell,
    column,
    row,
    table,
  });

  const [skeletonWidth, setSkeletonWidth] = useState(100);
  useEffect(() => {
    if ((!isLoading && !showSkeletons) || skeletonWidth !== 100) return;
    const size = column.getSize();
    setSkeletonWidth(
      columnDefType === 'display'
        ? size / 2
        : Math.round(Math.random() * (size - size / 3) + size / 3),
    );
  }, [isLoading, showSkeletons]);

  const draggingBorders = useMemo(() => {
    const isDraggingColumn = draggingColumn?.id === column.id;
    const isHoveredColumn = hoveredColumn?.id === column.id;
    const isDraggingRow = draggingRow?.id === row.id;
    const isHoveredRow = hoveredRow?.id === row.id;
    const isFirstColumn = column.getIsFirstColumn();
    const isLastColumn = column.getIsLastColumn();
    const isLastRow = numRows && staticRowIndex === numRows - 1;
    const isResizingColumn = columnSizingInfo.isResizingColumn === column.id;
    const showResizeBorder =
      isResizingColumn && columnResizeMode === 'onChange';

    const borderStyle = showResizeBorder
      ? `2px solid ${draggingBorderColor} !important`
      : isDraggingColumn || isDraggingRow
        ? `1px dashed ${colorMode === 'dark' ? 'white' : 'black'} !important`
        : isHoveredColumn || isHoveredRow || isResizingColumn
          ? `2px dashed ${draggingBorderColor} !important`
          : undefined;

    if (showResizeBorder) {
      return columnResizeDirection === 'ltr'
        ? { borderRight: borderStyle }
        : { borderLeft: borderStyle };
    }

    return borderStyle
      ? {
          borderBottom:
            isDraggingRow || isHoveredRow || (isLastRow && !isResizingColumn)
              ? borderStyle
              : undefined,
          borderLeft:
            isDraggingColumn ||
            isHoveredColumn ||
            ((isDraggingRow || isHoveredRow) && isFirstColumn)
              ? borderStyle
              : undefined,
          borderRight:
            isDraggingColumn ||
            isHoveredColumn ||
            ((isDraggingRow || isHoveredRow) && isLastColumn)
              ? borderStyle
              : undefined,
          borderTop: isDraggingRow || isHoveredRow ? borderStyle : undefined,
        }
      : undefined;
  }, [
    columnSizingInfo.isResizingColumn,
    draggingColumn,
    draggingRow,
    hoveredColumn,
    hoveredRow,
    staticRowIndex,
  ]);

  const isColumnPinned =
    enableColumnPinning &&
    columnDef.columnDefType !== 'group' &&
    column.getIsPinned();

  const isEditable = isCellEditable({ cell, table });

  const isEditing =
    isEditable &&
    !['custom', 'modal'].includes(editDisplayMode as string) &&
    (editDisplayMode === 'table' ||
      editingRow?.id === row.id ||
      editingCell?.id === cell.id) &&
    !row.getIsGrouped();

  const isCreating =
    isEditable && createDisplayMode === 'row' && creatingRow?.id === row.id;

  const showClickToCopyButton =
    (parseFromValuesOrFunc(enableClickToCopy, cell) === true ||
      parseFromValuesOrFunc(columnDef.enableClickToCopy, cell) === true) &&
    !['context-menu', false].includes(
      // @ts-expect-error
      parseFromValuesOrFunc(columnDef.enableClickToCopy, cell),
    );

  const isRightClickable = parseFromValuesOrFunc(enableCellActions, cell);

  const cellValueProps = {
    cell,
    table,
    staticColumnIndex,
    staticRowIndex,
  };

  const handleDoubleClick = (event: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDoubleClick?.(event);
    openEditingCell({ cell, table });
  };

  const handleDragEnter = (e: DragEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDragEnter?.(e);
    if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
      setHoveredColumn(null);
    }
    if (enableColumnOrdering && draggingColumn) {
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

  const handleContextMenu = (e: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onContextMenu?.(e);
    if (isRightClickable) {
      e.preventDefault();
      table.setActionCell(cell);
      table.refs.actionCellRef.current = e.currentTarget;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    tableCellProps?.onKeyDown?.(event);
    cellKeyboardShortcuts({
      cell,
      cellValue: cell.getValue<string>(),
      event,
      table,
    });
  };

  // Build the cell styles using proper typing
  const baseCellStyles: Record<string, any> = {
    alignItems: layoutMode?.startsWith('grid') ? 'center' : undefined,
    cursor: isRightClickable
      ? 'context-menu'
      : isEditable && editDisplayMode === 'cell'
        ? 'pointer'
        : 'inherit',
    outlineOffset: '-1px',
    overflow: 'hidden',
    p:
      density === 'compact'
        ? columnDefType === 'display'
          ? '0 0.5rem'
          : '0.5rem'
        : density === 'comfortable'
          ? columnDefType === 'display'
            ? '0.5rem 0.75rem'
            : '1rem'
          : columnDefType === 'display'
            ? '1rem 1.25rem'
            : '1.5rem',
    textOverflow: columnDefType !== 'display' ? 'ellipsis' : undefined,
    whiteSpace:
      row.getIsPinned() || density === 'compact' ? 'nowrap' : 'normal',
    ...getCommonMRTCellStyles({
      column,
      table,
      tableCellProps,
      theme,
    }),
    ...draggingBorders,
  };

  // Add hover styles
  baseCellStyles['&:hover'] = {
    outline:
      actionCell?.id === cell.id ||
      (editDisplayMode === 'cell' && isEditable) ||
      (editDisplayMode === 'table' && (isCreating || isEditing))
        ? `1px solid ${theme.colors.gray[500]}`
        : undefined,
    textOverflow: 'clip',
  };

  if (actionCell?.id === cell.id) {
    baseCellStyles.outline = `1px solid ${theme.colors.gray[500]}`;
  }

  // Add any custom styles from tableCellProps.sx
  const customSx = parseFromValuesOrFunc(tableCellProps.sx, theme);
  if (customSx) {
    Object.assign(baseCellStyles, customSx);
  }

  // Cell content rendering
  let cellContent;
  if (cell.getIsPlaceholder()) {
    cellContent =
      columnDef.PlaceholderCell?.({ cell, column, row, table }) ?? null;
  } else if (showSkeletons !== false && (isLoading || showSkeletons)) {
    cellContent = (
      <Skeleton height={20} width={skeletonWidth} {...skeletonProps} />
    );
  } else if (
    columnDefType === 'display' &&
    (['mrt-row-expand', 'mrt-row-numbers', 'mrt-row-select'].includes(
      column.id,
    ) ||
      !row.getIsGrouped())
  ) {
    cellContent = columnDef.Cell?.({
      cell,
      column,
      renderedCellValue: cell.renderValue() as any,
      row,
      rowRef,
      staticColumnIndex,
      staticRowIndex,
      table,
    });
  } else if (isCreating || isEditing) {
    cellContent = <MRT_EditCellTextField cell={cell} table={table} />;
  } else {
    if (showClickToCopyButton && columnDef.enableClickToCopy !== false) {
      cellContent = (
        <>
          <MRT_CopyButton cell={cell} table={table} />
          <MRT_TableBodyCellValue {...cellValueProps} />
        </>
      );
    } else {
      cellContent = <MRT_TableBodyCellValue {...cellValueProps} />;
    }
  }

  // Add grouped row count if needed
  if (cell.getIsGrouped() && !columnDef.GroupedCell) {
    cellContent = (
      <>
        {cellContent} ({row.subRows?.length})
      </>
    );
  }

  return (
    <Td
      data-index={staticColumnIndex}
      data-pinned={!!isColumnPinned || undefined}
      tabIndex={enableKeyboardShortcuts ? 0 : undefined}
      {...tableCellProps}
      onKeyDown={handleKeyDown}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleDoubleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      sx={baseCellStyles as SystemStyleObject}
    >
      {tableCellProps.children ?? cellContent}
    </Td>
  );
};

export const Memo_MRT_TableBodyCell = memo(
  MRT_TableBodyCell,
  (prev, next) => next.cell === prev.cell,
) as typeof MRT_TableBodyCell;
