export interface AuthResult {
	accessToken: string;
	user: {
		uid: string,
		username: string
	}
}