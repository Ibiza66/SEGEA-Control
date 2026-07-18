import { useState } from "react";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { addTask } from "../src/utils/tasksStorage";
export default function AddTaskScreen() {
  const [taskType, setTaskType] = useState("Cambio de aceite");
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Media");
  const [notes, setNotes] = useState("");

  async function saveTask() {
  if (!vehicle.trim()) {
    Alert.alert("Error", "Ingrese el vehículo.");
    return;
  }

  if (!date.trim()) {
    Alert.alert("Error", "Ingrese la fecha.");
    return;
  }

  await addTask({
    id: Date.now().toString(),
    taskType,
    vehicle,
    date,
    priority,
    notes,
  });

  Alert.alert("Éxito", "Tarea creada correctamente.", [
    {
      text: "Aceptar",
      onPress: () => router.back(),
    },
  ]);
}

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.title}>Nueva tarea</Text>

      <Text style={styles.label}>Tipo de tarea</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={taskType}
          onValueChange={(itemValue) => setTaskType(itemValue)}
        >
          <Picker.Item label="Cambio de aceite" value="Cambio de aceite" />
          <Picker.Item label="Revisión técnica" value="Revisión técnica" />
          <Picker.Item label="Inspección" value="Inspección" />
          <Picker.Item label="Mantención" value="Mantención" />
          <Picker.Item label="Cambio de neumáticos" value="Cambio de neumáticos" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>

      <Text style={styles.label}>Vehículo</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Camión 01"
        value={vehicle}
        onChangeText={setVehicle}
      />

      <Text style={styles.label}>Fecha de vencimiento</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: 25/07/2026"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Prioridad</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
        >
          <Picker.Item label="Alta" value="Alta" />
          <Picker.Item label="Media" value="Media" />
          <Picker.Item label="Baja" value="Baja" />
        </Picker>
      </View>

      <Text style={styles.label}>Observaciones</Text>

      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Escriba observaciones..."
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <Pressable style={styles.button} onPress={saveTask}>
        <Text style={styles.buttonText}>Guardar tarea</Text>
      </Pressable>
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
    color: "#1E293B",
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  pickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },

  button: {
    marginTop: 30,
    backgroundColor: "#005A9C",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
});