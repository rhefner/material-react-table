import React from 'react';
import { 
  Input, 
  Textarea,
  Field,
  type InputProps,
  type TextareaProps,
  Box
} from '@chakra-ui/react';

export interface TextFieldProps extends Omit<InputProps, 'size' | 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  label?: string;
  helperText?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;
  select?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  autoComplete?: string;
  autoFocus?: boolean;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  InputProps?: {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    [key: string]: any;
  };
  inputProps?: {
    'aria-label'?: string;
    autoComplete?: string;
    disabled?: boolean;
    title?: string;
    [key: string]: any;
  };
  slotProps?: {
    input?: any;
    inputLabel?: any;
    formHelperText?: any;
    htmlInput?: any;
    select?: any;
  };
  children?: React.ReactNode;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
}

const TextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  ({ 
    variant = 'outlined',
    size = 'medium',
    fullWidth,
    multiline,
    rows,
    maxRows,
    minRows,
    label,
    helperText,
    error,
    disabled,
    required,
    placeholder,
    type = 'text',
    select,
    margin = 'normal',
    autoComplete,
    autoFocus,
    inputRef,
    InputProps,
    inputProps,
    slotProps,
    children,
    value,
    onChange,
    onKeyDown,
    onClick,
    ...props 
  }, ref) => {
    
    const chakraSize = size === 'small' ? 'sm' : 'md';
    const chakraVariant = variant === 'standard' ? 'flushed' : variant;
    
    // Handle select variant
    if (select) {
      return (
        <Field.Root>
          {label && (
            <Field.Label 
              color={error ? 'red.500' : undefined}
              fontSize={chakraSize === 'sm' ? 'sm' : 'md'}
            >
              {label}
              {required && <span style={{ color: 'red' }}>*</span>}
            </Field.Label>
          )}
          <Box position="relative">
            <select
              ref={ref as React.Ref<HTMLSelectElement>}
              value={value || ''}
              onChange={onChange as any}
              disabled={disabled}
              required={required}
              autoFocus={autoFocus}
              style={{
                width: fullWidth ? '100%' : undefined,
                padding: chakraSize === 'sm' ? '6px 8px' : '8px 12px',
                border: variant === 'standard' ? 'none' : '1px solid #ccc',
                borderBottom: variant === 'standard' ? '1px solid #ccc' : undefined,
                borderTop: variant === 'standard' ? 'none' : undefined,
                borderLeft: variant === 'standard' ? 'none' : undefined,
                borderRight: variant === 'standard' ? 'none' : undefined,
                borderRadius: variant === 'outlined' ? '6px' : '0',
                backgroundColor: variant === 'filled' ? '#f5f5f5' : 'transparent',
                fontSize: chakraSize === 'sm' ? '14px' : '16px',
                outline: 'none',
                borderColor: error ? '#e53e3e' : '#ccc',
              }}
              {...inputProps}
              {...props}
            >
              {children}
            </select>
            {InputProps?.endAdornment && (
              <Box position="absolute" right={2} top="50%" transform="translateY(-50%)">
                {InputProps.endAdornment}
              </Box>
            )}
          </Box>
          {helperText && (
            <Field.HelperText color={error ? 'red.500' : 'gray.600'}>
              {helperText}
            </Field.HelperText>
          )}
          {error && (
            <Field.ErrorText>
              {typeof error === 'string' ? error : 'Invalid input'}
            </Field.ErrorText>
          )}
        </Field.Root>
      );
    }

    // Handle multiline
    if (multiline) {
      return (
        <Field.Root>
          {label && (
            <Field.Label 
              color={error ? 'red.500' : undefined}
              fontSize={chakraSize === 'sm' ? 'sm' : 'md'}
            >
              {label}
              {required && <span style={{ color: 'red' }}>*</span>}
            </Field.Label>
          )}
          <Textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            variant={chakraVariant}
            size={chakraSize}
            width={fullWidth ? '100%' : undefined}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            rows={rows}
            resize={maxRows ? 'vertical' : 'none'}
            value={value || ''}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onClick={onClick}
            borderColor={error ? 'red.500' : undefined}
            _focus={{
              borderColor: error ? 'red.500' : 'blue.500',
              boxShadow: error ? '0 0 0 1px red.500' : '0 0 0 1px blue.500'
            }}
            {...inputProps}
            {...props}
          />
          {helperText && (
            <Field.HelperText color={error ? 'red.500' : 'gray.600'}>
              {helperText}
            </Field.HelperText>
          )}
        </Field.Root>
      );
    }

    // Regular input
    return (
      <Field.Root>
        {label && (
          <Field.Label 
            color={error ? 'red.500' : undefined}
            fontSize={chakraSize === 'sm' ? 'sm' : 'md'}
          >
            {label}
            {required && <span style={{ color: 'red' }}>*</span>}
          </Field.Label>
        )}
        <Box position="relative">
          {InputProps?.startAdornment && (
            <Box position="absolute" left={2} top="50%" transform="translateY(-50%)" zIndex={1}>
              {InputProps.startAdornment}
            </Box>
          )}
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            variant={chakraVariant}
            size={chakraSize}
            width={fullWidth ? '100%' : undefined}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value || ''}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onClick={onClick}
            borderColor={error ? 'red.500' : undefined}
            pl={InputProps?.startAdornment ? 10 : undefined}
            pr={InputProps?.endAdornment ? 10 : undefined}
            _focus={{
              borderColor: error ? 'red.500' : 'blue.500',
              boxShadow: error ? '0 0 0 1px red.500' : '0 0 0 1px blue.500'
            }}
            {...inputProps}
            {...props}
          />
          {InputProps?.endAdornment && (
            <Box position="absolute" right={2} top="50%" transform="translateY(-50%)">
              {InputProps.endAdornment}
            </Box>
          )}
        </Box>
        {helperText && (
          <Field.HelperText color={error ? 'red.500' : 'gray.600'}>
            {helperText}
          </Field.HelperText>
        )}
      </Field.Root>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
export { TextField };
export type { TextFieldProps };
