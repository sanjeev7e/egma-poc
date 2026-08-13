import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function Input({
  placeholder,
  value,
  onChangeText,
}: InputProps) {
  const { fonts } = useTheme();

  return (
    <TextInput
      allowFontScaling={false}
      style={[
        styles.input,
        { fontSize: fonts.sizes.medium, fontFamily: fonts.regular },
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
});
