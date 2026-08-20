import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import GradientBackground from "@/src/components/layout/GradientBackground";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { Theme } from "@/src/theme/theme";
import { router, useLocalSearchParams } from "expo-router";
import { vehicles } from "@/src/data/vehicles";
import ChecklistItem from "@/src/components/checklist/ChecklistItem";
import * as ImagePicker from "expo-image-picker";
import { addInspection } from "@/src/services/inspection.service";
import { Inspection } from "@/src/types/Inspection";

const items = [
  "Neumáticos",
  "Luces",
  "Frenos",
  "Espejos",
  "Bocina",
  "Cinturones",
  "Extintor",
  "Botiquín",
  "Documentación",
];


export default function VehicleChecklistScreen() {
  const { id } = useLocalSearchParams();

const vehicle = vehicles.find(
  (v) => v.id === String(id)
);
  
    const [checked, setChecked] = useState<(boolean | null)[]>(
  items.map(() => null)
);
const [observations, setObservations] = useState<string[]>(
  items.map(() => "")
);
const [photos, setPhotos] = useState<string[]>(
  items.map(() => "")
);

  function toggle(index: number, value: boolean) {
  const copy = [...checked];
  copy[index] = value;
  setChecked(copy);
}
function updateObservation(index: number, text: string) {
  const copy = [...observations];
  copy[index] = text;
  setObservations(copy);
}
async function addPhoto(index: number) {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    return;
  }

  const result =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

  if (!result.canceled) {
    const copy = [...photos];
    copy[index] = result.assets[0].uri;
    setPhotos(copy);
  }
}
  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Checklist del Vehículo
        </Text>
{vehicle && (
  <View style={styles.vehicleCard}>
    <Text style={styles.vehicleTitle}>
      🚗 {vehicle.marca} {vehicle.modelo}
    </Text>

    <Text style={styles.vehicleInfo}>
      Patente: {vehicle.patente}
    </Text>

    <Text style={styles.vehicleInfo}>
      Kilometraje: {vehicle.kilometraje.toLocaleString()} km
    </Text>

    <Text style={styles.vehicleInfo}>
      Revisión técnica:
      {" "}
      {vehicle.revisionTecnica.toLocaleDateString("es-CL")}
    </Text>
  </View>
)}
        <Text style={styles.subtitle}>
            
          Revise cada punto antes de salir a terreno.
        </Text>

        {items.map((item, index) => (
 <ChecklistItem
  key={item}
  title={item}
  value={checked[index]}
  observation={observations[index]}
  onObservationChange={(text) =>
    updateObservation(index, text)
  }
  onChange={(value) => toggle(index, value)}
  photo={photos[index]}
  onAddPhoto={() => addPhoto(index)}
/>
))}

        <PrimaryButton
  title="Finalizar Checklist"
  onPress={async () => {
    // Revisar que todos los puntos estén respondidos
    if (checked.includes(null)) {
      Alert.alert(
        "Checklist incompleto",
        "Debe revisar todos los puntos."
      );
      return;
    }

    // Revisar que todos los "No cumple" tengan observación
    for (let i = 0; i < checked.length; i++) {
      if (
        checked[i] === false &&
        observations[i].trim() === ""
      ) {
        Alert.alert(
          "Observación requerida",
          `Debe ingresar una observación para "${items[i]}".`
        );
        return;
      }
    }

    const inspection: Inspection = {
  id: `INSP-${Date.now()}`,
  vehicleId: vehicle!.id,
  inspector: "Inspector",
  fecha: new Date().toISOString(),
  estado: "Pendiente",
  observaciones: "",

  checklist: items.map((item, index) => ({
    item,
    cumple: checked[index]!,
    observacion: observations[index],
    foto: photos[index],
  })),
};

await addInspection(inspection);

Alert.alert(
  "Éxito",
  "Checklist guardado correctamente.",
  [
    {
      text: "OK",
      onPress: () => {
        router.replace("/inspections");
      },
    },
  ]
);
  }}
/>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  content: {
    padding: Theme.spacing.lg,
    paddingTop: Theme.spacing.xxl,
    paddingBottom: Theme.spacing.xxxl,
  },

  title: {
    fontSize: Theme.typography.screenTitle,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },

  subtitle: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xl,
  },

  vehicleCard: {
  backgroundColor: Theme.colors.surface,
  borderRadius: Theme.radius.lg,
  padding: Theme.spacing.lg,
  marginBottom: Theme.spacing.lg,

  ...Theme.shadows.md,
},

vehicleTitle: {
  fontSize: Theme.typography.cardTitle,
  fontWeight: "700",
  color: Theme.colors.text,
  marginBottom: Theme.spacing.sm,
},

vehicleInfo: {
  fontSize: Theme.typography.body,
  color: Theme.colors.textSecondary,
  marginBottom: Theme.spacing.xs,
},
});