import { Store } from "./store-model";
import { User } from "./user.model";

export interface Order {
	id?: number;
	totalAmount: number,
	deliverieInfo?: string,
	articles: { id: number, quantity: number, unitPrice: number }[];
}