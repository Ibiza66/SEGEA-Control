import AsyncStorage from "@react-native-async-storage/async-storage";

import { equipmentInspections } from "../data/equipmentInspections";
import { EquipmentInspection } from "../types/EquipmentInspection";

const STORAGE_KEY = "equipmentInspections";

async function saveEquipmentInspections() {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(equipmentInspections)
  );
}

export async function loadEquipmentInspections() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  if (data) {
    equipmentInspections.length = 0;
    equipmentInspections.push(...JSON.parse(data));
  } else {
    await saveEquipmentInspections();
  }
}

export function getEquipmentInspections() {
  return equipmentInspections;
}

export function getEquipmentInspectionById(id: string) {
  return equipmentInspections.find(
    (inspection) => inspection.id === id
  );
}

export function getEquipmentInspectionsByEquipmentId(
  equipmentId: string
) {
  return equipmentInspections.filter(
    (inspection) => inspection.equipmentId === equipmentId
  );
}

export async function addEquipmentInspection(
  inspection: EquipmentInspection
) {
  equipmentInspections.push(inspection);
  await saveEquipmentInspections();
}

export async function updateEquipmentInspection(
  inspection: EquipmentInspection
) {
  const index = equipmentInspections.findIndex(
    (i) => i.id === inspection.id
  );

  if (index !== -1) {
    equipmentInspections[index] = inspection;
    await saveEquipmentInspections();
  }
}

export async function deleteEquipmentInspection(id: string) {
  const index = equipmentInspections.findIndex(
    (i) => i.id === id
  );

  if (index !== -1) {
    equipmentInspections.splice(index, 1);
    await saveEquipmentInspections();
  }
}