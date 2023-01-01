export type TPlugJobResponse = {
  id: number;
  title: string;
  description: string;
  place: string;
  userId: number;
  phoneNumber: string;
  username: string;
  avatar: string;
};

export type TJobsState = {
  plugs: TPlugJobResponse[] | null;
};
