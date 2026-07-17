import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import InspectionForm from "../../src/components/inspection/InspectionForm";
import { getInspectionById } from "../../src/services/inspection.service";

export default function EditInspectionScreen() {
  const { id } = useLocalSearchParams();

  const inspection = getInspectionById(id as string);

  if (!inspection) {
    return (
      <View style={styles.center}>
        <Text>Inspección no encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Inspección</Text>

      <InspectionForm
        mode="edit"
        inspection={inspection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});