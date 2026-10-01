import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useFiltersQuiz = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const filters = useMemo(
		() => ({
			specializationId: searchParams.get('specializationId')
				? searchParams.get('specializationId').split(',').map(Number)
				: [],
			skills: searchParams.get('skills')
				? searchParams.get('skills').split(',').map(Number)
				: [],
			complexity: searchParams.get('complexity')?.split(',') || [],
			mode: searchParams.get('mode') || 'Случайные',
		}),
		[searchParams],
	);
	const updateFiltersQuiz = useCallback(
		partialFilters => {
			const params = new URLSearchParams(searchParams);

			const map = {
				specializationId: 'specializationId',
				skills: 'skills',
				complexity: 'complexity',
				mode: 'mode',
			};

			Object.entries(partialFilters).forEach(([key, value]) => {
				const paramKey = map[key];
				if (!paramKey) return;
				params.delete(paramKey);
			});

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
			if (partialFilters.mode && partialFilters.mode !== 'Все') {
				params.set('mode', partialFilters.mode);
			}

			setSearchParams(params, { replace: true });
		},
		[searchParams, setSearchParams],
	);
	return {
		filters,
		updateFiltersQuiz,
	};
};
