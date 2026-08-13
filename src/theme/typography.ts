import { sizes } from "../constants/fonts";

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
    small: sizes.small * scale,
    medium: sizes.medium * scale,
    large: sizes.large * scale,
    xlarge: sizes.xlarge * scale,
  };
};
