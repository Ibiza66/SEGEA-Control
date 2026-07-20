import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { getNotifications } from "../../src/services/notification.service";
import { Notification } from "../../src/types/notification";
export default function NotificationsTab() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

useEffect(() => {
  async function load() {
    const data = await getNotifications();
    setNotifications(data);
  }

  load();
}, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔔 Avisos</Text>

      <Text style={styles.subtitle}>
        Mantente informado sobre eventos importantes de la empresa.
      </Text>
{notifications.length === 0 ? (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>
      🎉 Todo está al día
    </Text>

    <Text style={styles.cardText}>
      No existen avisos pendientes.
    </Text>
  </View>
) : (
  notifications.map((notification) => (
    <View
      key={notification.id}
      style={[
        styles.card,
        notification.type === "critical"
          ? styles.redCard
          : notification.type === "urgent"
            ? styles.orangeCard
            : styles.yellowCard,
      ]}
    >
      <Text style={styles.cardTitle}>
        {notification.icon} {notification.title}
      </Text>

      <Text style={styles.cardText}>
        {notification.description}
      </Text>

      <Text style={styles.cardDate}>
        {notification.daysRemaining <= 0
          ? `Vencido hace ${Math.abs(notification.daysRemaining)} días`
          : `Faltan ${notification.daysRemaining} días`}
      </Text>
    </View>
  ))
)}
      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    marginBottom: 25,
  },

  section: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 15,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 8,
    elevation: 2,
  },

  redCard: {
    borderLeftColor: "#DC2626",
  },

  orangeCard: {
    borderLeftColor: "#EA580C",
  },

  yellowCard: {
    borderLeftColor: "#EAB308",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  cardText: {
    fontSize: 16,
    marginTop: 8,
  },

  cardDate: {
    fontSize: 15,
    color: "#666",
    marginTop: 10,
  },
});