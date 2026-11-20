import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { QuizMode, QuizParams } from './quizApi.types';

export const useFiltersQuiz = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const filters = useMemo(() => {
		const spec = searchParams.get('specializationId');
		const skills = searchParams.get('skills');
		const complexity = searchParams.get('complexity');

		return {
			limit: Number(searchParams.get('limit')) || 10,
			specializationId: spec ? spec.split(',').map(Number) : [],
			skills: skills ? skills.split(',').map(Number) : [],
			complexity: complexity ? complexity.split(',') : [],
			mode: (searchParams.get('mode') as QuizMode) || 'Случайные',
		} satisfies QuizParams;
	}, [searchParams]);

	const updateFiltersQuiz = useCallback(
		(partialFilters: QuizParams) => {
			const params = new URLSearchParams(searchParams);

			const map = {
				limit: 'limit',
				specializationId: 'specializationId',
				skills: 'skills',
				complexity: 'complexity',
				mode: 'mode',
			};

			type FilterKey = keyof typeof map;

			(Object.keys(partialFilters) as FilterKey[]).forEach(key => {
				const paramKey = map[key];
				if (!paramKey) return;
				params.delete(paramKey);
			});

			if (partialFilters.limit != null) {
				params.set('limit', String(partialFilters.limit));
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
			if (partialFilters.mode && partialFilters.mode !== 'Случайные') {
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
