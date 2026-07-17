import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  inspector: string;
  fecha: string;
  estado: string;
  onPress: () => void;
};

export default function InspectionCard({
  inspector,
  fecha,
  estado,
  onPress,
}: Props) {
  const getColor = () => {
    switch (estado) {
      case "Aprobada":
        return "#2E7D32";
      case "Pendiente":
        return "#F9A825";
      case "Rechazada":
        return "#C62828";
      default:
        return "#666";
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="clipboard"
          size={28}
          color="#005A9C"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{inspector}</Text>

        <Text style={styles.subtitle}>
          {fecha}
        </Text>

        <Text
          style={[
            styles.status,
            { color: getColor() },
          ]}
        >
          {estado}
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
    backgroundColor: "#fff",
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

  status: {
    marginTop: 6,
    fontWeight: "600",
  },
});