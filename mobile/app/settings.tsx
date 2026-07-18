import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import {
  getSettings,
  saveSettings,
} from "../src/utils/settingsStorage";
export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);


useFocusEffect(
  useCallback(() => {
    async function loadSettings() {
      try {
        const settings = await getSettings();

        setNotifications(settings.notifications);
       
      } catch (error) {
        console.error("Error al cargar configuración:", error);
      }
    }

    loadSettings();
  }, [])
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <Text style={styles.section}>Cuenta</Text>

      <Pressable
  style={styles.card}
  onPress={() => router.push("/profile")}
>
        <View style={styles.left}>
          <Ionicons name="person-circle-outline" size={24} color="#005A9C" />
          <Text style={styles.option}>Mi perfil</Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#94A3B8" />
      </Pressable>

      <Pressable
  style={styles.card}
  onPress={() => router.push("/change-password")}
>
        <View style={styles.left}>
          <Ionicons name="lock-closed-outline" size={24} color="#005A9C" />
          <Text style={styles.option}>Cambiar contraseña</Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#94A3B8" />
      </Pressable>

      <Text style={styles.section}>Aplicación</Text>

      <View style={styles.card}>
        <View style={styles.left}>
          <Ionicons name="notifications-outline" size={24} color="#005A9C" />
          <Text style={styles.option}>Notificaciones</Text>
        </View>

        <Switch
  value={notifications}
  onValueChange={async (value) => {
    setNotifications(value);

   await saveSettings({
  notifications: value,
});
  }}
/>
      </View>

      

      
      <Text style={styles.section}>Información</Text>

      <View style={styles.card}>
        <View style={styles.left}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#005A9C"
          />
          <Text style={styles.option}>Versión</Text>
        </View>

        <Text style={styles.value}>SEGEA Control v1.0</Text>
      </View>

      <Pressable
        style={styles.logout}
        onPress={() => router.replace("/login")}
      >
        <Ionicons name="log-out-outline" size={24} color="#DC2626" />

        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#F5F7FA",
  paddingHorizontal: 20,
  paddingTop: 30,
},

  title: {
  fontSize: 32,
  fontWeight: "700",
  color: "#1E293B",
  marginBottom: 20,
},

  section: {
  fontSize: 15,
  fontWeight: "700",
  color: "#64748B",
  marginBottom: 12,
  marginTop: 4,
},

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  option: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1E293B",
    marginLeft: 12,
  },

  value: {
    fontSize: 15,
    color: "#64748B",
  },

  logout: {
    marginTop: 35,
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#FECACA",
  },

  logoutText: {
    marginLeft: 10,
    color: "#DC2626",
    fontSize: 17,
    fontWeight: "700",
  },
});