import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { vehicleChecklist } from "../../../src/checklists/vehicleChecklist";
import Checklist from "../../../src/components/inspection/Checklist";
import PrimaryButton from "../../../src/components/ui/PrimaryButton";

import { getVehicleById } from "../../../src/services/vehicle.service";
import { addVehicleInspection } from "../../../src/services/vehicleInspection.service";

export default function CreateVehicleInspectionScreen() {
  const { vehicleId } = useLocalSearchParams<{
    vehicleId: string;
  }>();

  const vehicle = getVehicleById(vehicleId);

  const [items, setItems] = useState(
    vehicle
      ? vehicleChecklist.map((descripcion, index) => ({
          id: index.toString(),
          descripcion,
          realizado: false,
        }))
      : []
  );

  const [observaciones, setObservaciones] = useState("");

  if (!vehicle) {
    return <Text>Vehículo no encontrado</Text>;
  }

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, realizado: !item.realizado }
          : item
      )
    );
  };

  const guardarInspeccion = async () => {
    await addVehicleInspection({
      id: Date.now().toString(),
      vehicleId: vehicle.id,
      inspector: "Constanza",
      fecha: new Date().toLocaleDateString("es-CL"),
      estado: "Pendiente",
      checklist: items,
      observaciones,
      fotos: [],
    });

    Alert.alert(
      "Éxito",
      "La inspección fue guardada correctamente.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={styles.title}>Nueva inspección</Text>

      <Text style={styles.name}>
        {vehicle.marca} {vehicle.modelo}
      </Text>

      <Text style={styles.category}>
        Patente: {vehicle.patente}
      </Text>

      <Checklist
        items={items}
        onToggle={toggleItem}
      />

      <Text style={styles.label}>
        Observaciones
      </Text>

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        value={observaciones}
        onChangeText={setObservaciones}
        placeholder="Escriba observaciones..."
      />

      <PrimaryButton
        title="Guardar inspección"
        onPress={guardarInspeccion}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 8,
  },

  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#005A9C",
    marginBottom: 5,
  },

  category: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 25,
  },
});