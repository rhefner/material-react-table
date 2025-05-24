import React from 'react';
import { 
  Menu as ChakraMenu,
  type MenuRootProps
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface MenuProps extends MenuRootProps, WithSxProps {
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
  MenuListProps?: any;
  PaperProps?: any;
  PopoverClasses?: any;
  transitionDuration?: number | { enter?: number; exit?: number } | 'auto';
  TransitionComponent?: React.ComponentType<any>;
  TransitionProps?: any;
  variant?: 'menu' | 'selectedMenu';
  autoFocus?: boolean;
  disableAutoFocus?: boolean;
  disableEnforceFocus?: boolean;
  disableRestoreFocus?: boolean;
  disableScrollLock?: boolean;
}

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ 
    anchorEl,
    open = false,
    onClose,
    anchorOrigin,
    transformOrigin,
    MenuListProps,
    PaperProps,
    PopoverClasses,
    transitionDuration,
    TransitionComponent,
    TransitionProps,
    variant = 'menu',
    autoFocus = true,
    disableAutoFocus,
    disableEnforceFocus,
    disableRestoreFocus,
    disableScrollLock,
    sx,
    children,
    ...props 
  }, ref) => {
    
    const sxStyles = useSxProp(sx);

    return (
      <ChakraMenu.Root
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
        {...props}
      >
        <ChakraMenu.Positioner>
          <ChakraMenu.Content
            css={sxStyles}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="lg"
            minW="120px"
            py={1}
            _dark={{
              bg: 'gray.800',
              borderColor: 'gray.600'
            }}
            {...PaperProps}
          >
            {children}
          </ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </ChakraMenu.Root>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
export { Menu };
export type { MenuProps };
