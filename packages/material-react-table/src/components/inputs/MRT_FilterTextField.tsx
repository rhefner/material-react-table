import {
  type ChangeEvent,
  type MouseEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Checkbox,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
  Flex,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';
import { debounce } from '../../utils/common.utils';
import { CRT_Autocomplete } from '../custom/CRT_Autocomplete';
import { CRT_DatePicker, CRT_DateTimePicker, CRT_TimePicker } from '../custom';

import {
  type DropdownOption,
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import {
  getColumnFilterInfo,
  useDropdownOptions,
} from '../../utils/column.utils';
import { getValueAndLabel, parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import { useTheme } from '../../hooks/custom/useTheme';

export interface MRT_FilterTextFieldProps<TData extends MRT_RowData> {
  header: MRT_Header<TData>;
  rangeFilterIndex?: number;
  table: MRT_TableInstance<TData>;
  customFilterComponent?: React.ComponentType<any>;
}

export const MRT_FilterTextField = <TData extends MRT_RowData>({
  header,
  rangeFilterIndex,
  table,
  customFilterComponent: CustomFilterComponent,
  ...rest
}: MRT_FilterTextFieldProps<TData>) => {
  const {
    options: {
      enableColumnFilterModes,
      icons: { CloseIcon, FilterListIcon },
      localization,
      manualFiltering,
      muiFilterAutocompleteProps,
      muiFilterDatePickerProps,
      muiFilterDateTimePickerProps,
      muiFilterTextFieldProps,
      muiFilterTimePickerProps,
    },
    refs: { filterInputRefs },
    setColumnFilterFns,
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { filterVariant } = columnDef;
  const theme = useTheme();

  const args = { column, rangeFilterIndex, table };

  const textFieldProps = {
    ...parseFromValuesOrFunc(muiFilterTextFieldProps, args),
    ...parseFromValuesOrFunc(columnDef.muiFilterTextFieldProps, args),
    ...rest,
  };

  const autocompleteProps = {
    ...parseFromValuesOrFunc(muiFilterAutocompleteProps, args),
    ...parseFromValuesOrFunc(columnDef.muiFilterAutocompleteProps, args),
  };

  const datePickerProps = {
    ...parseFromValuesOrFunc(muiFilterDatePickerProps, args),
    ...parseFromValuesOrFunc(columnDef.muiFilterDatePickerProps, args),
  };

  const dateTimePickerProps = {
    ...parseFromValuesOrFunc(muiFilterDateTimePickerProps, args),
    ...parseFromValuesOrFunc(columnDef.muiFilterDateTimePickerProps, args),
  };

  const timePickerProps = {
    ...parseFromValuesOrFunc(muiFilterTimePickerProps, args),
    ...parseFromValuesOrFunc(columnDef.muiFilterTimePickerProps, args),
  };

  const {
    allowedColumnFilterOptions,
    currentFilterOption,
    facetedUniqueValues,
    isAutocompleteFilter,
    isDateFilter,
    isMultiSelectFilter,
    isRangeFilter,
    isSelectFilter,
    isTextboxFilter,
  } = getColumnFilterInfo({ header, table });

  const dropdownOptions = useDropdownOptions({ header, table });

  const filterChipLabel = ['empty', 'notEmpty'].includes(currentFilterOption)
    ? localization[
        `filter${
          currentFilterOption?.charAt?.(0)?.toUpperCase() +
          currentFilterOption?.slice(1)
        }` as keyof typeof localization
      ]
    : '';

  const filterPlaceholder = !isRangeFilter
    ? (textFieldProps?.placeholder ??
      localization.filterByColumn?.replace(
        '{column}',
        String(columnDef.header),
      ))
    : rangeFilterIndex === 0
      ? localization.min
      : rangeFilterIndex === 1
        ? localization.max
        : '';

  const showChangeModeButton = !!(
    enableColumnFilterModes &&
    columnDef.enableColumnFilterModes !== false &&
    !rangeFilterIndex &&
    (allowedColumnFilterOptions === undefined ||
      !!allowedColumnFilterOptions?.length)
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [filterValue, setFilterValue] = useState<string | string[]>(() =>
    isMultiSelectFilter
      ? (column.getFilterValue() as string[]) || []
      : isRangeFilter
        ? (column.getFilterValue() as [string, string])?.[
            rangeFilterIndex as number
          ] || ''
        : isAutocompleteFilter
          ? typeof column.getFilterValue() === 'string'
            ? (column.getFilterValue() as string)
            : ''
          : ((column.getFilterValue() as string) ?? ''),
  );
  const [autocompleteValue, setAutocompleteValue] =
    useState<DropdownOption | null>(() =>
      isAutocompleteFilter
        ? ((column.getFilterValue() || null) as DropdownOption | null)
        : null,
    );

  const handleChangeDebounced = useCallback(
    debounce(
      (newValue: any) => {
        if (isRangeFilter) {
          column.setFilterValue((old: Array<Date | null | number | string>) => {
            const newFilterValues = old ?? ['', ''];
            newFilterValues[rangeFilterIndex as number] = newValue ?? undefined;
            return newFilterValues;
          });
        } else {
          column.setFilterValue(newValue ?? undefined);
        }
      },
      isTextboxFilter ? (manualFiltering ? 400 : 200) : 1,
    ),
    [],
  );

  const handleChange = (newValue: any) => {
    setFilterValue(newValue ?? '');
    handleChangeDebounced(newValue);
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      textFieldProps.type === 'date'
        ? event.target.valueAsDate
        : textFieldProps.type === 'number'
          ? event.target.valueAsNumber
          : event.target.value;
    handleChange(newValue);
    textFieldProps?.onChange?.(event);
  };

  const handleAutocompleteInputChange = (
    _event: SyntheticEvent,
    newValue: string,
  ) => {
    handleChange(newValue);
  };

  const handleAutocompleteChange = (newValue: DropdownOption | null) => {
    setAutocompleteValue(newValue);
    handleChangeDebounced(getValueAndLabel(newValue).value);
  };

  const handleClear = () => {
    if (isMultiSelectFilter) {
      setFilterValue([]);
      column.setFilterValue([]);
    } else if (isRangeFilter) {
      setFilterValue('');
      column.setFilterValue((old: [string | undefined, string | undefined]) => {
        const newFilterValues = (Array.isArray(old) && old) || ['', ''];
        newFilterValues[rangeFilterIndex as number] = undefined;
        return newFilterValues;
      });
    } else if (isAutocompleteFilter) {
      setAutocompleteValue(null);
      setFilterValue('');
      column.setFilterValue(undefined);
    } else {
      setFilterValue('');
      column.setFilterValue(undefined);
    }
  };

  const handleClearEmptyFilterChip = () => {
    setFilterValue('');
    column.setFilterValue(undefined);
    setColumnFilterFns((prev) => ({
      ...prev,
      [header.id]: allowedColumnFilterOptions?.[0] ?? 'fuzzy',
    }));
  };

  const handleFilterMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const filterValue = column.getFilterValue();
      if (filterValue === undefined) {
        handleClear();
      } else if (isRangeFilter && rangeFilterIndex !== undefined) {
        setFilterValue((filterValue as [string, string])[rangeFilterIndex]);
      } else {
        setFilterValue(filterValue as string);
      }
    }
    isMounted.current = true;
  }, [column.getFilterValue()]);

  if (columnDef.Filter) {
    return (
      <>{columnDef.Filter?.({ column, header, rangeFilterIndex, table })}</>
    );
  }

  if (CustomFilterComponent) {
    const filterVal = isRangeFilter
      ? (column.getFilterValue() as [string, string])?.[
          rangeFilterIndex as number
        ]
      : column.getFilterValue();

    const handleCustomFilterChange = (newValue: any) => {
      if (isRangeFilter && rangeFilterIndex !== undefined) {
        const newRangeValue = [
          ...((column.getFilterValue() as [string, string]) || ['', '']),
        ];
        newRangeValue[rangeFilterIndex] = newValue;
        column.setFilterValue(newRangeValue);
      } else {
        column.setFilterValue(newValue);
      }
    };

    return (
      <Box position="relative" w="100%">
        <CustomFilterComponent
          value={filterVal}
          onChange={handleCustomFilterChange}
          {...textFieldProps}
        />
      </Box>
    );
  }

  if (filterChipLabel) {
    return (
      <Tag variant="outline" size="md" borderRadius="full" colorScheme="blue">
        <TagLabel>{filterChipLabel}</TagLabel>
        <TagCloseButton onClick={handleClearEmptyFilterChip} />
      </Tag>
    );
  }

  const commonProps = {
    'aria-label': filterPlaceholder,
    placeholder: filterPlaceholder,
    size: 'md',
    width: isDateFilter
      ? '160px'
      : enableColumnFilterModes && rangeFilterIndex === 0
        ? '110px'
        : isRangeFilter
          ? '100px'
          : '120px',
    ...textFieldProps,
  };

  if (filterVariant?.startsWith('time')) {
    return (
      <CRT_TimePicker
        value={filterValue || null}
        onChange={(newValue) => handleChange(newValue)}
        {...commonProps}
        {...timePickerProps}
      />
    );
  }

  if (filterVariant?.startsWith('datetime')) {
    return (
      <CRT_DateTimePicker
        value={filterValue || null}
        onChange={(newValue) => handleChange(newValue)}
        {...commonProps}
        {...dateTimePickerProps}
      />
    );
  }

  if (filterVariant?.startsWith('date')) {
    return (
      <CRT_DatePicker
        value={filterValue || null}
        onChange={(newValue) => handleChange(newValue)}
        {...commonProps}
        {...datePickerProps}
      />
    );
  }

  if (isAutocompleteFilter) {
    return (
      <Box position="relative">
        <CRT_Autocomplete
          freeSolo
          options={
            dropdownOptions?.map((option) => getValueAndLabel(option)) ?? []
          }
          value={autocompleteValue}
          onChange={(_e, newValue) =>
            handleAutocompleteChange(newValue as DropdownOption | null)
          }
          inputValue={filterValue as string}
          onInputChange={(_e, newValue) =>
            handleAutocompleteInputChange(_e, newValue)
          }
          {...autocompleteProps}
        />
        {showChangeModeButton && (
          <MRT_FilterOptionMenu
            anchorEl={anchorEl}
            header={header}
            onSelect={() => setAnchorEl(null)}
            setAnchorEl={setAnchorEl}
            table={table}
          />
        )}
      </Box>
    );
  }

  if (isMultiSelectFilter) {
    return (
      <Box>
        <Flex flexWrap="wrap" gap={1}>
          {filterValue && (filterValue as string[]).length > 0 ? (
            (filterValue as string[]).map((value) => {
              const option = dropdownOptions?.find(
                (opt) => getValueAndLabel(opt).value === value,
              );
              return (
                <Tag
                  key={value}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                >
                  <TagLabel>
                    {getValueAndLabel(option).label ?? String(value)}
                  </TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      const newValues = (filterValue as string[]).filter(
                        (v) => v !== value,
                      );
                      handleChange(newValues);
                    }}
                  />
                </Tag>
              );
            })
          ) : (
            <Text color="gray.500" fontSize="sm">
              {filterPlaceholder}
            </Text>
          )}
        </Flex>
      </Box>
    );
  }

  if (isSelectFilter) {
    return (
      <Box position="relative">
        <Select
          {...commonProps}
          value={filterValue as string}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="">{filterPlaceholder}</option>
          {dropdownOptions?.map((option, index) => {
            const { label, value } = getValueAndLabel(option);
            return (
              <option key={`${label}-${index}`} value={value}>
                {label}
                {!columnDef.filterSelectOptions &&
                  ` (${facetedUniqueValues.get(value)})`}
              </option>
            );
          })}
        </Select>
        {showChangeModeButton && (
          <MRT_FilterOptionMenu
            anchorEl={anchorEl}
            header={header}
            onSelect={() => setAnchorEl(null)}
            setAnchorEl={setAnchorEl}
            table={table}
          />
        )}
      </Box>
    );
  }

  return (
    <Box position="relative">
      <FormControl>
        <InputGroup>
          {showChangeModeButton && (
            <InputLeftElement>
              <Tooltip label={localization.changeFilterMode}>
                <IconButton
                  aria-label={localization.changeFilterMode}
                  icon={<FilterListIcon />}
                  size="sm"
                  onClick={handleFilterMenuOpen}
                  variant="ghost"
                />
              </Tooltip>
            </InputLeftElement>
          )}
          <Input
            {...commonProps}
            value={filterValue as string}
            onChange={handleTextFieldChange}
            ref={(node) => {
              if (node && filterInputRefs.current) {
                filterInputRefs.current[
                  `${header.id}-${rangeFilterIndex ?? 0}`
                ] = node;
              }
            }}
          />
          {(filterValue as string)?.length > 0 && (
            <InputRightElement>
              <Tooltip label={localization.clearFilter}>
                <IconButton
                  aria-label={localization.clearFilter}
                  icon={<CloseIcon />}
                  onClick={handleClear}
                  size="sm"
                  variant="ghost"
                />
              </Tooltip>
            </InputRightElement>
          )}
        </InputGroup>
        {showChangeModeButton && (
          <FormHelperText fontSize="xs" whiteSpace="nowrap">
            {localization.filterMode.replace(
              '{filterType}',
              localization[
                `filter${
                  currentFilterOption?.charAt(0)?.toUpperCase() +
                  currentFilterOption?.slice(1)
                }` as keyof typeof localization
              ],
            )}
          </FormHelperText>
        )}
        {showChangeModeButton && (
          <MRT_FilterOptionMenu
            anchorEl={anchorEl}
            header={header}
            onSelect={() => setAnchorEl(null)}
            setAnchorEl={setAnchorEl}
            table={table}
          />
        )}
      </FormControl>
    </Box>
  );
};
