import {
  Box,
  Icon,
  IconButton,
  Tooltip,
  useTheme,
  type BoxProps,
} from '@chakra-ui/react';
import {
  type MRT_Column,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_ColumnPinningButtonsProps<TData extends MRT_RowData>
  extends BoxProps {
  column: MRT_Column<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ColumnPinningButtons = <TData extends MRT_RowData>({
  column,
  table,
  ...rest
}: MRT_ColumnPinningButtonsProps<TData>) => {
  const {
    options: {
      icons: { PushPinIcon },
      localization,
    },
  } = table;

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
  };

  const theme = useTheme();

  return (
    <Box
      {...rest}
      sx={{
        minWidth: '70px',
        textAlign: 'center',
        ...(parseFromValuesOrFunc(rest?.sx, theme) as any),
      }}
    >
      {column.getIsPinned() ? (
        <Tooltip label={localization.unpin}>
          <IconButton
            onClick={() => handlePinColumn(false)}
            size="sm"
            aria-label={localization.unpin}
          >
            <Icon as={PushPinIcon} />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip label={localization.pinToLeft}>
            <IconButton
              onClick={() => handlePinColumn('left')}
              size="sm"
              aria-label={localization.pinToLeft}
            >
              <Icon as={PushPinIcon} style={{ transform: 'rotate(90deg)' }} />
            </IconButton>
          </Tooltip>
          <Tooltip label={localization.pinToRight}>
            <IconButton
              onClick={() => handlePinColumn('right')}
              size="sm"
              aria-label={localization.pinToRight}
            >
              <Icon
                as={PushPinIcon}
                style={{
                  transform: 'rotate(-90deg)',
                }}
              />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};
