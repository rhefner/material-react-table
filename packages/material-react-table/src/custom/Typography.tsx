import React from 'react';
import { Text, Heading, type TextProps } from '@chakra-ui/react';
import { type WithSxProps, useSxProp } from './sxProps';

// Material UI Typography variant mapping to Chakra UI
const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  button: 'span',
} as const;

const textStyleMapping = {
  h1: '6xl',
  h2: '5xl',
  h3: '4xl',
  h4: '3xl',
  h5: '2xl',
  h6: 'xl',
  subtitle1: 'lg',
  subtitle2: 'md',
  body1: 'md',
  body2: 'sm',
  caption: 'xs',
  overline: 'xs',
  button: 'md',
} as const;

export interface TypographyProps
  extends Omit<TextProps, 'variant'>,
    WithSxProps {
  variant?: keyof typeof variantMapping;
  component?: React.ElementType;
  align?: 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body1',
      component,
      align,
      gutterBottom,
      noWrap,
      paragraph,
      children,
      sx,
      ...props
    },
    ref,
  ) => {
    // Determine if we should use Heading or Text
    const isHeading = variant.startsWith('h') || variant.startsWith('subtitle');
    const Component = isHeading ? Heading : Text;

    // Map variant to appropriate element and text style
    const as = component || variantMapping[variant];
    const textStyle = textStyleMapping[variant];

    // Convert align prop to textAlign
    const textAlign = align;

    // Handle noWrap
    const truncate = noWrap;

    // Handle gutterBottom with margin bottom
    const marginBottom = gutterBottom ? 4 : undefined;

    // Handle paragraph spacing
    const paragraphSpacing = paragraph ? { mb: 4 } : {};

    // Handle sx prop
    const sxStyles = useSxProp(sx);

    return (
      <Component
        ref={ref}
        as={as}
        textStyle={textStyle}
        textAlign={textAlign}
        truncate={truncate}
        mb={marginBottom}
        {...paragraphSpacing}
        css={sxStyles}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = 'Typography';

export default Typography;
export { Typography };
