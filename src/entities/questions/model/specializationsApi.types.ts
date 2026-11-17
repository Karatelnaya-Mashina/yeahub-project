export interface Specialization {
	id: number;
	title: string;
	description: string;
	slug: string;
	imageSrc: string;
}

export interface SpecializationResponse {
	data: Specialization[];
	limit: number;
	page: number;
	total: number;
}
