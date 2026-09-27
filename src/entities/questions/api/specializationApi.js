import { baseApi } from '@/shared/api/baseApi';

export const specializationApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getSpecializations: builder.query({
			query: (params = {}) => {
				const { page = 1, limit = 100, ...filters } = params;
				return {
					url: 'specializations',
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

export const { useGetSpecializationsQuery } = specializationApi;
