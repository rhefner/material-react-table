import { type DragEvent, memo, useMemo, useRef, type ReactNode } from 'react';
import { type VirtualItem } from '@tanstack/react-virtual';
import {
  Tr,
  type TableRowProps,
  useColorModeValue,
  type SystemStyleObject,
} from '@chakra-ui/react';
import { MRT_TableBodyCell, Memo_MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import {
  type MRT_Cell,
  type MRT_ColumnVirtualizer,
  type MRT_Row,
  type MRT_RowData,
  type MRT_RowVirtualizer,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../../types';
import { getIsRowSelected } from '../../utils/row.utils';
import {
  commonCellBeforeAfterStyles,
  getCommonPinnedCellStyles,
} from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { useTheme, type Theme } from '../../hooks/custom/useTheme';
export interface MRT_TableBodyRowProps<TData extends MRT_RowData>
  extends TableRowProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  numRows?: number;
  pinnedRowIds?: string[];
  row: MRT_Row<TData>;
  rowVirtualizer?: MRT_RowVirtualizer;
  staticRowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualRow?: VirtualItem;
}

export const MRT_TableBodyRow = <TData extends MRT_RowData>({
  columnVirtualizer,
  numRows,
  pinnedRowIds,
  row,
  rowVirtualizer,
  staticRowIndex,
  table,
  virtualRow,
  ...rest
}: MRT_TableBodyRowProps<TData>) => {
  const theme = useTheme<Theme>();
  const lightModeColor = useColorModeValue('gray.100', 'gray.700');
  const darkModeColor = useColorModeValue('gray.200', 'gray.600');

  const {
    getState,
    options: {
      enableRowOrdering,
      enableRowPinning,
      enableStickyFooter,
      enableStickyHeader,
      layoutMode,
      memoMode,
      mrtTheme: {
        baseBackgroundColor,
        pinnedRowBackgroundColor,
        selectedRowBackgroundColor,
      },
      muiTableBodyRowProps,
      renderDetailPanel,
      rowPinningDisplayMode,
    },
    refs: { tableFooterRef, tableHeadRef },
    setHoveredRow,
  } = table;
  const {
    density,
    draggingColumn,
    draggingRow,
    editingCell,
    editingRow,
    hoveredRow,
    isFullScreen,
    rowPinning,
  } = getState();

  const visibleCells = row.getVisibleCells();

  const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } =
    columnVirtualizer ?? {};

  const isRowSelected = getIsRowSelected({ row, table });
  const isRowPinned = enableRowPinning && row.getIsPinned();
  const isDraggingRow = draggingRow?.id === row.id;
  const isHoveredRow = hoveredRow?.id === row.id;

  const tableRowProps = {
    ...parseFromValuesOrFunc(muiTableBodyRowProps, {
      row,
      staticRowIndex,
      table,
    }),
    ...rest,
  };

  const [bottomPinnedIndex, topPinnedIndex] = useMemo(() => {
    if (
      !enableRowPinning ||
      !rowPinningDisplayMode?.includes('sticky') ||
      !pinnedRowIds ||
      !row.getIsPinned()
    )
      return [];
    return [
      [...pinnedRowIds].reverse().indexOf(row.id),
      pinnedRowIds.indexOf(row.id),
    ];
  }, [pinnedRowIds, rowPinning]);

  const tableHeadHeight =
    ((enableStickyHeader || isFullScreen) &&
      tableHeadRef.current?.clientHeight) ||
    0;
  const tableFooterHeight =
    (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

  const parsedSx = parseFromValuesOrFunc(tableRowProps?.sx, lightModeColor);

  const defaultRowHeight =
    density === 'compact' ? 37 : density === 'comfortable' ? 53 : 69;

  const customRowHeight =
    parseInt(String(tableRowProps?.style?.height ?? parsedSx?.height), 10) ||
    undefined;

  const rowHeight = customRowHeight || defaultRowHeight;

  const handleDragEnter = (_e: DragEvent) => {
    if (enableRowOrdering && draggingRow) {
      setHoveredRow(row);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const rowRef = useRef<HTMLTableRowElement | null>(null);

  const cellHighlightColor = isRowSelected
    ? selectedRowBackgroundColor
    : isRowPinned
      ? pinnedRowBackgroundColor
      : undefined;

  // Build the final style object with proper typing
  const rowStyles: Record<string, any> = {
    backgroundColor: `${baseBackgroundColor} !important`,
    bottom:
      !virtualRow && bottomPinnedIndex !== undefined && isRowPinned
        ? `${
            bottomPinnedIndex * rowHeight +
            (enableStickyFooter ? tableFooterHeight - 1 : 0)
          }px`
        : undefined,
    boxSizing: 'border-box',
    display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
    opacity: isRowPinned ? 0.97 : isDraggingRow || isHoveredRow ? 0.5 : 1,
    position: virtualRow
      ? 'absolute'
      : rowPinningDisplayMode?.includes('sticky') && isRowPinned
        ? 'sticky'
        : 'relative',
    top: virtualRow
      ? 0
      : topPinnedIndex !== undefined && isRowPinned
        ? `${
            topPinnedIndex * rowHeight +
            (enableStickyHeader || isFullScreen ? tableHeadHeight - 1 : 0)
          }px`
        : undefined,
    transition: virtualRow ? 'none' : 'all 150ms ease-in-out',
    width: '100%',
    zIndex: rowPinningDisplayMode?.includes('sticky') && isRowPinned ? 2 : 0,
  };

  // Add cell styling
  rowStyles.td = getCommonPinnedCellStyles({ table, theme });

  // Add highlight effect for selected/pinned cells
  if (cellHighlightColor) {
    rowStyles['td:after'] = {
      backgroundColor: cellHighlightColor,
      ...commonCellBeforeAfterStyles,
    };
  }

  // Add hover effect - always add unless specifically disabled by user
  // We can detect this in various ways but one simple approach is to check
  // if user has provided _hover as part of their styles and respect that
  const userProvidedHoverStyles =
    typeof parsedSx === 'object' && parsedSx && '_hover' in parsedSx;

  if (!userProvidedHoverStyles) {
    // Only add our hover styles if the user hasn't specified their own
    const hoverColor = isRowSelected ? cellHighlightColor : darkModeColor;
    if (hoverColor) {
      rowStyles['&:hover td:after'] = {
        backgroundColor: hoverColor,
        ...commonCellBeforeAfterStyles,
      };
    }
  }

  // Add any other styles from parsedSx if they exist
  if (parsedSx) {
    Object.assign(rowStyles, parsedSx);
  }

  return (
    <>
      <Tr
        data-index={renderDetailPanel ? staticRowIndex * 2 : staticRowIndex}
        data-pinned={!!isRowPinned || undefined}
        data-selected={isRowSelected || undefined}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        ref={(node: HTMLTableRowElement) => {
          if (node) {
            rowRef.current = node;
            rowVirtualizer?.measureElement(node);
          }
        }}
        selected={isRowSelected}
        {...tableRowProps}
        style={{
          transform: virtualRow
            ? `translateY(${virtualRow.start}px)`
            : undefined,
          ...tableRowProps?.style,
        }}
        sx={rowStyles as SystemStyleObject}
      >
        {virtualPaddingLeft ? (
          <td style={{ display: 'flex', width: virtualPaddingLeft }} />
        ) : null}
        {(virtualColumns ?? visibleCells).map(
          (cellOrVirtualCell, staticColumnIndex) => {
            let cell = cellOrVirtualCell as MRT_Cell<TData>;
            if (columnVirtualizer) {
              staticColumnIndex = (cellOrVirtualCell as MRT_VirtualItem).index;
              cell = visibleCells[staticColumnIndex];
            }
            const props = {
              cell,
              numRows,
              rowRef,
              staticColumnIndex,
              staticRowIndex,
              table,
            };
            const key = `${cell.id}-${staticRowIndex}`;
            return cell ? (
              memoMode === 'cells' &&
              cell.column.columnDef.columnDefType === 'data' &&
              !draggingColumn &&
              !draggingRow &&
              editingCell?.id !== cell.id &&
              editingRow?.id !== row.id ? (
                <Memo_MRT_TableBodyCell key={key} {...props} />
              ) : (
                <MRT_TableBodyCell key={key} {...props} />
              )
            ) : null;
          },
        )}
        {virtualPaddingRight ? (
          <td style={{ display: 'flex', width: virtualPaddingRight }} />
        ) : null}
      </Tr>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel
          parentRowRef={rowRef}
          row={row}
          rowVirtualizer={rowVirtualizer}
          staticRowIndex={staticRowIndex}
          table={table}
          virtualRow={virtualRow}
        />
      )}
    </>
  );
};

export const Memo_MRT_TableBodyRow = memo(
  MRT_TableBodyRow,
  (prev, next) =>
    prev.row === next.row && prev.staticRowIndex === next.staticRowIndex,
) as typeof MRT_TableBodyRow;
