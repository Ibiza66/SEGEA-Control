import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppInput from "../../src/components/ui/AppInput";
import MaintenanceCard from "../../src/components/cards/MaintenanceCard";

import { Maintenance } from "../../src/types/Maintenance";
import { getMaintenances } from "../../src/services/maintenance.service";

export default function MaintenanceScreen() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      setMaintenances([...getMaintenances()]);
    }, [])
  );

  const filtered = maintenances.filter((m) => {
    const text = search.toLowerCase();

    return (
      m.tipo.toLowerCase().includes(text) ||
      m.descripcion.toLowerCase().includes(text)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mantenimientos</Text>

      <AppInput
        label="Buscar"
        placeholder="Tipo o descripción..."
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((maintenance) => (
          <MaintenanceCard
            key={maintenance.id}
            tipo={maintenance.tipo}
            fecha={maintenance.fecha}
            descripcion={maintenance.descripcion}
            onPress={() =>
              router.push(`/maintenance/${maintenance.id}` as any)
            }
          />
        ))}
      </ScrollView>

      <Pressable
        style={styles.fab}
        onPress={() =>
          router.push("/maintenance/create" as any)
        }
      >
        <Ionicons
          name="add"
          size={34}
          color="white"
        />
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
    paddingBottom: 150,
  },

  fab: {
    position: "absolute",
    right: 25,
    bottom: 30,
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#005A9C",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});