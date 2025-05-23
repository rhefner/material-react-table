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
