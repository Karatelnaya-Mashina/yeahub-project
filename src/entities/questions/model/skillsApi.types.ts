export interface Skill {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
}

export interface SkillResponse {
	data: Skill[];
	limit: number;
	page: number;
	total: number;
}
