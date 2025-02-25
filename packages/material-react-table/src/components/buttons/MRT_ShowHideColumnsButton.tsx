import { type MouseEvent, useState } from 'react';
import {
  IconButton,
  Tooltip,
  type IconButtonProps,
  Icon,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';

export interface MRT_ShowHideColumnsButtonProps<TData extends MRT_RowData>
  extends Omit<IconButtonProps, 'aria-label'> {
  'aria-label'?: string;
  table: MRT_TableInstance<TData>;
}

export const MRT_ShowHideColumnsButton = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_ShowHideColumnsButtonProps<TData>) => {
  const {
    options: {
      icons: { ViewColumnIcon },
      localization,
    },
  } = table;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { 'aria-label': ariaLabel, ...restProps } = rest;

  return (
    <>
      <Tooltip label={restProps?.title ?? localization.showHideColumns}>
        <IconButton
          aria-label={ariaLabel ?? localization.showHideColumns}
          onClick={handleClick}
          {...restProps}
          icon={<Icon as={ViewColumnIcon} />}
        />
      </Tooltip>
      {anchorEl && (
        <MRT_ShowHideColumnsMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          table={table}
        />
      )}
    </>
  );
};
