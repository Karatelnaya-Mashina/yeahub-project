import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quizApi = createApi({
	reducerPath: 'quizApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.yeatwork.ru/',
		prepareHeaders: headers => {
			headers.set('Content-type', 'application/json');
			return headers;
		},
	}),
	endpoints: builder => ({
		getQuizQuestion: builder.query({
			query: () => ({
				url: 'interview-preparation/quizzes/mock/new',
			}),
		}),
	}),
});

export const { useGetQuizQuestionQuery } = quizApi;
