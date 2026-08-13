import { useWindowDimensions } from "react-native";

/**
 * Tracks the OS-level font scale (accessibility text size) reactively.
 * useWindowDimensions subscribes to RN's Dimensions 'change' event, whose
 * payload includes fontScale, so this re-renders whenever the user adjusts
 * their system font size — no app restart needed on iOS. On Android this
 * requires fontScale to be present in the activity's configChanges (see
 * withAndroidFontScaleConfigChange), otherwise the Activity is recreated
 * instead of just firing the event.
 */
export const useFontScale = () => {
  const { fontScale } = useWindowDimensions();
  return fontScale;
};
