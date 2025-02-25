import {
  type Dispatch,
  type DragEvent,
  type SetStateAction,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  MenuItem,
  Switch,
  Text,
  Tooltip,
  type MenuItemProps,
} from '@chakra-ui/react';
import {
  type MRT_Column,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { reorderColumn } from '../../utils/column.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_ColumnPinningButtons } from '../buttons/MRT_ColumnPinningButtons';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';

export interface MRT_ShowHideColumnsMenuItemsProps<TData extends MRT_RowData>
  extends MenuItemProps {
  allColumns: MRT_Column<TData>[];
  column: MRT_Column<TData>;
  hoveredColumn: MRT_Column<TData> | null;
  isNestedColumns: boolean;
  setHoveredColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ShowHideColumnsMenuItems = <TData extends MRT_RowData>({
  allColumns,
  column,
  hoveredColumn,
  isNestedColumns,
  setHoveredColumn,
  table,
  ...rest
}: MRT_ShowHideColumnsMenuItemsProps<TData>) => {
  const {
    getState,
    options: {
      enableColumnOrdering,
      enableColumnPinning,
      enableHiding,
      localization,
      mrtTheme: { draggingBorderColor },
    },
    setColumnOrder,
    setColumnPinning,
  } = table;
  const { columnOrder } = getState();
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const switchChecked = column.getIsVisible();

  const handleToggleColumnHidden = (column: MRT_Column<TData>) => {
    if (columnDefType === 'group') {
      column?.columns?.forEach?.((childColumn: MRT_Column<TData>) => {
        childColumn.toggleVisibility(!switchChecked);
      });
    } else {
      column.toggleVisibility();
    }
  };

  const menuItemRef = useRef<HTMLElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    try {
      e.dataTransfer.setDragImage(menuItemRef.current as HTMLElement, 0, 0);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDragEnd = (_e: DragEvent<HTMLButtonElement>) => {
    setIsDragging(false);
    setHoveredColumn(null);
    if (hoveredColumn) {
      const reorderedColumns = reorderColumn(
        column,
        hoveredColumn,
        columnOrder,
      );
      setColumnOrder(reorderedColumns);
      setColumnPinning(({ left = [], right = [] }) => ({
        left: reorderedColumns.filter((header) => left.includes(header)),
        right: reorderedColumns.filter((header) => right.includes(header)),
      }));
    }
  };

  const handleDragEnter = (_e: DragEvent) => {
    if (!isDragging && columnDef.enableColumnOrdering !== false) {
      setHoveredColumn(column);
    }
  };

  if (!columnDef.header || columnDef.visibleInShowHideMenu === false) {
    return null;
  }

  return (
    <>
      <MenuItem
        onDragEnter={handleDragEnter}
        ref={menuItemRef as any}
        {...rest}
        alignItems="center"
        justifyContent="flex-start"
        my={0}
        opacity={isDragging ? 0.5 : 1}
        outline={
          isDragging
            ? `2px dashed var(--chakra-colors-gray-500)`
            : hoveredColumn?.id === column.id
              ? `2px dashed ${draggingBorderColor}`
              : 'none'
        }
        outlineOffset="-2px"
        pl={`${(column.depth + 0.5) * 2}rem`}
        py="6px"
      >
        <Flex flexWrap="nowrap" gap="8px">
          {columnDefType !== 'group' &&
            enableColumnOrdering &&
            !isNestedColumns &&
            (columnDef.enableColumnOrdering !== false ? (
              <MRT_GrabHandleButton
                aria-label={localization.move}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                table={table}
              />
            ) : (
              <Box width="28px" />
            ))}
          {enableColumnPinning &&
            (column.getCanPin() ? (
              <MRT_ColumnPinningButtons column={column} table={table} />
            ) : (
              <Box width="70px" />
            ))}
          {enableHiding ? (
            <FormControl display="flex" alignItems="center">
              <Tooltip
                label={localization.toggleVisibility}
                placement="top"
                hasArrow
              >
                <Switch
                  isChecked={switchChecked}
                  isDisabled={!column.getCanHide()}
                  onChange={() => handleToggleColumnHidden(column)}
                  mr={2}
                />
              </Tooltip>
              <FormLabel
                htmlFor="column-visibility"
                mb={0}
                opacity={columnDefType !== 'display' ? 1 : 0.5}
                cursor="pointer"
                onClick={() => handleToggleColumnHidden(column)}
              >
                {columnDef.header}
              </FormLabel>
            </FormControl>
          ) : (
            <Text alignSelf="center">{columnDef.header}</Text>
          )}
        </Flex>
      </MenuItem>
      {column.columns?.map((c: MRT_Column<TData>, i) => (
        <MRT_ShowHideColumnsMenuItems
          allColumns={allColumns}
          column={c}
          hoveredColumn={hoveredColumn}
          isNestedColumns={isNestedColumns}
          key={`${i}-${c.id}`}
          setHoveredColumn={setHoveredColumn}
          table={table}
        />
      ))}
    </>
  );
};
