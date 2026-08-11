import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet,Button } from "react-native";

import GradientBackground from "@/src/components/layout/GradientBackground";
import { Theme } from "@/src/theme/theme";
import { vehicles } from "@/src/data/vehicles";

export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams();
const vehicle = vehicles.find((v) => v.id === id);
if (!vehicle) {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text>Vehículo no encontrado.</Text>
      </View>
    </GradientBackground>
  );
}
  return (
   <GradientBackground>
  <View style={styles.container}>

    <View style={styles.card}>

      <Text style={styles.title}>
        {vehicle.marca} {vehicle.modelo}
      </Text>

      <Text style={styles.item}>
        Patente: {vehicle.patente}
      </Text>

      <Text style={styles.item}>
        Estado: {vehicle.estado}
      </Text>

      <Text style={styles.item}>
        Año: {vehicle.anio}
      </Text>

      <Text style={styles.item}>
        Kilometraje: {vehicle.kilometraje.toLocaleString()} km
      </Text>

      <Text style={styles.item}>
        Revisión técnica:{" "}
        {vehicle.revisionTecnica.toLocaleDateString("es-CL")}
      </Text>

      <Text style={styles.item}>
        Mantención:{" "}
        {vehicle.mantencion.toLocaleDateString("es-CL")}
      </Text>

      <Button
        title="Iniciar Check-In"
        onPress={() => {
          console.log("Iniciar inspección");
        }}
      />

    </View>

  </View>
</GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: Theme.spacing.lg,
  paddingTop: Theme.spacing.xxxl,
},

 title: {
  fontSize: Theme.typography.screenTitle,
  fontWeight: "700",
  color: Theme.colors.text,
  marginBottom: Theme.spacing.lg,
},
  item: {
  fontSize: Theme.typography.body,
  color: Theme.colors.text,
  marginBottom: Theme.spacing.md,
},
card: {
  backgroundColor: Theme.colors.surface,
  borderRadius: Theme.radius.lg,
  padding: Theme.spacing.lg,
  ...Theme.shadows.md,
},
});