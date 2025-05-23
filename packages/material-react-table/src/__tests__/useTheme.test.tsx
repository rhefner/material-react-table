import { describe, expect, it } from 'vitest';
import { getMRTTheme } from '../utils/style.utils';
import { alpha, lighten, darken } from '../utils/color.utils';

const mockTheme = {
  palette: {
    mode: 'light',
    background: { default: '#ffffff' },
    primary: { main: '#2196f3' },
    warning: { light: '#ff9800', dark: '#f57c00' },
  },
} as any;

const mockDarkTheme = {
  palette: {
    mode: 'dark',
    background: { default: '#111111' },
    primary: { main: '#2196f3' },
    warning: { light: '#ff9800', dark: '#f57c00' },
  },
} as any;

describe('getMRTTheme', () => {
  it('returns expected colors for light theme', () => {
    const theme = getMRTTheme({}, mockTheme);
    const base = mockTheme.palette.background.default;
    expect(theme.baseBackgroundColor).toBe(base);
    expect(theme.menuBackgroundColor).toBe(lighten(base, 0.07));
    expect(theme.matchHighlightColor).toBe(lighten(mockTheme.palette.warning.light, 0.5));
    expect(theme.pinnedRowBackgroundColor).toBe(alpha(mockTheme.palette.primary.main, 0.1));
    expect(theme.selectedRowBackgroundColor).toBe(alpha(mockTheme.palette.primary.main, 0.2));
  });

  it('returns expected colors for dark theme', () => {
    const theme = getMRTTheme({}, mockDarkTheme);
    const base = lighten(mockDarkTheme.palette.background.default, 0.05);
    expect(theme.baseBackgroundColor).toBe(base);
    expect(theme.menuBackgroundColor).toBe(lighten(base, 0.07));
    expect(theme.matchHighlightColor).toBe(darken(mockDarkTheme.palette.warning.dark, 0.25));
  });

  it('applies overrides', () => {
    const theme = getMRTTheme({ baseBackgroundColor: '#123456' }, mockTheme);
    expect(theme.baseBackgroundColor).toBe('#123456');
    expect(theme.menuBackgroundColor).toBe(lighten('#123456', 0.07));
  });
});
