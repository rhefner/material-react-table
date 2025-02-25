import { useEffect, useRef, useState } from 'react';
import {
  FormHelperText,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Stack,
  type RangeSliderProps,
} from '@chakra-ui/react';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_FilterRangeSliderProps<TData extends MRT_RowData>
  extends Omit<RangeSliderProps, 'value' | 'onChange' | 'onChangeEnd'> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterRangeSlider = <TData extends MRT_RowData>({
  header,
  table,
  ...rest
}: MRT_FilterRangeSliderProps<TData>) => {
  const {
    options: { enableColumnFilterModes, localization, muiFilterSliderProps },
    refs: { filterInputRefs },
  } = table;
  const { column } = header;
  const { columnDef } = column;

  const currentFilterOption = columnDef._filterFn;

  const showChangeModeButton =
    enableColumnFilterModes && columnDef.enableColumnFilterModes !== false;

  const sliderProps = {
    ...parseFromValuesOrFunc(muiFilterSliderProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiFilterSliderProps, { column, table }),
    ...rest,
  };

  let [min, max] =
    sliderProps.min !== undefined && sliderProps.max !== undefined
      ? [sliderProps.min, sliderProps.max]
      : (column.getFacetedMinMaxValues() ?? [0, 1]);

  //fix potential TanStack Table bugs where min or max is an array
  if (Array.isArray(min)) min = min[0];
  if (Array.isArray(max)) max = max[0];
  if (min === null) min = 0;
  if (max === null) max = 1;

  const [filterValues, setFilterValues] = useState<[number, number]>([
    min,
    max,
  ]);
  const columnFilterValue = column.getFilterValue();

  const isMounted = useRef(false);
  const sliderWrapperRef = useRef<HTMLInputElement>(null);

  // prevent moving the focus to the next/prev cell when using the arrow keys
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.stopPropagation();
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      if (columnFilterValue === undefined) {
        setFilterValues([min, max]);
      } else if (Array.isArray(columnFilterValue)) {
        setFilterValues(columnFilterValue as [number, number]);
      }
    }
    isMounted.current = true;
  }, [columnFilterValue, min, max]);

  useEffect(() => {
    if (sliderWrapperRef.current) {
      filterInputRefs.current![`${column.id}-0`] = sliderWrapperRef.current;
    }
  }, [column.id, filterInputRefs]);

  // Create a clean version of sliderProps without properties that cause type errors
  const safeSliderProps: Record<string, any> = { ...sliderProps };
  delete safeSliderProps.onChange;
  delete safeSliderProps.onChangeEnd;
  delete safeSliderProps.value;

  // Chakra UI's RangeSlider requires these components
  return (
    <Stack>
      <div ref={sliderWrapperRef}>
        <RangeSlider
          min={min}
          max={max}
          onChange={(values: number[]) => {
            setFilterValues(values as [number, number]);
          }}
          onChangeEnd={(values: number[]) => {
            if (values[0] <= min && values[1] >= max) {
              //if the user has selected the entire range, remove the filter
              column.setFilterValue(undefined);
            } else {
              column.setFilterValue(values as [number, number]);
            }
          }}
          onKeyDown={handleKeyDown}
          value={filterValues as unknown as number[]}
          {...safeSliderProps}
          sx={{
            m: 'auto',
            minWidth: `${column.getSize() - 50}px`,
            mt: !showChangeModeButton ? '10px' : '6px',
            px: '4px',
            width: 'calc(100% - 8px)',
            ...(sliderProps?.sx as any),
          }}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </div>
      {showChangeModeButton ? (
        <FormHelperText
          sx={{
            fontSize: '0.75rem',
            lineHeight: '0.8rem',
            m: '-3px -6px',
            whiteSpace: 'nowrap',
          }}
        >
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
      ) : null}
    </Stack>
  );
};
