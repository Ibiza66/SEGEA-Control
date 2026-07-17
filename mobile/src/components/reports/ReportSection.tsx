import { StyleSheet, Text, View } from "react-native";

type Item = {
  title: string;
  subtitle?: string;
};

type Props = {
  title: string;
  items: Item[];
};

export default function ReportSection({
  title,
  items,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {items.length === 0 ? (
        <Text style={styles.empty}>
          No hay información disponible.
        </Text>
      ) : (
        items.map((item, index) => (
          <View
            key={index}
            style={styles.item}
          >
            <Text style={styles.itemTitle}>
              {item.title}
            </Text>

            {item.subtitle && (
              <Text style={styles.itemSubtitle}>
                {item.subtitle}
              </Text>
            )}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 18,
    marginTop: 20,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  itemSubtitle: {
    color: "#666",
    marginTop: 3,
  },

  empty: {
    color: "#888",
    fontStyle: "italic",
  },
});