import type { Skill } from './skillsApi.types';
import type { Specialization } from './specializationsApi.types';

export type QuestionsStatus = 'Все' | 'Изученные' | 'Не изученные';

export interface QuestionsParams {
	search?: string;
	page?: number;
	limit?: number;
	title?: string;
	specializationId?: number[];
	skills?: (number | string)[];
	complexity?: string[];
	rate?: number[];
	status?: QuestionsStatus;
}

export interface Question {
	id: number;
	title: string;
	description: string;
	questionSpecializations: Specialization[];
	questionSkills: Skill[];
	complexity: string;
	rate: number;
	status: QuestionsStatus;
	shortAnswer: string;
	code: string | null;
	imageSrc: string | null;
}

export interface QuestionResponse {
	data: Question[];
	limit: number;
	page: number;
	total: number;
}
