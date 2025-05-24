import { SystemStyleObject } from '@chakra-ui/react';

// Type for Material UI's sx prop
export type SxProps = SystemStyleObject | ((theme: any) => SystemStyleObject) | Array<SystemStyleObject | ((theme: any) => SystemStyleObject)>;

// Utility to convert Material UI sx prop to Chakra UI styles
export function convertSxToChakra(sx: SxProps | undefined, theme?: any): SystemStyleObject | undefined {
  if (!sx) return undefined;

  // Handle function sx
  if (typeof sx === 'function') {
    return sx(theme);
  }

  // Handle array sx
  if (Array.isArray(sx)) {
    return sx.reduce((acc, item) => {
      const resolved = typeof item === 'function' ? item(theme) : item;
      return { ...acc, ...resolved };
    }, {});
  }

  // Handle object sx
  return sx as SystemStyleObject;
}

// Common interface for components that support sx prop
export interface WithSxProps {
  sx?: SxProps;
}

// Hook to use sx prop with Chakra styling
export function useSxProp(sx: SxProps | undefined, theme?: any) {
  return convertSxToChakra(sx, theme);
}
