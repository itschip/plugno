import { TActiveJob, TPlugJobResponse } from "@typings/jobs";
import { API_URL } from "@utils/env";

export const fetchPlugJogs = async (): Promise<TPlugJobResponse[]> => {
  const res = await fetch(`${API_URL}/jobs/findPlugJobs`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  return response;
};

export const acceptPlugJob = async (jobId: number, plugId: number) => {
  const res = await fetch("http://localhost:6001/plugs/acceptJob", {
    method: "POST",
    body: JSON.stringify({ jobId, plugId }),
  });

  const response = await res.json();

  return response;
};

export const fetchActiveJobs = async (): Promise<TActiveJob> => {
  const res = await fetch("http://localhost:6001/jobs/getActiveJob");

  // TOOD: Error handling
  const response = await res.json();

  return response;
};
