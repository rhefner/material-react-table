import {
  type ChangeEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  type InputProps,
} from '@chakra-ui/react';
import { debounce } from '../../utils/common.utils';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';

export interface MRT_GlobalFilterTextFieldProps<TData extends MRT_RowData>
  extends Omit<InputProps, 'size'> {
  table: MRT_TableInstance<TData>;
  ref?:
    | React.RefObject<HTMLInputElement>
    | ((node: HTMLInputElement | null) => void);
}

export const MRT_GlobalFilterTextField = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_GlobalFilterTextFieldProps<TData>) => {
  const {
    getState,
    options: {
      enableGlobalFilterModes,
      icons: { CloseIcon, SearchIcon },
      localization,
      manualFiltering,
      muiSearchTextFieldProps,
    },
    refs: { searchInputRef },
    setGlobalFilter,
  } = table;
  const { globalFilter, showGlobalFilter } = getState();

  const textFieldProps = {
    ...parseFromValuesOrFunc(muiSearchTextFieldProps, {
      table,
    }),
    ...rest,
  };

  const isMounted = useRef(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchValue, setSearchValue] = useState(globalFilter ?? '');

  const handleChangeDebounced = useCallback(
    debounce(
      (event: ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(event.target.value ?? undefined);
      },
      manualFiltering ? 500 : 250,
    ),
    [manualFiltering, setGlobalFilter],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleChangeDebounced(event);
  };

  const handleGlobalFilterMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClear = () => {
    setSearchValue('');
    setGlobalFilter(undefined);
  };

  useEffect(() => {
    if (isMounted.current) {
      if (globalFilter === undefined) {
        handleClear();
      } else {
        setSearchValue(globalFilter);
      }
    }
    isMounted.current = true;
  }, [globalFilter]);

  return (
    <Collapse
      in={showGlobalFilter}
      animateOpacity
      style={{ display: showGlobalFilter ? 'block' : 'none' }}
    >
      <Box position="relative">
        <InputGroup size="md">
          {enableGlobalFilterModes ? (
            <InputLeftElement>
              <Tooltip
                label={localization.changeSearchMode}
                placement="top"
                hasArrow
              >
                <IconButton
                  aria-label={localization.changeSearchMode}
                  icon={<SearchIcon />}
                  onClick={handleGlobalFilterMenuOpen}
                  size="sm"
                  variant="ghost"
                />
              </Tooltip>
            </InputLeftElement>
          ) : (
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
          )}
          <Input
            autoComplete="off"
            onChange={handleChange}
            placeholder={localization.search}
            value={searchValue ?? ''}
            {...textFieldProps}
            ref={(inputRef) => {
              if (inputRef) {
                searchInputRef.current = inputRef;
                if (textFieldProps?.ref) {
                  (textFieldProps.ref as any)(inputRef);
                }
              }
            }}
          />
          {searchValue?.length > 0 && (
            <InputRightElement>
              <Tooltip
                label={localization.clearSearch}
                placement="top"
                hasArrow
              >
                <IconButton
                  aria-label={localization.clearSearch}
                  icon={<CloseIcon />}
                  onClick={handleClear}
                  size="sm"
                  variant="ghost"
                  isDisabled={!searchValue?.length}
                />
              </Tooltip>
            </InputRightElement>
          )}
        </InputGroup>
        <MRT_FilterOptionMenu
          anchorEl={anchorEl}
          onSelect={handleClear}
          setAnchorEl={setAnchorEl}
          table={table}
        />
      </Box>
    </Collapse>
  );
};
