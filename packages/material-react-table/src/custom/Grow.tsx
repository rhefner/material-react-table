import React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface GrowProps extends BoxProps, WithSxProps {
  in?: boolean;
  timeout?: number | { enter?: number; exit?: number } | 'auto';
  easing?: string | { enter?: string; exit?: string };
  appear?: boolean;
  unmountOnExit?: boolean;
  addEndListener?: (node: HTMLElement, done: () => void) => void;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onEntering?: (node: HTMLElement, isAppearing: boolean) => void;
  onEntered?: (node: HTMLElement, isAppearing: boolean) => void;
  onExit?: (node: HTMLElement) => void;
  onExiting?: (node: HTMLElement) => void;
  onExited?: (node: HTMLElement) => void;
}

const Grow = React.forwardRef<HTMLDivElement, GrowProps>(
  ({ 
    in: isVisible = false,
    timeout = 225,
    easing,
    appear = true,
    unmountOnExit,
    addEndListener,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    sx,
    children,
    ...props 
  }, ref) => {
    
    const sxStyles = useSxProp(sx);

    // Simple implementation - in a real app you might want to use Framer Motion or similar
    if (!isVisible && unmountOnExit) {
      return null;
    }

    return (
      <Box
        ref={ref}
        opacity={isVisible ? 1 : 0}
        transform={isVisible ? 'scale(1)' : 'scale(0.8)'}
        transition={`all ${typeof timeout === 'number' ? timeout : 225}ms ease-in-out`}
        css={sxStyles}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Grow.displayName = 'Grow';

export default Grow;
export { Grow };
export type { GrowProps };
