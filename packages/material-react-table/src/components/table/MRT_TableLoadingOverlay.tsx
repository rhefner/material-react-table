import {
  Box,
  CircularProgress,
  type CircularProgressProps,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { alpha } from '../../utils/color.utils';

export interface MRT_TableLoadingOverlayProps<TData extends MRT_RowData>
  extends Omit<CircularProgressProps, 'ref'> {
  table: MRT_TableInstance<TData>;
}

export const MRT_TableLoadingOverlay = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_TableLoadingOverlayProps<TData>) => {
  const {
    options: {
      id,
      localization,
      mrtTheme: { baseBackgroundColor },
      muiCircularProgressProps,
    },
  } = table;

  const circularProgressProps = {
    ...parseFromValuesOrFunc(muiCircularProgressProps, { table }),
    ...rest,
  };

  // Remove props that Chakra doesn't support
  const safeProps: Record<string, any> = { ...circularProgressProps };
  delete safeProps.Component;

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: alpha(baseBackgroundColor, 0.5),
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        maxHeight: '100vh',
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 3,
      }}
    >
      {circularProgressProps?.Component ?? (
        <CircularProgress
          aria-label={localization.noRecordsToDisplay}
          id={`mrt-progress-${id}`}
          isIndeterminate
          {...safeProps}
        />
      )}
    </Box>
  );
};
