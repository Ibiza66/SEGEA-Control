import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import EquipmentCard from "../../src/components/cards/EquipmentCard";
import AppInput from "../../src/components/ui/AppInput";

import {
  getEquipments,
  loadEquipments,
} from "../../src/services/equipment.service";

import { Equipment } from "../../src/types/Equipment";

export default function EquipmentScreen() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      const cargarEquipos = async () => {
        await loadEquipments();
        setEquipments(getEquipments());
      };

      cargarEquipos();
    }, []),
  );

  const filteredEquipments = equipments.filter((equipment) => {
    const text = search.toLowerCase();

    return (
      equipment.codigo.toLowerCase().includes(text) ||
      equipment.nombre.toLowerCase().includes(text) ||
      equipment.marca.toLowerCase().includes(text) ||
      equipment.modelo.toLowerCase().includes(text)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipos</Text>

      <AppInput
        label="Buscar"
        placeholder="Código, nombre o marca..."
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {filteredEquipments.map((equipment) => (
          <EquipmentCard
            key={equipment.id}
            codigo={equipment.codigo}
            nombre={equipment.nombre}
            marca={equipment.marca}
            modelo={equipment.modelo}
            estado={equipment.estado}
            foto={equipment.foto}
            onPress={() =>
              router.push({
                pathname: "/equipment/details",
                params: {
                  id: equipment.id,
                },
              })
            }
          />
        ))}
      </ScrollView>

      <Pressable
        style={styles.fab}
        onPress={() => router.push("/equipment/create")}
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