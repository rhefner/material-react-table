import React from 'react';
import { 
  RadioGroup,
  type RadioGroupRootProps
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface RadioProps extends RadioGroupRootProps, WithSxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  required?: boolean;
  value?: any;
  name?: string;
  id?: string;
}

const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(
  ({ 
    checked,
    defaultChecked,
    disabled,
    onChange,
    size = 'medium',
    color = 'primary',
    icon,
    checkedIcon,
    inputProps,
    inputRef,
    required,
    value,
    name,
    id,
    sx,
    children,
    ...props 
  }, ref) => {
    
    const chakraSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
    const colorScheme = color === 'primary' ? 'blue' : color === 'secondary' ? 'gray' : 'gray';
    const sxStyles = useSxProp(sx);

    return (
      <RadioGroup.Root
        ref={ref}
        value={checked ? [String(value || 'checked')] : []}
        onValueChange={(details) => {
          if (onChange) {
            const event = {
              target: {
                checked: details.value.length > 0,
                value: value,
                name: name,
              }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
          }
        }}
        disabled={disabled}
        size={chakraSize}
        colorScheme={colorScheme}
        css={sxStyles}
        {...props}
      >
        <RadioGroup.Item
          value={String(value || 'checked')}
          disabled={disabled}
          required={required}
          name={name}
          id={id}
          ref={inputRef}
          {...inputProps}
        >
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl>
            <RadioGroup.ItemIndicator>
              {checkedIcon || icon || '●'}
            </RadioGroup.ItemIndicator>
          </RadioGroup.ItemControl>
          {children && (
            <RadioGroup.ItemText>
              {children}
            </RadioGroup.ItemText>
          )}
        </RadioGroup.Item>
      </RadioGroup.Root>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
export { Radio };
export type { RadioProps };
