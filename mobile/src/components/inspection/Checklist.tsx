import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  items: {
    id: string;
    descripcion: string;
    realizado: boolean;
  }[];

  onToggle: (id: string) => void;
};

export default function Checklist({
  items,
  onToggle,
}: Props) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Pressable
          key={item.id}
          style={styles.item}
          onPress={() => onToggle(item.id)}
        >
          <Ionicons
            name={
              item.realizado
                ? "checkbox"
                : "square-outline"
            }
            size={26}
            color={
              item.realizado
                ? "#16A34A"
                : "#777"
            }
          />

          <Text style={styles.text}>
            {item.descripcion}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },

  text: {
    marginLeft: 15,
    fontSize: 16,
    flex: 1,
  },
});