import { TPlugJobResponse } from "@typings/jobs";

export const fetchPlugJogs = async (): Promise<TPlugJobResponse[]> => {
  const res = await fetch("http://localhost:6001/jobs/findPlugJobs", {
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