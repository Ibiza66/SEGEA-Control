import AsyncStorage from "@react-native-async-storage/async-storage";
import { vehicles } from "../data/vehicles";
import { Vehicle } from "../types/Vehicle";

const STORAGE_KEY = "vehicles";
async function saveVehicles() {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
}

export async function loadVehicles() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  if (data) {
    const savedVehicles: Vehicle[] = JSON.parse(data);

    vehicles.length = 0;

    vehicles.push(
      ...savedVehicles.map((vehicle) => ({
        ...vehicle,
        revisionTecnica: new Date(vehicle.revisionTecnica),
        mantencion: new Date(vehicle.mantencion),
      })),
    );
  } else {
    await saveVehicles();
  }
}
export function getVehicles() {
  return vehicles;
}

export function getVehicleById(id: string) {
  return vehicles.find((vehicle) => vehicle.id === id);
}

export async function addVehicle(vehicle: Vehicle) {
  vehicles.push(vehicle);

  await saveVehicles();
}
export async function updateVehicle(vehicle: Vehicle) {
  const index = vehicles.findIndex((v) => v.id === vehicle.id);

  if (index !== -1) {
    vehicles[index] = vehicle;

    await saveVehicles();
  }
}
export async function deleteVehicle(id: string) {
  const index = vehicles.findIndex((v) => v.id === id);

  if (index !== -1) {
    vehicles.splice(index, 1);

    await saveVehicles();
  }
}
