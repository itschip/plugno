export type UserResponse = {
  id_token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
  isSuccess: boolean;
};

export type User = {
  id: number;
  username: string;
  email: string;
};

export type AuthState = {
  user: User | null;
};
