import dotenv from "dotenv";
import withAndroidFontScaleConfigChange from "./plugins/withAndroidFontScaleConfigChange";

dotenv.config();

// Permission constants
const PERMISSIONS = {
  notifications:
    "We use notifications to keep you updated about important alerts.",
};

function getBundleIdentifier() {
  const appVariant = process.env.EXPO_PUBLIC_APP_VARIANT;
  const baseBundleId = "com.egmapoc.app";
  if (appVariant === "prod") return baseBundleId;
  if (appVariant === "preprod") return `${baseBundleId}.preprod`;
  if (appVariant === "qa") return `${baseBundleId}.qa`;
  return `${baseBundleId}.develop`;
}

function getAndroidPackage() {
  const bundleId = getBundleIdentifier();
  // Bundle ID is validated during project creation, so we can use it directly
  return bundleId;
}

function getIconPath(prefix: string) {
  const appVariant = process.env.EXPO_PUBLIC_APP_VARIANT;
  if (appVariant === "prod") return `./src/assets/icons/${prefix}-prod.png`;
  if (appVariant === "preprod")
    return `./src/assets/icons/${prefix}-preprod.png`;
  if (appVariant === "qa") return `./src/assets/icons/${prefix}-qa.png`;
  return `./src/assets/icons/${prefix}-develop.png`;
}

function getSplashPath() {
  // Use the same icon image for splash screen
  return getAppIcon();
}

function getAppIcon() {
  return getIconPath("icon");
}

function getAdaptiveIcon() {
  return getIconPath("adaptive-icon");
}

export default {
  name: "egma-poc",
  slug: "egma-poc",
  version: "1.0.0",
  orientation: "portrait",
  icon: getAppIcon(),
  splash: {
    image: getSplashPath(),
    resizeMode: "cover",
    backgroundColor: "#000000",
  },
  scheme: getBundleIdentifier(),
  userInterfaceStyle: "automatic",
  experiments: {
    reactCompiler: true,
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: getBundleIdentifier(),
    icon: getAppIcon(),
    infoPlist: {
      NSUserNotificationUsageDescription: PERMISSIONS.notifications,
    },
  },
  android: {
    package: getAndroidPackage(),
    edgeToEdgeEnabled: true,
    icon: getAppIcon(),
    adaptiveIcon: {
      foregroundImage: getAdaptiveIcon(),
      backgroundColor: "#ffffff",
    },
  },
  plugins: [
    [
      "expo-font",
      {
        android: {
          fonts: [
            {
              fontFamily: "RobotoFixed",
              fontDefinitions: [
                { path: "./src/assets/fonts/Roboto-Regular.ttf", weight: 400 },
                { path: "./src/assets/fonts/Roboto-Bold.ttf", weight: 700 },
              ],
            },
            {
              fontFamily: "RobotoMonoFixed",
              fontDefinitions: [
                {
                  path: "./src/assets/fonts/RobotoMono-Regular.ttf",
                  weight: 400,
                },
              ],
            },
          ],
        },
      },
    ],
    [
      "expo-notifications",
      {
        icon: getAppIcon(),
        color: "#ffffff",
        defaultChannel: "default",
        enableBackgroundRemoteNotifications: false,
      },
    ],
    withAndroidFontScaleConfigChange,
  ],
};
