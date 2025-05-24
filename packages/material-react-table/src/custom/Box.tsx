import React from 'react';
import {
  Box as ChakraBox,
  type BoxProps as ChakraBoxProps,
} from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

export interface BoxProps extends ChakraBoxProps, WithSxProps {
  component?: React.ElementType;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ component, sx, children, ...props }, ref) => {
    // Handle sx prop
    const sxStyles = useSxProp(sx);

    return (
      <ChakraBox ref={ref} as={component} css={sxStyles} {...props}>
        {children}
      </ChakraBox>
    );
  },
);

Box.displayName = 'Box';

export default Box;
export { Box };
export type { BoxProps };
