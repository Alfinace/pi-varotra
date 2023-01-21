import { Rate } from "./entities/rate.entity";

export const rateProviders = [
	{
		provide: 'RATE_REPOSITORY',
		useValue: Rate,
	},
];