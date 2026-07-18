import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackground: string;
  onPress: () => void;
};
export default function DashboardCard({
  title,
  description,
  icon,
  iconColor,
  iconBackground,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#E3F2FD" }}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.left}>
        <View
  style={[
    styles.iconContainer,
    { backgroundColor: iconBackground },
  ]}
>
          <Ionicons
  name={icon}
  size={22}
  color={iconColor}
/>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.description}>
            {description}
          </Text>
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={24}
        color="#005A9C"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 88,

    backgroundColor: "#FFF",
    borderRadius: 18,

    paddingHorizontal: 18,
    paddingVertical: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EAF4FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },

  description: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
  },
});