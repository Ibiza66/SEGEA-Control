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
import { addTask } from "../src/services/task.service";

export default function AddTaskScreen() {
  const [titulo, setTitulo] = useState("");
const [descripcion, setDescripcion] = useState("");
const [asignadoA, setAsignadoA] = useState("");
const [fechaLimite, setFechaLimite] = useState("");
const [prioridad, setPrioridad] = useState<"alta" | "media" | "baja">("media");
  async function saveTask() {
  if (!titulo.trim()) {
  Alert.alert("Error", "Ingrese un título.");
  return;
}

if (!asignadoA.trim()) {
  Alert.alert("Error", "Ingrese el responsable.");
  return;
}

if (!fechaLimite.trim()) {
  Alert.alert("Error", "Ingrese la fecha límite.");
  return;
}

  await addTask({
  id: Date.now().toString(),
  titulo,
  descripcion,
  asignadoA,
  fechaCreacion: new Date(),
  fechaLimite: new Date(fechaLimite),
  prioridad,
  estado: "pendiente",
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

      

      <Text style={styles.label}>Título</Text>

<TextInput
  style={styles.input}
  placeholder="Ej: Cambio de aceite"
  value={titulo}
  onChangeText={setTitulo}
/>
<Text style={styles.label}>Descripción</Text>

<TextInput
  style={[styles.input, { height: 120 }]}
  multiline
  value={descripcion}
  onChangeText={setDescripcion}
/>
<Text style={styles.label}>Asignado a</Text>

<TextInput
  style={styles.input}
  placeholder="Ej: Pedro González"
  value={asignadoA}
  onChangeText={setAsignadoA}
/>

      <Text style={styles.label}>Fecha de vencimiento</Text>

      <TextInput
  style={styles.input}
  placeholder="2026-07-25"
  value={fechaLimite}
  onChangeText={setFechaLimite}
/>

      <Text style={styles.label}>Prioridad</Text>

      <View style={styles.pickerContainer}>
        <Picker
selectedValue={prioridad}
onValueChange={(itemValue) => setPrioridad(itemValue)}        >
          <Picker.Item label="Alta" value="alta" />
<Picker.Item label="Media" value="media" />
<Picker.Item label="Baja" value="baja" />
        </Picker>
      </View>

      

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