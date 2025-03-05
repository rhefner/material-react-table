import { Fragment, useMemo } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Stack,
  Tag,
  type AlertProps,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { getMRT_SelectAllHandler } from '../../utils/row.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
import { useTheme, type Theme } from '../../hooks/custom/useTheme';

export interface MRT_ToolbarAlertBannerProps<TData extends MRT_RowData>
  extends AlertProps {
  stackAlertBanner?: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarAlertBanner = <TData extends MRT_RowData>({
  stackAlertBanner,
  table,
  ...rest
}: MRT_ToolbarAlertBannerProps<TData>) => {
  const theme = useTheme<Theme>();
  const {
    getFilteredSelectedRowModel,
    getCoreRowModel,
    getState,
    options: {
      enableRowSelection,
      enableSelectAll,
      localization,
      manualPagination,
      muiToolbarAlertBannerChipProps,
      muiToolbarAlertBannerProps,
      positionToolbarAlertBanner,
      renderToolbarAlertBannerContent,
      rowCount,
    },
    refs: { tablePaperRef },
  } = table;
  const { density, grouping, rowSelection, showAlertBanner } = getState();

  const alertProps = {
    ...parseFromValuesOrFunc(muiToolbarAlertBannerProps, {
      table,
    }),
    ...rest,
  };

  // Remove properties that might cause issues with Chakra UI's Alert component
  const safeAlertProps = { ...alertProps };
  delete (safeAlertProps as any).sx;
  delete (safeAlertProps as any).color;
  delete (safeAlertProps as any).icon;

  const chipProps = parseFromValuesOrFunc(muiToolbarAlertBannerChipProps, {
    table,
  });

  // Convert MUI chip props to Chakra Tag props
  const safeChipProps = { ...chipProps };
  delete (safeChipProps as any).label;
  delete (safeChipProps as any).sx;

  const totalRowCount = rowCount ?? getCoreRowModel().rows.length;

  const selectedRowCount = useMemo(
    () =>
      manualPagination
        ? Object.values(rowSelection).filter(Boolean).length
        : getFilteredSelectedRowModel().rows.length,
    [rowSelection, totalRowCount, manualPagination],
  );
  const selectedAlert =
    selectedRowCount > 0 ? (
      <Stack direction="row" align="center" spacing="16px">
        {localization.selectedCountOfRowCountRowsSelected
          ?.replace(
            '{selectedCount}',
            selectedRowCount.toLocaleString(localization.language),
          )
          ?.replace(
            '{rowCount}',
            totalRowCount.toLocaleString(localization.language),
          )}
        <Button
          onClick={(event) =>
            getMRT_SelectAllHandler({ table })(event, false, true)
          }
          size="sm"
          p="2px"
        >
          {localization.clearSelection}
        </Button>
      </Stack>
    ) : null;

  const groupedAlert =
    grouping.length > 0 ? (
      <span>
        {localization.groupedBy}{' '}
        {grouping.map((columnId, index) => (
          <Fragment key={`${index}-${columnId}`}>
            {index > 0 ? localization.thenBy : ''}
            <Tag
              size="md"
              {...safeChipProps}
              onClose={() => table.getColumn(columnId).toggleGrouping()}
            >
              {table.getColumn(columnId).columnDef.header}
            </Tag>
          </Fragment>
        ))}
      </span>
    ) : null;

  return (
    <Collapse
      in={showAlertBanner || !!selectedAlert || !!groupedAlert}
      animateOpacity
    >
      <Alert
        status="info"
        variant="subtle"
        {...safeAlertProps}
        sx={{
          borderRadius: 0,
          fontSize: '1rem',
          left: 0,
          mb: stackAlertBanner
            ? 0
            : positionToolbarAlertBanner === 'bottom'
              ? '-1rem'
              : undefined,
          p: 0,
          position: 'relative',
          right: 0,
          top: 0,
          width: '100%',
          zIndex: 2,
          ...(parseFromValuesOrFunc(alertProps?.sx, theme) as any),
        }}
      >
        {renderToolbarAlertBannerContent?.({
          groupedAlert,
          selectedAlert,
          table,
        }) ?? (
          <>
            {alertProps?.title && <AlertTitle>{alertProps.title}</AlertTitle>}
            <Stack
              p={
                positionToolbarAlertBanner !== 'head-overlay'
                  ? '0.5rem 1rem'
                  : density === 'spacious'
                    ? '0.75rem 1.25rem'
                    : density === 'comfortable'
                      ? '0.5rem 0.75rem'
                      : '0.25rem 0.5rem'
              }
            >
              {alertProps?.children}
              {alertProps?.children && (selectedAlert || groupedAlert) && (
                <br />
              )}
              <Box display="flex">
                {enableRowSelection &&
                  enableSelectAll &&
                  positionToolbarAlertBanner === 'head-overlay' && (
                    <MRT_SelectCheckbox table={table} />
                  )}{' '}
                {selectedAlert}
              </Box>
              {selectedAlert && groupedAlert && <br />}
              {groupedAlert}
            </Stack>
          </>
        )}
      </Alert>
    </Collapse>
  );
};
