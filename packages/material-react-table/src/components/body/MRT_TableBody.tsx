import { memo, useMemo } from 'react';
import { type VirtualItem } from '@tanstack/react-virtual';
import {
  Tbody,
  type TableBodyProps,
  Text,
  useTheme,
  type Theme,
  type SystemStyleObject,
} from '@chakra-ui/react';
import { MRT_TableBodyRow, Memo_MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMRT_RowVirtualizer } from '../../hooks/useMRT_RowVirtualizer';
import { useMRT_Rows } from '../../hooks/useMRT_Rows';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableBodyProps<TData extends MRT_RowData>
  extends TableBodyProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBody = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
  ...rest
}: MRT_TableBodyProps<TData>) => {
  const theme = useTheme();

  const {
    getBottomRows,
    getIsSomeRowsPinned,
    getRowModel,
    getState,
    getTopRows,
    options: {
      enableStickyFooter,
      enableStickyHeader,
      layoutMode,
      localization,
      memoMode,
      muiTableBodyProps,
      renderDetailPanel,
      renderEmptyRowsFallback,
      rowPinningDisplayMode,
    },
    refs: { tableFooterRef, tableHeadRef, tablePaperRef },
  } = table;
  const { columnFilters, globalFilter, isFullScreen, rowPinning } = getState();

  const tableBodyProps = {
    ...parseFromValuesOrFunc(muiTableBodyProps, { table }),
    ...rest,
  };

  const tableHeadHeight =
    ((enableStickyHeader || isFullScreen) &&
      tableHeadRef.current?.clientHeight) ||
    0;
  const tableFooterHeight =
    (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

  const pinnedRowIds = useMemo(() => {
    if (!rowPinning.bottom?.length && !rowPinning.top?.length) return [];
    return getRowModel()
      .rows.filter((row) => row.getIsPinned())
      .map((r) => r.id);
  }, [rowPinning, getRowModel().rows]);

  const rows = useMRT_Rows(table);

  const rowVirtualizer = useMRT_RowVirtualizer(table, rows);

  const { virtualRows } = rowVirtualizer ?? {};

  const commonRowProps = {
    columnVirtualizer,
    numRows: rows.length,
    table,
  };

  // Generate base styles without the parseFromValuesOrFunc result
  const topBodySx: SystemStyleObject = {
    display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
    position: 'sticky',
    top: tableHeadHeight - 1,
    zIndex: 1,
  };

  // Add any custom styles from props if they exist
  const parsedTopSx = parseFromValuesOrFunc(tableBodyProps?.sx, theme);
  if (parsedTopSx) {
    Object.assign(topBodySx, parsedTopSx);
  }

  // Generate base styles for main body
  const mainBodySx: SystemStyleObject = {
    display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
    height: rowVirtualizer ? `${rowVirtualizer.getTotalSize()}px` : undefined,
    minHeight: !rows.length ? '100px' : undefined,
    position: 'relative',
  };

  // Add any custom styles from props if they exist
  const parsedMainSx = parseFromValuesOrFunc(tableBodyProps?.sx, theme);
  if (parsedMainSx) {
    Object.assign(mainBodySx, parsedMainSx);
  }

  // Generate base styles for bottom body
  const bottomBodySx: SystemStyleObject = {
    bottom: tableFooterHeight - 1,
    display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
    position: 'sticky',
    zIndex: 1,
  };

  // Add any custom styles from props if they exist
  const parsedBottomSx = parseFromValuesOrFunc(tableBodyProps?.sx, theme);
  if (parsedBottomSx) {
    Object.assign(bottomBodySx, parsedBottomSx);
  }

  return (
    <>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('top') && (
          <Tbody {...tableBodyProps} sx={topBodySx}>
            {getTopRows().map((row, staticRowIndex) => {
              const props = {
                ...commonRowProps,
                row,
                staticRowIndex,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </Tbody>
        )}
      <Tbody {...tableBodyProps} sx={mainBodySx}>
        {tableBodyProps?.children ??
          (!rows.length ? (
            <tr
              style={{
                display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              }}
            >
              <td
                colSpan={table.getVisibleLeafColumns().length}
                style={{
                  display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
                }}
              >
                {renderEmptyRowsFallback?.({ table }) ?? (
                  <Text
                    sx={{
                      color: 'gray.500',
                      fontStyle: 'italic',
                      maxWidth: `min(100vw, ${
                        tablePaperRef.current?.clientWidth ?? 360
                      }px)`,
                      py: '2rem',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    {globalFilter || columnFilters.length
                      ? localization.noResultsFound
                      : localization.noRecordsToDisplay}
                  </Text>
                )}
              </td>
            </tr>
          ) : (
            <>
              {(virtualRows ?? rows).map((rowOrVirtualRow, staticRowIndex) => {
                let row = rowOrVirtualRow as MRT_Row<TData>;
                if (rowVirtualizer) {
                  if (renderDetailPanel) {
                    if (rowOrVirtualRow.index % 2 === 1) {
                      return null;
                    } else {
                      staticRowIndex = rowOrVirtualRow.index / 2;
                    }
                  } else {
                    staticRowIndex = rowOrVirtualRow.index;
                  }
                  row = rows[staticRowIndex];
                }
                const props = {
                  ...commonRowProps,
                  pinnedRowIds,
                  row,
                  rowVirtualizer,
                  staticRowIndex,
                  virtualRow: rowVirtualizer
                    ? (rowOrVirtualRow as VirtualItem)
                    : undefined,
                };
                const key = `${row.id}-${row.index}`;
                return memoMode === 'rows' ? (
                  <Memo_MRT_TableBodyRow key={key} {...props} />
                ) : (
                  <MRT_TableBodyRow key={key} {...props} />
                );
              })}
            </>
          ))}
      </Tbody>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('bottom') && (
          <Tbody {...tableBodyProps} sx={bottomBodySx}>
            {getBottomRows().map((row, staticRowIndex) => {
              const props = {
                ...commonRowProps,
                row,
                staticRowIndex,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </Tbody>
        )}
    </>
  );
};

export const Memo_MRT_TableBody = memo(
  MRT_TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof MRT_TableBody;
