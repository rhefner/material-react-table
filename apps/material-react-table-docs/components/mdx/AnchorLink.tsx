import { Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

export const AnchorLink = (props) => {
  return (
    <Link href={props.href} passHref legacyBehavior>
      <ChakraLink
        target={props.href.startsWith('http') ? '_blank' : undefined}
        rel="noopener"
        {...props}
      >
        {props.children}
      </ChakraLink>
    </Link>
  );
};
