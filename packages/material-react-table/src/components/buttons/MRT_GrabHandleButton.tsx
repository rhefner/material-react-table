import { type DragEventHandler } from 'react';
import { IconButton, Tooltip, type IconButtonProps } from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { getCommonTooltipProps } from '../../utils/style.utils';

export interface MRT_GrabHandleButtonProps<TData extends MRT_RowData>
  extends IconButtonProps {
  iconButtonProps?: IconButtonProps;
  location?: 'column' | 'row';
  onDragEnd: DragEventHandler<HTMLButtonElement>;
  onDragStart: DragEventHandler<HTMLButtonElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_GrabHandleButton = <TData extends MRT_RowData>({
  location,
  table,
  ...rest
}: MRT_GrabHandleButtonProps<TData>) => {
  const {
    options: {
      icons: { DragHandleIcon },
      localization,
    },
  } = table;

  return (
    <Tooltip
      {...getCommonTooltipProps('top')}
      label={rest?.title ?? localization.move}
    >
      <IconButton
        draggable="true"
        size="sm"
        {...rest}
        aria-label={rest.title ?? localization.move}
        onClick={(e) => {
          e.stopPropagation();
          rest?.onClick?.(e);
        }}
        _active={{ cursor: 'grabbing' }}
        _hover={{ backgroundColor: 'transparent', opacity: 1 }}
        cursor="grab"
        m="0 -0.1rem"
        opacity={location === 'row' ? 1 : 0.5}
        p="2px"
        transition="all 150ms ease-in-out"
        title={undefined}
      >
        <DragHandleIcon />
      </IconButton>
    </Tooltip>
  );
};
