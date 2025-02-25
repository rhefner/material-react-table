import { useRef, useState } from 'react';
import {
  Button,
  DateValue,
  Group,
  Label,
  TimeField,
  TimeValue,
} from 'react-aria-components';
import {
  Box,
  chakra,
  ChakraProvider,
  Flex,
  Input,
  Stack,
  useTheme,
  type Theme,
} from '@chakra-ui/react';
import { TimePickerProps } from '../../types';

// Chakra styled component for the time field
const StyledTimeField = chakra(TimeField, {
  baseStyle: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px',
    border: '1px solid',
    borderColor: 'gray.300',
    borderRadius: 'md',
    width: '100%',
    _focus: {
      borderColor: 'blue.500',
      boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
    },
    _hover: {
      borderColor: 'gray.400',
    },
  },
});

export const CRT_TimePicker = <T extends TimeValue>({
  value,
  onChange,
  ...props
}: TimePickerProps<T>) => {
  const theme = useTheme<Theme>();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Label>Time</Label>
        <StyledTimeField
          value={value as T}
          onChange={(value) => onChange?.(value as T)}
          hourCycle={24}
        />
      </Box>
    </ChakraProvider>
  );
};
