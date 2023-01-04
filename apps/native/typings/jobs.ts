export type TPlugJobResponse = {
  id: number;
  title: string;
  description: string;
  place: string;
  userId: number;
  phoneNumber: string;
  username: string;
  avatar: string;
  isAccepted: boolean;
};

export type TActiveJob = {
  id: number;
  jobId: number;
  createdAt: string;
  updatedAt: string;
  status: "accepted";
  title: string;
  description: string;
  username: string;
  avatar: string;
};

export type TJobsState = {
  plugs: TPlugJobResponse[] | null;
};
