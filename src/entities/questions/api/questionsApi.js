import { baseApi } from '@/shared/api/baseApi';

export const questionsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getQuestions: builder.query({
			query: (params = {}) => {
				const {
					page = 1,
					limit = 10,
					title = '',
					titleOrDescription = '',
					specializationId = [],
					skills = [],
					complexity = [],
					rate = [],
					status = 'Все',
				} = params;

				const queryParams = { page, limit };
				if (title?.trim()) queryParams.title = title.trim();
				if (titleOrDescription?.trim())
					queryParams.titleOrDescription = titleOrDescription.trim();
				if (specializationId?.length)
					queryParams.specializationId = specializationId;
				if (skills?.length) queryParams.skills = skills;
				if (complexity?.length) queryParams.complexity = complexity;
				if (rate?.length) queryParams.rate = rate;
				if (status && status !== 'Все') queryParams.status = status;

				return {
					url: 'questions/public-questions',
					params: queryParams,
				};
			},
		}),
	}),
});

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery } = questionsApi;

// getSpecializations: builder.query({
// 			query: (params = {}) => {
// 				const { page = 1, limit = 100, ...filters } = params;
// 				return {
// 					url: 'specializations',
// 					params: {
// 						page,
// 						limit,
// 						...filters,
// 					},
// 				};
// 			},
// 		}),
// 		getSkills: builder.query({
// 			query: (params = {}) => {
// 				const { page = 1, limit = 100, ...filters } = params;
// 				return {
// 					url: 'skills',
// 					params: {
// 						page,
// 						limit,
// 						...filters,
// 					},
// 				};
// 			},
// 		}),
// 		getQuestionId: builder.query({
// 			query: id => {
// 				return { url: `/questions/public-questions/${id}` };
// 			},
// 		}),
