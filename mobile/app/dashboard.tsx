import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import DashboardCard from "../src/components/cards/DashboardCard";

export default function Dashboard() {
  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}
>
      <Image
        source={require("../assets/logo/logo-segea.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.welcome}>Hola, Administrador 👋</Text>

      <Text style={styles.date}>
        {new Date().toLocaleDateString("es-CL", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>

      <View style={styles.grid}>
  <DashboardCard
    title="Vehículos"
    icon="car-sport"
    onPress={() => router.push("/vehicles" as any)}
  />

  <DashboardCard
    title="Mantenimientos"
    icon="build"
    onPress={() => router.push("/maintenance" as any)}
  />

  <DashboardCard
    title="Equipo"
    icon="people"
    onPress={() => router.push("/team" as any)}
  />

  <DashboardCard
  title="Inspecciones"
  icon="search"
  onPress={() => router.push("/inspections" as any)}
/>

  <DashboardCard
  title="Reportes"
  icon="bar-chart"
  onPress={() => router.push("/reports" as any)}
/>

  <DashboardCard
    title="Configuración"
    icon="settings"
    onPress={() => {}}
  />
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  logo: {
  width: 180,
  height: 70,
  alignSelf: "center",
  marginBottom: 8,
},

  welcome: {
  fontSize: 26,
  fontWeight: "bold",
  color: "#222",
  marginBottom: 4,
},

  date: {
  fontSize: 14,
  color: "#777",
  marginTop: 2,
  marginBottom: 20,
  textTransform: "capitalize",
},

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  content: {
  paddingBottom: 35,
},
});
