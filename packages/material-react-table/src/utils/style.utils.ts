import { type CSSProperties } from 'react';
import {
  type MRT_RowData,
  type MRT_Column,
  type MRT_Header,
  type MRT_TableInstance,
  type MRT_Theme,
  MRT_TableOptions,
} from '../types';
import { alpha, darken, lighten } from './color.utils';
import { parseFromValuesOrFunc } from './utils';
import { TooltipProps, TableCellProps } from '@chakra-ui/react';
import { useTheme, type Theme } from '../hooks/custom/useTheme';

export const parseCSSVarId = (id: string) => id.replace(/[^a-zA-Z0-9]/g, '_');

export const getMRTTheme = <TData extends MRT_RowData>(
  mrtTheme: MRT_TableOptions<TData>['mrtTheme'],
  muiTheme: Theme,
): MRT_Theme => {
  const mrtThemeOverrides = parseFromValuesOrFunc(mrtTheme, muiTheme);

  const baseBackgroundColor =
    mrtThemeOverrides?.baseBackgroundColor ??
    (muiTheme.colorMode === 'dark'
      ? muiTheme.colors.gray[900]
      : muiTheme.colors.white);
  const matchHighlightColor =
    (mrtThemeOverrides?.matchHighlightColor ?? muiTheme.colorMode === 'dark')
      ? muiTheme.colors.yellow[600]
      : muiTheme.colors.yellow[300];
  const cellNavigationOutlineColor =
    (mrtThemeOverrides?.cellNavigationOutlineColor ??
    muiTheme.colorMode === 'dark')
      ? muiTheme.colors.blue[300]
      : muiTheme.colors.blue[600];
  const menuBackgroundColor =
    mrtThemeOverrides?.menuBackgroundColor ??
    (muiTheme.colorMode === 'dark'
      ? muiTheme.colors.gray[800]
      : muiTheme.colors.gray[100]);
  const pinnedRowBackgroundColor =
    mrtThemeOverrides?.pinnedRowBackgroundColor ??
    (muiTheme.colorMode === 'dark'
      ? muiTheme.colors.gray[700]
      : muiTheme.colors.gray[50]);
  const selectedRowBackgroundColor =
    mrtThemeOverrides?.selectedRowBackgroundColor ??
    (muiTheme.colorMode === 'dark'
      ? muiTheme.colors.blue[900]
      : muiTheme.colors.blue[50]);
  const draggingBorderColor =
    (mrtThemeOverrides?.draggingBorderColor ?? muiTheme.colorMode === 'dark')
      ? muiTheme.colors.blue[600]
      : muiTheme.colors.blue[300];

  return {
    baseBackgroundColor,
    cellNavigationOutlineColor,
    draggingBorderColor,
    matchHighlightColor,
    menuBackgroundColor,
    pinnedRowBackgroundColor,
    selectedRowBackgroundColor,
    ...mrtThemeOverrides,
  };
};

export const commonCellBeforeAfterStyles = {
  content: '""',
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: -1,
} as const;

export const getCommonPinnedCellStyles = <TData extends MRT_RowData>({
  column,
  table,
  theme,
}: {
  column?: MRT_Column<TData>;
  table: MRT_TableInstance<TData>;
  theme: Theme;
}) => {
  const { getState } = table;
  const { hoveredColumn } = getState();

  const isPinned = column?.getIsPinned();
  const isHovered = column?.id === hoveredColumn?.id;

  let backgroundColor =
    theme.colorMode === 'dark' ? theme.colors.gray[900] : theme.colors.white;
  let boxShadow = undefined;

  if (isHovered) {
    boxShadow = `2px 0 0 0 ${theme.colorMode === 'dark' ? theme.colors.blue[300] : theme.colors.blue[500]} inset`;
  }

  if (isPinned) {
    backgroundColor =
      theme.colorMode === 'dark'
        ? theme.colors.gray[700]
        : theme.colors.gray[50];

    if (isPinned === 'left') {
      boxShadow = `1px 0 0 0 ${theme.colorMode === 'dark' ? theme.colors.gray[700] : theme.colors.gray[200]}`;
    } else if (isPinned === 'right') {
      boxShadow = `-1px 0 0 0 ${theme.colorMode === 'dark' ? theme.colors.gray[700] : theme.colors.gray[200]}`;
    }
  }

  return {
    backgroundColor,
    boxShadow,
    left: isPinned === 'left' ? 0 : undefined,
    opacity: isPinned ? 1 : undefined,
    position: isPinned ? 'sticky' : undefined,
    right: isPinned === 'right' ? 0 : undefined,
    zIndex: isPinned ? 1 : undefined,
  } as CSSProperties;
};
export const getCommonMRTCellStyles = <TData extends MRT_RowData>({
  column,
  header,
  table,
  tableCellProps,
  theme,
}: {
  column: MRT_Column<TData>;
  header?: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
  tableCellProps: TableCellProps;
  theme: Theme;
}) => {
  const {
    getState,
    options: { enableColumnVirtualization, layoutMode },
  } = table;
  const { draggingColumn } = getState();
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const isColumnPinned =
    columnDef.columnDefType !== 'group' && column.getIsPinned();

  const widthStyles: CSSProperties = {
    minWidth: `max(calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId(
      header?.id ?? column.id,
    )}-size) * 1px), ${columnDef.minSize ?? 30}px)`,
    width: `calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId(
      header?.id ?? column.id,
    )}-size) * 1px)`,
  };

  if (layoutMode === 'grid') {
    widthStyles.flex = `${
      [0, false].includes(columnDef.grow!)
        ? 0
        : `var(--${header ? 'header' : 'col'}-${parseCSSVarId(
            header?.id ?? column.id,
          )}-size)`
    } 0 auto`;
  } else if (layoutMode === 'grid-no-grow') {
    widthStyles.flex = `${+(columnDef.grow || 0)} 0 auto`;
  }

  const pinnedStyles = isColumnPinned
    ? {
        ...getCommonPinnedCellStyles({ column, table, theme }),
        left:
          isColumnPinned === 'left'
            ? `${column.getStart('left')}px`
            : undefined,
        opacity: 0.97,
        position: 'sticky',
        right:
          isColumnPinned === 'right'
            ? `${column.getAfter('right')}px`
            : undefined,
      }
    : {};

  return {
    backgroundColor: 'inherit',
    backgroundImage: 'inherit',
    display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
    justifyContent:
      columnDefType === 'group'
        ? 'center'
        : layoutMode?.startsWith('grid')
          ? tableCellProps.align
          : undefined,
    opacity:
      table.getState().draggingColumn?.id === column.id ||
      table.getState().hoveredColumn?.id === column.id
        ? 0.5
        : 1,
    position: 'relative',
    transition: enableColumnVirtualization
      ? 'none'
      : `padding 150ms ease-in-out`,
    zIndex:
      column.getIsResizing() || draggingColumn?.id === column.id
        ? 2
        : columnDefType !== 'group' && isColumnPinned
          ? 1
          : 0,
    '&:focus-visible': {
      outline: `2px solid ${table.options.mrtTheme.cellNavigationOutlineColor}`,
      outlineOffset: '-2px',
    },
    ...pinnedStyles,
    ...widthStyles,
    ...(parseFromValuesOrFunc(tableCellProps?.sx, theme) as any),
  };
};

export const getCommonToolbarStyles = <TData extends MRT_RowData>({
  table,
}: {
  table: MRT_TableInstance<TData>;
  theme: Theme;
}) => ({
  alignItems: 'flex-start',
  backgroundColor: table.options.mrtTheme.baseBackgroundColor,
  display: 'grid',
  flexWrap: 'wrap-reverse',
  minHeight: '3.5rem',
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 150ms ease-in-out',
  zIndex: 1,
});

export const flipIconStyles = (theme: Theme) =>
  (theme.direction as any) === 'rtl'
    ? { style: { transform: 'scaleX(-1)' } }
    : undefined;

export const getCommonTooltipProps = (
  placement?: TooltipProps['placement'],
): Partial<TooltipProps> => ({
  openDelay: 1000,
  placement,
});
