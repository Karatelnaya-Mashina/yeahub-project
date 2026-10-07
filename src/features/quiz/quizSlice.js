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
			const { answers, questionsQuiz } = action.payload;
			if (answers.length === 0 || questionsQuiz.length === 0) return;
			state.answers = answers;
			state.questions = questionsQuiz;
		},
	},
});

export const { saveResult } = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
