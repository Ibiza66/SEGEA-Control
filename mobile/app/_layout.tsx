import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { loadVehicles } from "../src/services/vehicle.service";
import { loadMembers } from "../src/services/member.service";
import { loadTasks } from "../src/services/task.service";

export default function RootLayout() {
  useEffect(() => {
    async function initializeData() {
      await loadVehicles();
      await loadMembers();
      await loadTasks();
    }

    initializeData();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </>
  );
}