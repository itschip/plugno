export type User = {
	id: number;
	username: string;
	email: string;
};

export type AuthState = {
	user: User | null;
};

export type UserResponse = {
	isSuccess: boolean;
	user: User;
};
