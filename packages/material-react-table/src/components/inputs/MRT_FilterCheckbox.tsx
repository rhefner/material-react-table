import {
  Checkbox,
  FormControl,
  FormLabel,
  Tooltip,
  type CheckboxProps,
} from '@chakra-ui/react';
import {
  type MRT_Column,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_FilterCheckboxProps<TData extends MRT_RowData>
  extends CheckboxProps {
  column: MRT_Column<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterCheckbox = <TData extends MRT_RowData>({
  column,
  table,
  ...rest
}: MRT_FilterCheckboxProps<TData>) => {
  const {
    getState,
    options: { localization, muiFilterCheckboxProps },
  } = table;
  const { density } = getState();
  const { columnDef } = column;

  const checkboxProps = {
    ...parseFromValuesOrFunc(muiFilterCheckboxProps, {
      column,
      table,
    }),
    ...parseFromValuesOrFunc(columnDef.muiFilterCheckboxProps, {
      column,
      table,
    }),
    ...rest,
  };

  const filterLabel = localization.filterByColumn?.replace(
    '{column}',
    columnDef.header,
  );

  const tooltipLabel = checkboxProps?.title ?? filterLabel;

  return (
    <Tooltip label={tooltipLabel} placement="top" hasArrow>
      <FormControl
        display="flex"
        alignItems="center"
        color="gray.600"
        fontWeight="normal"
        mt="-1px"
      >
        <Checkbox
          isChecked={column.getFilterValue() === 'true'}
          colorScheme={column.getFilterValue() === undefined ? 'gray' : 'blue'}
          isIndeterminate={column.getFilterValue() === undefined}
          size={density === 'compact' ? 'sm' : 'md'}
          {...checkboxProps}
          onChange={(e) => {
            column.setFilterValue(
              column.getFilterValue() === undefined
                ? 'true'
                : column.getFilterValue() === 'true'
                  ? 'false'
                  : undefined,
            );
            checkboxProps?.onChange?.(e);
          }}
          onClick={(e) => {
            e.stopPropagation();
            checkboxProps?.onClick?.(e);
          }}
          height="2.5rem"
          width="2.5rem"
        />
        <FormLabel
          htmlFor="filter-checkbox"
          mb={0}
          ml={2}
          cursor="pointer"
          onClick={() => {
            column.setFilterValue(
              column.getFilterValue() === undefined
                ? 'true'
                : column.getFilterValue() === 'true'
                  ? 'false'
                  : undefined,
            );
          }}
        >
          {checkboxProps.title ?? filterLabel}
        </FormLabel>
      </FormControl>
    </Tooltip>
  );
};
