import { ScrollView, StyleSheet, Text, View } from "react-native";

import ReportCard from "../../src/components/reports/ReportCard";
import ReportSection from "../../src/components/reports/ReportSection";

import { getVehicles } from "../../src/services/vehicle.service";
import { getMaintenances } from "../../src/services/maintenance.service";
import { getMembers } from "../../src/services/member.service";import { getInspections } from "../../src/services/inspection.service";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import { generateReportPDF } from "../../src/services/pdf.service";
export default function ReportsScreen() {
  const vehicles = getVehicles();
  const maintenances = getMaintenances();
  const members = getMembers();
  const inspections = getInspections();

  const pendingInspections = inspections
    .filter((i) => i.estado === "Pendiente")
    .map((i) => ({
      title: i.inspector,
      subtitle: `${i.fecha} • Vehículo ${i.vehicleId}`,
    }));

  const recentMaintenances = maintenances
    .slice(-5)
    .reverse()
    .map((m) => ({
      title: m.tipo,
      subtitle: `${m.fecha} • Vehículo ${m.vehicleId}`,
    }));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Reportes</Text>

      <View style={styles.cards}>
        <ReportCard
          title="Vehículos"
          value={vehicles.length}
        />

        <ReportCard
          title="Mantenimientos"
          value={maintenances.length}
        />

        <ReportCard
          title="Inspecciones"
          value={inspections.length}
        />

        <ReportCard
          title="Equipo"
          value={members.length}
        />
      </View>

      <ReportSection
        title="⚠️ Inspecciones Pendientes"
        items={pendingInspections}
      />

      <ReportSection
        title="🔧 Últimos Mantenimientos"
        items={recentMaintenances}
      />
      <View style={{ marginTop: 30 }}>
  <PrimaryButton
    title="📄 Generar Reporte PDF"
    onPress={generateReportPDF}
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
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});