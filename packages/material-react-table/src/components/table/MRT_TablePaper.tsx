import {
  Card,
  type CardProps,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_BottomToolbar } from '../toolbar/MRT_BottomToolbar';
import { MRT_TopToolbar } from '../toolbar/MRT_TopToolbar';
import { MRT_TableContainer } from './MRT_TableContainer';
import { type KeyboardEvent, type RefObject } from 'react';

export interface MRT_TablePaperProps<TData extends MRT_RowData>
  extends CardProps {
  table: MRT_TableInstance<TData>;
  ref?:
    | React.RefObject<HTMLDivElement>
    | ((node: HTMLDivElement | null) => void);
}

export const MRT_TablePaper = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_TablePaperProps<TData>) => {
  const {
    getState,
    options: {
      enableBottomToolbar,
      enableTopToolbar,
      mrtTheme: { baseBackgroundColor },
      muiTablePaperProps,
      renderBottomToolbar,
      renderTopToolbar,
    },
    refs: { tablePaperRef },
  } = table;
  const { isFullScreen } = getState();

  const paperProps = {
    ...parseFromValuesOrFunc(muiTablePaperProps, { table }),
    ...rest,
  };

  const chakraTheme = useTheme();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Card
      borderRadius="md"
      boxShadow="md"
      onKeyDown={(e: KeyboardEvent) =>
        e.key === 'Escape' && table.setIsFullScreen(false)
      }
      {...paperProps}
      ref={(ref: HTMLDivElement) => {
        tablePaperRef.current = ref;
        if (paperProps?.ref) {
          // Use proper type casting for the ref
          (paperProps.ref as RefObject<HTMLDivElement>).current = ref;
        }
      }}
      style={{
        ...(isFullScreen
          ? {
              bottom: 0,
              height: '100dvh',
              left: 0,
              margin: 0,
              maxHeight: '100dvh',
              maxWidth: '100dvw',
              padding: 0,
              position: 'fixed',
              right: 0,
              top: 0,
              width: '100dvw',
              zIndex: chakraTheme.zIndices.modal,
            }
          : {}),
        ...paperProps?.style,
      }}
      bg={baseBackgroundColor || bgColor}
      overflow="hidden"
      transition="all 100ms ease-in-out"
      {...(paperProps?.sx ? { sx: paperProps.sx } : {})}
    >
      {enableTopToolbar &&
        (parseFromValuesOrFunc(renderTopToolbar, { table }) ?? (
          <MRT_TopToolbar table={table} />
        ))}
      <MRT_TableContainer table={table} />
      {enableBottomToolbar &&
        (parseFromValuesOrFunc(renderBottomToolbar, { table }) ?? (
          <MRT_BottomToolbar table={table} />
        ))}
    </Card>
  );
};
