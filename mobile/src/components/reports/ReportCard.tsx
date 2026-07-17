import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  value: number | string;
};

export default function ReportCard({
  title,
  value,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: "48%",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },

  value: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#005A9C",
  },

  title: {
    marginTop: 8,
    textAlign: "center",
    color: "#555",
  },
});