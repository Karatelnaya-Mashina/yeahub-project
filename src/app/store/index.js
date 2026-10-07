import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { quizReducer } from '@/features/quiz/quizSlice';

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		quiz: quizReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(baseApi.middleware),
});
