import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { Theme } from "@/src/theme/theme";

type Props = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({
  value,
  placeholder,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={22}
        color={Theme.colors.textSecondary}
      />

      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.textSecondary}
        onChangeText={onChangeText}
        autoCapitalize="characters"
        autoCorrect={false}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Theme.colors.surface,

    borderRadius: Theme.radius.lg,

    paddingHorizontal: Theme.spacing.lg,

    height: 58,

    ...Theme.shadows.sm,
  },

  input: {
    flex: 1,

    marginLeft: Theme.spacing.sm,

    fontSize: Theme.typography.body,

    color: Theme.colors.text,
  },
});