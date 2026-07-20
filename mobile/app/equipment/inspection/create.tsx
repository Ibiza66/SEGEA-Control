import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { getChecklistByCategory } from "../../../src/checklists";
import Checklist from "../../../src/components/inspection/Checklist";
import PrimaryButton from "../../../src/components/ui/PrimaryButton";
import { getEquipmentById } from "../../../src/services/equipment.service";
import { addEquipmentInspection } from "../../../src/services/equipmentInspection.service";

export default function CreateInspectionScreen() {
  const { equipmentId } = useLocalSearchParams<{
    equipmentId: string;
  }>();

  const equipment = getEquipmentById(equipmentId);

  const [items, setItems] = useState(
    equipment
      ? getChecklistByCategory(equipment.categoria).map(
          (descripcion, index) => ({
            id: index.toString(),
            descripcion,
            realizado: false,
          })
        )
      : []
  );

  const [observaciones, setObservaciones] = useState("");

  if (!equipment) {
    return <Text>Equipo no encontrado</Text>;
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
    await addEquipmentInspection({
      id: Date.now().toString(),
      equipmentId: equipment.id,
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nueva inspección</Text>

      <Text style={styles.name}>{equipment.nombre}</Text>

      <Text style={styles.category}>
        Categoría: {equipment.categoria}
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