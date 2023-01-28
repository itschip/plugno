import Constanst from "expo-constants";

export const API_URL: string = Constanst?.expoConfig?.extra?.apiUrl;
export const WEBSOCKET_URL: string = Constanst?.expoConfig?.extra?.websocketUrl;
export const GOOGLE_PLACES_API: string =
  Constanst?.expoConfig?.extra?.googlePlacesApi;

export const CLERK_PUBLISHABLE_KEY =
  Constanst?.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY;
