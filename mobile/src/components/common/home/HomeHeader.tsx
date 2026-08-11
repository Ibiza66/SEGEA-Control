import { Image, StyleSheet, Text, View } from "react-native";
import { Theme } from "@/src/theme/theme";

type Props = {
  greeting: string;
  name: string;
  position: string;
  today: string;
};

export default function HomeHeader({
  greeting,
  name,
  position,
  today,
}: Props) {
  return (
    <View>
      <Image
        source={require("@/assets/logo/logo-segea.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.welcome}>
        {greeting}, {name} 👋
      </Text>

      <Text style={styles.subtitle}>
        {position || "Administrador"}
      </Text>

      <Text style={styles.date}>
        {today}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 40,
    alignSelf: "center",
    marginBottom: Theme.spacing.sm,
  },

  welcome: {
    fontSize: Theme.typography.screenTitle,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },

  subtitle: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },

  date: {
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.lg,
    textTransform: "capitalize",
  },
});