import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  tipo: string;
  fecha: string;
  descripcion: string;
  onPress: () => void;
};

export default function MaintenanceCard({
  tipo,
  fecha,
  descripcion,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name="build" size={28} color="#005A9C" />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{tipo}</Text>
        <Text style={styles.subtitle}>{fecha}</Text>
        <Text style={styles.description}>
          {descripcion}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#999"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  iconContainer: {
    width: 50,
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginTop: 2,
  },

  description: {
    marginTop: 6,
    color: "#444",
  },
});