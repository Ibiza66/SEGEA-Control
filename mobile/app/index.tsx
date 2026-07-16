import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../src/components/ui/PrimaryButton";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo/logo-segea.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>SEGEA Control</Text>

      <Text style={styles.subtitle}>Sistema de Gestión de Inspecciones</Text>

      <PrimaryButton
        title="Iniciar sesión"
        onPress={() => router.push("/login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    padding: 24,
  },

  logo: {
    width: 280,
    height: 120,
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#005A9C",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 17,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
});
