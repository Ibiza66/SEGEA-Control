import { useLocalSearchParams } from "expo-router";

import VehicleForm from "../../src/components/vehicles/VehicleForm";

import { getVehicleById } from "../../src/services/vehicle.service";

export default function EditVehicleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return null;
  }

  return <VehicleForm mode="edit" vehicle={vehicle} />;
}
