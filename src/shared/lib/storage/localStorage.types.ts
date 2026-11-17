import type { Question } from '@/entities/questions';

export interface QuizSession {
	answers: { id: number; answer: string }[];
	questions: Question[];
}

export interface QuizStorageData {
	version: number;
	answers: { id: number; answer: string }[];
	questions: Question[];
	sessions: Record<string, QuizSession>;
	activeSessionId: string | null;
}

export interface QuizSaveStorageValue {
	activeSessionId: string;
	sessions: Record<string, QuizSession>;
}
