import type { Skill } from '@/entities/questions';

export type Created = {
	id: string;
	username: string;
};

export interface QuestionInfoProps {
	complexity: number;
	rate: number;
	skills: Skill[];
	keywords: string[];
	createdBy: Created;
}
