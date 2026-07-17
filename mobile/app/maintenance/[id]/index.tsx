import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import PrimaryButton from "../../../src/components/ui/PrimaryButton";

import {
  deleteMaintenance,
  getMaintenanceById,
} from "../../../src/services/maintenance.service";

export default function MaintenanceDetailScreen() {
  const { id } = useLocalSearchParams();

  const maintenance = getMaintenanceById(id as string);

  if (!maintenance) {
    return (
      <View style={styles.center}>
        <Text>Mantenimiento no encontrado.</Text>
      </View>
    );
  }

  const eliminar = () => {
    Alert.alert(
      "Eliminar mantenimiento",
      "¿Deseas eliminar este mantenimiento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarConfirmado(),
        },
      ]
    );
  };

  const eliminarConfirmado = async () => {
    await deleteMaintenance(maintenance.id);
    router.replace("/maintenance" as any);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{maintenance.tipo}</Text>

      <Text style={styles.label}>Vehículo</Text>
      <Text>{maintenance.vehicleId}</Text>

      <Text style={styles.label}>Fecha</Text>
      <Text>{maintenance.fecha}</Text>

      <Text style={styles.label}>Kilometraje</Text>
      <Text>{maintenance.kilometraje} km</Text>

      <Text style={styles.label}>Costo</Text>
      <Text>${maintenance.costo}</Text>

      <Text style={styles.label}>Descripción</Text>
      <Text>{maintenance.descripcion}</Text>

      <PrimaryButton
        title="Editar"
        onPress={() =>
          router.push({
            pathname: "/maintenance/edit" as any,
            params: { id: maintenance.id },
          })
        }
      />

      <View style={{ height: 12 }} />

      <PrimaryButton
        title="Eliminar"
        onPress={eliminar}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },

  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
});