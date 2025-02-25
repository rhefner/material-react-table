import { useRef, useState } from 'react';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateSegment,
  DateValue,
  Heading,
  TimeField,
  TimeValue,
} from 'react-aria-components';
import {
  Box,
  ButtonGroup,
  chakra,
  ChakraProvider,
  Divider,
  Flex,
  Popover as ChakraPopover,
  PopoverBody,
  PopoverContent,
  Stack,
  Text,
  useTheme,
  type Theme,
} from '@chakra-ui/react';
import { DateTimePickerProps } from '../../types';

// Type combining date and time
export interface DateTimeValue {
  date: DateValue;
  time: TimeValue;
}

// Chakra styled components for react-aria components
const StyledCalendarCell = chakra(CalendarCell, {
  baseStyle: {
    padding: '6px',
    cursor: 'pointer',
    borderRadius: 'md',
    textAlign: 'center',
    _selected: {
      bg: 'blue.500',
      color: 'white',
    },
    _hover: {
      bg: 'blue.100',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      _hover: {
        bg: 'transparent',
      },
    },
  },
});

const StyledCalendarGrid = chakra(CalendarGrid, {
  baseStyle: {
    width: '100%',
    borderCollapse: 'collapse',
    '& td': {
      padding: '2px',
    },
  },
});

const StyledDateSegment = chakra(DateSegment, {
  baseStyle: {
    padding: '0 1px',
    color: 'inherit',
    borderRadius: 'sm',
    _focus: {
      bg: 'blue.100',
      outline: 'none',
    },
  },
});

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

export const CRT_DateTimePicker = <T extends DateTimeValue>({
  value,
  onChange,
  ...props
}: DateTimePickerProps<T>) => {
  const theme = useTheme<Theme>();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Safe access to value
  const dateTimeValue = (value as DateTimeValue) || { date: null, time: null };

  // Handle changes to date
  const handleDateChange = (newDate: DateValue) => {
    const newValue = { ...dateTimeValue, date: newDate };
    onChange?.(newValue as T);
  };

  // Handle changes to time
  const handleTimeChange = (newTime: TimeValue) => {
    const newValue = { ...dateTimeValue, time: newTime };
    onChange?.(newValue as T);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Flex
          alignItems="center"
          onClick={() => setIsOpen(!isOpen)}
          ref={triggerRef}
          cursor="pointer"
        >
          <Box
            border="1px solid"
            borderColor="gray.300"
            rounded="md"
            p={2}
            width="100%"
          >
            <Text>
              {dateTimeValue.date && dateTimeValue.time
                ? `${dateTimeValue.date.toString()} ${dateTimeValue.time.toString()}`
                : 'Select date and time'}
            </Text>
          </Box>
          <Box ml={2}>📅</Box>
        </Flex>

        <ChakraPopover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="bottom-start"
          closeOnBlur={true}
        >
          <PopoverContent
            width="auto"
            p={4}
            shadow="lg"
            rounded="md"
            bg="white"
            _dark={{ bg: 'gray.800' }}
          >
            <PopoverBody>
              <Stack spacing={4}>
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Date
                  </Text>
                  <Calendar
                    value={dateTimeValue.date as DateValue}
                    onChange={(value) => handleDateChange(value as DateValue)}
                  >
                    <header
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px',
                      }}
                    >
                      <Button slot="previous">◀</Button>
                      <Heading />
                      <Button slot="next">▶</Button>
                    </header>
                    <StyledCalendarGrid>
                      {(date) => <StyledCalendarCell date={date} />}
                    </StyledCalendarGrid>
                  </Calendar>
                </Box>

                <Divider />

                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Time
                  </Text>
                  <StyledTimeField
                    value={dateTimeValue.time as TimeValue}
                    onChange={(value) => handleTimeChange(value as TimeValue)}
                    hourCycle={24}
                  />
                </Box>

                <ButtonGroup display="flex" justifyContent="flex-end">
                  <Button onPress={() => setIsOpen(false)}>Close</Button>
                  <Button
                    onPress={() => setIsOpen(false)}
                    isDisabled={!dateTimeValue.date || !dateTimeValue.time}
                  >
                    Apply
                  </Button>
                </ButtonGroup>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </ChakraPopover>
      </Box>
    </ChakraProvider>
  );
};
