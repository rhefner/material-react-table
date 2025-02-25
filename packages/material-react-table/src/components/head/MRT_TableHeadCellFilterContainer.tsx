import { Collapse, type CollapseProps } from '@chakra-ui/react';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { getColumnFilterInfo } from '../../utils/column.utils';
import { MRT_FilterCheckbox } from '../inputs/MRT_FilterCheckbox';
import { MRT_FilterRangeFields } from '../inputs/MRT_FilterRangeFields';
import { MRT_FilterRangeSlider } from '../inputs/MRT_FilterRangeSlider';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import {
  CRT_DatePicker,
  CRT_DateRangePicker,
  CRT_DateTimePicker,
  CRT_DateTimeRangePicker,
  CRT_TimePicker,
  CRT_TimeRangePicker,
} from '../custom';

export interface MRT_TableHeadCellFilterContainerProps<
  TData extends MRT_RowData,
> extends Omit<CollapseProps, 'in'> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellFilterContainer = <TData extends MRT_RowData>({
  header,
  table,
  ...rest
}: MRT_TableHeadCellFilterContainerProps<TData>) => {
  const {
    getState,
    options: { columnFilterDisplayMode },
  } = table;
  const { showColumnFilters } = getState();
  const { column } = header;
  const { columnDef } = column;
  const { isRangeFilter } = getColumnFilterInfo({ header, table });

  // Determine which filter component to render based on the filterVariant prop
  const renderFilterComponent = () => {
    switch (columnDef.filterVariant) {
      case 'checkbox':
        return <MRT_FilterCheckbox column={column} table={table} />;
      case 'range-slider':
        return <MRT_FilterRangeSlider header={header} table={table} />;
      case 'date':
        return (
          <MRT_FilterTextField 
            header={header} 
            table={table} 
            customFilterComponent={CRT_DatePicker}
          />
        );
      case 'date-range':
        return (
          <MRT_FilterTextField 
            header={header} 
            table={table} 
            customFilterComponent={CRT_DateRangePicker}
          />
        );
      case 'time':
        return (
          <MRT_FilterTextField 
            header={header} 
            table={table} 
            customFilterComponent={CRT_TimePicker}
          />
        );
      case 'time-range':
        return (
          <MRT_FilterTextField 
            header={header} 
            table={table} 
            customFilterComponent={CRT_TimeRangePicker}
          />
        );
      case 'datetime':
        return (
          <MRT_FilterTextField 
            header={header} 
            table={table} 
            customFilterComponent={CRT_DateTimePicker}
          />
        );
      case 'datetime-range':
        return (
          <MRT_FilterTextField 
            header={header} 
            table={table} 
            customFilterComponent={CRT_DateTimeRangePicker}
          />
        );
      default:
        return isRangeFilter ? (
          <MRT_FilterRangeFields header={header} table={table} />
        ) : (
          <MRT_FilterTextField header={header} table={table} />
        );
    }
  };

  return (
    <Collapse
      in={showColumnFilters || columnFilterDisplayMode === 'popover'}
      animateOpacity
      {...rest}
    >
      {renderFilterComponent()}
    </Collapse>
  );
};
