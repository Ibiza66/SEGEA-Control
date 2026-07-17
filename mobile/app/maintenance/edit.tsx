import { useLocalSearchParams } from "expo-router";

import MaintenanceForm from "../../src/components/maintenance/MaintenanceForm";
import { getMaintenanceById } from "../../src/services/maintenance.service";

export default function EditMaintenanceScreen() {
  const { id } = useLocalSearchParams();

  const maintenance = getMaintenanceById(id as string);

  if (!maintenance) {
    return null;
  }

  return (
    <MaintenanceForm
      mode="edit"
      maintenance={maintenance}
    />
  );
}