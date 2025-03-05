import React, { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Input,
  List,
  ListItem,
  Portal,
  useColorModeValue,
  useOutsideClick,
} from '@chakra-ui/react';
import { AutocompleteProps } from '../../types';

export const CRT_Autocomplete = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>({
  options,
  multiple,
  disableClearable,
  freeSolo,
  value,
  onChange,
  ...rest
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<T[]>(
    multiple ? (value as T[]) || [] : value ? [value as T] : [],
  );

  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    return options.filter((option) =>
      String(option).toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [options, inputValue]);

  const handleSelect = useCallback(
    (option: T) => {
      let newValue: T | T[] | null;
      if (multiple) {
        newValue = [...selectedItems, option];
      } else {
        newValue = option;
      }

      onChange?.({ type: 'change' } as React.SyntheticEvent, newValue);

      if (!multiple) {
        setIsOpen(false);
      }
      setInputValue('');
      setSelectedItems(multiple ? (newValue as T[]) : [option]);
    },
    [multiple, onChange, selectedItems],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);

    if (freeSolo && !value) {
      onChange?.({ type: 'change' } as React.SyntheticEvent, null);
    }
  };

  const handleRemoveItem = useCallback(
    (itemToRemove: T) => {
      const newItems = selectedItems.filter((item) => item !== itemToRemove);
      setSelectedItems(newItems);
      onChange?.(
        { type: 'change' } as React.SyntheticEvent,
        multiple ? newItems : null,
      );
    },
    [multiple, onChange, selectedItems],
  );

  return (
    <Box position="relative" ref={ref} {...rest}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={selectedItems.length ? '' : 'Select...'}
      />

      {selectedItems.length > 0 && (
        <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
          {selectedItems.map((item, index) => (
            <Box
              key={index}
              bg={bgColor}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              px={2}
              py={1}
              display="flex"
              alignItems="center"
            >
              {String(item)}
              {!disableClearable && (
                <Box
                  ml={2}
                  cursor="pointer"
                  onClick={() => handleRemoveItem(item)}
                >
                  ×
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {isOpen && filteredOptions.length > 0 && (
        <Portal>
          <List
            position="absolute"
            top="100%"
            left={0}
            right={0}
            mt={1}
            maxH="200px"
            overflowY="auto"
            bg={bgColor}
            borderRadius="md"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            zIndex={1000}
          >
            {filteredOptions.map((option, index) => (
              <ListItem
                key={index}
                px={3}
                py={2}
                cursor="pointer"
                _hover={{ bg: hoverBgColor }}
                onClick={() => handleSelect(option)}
              >
                {String(option)}
              </ListItem>
            ))}
          </List>
        </Portal>
      )}
    </Box>
  );
};
