import React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface InputAdornmentProps extends BoxProps, WithSxProps {
  position: 'start' | 'end';
  disablePointerEvents?: boolean;
  disableTypography?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
}

const InputAdornment = React.forwardRef<HTMLDivElement, InputAdornmentProps>(
  (
    {
      position,
      disablePointerEvents,
      disableTypography,
      variant = 'outlined',
      sx,
      children,
      ...props
    },
    ref,
  ) => {
    const sxStyles = useSxProp(sx);

    return (
      <Box
        ref={ref}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="gray.500"
        fontSize="sm"
        pointerEvents={disablePointerEvents ? 'none' : 'auto'}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        left={position === 'start' ? 3 : undefined}
        right={position === 'end' ? 3 : undefined}
        zIndex={1}
        _dark={{
          color: 'gray.400',
        }}
        css={sxStyles}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

InputAdornment.displayName = 'InputAdornment';

export default InputAdornment;
export { InputAdornment };
export type { InputAdornmentProps };
