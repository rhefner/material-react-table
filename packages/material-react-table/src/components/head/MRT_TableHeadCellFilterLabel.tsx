import { type MouseEvent, useState } from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  SlideFade,
  Tooltip,
  type IconButtonProps,
} from '@chakra-ui/react';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import {
  getColumnFilterInfo,
  useDropdownOptions,
} from '../../utils/column.utils';
import { getValueAndLabel, parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableHeadCellFilterLabelProps<TData extends MRT_RowData>
  extends Omit<IconButtonProps, 'aria-label'> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellFilterLabel = <TData extends MRT_RowData = {}>({
  header,
  table,
  ...rest
}: MRT_TableHeadCellFilterLabelProps<TData>) => {
  const {
    options: {
      columnFilterDisplayMode,
      icons: { FilterAltIcon },
      localization,
    },
    refs: { filterInputRefs },
    setShowColumnFilters,
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const filterValue = column.getFilterValue() as [string, string] | string;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const {
    currentFilterOption,
    isMultiSelectFilter,
    isRangeFilter,
    isSelectFilter,
  } = getColumnFilterInfo({ header, table });

  const dropdownOptions = useDropdownOptions({ header, table });

  const getSelectLabel = (index?: number) =>
    getValueAndLabel(
      dropdownOptions?.find(
        (option) =>
          getValueAndLabel(option).value ===
          (index !== undefined ? filterValue[index] : filterValue),
      ),
    ).label;

  const isFilterActive =
    (Array.isArray(filterValue) && filterValue.some(Boolean)) ||
    (!!filterValue && !Array.isArray(filterValue));

  const filterTooltip =
    columnFilterDisplayMode === 'popover' && !isFilterActive
      ? localization.filterByColumn?.replace(
          '{column}',
          String(columnDef.header),
        )
      : localization.filteringByColumn
          .replace('{column}', String(columnDef.header))
          .replace(
            '{filterType}',
            currentFilterOption
              ? localization[
                  `filter${
                    currentFilterOption.charAt(0).toUpperCase() +
                    currentFilterOption.slice(1)
                  }` as keyof typeof localization
                ]
              : '',
          )
          .replace(
            '{filterValue}',
            `"${
              Array.isArray(filterValue)
                ? (filterValue as [string, string])
                    .map((value, index) =>
                      isMultiSelectFilter ? getSelectLabel(index) : value,
                    )
                    .join(
                      `" ${isRangeFilter ? localization.and : localization.or} "`,
                    )
                : isSelectFilter
                  ? getSelectLabel()
                  : (filterValue as string)
            }"`,
          )
          .replace('" "', '');

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (columnFilterDisplayMode === 'popover') {
      setAnchorEl(event.currentTarget);
    } else {
      setShowColumnFilters(true);
    }
    queueMicrotask(() => {
      filterInputRefs.current?.[`${column.id}-0`]?.focus?.();
      filterInputRefs.current?.[`${column.id}-0`]?.select?.();
    });
    event.stopPropagation();
  };

  const showFilterIcon =
    columnFilterDisplayMode === 'popover' ||
    (!!filterValue && !isRangeFilter) ||
    (isRangeFilter && (!!filterValue?.[0] || !!filterValue?.[1]));

  return (
    <>
      <SlideFade in={showFilterIcon} unmountOnExit>
        <Box flex="0 0">
          <Tooltip label={filterTooltip} placement="top" hasArrow>
            <IconButton
              aria-label={filterTooltip}
              icon={<FilterAltIcon />}
              onClick={handleClick}
              size="xs"
              variant="ghost"
              {...rest}
              height="16px"
              width="16px"
              ml="4px"
              opacity={isFilterActive ? 1 : 0.3}
              transform="scale(0.75)"
              transition="all 150ms ease-in-out"
            />
          </Tooltip>
        </Box>
      </SlideFade>
      {columnFilterDisplayMode === 'popover' && anchorEl && (
        <Popover
          isOpen={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          placement="bottom"
          closeOnBlur={true}
        >
          <PopoverContent onClick={(event) => event.stopPropagation()}>
            <PopoverBody p={4}>
              <MRT_TableHeadCellFilterContainer header={header} table={table} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};
