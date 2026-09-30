import { baseApi } from '@/shared/api/baseApi';

export const detailApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getQuestionId: builder.query({
			query: id => {
				return { url: `/questions/public-questions/${id}` };
			},
		}),
	}),
});

export const { useGetQuestionIdQuery, useLazyGetQuestionIdQuery } = detailApi;
