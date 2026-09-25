import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetQuestionsQuery } from '../features/questions/questionsApi';

export const useDataQuestions = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const filters = useMemo(
		() => ({
			page: searchParams.get('page') || 1,
			limit: searchParams.get('limit') || 10,
			title: searchParams.get('search') || '',
			titleOrDescription: searchParams.get('search') || '',
			specializationId: searchParams.get('specializationId')
				? searchParams.get('specializationId').split(',').map(Number)
				: [],
			skills: searchParams.get('skills')
				? searchParams.get('skills').split(',').map(Number)
				: [],
			complexity: searchParams.get('complexity')?.split(',') || [],
			rate: searchParams.get('rate')
				? searchParams.get('rate').split(',').map(Number)
				: [],
			status: searchParams.get('status') || 'Все',
		}),
		[searchParams],
	);

	const {
		data: filteredQuestions,
		isLoading: initialLoading,
		error,
	} = useGetQuestionsQuery(filters);

	const updateFilters = useCallback(
		partialFilters => {
			const params = new URLSearchParams(searchParams);

			const map = {
				search: 'search',
				specializationId: 'specializationId',
				skills: 'skills',
				complexity: 'complexity',
				rate: 'rate',
				status: 'status',
			};

			Object.entries(partialFilters).forEach(([key, value]) => {
				const paramKey = map[key];
				if (!paramKey) return;
				params.delete(paramKey);
			});

			params.set('page', '1');

			if (partialFilters.search?.trim()) {
				params.set('search', partialFilters.search.trim());
			}
			if (partialFilters.specializationId?.length) {
				params.set(
					'specializationId',
					partialFilters.specializationId.join(','),
				);
			}
			if (partialFilters.skills?.length) {
				params.set('skills', partialFilters.skills.join(','));
			}
			if (partialFilters.complexity?.length) {
				params.set('complexity', partialFilters.complexity.join(','));
			}
			if (partialFilters.rate?.length) {
				params.set('rate', partialFilters.rate.join(','));
			}
			if (partialFilters.status && partialFilters.status !== 'Все') {
				params.set('status', partialFilters.status);
			}

			setSearchParams(params, { replace: true });
		},
		[searchParams, setSearchParams],
	);

	const handleResetFilters = useCallback(() => {
		setSearchParams({ page: '1' });
	}, [setSearchParams]);

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
		filters,
		listQuestionsData,
		updateFilters,
		handleResetFilters,
	};
};
