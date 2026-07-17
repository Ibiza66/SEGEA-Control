import AsyncStorage from "@react-native-async-storage/async-storage";

import { inspections } from "../data/inspections";
import { Inspection } from "../types/Inspection";

const STORAGE_KEY = "inspections";

async function saveInspections() {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(inspections)
  );
}

export async function loadInspections() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  if (data) {
    inspections.length = 0;
    inspections.push(...JSON.parse(data));
  } else {
    await saveInspections();
  }
}

export function getInspections() {
  return inspections;
}

export function getInspectionById(id: string) {
  return inspections.find((i) => i.id === id);
}

export async function addInspection(
  inspection: Inspection
) {
  inspections.push(inspection);
  await saveInspections();
}

export async function updateInspection(
  inspection: Inspection
) {
  const index = inspections.findIndex(
    (i) => i.id === inspection.id
  );

  if (index !== -1) {
    inspections[index] = inspection;
    await saveInspections();
  }
}

export async function deleteInspection(id: string) {
  const index = inspections.findIndex(
    (i) => i.id === id
  );

  if (index !== -1) {
    inspections.splice(index, 1);
    await saveInspections();
  }
}