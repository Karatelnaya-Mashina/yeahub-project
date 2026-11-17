import { useGetQuizQuestionsQuery } from '../api/quizApi';
import { useFiltersQuiz } from './useFiltersQuiz';

export const useQuiz = () => {
	const { filters } = useFiltersQuiz();

	const {
		data: filteredQuiz,
		isLoading,
		error,
	} = useGetQuizQuestionsQuery(filters);

	return {
		filteredQuiz,
		isLoading,
		error,
	};
};
