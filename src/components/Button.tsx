import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress }: ButtonProps) {
  const { fonts } = useTheme();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text
        allowFontScaling={false}
        style={[styles.text, { fontSize: fonts.sizes.medium }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
