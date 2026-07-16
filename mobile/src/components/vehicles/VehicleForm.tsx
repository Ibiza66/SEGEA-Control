import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import { router } from "expo-router";
import AppInput from "../ui/AppInput";
import PrimaryButton from "../ui/PrimaryButton";

import { addVehicle, updateVehicle } from "../../services/vehicle.service";
import { Vehicle, VehicleStatus } from "../../types/Vehicle";

type VehicleFormProps = {
  mode: "create" | "edit";
  vehicle?: Vehicle;
};

export default function VehicleForm({ mode, vehicle }: VehicleFormProps) {
  const [patente, setPatente] = useState(vehicle?.patente ?? "");
  const [marca, setMarca] = useState(vehicle?.marca ?? "");
  const [modelo, setModelo] = useState(vehicle?.modelo ?? "");
  const [anio, setAnio] = useState(vehicle?.anio.toString() ?? "");
  const [color, setColor] = useState(vehicle?.color ?? "");
  const [kilometraje, setKilometraje] = useState(
    vehicle?.kilometraje.toString() ?? "",
  );

  const [estado, setEstado] = useState<VehicleStatus>(
    vehicle?.estado ?? "Activo",
  );

  const [revisionTecnica, setRevisionTecnica] = useState(
    vehicle?.revisionTecnica ?? new Date(),
  );
  const [mantencion, setMantencion] = useState(
    vehicle?.mantencion ?? new Date(),
  );

  const [mostrarRevision, setMostrarRevision] = useState(false);
  const [mostrarMantencion, setMostrarMantencion] = useState(false);

  const [observaciones, setObservaciones] = useState(
    vehicle?.observaciones ?? "",
  );

  const guardarVehiculo = () => {
    if (!patente || !marca || !modelo || !anio || !color || !kilometraje) {
      Alert.alert("Campos incompletos", "Complete toda la información.");
      return;
    }

    if (patente.length !== 8) {
      Alert.alert(
        "Patente inválida",
        "La patente debe tener el formato AA-BB-11.",
      );
      return;
    }

    const nuevoVehiculo: Vehicle = {
      id: vehicle?.id ?? Date.now().toString(),

      patente,
      marca,
      modelo,

      anio: Number(anio),
      color,
      kilometraje: Number(kilometraje),

      estado,

      revisionTecnica,
      mantencion,

      observaciones,
    };

    if (mode === "create") {
      addVehicle(nuevoVehiculo);
    } else {
      updateVehicle(nuevoVehiculo);
    }

    Alert.alert(
      "Éxito",
      mode === "create"
        ? "Vehículo registrado correctamente"
        : "Vehículo actualizado correctamente",
      [
        {
          text: "OK",
          onPress: () => router.replace("/vehicles"),
        },
      ],
    );
  };
  const formatearPatente = (texto: string) => {
    let valor = texto.toUpperCase();

    // Solo letras y números
    valor = valor.replace(/[^A-Z0-9]/g, "");

    // Máximo 6 caracteres útiles
    valor = valor.substring(0, 6);

    if (valor.length <= 2) {
      return valor;
    }

    if (valor.length <= 4) {
      return `${valor.slice(0, 2)}-${valor.slice(2)}`;
    }

    return `${valor.slice(0, 2)}-${valor.slice(2, 4)}-${valor.slice(4)}`;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            {mode === "create" ? "Nuevo Vehículo" : "Editar Vehículo"}
          </Text>

          <AppInput
            label="Patente"
            placeholder="AA-BB-11"
            value={patente}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={8}
            onChangeText={(texto) => setPatente(formatearPatente(texto))}
          />

          <AppInput
            label="Marca"
            placeholder="Toyota"
            value={marca}
            onChangeText={setMarca}
          />

          <AppInput
            label="Modelo"
            placeholder="Hilux"
            value={modelo}
            onChangeText={setModelo}
          />

          <AppInput
            label="Año"
            placeholder="2024"
            keyboardType="numeric"
            value={anio}
            onChangeText={setAnio}
          />

          <AppInput
            label="Color"
            placeholder="Blanco"
            value={color}
            onChangeText={setColor}
          />

          <AppInput
            label="Kilometraje"
            placeholder="125000"
            keyboardType="numeric"
            value={kilometraje}
            onChangeText={setKilometraje}
          />

          <AppInput label="Estado" value={estado} editable={false} />

          <Text style={styles.label}>Próxima revisión técnica</Text>

          <Pressable
            style={styles.dateButton}
            onPress={() => setMostrarRevision(true)}
          >
            <Text>📅 {revisionTecnica.toLocaleDateString("es-CL")}</Text>
          </Pressable>

          {mostrarRevision && (
            <DateTimePicker
              value={revisionTecnica}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setMostrarRevision(false);

                if (date) {
                  setRevisionTecnica(date);
                }
              }}
            />
          )}

          <Text style={styles.label}>Próxima mantención</Text>

          <Pressable
            style={styles.dateButton}
            onPress={() => setMostrarMantencion(true)}
          >
            <Text>🔧 {mantencion.toLocaleDateString("es-CL")}</Text>
          </Pressable>

          {mostrarMantencion && (
            <DateTimePicker
              value={mantencion}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setMostrarMantencion(false);

                if (date) {
                  setMantencion(date);
                }
              }}
            />
          )}

          <AppInput
            label="Observaciones"
            placeholder="Ingrese observaciones..."
            value={observaciones}
            onChangeText={setObservaciones}
            multiline
            numberOfLines={4}
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={mode === "create" ? "Guardar Vehículo" : "Guardar Cambios"}
              onPress={guardarVehiculo}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#222",
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },

  dateButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  buttonContainer: {
    marginTop: 15,
    marginBottom: 40,
  },
});
