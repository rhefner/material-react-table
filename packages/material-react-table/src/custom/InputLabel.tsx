import React from 'react';
import { Text, type TextProps } from '@chakra-ui/react';

export interface InputLabelProps extends TextProps {
  htmlFor?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  shrink?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  margin?: 'dense' | 'normal' | 'none';
}

const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ 
    htmlFor,
    required,
    disabled,
    error,
    focused,
    shrink,
    variant = 'standard',
    margin = 'normal',
    children,
    ...props 
  }, ref) => {
    return (
      <Text
        ref={ref}
        as="label"
        htmlFor={htmlFor}
        fontSize="sm"
        fontWeight="medium"
        color={
          error 
            ? 'red.500' 
            : disabled 
              ? 'gray.400' 
              : focused 
                ? 'blue.500' 
                : 'gray.700'
        }
        mb={margin === 'dense' ? 1 : margin === 'normal' ? 2 : 0}
        opacity={disabled ? 0.6 : 1}
        cursor={disabled ? 'not-allowed' : 'default'}
        _dark={{
          color: error 
            ? 'red.300' 
            : disabled 
              ? 'gray.500' 
              : focused 
                ? 'blue.300' 
                : 'gray.200'
        }}
        {...props}
      >
        {children}
        {required && (
          <Text as="span" color="red.500" ml={1}>
            *
          </Text>
        )}
      </Text>
    );
  }
);

InputLabel.displayName = 'InputLabel';

export default InputLabel;
export { InputLabel };
