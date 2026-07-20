import AsyncStorage from "@react-native-async-storage/async-storage";

import { vehicleInspections } from "../data/VehicleInspections";
import { VehicleInspection } from "../types/VehicleInspections";

const STORAGE_KEY = "vehicleInspections";

async function saveVehicleInspections() {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(vehicleInspections)
  );
}

export async function loadVehicleInspections() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  if (data) {
    vehicleInspections.length = 0;
    vehicleInspections.push(...JSON.parse(data));
  } else {
    await saveVehicleInspections();
  }
}

export function getVehicleInspections() {
  return vehicleInspections;
}

export function getVehicleInspectionById(id: string) {
  return vehicleInspections.find(
    (inspection) => inspection.id === id
  );
}

export function getVehicleInspectionsByVehicleId(
  vehicleId: string
) {
  return vehicleInspections.filter(
    (inspection) => inspection.vehicleId === vehicleId
  );
}

export async function addVehicleInspection(
  inspection: VehicleInspection
) {
  vehicleInspections.push(inspection);
  await saveVehicleInspections();
}

export async function updateVehicleInspection(
  inspection: VehicleInspection
) {
  const index = vehicleInspections.findIndex(
    (i) => i.id === inspection.id
  );

  if (index !== -1) {
    vehicleInspections[index] = inspection;
    await saveVehicleInspections();
  }
}

export async function deleteVehicleInspection(id: string) {
  const index = vehicleInspections.findIndex(
    (i) => i.id === id
  );

  if (index !== -1) {
    vehicleInspections.splice(index, 1);
    await saveVehicleInspections();
  }
}