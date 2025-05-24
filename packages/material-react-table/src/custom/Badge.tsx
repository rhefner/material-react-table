import React from 'react';
import { Badge as ChakraBadge, type BadgeProps as ChakraBadgeProps, Box } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface BadgeProps extends ChakraBadgeProps, WithSxProps {
  badgeContent?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  variant?: 'standard' | 'dot';
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
  overlap?: 'rectangular' | 'circular';
  invisible?: boolean;
  showZero?: boolean;
  max?: number;
  component?: React.ElementType;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    badgeContent,
    color = 'default',
    variant = 'standard',
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    overlap = 'rectangular',
    invisible,
    showZero = false,
    max = 99,
    component,
    sx,
    children,
    ...props 
  }, ref) => {
    
    const sxStyles = useSxProp(sx);
    
    // Map colors to Chakra color schemes
    const colorScheme = 
      color === 'primary' ? 'blue' :
      color === 'secondary' ? 'gray' :
      color === 'error' ? 'red' :
      color === 'info' ? 'blue' :
      color === 'success' ? 'green' :
      color === 'warning' ? 'orange' :
      'gray';

    // Handle numeric badge content with max
    let displayContent = badgeContent;
    if (typeof badgeContent === 'number') {
      if (badgeContent === 0 && !showZero) {
        displayContent = null;
      } else if (badgeContent > max) {
        displayContent = `${max}+`;
      }
    }

    // Handle invisible badge
    if (invisible || (!displayContent && !showZero)) {
      return children as React.ReactElement;
    }

    return (
      <Box ref={ref} position="relative" display="inline-block" css={sxStyles} {...props}>
        {children}
        <ChakraBadge
          position="absolute"
          top={anchorOrigin.vertical === 'top' ? 0 : undefined}
          bottom={anchorOrigin.vertical === 'bottom' ? 0 : undefined}
          left={anchorOrigin.horizontal === 'left' ? 0 : undefined}
          right={anchorOrigin.horizontal === 'right' ? 0 : undefined}
          transform={
            anchorOrigin.vertical === 'top' && anchorOrigin.horizontal === 'right' 
              ? 'translate(50%, -50%)'
              : anchorOrigin.vertical === 'top' && anchorOrigin.horizontal === 'left'
                ? 'translate(-50%, -50%)'
                : anchorOrigin.vertical === 'bottom' && anchorOrigin.horizontal === 'right'
                  ? 'translate(50%, 50%)'
                  : 'translate(-50%, 50%)'
          }
          colorScheme={colorScheme}
          variant={variant === 'dot' ? 'solid' : 'solid'}
          size={variant === 'dot' ? 'sm' : 'md'}
          borderRadius={variant === 'dot' ? 'full' : 'md'}
          minW={variant === 'dot' ? 2 : 5}
          h={variant === 'dot' ? 2 : 5}
          fontSize={variant === 'dot' ? 0 : 'xs'}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {variant === 'dot' ? '' : displayContent}
        </ChakraBadge>
      </Box>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
export { Badge };
export type { BadgeProps };
