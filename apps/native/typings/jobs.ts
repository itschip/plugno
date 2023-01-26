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
  status: string;
  tracking_status: {
    accepted: boolean;
    in_transit: boolean;
    active: boolean;
    completed: boolean;
  };
  title: string;
  description: string;
  username: string;
  avatar: string;
  requestStatus: string;
};

export type TJobsState = {
  plugs: TPlugJobResponse[] | null;
};

export type TAcceptedJob = {
  jobId: number;
  plugId: number;
  status: string;
  updatedAt: string;
  createdAt: string;
  userId: number;
  title: string;
  requestType: string;
  plugAvatar: string;
};
