import { type DragEvent, useEffect } from 'react';
import {
  Box,
  Fade,
  Text,
  useColorModeValue,
  useTheme,
  type BoxProps,
} from '@chakra-ui/react';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_ToolbarDropZoneProps<TData extends MRT_RowData>
  extends BoxProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarDropZone = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_ToolbarDropZoneProps<TData>) => {
  const theme = useTheme();
  const {
    getState,
    options: { enableGrouping, localization },
    setHoveredColumn,
    setShowToolbarDropZone,
  } = table;

  const { draggingColumn, grouping, hoveredColumn, showToolbarDropZone } =
    getState();

  const handleDragEnter = (_event: DragEvent<HTMLDivElement>) => {
    setHoveredColumn({ id: 'drop-zone' });
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (table.options.state?.showToolbarDropZone !== undefined) {
      setShowToolbarDropZone(
        !!enableGrouping &&
          !!draggingColumn &&
          draggingColumn.columnDef.enableGrouping !== false &&
          !grouping.includes(draggingColumn.id),
      );
    }
  }, [enableGrouping, draggingColumn, grouping]);

  // Filter out properties that might cause issues with Chakra UI components
  const safeBoxProps = { ...rest };
  delete (safeBoxProps as any).sx;

  const bgColor = useColorModeValue('blue.100', 'blue.800');
  const bgColorHovered = useColorModeValue('blue.200', 'blue.700');
  const borderColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Fade in={showToolbarDropZone}>
      <Box
        className="Mui-ToolbarDropZone"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        {...safeBoxProps}
        sx={{
          alignItems: 'center',
          backdropFilter: 'blur(4px)',
          backgroundColor:
            hoveredColumn?.id === 'drop-zone' ? bgColorHovered : bgColor,
          border: `dashed ${borderColor} 2px`,
          boxSizing: 'border-box',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          position: 'absolute',
          width: '100%',
          zIndex: 4,
          ...(parseFromValuesOrFunc(rest?.sx, theme) as any),
        }}
      >
        <Text fontStyle="italic">
          {localization.dropToGroupBy.replace(
            '{column}',
            draggingColumn?.columnDef?.header ?? '',
          )}
        </Text>
      </Box>
    </Fade>
  );
};
