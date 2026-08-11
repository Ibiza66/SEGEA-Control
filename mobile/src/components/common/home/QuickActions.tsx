import { router } from "expo-router";
import * as Haptics from "expo-haptics";

import DashboardCard from "@/src/components/cards/DashboardCard";
import { Theme } from "@/src/theme/theme";

export default function QuickActions() {
  async function navigate(route: string) {
    await Haptics.selectionAsync();
    router.push(route as any);
  }

  return (
    <>
      <DashboardCard
        title="Vehículos"
        description="Gestiona vehículos"
        icon="car-sport"
        iconColor={Theme.colors.secondary}
        iconBackground="#E1F1DD"
        onPress={() => navigate("/vehicles")}
      />

      <DashboardCard
        title="Equipos"
        description="Gestiona equipos y calibraciones"
        icon="construct"
        iconColor={Theme.colors.success}
        iconBackground="#E8F8F0"
        onPress={() => navigate("/equipment")}
      />

      <DashboardCard
        title="Mantenimientos"
        description="Programa tareas y mantenciones"
        icon="clipboard"
        iconColor={Theme.colors.warning}
        iconBackground="#FFF3E8"
        onPress={() => navigate("/tasks")}
      />

      <DashboardCard
        title="Inspecciones"
        description="Revisa checklists enviados"
        icon="search"
        iconColor={Theme.colors.primary}
        iconBackground="#F3E8FF"
        onPress={() => navigate("/inspections")}
      />

      <DashboardCard
        title="Reportes"
        description="Exporta PDF y Excel"
        icon="bar-chart"
        iconColor={Theme.colors.info}
        iconBackground="#E6F7FF"
        onPress={() => navigate("/reports")}
      />

      <DashboardCard
        title="Configuración"
        description="Usuarios y preferencias"
        icon="settings"
        iconColor={Theme.colors.textSecondary}
        iconBackground="#F3F4F6"
        onPress={() => navigate("/settings")}
      />
    </>
  );
}