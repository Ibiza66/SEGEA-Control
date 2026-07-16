import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { VehicleStatus } from "../../types/Vehicle";

type Props = {
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  estado: VehicleStatus;
  foto?: string;
  onPress: () => void;
};

export default function VehicleCard({
  patente,
  marca,
  modelo,
  anio,
  estado,
  foto,
  onPress,
}: Props) {
  const estadoColor =
    estado === "Activo"
      ? "#16A34A"
      : estado === "Mantenimiento"
        ? "#F59E0B"
        : "#DC2626";

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      android_ripple={{ color: "#E3F2FD" }}
    >
      <View style={styles.left}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.image} />
        ) : (
          <Ionicons
            name="car-sport"
            size={34}
            color="#005A9C"
            style={styles.icon}
          />
        )}

        <View style={styles.info}>
          <Text style={styles.patente}>{patente}</Text>

          <Text style={styles.modelo}>
            {marca} {modelo}
          </Text>

          <Text style={styles.anio}>{anio}</Text>
        </View>
      </View>

      <View style={[styles.badge, { backgroundColor: estadoColor }]}>
        <Text style={styles.badgeText}>{estado}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 16,
  },

  info: {
    flex: 1,
  },

  patente: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  modelo: {
    marginTop: 4,
    fontSize: 16,
    color: "#444",
  },

  anio: {
    marginTop: 3,
    fontSize: 15,
    color: "#777",
  },

  badge: {
    marginLeft: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 90,
    alignItems: "center",
  },

  badgeText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
    resizeMode: "cover",
  },
});
