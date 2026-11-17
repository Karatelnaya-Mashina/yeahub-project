import type { Question } from '@/entities/questions';

export interface QuestionNavigationProps {
	id: string | undefined;
	listQuestions: Question[];
}
