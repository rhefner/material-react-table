import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  IconButton,
  Select,
  Text,
  Tooltip,
  useBreakpointValue,
  useTheme,
  type BoxProps,
  type FlexProps,
  type SelectProps,
  type Theme,
  type ThemeTypings,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { getCommonTooltipProps } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';

const defaultRowsPerPage = [5, 10, 15, 20, 25, 30, 50, 100];

export interface MRT_TablePaginationProps<TData extends MRT_RowData>
  extends Partial<
    BoxProps & {
      SelectProps?: Partial<SelectProps>;
      disabled?: boolean;
      rowsPerPageOptions?: { label: string; value: number }[] | number[];
      showRowsPerPage?: boolean;
      showFirstButton?: boolean;
      showLastButton?: boolean;
    }
  > {
  paginationPosition?: 'bottom' | 'top';
  table: MRT_TableInstance<TData>;
}

export const MRT_TablePagination = <TData extends MRT_RowData>({
  paginationPosition = 'bottom',
  table,
  ...rest
}: MRT_TablePaginationProps<TData>) => {
  const chakraTheme = useTheme<Theme>();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const {
    getState,
    options: {
      enableToolbarInternalActions,
      icons: { ChevronLeftIcon, ChevronRightIcon, FirstPageIcon, LastPageIcon },
      id,
      localization,
      muiPaginationProps,
      paginationDisplayMode,
    },
  } = table;
  const {
    pagination: { pageIndex = 0, pageSize = 10 },
  } = getState();

  const paginationProps = {
    ...parseFromValuesOrFunc(muiPaginationProps, {
      table,
    }),
    ...rest,
  };

  const totalRowCount = table.getRowCount();
  const numberOfPages = table.getPageCount();
  const showFirstLastPageButtons = numberOfPages > 2;
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);

  const {
    SelectProps = {},
    disabled = false,
    rowsPerPageOptions = defaultRowsPerPage,
    showFirstButton = showFirstLastPageButtons,
    showLastButton = showFirstLastPageButtons,
    showRowsPerPage = true,
    ...restPaginationProps
  } = paginationProps ?? {};

  const disableBack = pageIndex <= 0 || disabled;
  const disableNext = lastRowIndex >= totalRowCount || disabled;

  const size: ThemeTypings['components']['Button']['sizes'] = isMobile
    ? 'sm'
    : 'md';

  const tooltipProps = getCommonTooltipProps();

  return (
    <Box
      className="MuiTablePagination-root"
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      gap="8px"
      justifyContent={{ base: 'center', md: 'space-between' }}
      justifySelf="flex-end"
      mt={
        paginationPosition === 'top' && enableToolbarInternalActions
          ? '3rem'
          : undefined
      }
      position="relative"
      px="8px"
      py="12px"
      zIndex={2}
      {...restPaginationProps}
    >
      {showRowsPerPage && (
        <Flex alignItems="center" gap="8px">
          <FormLabel htmlFor={`mrt-rows-per-page-${id}`} mb={0}>
            {localization.rowsPerPage}
          </FormLabel>
          <Select
            id={`mrt-rows-per-page-${id}`}
            aria-label={localization.rowsPerPage}
            isDisabled={disabled}
            onChange={(event) =>
              table.setPageSize(+(event.target.value as any))
            }
            value={pageSize.toString()}
            size={size}
            variant="outline"
            {...SelectProps}
          >
            {rowsPerPageOptions.map((option) => {
              const value = typeof option !== 'number' ? option.value : option;
              const label =
                typeof option !== 'number' ? option.label : `${option}`;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </Select>
        </Flex>
      )}
      {paginationDisplayMode === 'pages' ? (
        <Flex justifyContent="center">
          <HStack spacing={1}>
            {showFirstButton && (
              <IconButton
                aria-label={localization.goToFirstPage}
                icon={<FirstPageIcon />}
                isDisabled={disableBack || disabled}
                onClick={() => table.firstPage()}
                size={size}
                variant="ghost"
              />
            )}
            {Array.from({ length: numberOfPages }).map((_, index) => (
              <Button
                key={index}
                aria-label={`Go to page ${index + 1}`}
                isDisabled={disabled}
                onClick={() => table.setPageIndex(index)}
                size={size}
                variant={pageIndex === index ? 'solid' : 'ghost'}
              >
                {index + 1}
              </Button>
            ))}
            {showLastButton && (
              <IconButton
                aria-label={localization.goToLastPage}
                icon={<LastPageIcon />}
                isDisabled={disableNext || disabled}
                onClick={() => table.lastPage()}
                size={size}
                variant="ghost"
              />
            )}
          </HStack>
        </Flex>
      ) : paginationDisplayMode === 'default' ? (
        <>
          <Text textAlign="center" fontSize="sm" mx="4px" minWidth="8ch">{`${
            lastRowIndex === 0
              ? 0
              : (firstRowIndex + 1).toLocaleString(localization.language)
          }-${lastRowIndex.toLocaleString(localization.language)} ${
            localization.of
          } ${totalRowCount.toLocaleString(localization.language)}`}</Text>
          <HStack spacing={1}>
            {showFirstButton && (
              <Tooltip {...tooltipProps} label={localization.goToFirstPage}>
                <span>
                  <IconButton
                    aria-label={localization.goToFirstPage}
                    icon={<FirstPageIcon />}
                    isDisabled={disableBack}
                    onClick={() => table.firstPage()}
                    size={size}
                    variant="ghost"
                  />
                </span>
              </Tooltip>
            )}
            <Tooltip {...tooltipProps} label={localization.goToPreviousPage}>
              <span>
                <IconButton
                  aria-label={localization.goToPreviousPage}
                  icon={<ChevronLeftIcon />}
                  isDisabled={disableBack}
                  onClick={() => table.previousPage()}
                  size={size}
                  variant="ghost"
                />
              </span>
            </Tooltip>
            <Tooltip {...tooltipProps} label={localization.goToNextPage}>
              <span>
                <IconButton
                  aria-label={localization.goToNextPage}
                  icon={<ChevronRightIcon />}
                  isDisabled={disableNext}
                  onClick={() => table.nextPage()}
                  size={size}
                  variant="ghost"
                />
              </span>
            </Tooltip>
            {showLastButton && (
              <Tooltip {...tooltipProps} label={localization.goToLastPage}>
                <span>
                  <IconButton
                    aria-label={localization.goToLastPage}
                    icon={<LastPageIcon />}
                    isDisabled={disableNext}
                    onClick={() => table.lastPage()}
                    size={size}
                    variant="ghost"
                  />
                </span>
              </Tooltip>
            )}
          </HStack>
        </>
      ) : null}
    </Box>
  );
};
