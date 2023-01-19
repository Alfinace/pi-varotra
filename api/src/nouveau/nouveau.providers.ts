import { Nouveau } from './entities/nouveau.entity';
export const nouveauProviders = [
	{
		provide: 'NOUVEAU_REPOSITORY',
		useValue: Nouveau,
	},
];