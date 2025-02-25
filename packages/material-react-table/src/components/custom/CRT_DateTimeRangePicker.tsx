import { useRef, useState } from 'react';
import {
  Button,
  DateValue,
  Group,
  Heading,
  Label,
  RangeCalendar,
  CalendarCell,
  CalendarGrid,
  TimeField,
  TimeValue,
  DateRange,
} from 'react-aria-components';
import {
  Box,
  ButtonGroup,
  chakra,
  ChakraProvider,
  Divider,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  Portal,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useTheme,
  type Theme,
} from '@chakra-ui/react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { DateTimePickerProps } from '../../types';

// Type for date-time range
export interface DateTimeRange {
  startDate: DateValue | null;
  startTime: TimeValue | null;
  endDate: DateValue | null;
  endTime: TimeValue | null;
}

// Chakra styled components for react-aria components
const StyledRangeCalendarCell = chakra(CalendarCell, {
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
    '&[data-selection-start]': {
      bg: 'blue.500',
      color: 'white',
      borderRadius: 'md 0 0 md',
    },
    '&[data-selection-end]': {
      bg: 'blue.500',
      color: 'white',
      borderRadius: '0 md md 0',
    },
    '&[data-selected]': {
      bg: 'blue.100',
    },
  },
});

const StyledRangeCalendarGrid = chakra(CalendarGrid, {
  baseStyle: {
    width: '100%',
    borderCollapse: 'collapse',
    '& td': {
      padding: '2px',
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

export const CRT_DateTimeRangePicker = <T extends DateTimeRange>({
  value,
  onChange,
  ...props
}: DateTimePickerProps<T>) => {
  const theme = useTheme<Theme>();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Safe access to value
  const dateTimeRange = (value as DateTimeRange) || {
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  };

  // Handle changes to date range
  const handleDateRangeChange = (dateRange: DateRange) => {
    const newValue = {
      ...dateTimeRange,
      startDate: dateRange.start,
      endDate: dateRange.end,
    };
    onChange?.(newValue as T);
  };

  // Handle changes to start time
  const handleStartTimeChange = (newTime: TimeValue) => {
    const newValue = { ...dateTimeRange, startTime: newTime };
    onChange?.(newValue as T);
  };

  // Handle changes to end time
  const handleEndTimeChange = (newTime: TimeValue) => {
    const newValue = { ...dateTimeRange, endTime: newTime };
    onChange?.(newValue as T);
  };

  // Format display text
  const getDisplayText = () => {
    const { startDate, startTime, endDate, endTime } = dateTimeRange;

    if (!startDate) return 'Select date and time range';

    let text = startDate.toString();
    if (startTime) text += ` ${startTime.toString()}`;

    text += ' to ';

    if (endDate) text += endDate.toString();
    if (endTime) text += ` ${endTime.toString()}`;

    return text;
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
            <Text>{getDisplayText()}</Text>
          </Box>
          <Box ml={2}>📅</Box>
        </Flex>

        <Popover
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
                    Date Range
                  </Text>
                  <RangeCalendar
                    value={
                      {
                        start: dateTimeRange.startDate,
                        end: dateTimeRange.endDate,
                      } as DateRange
                    }
                    onChange={(date) =>
                      handleDateRangeChange(date as DateRange)
                    }
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
                    <StyledRangeCalendarGrid>
                      {(date) => <StyledRangeCalendarCell date={date} />}
                    </StyledRangeCalendarGrid>
                  </RangeCalendar>
                </Box>

                <Divider />

                <Tabs isFitted variant="enclosed">
                  <TabList mb="1em">
                    <Tab>Start Time</Tab>
                    <Tab>End Time</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <StyledTimeField
                        value={dateTimeRange.startTime as TimeValue}
                        onChange={(value) =>
                          handleStartTimeChange(value as TimeValue)
                        }
                        hourCycle={24}
                      />
                    </TabPanel>
                    <TabPanel>
                      <StyledTimeField
                        value={dateTimeRange.endTime as TimeValue}
                        onChange={(value) =>
                          handleEndTimeChange(value as TimeValue)
                        }
                        hourCycle={24}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>

                <ButtonGroup display="flex" justifyContent="flex-end">
                  <Button onPress={() => setIsOpen(false)}>Close</Button>
                  <Button
                    onPress={() => setIsOpen(false)}
                    isDisabled={
                      !dateTimeRange.startDate ||
                      !dateTimeRange.startTime ||
                      !dateTimeRange.endDate ||
                      !dateTimeRange.endTime
                    }
                  >
                    Apply
                  </Button>
                </ButtonGroup>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </ChakraProvider>
  );
};
