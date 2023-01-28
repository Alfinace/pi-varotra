export interface User {
	position: any;
	id?: number;
	user?: string;
	username?: string;
	gender?: string;
	avatar?: string;
	firstname?: string;
	lastname?: string;
	createdAt?: string;
	updatedAt?: string;
	rate?: number;
	reviews?: number;
	category?: any;
	socialNetwork?: any[],
	images?: any;
	owner?: any;
	contact?: string;
	// publicKey?: string;
	birthday?: string;
	role?: string;
	address?: string;
	postalCode?: string;
	verifiedEmail?: boolean;
	city?: string;
	payments?: any;
	confirmCodeEmail?: string;
}