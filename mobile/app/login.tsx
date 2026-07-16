import { router } from "expo-router";
import { useRef, useState } from "react";
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import AppInput from "../src/components/ui/AppInput";
import PrimaryButton from "../src/components/ui/PrimaryButton";
import { login } from "../src/services/auth.service";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image
              source={require("../assets/logo/logo-segea.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>Bienvenido</Text>

            <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

            <AppInput
              label="Correo electrónico"
              placeholder="correo@segea.cl"
              value={correo}
              onChangeText={setCorreo}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
            />

            <AppInput
              ref={passwordRef}
              label="Contraseña"
              placeholder="********"
              secureTextEntry={!mostrarPassword}
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
              showPasswordToggle
              passwordVisible={mostrarPassword}
              onTogglePassword={() => setMostrarPassword(!mostrarPassword)}
              onSubmitEditing={async () => {
                const usuario = await login(correo, password);

                if (usuario) {
                  router.replace("/dashboard");
                } else {
                  Alert.alert("Error", "Correo o contraseña incorrectos");
                }
              }}
            />
            <PrimaryButton
              title="Iniciar sesión"
              onPress={async () => {
                const usuario = await login(correo, password);

                if (usuario) {
                  router.replace("/dashboard");
                } else {
                  Alert.alert("Error", "Correo o contraseña incorrectos");
                }
              }}
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
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    width: 250,
    height: 100,
    alignSelf: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 35,
  },
});
