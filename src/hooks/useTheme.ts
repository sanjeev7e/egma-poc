import { useColorScheme } from "react-native";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { getScaledFontSizes } from "../theme/typography";
import { useFontScale } from "./useFontScale";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const fontScale = useFontScale();

  return {
    isDark: colorScheme === "dark",
    colors,
    fonts: {
      ...fonts,
      sizes: getScaledFontSizes(fontScale),
    },
    fontScale,
  };
};
