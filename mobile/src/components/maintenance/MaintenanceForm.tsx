import { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";

import AppInput from "../ui/AppInput";
import AppSelect from "../ui/AppSelect";
import PrimaryButton from "../ui/PrimaryButton";

import { Maintenance, MaintenanceType } from "../../types/Maintenance";
import {
  addMaintenance,
  updateMaintenance,
} from "../../services/maintenance.service";

type Props = {
  mode: "create" | "edit";
  maintenance?: Maintenance;
};

const tipos = [
  { label: "Preventivo", value: "Preventivo" },
  { label: "Correctivo", value: "Correctivo" },
];

export default function MaintenanceForm({
  mode,
  maintenance,
}: Props) {
  const [vehicleId, setVehicleId] = useState(
    maintenance?.vehicleId ?? ""
  );

  const [tipo, setTipo] = useState<MaintenanceType>(
    maintenance?.tipo ?? "Preventivo"
  );

  const [fecha, setFecha] = useState(
    maintenance?.fecha ?? ""
  );

  const [kilometraje, setKilometraje] = useState(
    maintenance?.kilometraje ?? ""
  );

  const [costo, setCosto] = useState(
    maintenance?.costo ?? ""
  );

  const [descripcion, setDescripcion] = useState(
    maintenance?.descripcion ?? ""
  );

  const guardar = async () => {
    if (
      !vehicleId ||
      !fecha ||
      !kilometraje ||
      !costo ||
      !descripcion
    ) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }

    const nuevo: Maintenance = {
      id: maintenance?.id ?? Date.now().toString(),
      vehicleId,
      tipo,
      fecha,
      kilometraje,
      costo,
      descripcion,
    };

    if (mode === "create") {
      await addMaintenance(nuevo);
    } else {
      await updateMaintenance(nuevo);
    }

    router.replace("/maintenance" as any);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppInput
        label="ID Vehículo"
        value={vehicleId}
        onChangeText={setVehicleId}
      />

      <AppSelect
        label="Tipo"
        items={tipos}
        value={tipo}
        onValueChange={(value) =>
          setTipo(value as MaintenanceType)
        }
      />

      <AppInput
        label="Fecha"
        value={fecha}
        onChangeText={setFecha}
      />

      <AppInput
        label="Kilometraje"
        value={kilometraje}
        onChangeText={setKilometraje}
        keyboardType="numeric"
      />

      <AppInput
        label="Costo"
        value={costo}
        onChangeText={setCosto}
        keyboardType="numeric"
      />

      <AppInput
        label="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <PrimaryButton
        title={
          mode === "create"
            ? "Guardar mantenimiento"
            : "Actualizar mantenimiento"
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