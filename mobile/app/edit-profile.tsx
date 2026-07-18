import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

import {
  getProfile,
  saveProfile,
} from "../src/utils/profileStorage";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const profile = await getProfile();

      setName(profile.name);
      setEmail(profile.email);
      setPosition(profile.position);
    }

    loadProfile();
  }, []);

  async function handleSave() {
    await saveProfile({
      name,
      email,
      position,
    });

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>

      <Text style={styles.label}>Nombre</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Correo</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Cargo</Text>

      <TextInput
        style={styles.input}
        value={position}
        onChangeText={setPosition}
      />

      <Pressable
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Guardar cambios
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#475569",
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    marginTop: 15,
    backgroundColor: "#005A9C",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});