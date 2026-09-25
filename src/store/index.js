import { configureStore } from '@reduxjs/toolkit';
import { questionsApi } from '../features/questions/questionsApi';
import { quizApi } from '../features/quiz/quizApi';

export const store = configureStore({
	reducer: {
		[questionsApi.reducerPath]: questionsApi.reducer,
		[quizApi.reducerPath]: quizApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(questionsApi.middleware)
			.concat(quizApi.middleware),
});
