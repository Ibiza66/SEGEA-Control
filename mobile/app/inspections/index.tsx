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
import InspectionCard from "../../src/components/cards/InspectionCard";

import { Inspection } from "../../src/types/Inspection";
import { getInspections } from "../../src/services/inspection.service";

export default function InspectionsScreen() {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      setInspections([...getInspections()]);
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
        {filtered.map((inspection) => (
          <InspectionCard
            key={inspection.id}
            inspector={inspection.inspector}
            fecha={inspection.fecha}
            estado={inspection.estado}
            onPress={() =>
              router.push(`/inspections/${inspection.id}` as any)
            }
          />
        ))}
      </ScrollView>

      <Pressable
        style={styles.fab}
        onPress={() =>
          router.push("/inspections/create" as any)
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
    paddingBottom: 140,
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