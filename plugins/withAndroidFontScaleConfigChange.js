const { AndroidConfig, withAndroidManifest } = require("expo/config-plugins");

// Without this, Android recreates the Activity when the system font size
// changes (fontScale isn't in configChanges by default), which wipes JS
// state and looks like an app restart. Declaring it here lets RN's
// Dimensions 'change' event fire instead, so useFontScale updates live.
const FONT_SCALE_CONFIG_CHANGE = "fontScale";

const withAndroidFontScaleConfigChange = (config) => {
  return withAndroidManifest(config, (config) => {
    const mainActivity = AndroidConfig.Manifest.getMainActivityOrThrow(
      config.modResults,
    );
    const attributes = mainActivity.$;
    const existing = attributes["android:configChanges"] ?? "";
    const values = existing
      .split("|")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!values.includes(FONT_SCALE_CONFIG_CHANGE)) {
      values.push(FONT_SCALE_CONFIG_CHANGE);
    }

    attributes["android:configChanges"] = values.join("|");
    return config;
  });
};

module.exports = withAndroidFontScaleConfigChange;
