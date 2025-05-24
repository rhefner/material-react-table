import React from 'react';
import { 
  Select as ChakraSelect, 
  type SelectRootProps,
  type SelectValueTextProps,
  type SelectTriggerProps,
  type SelectContentProps
} from '@chakra-ui/react';

export interface SelectProps extends SelectRootProps {
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled' | 'standard';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  native?: boolean;
  displayEmpty?: boolean;
  renderValue?: (value: any) => React.ReactNode;
  MenuProps?: {
    disableScrollLock?: boolean;
    [key: string]: any;
  };
  inputProps?: {
    'aria-label'?: string;
    id?: string;
    [key: string]: any;
  };
  label?: string;
  disableUnderline?: boolean;
  children?: React.ReactNode;
  value?: any;
  onChange?: (event: { target: { value: any } }) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    variant = 'outline',
    size = 'md',
    placeholder,
    disabled,
    error,
    fullWidth,
    native,
    displayEmpty,
    renderValue,
    MenuProps,
    inputProps,
    label,
    disableUnderline,
    children,
    value,
    onChange,
    ...props 
  }, ref) => {
    
    // Handle native select
    if (native) {
      return (
        <select
          ref={ref}
          value={value || ''}
          onChange={(e) => onChange?.({ target: { value: e.target.value } })}
          disabled={disabled}
          aria-label={inputProps?.['aria-label']}
          id={inputProps?.id}
          style={{
            width: fullWidth ? '100%' : undefined,
            padding: '8px',
            border: variant === 'standard' && disableUnderline ? 'none' : '1px solid #ccc',
            borderBottom: variant === 'standard' ? '1px solid #ccc' : undefined,
            borderTop: variant === 'standard' ? 'none' : undefined,
            borderLeft: variant === 'standard' ? 'none' : undefined,
            borderRight: variant === 'standard' ? 'none' : undefined,
            backgroundColor: 'transparent',
            fontSize: '14px',
            outline: 'none',
          }}
          {...props}
        >
          {displayEmpty && placeholder && (
            <option value="" disabled={!displayEmpty}>
              {placeholder}
            </option>
          )}
          {children}
        </select>
      );
    }

    // Use Chakra Select for non-native
    return (
      <ChakraSelect.Root
        value={value ? [String(value)] : []}
        onValueChange={(details) => {
          const newValue = details.value[0];
          onChange?.({ target: { value: newValue } });
        }}
        disabled={disabled}
        size={size}
        {...props}
      >
        <ChakraSelect.Trigger
          width={fullWidth ? '100%' : undefined}
          variant={variant === 'standard' ? 'plain' : variant}
          borderColor={error ? 'red.500' : undefined}
          _focus={{
            borderColor: error ? 'red.500' : 'blue.500',
            boxShadow: error ? '0 0 0 1px red.500' : '0 0 0 1px blue.500'
          }}
        >
          <ChakraSelect.ValueText placeholder={placeholder} />
          <ChakraSelect.Indicator />
        </ChakraSelect.Trigger>
        <ChakraSelect.Content>
          {children}
        </ChakraSelect.Content>
      </ChakraSelect.Root>
    );
  }
);

Select.displayName = 'Select';

export default Select;
export { Select };
export type { SelectProps };
