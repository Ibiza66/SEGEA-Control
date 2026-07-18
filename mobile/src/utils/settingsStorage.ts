import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "APP_SETTINGS";

export async function getSettings() {
  const data = await AsyncStorage.getItem(SETTINGS_KEY);

  if (data) {
    return JSON.parse(data);
  }

  return {
    notifications: true,
  };
}

export async function saveSettings(settings: any) {
  await AsyncStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(settings)
  );
}