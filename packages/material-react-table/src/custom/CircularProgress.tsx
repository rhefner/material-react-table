import React from 'react';
import { 
  Spinner,
  type SpinnerProps
} from '@chakra-ui/react';

export interface CircularProgressProps extends SpinnerProps {
  variant?: 'determinate' | 'indeterminate';
  value?: number;
  size?: number | 'small' | 'medium' | 'large';
  thickness?: number;
  disableShrink?: boolean;
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    variant = 'indeterminate',
    value,
    size = 'medium',
    thickness,
    disableShrink,
    ...props 
  }, ref) => {
    
    // Map size to Chakra size
    const chakraSize = 
      size === 'small' || size === 20 ? 'sm' :
      size === 'large' || size === 60 ? 'lg' :
      size === 'medium' || size === 40 ? 'md' :
      typeof size === 'number' ? `${size}px` : 'md';

    return (
      <Spinner
        ref={ref}
        size={chakraSize}
        color="blue.500"
        {...props}
      />
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

export default CircularProgress;
export { CircularProgress };
export type { CircularProgressProps };
