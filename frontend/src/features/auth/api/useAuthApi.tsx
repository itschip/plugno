export const useAuthApi = () => {
	const loginUser = async (email: string, password: string) => {};

	const createUser = async ({ username, email, password, confirmPassword }) => {};

	return {
		loginUser,
		createUser,
	};
};
