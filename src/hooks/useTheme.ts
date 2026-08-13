import { useColorScheme } from "react-native";
import { colors } from "../constants/colors";
import { getFontFamily } from "../constants/fonts";
import { getScaledFontSizes } from "../theme/typography";
import { useFontFamilyPreference } from "./FontFamilyPreferenceContext";
import { useFontScale } from "./useFontScale";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const fontScale = useFontScale();
  const { useSystemFont, setUseSystemFont } = useFontFamilyPreference();
  const family = getFontFamily(useSystemFont);

  return {
    isDark: colorScheme === "dark",
    colors,
    fonts: {
      regular: family,
      medium: family,
      bold: family,
      sizes: getScaledFontSizes(fontScale),
    },
    fontScale,
    useSystemFont,
    setUseSystemFont,
  };
};
