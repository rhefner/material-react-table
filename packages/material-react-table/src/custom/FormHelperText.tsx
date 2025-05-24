import React from 'react';
import { Text, type TextProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface FormHelperTextProps extends TextProps, WithSxProps {
  error?: boolean;
  disabled?: boolean;
  margin?: 'dense' | 'normal' | 'none';
  variant?: 'standard' | 'outlined' | 'filled';
  component?: React.ElementType;
  filled?: boolean;
  focused?: boolean;
  required?: boolean;
}

const FormHelperText = React.forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  ({ 
    error,
    disabled,
    margin = 'normal',
    variant = 'standard',
    component,
    filled,
    focused,
    required,
    sx,
    children,
    ...props 
  }, ref) => {
    
    const sxStyles = useSxProp(sx);

    return (
      <Text
        ref={ref}
        as={component || 'p'}
        fontSize="sm"
        color={
          error 
            ? 'red.500' 
            : disabled 
              ? 'gray.400' 
              : 'gray.600'
        }
        mt={margin === 'dense' ? 1 : margin === 'normal' ? 2 : 0}
        opacity={disabled ? 0.6 : 1}
        _dark={{
          color: error 
            ? 'red.300' 
            : disabled 
              ? 'gray.500' 
              : 'gray.400'
        }}
        css={sxStyles}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
export { FormHelperText };
export type { FormHelperTextProps };
