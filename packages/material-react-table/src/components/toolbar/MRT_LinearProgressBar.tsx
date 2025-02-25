import { Collapse, Progress, type ProgressProps } from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_LinearProgressBarProps<TData extends MRT_RowData>
  extends ProgressProps {
  isTopToolbar: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_LinearProgressBar = <TData extends MRT_RowData>({
  isTopToolbar,
  table,
  ...rest
}: MRT_LinearProgressBarProps<TData>) => {
  const {
    getState,
    options: { muiLinearProgressProps },
  } = table;
  const { isSaving, showProgressBars } = getState();

  const linearProgressProps = {
    ...parseFromValuesOrFunc(muiLinearProgressProps, {
      isTopToolbar,
      table,
    }),
    ...rest,
  };

  return (
    <Collapse
      in={showProgressBars !== false && (showProgressBars || isSaving)}
      unmountOnExit
      style={{
        bottom: isTopToolbar ? 0 : undefined,
        position: 'absolute',
        top: !isTopToolbar ? 0 : undefined,
        width: '100%',
      }}
    >
      <Progress
        aria-busy="true"
        aria-label="Loading"
        isIndeterminate
        size="xs"
        style={{ position: 'relative' }}
        {...linearProgressProps}
      />
    </Collapse>
  );
};
