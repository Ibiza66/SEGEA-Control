import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import VehicleCard from "../../src/components/cards/VehicleCard";
import AppInput from "../../src/components/ui/AppInput";

import { getVehicles } from "../../src/services/vehicle.service";
import { Vehicle } from "../../src/types/Vehicle";

export default function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useFocusEffect(
    useCallback(() => {
      setVehicles(getVehicles());
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículos</Text>

      <AppInput label="Buscar" placeholder="Patente o modelo..." />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            patente={vehicle.patente}
            marca={vehicle.marca}
            modelo={vehicle.modelo}
            anio={vehicle.anio}
            estado={vehicle.estado}
            onPress={() =>
              router.push({
                pathname: "/vehicles/details",
                params: {
                  id: vehicle.id,
                },
              })
            }
          />
        ))}
      </ScrollView>

      <Pressable
        style={styles.fab}
        onPress={() => router.push("/vehicles/create" as any)}
      >
        <Ionicons name="add" size={34} color="white" />
      </Pressable>
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
    paddingBottom: 200,
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 25,
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#005A9C",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
