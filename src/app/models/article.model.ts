import { Store } from "./store-model";
import { User } from "./user.model";

export interface Article {
	id: number;
	designation: string;
	detail?: string;
	unitPrice?: number;
	store: Store;
	stock: number;
	slug: string;
	createdAt?: string;
	updatedAt?: string;
	rate?: any;
	categoryId?: any;
	images: any[];
}