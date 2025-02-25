/**
 * Color manipulation utilities based on the 'polished' library
 * These replace MUI color manipulation functions (alpha, lighten, darken)
 */

import {
  rgba,
  lighten as polishedLighten,
  darken as polishedDarken,
} from 'polished';

/**
 * Replaces MUI's alpha function with polished's rgba
 * @param color - The color to apply alpha to
 * @param value - The alpha value between 0 and 1
 */
export const alpha = (color: string, value: number): string => {
  return rgba(color, value);
};

/**
 * Replaces MUI's lighten function with polished's lighten
 * @param color - The color to lighten
 * @param value - The amount to lighten (0-1)
 */
export const lighten = (color: string, value: number): string => {
  return polishedLighten(value, color);
};

/**
 * Replaces MUI's darken function with polished's darken
 * @param color - The color to darken
 * @param value - The amount to darken (0-1)
 */
export const darken = (color: string, value: number): string => {
  return polishedDarken(value, color);
};
