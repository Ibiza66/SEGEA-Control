
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { vehicles } from "../../src/data/vehicles";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppInput from "../../src/components/ui/AppInput";
import InspectionCard from "../../src/components/cards/InspectionCard";

import { Inspection } from "../../src/types/Inspection";
import {
  getInspections,
  loadInspections,
} from "../../src/services/inspection.service";

export default function InspectionsScreen() {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
  useCallback(() => {
    const cargarInspecciones = async () => {
      await loadInspections();
      setInspections([...getInspections()]);
    };

    cargarInspecciones();
  }, [])
);

  const filtered = inspections.filter((inspection) => {
    const text = search.toLowerCase();

    return (
      inspection.inspector.toLowerCase().includes(text) ||
      inspection.estado.toLowerCase().includes(text)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inspecciones</Text>

      <AppInput
        label="Buscar"
        placeholder="Inspector o estado..."
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((inspection) => {
  const vehicle = vehicles.find(
    (v) => v.id === inspection.vehicleId
  );

  return (
    <InspectionCard
      key={inspection.id}
      vehicle={
        vehicle
          ? `${vehicle.marca} ${vehicle.modelo}`
          : "Vehículo"
      }
      plate={vehicle ? vehicle.patente : "-"}
      inspector={inspection.inspector}
      fecha={inspection.fecha}
      estado={inspection.estado}
      onPress={() =>
        router.push(`/inspections/${inspection.id}` as any)
      }
    />
  );
})}
      </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  list: {
    paddingBottom: 140,
  },

  
});