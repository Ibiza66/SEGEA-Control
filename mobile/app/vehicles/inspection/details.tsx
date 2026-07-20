import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getVehicleInspectionById } from "../../../src/services/vehicleInspection.service";

export default function InspectionDetailsScreen() {
  const { inspectionId } = useLocalSearchParams<{
    inspectionId: string;
  }>();

  const inspection =
    getVehicleInspectionById(inspectionId);

  if (!inspection) {
    return (
      <View style={styles.center}>
        <Text>Inspección no encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        Detalle de la inspección
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>
          {inspection.fecha}
        </Text>

        <Text style={styles.label}>Inspector</Text>
        <Text style={styles.value}>
          {inspection.inspector}
        </Text>

        <Text style={styles.label}>Estado</Text>
        <Text style={styles.value}>
          {inspection.estado}
        </Text>
      </View>

      <Text style={styles.section}>
        Checklist
      </Text>

      <View style={styles.card}>
        {inspection.checklist.map((item) => (
          <Text
            key={item.id}
            style={styles.item}
          >
            {item.realizado ? "✅" : "⬜"} {item.descripcion}
          </Text>
        ))}
      </View>

      <Text style={styles.section}>
        Observaciones
      </Text>

      <View style={styles.card}>
        <Text style={styles.value}>
          {inspection.observaciones ||
            "Sin observaciones"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  section: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },

  label: {
    color: "#777",
    fontSize: 14,
    marginTop: 10,
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
  },

  item: {
    fontSize: 16,
    marginBottom: 10,
  },

  content: {
    paddingBottom: 60,
  },
});