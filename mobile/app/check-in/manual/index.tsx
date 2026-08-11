import { useMemo, useState } from "react";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";

import GradientBackground from "@/src/components/layout/GradientBackground";
import SearchBar from "@/src/components/common/SearchBar";
import VehicleCard from "@/src/components/cards/VehicleCard";

import { Theme } from "@/src/theme/theme";
import { vehicles } from "@/src/data/vehicles";

export default function ManualSearchScreen() {
    
  const [search, setSearch] = useState("");
const filteredVehicles = useMemo(() => {
  const text = search.trim().toUpperCase();

  if (!text) {
    return vehicles;
  }

  return vehicles.filter((vehicle) =>
    vehicle.patente.toUpperCase().includes(text)
  );
}, [search]);
  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Buscar vehículo
        </Text>

        <Text style={styles.subtitle}>
          Busca un vehículo por patente.
        </Text>
<SearchBar
  value={search}
  onChangeText={setSearch}
  placeholder="Buscar por patente..."
/>
<Text style={styles.results}>
  {filteredVehicles.length} vehículo(s) encontrado(s)
</Text>

{filteredVehicles.length === 0 ? (
  <Text style={styles.empty}>
    No se encontró ningún vehículo.
  </Text>
) : (
  filteredVehicles.map((vehicle) => (
    <VehicleCard
      key={vehicle.id}
      patente={vehicle.patente}
      marca={vehicle.marca}
      modelo={vehicle.modelo}
      anio={vehicle.anio}
      kilometraje={vehicle.kilometraje}
      estado={vehicle.estado}
      onPress={() => {
  router.push(`/vehicles/${vehicle.id}`);
}}
    />
  ))
)}
        
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
    padding: Theme.spacing.lg,
  },

  title: {
    fontSize: Theme.typography.screenTitle,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },

  subtitle: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xl,
  },

  results: {
  marginVertical: Theme.spacing.md,
  fontSize: Theme.typography.caption,
  color: Theme.colors.textSecondary,
},
empty: {
  textAlign: "center",
  marginTop: Theme.spacing.xl,
  color: Theme.colors.textSecondary,
  fontSize: Theme.typography.body,
},
});