import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { VehicleStatus } from "../../types/Vehicle";
import { Theme } from "@/src/theme/theme";

type Props = {
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  kilometraje: number;
  estado: VehicleStatus;
  foto?: string;
  onPress: () => void;
};

export default function VehicleCard({
  patente,
  marca,
  modelo,
  anio,
  kilometraje,
  estado,
  foto,
  onPress,
}: Props) {
  const estadoColor =
  estado === "Activo"
    ? Theme.colors.success
    : estado === "Mantenimiento"
    ? Theme.colors.warning
    : Theme.colors.danger;

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
            color={Theme.colors.primary}
            style={styles.icon}
          />
        )}

        <View style={styles.info}>
          <Text style={styles.patente}>{patente}</Text>

          <Text style={styles.modelo}>
            {marca} {modelo}
          </Text>

          <Text style={styles.anio}>
  Año {anio} • {kilometraje.toLocaleString()} km
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
    backgroundColor: Theme.colors.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    ...Theme.shadows.md,
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
    fontSize: Theme.typography.cardTitle,
    fontWeight: "700",
    color: Theme.colors.text,
  },

  modelo: {
    marginTop: 4,
    fontSize: Theme.typography.body,
    color: Theme.colors.textSecondary,
  },

  anio: {
    marginTop: 3,
    fontSize: Theme.typography.bodySmall,
    color: Theme.colors.textSecondary,
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
    fontSize: Theme.typography.overline
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
    resizeMode: "cover",
  },
});
