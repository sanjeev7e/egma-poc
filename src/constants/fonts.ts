import { Platform } from "react-native";

// Font constants

// Initial value for the UI toggle (see FontFamilyPreferenceContext) that
// switches between the OS default typeface and a fixed fallback font.
export const USE_SYSTEM_FONT = true;

// On Android, naming the literal system alias ("Roboto") isn't actually
// pinned: OEM skins and system-wide font-changer tools (e.g. Samsung One UI
// Font style, MIUI, HiFont/iFont-style Magisk modules) replace the font
// files backing that alias, so requesting "Roboto" by name still resolves to
// whatever the device swapped in. "RobotoFixed" is our own bundled font
// (src/assets/fonts/Roboto-*.ttf, embedded via the expo-font config plugin
// in app.config.ts), registered under a family name no OS override targets,
// so it renders identically regardless of the device's font setting.
export const FIXED_FALLBACK_FONT = Platform.select({
  ios: "Helvetica Neue",
  android: "RobotoFixed",
  default: "Arial",
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
