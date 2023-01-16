import AsyncStorage from "@react-native-async-storage/async-storage";
import { TActiveJob, TPlugJobResponse } from "@typings/jobs";
import { API_URL } from "@utils/env";

export const fetchPlugJogs = async (): Promise<TPlugJobResponse[]> => {
  const idToken = await AsyncStorage.getItem("plug:access_token");

  const res = await fetch(`${API_URL}/jobs/findPlugJobs`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${idToken}`,
    },
  });

  const response = await res.json();

  return response;
};

export const acceptPlugJob = async (jobId: number, plugId: number) => {
  const res = await fetch(`${API_URL}/plugs/acceptJob`, {
    method: "POST",
    body: JSON.stringify({ jobId, plugId }),
  });

  const response = await res.json();

  return response;
};

export const fetchActiveJobs = async (): Promise<TActiveJob> => {
  const res = await fetch(`${API_URL}/jobs/getActiveJob`);

  // TOOD: Error handling
  const response = await res.json();

  return response;
};
