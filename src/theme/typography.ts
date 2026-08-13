import { fonts } from "../constants/fonts";

// Clamp so extreme accessibility settings (e.g. iOS AX5, Android 200%) scale
// text up for readability without breaking fixed-size chrome (buttons, headers).
const MIN_SCALE = 0.85;
const MAX_SCALE = 1.6;

export const clampFontScale = (scale: number) => {
  return Math.min(Math.max(scale, MIN_SCALE), MAX_SCALE);
};

export const getScaledFontSizes = (fontScale: number) => {
  const scale = clampFontScale(fontScale);
  return {
    small: fonts.sizes.small * scale,
    medium: fonts.sizes.medium * scale,
    large: fonts.sizes.large * scale,
    xlarge: fonts.sizes.xlarge * scale,
  };
};
