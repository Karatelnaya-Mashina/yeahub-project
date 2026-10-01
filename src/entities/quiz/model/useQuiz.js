import { useGetQuizQuestionQuery } from '../api/quizApi';
import { useFiltersQuiz } from './useFiltersQuiz';

export const useQuiz = () => {
	const { filters } = useFiltersQuiz();

	const {
		data: filteredQuiz,
		isLoading,
		error,
	} = useGetQuizQuestionQuery(filters);

	return {
		filteredQuiz,
		isLoading,
		error,
	};
};
