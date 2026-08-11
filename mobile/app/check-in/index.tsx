import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";

import GradientBackground from "@/src/components/layout/GradientBackground";
import { Theme } from "@/src/theme/theme";
import MethodCard from "./components/MethodCard";

export default function CheckInScreen() {
  async function navigate(route: string) {
    await Haptics.selectionAsync();
    router.push(route as any);
  }

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Realizar Check-In
        </Text>

        <Text style={styles.subtitle}>
          Selecciona cómo deseas identificar el vehículo o equipo.
        </Text>

        <View style={styles.methods}>
          <MethodCard
            title="Escanear NFC"
            description="Acerca el teléfono al vehículo o equipo."
            icon="wifi"
            iconColor={Theme.colors.primary}
            iconBackground="#E8F3FF"
            onPress={() => navigate("/check-in/nfc")}
          />

          <MethodCard
            title="Escanear código QR"
            description="Usa la cámara para leer el código QR."
            icon="qr-code"
            iconColor={Theme.colors.success}
            iconBackground="#E8F8F0"
            onPress={() => navigate("/check-in/qr")}
          />

          <MethodCard
            title="Buscar manualmente"
            description="Busca por patente, código o nombre."
            icon="search"
            iconColor={Theme.colors.warning}
            iconBackground="#FFF3E8"
            onPress={() => navigate("/check-in/manual")}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  content: {
    flexGrow: 1,
    paddingTop: Theme.spacing.xxl,
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },

  title: {
    fontSize: Theme.typography.screenTitle,
    fontWeight: "700",
    color: Theme.colors.text,
  },

  subtitle: {
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.xl,
    fontSize: Theme.typography.body,
    color: Theme.colors.textSecondary,
  },

  methods: {
    gap: Theme.spacing.md,
  },
});