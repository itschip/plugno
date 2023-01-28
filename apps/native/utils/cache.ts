import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToken(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function getToken(key: string) {
  return await AsyncStorage.getItem(key);
}

export const tokenCache = {
  saveToken,
  getToken,
};
