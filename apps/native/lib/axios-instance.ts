import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@utils/env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("plug:access_token");

  config.headers.Authorization = `${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.response.config;
    const refreshToken = await AsyncStorage.getItem("plug:refresh_token");

    if (error.response.status === 401) {
      const { data } = await axios.get(`${API_URL}/refresh`, {
        headers: {
          Authorization: `${refreshToken}`,
        },
      });

      await AsyncStorage.setItem("plug:access_token", data.access_token);

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);
