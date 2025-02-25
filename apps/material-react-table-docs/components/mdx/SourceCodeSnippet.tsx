import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Divider,
  Icon,
  IconButton,
  Link as MuiLink,
  MenuItem,
  Select,
  Tooltip,
  useMediaQuery,
  useTheme,
  Textarea,
  CloseButton,
  Switch,
  InputGroup,
  Card,
} from '@chakra-ui/react';
import {
  MdCode as CodeIcon,
  MdContentCopy as ContentCopyIcon,
  MdElectricBolt as ElectricBoltIcon,
  MdLibraryAddCheck as LibraryAddCheckIcon,
  MdUnfoldLess as UnfoldLessIcon,
  MdUnfoldMore as UnfoldMoreIcon,
  MdLaunch as LaunchIcon,
} from 'react-icons/md';
import { VscGithub as GitHubIcon } from 'react-icons/vsc';
import { LinkHeading } from './LinkHeading';
import { usePlausible } from 'next-plausible';
import { useThemeContext } from '../../styles/ThemeContext';
import { EthicalAd } from './EthicalAd';

export interface Props {
  Component?: any;
  tableId: string;
  typeScriptCode: string;
  showTopRow?: boolean;
}

export const SourceCodeSnippet = ({
  Component,
  tableId,
  typeScriptCode,
  showTopRow = true,
}: Props) => {
  const plausible = usePlausible();
  const theme = useTheme();
  const {
    isLightTheme,
    setIsLightTheme,
    secondaryColor,
    setSecondaryColor,
    primaryColor,
    setPrimaryColor,
    setIsSandboxOpen,
  } = useThemeContext();
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [codeTab, setCodeTab] = useState<
    'ts' | 'api' | 'stackblitz' | 'sandbox'
  >('ts');
  const [isCopied, setIsCopied] = useState(false);
  const [isFullCode, setIsFullCode] = useState(false);
  const [showV2Alert, setShowV2Alert] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const v2AlertDismissed = localStorage.getItem('v2AlertDismissed');
    if (!v2AlertDismissed) {
      setShowV2Alert(true);
    }
  }, []);

  useEffect(() => {
    setIsSandboxOpen(['stackblitz', 'sandbox'].includes(codeTab));
    return () => {
      setIsSandboxOpen(false);
    };
  }, [codeTab]);

  const handleDismissV2Alert = () => {
    localStorage.setItem('v2AlertDismissed', 'true');
    setShowV2Alert(false);
    plausible('dismiss-v2-alert');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(typeScriptCode ?? '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  let skipCodeLine = false;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        m: '2rem auto',
      }}
    >
      {Component && (
        <>
          {showTopRow && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <LinkHeading
                tableId={tableId}
                variant="h4"
                textTransform="capitalize"
              >
                Demo
              </LinkHeading>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  flexWrap: 'wrap',
                  gap: '2rem',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: { xs: 'grid', sm: 'flex' },
                      flexWrap: 'wrap',
                      gap: '1rem',
                      justifyContent: { xs: 'center', lg: 'flex-start' },
                      width: { xs: '100%', lg: 'auto' },
                    }}
                  >
                    <Button
                      as={Link}
                      color="success"
                      rightIcon={<Icon as={LaunchIcon} />}
                      href={`https://stackblitz.com/github/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox?file=src/TS.tsx`}
                      onClick={() => plausible('open-stackblitz')}
                      rel="noopener"
                      leftIcon={<Icon as={ElectricBoltIcon} />}
                      sx={{ cursor: 'pointer' }}
                      target="_blank"
                      variant="outlined"
                    >
                      Open Stackblitz
                    </Button>
                    <Button
                      as={Link}
                      color="warning"
                      rightIcon={<Icon as={LaunchIcon} />}
                      href={`https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox?file=/src/TS.tsx`}
                      onClick={() => plausible('open-code-sandbox')}
                      rel="noopener"
                      leftIcon={<Icon as={CodeIcon} />}
                      sx={{ cursor: 'pointer' }}
                      target="_blank"
                      variant="outlined"
                    >
                      Open Code Sandbox
                    </Button>
                    <Button
                      as={Link}
                      color="info"
                      rightIcon={<Icon as={LaunchIcon} />}
                      href={`https://github.com/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox/src/${
                        codeTab === 'ts' ? 'TS.tsx' : 'API.ts'
                      }`}
                      onClick={() => plausible('open-on-github')}
                      rel="noopener"
                      leftIcon={<Icon as={GitHubIcon} />}
                      sx={{ cursor: 'pointer' }}
                      target="_blank"
                      variant="outlined"
                    >
                      Open on GitHub
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: 'auto',
                    gap: '1rem',
                    justifyContent: { xs: 'center', xl: 'flex-end' },
                    flexGrow: 1,
                  }}
                >
                  <Textarea
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    onClick={() => plausible('change-primary-color')}
                    sx={{ minWidth: '60px' }}
                    variant="standard"
                  />
                  <Textarea
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    onClick={() => plausible('change-secondary-color')}
                    sx={{ minWidth: '60px' }}
                    variant="standard"
                  />
                  <Select
                    value={isLightTheme ? 'light' : 'dark'}
                    onChange={(e) => {
                      setIsLightTheme(e.target.value === 'light');
                      plausible(
                        `toggle-theme-${
                          e.target.value === 'light' ? 'light' : 'dark'
                        }-mode`,
                      );
                    }}
                    variant="standard"
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>
          )}
          <Collapse in={!['stackblitz', 'sandbox'].includes(codeTab)}>
            <Component />
          </Collapse>
        </>
      )}
      <div>
        <Collapse in={showV2Alert}>
          <Alert sx={{ mb: '1rem' }} variant="outlined">
            <CloseButton onClick={handleDismissV2Alert} />
            <AlertTitle>This example is written for MRT V3.</AlertTitle>
            If your app is still using MRT V1, either{' '}
            <Link href="/migrating-to-v2" passHref legacyBehavior>
              <MuiLink>Upgrade to MRT V3</MuiLink>
            </Link>{' '}
            or use the{' '}
            <MuiLink
              href="https://v1.material-react-table.com"
              rel="noopener"
              target="_blank"
              onClick={() => plausible('version-select')}
            >
              V1 Docs
            </MuiLink>{' '}
            instead. (useMaterialReactTable only exists in V2 and V3)
          </Alert>
        </Collapse>
        <Box
          sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' }}
        >
          <LinkHeading
            tableId={tableId}
            textTransform="capitalize"
            variant="h4"
          >
            Source Code
          </LinkHeading>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              gap: '1rem',
              justifyContent: 'space-between',
              flexWrap: {
                xs: 'wrap',
                md: 'nowrap',
              },
            }}
          >
            <span>
              <InputGroup>
                <Switch
                  onClick={() => {
                    setCodeTab('ts');
                    plausible('toggle-to-typescript');
                  }}
                  isChecked={codeTab === 'ts'}
                  sx={{ textTransform: 'none' }}
                >
                  {isMobile ? 'TS' : 'TypeScript'}
                </Switch>
                <Switch
                  onClick={() => {
                    setCodeTab('stackblitz');
                    plausible('toggle-to-stackblitz');
                  }}
                  isChecked={codeTab === 'stackblitz'}
                  sx={{ textTransform: 'none' }}
                >
                  Stackblitz
                </Switch>
                <Switch
                  onClick={() => {
                    setCodeTab('sandbox');
                    plausible('toggle-to-sandbox');
                  }}
                  isChecked={codeTab === 'sandbox'}
                  sx={{ textTransform: 'none' }}
                >
                  Sandbox
                </Switch>
              </InputGroup>
            </span>
            {!isMobile && <EthicalAd id="demo" compact text />}
          </Box>
        </Box>
        <Collapse unmountOnExit in={codeTab === 'stackblitz'}>
          <iframe
            src={`https://stackblitz.com/github/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox?file=src/TS.tsx`}
            style={{
              width: '100%',
              height: '1000px',
              border: '0',
              borderRadius: '4px',
              overflow: 'hidden',
              padding: '1rem 0',
            }}
            title="stackblitz"
            allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
        </Collapse>
        <Collapse unmountOnExit in={codeTab === 'sandbox'}>
          <iframe
            src={`https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/v3/apps/material-react-table-docs/examples/${tableId}/sandbox?fontsize=14&hidenavigation=1&theme=${
              isLightTheme ? 'light' : 'dark'
            }&file=src/TS.tsx`}
            style={{
              width: '100%',
              height: '1000px',
              border: '0',
              borderRadius: '4px',
              overflow: 'hidden',
              padding: '1rem 0',
            }}
            title="codesandbox"
            allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
        </Collapse>
        {['ts', 'api'].includes(codeTab) && (
          <Card>
            <Highlight
              code={typeScriptCode ?? ''}
              language={'tsx'}
              theme={
                theme.palette.mode === 'dark'
                  ? themes.oceanicNext
                  : themes.nightOwlLight
              }
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <div
                  style={{
                    position: 'relative',
                    fontSize: isMobile ? '1em' : '1.2em',
                  }}
                >
                  <Tooltip title={isCopied ? 'Copied!' : 'Copy Code'}>
                    <IconButton
                      aria-label={isCopied ? 'Copied!' : 'Copy Code'}
                      sx={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                      }}
                      onClick={handleCopy}
                    >
                      {isCopied ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={
                      isFullCode
                        ? 'Hide columns and data definitions'
                        : 'Show columns and data definitions'
                    }
                  >
                    <IconButton
                      aria-label={
                        isFullCode
                          ? 'Hide columns and data definitions'
                          : 'Show columns and data definitions'
                      }
                      sx={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '3.5rem',
                      }}
                      onClick={() => setIsFullCode(!isFullCode)}
                    >
                      {isFullCode ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                    </IconButton>
                  </Tooltip>
                  <pre
                    className={className}
                    style={{
                      ...style,
                      padding: isMobile
                        ? '3rem 0.5rem 1rem 0.5rem'
                        : '0.5rem 0.25rem',
                      overflowX: 'auto',
                      fontSize: '11pt',
                      lineHeight: '1.5em',
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div
                        key={i}
                        {...getLineProps({ line })}
                        style={{
                          ...style,
                          display:
                            !isFullCode && skipCodeLine ? 'none' : 'block',
                        }}
                      >
                        {!isMobile && (
                          <span
                            style={{
                              paddingRight: '2ch',
                              paddingLeft: `${4 - String(i + 1).length}ch`,
                              color: theme.palette.text.secondary,
                              userSelect: 'none',
                            }}
                          >
                            {i + 1}
                          </span>
                        )}
                        {line.map((token, key) => {
                          if (
                            token.content === '//column definitions...' ||
                            token.content === '//data definitions...' ||
                            token.content === '//demo...'
                          ) {
                            skipCodeLine = true;
                            if (isFullCode) {
                              return null;
                            }
                          } else if (token.content === '//end') {
                            skipCodeLine = false;
                            return null;
                          }
                          return (
                            <span key={key} {...getTokenProps({ token })} />
                          );
                        })}
                      </div>
                    ))}
                  </pre>
                </div>
              )}
            </Highlight>
          </Card>
        )}
      </div>
      <Divider />
    </Box>
  );
};
