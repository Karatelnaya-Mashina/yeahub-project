import { baseApi } from '@/shared/api/baseApi';

export const quizApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getQuizQuestion: builder.query({
			query: (params = {}) => {
				const {
					limit = 10,
					specializationId = [],
					skills = [],
					complexity = [],
					mode = 'Случайные',
				} = params;

				const queryParams = { mode };
				if (limit) queryParams.limit = limit;
				if (specializationId?.length)
					queryParams.specializationId = specializationId;
				if (skills?.length) queryParams.skills = skills;
				if (complexity?.length) queryParams.complexity = complexity;
				if (mode?.length) queryParams.mode = mode;

				return {
					url: 'interview-preparation/quizzes/mock/new',
					params: queryParams,
				};
			},
		}),
	}),
});

export const { useGetQuizQuestionQuery } = quizApi;
