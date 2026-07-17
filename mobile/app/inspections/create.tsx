import { StyleSheet, Text, View } from "react-native";

import InspectionForm from "../../src/components/inspection/InspectionForm";

export default function CreateInspectionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Inspección</Text>

      <InspectionForm mode="create" />
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
});