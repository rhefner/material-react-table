import React from 'react';
import { Box, Text, type BoxProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface FormControlLabelProps extends BoxProps, WithSxProps {
  control: React.ReactElement;
  label?: React.ReactNode;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  disabled?: boolean;
  required?: boolean;
  value?: any;
  checked?: boolean;
  name?: string;
  onChange?: (event: React.SyntheticEvent, checked: boolean) => void;
  componentsProps?: {
    typography?: any;
  };
}

const FormControlLabel = React.forwardRef<HTMLLabelElement, FormControlLabelProps>(
  ({ 
    control,
    label,
    labelPlacement = 'end',
    disabled,
    required,
    value,
    checked,
    name,
    onChange,
    componentsProps,
    sx,
    children,
    ...props 
  }, ref) => {
    
    const sxStyles = useSxProp(sx);
    
    // Clone control element with additional props
    const controlElement = React.cloneElement(control, {
      disabled: disabled || control.props.disabled,
      checked: checked !== undefined ? checked : control.props.checked,
      name: name || control.props.name,
      value: value !== undefined ? value : control.props.value,
      onChange: onChange || control.props.onChange,
    });

    const labelElement = label && (
      <Text
        as="span"
        color={disabled ? 'gray.400' : 'gray.700'}
        fontSize="md"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        _dark={{
          color: disabled ? 'gray.500' : 'gray.200'
        }}
        {...componentsProps?.typography}
      >
        {label}
        {required && (
          <Text as="span" color="red.500" ml={1}>
            *
          </Text>
        )}
      </Text>
    );

    const flexDirection = 
      labelPlacement === 'start' ? 'row-reverse' :
      labelPlacement === 'top' ? 'column-reverse' :
      labelPlacement === 'bottom' ? 'column' :
      'row';

    const gap = 
      labelPlacement === 'top' || labelPlacement === 'bottom' ? 1 : 2;

    return (
      <Box
        ref={ref}
        as="label"
        display="flex"
        flexDirection={flexDirection}
        alignItems="center"
        gap={gap}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.6 : 1}
        css={sxStyles}
        {...props}
      >
        {controlElement}
        {labelElement}
        {children}
      </Box>
    );
  }
);

FormControlLabel.displayName = 'FormControlLabel';

export default FormControlLabel;
export { FormControlLabel };
export type { FormControlLabelProps };
