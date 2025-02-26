import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = colorMode === 'light' ? FiMoon : FiSun;
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <IconButton
      position="fixed"
      top={4}
      right={4}
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      variant="solid"
      colorScheme={colorMode === 'light' ? 'purple' : 'yellow'}
      icon={<SwitchIcon />}
      onClick={toggleColorMode}
      size="md"
      bg={bgColor}
      shadow="md"
    />
  );
}
