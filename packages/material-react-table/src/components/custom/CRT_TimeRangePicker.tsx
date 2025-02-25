import { useRef, useState } from 'react';
import {
  Button,
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
  Stack,
  Text,
  useTheme,
  type Theme,
} from '@chakra-ui/react';
import { TimePickerProps } from '../../types';

// Custom type to represent a time range
export interface TimeRange<T extends TimeValue> {
  start: T | null;
  end: T | null;
}

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

export const CRT_TimeRangePicker = <T extends TimeValue>({
  value,
  onChange,
  ...props
}: TimePickerProps<TimeRange<T>>) => {
  const theme = useTheme<Theme>();
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  // Safe access to start/end values
  const timeRange = (value as TimeRange<T>) || { start: null, end: null };

  // Handle changes to start time
  const handleStartChange = (newStart: T) => {
    const newValue = { ...timeRange, start: newStart };
    onChange?.(newValue as TimeRange<T>);
  };

  // Handle changes to end time
  const handleEndChange = (newEnd: T) => {
    const newValue = { ...timeRange, end: newEnd };
    onChange?.(newValue as TimeRange<T>);
  };

  return (
    <ChakraProvider theme={theme}>
      <Stack spacing={4}>
        <Box>
          <Label>Start Time</Label>
          <StyledTimeField
            value={timeRange.start as T}
            onChange={(value) => handleStartChange(value as T)}
            hourCycle={24}
          />
        </Box>

        <Box>
          <Label>End Time</Label>
          <StyledTimeField
            value={timeRange.end as T}
            onChange={(value) => handleEndChange(value as T)}
            hourCycle={24}
          />
        </Box>
      </Stack>
    </ChakraProvider>
  );
};
