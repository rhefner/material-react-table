import React from 'react';
import { 
  Tag,
  TagLabel,
  TagCloseButton,
  type TagProps
} from '@chakra-ui/react';

export interface ChipProps extends TagProps {
  label?: React.ReactNode;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  onDelete?: (event: React.MouseEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  clickable?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  skipFocusWhenDisabled?: boolean;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ 
    label,
    avatar,
    icon,
    deleteIcon,
    onDelete,
    onClick,
    clickable,
    disabled,
    size = 'medium',
    variant = 'filled',
    color = 'default',
    skipFocusWhenDisabled,
    children,
    ...props 
  }, ref) => {
    
    const chakraSize = size === 'small' ? 'sm' : 'md';
    const chakraVariant = variant === 'outlined' ? 'outline' : 'solid';
    
    // Map colors to Chakra color schemes
    const colorScheme = 
      color === 'primary' ? 'blue' :
      color === 'secondary' ? 'gray' :
      color === 'error' ? 'red' :
      color === 'info' ? 'blue' :
      color === 'success' ? 'green' :
      color === 'warning' ? 'orange' :
      'gray';

    const content = children || label;

    return (
      <Tag
        ref={ref}
        size={chakraSize}
        variant={chakraVariant}
        colorScheme={colorScheme}
        cursor={clickable || onClick ? 'pointer' : 'default'}
        opacity={disabled ? 0.6 : 1}
        pointerEvents={disabled ? 'none' : 'auto'}
        onClick={disabled ? undefined : onClick}
        _hover={clickable || onClick ? {
          opacity: 0.8
        } : {}}
        _focus={!skipFocusWhenDisabled || !disabled ? {
          boxShadow: 'outline'
        } : {}}
        {...props}
      >
        {avatar && avatar}
        {icon && icon}
        <TagLabel>{content}</TagLabel>
        {onDelete && (
          <TagCloseButton 
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) {
                onDelete(e);
              }
            }}
            disabled={disabled}
          />
        )}
      </Tag>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip;
export { Chip };
export type { ChipProps };
