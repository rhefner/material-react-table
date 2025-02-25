import { IconButton, Tooltip, Icon } from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';

export interface MRT_ToggleGlobalFilterButtonProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
  title?: string;
  'aria-label'?: string;
}

export const MRT_ToggleGlobalFilterButton = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_ToggleGlobalFilterButtonProps<TData>) => {
  const {
    getState,
    options: {
      icons: { SearchIcon, SearchOffIcon },

      localization,
    },
    refs: { searchInputRef },
    setShowGlobalFilter,
  } = table;
  const { globalFilter, showGlobalFilter } = getState();

  const handleToggleSearch = () => {
    setShowGlobalFilter(!showGlobalFilter);
    queueMicrotask(() => searchInputRef.current?.focus());
  };

  const tooltipLabel = rest?.title ?? localization.showHideSearch;
  const ariaLabel = rest?.['aria-label'] ?? tooltipLabel;

  return (
    <Tooltip label={tooltipLabel}>
      <IconButton
        aria-label={ariaLabel}
        isActive={showGlobalFilter}
        onClick={handleToggleSearch}
        {...rest}
        icon={
          showGlobalFilter ? (
            <Icon as={SearchIcon} />
          ) : (
            <Icon as={SearchOffIcon} />
          )
        }
      />
    </Tooltip>
  );
};
