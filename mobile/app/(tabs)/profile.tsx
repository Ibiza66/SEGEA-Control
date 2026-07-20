import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { getProfile } from "../../src/utils/profileStorage";
import { getVehicles } from "../../src/services/vehicle.service";
import { getTasks } from "../../src/services/task.service";
import { getEquipments } from "../../src/services/equipment.service";
import { getInspections } from "../../src/services/inspection.service";

export default function ProfileTab() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    position: "",
  });

  useFocusEffect(
    useCallback(() => {
      async function load() {
        const data = await getProfile();
        setProfile(data);
      }

      load();
    }, [])
  );

  const vehicles = getVehicles();
  const tasks = getTasks();
  const equipments = getEquipments();
  const inspections = getInspections();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.avatar}>
        <Ionicons
          name="person"
          size={70}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.name}>{profile.name}</Text>

      <Text style={styles.position}>
        {profile.position || "Administrador"}
      </Text>

      <View style={styles.card}>
        <InfoRow
          icon="mail-outline"
          text={profile.email}
        />

        <InfoRow
          icon="briefcase-outline"
          text={profile.position || "Administrador"}
        />
      </View>

      <Text style={styles.section}>
        Estadísticas
      </Text>

      <View style={styles.statsContainer}>
        <StatCard
          icon="car-sport"
          title="Vehículos"
          value={vehicles.length}
        />

        <StatCard
          icon="clipboard"
          title="Tareas"
          value={tasks.length}
        />

        <StatCard
          icon="construct"
          title="Equipos"
          value={equipments.length}
        />

        <StatCard
          icon="search"
          title="Inspecciones"
          value={inspections.length}
        />
      </View>
    </ScrollView>
  );
}

function InfoRow({
  icon,
  text,
}: {
  icon: any;
  text: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon}
        size={22}
        color="#0A66C2"
      />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: number;
}) {
  return (
    <View style={styles.statCard}>
      <Ionicons
        name={icon}
        size={30}
        color="#0A66C2"
      />

      <Text style={styles.statNumber}>
        {value}
      </Text>

      <Text style={styles.statTitle}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
  paddingHorizontal: 20,
  paddingBottom: 80,
  paddingTop: 60,
  alignItems: "center",
},

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#0A66C2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    color: "#1E293B",
  },

  position: {
    color: "#64748B",
    marginBottom: 25,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 25,
    elevation: 3,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#334155",
  },

  section: {
    alignSelf: "flex-start",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#1E293B",
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
    color: "#0A66C2",
  },

  statTitle: {
    marginTop: 6,
    color: "#64748B",
    fontWeight: "600",
  },
});