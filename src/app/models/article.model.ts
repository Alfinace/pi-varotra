import { Store } from "./store-model";
import { User } from "./user.model";

export interface Article {
	id: number;
	designation: string;
	detail?: string;
	unitPrice?: number;
	store?: Store;
	stock?: number;
	createdAt?: string;
	updatedAt?: string;
	rate?: number;
	reviews?: number;
	categoryId?: any;
	images: any[];
	owner?: User;
}