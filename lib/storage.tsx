import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

async function getItem(key: string) {
  if (Platform.OS === "web") return AsyncStorage.getItem(key);
  return SecureStore.getItemAsync(key);
}
async function setItem(key: string, value: string) {
  if (Platform.OS === "web") return AsyncStorage.setItem(key, value);
  return SecureStore.setItemAsync(key, value);
}
async function deleteItem(key: string) {
  if (Platform.OS === "web") return AsyncStorage.removeItem(key);
  return SecureStore.deleteItemAsync(key);
}

export const storage = { getItem, setItem, deleteItem };