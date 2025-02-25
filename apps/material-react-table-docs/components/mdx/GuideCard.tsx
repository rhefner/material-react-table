import { Card, Text, theme } from '@chakra-ui/react';
import { alpha } from 'chakra-react-table/src/utils/color.utils';

import Link from 'next/link';

interface Props {
  title: string;
  href: string;
}

export const GuideCard = ({ href, title }: Props) => {
  return (
    <Link href={href}>
      <Card
        sx={{
          color: theme.colors.blue[500],
          '&:hover': {
            boxShadow: `1px 4px 8px ${alpha(theme.colors.blue[500], 0.5)}`,
          },
        }}
      >
        <Text
          as="h4"
          variant="h5"
          sx={{
            whiteSpace: 'nowrap',
            textAlign: 'center',
            fontSize: '1.2rem',
          }}
        >
          {title}
        </Text>
      </Card>
    </Link>
  );
};
