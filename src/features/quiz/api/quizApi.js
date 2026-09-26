import { baseApi } from '../../../shared/api/baseApi';

export const quizApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getQuizQuestion: builder.query({
			query: () => ({
				url: 'interview-preparation/quizzes/mock/new',
			}),
		}),
	}),
});

export const { useGetQuizQuestionQuery } = quizApi;
