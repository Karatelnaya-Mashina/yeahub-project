import type { Question } from '@/entities/questions';
import type { QuizAnswer } from '@/entities/quiz/model/quizApi.types';
import type { QuizSession } from '@/shared/lib/storage/localStorage.types';

export interface Initial {
	activeSessionId: string | null;
	answers: QuizAnswer[];
	questions: Question[];
	sessions: Record<string, QuizSession>;
	version?: number;
}
