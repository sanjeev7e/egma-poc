// Font constants
export const fonts = {
  // Deliberately left undefined (not 'System', which isn't a real font
  // alias) so Text/TextInput fall back to the OS default typeface. On
  // Android, OEM "Font style" settings (e.g. Samsung One UI) override that
  // default at the framework level and take effect on the app's next cold
  // start — naming an explicit family here would prevent that. See
  // docs/adaptive-font-poc.md for details and platform caveats.
  regular: undefined as string | undefined,
  medium: undefined as string | undefined,
  bold: undefined as string | undefined,
  sizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
};
