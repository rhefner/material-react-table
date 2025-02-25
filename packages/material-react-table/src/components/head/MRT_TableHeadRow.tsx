import { Tr, useColorModeValue, type TableRowProps } from '@chakra-ui/react';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableHeadRowProps<TData extends MRT_RowData>
  extends TableRowProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  headerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadRow = <TData extends MRT_RowData>({
  columnVirtualizer,
  headerGroup,
  table,
  ...rest
}: MRT_TableHeadRowProps<TData>) => {
  const shadowColor = useColorModeValue(
    'rgba(0, 0, 0, 0.1)',
    'rgba(0, 0, 0, 0.3)',
  );

  const {
    options: {
      enableStickyHeader,
      layoutMode,
      mrtTheme: { baseBackgroundColor },
      muiTableHeadRowProps,
    },
  } = table;

  const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } =
    columnVirtualizer ?? {};

  const tableRowProps = {
    ...parseFromValuesOrFunc(muiTableHeadRowProps, {
      headerGroup,
      table,
    }),
    ...rest,
  };

  return (
    <Tr
      {...tableRowProps}
      sx={{
        backgroundColor: baseBackgroundColor,
        boxShadow: `4px 0 8px ${shadowColor}`,
        display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
        position:
          enableStickyHeader && layoutMode === 'semantic'
            ? 'sticky'
            : 'relative',
        top: 0,
        ...(parseFromValuesOrFunc(tableRowProps?.sx, null) as any),
      }}
    >
      {virtualPaddingLeft ? (
        <th style={{ display: 'flex', width: virtualPaddingLeft }} />
      ) : null}
      {(virtualColumns ?? headerGroup.headers).map(
        (headerOrVirtualHeader, staticColumnIndex) => {
          let header = headerOrVirtualHeader as MRT_Header<TData>;
          if (columnVirtualizer) {
            staticColumnIndex = (headerOrVirtualHeader as MRT_VirtualItem)
              .index;
            header = headerGroup.headers[staticColumnIndex];
          }

          return header ? (
            <MRT_TableHeadCell
              columnVirtualizer={columnVirtualizer}
              header={header}
              key={header.id}
              staticColumnIndex={staticColumnIndex}
              table={table}
            />
          ) : null;
        },
      )}
      {virtualPaddingRight ? (
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </Tr>
  );
};
