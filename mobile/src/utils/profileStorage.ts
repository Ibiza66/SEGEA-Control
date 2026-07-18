import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "USER_PROFILE";

export async function saveProfile(profile: any) {
  await AsyncStorage.setItem(
    PROFILE_KEY,
    JSON.stringify(profile)
  );
}

export async function getProfile() {
  const data = await AsyncStorage.getItem(PROFILE_KEY);

  if (data) {
    return JSON.parse(data);
  }

  return {
    name: "Administrador",
    email: "admin@segea.cl",
    position: "Administrador",
  };
}