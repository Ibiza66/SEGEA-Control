import { vehicles } from "../data/vehicles";
import { Vehicle } from "../types/Vehicle";

export function getVehicles() {
  return vehicles;
}

export function getVehicleById(id: string) {
  return vehicles.find((vehicle) => vehicle.id === id);
}

export function addVehicle(vehicle: Vehicle) {
  vehicles.push(vehicle);
}
export function updateVehicle(vehicle: Vehicle) {
  const index = vehicles.findIndex((v) => v.id === vehicle.id);

  if (index !== -1) {
    vehicles[index] = vehicle;
  }
}
export function deleteVehicle(id: string) {
  const index = vehicles.findIndex((v) => v.id === id);

  if (index !== -1) {
    vehicles.splice(index, 1);
  }
}
