import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { QuestionsParams } from '../';
import type { QuestionsStatus } from '../';

export const useFiltersItems = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const filters = useMemo(() => {
		const spec = searchParams.get('specializationId');
		const skills = searchParams.get('skills');
		const rate = searchParams.get('rate');
		const complexity = searchParams.get('complexity');

		return {
			page: Number(searchParams.get('page')) || 1,
			limit: Number(searchParams.get('limit')) || 10,
			title: searchParams.get('title') ?? '',
			specializationId: spec ? spec.split(',').map(Number) : [],
			skills: skills ? skills.split(',').map(Number) : [],
			complexity: complexity ? complexity.split(',') : [],
			rate: rate ? rate.split(',').map(Number) : [],
			status: (searchParams.get('status') as QuestionsStatus) ?? 'Все',
		} satisfies QuestionsParams;
	}, [searchParams]);

	const updateFilters = useCallback(
		(partialFilters: QuestionsParams) => {
			const params = new URLSearchParams(searchParams);

			const map = {
				search: 'title',
				specializationId: 'specializationId',
				skills: 'skills',
				complexity: 'complexity',
				rate: 'rate',
				status: 'status',
			} as const;

			type FilterKey = keyof typeof map;

			(Object.keys(partialFilters) as FilterKey[]).forEach(key => {
				const paramKey = map[key];
				if (!paramKey) return;
				params.delete(paramKey);
			});

			params.set('page', '1');

			if (partialFilters.search?.trim()) {
				params.set('title', partialFilters.search.trim());
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

	return {
		filters,
		updateFilters,
		handleResetFilters,
	};
};
