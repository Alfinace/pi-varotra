export interface Filter {
	range: { lower: number, upper: number },
	villes: string[],
	order: string,
	orderBy: string,
	categories: number[]
}