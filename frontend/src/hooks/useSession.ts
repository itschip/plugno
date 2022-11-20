import { pocketBaseClient } from '../lib/pocketbase';

export const useSession = () => {
	const userModel = pocketBaseClient.authStore.model;

	return {
		authenticated: !!userModel?.email,
		data: userModel ?? null,
	};
};
