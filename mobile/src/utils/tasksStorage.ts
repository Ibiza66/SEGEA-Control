import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "TASKS";

export async function getTasks() {
  const data = await AsyncStorage.getItem(TASKS_KEY);

  if (data) {
    return JSON.parse(data);
  }

  return [];
}

export async function saveTasks(tasks: any[]) {
  await AsyncStorage.setItem(
    TASKS_KEY,
    JSON.stringify(tasks)
  );
}

export async function addTask(task: any) {
  const tasks = await getTasks();

  tasks.push(task);

  await saveTasks(tasks);
}
export async function deleteTask(id: string) {
  const tasks = await getTasks();

  const updatedTasks = tasks.filter((task: any) => task.id !== id);

  await saveTasks(updatedTasks);
}