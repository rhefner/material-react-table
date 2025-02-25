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
      ? lighten(muiTheme.colors.gray[800], 0.05)
      : muiTheme.colors.white);

  return {
    baseBackgroundColor,
    cellNavigationOutlineColor: muiTheme.colors.blue[500],
    draggingBorderColor: muiTheme.colors.blue[500],
    matchHighlightColor:
      muiTheme.colorMode === 'dark'
        ? darken(muiTheme.colors.yellow[600], 0.25)
        : lighten(muiTheme.colors.yellow[300], 0.5),
    menuBackgroundColor: lighten(baseBackgroundColor, 0.07),
    pinnedRowBackgroundColor: alpha(muiTheme.colors.blue[500], 0.1),
    selectedRowBackgroundColor: alpha(muiTheme.colors.blue[500], 0.2),
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

  return {
    backgroundColor: isPinned ? theme.colors.gray[50] : undefined,
    boxShadow: isHovered
      ? `2px 0 0 0 ${theme.colors.blue[500]} inset`
      : isPinned === 'left'
        ? `1px 0 0 0 ${theme.colors.gray[200]}`
        : isPinned === 'right'
          ? `-1px 0 0 0 ${theme.colors.gray[200]}`
          : undefined,
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
