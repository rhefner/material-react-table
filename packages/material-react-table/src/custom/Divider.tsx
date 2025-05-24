import React from 'react';
import { Separator, type SeparatorProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface DividerProps extends SeparatorProps, WithSxProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  flexItem?: boolean;
  light?: boolean;
  absolute?: boolean;
  component?: React.ElementType;
  textAlign?: 'center' | 'left' | 'right';
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ 
    orientation = 'horizontal',
    variant = 'fullWidth',
    flexItem,
    light,
    absolute,
    component,
    textAlign = 'center',
    sx,
    children,
    ...props 
  }, ref) => {
    
    const sxStyles = useSxProp(sx);

    return (
      <Separator
        ref={ref}
        orientation={orientation}
        as={component}
        position={absolute ? 'absolute' : undefined}
        opacity={light ? 0.6 : 1}
        css={sxStyles}
        {...props}
      >
        {children}
      </Separator>
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
export { Divider };
export type { DividerProps };
