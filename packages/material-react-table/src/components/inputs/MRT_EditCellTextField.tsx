import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useState,
} from 'react';
import { Select, Input, type InputProps } from '@chakra-ui/react';
import {
  type MRT_Cell,
  type MRT_RowData,
  type MRT_TableInstance,
  type DropdownOption,
} from '../../types';
import { getValueAndLabel, parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_EditCellTextFieldProps<TData extends MRT_RowData>
  extends InputProps {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditCellTextField = <TData extends MRT_RowData>({
  cell,
  table,
  ...rest
}: MRT_EditCellTextFieldProps<TData>) => {
  const {
    getState,
    options: { createDisplayMode, editDisplayMode, muiEditTextFieldProps },
    refs: { editInputRefs },
    setCreatingRow,
    setEditingCell,
    setEditingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { creatingRow, editingRow } = getState();
  const { editSelectOptions, editVariant } = columnDef;

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const [value, setValue] = useState(() => cell.getValue<string>());
  const [completesComposition, setCompletesComposition] = useState(true);

  const inputProps: InputProps & {
    ref?:
      | React.RefObject<HTMLInputElement>
      | ((node: HTMLInputElement | null) => void);
  } = {
    ...parseFromValuesOrFunc(muiEditTextFieldProps, {
      cell,
      column,
      row,
      table,
    }),
    ...parseFromValuesOrFunc(columnDef.muiEditTextFieldProps, {
      cell,
      column,
      row,
      table,
    }),
    ...rest,
    value,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      rest.onChange?.(event);
    },
    onBlur: (event: FocusEvent<HTMLInputElement>) => {
      if (completesComposition) {
        setEditingCell(null);
      }
      rest.onBlur?.(event);
    },
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && completesComposition) {
        setEditingCell(null);
      }
      rest.onKeyDown?.(event);
    },
    onCompositionStart: () => {
      setCompletesComposition(false);
    },
    onCompositionEnd: () => {
      setCompletesComposition(true);
    },
    ref: (node: HTMLInputElement | null) => {
      if (node && editInputRefs?.current) {
        editInputRefs.current[`${column.id}-${row.id}`] = node;
      }
    },
  };

  const selectOptions =
    typeof editSelectOptions === 'function'
      ? editSelectOptions({ cell, column, row, table })
      : editSelectOptions || [];

  return selectOptions.length > 0 ? (
    <Select
      value={value}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
      }}
      onBlur={inputProps.onBlur as any}
      onKeyDown={inputProps.onKeyDown as any}
      ref={(node: HTMLSelectElement | null) => {
        if (node && editInputRefs?.current) {
          editInputRefs.current[`${column.id}-${row.id}`] = node as any;
        }
      }}
    >
      {selectOptions.map((option) => {
        const { label, value } = getValueAndLabel(option);
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </Select>
  ) : (
    <Input {...inputProps} />
  );
};
