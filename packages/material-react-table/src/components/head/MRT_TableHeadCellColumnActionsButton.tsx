import { type MouseEvent, useState } from 'react';
import { IconButton, type IconButtonProps, Tooltip } from '@chakra-ui/react';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { getCommonTooltipProps } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_ColumnActionMenu } from '../menus/MRT_ColumnActionMenu';

export interface MRT_TableHeadCellColumnActionsButtonProps<
  TData extends MRT_RowData,
> extends Omit<IconButtonProps, 'aria-label'> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
  'aria-label'?: string;
}

export const MRT_TableHeadCellColumnActionsButton = <
  TData extends MRT_RowData,
>({
  header,
  table,
  ...rest
}: MRT_TableHeadCellColumnActionsButtonProps<TData>) => {
  const {
    options: {
      icons: { MoreVertIcon },
      localization,
      muiColumnActionsButtonProps,
    },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const iconButtonProps = {
    ...parseFromValuesOrFunc(muiColumnActionsButtonProps, {
      column,
      table,
    }),
    ...parseFromValuesOrFunc(columnDef.muiColumnActionsButtonProps, {
      column,
      table,
    }),
    ...rest,
  };

  // Remove props that Chakra doesn't support or handles differently
  const safeIconButtonProps = { ...iconButtonProps };
  delete (safeIconButtonProps as any).title;

  return (
    <>
      <Tooltip
        {...getCommonTooltipProps('top')}
        label={iconButtonProps?.title ?? localization.columnActions}
      >
        <IconButton
          aria-label={
            iconButtonProps?.['aria-label'] ?? localization.columnActions
          }
          onClick={handleClick}
          size="sm"
          height="2rem"
          width="2rem"
          m="-8px -4px"
          opacity={0.3}
          transition="all 150ms"
          _hover={{
            opacity: 1,
          }}
          {...safeIconButtonProps}
          icon={
            safeIconButtonProps?.icon ?? (
              <MoreVertIcon style={{ transform: 'scale(0.9)' }} />
            )
          }
        />
      </Tooltip>
      {anchorEl && (
        <MRT_ColumnActionMenu
          anchorEl={anchorEl}
          header={header}
          setAnchorEl={setAnchorEl}
          table={table}
        />
      )}
    </>
  );
};
