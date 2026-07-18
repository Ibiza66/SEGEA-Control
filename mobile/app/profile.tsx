import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getProfile } from "../src/utils/profileStorage";
export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    position: "",
  });

  useFocusEffect(
    useCallback(() => {
      async function loadProfile() {
        const data = await getProfile();
        setProfile(data);
      }

      loadProfile();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={70} color="#FFFFFF" />
      </View>

      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.role}>{profile.position}</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={22} color="#005A9C" />
          <View style={styles.info}>
            <Text style={styles.label}>Correo</Text>
            <Text style={styles.value}>{profile.email}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Ionicons name="briefcase-outline" size={22} color="#005A9C" />
          <View style={styles.info}>
            <Text style={styles.label}>Cargo</Text>
            <Text style={styles.value}>{profile.position}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Ionicons name="business-outline" size={22} color="#005A9C" />
          <View style={styles.info}>
            <Text style={styles.label}>Empresa</Text>
            <Text style={styles.value}>SEGEA Control</Text>
          </View>
        </View>
      </View>

      <Pressable
  style={styles.button}
  onPress={() => router.push("/edit-profile")}
>
        <Ionicons name="create-outline" size={22} color="#FFF" />
        <Text style={styles.buttonText}>Editar perfil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#005A9C",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
  },

  role: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 30,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 20,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  info: {
    marginLeft: 15,
  },

  label: {
    fontSize: 13,
    color: "#64748B",
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 2,
  },

  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#005A9C",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
});