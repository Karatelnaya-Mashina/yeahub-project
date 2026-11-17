import { baseApi } from '@/shared/api/baseApi';
import type { SpecializationResponse } from '@/shared/types';

export const specializationApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getSpecializations: builder.query<SpecializationResponse, void>({
			query: () => ({
				url: 'specializations',
			}),
		}),
	}),
});

export const { useGetSpecializationsQuery, useLazyGetSpecializationsQuery } =
	specializationApi;
