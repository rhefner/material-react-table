import { type CSSProperties, useState } from 'react';
import {
  useTheme,
  Tooltip,
  IconButton,
  type AsProps,
  Card,
  useColorMode,
} from '@chakra-ui/react';
import { Highlight, themes } from 'prism-react-renderer';
import {
  MdContentCopy as ContentCopyIcon,
  MdLibraryAddCheck as LibraryAddCheckIcon,
} from 'react-icons/md';
import { alpha } from 'chakra-react-table/src/utils/color.utils';

interface Props {
  children: string;
  className?: string;
  enableCopyButton?: boolean;
  style?: CSSProperties;
  margin?: string;
  paperSxProps?: AsProps;
}

export const SampleCodeSnippet = ({ paperSxProps, ...props }: Props) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.children);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  if (!props.className) {
    return (
      <code
        className={props.className}
        style={{
          backgroundColor: alpha(
            theme.colors.blue['300'],
            colorMode === 'dark' ? 0.2 : 0.1,
          ),
          padding: '4px',
          margin: '0 0.5ch',
          fontSize: '11pt',
        }}
        {...props}
      />
    );
  }

  const language = props.className?.replace?.(/language-/, '') as any;

  let code = props.children;
  if (language === 'bash') {
    code = `$ ${props.children}`;
  }

  return (
    <Card
      sx={{
        boxShadow: props.enableCopyButton === false ? 'none' : undefined,
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        ...paperSxProps,
      }}
    >
      <Highlight
        code={code}
        language={language}
        theme={colorMode === 'dark' ? themes.oceanicNext : themes.nightOwlLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            style={{
              position: 'relative',
              margin:
                props.margin ??
                (props.enableCopyButton !== false ? '2rem auto' : 0),
              fontSize: '11pt',
              lineHeight: '1.4rem',
            }}
          >
            {props.enableCopyButton !== false && (
              <Tooltip title={isCopied ? 'Copied!' : 'Copy Code'}>
                <IconButton
                  aria-label="Copy Code"
                  sx={{
                    position: 'absolute',
                    top: '0.25rem',
                    right: '0.25rem',
                  }}
                  onClick={handleCopy}
                >
                  {isCopied ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
                </IconButton>
              </Tooltip>
            )}
            <pre
              className={className}
              style={{
                ...style,
                minHeight: '3rem',
                overflowX: 'auto',
                padding: '0.75rem 1rem 0 1rem',
                ...props?.style,
              }}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  style={{
                    textDecoration: line[0].content.startsWith('-')
                      ? 'line-through'
                      : undefined,
                    color: line[0].content.startsWith('-')
                      ? theme.colors.red['500']
                      : line[0].content.startsWith('+')
                        ? theme.colors.green['500']
                        : undefined,
                  }}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    </Card>
  );
};
