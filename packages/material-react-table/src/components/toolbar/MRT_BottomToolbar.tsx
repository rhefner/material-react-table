import { Box, useBreakpointValue } from '@chakra-ui/react';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { getCommonToolbarStyles } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { useTheme, type Theme } from '../../hooks/custom/useTheme';
export interface MRT_BottomToolbarProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

export const MRT_BottomToolbar = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_BottomToolbarProps<TData>) => {
  const {
    getState,
    options: {
      enablePagination,
      muiBottomToolbarProps,
      positionPagination,
      positionToolbarAlertBanner,
      positionToolbarDropZone,
      renderBottomToolbarCustomActions,
    },
    refs: { bottomToolbarRef },
  } = table;
  const { isFullScreen } = getState();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const theme = useTheme<Theme>();

  const toolbarProps = parseFromValuesOrFunc(muiBottomToolbarProps, { table });

  // Omit any props that might cause issues with Chakra UI's strict prop type checking
  const safeToolbarProps = { ...toolbarProps };
  // TypeScript types properly handled when destructuring into a new object
  delete (safeToolbarProps as any).ref;

  const stackAlertBanner = isMobile || !!renderBottomToolbarCustomActions;

  return (
    <div ref={bottomToolbarRef}>
      <Box
        {...safeToolbarProps}
        sx={{
          ...getCommonToolbarStyles({ table, theme }),
          bottom: isFullScreen ? '0' : undefined,
          boxShadow: 'rgba(190, 190, 190, 0.5) 0px 1px 2px -1px inset',
          left: 0,
          position: isFullScreen ? 'fixed' : 'relative',
          right: 0,
          ...(parseFromValuesOrFunc(toolbarProps?.sx, theme) as any),
        }}
      >
        <MRT_LinearProgressBar isTopToolbar={false} table={table} />
        {positionToolbarAlertBanner === 'bottom' && (
          <MRT_ToolbarAlertBanner
            stackAlertBanner={stackAlertBanner}
            table={table}
          />
        )}
        {['both', 'bottom'].includes(positionToolbarDropZone ?? '') && (
          <MRT_ToolbarDropZone table={table} />
        )}
        <Box
          sx={{
            alignItems: 'center',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            p: '0.5rem',
            width: '100%',
          }}
        >
          {renderBottomToolbarCustomActions ? (
            renderBottomToolbarCustomActions({ table })
          ) : (
            <span />
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: stackAlertBanner ? 'relative' : 'absolute',
              right: 0,
              top: 0,
            }}
          >
            {enablePagination &&
              ['both', 'bottom'].includes(positionPagination ?? '') && (
                <MRT_TablePagination
                  paginationPosition="bottom"
                  table={table}
                />
              )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};
