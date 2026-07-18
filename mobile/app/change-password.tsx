import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSave() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert(
        "Error",
        "La nueva contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Error",
        "Las nuevas contraseñas no coinciden."
      );
      return;
    }

    Alert.alert(
      "Éxito",
      "Contraseña actualizada correctamente.",
      [
        {
          text: "Aceptar",
          onPress: () => router.back(),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Cambiar contraseña</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color="#64748B" />
        <TextInput
          placeholder="Contraseña actual"
          secureTextEntry
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="key-outline" size={22} color="#64748B" />
        <TextInput
          placeholder="Nueva contraseña"
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="shield-checkmark-outline" size={22} color="#64748B" />
        <TextInput
          placeholder="Confirmar contraseña"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

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
    paddingTop: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 30,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 18,
    elevation: 2,
  },

  input: {
    flex: 1,
    paddingVertical: 16,
    marginLeft: 12,
    fontSize: 16,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#005A9C",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
});