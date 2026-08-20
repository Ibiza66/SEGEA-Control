import { router, useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, Text, View ,ScrollView } from "react-native";

import PrimaryButton from "../../../src/components/ui/PrimaryButton";
import GradientBackground from "../../../src/components/layout/GradientBackground";
import { vehicles } from "../../../src/data/vehicles";
import {
  deleteInspection,
  getInspectionById,
} from "../../../src/services/inspection.service";

export default function InspectionDetailScreen() {
  const { id } = useLocalSearchParams();

  const inspection = getInspectionById(id as string);
 const vehicle = vehicles.find(
  (v) => v.id === inspection?.vehicleId
);
  if (!inspection) {
    return (
      <View style={styles.center}>
        <Text>Inspección no encontrada.</Text>
      </View>
    );
  }

  const eliminarConfirmado = async () => {
    await deleteInspection(inspection.id);
    router.replace("/inspections" as any);
  };

  const eliminar = () => {
    Alert.alert(
      "Eliminar inspección",
      "¿Estás seguro de eliminar esta inspección?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: eliminarConfirmado,
        },
      ]
    );
  };

 return (
  <GradientBackground>
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
  >
      <Text style={styles.title}>Detalle de Inspección</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Inspector</Text>
        <Text style={styles.value}>
          {inspection.inspector}
        </Text>

        <Text style={styles.label}>Vehículo</Text>

<Text style={styles.value}>
  {vehicle
    ? `${vehicle.marca} ${vehicle.modelo}`
    : "Vehículo no encontrado"}
</Text>

<Text style={styles.value}>
  Patente: {vehicle?.patente}
</Text>

        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>
          {inspection.fecha}
        </Text>

        <Text style={styles.label}>Estado</Text>
        <Text style={styles.value}>
          {inspection.estado}
        </Text>

        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.value}>
          {inspection.observaciones}
        </Text>
      </View>

      <PrimaryButton
        title="Editar"
        onPress={() =>
          router.push({
            pathname: "/inspections/edit" as any,
            params: { id: inspection.id },
          })
        }
      />

      <View style={{ height: 12 }} />

      <PrimaryButton
        title="Eliminar"
        onPress={eliminar}
      />
       </ScrollView>
  </GradientBackground>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
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
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
  },

  label: {
    fontWeight: "bold",
    marginTop: 10,
  },

  value: {
    color: "#555",
    marginTop: 3,
  },
  content: {
  paddingBottom: 40,
},
});