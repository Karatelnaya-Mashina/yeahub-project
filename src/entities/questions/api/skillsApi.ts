import { baseApi } from '@/shared/api/baseApi';
import type { SkillResponse } from '../';

export const skillsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getSkills: builder.query<SkillResponse, void>({
			query: () => ({
				url: 'skills',
			}),
		}),
	}),
});

export const { useGetSkillsQuery, useLazyGetSkillsQuery } = skillsApi;
