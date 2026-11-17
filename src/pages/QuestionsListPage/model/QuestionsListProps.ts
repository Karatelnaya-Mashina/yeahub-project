import type { Question } from '../../../entities/questions/model/questionsApi.types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export interface QuestionListProps {
	questions: Question[] | undefined;
	total: number | undefined;
	loading: boolean;
	error?: FetchBaseQueryError | SerializedError;
	onRetry: () => void;
	onReset: () => void;
	currentPage: number;
	onPageChange: (value: number) => void;
	openModal: () => void;
}
