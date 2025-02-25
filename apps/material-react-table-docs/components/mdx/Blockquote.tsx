import { useMediaQuery, useTheme } from '@chakra-ui/react';
import { alpha, darken } from 'chakra-react-table/src/utils/color.utils';

export const Blockquote = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 720px)');
  return (
    <blockquote
      style={{
        borderLeft: `solid 8px ${alpha(
          darken(theme.colors.gray['500'], 0.2),
          0.6,
        )}`,
        padding: '0.5rem 1rem',
        backgroundColor: alpha(theme.colors.blue['500'], 0.05),
        borderRadius: '4px',
        margin: isMobile ? '1rem' : '3rem',
      }}
      {...props}
    />
  );
};
