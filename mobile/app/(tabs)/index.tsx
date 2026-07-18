import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getProfile } from "../../src/utils/profileStorage";

import DashboardCard from "../../src/components/cards/DashboardCard";
import * as Haptics from "expo-haptics";


export default function Dashboard() {
    const [profile, setProfile] = useState({
  name: "Administrador",
  email: "",
  position: "",
});

useFocusEffect(
  useCallback(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    }

    loadProfile();
  }, [])
);
  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}
>
      <Image
        source={require("@/assets/logo/logo-segea.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.welcome}>
  Hola, {profile.name}
</Text>
<Text style={styles.subtitle}>
  Panel de administración
</Text>

      <Text style={styles.date}>
        {new Date().toLocaleDateString("es-CL", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>
<View style={styles.summaryCard}>
  <View style={styles.summaryColumn}>
  <Ionicons name="clipboard" size={24} color="#7B1FA2" />

<Text style={styles.summaryNumber}>7</Text>

<Text style={styles.summaryLabel}>
  Pendientes
</Text>

<View
  style={[
    styles.summaryLine,
    { backgroundColor: "#7B1FA2" },
  ]}
/>
</View>

  <View style={styles.divider} />

 <View style={styles.summaryColumn}>
  <Ionicons name="warning" size={24} color="#F57C00" />

<Text style={styles.summaryNumber}>3</Text>

<Text style={styles.summaryLabel}>
  Por vencer
</Text>

<View
  style={[
    styles.summaryLine,
    { backgroundColor: "#F57C00" },
  ]}
/>
</View>

  <View style={styles.divider} />

 <View style={styles.summaryColumn}>
  <Ionicons name="document-text" size={24} color="#0288D1" />

<Text style={styles.summaryNumber}>15</Text>

<Text style={styles.summaryLabel}>
  Reportes
</Text>

<View
  style={[
    styles.summaryLine,
    { backgroundColor: "#0288D1" },
  ]}
/>
</View>
</View>
      <View style={styles.grid}>
 <DashboardCard
  title="Vehículos"
  description="Gestiona vehículos e inspecciones"
  icon="car-sport"
  iconColor="#0A66C2"
  iconBackground="#E8F3FF"
  onPress={async () => {
    await Haptics.selectionAsync();
    router.push("/vehicles" as any);
  }}
/>

<DashboardCard
  title="Mantenciones"
  description="Programa y controla mantenciones"
  icon="build"
  iconColor="#F57C00"
  iconBackground="#FFF3E8"
  onPress={async () => {
  await Haptics.selectionAsync();
  router.push("/maintenance" as any);
}}
/>

<DashboardCard
  title="Equipos"
  description="Gestiona los equipos y certificados"
  icon="construct"
  iconColor="#2E7D32"
  iconBackground="#E8F8F0"
  onPress={async () => {
    await Haptics.selectionAsync();
    router.push("/equipment" as any);
  }}
/>
<DashboardCard
  title="Inspecciones"
  description="Revisa y aprueba checklists"
  icon="search"
  iconColor="#7B1FA2"
  iconBackground="#F3E8FF"
  onPress={async () => {
  await Haptics.selectionAsync();
  router.push("/inspections" as any);
}}
/>

<DashboardCard
  title="Reportes"
  description="Genera reportes en PDF"
  icon="bar-chart"
  iconColor="#0288D1"
  iconBackground="#E6F7FF"
  onPress={async () => {
  await Haptics.selectionAsync();
  router.push("/reports" as any);
}}
/>

<DashboardCard
  title="Configuración"
  description="Configura las preferencias del sistema"
  icon="settings"
  iconColor="#616161"
  iconBackground="#F3F4F6"
  onPress={async () => {
  await Haptics.selectionAsync();
  router.push("/settings" as any);
}}
/>
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 90,
  },

  logo: {
    width: 165,
    height: 60,
    alignSelf: "center",
    marginBottom: 10,
  },

  welcome: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtitle: {
  fontSize: 15,
  color: "#64748B",
  marginBottom: 4,
},

  date: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 22,
    textTransform: "capitalize",
  },

  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#FFFFFF",
    borderRadius: 20,

    paddingVertical: 18,
    marginBottom: 26,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  summaryColumn: {
    flex: 1,
    alignItems: "center",
  },

  summaryNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#005A9C",
    marginTop: 6,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    marginTop: 4,
  },

  summaryLine: {
    marginTop: 10,
    width: 40,
    height: 4,
    borderRadius: 2,
  },

  divider: {
    width: 1,
    height: 55,
    backgroundColor: "#E5E7EB",
  },

  grid: {
    marginTop: 8,
  },
  
});
