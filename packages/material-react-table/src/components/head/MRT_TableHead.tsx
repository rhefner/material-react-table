import {
  Thead,
  Tr,
  Th,
  useTheme,
  type TableHeadProps,
  type Theme,
} from '@chakra-ui/react';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import {
  type MRT_ColumnVirtualizer,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_ToolbarAlertBanner } from '../toolbar/MRT_ToolbarAlertBanner';
import * as React from 'react';

export interface MRT_TableHeadProps<TData extends MRT_RowData>
  extends TableHeadProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  table: MRT_TableInstance<TData>;
  ref?: React.RefObject<HTMLTableSectionElement>;
}

export const MRT_TableHead = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
  ...rest
}: MRT_TableHeadProps<TData>) => {
  const {
    getState,
    options: {
      enableStickyHeader,
      layoutMode,
      muiTableHeadProps,
      positionToolbarAlertBanner,
    },
    refs: { tableHeadRef },
  } = table;
  const { isFullScreen, showAlertBanner } = getState();

  const tableHeadProps = {
    ...parseFromValuesOrFunc(muiTableHeadProps, { table }),
    ...rest,
  };

  const stickyHeader = enableStickyHeader || isFullScreen;
  const chakraTheme = useTheme<Theme>();

  return (
    <Thead
      {...tableHeadProps}
      ref={(ref: HTMLTableSectionElement) => {
        // @ts-ignore
        tableHeadRef.current = ref;
        if (tableHeadProps?.ref) {
          // Need to handle ref properly for Chakra UI
          // @ts-ignore
          tableHeadProps.ref.current = ref;
        }
      }}
      sx={{
        display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
        opacity: 0.97,
        position: stickyHeader ? 'sticky' : 'relative',
        top: stickyHeader && layoutMode?.startsWith('grid') ? 0 : undefined,
        zIndex: stickyHeader ? 2 : undefined,
        ...(parseFromValuesOrFunc(tableHeadProps?.sx, chakraTheme) as any),
      }}
    >
      {positionToolbarAlertBanner === 'head-overlay' &&
      (showAlertBanner || table.getSelectedRowModel().rows.length > 0) ? (
        <Tr
          style={{
            display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
          }}
        >
          <Th
            colSpan={table.getVisibleLeafColumns().length}
            style={{
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              padding: 0,
            }}
          >
            <MRT_ToolbarAlertBanner table={table} />
          </Th>
        </Tr>
      ) : (
        table
          .getHeaderGroups()
          .map((headerGroup) => (
            <MRT_TableHeadRow
              columnVirtualizer={columnVirtualizer}
              headerGroup={headerGroup as any}
              key={headerGroup.id}
              table={table}
            />
          ))
      )}
    </Thead>
  );
};
