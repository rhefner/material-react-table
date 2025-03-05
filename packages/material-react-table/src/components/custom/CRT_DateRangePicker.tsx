import { useRef, useState } from 'react';
import {
  Button,
  CalendarCell,
  DateRangePicker,
  DateValue,
  Label,
  RangeCalendar,
  CalendarGrid,
  DateRangePickerProps,
} from 'react-aria-components';
import {
  Box,
  chakra,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react';

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

export const CRT_DateRangePicker = <T extends DateValue>({
  value,
  onChange,
  ...props
}: DateRangePickerProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <DateRangePicker
      value={value}
      onChange={(date) => {
        onChange?.(date);
        if (date && date.end) {
          setIsOpen(false);
        }
      }}
    >
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-start"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Box
            onClick={() => setIsOpen(!isOpen)}
            ref={triggerRef}
            cursor="pointer"
          >
            <Flex
              align="center"
              border="1px solid"
              borderColor="gray.300"
              rounded="md"
              p={2}
            >
              <Text>
                {value
                  ? `${value.start?.toString()} - ${value.end?.toString() || 'Select end date'}`
                  : 'Select date range'}
              </Text>
              <Box ml={2}>📅</Box>
            </Flex>
          </Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            width="auto"
            p={0}
            shadow="lg"
            rounded="md"
            bg="white"
            _dark={{ bg: 'gray.800' }}
          >
            <PopoverBody p={0}>
              <RangeCalendar>
                <header
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                  }}
                >
                  <Button slot="previous">◀</Button>
                  <Label />
                  <Button slot="next">▶</Button>
                </header>
                <StyledRangeCalendarGrid>
                  {(date) => <StyledRangeCalendarCell date={date} />}
                </StyledRangeCalendarGrid>
              </RangeCalendar>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </DateRangePicker>
  );
};
