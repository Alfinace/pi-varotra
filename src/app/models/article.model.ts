import { User } from "./user.model";

export interface Article {
	id?: number;
	designation?: string;
	detail?: string;
	unitPrice?: number;
	stock?: number;
	createdAt?: string;
	updatedAt?: string;
	rate?: number;
	reviews?: number;
	category?: any;
	images: any[];
	owner?: User;
}