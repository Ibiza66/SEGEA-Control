import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  vehicle: string;
  plate: string;
  inspector: string;
  fecha: string;
  estado: string;
  onPress: () => void;
};

export default function InspectionCard({
  vehicle,
  plate,
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
  name="car-sport"
  size={30}
  color="#0F5FA8"
/>
      </View>

      <View style={styles.info}>
  <Text style={styles.title}>
    {vehicle}
  </Text>

  <Text style={styles.plate}>
    {plate}
  </Text>

  <Text style={styles.inspector}>
    Inspector: {inspector}
  </Text>

  <Text style={styles.subtitle}>
    {new Date(fecha).toLocaleDateString("es-CL")}
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
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  padding: 18,
  marginBottom: 16,
  elevation: 4,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 3,
  },
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
  fontSize: 20,
  fontWeight: "700",
  color: "#1F2937",
},

  subtitle: {
  fontSize: 13,
  color: "#9CA3AF",
  marginTop: 4,
},

  status: {
  marginTop: 8,
  fontWeight: "700",
  fontSize: 15,
},
  plate: {
  fontSize: 15,
  color: "#6B7280",
  fontWeight: "600",
  marginTop: 2,
},
inspector: {
  fontSize: 14,
  color: "#6B7280",
  marginTop: 6,
},
});