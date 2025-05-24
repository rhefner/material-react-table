import React from 'react';
import { Button, type ButtonProps } from '@chakra-ui/react';

export interface PaginationItemProps extends ButtonProps {
  page?: number;
  type?: 'page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis';
  selected?: boolean;
  disabled?: boolean;
  shape?: 'circular' | 'rounded';
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined';
  color?: 'primary' | 'secondary' | 'standard';
  slots?: {
    first?: React.ComponentType;
    last?: React.ComponentType;
    next?: React.ComponentType;
    previous?: React.ComponentType;
  };
}

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ 
    page,
    type = 'page',
    selected,
    disabled,
    shape = 'circular',
    size = 'medium',
    variant = 'text',
    color = 'primary',
    slots,
    children,
    ...props 
  }, ref) => {
    
    const chakraSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
    const chakraVariant = variant === 'outlined' ? 'outline' : selected ? 'solid' : 'ghost';
    
    // Handle different types
    let content = children;
    let icon = null;
    
    if (type === 'first' && slots?.first) {
      const FirstIcon = slots.first;
      icon = <FirstIcon />;
    } else if (type === 'last' && slots?.last) {
      const LastIcon = slots.last;
      icon = <LastIcon />;
    } else if (type === 'next' && slots?.next) {
      const NextIcon = slots.next;
      icon = <NextIcon />;
    } else if (type === 'previous' && slots?.previous) {
      const PreviousIcon = slots.previous;
      icon = <PreviousIcon />;
    } else if (type === 'page') {
      content = page;
    } else if (type === 'start-ellipsis' || type === 'end-ellipsis') {
      content = '...';
    }

    return (
      <Button
        ref={ref}
        variant={chakraVariant}
        size={chakraSize}
        disabled={disabled}
        borderRadius={shape === 'circular' ? 'full' : 'md'}
        colorScheme={color === 'primary' ? 'blue' : color === 'secondary' ? 'gray' : 'gray'}
        bg={selected ? 'blue.500' : undefined}
        color={selected ? 'white' : undefined}
        _hover={!disabled && !selected ? {
          bg: 'gray.100'
        } : {}}
        minW={8}
        h={8}
        {...props}
      >
        {icon || content}
      </Button>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';

export default PaginationItem;
export { PaginationItem };
export type { PaginationItemProps };
