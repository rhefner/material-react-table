import { Td, type TableCellProps } from '@chakra-ui/react';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { getCommonMRTCellStyles } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { cellKeyboardShortcuts } from '../../utils/cell.utils';
import { useTheme, type Theme } from '../../hooks/custom/useTheme';
export interface MRT_TableFooterCellProps<TData extends MRT_RowData>
  extends TableCellProps {
  footer: MRT_Header<TData>;
  staticColumnIndex?: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooterCell = <TData extends MRT_RowData>({
  footer,
  staticColumnIndex,
  table,
  ...rest
}: MRT_TableFooterCellProps<TData>) => {
  const theme = useTheme<Theme>();
  const {
    getState,
    options: {
      enableColumnPinning,
      muiTableFooterCellProps,
      enableKeyboardShortcuts,
    },
  } = table;
  const { density } = getState();
  const { column } = footer;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const isColumnPinned =
    enableColumnPinning &&
    columnDef.columnDefType !== 'group' &&
    column.getIsPinned();

  const args = { column, table };
  const tableCellProps = {
    ...parseFromValuesOrFunc(muiTableFooterCellProps, args),
    ...parseFromValuesOrFunc(columnDef.muiTableFooterCellProps, args),
    ...rest,
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    tableCellProps?.onKeyDown?.(event);
    cellKeyboardShortcuts({
      event,
      cellValue: footer.column.columnDef.footer,
      table,
    });
  };

  return (
    <Td
      textAlign={
        columnDefType === 'group'
          ? 'center'
          : theme.direction !== 'ltr'
            ? 'right'
            : 'left'
      }
      colSpan={footer.colSpan}
      data-index={staticColumnIndex}
      data-pinned={!!isColumnPinned || undefined}
      tabIndex={enableKeyboardShortcuts ? 0 : undefined}
      {...tableCellProps}
      onKeyDown={handleKeyDown}
      sx={{
        fontWeight: 'bold',
        p:
          density === 'compact'
            ? '0.5rem'
            : density === 'comfortable'
              ? '1rem'
              : '1.5rem',
        verticalAlign: 'top',
        ...getCommonMRTCellStyles({
          column,
          header: footer,
          table,
          tableCellProps,
          theme,
        }),
        ...(parseFromValuesOrFunc(tableCellProps?.sx, theme) as any),
      }}
    >
      {tableCellProps.children ??
        (footer.isPlaceholder
          ? null
          : (parseFromValuesOrFunc(columnDef.Footer, {
              column,
              footer,
              table,
            }) ??
            columnDef.footer ??
            null))}
    </Td>
  );
};
