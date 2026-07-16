import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: {
    label: string;
    value: string;
  }[];
};

export default function AppSelect({
  label,
  value,
  onValueChange,
  items,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.selectContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>

        <Ionicons
          name="chevron-down"
          size={20}
          color="#666"
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },

  selectContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },

  picker: {
    height: 55,
  },

  icon: {
    position: "absolute",
    right: 15,
    top: 17,
  },
});
