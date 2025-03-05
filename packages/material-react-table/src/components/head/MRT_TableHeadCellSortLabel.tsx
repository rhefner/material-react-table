import {
  Box,
  Tooltip,
  Badge,
  Flex,
  useColorModeValue,
  type SystemStyleObject,
  Icon,
} from '@chakra-ui/react';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { getCommonTooltipProps } from '../../utils/style.utils';
import { useTheme, type Theme } from '../../hooks/custom/useTheme';

export interface MRT_TableHeadCellSortLabelProps<TData extends MRT_RowData> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
  sx?: SystemStyleObject;
}

export const MRT_TableHeadCellSortLabel = <TData extends MRT_RowData>({
  header,
  table,
  ...rest
}: MRT_TableHeadCellSortLabelProps<TData>) => {
  const {
    getState,
    options: {
      icons: { ArrowDownwardIcon, SyncAltIcon },
      localization,
    },
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { isLoading, showSkeletons, sorting } = getState();

  const isSorted = !!column.getIsSorted();

  const sortTooltip =
    isLoading || showSkeletons
      ? ''
      : column.getIsSorted()
        ? column.getIsSorted() === 'desc'
          ? localization.sortedByColumnDesc.replace(
              '{column}',
              columnDef.header,
            )
          : localization.sortedByColumnAsc.replace('{column}', columnDef.header)
        : column.getNextSortingOrder() === 'desc'
          ? localization.sortByColumnDesc.replace('{column}', columnDef.header)
          : localization.sortByColumnAsc.replace('{column}', columnDef.header);

  const direction = isSorted
    ? (column.getIsSorted() as 'asc' | 'desc')
    : undefined;

  const theme = useTheme<Theme>();
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Tooltip placement="top" label={sortTooltip} {...getCommonTooltipProps()}>
      <Box position="relative">
        <Badge
          position="absolute"
          top="-8px"
          right="-8px"
          borderRadius="full"
          display={
            sorting.length > 1 && column.getSortIndex() + 1 > 0
              ? 'flex'
              : 'none'
          }
          sx={{
            flex: '0 0',
            opacity: isSorted ? 1 : 0.3,
            transition: 'all 150ms ease-in-out',
            width: '3ch',
            ...(parseFromValuesOrFunc(rest?.sx, theme) as any),
          }}
        >
          {sorting.length > 1 ? column.getSortIndex() + 1 : ''}
        </Badge>
        <Flex
          alignItems="center"
          justifyContent="center"
          aria-label={sortTooltip}
          width="3ch"
          opacity={isSorted ? 1 : 0.3}
          transition="all 150ms ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
            header.column.getToggleSortingHandler()?.(e);
          }}
          cursor="pointer"
          {...rest}
        >
          {!isSorted ? (
            <Icon
              as={SyncAltIcon}
              transform="rotate(-90deg) scaleX(0.9) translateX(-1px)"
              color={textColor}
            />
          ) : (
            <Icon
              as={ArrowDownwardIcon}
              transform={direction === 'asc' ? 'rotate(180deg)' : undefined}
              color={textColor}
            />
          )}
        </Flex>
      </Box>
    </Tooltip>
  );
};
