import { useMemo } from 'react';
import { useGetQuestionsQuery } from '../api/questionsApi';
import { useFiltersItems } from './useFiltersItems';

export const useQuestions = () => {
	const { filters } = useFiltersItems();

	const {
		data: filteredQuestions,
		isLoading: initialLoading,
		error,
	} = useGetQuestionsQuery(filters);

	const listQuestionsData = useMemo(
		() => ({
			quest: filteredQuestions,
		}),
		[filteredQuestions],
	);

	return {
		filteredQuestions: filteredQuestions?.data,
		total: filteredQuestions?.total,
		initialLoading,
		error: error?.data,
		listQuestionsData,
	};
};
