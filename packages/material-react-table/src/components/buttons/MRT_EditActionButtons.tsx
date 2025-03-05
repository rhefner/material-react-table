import {
  Box,
  Button,
  CircularProgress,
  Icon,
  IconButton,
  Tooltip,
  type BoxProps,
} from '@chakra-ui/react';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { useTheme, type Theme } from '../../hooks/custom/useTheme';

export interface MRT_EditActionButtonsProps<TData extends MRT_RowData>
  extends BoxProps {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
  variant?: 'icon' | 'text';
}

export const MRT_EditActionButtons = <TData extends MRT_RowData>({
  row,
  table,
  variant = 'icon',
  ...rest
}: MRT_EditActionButtonsProps<TData>) => {
  const {
    getState,
    options: {
      icons: { CancelIcon, SaveIcon },
      localization,
      onCreatingRowCancel,
      onCreatingRowSave,
      onEditingRowCancel,
      onEditingRowSave,
    },
    refs: { editInputRefs },
    setCreatingRow,
    setEditingRow,
  } = table;
  const { creatingRow, editingRow, isSaving } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const handleCancel = () => {
    if (isCreating) {
      onCreatingRowCancel?.({ row, table });
      setCreatingRow(null);
    } else if (isEditing) {
      onEditingRowCancel?.({ row, table });
      setEditingRow(null);
    }
    row._valuesCache = {} as any; //reset values cache
  };

  const handleSubmitRow = () => {
    //look for auto-filled input values
    Object.values(editInputRefs.current ?? {})
      .filter((inputRef) => row.id === inputRef?.name?.split('_')?.[0])
      ?.forEach((input) => {
        if (
          input.value !== undefined &&
          Object.hasOwn(row?._valuesCache as object, input.name)
        ) {
          // @ts-expect-error
          row._valuesCache[input.name] = input.value;
        }
      });
    if (isCreating)
      onCreatingRowSave?.({
        exitCreatingMode: () => setCreatingRow(null),
        row,
        table,
        values: row._valuesCache,
      });
    else if (isEditing) {
      onEditingRowSave?.({
        exitEditingMode: () => setEditingRow(null),
        row,
        table,
        values: row?._valuesCache,
      });
    }
  };

  const theme = useTheme<Theme>();

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        display: 'flex',
        gap: '0.75rem',
        ...(parseFromValuesOrFunc(rest?.sx, theme) as any),
      }}
    >
      {variant === 'icon' ? (
        <>
          <Tooltip label={localization.cancel}>
            <IconButton aria-label={localization.cancel} onClick={handleCancel}>
              <Icon as={CancelIcon} />
            </IconButton>
          </Tooltip>
          {((isCreating && onCreatingRowSave) ||
            (isEditing && onEditingRowSave)) && (
            <Tooltip label={localization.save}>
              <IconButton
                aria-label={localization.save}
                colorScheme="blue"
                isDisabled={isSaving}
                onClick={handleSubmitRow}
              >
                {isSaving ? (
                  <CircularProgress size="18px" />
                ) : (
                  <Icon as={SaveIcon} />
                )}
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        <>
          <Button onClick={handleCancel} minW="100px">
            {localization.cancel}
          </Button>
          <Button
            isDisabled={isSaving}
            onClick={handleSubmitRow}
            minW="100px"
            colorScheme="blue"
          >
            {isSaving ? (
              <CircularProgress size="18px" color="white" />
            ) : (
              localization.save
            )}
          </Button>
        </>
      )}
    </Box>
  );
};
