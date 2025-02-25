import React from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { Button, Icon, Tooltip, useColorMode } from '@chakra-ui/react';

import type { IconButtonProps } from '@chakra-ui/react';
import { useColorModeToggle } from '../hooks/use-color-mode-toggle';

export const ColorModeToggle = React.forwardRef<
  HTMLButtonElement,
  ColorModeToggleProps
>(({ color, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const toggleColorMode = useColorModeToggle();
  const isLight = colorMode === 'light';
  const newColorMode = isLight ? 'dark' : 'light';

  console.log('[ColorModeToggle] current colorMode:', colorMode);

  return (
    <Tooltip label={`Use ${newColorMode} theme`} placement="bottom-start">
      <Button
        fontSize="2xl"
        variant="ghost"
        {...props}
        ref={ref}
        onClick={() => toggleColorMode(newColorMode)}
        colorScheme={isLight ? 'blue' : 'yellow'}
        w="30px"
        h="30px"
        aria-label="Color Mode"
      >
        <Icon
          as={isLight ? HiOutlineMoon : HiOutlineSun}
          color={color ? color : isLight ? 'blue.500' : 'yellow.300'}
        />
      </Button>
    </Tooltip>
  );
});
ColorModeToggle.displayName = 'ColorModeToggle';

export type ColorModeToggleProps = Partial<IconButtonProps>;
