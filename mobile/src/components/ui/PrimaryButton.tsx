import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../theme/colors";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
