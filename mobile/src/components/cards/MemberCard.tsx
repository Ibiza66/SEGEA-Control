import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  nombre: string;
  cargo: string;
  foto?: string;
  onPress: () => void;
};

export default function MemberCard({
  nombre,
  cargo,
  foto,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.photo} />
        ) : (
          <Ionicons name="person-circle" size={65} color="#005A9C" />
        )}

        <View style={styles.info}>
          <Text style={styles.name}>{nombre}</Text>
          <Text style={styles.role}>{cargo}</Text>
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#999"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  photo: {
    width: 65,
    height: 65,
    borderRadius: 35,
    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  role: {
    marginTop: 4,
    fontSize: 15,
    color: "#666",
  },
});