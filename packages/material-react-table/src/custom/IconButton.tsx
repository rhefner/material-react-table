import React from 'react';
import {
  IconButton as ChakraIconButton,
  type IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface IconButtonProps extends ChakraIconButtonProps, WithSxProps {
  size?:
    | 'small'
    | 'medium'
    | 'large'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'default';
  edge?: 'start' | 'end' | false;
  disabled?: boolean;
  disableRipple?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = 'medium',
      color = 'default',
      edge,
      disabled,
      disableRipple,
      sx,
      children,
      ...props
    },
    ref,
  ) => {
    // Map Material UI sizes to Chakra sizes
    const chakraSize =
      size === 'small'
        ? 'sm'
        : size === 'medium'
          ? 'md'
          : size === 'large'
            ? 'lg'
            : size;

    // Map Material UI colors to Chakra color schemes
    const colorScheme =
      color === 'primary'
        ? 'blue'
        : color === 'secondary'
          ? 'gray'
          : color === 'success'
            ? 'green'
            : color === 'error'
              ? 'red'
              : color === 'info'
                ? 'blue'
                : color === 'warning'
                  ? 'orange'
                  : color === 'inherit'
                    ? 'gray'
                    : 'gray';

    // Handle sx prop
    const sxStyles = useSxProp(sx);

    return (
      <ChakraIconButton
        ref={ref}
        size={chakraSize}
        colorScheme={colorScheme}
        disabled={disabled}
        variant="ghost"
        css={sxStyles}
        {...props}
      >
        {children}
      </ChakraIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
export { IconButton };
export type { IconButtonProps };
