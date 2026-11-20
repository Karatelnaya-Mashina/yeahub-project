import type { Question } from '@/entities/questions';

export type QuizMode = 'Случайные' | 'Повторение' | 'Только новые';

export interface QuizParams {
	limit?: number;
	specializationId?: number[];
	skills?: number[];
	complexity?: number[] | string[];
	mode?: QuizMode;
	sessionId?: string;
}

export type QuizAnswer = {
	id: number;
	answer: string;
};

export interface QuizResponse {
	limit: number;
	questions: Question[];
	response: {
		answers: QuizAnswer;
		startDate: string;
	};
	page: number;
	total?: number;
}
