import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { fonts } = useTheme();

  return (
    <View style={styles.header}>
      <Text
        allowFontScaling={false}
        style={[
          styles.title,
          { fontSize: fonts.sizes.large, fontFamily: fonts.bold },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontWeight: "bold",
  },
});
