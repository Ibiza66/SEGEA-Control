import AsyncStorage from "@react-native-async-storage/async-storage";

import { tasks } from "../data/tasks";
import { Task } from "../types/Task";

const STORAGE_KEY = "tasks";

async function saveTasks() {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
}

export async function loadTasks() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  if (data) {
    const saved: Task[] = JSON.parse(data);

    tasks.length = 0;

    tasks.push(
      ...saved.map(task => ({
        ...task,
        fechaCreacion: new Date(task.fechaCreacion),
        fechaLimite: new Date(task.fechaLimite),
      }))
    );
  } else {
    await saveTasks();
  }
}

export function getTasks() {
  return tasks;
}

export function getTaskById(id: string) {
  return tasks.find(task => task.id === id);
}

export async function addTask(task: Task) {
  tasks.push(task);

  await saveTasks();
}

export async function updateTask(task: Task) {
  const index = tasks.findIndex(
    t => t.id === task.id
  );

  if (index !== -1) {
    tasks[index] = task;

    await saveTasks();
  }
}

export async function deleteTask(id: string) {
  const index = tasks.findIndex(
    t => t.id === id
  );

  if (index !== -1) {
    tasks.splice(index, 1);

    await saveTasks();
  }
}