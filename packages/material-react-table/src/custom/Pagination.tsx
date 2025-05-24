import React from 'react';
import { 
  Pagination as ChakraPagination,
  type PaginationRootProps
} from '@chakra-ui/react';

export interface PaginationProps extends PaginationRootProps {
  count?: number;
  page?: number;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  disabled?: boolean;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined';
  color?: 'primary' | 'secondary' | 'standard';
  shape?: 'circular' | 'rounded';
  renderItem?: (item: any) => React.ReactNode;
  boundaryCount?: number;
  siblingCount?: number;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ 
    count = 1,
    page = 1,
    onChange,
    disabled,
    hideNextButton,
    hidePrevButton,
    showFirstButton,
    showLastButton,
    size = 'medium',
    variant = 'text',
    color = 'primary',
    shape = 'circular',
    renderItem,
    boundaryCount = 1,
    siblingCount = 1,
    ...props 
  }, ref) => {
    
    const chakraSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
    
    const handlePageChange = (details: { page: number }) => {
      onChange?.(null as any, details.page);
    };

    return (
      <ChakraPagination.Root
        ref={ref}
        count={count}
        page={page}
        onPageChange={handlePageChange}
        disabled={disabled}
        size={chakraSize}
        variant={variant === 'outlined' ? 'outline' : 'solid'}
        {...props}
      >
        {showFirstButton && (
          <ChakraPagination.PrevTrigger>
            First
          </ChakraPagination.PrevTrigger>
        )}
        
        {!hidePrevButton && (
          <ChakraPagination.PrevTrigger />
        )}
        
        <ChakraPagination.PageText />
        
        {!hideNextButton && (
          <ChakraPagination.NextTrigger />
        )}
        
        {showLastButton && (
          <ChakraPagination.NextTrigger>
            Last
          </ChakraPagination.NextTrigger>
        )}
      </ChakraPagination.Root>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
export { Pagination };
export type { PaginationProps };
