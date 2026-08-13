import { Platform } from "react-native";

// Font constants

// Initial value for the UI toggle (see FontFamilyPreferenceContext) that
// switches between the OS default typeface and a fixed fallback font.
export const USE_SYSTEM_FONT = true;

export const FIXED_FALLBACK_FONT = Platform.select({
  ios: "Helvetica Neue",
  android: "Roboto",
});

// undefined => Text/TextInput fall back to the OS default typeface (tracks
// OEM "Font style" overrides on Android, on the app's next cold start — see
// docs/adaptive-font-poc.md). FIXED_FALLBACK_FONT => pinned, never changes
// regardless of the device's OS-level font setting.
export const getFontFamily = (useSystemFont: boolean) =>
  useSystemFont ? undefined : FIXED_FALLBACK_FONT;

export const sizes = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
};
