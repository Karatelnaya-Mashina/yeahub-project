import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	answers: {},
	questions: [],
};

const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		saveResult: (state, action) => {
			const { answers, questions } = action.payload;
			if (!questions?.length) return;
			state.answers = answers;
			state.questions = questions;
		},
		hydrateFromStorage: (state, action) => {
			state.answers = action.payload.answers ?? {};
			state.questions = action.payload.questionsQuiz ?? [];
		},
	},
});

export const { saveResult, hydrateFromStorage } = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
