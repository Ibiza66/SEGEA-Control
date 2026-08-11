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
export default function DashboardCard({
  title,
  description,
  icon,
  iconColor,
  iconBackground,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: Theme.colors.primaryLight }}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.left}>
        <View
  style={[
    styles.iconContainer,
    { backgroundColor: iconBackground },
  ]}
>
          <Ionicons
  name={icon}
  size={Theme.iconSize.lg}
  color={iconColor}
/>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.description}>
            {description}
          </Text>
        </View>
      </View>

      <Ionicons
  name="chevron-forward"
  size={Theme.iconSize.md}
  color={Theme.colors.primary}
/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 88,

    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,

   paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: Theme.spacing.md,

    ...Theme.shadows.md,
  },

  cardPressed: {
    transform: [{ scale: 0.985 }],
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
  

    justifyContent: "center",
    alignItems: "center",

    marginRight: Theme.spacing.md,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: Theme.typography.cardTitle,
    fontWeight: "700",
    color: Theme.colors.text,
},

 description: {
    marginTop: Theme.spacing.xs,
    fontSize: Theme.typography.caption,
    color: Theme.colors.textSecondary,

    lineHeight: 20,
},
});