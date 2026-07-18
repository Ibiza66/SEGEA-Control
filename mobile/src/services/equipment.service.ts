import AsyncStorage from "@react-native-async-storage/async-storage";
import { equipments } from "../data/equipments";
import { Equipment } from "../types/Equipment";

const STORAGE_KEY = "equipments";

async function saveEquipments() {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(equipments));
}

export async function loadEquipments() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  if (data) {
    const savedEquipments: Equipment[] = JSON.parse(data);

    equipments.length = 0;

    equipments.push(
      ...savedEquipments.map((equipment) => ({
        ...equipment,
        fechaCertificacion: new Date(equipment.fechaCertificacion),
        vencimientoCertificacion: new Date(
          equipment.vencimientoCertificacion
        ),
      }))
    );
  } else {
    await saveEquipments();
  }
}

export function getEquipments() {
  return equipments;
}

export function getEquipmentById(id: string) {
  return equipments.find((equipment) => equipment.id === id);
}

export async function addEquipment(equipment: Equipment) {
  equipments.push(equipment);

  await saveEquipments();
}

export async function updateEquipment(equipment: Equipment) {
  const index = equipments.findIndex((e) => e.id === equipment.id);

  if (index !== -1) {
    equipments[index] = equipment;

    await saveEquipments();
  }
}

export async function deleteEquipment(id: string) {
  const index = equipments.findIndex((e) => e.id === id);

  if (index !== -1) {
    equipments.splice(index, 1);

    await saveEquipments();
  }
}