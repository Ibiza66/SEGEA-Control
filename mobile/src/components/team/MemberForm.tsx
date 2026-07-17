import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import AppInput from "../ui/AppInput";
import AppSelect from "../ui/AppSelect";
import PrimaryButton from "../ui/PrimaryButton";

import { Member, MemberRole } from "../../types/Member";
import { addMember, updateMember } from "../../services/member.service";

type Props = {
  mode: "create" | "edit";
  member?: Member;
};

export default function MemberForm({ mode, member }: Props) {
 const [nombre, setNombre] = useState(member?.nombre ?? "");

const [cargo, setCargo] = useState<MemberRole>(
  member?.cargo ?? "Conductor"
);

const [telefono, setTelefono] = useState(
  member?.telefono ?? ""
);

const [correo, setCorreo] = useState(
  member?.correo ?? ""
);

const [foto, setFoto] = useState(
  member?.foto ?? ""
);
const cargos = [
  { label: "Administrador", value: "Administrador" },
  { label: "Supervisor", value: "Supervisor" },
  { label: "Conductor", value: "Conductor" },
  { label: "Mecánico", value: "Mecánico" },
];
const seleccionarFoto = async () => {
  const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permiso.granted) {
    Alert.alert(
      "Permiso requerido",
      "Debes permitir el acceso a la galería."
    );
    return;
  }

  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!resultado.canceled) {
    setFoto(resultado.assets[0].uri);
  }
};
const guardar = async () => {
  if (!nombre.trim()) {
    Alert.alert("Error", "Ingrese el nombre.");
    return;
  }

  if (!correo.trim()) {
    Alert.alert("Error", "Ingrese el correo.");
    return;
  }

  const nuevoMiembro: Member = {
    id: member?.id ?? Date.now().toString(),
    nombre,
    cargo,
    telefono,
    correo,
    foto,
  };

  if (mode === "create") {
    await addMember(nuevoMiembro);
  } else {
    await updateMember(nuevoMiembro);
  }

  router.replace("/team");
};
    return (
  <ScrollView
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
  >
    <AppInput
      label="Nombre"
      value={nombre}
      onChangeText={setNombre}
    />

    <AppSelect
  label="Cargo"
  value={cargo}
  onValueChange={(v) => setCargo(v as MemberRole)}
  items={cargos}
/>

    <AppInput
      label="Teléfono"
      value={telefono}
      onChangeText={setTelefono}
      keyboardType="phone-pad"
    />

    <AppInput
      label="Correo"
      value={correo}
      onChangeText={setCorreo}
      keyboardType="email-address"
      autoCapitalize="none"
    />

    <PrimaryButton
      title={
        foto
          ? "Cambiar foto"
          : "Seleccionar foto"
      }
      onPress={seleccionarFoto}
    />

    <View style={{ height: 16 }} />

    <PrimaryButton
      title={
        mode === "create"
          ? "Guardar integrante"
          : "Actualizar integrante"
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
  },
});