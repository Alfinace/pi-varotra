import { Pub } from "./entities/pub.entity";

export const pubProviders = [
	{
		provide: 'PUB_REPOSITORY',
		useValue: Pub,
	},
];