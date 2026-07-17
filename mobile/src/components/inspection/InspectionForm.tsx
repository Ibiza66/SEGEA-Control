import { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";

import AppInput from "../ui/AppInput";
import AppSelect from "../ui/AppSelect";
import PrimaryButton from "../ui/PrimaryButton";

import {
  Inspection,
  InspectionStatus,
} from "../../types/Inspection";

import {
  addInspection,
  updateInspection,
} from "../../services/inspection.service";

type Props = {
  mode: "create" | "edit";
  inspection?: Inspection;
};

const estados = [
  { label: "Pendiente", value: "Pendiente" },
  { label: "Aprobada", value: "Aprobada" },
  { label: "Rechazada", value: "Rechazada" },
];

export default function InspectionForm({
  mode,
  inspection,
}: Props) {
  const [vehicleId, setVehicleId] = useState(
    inspection?.vehicleId ?? ""
  );

  const [inspector, setInspector] = useState(
    inspection?.inspector ?? ""
  );

  const [fecha, setFecha] = useState(
    inspection?.fecha ?? ""
  );

  const [estado, setEstado] =
    useState<InspectionStatus>(
      inspection?.estado ?? "Pendiente"
    );

  const [observaciones, setObservaciones] =
    useState(inspection?.observaciones ?? "");

  const guardar = async () => {
    if (
      !vehicleId ||
      !inspector ||
      !fecha ||
      !observaciones
    ) {
      Alert.alert(
        "Error",
        "Completa todos los campos."
      );
      return;
    }

    const nuevaInspection: Inspection = {
      id: inspection?.id ?? Date.now().toString(),
      vehicleId,
      inspector,
      fecha,
      estado,
      observaciones,
    };

    if (mode === "create") {
      await addInspection(nuevaInspection);
    } else {
      await updateInspection(nuevaInspection);
    }

    router.replace("/inspections" as any);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppInput
        label="ID Vehículo"
        value={vehicleId}
        onChangeText={setVehicleId}
      />

      <AppInput
        label="Inspector"
        value={inspector}
        onChangeText={setInspector}
      />

      <AppInput
        label="Fecha"
        value={fecha}
        onChangeText={setFecha}
      />

      <AppSelect
        label="Estado"
        items={estados}
        value={estado}
        onValueChange={(value) =>
          setEstado(value as InspectionStatus)
        }
      />

      <AppInput
        label="Observaciones"
        value={observaciones}
        onChangeText={setObservaciones}
      />

      <PrimaryButton
        title={
          mode === "create"
            ? "Guardar inspección"
            : "Actualizar inspección"
        }
        onPress={guardar}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
});