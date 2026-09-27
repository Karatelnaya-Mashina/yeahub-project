import { baseApi } from '@/shared/api/baseApi';

export const skillApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getSkills: builder.query({
			query: (params = {}) => {
				const { page = 1, limit = 100, ...filters } = params;
				return {
					url: 'skills',
					params: {
						page,
						limit,
						...filters,
					},
				};
			},
		}),
	}),
});

export const { useGetSkillsQuery } = skillApi;
