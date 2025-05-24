import React from 'react';
import {
  Tooltip as ChakraTooltip,
  type TooltipRootProps,
} from '@chakra-ui/react';

export interface TooltipProps extends TooltipRootProps {
  title?: React.ReactNode;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  arrow?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  enterTouchDelay?: number;
  leaveTouchDelay?: number;
  disableHoverListener?: boolean;
  disableFocusListener?: boolean;
  disableTouchListener?: boolean;
  interactive?: boolean;
  followCursor?: boolean;
  children: React.ReactElement;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      title,
      placement = 'top',
      arrow = true,
      enterDelay = 100,
      leaveDelay = 0,
      enterTouchDelay = 700,
      leaveTouchDelay = 1500,
      disableHoverListener,
      disableFocusListener,
      disableTouchListener,
      interactive,
      followCursor,
      children,
      ...props
    },
    ref,
  ) => {
    if (!title || disableHoverListener) {
      return children;
    }

    return (
      <ChakraTooltip.Root
        ref={ref}
        positioning={{ placement }}
        openDelay={enterDelay}
        closeDelay={leaveDelay}
        interactive={interactive}
        {...props}
      >
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content>
            {title}
            {arrow && <ChakraTooltip.Arrow />}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </ChakraTooltip.Root>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
export { Tooltip };
export type { TooltipProps };
