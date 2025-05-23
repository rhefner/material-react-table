const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '');
  const num = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const int = parseInt(num, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

const mix = (color: string, amount: number, mixWith: number) => {
  const { r, g, b } = hexToRgb(color);
  return rgbToHex(
    Math.round(r + (mixWith - r) * amount),
    Math.round(g + (mixWith - g) * amount),
    Math.round(b + (mixWith - b) * amount),
  );
};

export const lighten = (color: string, amount: number): string => mix(color, amount, 255);

export const darken = (color: string, amount: number): string => mix(color, amount, 0);

export const alpha = (color: string, value: number): string => {
  const { r, g, b } = hexToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${value})`;
};
import { useTheme, type Theme } from '@chakra-ui/react';

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

const hexToRgba = (hex: string): RGBA => {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join('');
  }
  if (h.length === 6) h += 'ff';
  const num = parseInt(h, 16);
  return {
    r: (num >> 24) & 0xff,
    g: (num >> 16) & 0xff,
    b: (num >> 8) & 0xff,
    a: (num & 0xff) / 255,
  };
};

const rgbStringToRgba = (color: string): RGBA => {
  const values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .split(/[,\s]+/)
    .map(Number);
  return {
    r: values[0],
    g: values[1],
    b: values[2],
    a: values.length > 3 ? values[3] : 1,
  };
};

const parseColor = (color: string): RGBA => {
  if (color.startsWith('#')) return hexToRgba(color);
  if (color.startsWith('rgb')) return rgbStringToRgba(color);
  return hexToRgba('#000');
};

const toRgbaString = ({ r, g, b, a }: RGBA) =>
  `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${clamp(a)})`;

const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
};

const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r * 255, g * 255, b * 255];
};

export const lighten = (color: string, amount: number): string => {
  const { r, g, b, a } = parseColor(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [nr, ng, nb] = hslToRgb(h, s, clamp(l + amount));
  return toRgbaString({ r: nr, g: ng, b: nb, a });
};

export const darken = (color: string, amount: number): string => {
  const { r, g, b, a } = parseColor(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [nr, ng, nb] = hslToRgb(h, s, clamp(l - amount));
  return toRgbaString({ r: nr, g: ng, b: nb, a });
};

export const transparentize = (color: string, amount: number): string => {
  const { r, g, b, a } = parseColor(color);
  return toRgbaString({ r, g, b, a: clamp(a - amount) });
};

export { useTheme, type Theme };
export { transparentize as alpha };
