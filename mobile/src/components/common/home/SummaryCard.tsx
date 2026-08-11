import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Theme } from "@/src/theme/theme";

type Props = {
  inspections: number;
  expiring: number;
  approved: number;
};

export default function SummaryCard({
  inspections,
  expiring,
  approved,
}: Props) {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryColumn}>
        <Ionicons
          name="clipboard"
          size={24}
          color={Theme.colors.primary}
        />

        <Text style={styles.summaryNumber}>
          {inspections}
        </Text>

        <Text style={styles.summaryLabel}>
          Pendientes
        </Text>

        <View
          style={[
            styles.summaryLine,
            {
              backgroundColor: Theme.colors.primary,
            },
          ]}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryColumn}>
        <Ionicons
          name="warning"
          size={24}
          color={Theme.colors.warning}
        />

        <Text style={styles.summaryNumber}>
          {expiring}
        </Text>

        <Text style={styles.summaryLabel}>
          Por vencer
        </Text>

        <View
          style={[
            styles.summaryLine,
            {
              backgroundColor: Theme.colors.warning,
            },
          ]}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryColumn}>
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={Theme.colors.success}
        />

        <Text style={styles.summaryNumber}>
          {approved}
        </Text>

        <Text style={styles.summaryLabel}>
          Aprobadas
        </Text>

        <View
          style={[
            styles.summaryLine,
            {
              backgroundColor: Theme.colors.success,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: Theme.colors.surface,

    borderRadius: Theme.radius.lg,

    paddingVertical: Theme.spacing.md,

    marginBottom: Theme.spacing.lg,

    ...Theme.shadows.md,
  },

  summaryColumn: {
    flex: 1,
    alignItems: "center",
  },

  summaryNumber: {
    fontSize: Theme.typography.screenTitle,
    fontWeight: "800",
    color: Theme.colors.primary,
    marginTop: Theme.spacing.sm,
  },

  summaryLabel: {
    fontSize: Theme.typography.overline,
    color: Theme.colors.textSecondary,
    fontWeight: "600",
    marginTop: Theme.spacing.xs,
  },

  summaryLine: {
    marginTop: Theme.spacing.md,
    width: 40,
    height: 4,
    borderRadius: 2,
  },

  divider: {
    width: 1,
    height: 55,
    backgroundColor: Theme.colors.border,
  },
});