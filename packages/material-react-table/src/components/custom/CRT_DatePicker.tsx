import { useRef, useState } from 'react';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  DateValue,
  Group,
  Heading,
  Label,
  type DatePickerProps,
} from 'react-aria-components';
import {
  Box,
  chakra,
  Popover as ChakraPopover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';

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

export const CRT_DatePicker = <T extends DateValue>({
  value,
  onChange,
  ...props
}: DatePickerProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DatePicker
      value={value as T}
      onChange={(date) => {
        onChange?.(date);
        setIsOpen(false);
      }}
    >
      <ChakraPopover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-start"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Box onClick={() => setIsOpen(!isOpen)}>
            <Label sr-only>Date</Label>
            <Group>
              <DateInput>
                {(segment) => <StyledDateSegment segment={segment} />}
              </DateInput>
              <Button
                onPress={() => setIsOpen(!isOpen)}
                aria-label="Choose date"
                ref={triggerRef}
              >
                <Box as="span" mr={2}>
                  📅
                </Box>
              </Button>
            </Group>
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
              <Calendar>
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
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </ChakraPopover>
    </DatePicker>
  );
};
