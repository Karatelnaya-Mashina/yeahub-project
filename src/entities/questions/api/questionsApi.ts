import { baseApi } from '@/shared/api/baseApi';
import type { QuestionResponse, QuestionsParams } from '@/shared/types';

export const questionsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getQuestions: builder.query<QuestionResponse, QuestionsParams | void>({
			query: params => {
				const {
					page = 1,
					limit = 10,
					title = '',
					specializationId = [],
					skills = [],
					complexity = [],
					rate = [],
					status = 'Все',
				} = params ?? {};

				const queryParams: QuestionsParams = { page, limit };
				if (title?.trim()) queryParams.title = title.trim();
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
