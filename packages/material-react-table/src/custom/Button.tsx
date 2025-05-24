import React from 'react';
import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface ButtonProps extends ChakraButtonProps, WithSxProps {
  variant?:
    | 'text'
    | 'outlined'
    | 'contained'
    | 'solid'
    | 'outline'
    | 'ghost'
    | 'subtle'
    | 'surface'
    | 'plain';
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
    | 'warning';
  disableElevation?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      size = 'medium',
      color = 'primary',
      disableElevation,
      disableFocusRipple,
      disableRipple,
      endIcon,
      startIcon,
      fullWidth,
      href,
      disabled,
      sx,
      children,
      ...props
    },
    ref,
  ) => {
    // Map Material UI variants to Chakra variants
    const chakraVariant =
      variant === 'text'
        ? 'ghost'
        : variant === 'outlined'
          ? 'outline'
          : variant === 'contained'
            ? 'solid'
            : variant;

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
                    : 'blue';

    // Handle sx prop
    const sxStyles = useSxProp(sx);

    return (
      <ChakraButton
        ref={ref}
        variant={chakraVariant}
        size={chakraSize}
        colorScheme={colorScheme}
        disabled={disabled}
        width={fullWidth ? '100%' : undefined}
        as={href ? 'a' : 'button'}
        href={href}
        css={sxStyles}
        {...props}
      >
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </ChakraButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
export { Button };
export type { ButtonProps };
