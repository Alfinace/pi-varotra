import { Article } from "./article.model";
import { User } from "./user.model";

export interface Store {
	id?: number;
	name?: string;
	logo?: string;
  long?: number;
  lat?: number;
	address: string;
	city: string,
	contact?: string,
	status?: string,
	userId?: number,
	user: User,
	articles: Article[],
	createdAt?: string
}
