import Constanst from "expo-constants";
import { cancelAllScheduledNotificationsAsync } from "expo-notifications";

export const API_URL = Constanst?.expoConfig?.extra?.apiUrl;

export const WEBSOCKET_URL = Constanst?.expoConfig?.extra?.websocketUrl;
