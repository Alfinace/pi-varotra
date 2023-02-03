export interface Filter {
	range: { lower: number, upper: number },
	villes: string[],
	order: string,
	orderBy: string,
	keyWord?: string,
	categories: number[]
}