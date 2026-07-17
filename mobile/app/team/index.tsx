import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppInput from "../../src/components/ui/AppInput";
import MemberCard from "../../src/components/cards/MemberCard";

import { Member } from "../../src/types/Member";
import { getMembers } from "../../src/services/member.service";

export default function TeamScreen() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
  useCallback(() => {
    setMembers([...getMembers()]);
  }, [])
);

  const filtered = members.filter((m) => {
    const text = search.toLowerCase();

    return (
      m.nombre.toLowerCase().includes(text) ||
      m.cargo.toLowerCase().includes(text)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipo</Text>

      <AppInput
        label="Buscar"
        placeholder="Nombre o cargo..."
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((member) => (
          <MemberCard
            key={member.id}
            nombre={member.nombre}
            cargo={member.cargo}
            foto={member.foto}
            onPress={() => router.push(`/team/${member.id}`)}
          />
        ))}
      </ScrollView>

      <Pressable
  style={styles.fab}
  onPress={() => router.push("/team/create")}
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