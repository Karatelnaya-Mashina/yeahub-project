import type { Question } from '@/entities/questions';
import type {
	QuizAnswer,
	QuizParams,
} from '@/entities/quiz/model/quizApi.types';

export interface QuizSession {
	filters?: QuizParams;
	answers: QuizAnswer[];
	questions: Question[];
	start?: number;
	finish?: number;
}

export interface QuizState {
	sessions: Record<string, QuizSession>;
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
	answers?: QuizAnswer[];
	questions?: Question[];
}
