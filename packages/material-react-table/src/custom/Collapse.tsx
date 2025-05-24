import React from 'react';
import { 
  Collapsible,
  type CollapsibleRootProps
} from '@chakra-ui/react';

export interface CollapseProps extends CollapsibleRootProps {
  in?: boolean;
  timeout?: number | { enter?: number; exit?: number } | 'auto';
  easing?: string | { enter?: string; exit?: string };
  collapsedSize?: string | number;
  orientation?: 'horizontal' | 'vertical';
  unmountOnExit?: boolean;
  children?: React.ReactNode;
}

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  ({ 
    in: isOpen,
    timeout,
    easing,
    collapsedSize,
    orientation = 'vertical',
    unmountOnExit,
    children,
    ...props 
  }, ref) => {
    return (
      <Collapsible.Root
        ref={ref}
        open={isOpen}
        unmountOnExit={unmountOnExit}
        {...props}
      >
        <Collapsible.Content>
          {children}
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }
);

Collapse.displayName = 'Collapse';

export default Collapse;
export { Collapse };
export type { CollapseProps };
