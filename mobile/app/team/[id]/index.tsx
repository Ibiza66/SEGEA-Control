import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import PrimaryButton from "../../../src/components/ui/PrimaryButton";
import { getMemberById, deleteMember } from "../../../src/services/member.service";

export default function MemberDetailScreen() {
  const { id } = useLocalSearchParams();

  const member = getMemberById(id as string);

  if (!member) {
    return (
      <View style={styles.center}>
        <Text>Integrante no encontrado.</Text>
      </View>
    );
  }

  const eliminar = () => {
  Alert.alert(
    "Eliminar integrante",
    `¿Seguro que deseas eliminar a ${member.nombre}?`,
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          eliminarConfirmado();
        },
      },
    ]
  );
};

const eliminarConfirmado = async () => {
  await deleteMember(member.id);
  router.replace("/team");
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {member.foto ? (
        <Image source={{ uri: member.foto }} style={styles.photo} />
      ) : (
        <Ionicons name="person-circle" size={140} color="#1565C0" />
      )}

      <Text style={styles.name}>{member.nombre}</Text>

      <Text style={styles.label}>Cargo</Text>
      <Text style={styles.value}>{member.cargo}</Text>

      <Text style={styles.label}>Teléfono</Text>
      <Text style={styles.value}>{member.telefono}</Text>

      <Text style={styles.label}>Correo</Text>
      <Text style={styles.value}>{member.correo}</Text>

      <PrimaryButton
  title="Editar"
  onPress={() =>
    router.push({
      pathname: "/team/edit" as any,
      params: { id: member.id },
    })
  }
/>

      <View style={{ height: 12 }} />

      <PrimaryButton
        title="Eliminar"
        onPress={eliminar}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },

  label: {
    alignSelf: "flex-start",
    fontWeight: "700",
    marginTop: 12,
  },

  value: {
    alignSelf: "flex-start",
    fontSize: 18,
    marginBottom: 8,
  },
});