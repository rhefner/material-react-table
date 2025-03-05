import { Label, TimeField, TimeValue } from 'react-aria-components';
import { Box, chakra } from '@chakra-ui/react';
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
  return (
    <Box>
      <Label>Time</Label>
      <StyledTimeField
        value={value as T}
        onChange={(value) => onChange?.(value as T)}
        hourCycle={24}
      />
    </Box>
  );
};
