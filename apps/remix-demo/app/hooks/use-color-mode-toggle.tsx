import { useColorMode } from '@chakra-ui/react';

export function useColorModeToggle() {
  const { colorMode: colorModeFromHook, setColorMode } = useColorMode();

  return (input?: string) => {
    const colorMode = input ?? colorModeFromHook;
    setColorMode(colorMode);
    console.log('[useColorModeToggle:fetch] colorMode:', colorMode);
    fetch(`/api/user/theme`, {
      body: JSON.stringify({ theme: colorMode }),
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}
