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
  useTheme,
  Flex,
  type Theme,
} from '@chakra-ui/react';
import { debounce } from '../../utils/common.utils';

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
  const theme = useTheme<Theme>();

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
  } as any;

  const dateTimePickerProps = {
    ...parseFromValuesOrFunc(muiFilterDateTimePickerProps, args),
    ...parseFromValuesOrFunc(columnDef.muiFilterDateTimePickerProps, args),
  } as any;

  const timePickerProps = {
    ...parseFromValuesOrFunc(muiFilterTimePickerProps, args),
    ...parseFromValuesOrFunc(columnDef.muiFilterTimePickerProps, args),
  } as any;

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
    _reason: any,
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

  // If a custom filter component is provided, render it
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

  // Return appropriate filter UI based on filter variant
  if (filterChipLabel) {
    // Empty/Not Empty filter UI
    return (
      <Tag variant="outline" size="md" borderRadius="full" colorScheme="blue">
        <TagLabel>{filterChipLabel}</TagLabel>
        <TagCloseButton onClick={handleClearEmptyFilterChip} />
      </Tag>
    );
  }

  // Check for different filter types and render appropriate UI
  if (isMultiSelectFilter) {
    return (
      <Box>
        {/* Multi-select filter using Chakra UI components */}
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

  if (isSelectFilter || isAutocompleteFilter) {
    return (
      <Select
        aria-label={`Filter ${columnDef.header}`}
        value={filterValue as string}
        placeholder={filterPlaceholder}
        size="md"
        {...(textFieldProps as any)}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">{filterPlaceholder}</option>
        {dropdownOptions?.map((option, index) => {
          const { label, value } = getValueAndLabel(option);
          return (
            <option key={`${label}-${index}`} value={value}>
              {label}
            </option>
          );
        })}
      </Select>
    );
  }

  return (
    <Box position="relative">
      <InputGroup>
        {showChangeModeButton && (
          <InputLeftElement>
            <IconButton
              aria-label={localization.changeFilterMode}
              icon={<FilterListIcon />}
              size="sm"
              onClick={handleFilterMenuOpen}
              variant="ghost"
            />
          </InputLeftElement>
        )}
        <Input
          placeholder={filterPlaceholder}
          value={filterValue as string}
          onChange={handleTextFieldChange}
          size="md"
          ref={(node) => {
            if (node && filterInputRefs.current) {
              filterInputRefs.current[`${header.id}-${rangeFilterIndex ?? 0}`] =
                node;
            }
          }}
          {...textFieldProps}
        />
        {(filterValue as string)?.length > 0 && (
          <InputRightElement>
            <IconButton
              aria-label={localization.clearFilter}
              icon={<CloseIcon />}
              onClick={handleClear}
              size="sm"
              variant="ghost"
            />
          </InputRightElement>
        )}
      </InputGroup>
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
};
