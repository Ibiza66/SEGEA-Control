import { getEquipments, loadEquipments } from "./equipment.service";
import { getVehicles, loadVehicles } from "./vehicle.service";
import { Notification } from "../types/notification";

function daysBetween(date: Date) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const target = new Date(date);

  target.setHours(0, 0, 0, 0);

  return Math.floor(
    (target.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );
}

export async function getNotifications(): Promise<Notification[]> {
  await loadVehicles();
  await loadEquipments();

  const notifications: Notification[] = [];

  // ==========================
  // VEHÍCULOS
  // ==========================

  for (const vehicle of getVehicles()) {
    // Revisión técnica
    const revisionDays = daysBetween(vehicle.revisionTecnica);

    if (revisionDays <= 30) {
      notifications.push({
  id: `${vehicle.id}-revision`,
  title: "Revisión técnica",
  description: vehicle.patente,
  daysRemaining: revisionDays,
  type:
    revisionDays <= 0
      ? "critical"
      : revisionDays <= 7
        ? "urgent"
        : "warning",
  icon: "🚗",
});
    }

    // Mantención
    const maintenanceDays = daysBetween(vehicle.mantencion);

    if (maintenanceDays <= 30) {
      notifications.push({
  id: `${vehicle.id}-maintenance`,
  title: "Mantención",
  description: vehicle.patente,
  daysRemaining: maintenanceDays,
  type:
    maintenanceDays <= 0
      ? "critical"
      : maintenanceDays <= 7
        ? "urgent"
        : "warning",
  icon: "🔧",
});
    }
  }

  // ==========================
  // EQUIPOS
  // ==========================

  for (const equipment of getEquipments()) {
    const calibrationDays = daysBetween(
      equipment.vencimientoCertificacion
    );

    if (calibrationDays <= 30) {
      notifications.push({
  id: `${equipment.id}-calibration`,
  title: "Calibración",
  description: equipment.nombre,
  daysRemaining: calibrationDays,
  type:
    calibrationDays <= 0
      ? "critical"
      : calibrationDays <= 7
        ? "urgent"
        : "warning",
  icon: "🧪",
});
    }
  }

  return notifications.sort(
    (a, b) => a.daysRemaining - b.daysRemaining
  );
}