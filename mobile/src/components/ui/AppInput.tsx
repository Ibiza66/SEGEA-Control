import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

import { Colors } from "../../theme/colors";

type AppInputProps = TextInputProps & {
  label: string;
  showPasswordToggle?: boolean;
  passwordVisible?: boolean;
  onTogglePassword?: () => void;
};

const AppInput = forwardRef<TextInput, AppInputProps>(
  (
    {
      label,
      showPasswordToggle = false,
      passwordVisible = false,
      onTogglePassword,
      ...props
    },
    ref,
  ) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor="#999"
            {...props}
          />

          {showPasswordToggle && (
            <Pressable onPress={onTogglePassword}>
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={22}
                color="#777"
              />
            </Pressable>
          )}
        </View>
      </View>
    );
  },
);

AppInput.displayName = "AppInput";

export default AppInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    marginBottom: 8,
    color: Colors.text,
    fontWeight: "600",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
});
