import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Theme } from "@/src/theme/theme";

type Props = {
  title: string;
  value: boolean | null;
  observation: string;
  onObservationChange: (text: string) => void;
  onChange: (value: boolean) => void;

  photo?: string;
  onAddPhoto?: () => void;
};

export default function ChecklistItem({
  title,
  value,
  observation,
  onObservationChange,
  onChange,
  photo,
  onAddPhoto,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.buttons}>

        <Pressable
         style={[
  styles.button,
  value === true && styles.successButton,
]}
          onPress={() => onChange(true)}
        >
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={value === true ? "#FFF" : Theme.colors.success}
          />

          <Text
  style={[
    styles.buttonText,
    value === true && styles.selectedText,
  ]}
>
  Cumple
</Text>
        </Pressable>

        <Pressable
          style={[
  styles.button,
  value === false && styles.dangerButton,
]}
          onPress={() => onChange(false)}
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={value === false ? "#FFF" : Theme.colors.danger}
          />

          <Text
  style={[
    styles.buttonText,
    value === false && styles.selectedText,
  ]}
>
  No cumple
</Text>
        </Pressable>

      </View>
      {value === false && (
  <>
    <TextInput
      style={styles.input}
      placeholder="Escriba la observación..."
      value={observation}
      onChangeText={onObservationChange}
      multiline
    />

    <Pressable
      style={styles.photoButton}
      onPress={onAddPhoto}
    >
      <Ionicons
        name="camera"
        size={20}
        color="#FFF"
      />

      <Text style={styles.photoButtonText}>
        Agregar fotografía
      </Text>
    </Pressable>

    {photo && (
      <Text style={styles.photoAdded}>
        ✓ Fotografía agregada
      </Text>
    )}
  </>
)}
    </View>
    
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },

  title: {
    fontSize: Theme.typography.body,
    fontWeight: "600",
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Theme.spacing.md,
  },

  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.md,
    paddingVertical: Theme.spacing.sm,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  successButton: {
    backgroundColor: Theme.colors.success,
    borderColor: Theme.colors.success,
  },

  dangerButton: {
    backgroundColor: Theme.colors.danger,
    borderColor: Theme.colors.danger,
  },

  buttonText: {
    marginLeft: 6,
    color: Theme.colors.text,
    fontWeight: "600",
  },

  selectedText: {
    color: "#FFF",
  },
  input: {
  marginTop: Theme.spacing.md,
  borderWidth: 1,
  borderColor: Theme.colors.border,
  borderRadius: Theme.radius.md,
  padding: Theme.spacing.md,
  minHeight: 80,
  color: Theme.colors.text,
  textAlignVertical: "top",
},
photoButton: {
  marginTop: Theme.spacing.md,
  backgroundColor: Theme.colors.primary,
  borderRadius: Theme.radius.md,
  padding: Theme.spacing.md,

  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
},

photoButtonText: {
  color: "#FFF",
  fontWeight: "600",
  marginLeft: Theme.spacing.sm,
},

photoAdded: {
  marginTop: Theme.spacing.sm,
  color: Theme.colors.success,
  fontWeight: "600",
},
});
