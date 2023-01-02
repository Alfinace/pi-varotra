import { Article } from "./article.model";
import { User } from "./user.model";

export interface Store {
	id?: number;
	name?: string;
	logo?: string;
	address?: string;
	city?: string,
	contact?: string,
	status?: string,
	images?: string,
	userId?: number,
	createdAt?: string
}