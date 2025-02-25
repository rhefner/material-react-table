import { Box } from '@chakra-ui/react';

export const StatBadges = () => {
  return (
    <Box
      display="flex"
      gap="1rem"
      justifyContent="center"
      flexWrap="wrap"
      m={{ base: 0, md: '1rem' }}
      sx={{
        '& img': {
          imageRendering: 'pixelated',
        },
      }}
    >
      <a
        aria-label="NPM Version"
        href="https://npmjs.com/package/chakra-react-table"
        target="_blank_"
      >
        <img
          alt="NPM Version"
          src="https://badgen.net/npm/v/chakra-react-table?color=blue"
        />
      </a>
      <a
        aria-label="Number of Downloads"
        href="https://npmtrends.com/chakra-react-table"
        target="_blank_"
      >
        <img
          alt="Downloads"
          src="https://badgen.net/npm/dt/chakra-react-table?label=installs&icon=npm&color=blue"
        />
      </a>
      <a
        aria-label="Bundle Size"
        href="https://bundlephobia.com/result?p=chakra-react-table"
        target="_blank_"
      >
        <img
          alt="Bundle Size"
          src="https://badgen.net/bundlephobia/minzip/chakra-react-table@latest?color=blue"
        />
      </a>
      <a
        aria-label="GitHub Stars"
        href="https://star-history.com/#kevinvandy/chakra-react-table&Date"
        target="_blank_"
      >
        <img
          alt="GitHub Stars"
          src="https://badgen.net/github/stars/KevinVandy/chakra-react-table?color=blue"
        />
      </a>
      <a
        href="https://github.com/KevinVandy/chakra-react-table/blob/v3/LICENSE"
        target="_blank"
        rel="noopener"
      >
        <img
          alt=""
          src="https://badgen.net/github/license/KevinVandy/chakra-react-table?color=blue"
        />
      </a>
      <a
        href="https://github.com/sponsors/kevinvandy"
        target="_blank"
        rel="noopener"
      >
        <img alt="" src="https://img.shields.io/badge/sponsor-violet" />
      </a>
    </Box>
  );
};
