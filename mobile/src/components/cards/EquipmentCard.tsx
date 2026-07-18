import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { EquipmentStatus } from "../../types/Equipment";

type Props = {
  codigo: string;
  nombre: string;
  marca: string;
  modelo: string;
  estado: EquipmentStatus;
  foto?: string;
  onPress: () => void;
};

export default function EquipmentCard({
  codigo,
  nombre,
  marca,
  modelo,
  estado,
  foto,
  onPress,
}: Props) {
  const estadoColor =
    estado === "Operativo"
      ? "#16A34A"
      : estado === "En mantenimiento"
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
            name="construct"
            size={34}
            color="#005A9C"
            style={styles.icon}
          />
        )}

        <View style={styles.info}>
          <Text style={styles.codigo}>{codigo}</Text>

          <Text style={styles.nombre}>{nombre}</Text>

          <Text style={styles.modelo}>
            {marca} {modelo}
          </Text>
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

  codigo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  nombre: {
    marginTop: 4,
    fontSize: 16,
    color: "#444",
  },

  modelo: {
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