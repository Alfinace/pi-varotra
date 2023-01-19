import { User } from "./user.model";

export interface New {
	id?: number;
	title: string;
	detail: string;
	image?: string;
	subtitle: string;
	createdAt?: string;
	updatedAt?: string;
	author?: User;
}