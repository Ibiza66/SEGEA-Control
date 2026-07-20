import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  getTasks,
  loadTasks,
  deleteTask,
} from "../../src/services/task.service";
export default function TasksScreen() {
  const [tasks, setTasks] = useState<any[]>([]);

  useFocusEffect(
  useCallback(() => {

    async function loadData() {

      await loadTasks();

      const data = getTasks();

      setTasks(data);

    }

    loadData();

  }, [])
);
  async function removeTask(id: string) {
  Alert.alert(
    "Eliminar tarea",
    "¿Estás seguro de que deseas eliminar esta tarea?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await deleteTask(id);

         

await loadTasks();

setTasks(getTasks());
        },
      },
    ]
  );
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas</Text>

      <Text style={styles.subtitle}>
        Administra las tareas de mantenimiento de la flota.
      </Text>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="clipboard-outline"
            size={70}
            color="#94A3B8"
          />

          <Text style={styles.emptyTitle}>
            No hay tareas registradas
          </Text>

          <Text style={styles.emptyText}>
            Presiona el botón + para crear tu primera tarea.
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.taskTitle}>
        {item.titulo}
      </Text>

      <Pressable onPress={() => removeTask(item.id)}>
        <Ionicons
          name="trash-outline"
          size={22}
          color="#DC2626"
        />
      </Pressable>
    </View>

    <Text style={styles.info}>
      👤 Responsable: {item.asignadoA}
    </Text>

    <Text style={styles.info}>
      📅 Fecha límite:{" "}
      {new Date(item.fechaLimite).toLocaleDateString()}
    </Text>

    <Text style={styles.priority}>
      Prioridad: {item.prioridad}
    </Text>

    <Text style={styles.info}>
      Estado: {item.estado}
    </Text>

    {item.descripcion ? (
      <Text style={styles.info}>
        📝 {item.descripcion}
      </Text>
    ) : null}
  </View>
)}
        />
      )}

      <Pressable
        style={styles.fab}
        onPress={() => router.push("/add-task")}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1E293B",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 15,
    color: "#1E293B",
  },

  emptyText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 8,
    paddingHorizontal: 30,
  },
header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#005A9C",
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 4,
  },

  priority: {
    marginTop: 8,
    fontWeight: "600",
    color: "#DC2626",
  },

  fab: {
    position: "absolute",
    right: 25,
    bottom: 110,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#005A9C",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});