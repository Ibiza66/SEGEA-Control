import { useLocalSearchParams } from "expo-router";

import EquipmentForm from "../../src/components/equipment/EquipmentForm";

import { getEquipmentById } from "../../src/services/equipment.service";

export default function EditEquipmentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const equipment = getEquipmentById(id);

  if (!equipment) {
    return null;
  }

  return <EquipmentForm mode="edit" equipment={equipment} />;
}