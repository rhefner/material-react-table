import React from 'react';
import { 
  Box,
  Input,
  Portal,
  type BoxProps,
  type InputProps
} from '@chakra-ui/react';

export interface AutocompleteProps extends Omit<BoxProps, 'onChange'> {
  options: any[];
  value?: any;
  inputValue?: string;
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  onInputChange?: (event: React.SyntheticEvent, value: string, reason: string) => void;
  renderInput: (params: any) => React.ReactNode;
  getOptionLabel?: (option: any) => string;
  isOptionEqualToValue?: (option: any, value: any) => boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: React.ReactNode;
  noOptionsText?: React.ReactNode;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  freeSolo?: boolean;
  multiple?: boolean;
  disableClearable?: boolean;
  clearOnEscape?: boolean;
  includeInputInList?: boolean;
  filterSelectedOptions?: boolean;
  autoComplete?: boolean;
  autoHighlight?: boolean;
  autoSelect?: boolean;
  blurOnSelect?: boolean | 'touch' | 'mouse';
  clearOnBlur?: boolean;
  selectOnFocus?: boolean;
  openOnFocus?: boolean;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  renderOption?: (props: any, option: any, state: any) => React.ReactNode;
  renderTags?: (value: any[], getTagProps: any) => React.ReactNode;
  filterOptions?: (options: any[], params: any) => any[];
  limitTags?: number;
  getLimitTagsText?: (more: number) => React.ReactNode;
  defaultValue?: any;
  forcePopupIcon?: boolean | 'auto';
  disableCloseOnSelect?: boolean;
  clearIcon?: React.ReactNode;
  popupIcon?: React.ReactNode;
  groupBy?: (option: any) => string;
  renderGroup?: (params: any) => React.ReactNode;
  componentsProps?: {
    paper?: any;
    popper?: any;
    popupIndicator?: any;
    clearIndicator?: any;
  };
}

const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  ({ 
    options = [],
    value,
    inputValue = '',
    onChange,
    onInputChange,
    renderInput,
    getOptionLabel = (option) => String(option),
    isOptionEqualToValue = (option, value) => option === value,
    disabled,
    loading,
    loadingText = 'Loading...',
    noOptionsText = 'No options',
    open: controlledOpen,
    onOpen,
    onClose,
    freeSolo,
    multiple,
    disableClearable,
    size = 'medium',
    fullWidth,
    renderOption,
    defaultValue,
    ...props 
  }, ref) => {
    
    const [open, setOpen] = React.useState(false);
    const [internalInputValue, setInternalInputValue] = React.useState(inputValue);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    
    const isOpen = controlledOpen !== undefined ? controlledOpen : open;
    
    const filteredOptions = React.useMemo(() => {
      if (!internalInputValue || !freeSolo) return options;
      return options.filter(option => 
        getOptionLabel(option).toLowerCase().includes(internalInputValue.toLowerCase())
      );
    }, [options, internalInputValue, freeSolo, getOptionLabel]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInternalInputValue(newValue);
      onInputChange?.(event, newValue, 'input');
      
      if (!isOpen && newValue) {
        setOpen(true);
        onOpen?.();
      }
    };

    const handleOptionClick = (option: any) => {
      onChange?.(null as any, option);
      setInternalInputValue(getOptionLabel(option));
      setOpen(false);
      onClose?.();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
      } else if (event.key === 'Enter' && highlightedIndex >= 0) {
        event.preventDefault();
        handleOptionClick(filteredOptions[highlightedIndex]);
      } else if (event.key === 'Escape') {
        setOpen(false);
        onClose?.();
      }
    };

    // Create input props for renderInput
    const inputProps = {
      value: internalInputValue,
      onChange: handleInputChange,
      onKeyDown: handleKeyDown,
      onFocus: () => {
        setOpen(true);
        onOpen?.();
      },
      onBlur: () => {
        // Delay close to allow option clicks
        setTimeout(() => {
          setOpen(false);
          onClose?.();
        }, 150);
      },
      disabled,
      size: size === 'small' ? 'sm' : 'md',
      width: fullWidth ? '100%' : undefined,
    };

    return (
      <Box ref={ref} position="relative" width={fullWidth ? '100%' : undefined} {...props}>
        {renderInput(inputProps)}
        
        {isOpen && (
          <Portal>
            <Box
              position="absolute"
              top="100%"
              left={0}
              right={0}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              boxShadow="lg"
              maxH="200px"
              overflowY="auto"
              zIndex={1000}
              _dark={{
                bg: 'gray.800',
                borderColor: 'gray.600'
              }}
            >
              {loading ? (
                <Box p={3} textAlign="center" color="gray.500">
                  {loadingText}
                </Box>
              ) : filteredOptions.length === 0 ? (
                <Box p={3} textAlign="center" color="gray.500">
                  {noOptionsText}
                </Box>
              ) : (
                filteredOptions.map((option, index) => {
                  const isHighlighted = index === highlightedIndex;
                  const isSelected = isOptionEqualToValue(option, value);
                  
                  return renderOption ? (
                    renderOption({ key: index }, option, { selected: isSelected })
                  ) : (
                    <Box
                      key={index}
                      p={2}
                      cursor="pointer"
                      bg={isHighlighted ? 'gray.100' : isSelected ? 'blue.50' : 'transparent'}
                      color={isSelected ? 'blue.600' : 'gray.700'}
                      _hover={{ bg: 'gray.100' }}
                      _dark={{
                        bg: isHighlighted ? 'gray.700' : isSelected ? 'blue.900' : 'transparent',
                        color: isSelected ? 'blue.200' : 'gray.200',
                        _hover: { bg: 'gray.700' }
                      }}
                      onClick={() => handleOptionClick(option)}
                    >
                      {getOptionLabel(option)}
                    </Box>
                  );
                })
              )}
            </Box>
          </Portal>
        )}
      </Box>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
export { Autocomplete };
export type { AutocompleteProps };
