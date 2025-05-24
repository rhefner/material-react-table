import React from 'react';
import {
  Checkbox as ChakraCheckbox,
  type CheckboxRootProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface CheckboxProps extends CheckboxRootProps, WithSxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  required?: boolean;
  value?: any;
  name?: string;
  id?: string;
}

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      disabled,
      indeterminate,
      onChange,
      size = 'medium',
      color = 'primary',
      icon,
      checkedIcon,
      indeterminateIcon,
      inputProps,
      inputRef,
      required,
      value,
      name,
      id,
      sx,
      children,
      ...props
    },
    ref,
  ) => {
    const chakraSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
    const colorScheme =
      color === 'primary' ? 'blue' : color === 'secondary' ? 'gray' : 'gray';
    const sxStyles = useSxProp(sx);

    return (
      <ChakraCheckbox.Root
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        size={chakraSize}
        colorScheme={colorScheme}
        onCheckedChange={(details) => {
          if (onChange) {
            const event = {
              target: {
                checked: details.checked,
                value: value,
                name: name,
              },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
          }
        }}
        css={sxStyles}
        {...props}
      >
        <ChakraCheckbox.HiddenInput ref={inputRef} id={id} {...inputProps} />
        <ChakraCheckbox.Control>
          <ChakraCheckbox.Indicator>
            {indeterminate && indeterminateIcon
              ? indeterminateIcon
              : checked && checkedIcon
                ? checkedIcon
                : icon || '✓'}
          </ChakraCheckbox.Indicator>
        </ChakraCheckbox.Control>
        {children && <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>}
      </ChakraCheckbox.Root>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
export { Checkbox };
export type { CheckboxProps };
