import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import DashboardCard from "../src/components/cards/DashboardCard";

export default function Dashboard() {
  return (
    <View style={styles.container}>
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

        <DashboardCard title="Checklists" icon="clipboard" onPress={() => {}} />

        <DashboardCard title="Equipos" icon="construct" onPress={() => {}} />

        <DashboardCard title="Inspecciones" icon="search" onPress={() => {}} />

        <DashboardCard title="Reportes" icon="bar-chart" onPress={() => {}} />

        <DashboardCard
          title="Configuración"
          icon="settings"
          onPress={() => {}}
        />
      </View>
    </View>
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
    width: 280,
    height: 110,
    alignSelf: "center",
    marginBottom: 15,
  },

  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },

  date: {
    fontSize: 15,
    color: "#777",
    marginTop: 6,
    marginBottom: 40,
    textTransform: "capitalize",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
