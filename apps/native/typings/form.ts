export type RegisterFormData = {
  role: "plug" | "user";
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
