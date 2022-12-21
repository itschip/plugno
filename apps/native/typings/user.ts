export type UserResponse = {
  id_token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
  isSuccess: boolean;
};
