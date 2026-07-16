import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  deleteVehicle,
  getVehicleById,
} from "../../src/services/vehicle.service";

export default function VehicleDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const vehicle = getVehicleById(id);
  const estadoColor =
    vehicle?.estado === "Activo"
      ? "#16A34A"
      : vehicle?.estado === "Mantenimiento"
        ? "#F59E0B"
        : "#DC2626";
  const eliminarVehiculo = () => {
    Alert.alert(
      "Eliminar vehículo",
      `¿Desea eliminar el vehículo ${vehicle?.patente}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            if (vehicle) {
              await deleteVehicle(vehicle.id);

              Alert.alert("Éxito", "Vehículo eliminado correctamente", [
                {
                  text: "OK",
                  onPress: () => router.replace("/vehicles"),
                },
              ]);
            }
          },
        },
      ],
    );
  };
  if (!vehicle) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Vehículo no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        {vehicle.foto ? (
          <Image source={{ uri: vehicle.foto }} style={styles.headerImage} />
        ) : (
          <Ionicons name="car-sport" size={70} color="#005A9C" />
        )}

        <Text style={styles.title}>
          {vehicle.marca} {vehicle.modelo}
        </Text>

        <Text style={styles.plate}>{vehicle.patente}</Text>

        <View style={[styles.badge, { backgroundColor: estadoColor }]}>
          <Text style={styles.badgeText}>{vehicle.estado}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Información del vehículo</Text>

      <View style={styles.infoCard}>
        <Item icon="calendar" label="Año" value={vehicle.anio.toString()} />
        <Item icon="color-palette" label="Color" value={vehicle.color} />
        <Item
          icon="speedometer"
          label="Kilometraje"
          value={`${vehicle.kilometraje.toLocaleString("es-CL")} km`}
        />
        <Item
          icon="construct"
          label="Mantención"
          value={vehicle.mantencion.toLocaleDateString("es-CL")}
        />
        <Item
          icon="document-text"
          label="Revisión Técnica"
          value={vehicle.revisionTecnica.toLocaleDateString("es-CL")}
        />
      </View>

      <Text style={styles.sectionTitle}>Observaciones</Text>

      <View style={styles.infoCard}>
        <Text style={styles.observation}>
          {vehicle.observaciones || "Sin observaciones."}
        </Text>
      </View>

      <Pressable
        style={[styles.button, styles.editButton]}
        onPress={() =>
          router.push({
            pathname: "/vehicles/edit",
            params: {
              id: vehicle.id,
            },
          })
        }
      >
        <Ionicons name="create-outline" size={22} color="white" />
        <Text style={styles.buttonText}>Editar vehículo</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.deleteButton]}
        onPress={eliminarVehiculo}
      >
        <Ionicons name="trash-outline" size={22} color="white" />
        <Text style={styles.buttonText}>Eliminar vehículo</Text>
      </Pressable>
    </ScrollView>
  );
}

type ItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function Item({ icon, label, value }: ItemProps) {
  return (
    <View style={styles.item}>
      <Ionicons name={icon} size={22} color="#005A9C" />

      <View style={{ marginLeft: 15 }}>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  headerCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 25,
    elevation: 3,
  },

  title: {
    marginTop: 15,
    fontSize: 28,
    fontWeight: "700",
  },

  plate: {
    marginTop: 6,
    fontSize: 18,
    color: "#555",
  },

  badge: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
  },

  badgeText: {
    color: "white",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  itemLabel: {
    fontSize: 14,
    color: "#777",
  },

  itemValue: {
    fontSize: 17,
    fontWeight: "600",
  },

  observation: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
  },

  editButton: {
    backgroundColor: "#005A9C",
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    marginBottom: 80,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 17,
    marginLeft: 10,
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 15,
    resizeMode: "cover",
  },
});
