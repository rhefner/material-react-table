import {
  IconButton,
  Tooltip,
  type IconButtonProps,
  Icon,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';

export interface MRT_ToggleFiltersButtonProps<TData extends MRT_RowData>
  extends Omit<IconButtonProps, 'aria-label'> {
  'aria-label'?: string;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFiltersButton = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_ToggleFiltersButtonProps<TData>) => {
  const {
    getState,
    options: {
      icons: { FilterListIcon, FilterListOffIcon },
      localization,
    },
    setShowColumnFilters,
  } = table;
  const { showColumnFilters } = getState();

  const handleToggleShowFilters = () => {
    setShowColumnFilters(!showColumnFilters);
  };

  const { 'aria-label': ariaLabel, title, ...restProps } = rest;
  const tooltipLabel = title ?? localization.showHideFilters;
  const finalAriaLabel = ariaLabel ?? tooltipLabel;

  return (
    <Tooltip label={tooltipLabel}>
      <IconButton
        aria-label={finalAriaLabel}
        onClick={handleToggleShowFilters}
        {...restProps}
        icon={
          showColumnFilters ? (
            <Icon as={FilterListOffIcon} />
          ) : (
            <Icon as={FilterListIcon} />
          )
        }
      />
    </Tooltip>
  );
};
