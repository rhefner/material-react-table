import { type MouseEvent } from 'react';
import {
  Checkbox,
  Radio,
  Tooltip,
  useColorModeValue,
  type CheckboxProps,
  type RadioProps,
  type TooltipProps,
} from '@chakra-ui/react';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import {
  getIsRowSelected,
  getMRT_RowSelectionHandler,
  getMRT_SelectAllHandler,
} from '../../utils/row.utils';
import { getCommonTooltipProps } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_SelectCheckboxProps<TData extends MRT_RowData>
  extends CheckboxProps {
  row?: MRT_Row<TData>;
  staticRowIndex?: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_SelectCheckbox = <TData extends MRT_RowData>({
  row,
  staticRowIndex,
  table,
  ...rest
}: MRT_SelectCheckboxProps<TData>) => {
  const {
    getState,
    options: {
      enableMultiRowSelection,
      localization,
      muiSelectAllCheckboxProps,
      muiSelectCheckboxProps,
      selectAllMode,
    },
  } = table;
  const { density, isLoading } = getState();

  const selectAll = !row;

  const allRowsSelected = selectAll
    ? selectAllMode === 'page'
      ? table.getIsAllPageRowsSelected()
      : table.getIsAllRowsSelected()
    : undefined;

  const isChecked = selectAll
    ? allRowsSelected
    : getIsRowSelected({ row, table });

  const checkboxProps = {
    ...(selectAll
      ? parseFromValuesOrFunc(muiSelectAllCheckboxProps, { table })
      : parseFromValuesOrFunc(muiSelectCheckboxProps, {
          row,
          staticRowIndex,
          table,
        })),
    ...rest,
  };

  const onSelectionChange = row
    ? getMRT_RowSelectionHandler({
        row,
        staticRowIndex,
        table,
      })
    : undefined;

  const onSelectAllChange = getMRT_SelectAllHandler({ table });

  const isDisabled =
    isLoading || (row && !row.getCanSelect()) || row?.id === 'mrt-row-create';

  const size = density === 'compact' ? 'sm' : 'md';

  const bgColor = useColorModeValue('white', 'gray.800');

  const commonProps = {
    'aria-label': selectAll
      ? localization.toggleSelectAll
      : localization.toggleSelectRow,
    isChecked: isChecked,
    isDisabled: isDisabled,
    size: size,
    ...checkboxProps,
    onClick: (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      checkboxProps?.onClick?.(e as any);
    },
    onChange: (e: any) => {
      e.stopPropagation();
      selectAll ? onSelectAllChange(e) : onSelectionChange!(e);
    },
    height: density === 'compact' ? '1.75rem' : '2.5rem',
    width: density === 'compact' ? '1.75rem' : '2.5rem',
    zIndex: 0,
    bgColor: bgColor,
    ...(checkboxProps?.sx ? { sx: checkboxProps.sx } : {}),
  };

  const tooltipProps = {
    ...getCommonTooltipProps(),
    label:
      checkboxProps?.title ??
      (selectAll ? localization.toggleSelectAll : localization.toggleSelectRow),
  } as TooltipProps;

  return (
    <Tooltip {...tooltipProps}>
      {enableMultiRowSelection === false ? (
        <Radio {...(commonProps as unknown as RadioProps)} />
      ) : (
        <Checkbox
          isIndeterminate={
            !isChecked && selectAll
              ? table.getIsSomeRowsSelected()
              : row?.getIsSomeSelected() && row.getCanSelectSubRows()
          }
          {...(commonProps as unknown as CheckboxProps)}
        />
      )}
    </Tooltip>
  );
};
