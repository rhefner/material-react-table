import React from 'react';
import { 
  Popover as ChakraPopover,
  type PopoverRootProps
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface PopoverProps extends PopoverRootProps, WithSxProps {
  anchorEl?: Element | null;
  open?: boolean;
  onClose?: (event?: React.SyntheticEvent) => void;
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  PaperProps?: any;
  elevation?: number;
  marginThreshold?: number;
  anchorReference?: 'anchorEl' | 'anchorPosition' | 'none';
  anchorPosition?: { top: number; left: number };
  container?: Element | (() => Element) | null;
  disableAutoFocus?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: boolean;
  disableRestoreFocus?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  transitionDuration?: number | { enter?: number; exit?: number } | 'auto';
  TransitionComponent?: React.ComponentType<any>;
  TransitionProps?: any;
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ 
    anchorEl,
    open = false,
    onClose,
    anchorOrigin,
    transformOrigin,
    PaperProps,
    elevation,
    marginThreshold,
    anchorReference,
    anchorPosition,
    container,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
    transitionDuration,
    TransitionComponent,
    TransitionProps,
    sx,
    children,
    ...props 
  }, ref) => {
    
    const sxStyles = useSxProp(sx);

    return (
      <ChakraPopover.Root
        ref={ref}
        open={open}
        onOpenChange={(details) => {
          if (!details.open && onClose) {
            onClose();
          }
        }}
        positioning={{
          placement: 'bottom-start',
          gutter: 4,
        }}
        closeOnEsc={!disableEscapeKeyDown}
        modal={false}
        {...props}
      >
        <ChakraPopover.Positioner>
          <ChakraPopover.Content
            css={sxStyles}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow={elevation ? `0 ${elevation}px ${elevation * 2}px rgba(0,0,0,0.1)` : 'lg'}
            p={0}
            _dark={{
              bg: 'gray.800',
              borderColor: 'gray.600'
            }}
            {...PaperProps}
          >
            {children}
          </ChakraPopover.Content>
        </ChakraPopover.Positioner>
      </ChakraPopover.Root>
    );
  }
);

Popover.displayName = 'Popover';

export default Popover;
export { Popover };
export type { PopoverProps };
