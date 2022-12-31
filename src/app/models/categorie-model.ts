import { Article } from "./article.model";
import { User } from "./user.model";

export interface Category {
	id?: number;
	name?: string;
	description?: string;
	articles?: Article[];
}