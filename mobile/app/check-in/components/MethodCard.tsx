import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Theme } from "@/src/theme/theme";

type Props = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackground: string;
  onPress: () => void;
};

export default function MethodCard({
  title,
  description,
  icon,
  iconColor,
  iconBackground,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      android_ripple={{ color: Theme.colors.primaryLight }}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: iconBackground },
        ]}
      >
        <Ionicons
          name={icon}
          size={28}
          color={iconColor}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.description}>
          {description}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={24}
        color={Theme.colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    ...Theme.shadows.md,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Theme.spacing.md,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: Theme.typography.cardTitle,
    fontWeight: "700",
    color: Theme.colors.text,
  },

  description: {
    marginTop: Theme.spacing.xs,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textSecondary,
  },
});