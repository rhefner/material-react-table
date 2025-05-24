import React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface PaperProps extends BoxProps, WithSxProps {
  elevation?: number;
  square?: boolean;
  variant?: 'elevation' | 'outlined';
  component?: React.ElementType;
}

const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  (
    {
      elevation = 1,
      square,
      variant = 'elevation',
      component,
      sx,
      children,
      ...props
    },
    ref,
  ) => {
    const sxStyles = useSxProp(sx);

    // Map elevation to box shadow
    const getElevationShadow = (level: number) => {
      const shadows = {
        0: 'none',
        1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
      };
      return shadows[level as keyof typeof shadows] || shadows[1];
    };

    return (
      <Box
        ref={ref}
        as={component}
        bg="white"
        borderRadius={square ? 0 : 'md'}
        boxShadow={
          variant === 'elevation' ? getElevationShadow(elevation) : 'none'
        }
        border={variant === 'outlined' ? '1px solid' : 'none'}
        borderColor={variant === 'outlined' ? 'gray.200' : 'transparent'}
        _dark={{
          bg: 'gray.800',
          borderColor: variant === 'outlined' ? 'gray.600' : 'transparent',
        }}
        css={sxStyles}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Paper.displayName = 'Paper';

export default Paper;
export { Paper };
export type { PaperProps };
