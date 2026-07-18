import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Alert,
    Image,
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

import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { addEquipment, updateEquipment } from "../../services/equipment.service";
import { Equipment, EquipmentStatus } from "../../types/Equipment";
import AppInput from "../ui/AppInput";
import AppSelect from "../ui/AppSelect";
import PrimaryButton from "../ui/PrimaryButton";

type EquipmentFormProps = {
  mode: "create" | "edit";
  equipment?: Equipment;
};

export default function EquipmentForm({ mode, equipment }: EquipmentFormProps) {
  const [codigo, setCodigo] = useState(equipment?.codigo ?? "");
const [nombre, setNombre] = useState(equipment?.nombre ?? "");
const [categoria, setCategoria] = useState(equipment?.categoria ?? "");
const [marca, setMarca] = useState(equipment?.marca ?? "");
const [modelo, setModelo] = useState(equipment?.modelo ?? "");
const [numeroSerie, setNumeroSerie] = useState(
  equipment?.numeroSerie ?? "",
);

const [ubicacion, setUbicacion] = useState(
  equipment?.ubicacion ?? "",
);
  
  const [estado, setEstado] = useState<EquipmentStatus>(
  equipment?.estado ?? "Operativo",
);

  const [fechaCertificacion, setFechaCertificacion] = useState(
  equipment?.fechaCertificacion ?? new Date(),
);

const [vencimientoCertificacion, setVencimientoCertificacion] =
  useState(
    equipment?.vencimientoCertificacion ?? new Date(),
  );

 const [mostrarCertificacion, setMostrarCertificacion] = useState(false);
const [mostrarVencimiento, setMostrarVencimiento] = useState(false);

 const [observaciones, setObservaciones] = useState(
  equipment?.observaciones ?? "",
);

const [foto, setFoto] = useState(
  equipment?.foto ?? "",
);
const [nfcId] = useState(
  equipment?.nfcId ?? ""
);
  const guardarEquipo = async () => {
  if (
    !codigo ||
    !nombre ||
    !categoria ||
    !marca ||
    !modelo ||
    !numeroSerie ||
    !ubicacion
  ) {
    Alert.alert("Campos incompletos", "Complete toda la información.");
    return;
  }

 const nuevoEquipo: Equipment = {
  id: equipment?.id ?? `EQ-${Date.now()}`,

  nfcId,

  codigo,
  nombre,
  categoria,
  marca,
  modelo,
  numeroSerie,
  ubicacion,
  fechaCertificacion,
  vencimientoCertificacion,
  estado,
  observaciones,
  foto,
};

  if (mode === "create") {
    await addEquipment(nuevoEquipo);
  } else {
    await updateEquipment(nuevoEquipo);
  }

  Alert.alert(
    "Éxito",
    mode === "create"
      ? "Equipo registrado correctamente"
      : "Equipo actualizado correctamente",
    [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]
  );
};
 
  const seleccionarFoto = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert("Permiso requerido", "Debe permitir el acceso a la galería.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
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
            {mode === "create"
  ? "Nuevo Equipo"
  : "Editar Equipo"}
          </Text>

          <AppInput
  label="Código"
  placeholder="EQ-001"
  value={codigo}
  onChangeText={setCodigo}
/>
<AppInput
  label="Nombre"
  placeholder="Extintor PQS 6 Kg"
  value={nombre}
  onChangeText={setNombre}
/>

          <AppInput
  label="Marca"
  placeholder="Ansul"
  value={marca}
  onChangeText={setMarca}
/>

<AppInput
  label="Modelo"
  placeholder="ABC-6KG"
  value={modelo}
  onChangeText={setModelo}
/>

          <AppInput
  label="Categoría"
  placeholder="Extintor"
  value={categoria}
  onChangeText={setCategoria}
/>

          <AppInput
  label="Número de serie"
  placeholder="SN-123456"
  value={numeroSerie}
  onChangeText={setNumeroSerie}
/>

          <AppInput
  label="Ubicación"
  placeholder="Bodega Central"
  value={ubicacion}
  onChangeText={setUbicacion}
/>

          <AppSelect
            label="Estado"
           value={estado}
onValueChange={(value) => setEstado(value as EquipmentStatus)}
            items={[
  {
    label: "Operativo",
    value: "Operativo",
  },
  {
    label: "En mantenimiento",
    value: "En mantenimiento",
  },
  {
    label: "Fuera de servicio",
    value: "Fuera de servicio",
  },
]}
          />

          <Text style={styles.label}>Fecha de certificación</Text>

<Pressable
  style={styles.dateButton}
  onPress={() => setMostrarCertificacion(true)}
>
  <Text>📅 {fechaCertificacion.toLocaleDateString("es-CL")}</Text>
</Pressable>

{mostrarCertificacion && (
  <DateTimePicker
    value={fechaCertificacion}
    mode="date"
    display="default"
    onChange={(event, date) => {
      setMostrarCertificacion(false);

      if (date) {
        setFechaCertificacion(date);
      }
    }}
  />
)}

<Text style={styles.label}>Vencimiento de certificación</Text>

<Pressable
  style={styles.dateButton}
  onPress={() => setMostrarVencimiento(true)}
>
  <Text>📅 {vencimientoCertificacion.toLocaleDateString("es-CL")}</Text>
</Pressable>

{mostrarVencimiento && (
  <DateTimePicker
    value={vencimientoCertificacion}
    mode="date"
    display="default"
    onChange={(event, date) => {
      setMostrarVencimiento(false);

      if (date) {
        setVencimientoCertificacion(date);
      }
    }}
  />
)}
          <Text style={styles.label}>Foto del equipo</Text>

          <Pressable style={styles.imageButton} onPress={seleccionarFoto}>
            <Text style={styles.imageButtonText}>
              {foto ? "Cambiar foto" : "Seleccionar foto"}
            </Text>
          </Pressable>

          {foto !== "" && (
            <Image source={{ uri: foto }} style={styles.preview} />
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
              title={mode === "create" ? "Guardar Equipo" : "Guardar Cambios"}
              onPress={guardarEquipo}
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
  imageButton: {
    backgroundColor: "#005A9C",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  imageButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 20,
  },
});
