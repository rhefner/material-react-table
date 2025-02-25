import {
  Tfoot,
  useTheme,
  useColorMode,
  type TableFooterProps as ChakraTableFooterProps,
} from '@chakra-ui/react';
import React from 'react';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import {
  type MRT_ColumnVirtualizer,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableFooterProps<TData extends MRT_RowData>
  extends ChakraTableFooterProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooter = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
  ...rest
}: MRT_TableFooterProps<TData>) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const {
    getState,
    options: { enableStickyFooter, layoutMode, muiTableFooterProps },
    refs: { tableFooterRef },
  } = table;
  const { isFullScreen } = getState();

  const tableFooterProps = {
    ...parseFromValuesOrFunc(muiTableFooterProps, {
      table,
    }),
    ...rest,
  };

  const stickFooter =
    (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;

  const footerGroups = table.getFooterGroups();

  //if no footer cells at all, skip footer
  if (
    !footerGroups.some((footerGroup) =>
      footerGroup.headers?.some(
        (header) =>
          (typeof header.column.columnDef.footer === 'string' &&
            !!header.column.columnDef.footer) ||
          header.column.columnDef.Footer,
      ),
    )
  ) {
    return null;
  }

  // Filter out properties that might cause issues with Chakra UI components
  const safeFooterProps = { ...tableFooterProps };
  delete (safeFooterProps as any).sx;
  // Don't remove ref props, handle them properly instead

  return (
    <Tfoot
      {...safeFooterProps}
      ref={(node) => {
        if (node) {
          tableFooterRef.current = node;
          // Handle ref properly if it exists
          const footerPropsWithRef = tableFooterProps as any;
          if (footerPropsWithRef.ref) {
            if (typeof footerPropsWithRef.ref === 'function') {
              footerPropsWithRef.ref(node);
            } else if (footerPropsWithRef.ref.hasOwnProperty('current')) {
              footerPropsWithRef.ref.current = node;
            }
          }
        }
      }}
      sx={{
        bottom: stickFooter ? 0 : undefined,
        display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
        opacity: stickFooter ? 0.97 : undefined,
        outline: stickFooter
          ? colorMode === 'light'
            ? '1px solid var(--chakra-colors-gray-300)'
            : '1px solid var(--chakra-colors-gray-700)'
          : undefined,
        position: stickFooter ? 'sticky' : 'relative',
        zIndex: stickFooter ? 1 : undefined,
        ...(parseFromValuesOrFunc(tableFooterProps?.sx, theme) as any),
      }}
    >
      {footerGroups.map((footerGroup) => (
        <MRT_TableFooterRow
          columnVirtualizer={columnVirtualizer}
          footerGroup={footerGroup as any}
          key={footerGroup.id}
          table={table}
        />
      ))}
    </Tfoot>
  );
};
