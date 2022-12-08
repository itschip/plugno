import { User } from './user';

export interface Job {
	id: number;
	title: string;
	shortDescription: string;
	description: string;
	userId: string;
	askingPrice: number;
	location: number;
	locationName: string;
	createdAt: string;
}

export interface DetailedJob extends Omit<User, 'id'> {
	id: number;
	title: string;
	shortDescription: string;
	description: string;
	userId: string;
	askingPrice: number;
	location: number;
}
