import React from 'react';
import { 
  Skeleton as ChakraSkeleton,
  type SkeletonProps as ChakraSkeletonProps
} from '@chakra-ui/react';

export interface SkeletonProps extends ChakraSkeletonProps {
  animation?: 'pulse' | 'wave' | false;
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    animation = 'pulse',
    variant = 'text',
    width,
    height,
    children,
    ...props 
  }, ref) => {
    
    // Map variant to appropriate styles
    const getVariantStyles = () => {
      switch (variant) {
        case 'circular':
          return {
            borderRadius: 'full',
            width: width || height || '40px',
            height: height || width || '40px',
          };
        case 'rounded':
          return {
            borderRadius: 'md',
            width: width || '100%',
            height: height || '20px',
          };
        case 'rectangular':
          return {
            borderRadius: 'none',
            width: width || '100%',
            height: height || '20px',
          };
        case 'text':
        default:
          return {
            borderRadius: 'sm',
            width: width || '100%',
            height: height || '1em',
          };
      }
    };

    const variantStyles = getVariantStyles();

    // Handle animation
    const isAnimated = animation !== false;

    return (
      <ChakraSkeleton
        ref={ref}
        isLoaded={!!children}
        fadeDuration={animation === 'wave' ? 2 : 1}
        speed={animation === 'wave' ? 2 : 1}
        startColor="gray.200"
        endColor="gray.300"
        _dark={{
          startColor: 'gray.700',
          endColor: 'gray.600'
        }}
        {...variantStyles}
        {...props}
      >
        {children}
      </ChakraSkeleton>
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
export { Skeleton };
export type { SkeletonProps };
