import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Theme } from "@/src/theme/theme";

export default function PrimaryActionCard() {
  return (
    <Pressable
  style={styles.container}
  onPress={async () => {
    await Haptics.selectionAsync();

    router.push("/check-in");
  }}
>
      <View style={styles.iconContainer}>
        <Ionicons
          name="scan-circle"
          size={34}
          color={Theme.colors.primary}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Realizar check-in
        </Text>

        <Text style={styles.description}>
          Autoriza la salida de un vehículo o equipo a terreno.
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={26}
        color={Theme.colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.surface,

    borderRadius: Theme.radius.lg,

    paddingVertical: Theme.spacing.md,
paddingHorizontal: Theme.spacing.lg,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: Theme.spacing.lg,

    ...Theme.shadows.md,
  },

  iconContainer: {
    width: 56,
height: 56,
borderRadius: 28,
    backgroundColor: Theme.colors.primaryLight,

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

    marginBottom: Theme.spacing.xs,
  },

  description: {
    fontSize: Theme.typography.bodySmall,

    color: Theme.colors.textSecondary,

    lineHeight: 20,
  },
});