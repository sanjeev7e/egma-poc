import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import { useTheme } from "../hooks/useTheme";

export default function HomeScreen() {
  const appVariant = process.env.EXPO_PUBLIC_APP_VARIANT || "not set";
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || "not set";
  const { fonts, fontScale } = useTheme();

  return (
    <ScrollView style={styles.container}>
      <Header title="Adaptive Font POC" />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text
            allowFontScaling={false}
            style={[styles.label, { fontSize: fonts.sizes.medium }]}
          >
            Live system font scale
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.scaleValue, { fontSize: fonts.sizes.xlarge }]}
          >
            {fontScale.toFixed(2)}x
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.hint, { fontSize: fonts.sizes.small }]}
          >
            Change the system text size in Settings (iOS: Settings →
            Accessibility → Display & Text Size → Larger Text. Android: Settings
            → Display → Font size) while this screen stays open. This value and
            the samples below should update on their own — no reload or app
            restart required.
          </Text>
        </View>

        <View style={styles.card}>
          <Text
            allowFontScaling={false}
            style={[styles.label, { fontSize: fonts.sizes.medium }]}
          >
            Scaled samples
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.sample, { fontSize: fonts.sizes.small }]}
          >
            small ({fonts.sizes.small.toFixed(1)}px)
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.sample, { fontSize: fonts.sizes.medium }]}
          >
            medium ({fonts.sizes.medium.toFixed(1)}px)
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.sample, { fontSize: fonts.sizes.large }]}
          >
            large ({fonts.sizes.large.toFixed(1)}px)
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.sample, { fontSize: fonts.sizes.xlarge }]}
          >
            xlarge ({fonts.sizes.xlarge.toFixed(1)}px)
          </Text>
        </View>

        <View style={styles.card}>
          <Button title="Sample button" onPress={() => {}} />
        </View>

        <View style={styles.envContainer}>
          <Text
            allowFontScaling={false}
            style={[styles.label, { fontSize: fonts.sizes.medium }]}
          >
            Environment Variables:
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.envText, { fontSize: fonts.sizes.small }]}
          >
            EXPO_PUBLIC_APP_VARIANT: {appVariant}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.envText, { fontSize: fonts.sizes.small }]}
          >
            EXPO_PUBLIC_API_URL: {apiUrl}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
  scaleValue: {
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  hint: {
    color: "#666",
    lineHeight: 18,
  },
  sample: {
    marginBottom: 6,
  },
  envContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
  },
  envText: {
    marginBottom: 8,
    fontFamily: "monospace",
  },
});
