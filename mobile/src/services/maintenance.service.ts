import AsyncStorage from "@react-native-async-storage/async-storage";

import { maintenances } from "../data/maintenances";
import { Maintenance } from "../types/Maintenance";

const STORAGE_KEY = "maintenances";

async function saveMaintenances() {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(maintenances)
  );
}

export async function loadMaintenances() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  if (data) {
    maintenances.length = 0;
    maintenances.push(...JSON.parse(data));
  } else {
    await saveMaintenances();
  }
}

export function getMaintenances() {
  return maintenances;
}

export function getMaintenanceById(id: string) {
  return maintenances.find((m) => m.id === id);
}

export async function addMaintenance(maintenance: Maintenance) {
  maintenances.push(maintenance);
  await saveMaintenances();
}

export async function updateMaintenance(maintenance: Maintenance) {
  const index = maintenances.findIndex(
    (m) => m.id === maintenance.id
  );

  if (index !== -1) {
    maintenances[index] = maintenance;
    await saveMaintenances();
  }
}

export async function deleteMaintenance(id: string) {
  const index = maintenances.findIndex(
    (m) => m.id === id
  );

  if (index !== -1) {
    maintenances.splice(index, 1);
    await saveMaintenances();
  }
}