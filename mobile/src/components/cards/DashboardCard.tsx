import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function DashboardCard({ title, icon, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: "#E3F2FD",
        borderless: false,
      }}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={34} color="#005A9C" />
      </View>

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47%",
    height: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },

  iconContainer: {
    marginBottom: 15,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});
