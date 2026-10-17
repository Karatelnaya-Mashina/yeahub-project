import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	activeSessionId: null,
	answers: [],
	questions: [],
	sessions: {},
};

const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		saveResult: (state, action) => {
			const { answers, questions, sessionId } = action.payload;
			if (!questions?.length) return;

			state.answers = answers;
			state.questions = questions;

			if (sessionId && state.sessions[sessionId]) {
				state.sessions[sessionId].answers = answers;
				state.sessions[sessionId].questions = questions;
				state.sessions[sessionId].finish = Date.now();
			}
		},
		hydrateFromStorage: (state, action) => {
			const payload = action.payload ?? {};

			if (!payload || typeof payload !== 'object') return;

			state.answers = payload.answers ?? [];
			state.questions = payload.questions ?? [];
			state.sessions = payload.sessions ?? {};
			state.activeSessionId =
				payload.activeSessionId ?? payload.activeSession ?? null;
		},
		startNewQuizSession: (state, action) => {
			const { sessionId, filters } = action.payload;

			state.activeSessionId = sessionId;
			state.sessions[sessionId] = {
				filters,
				questions: [],
				answers: [],
				start: Date.now(),
			};
		},
		setSessionQuestions: (state, action) => {
			const { sessionId, questions } = action.payload;
			if (state.sessions[sessionId]) {
				state.sessions[sessionId].questions = questions;
			}
		},
		setSessionAnswers: (state, action) => {
			const { sessionId, answers } = action.payload;
			if (state.sessions[sessionId]) {
				state.sessions[sessionId].answers = answers;
			}
		},
		deleteSessions: state => {
			const now = Date.now();
			const hour = 60 * 60 * 1000;
			Object.keys(state.sessions).forEach(id => {
				const s = state.sessions[id];
				if (s.finish && now - s.finish > hour) {
					delete state.sessions[id];
				}
			});
		},
	},
});

export const {
	saveResult,
	hydrateFromStorage,
	startNewQuizSession,
	setSessionQuestions,
	setSessionAnswers,
	deleteSessions,
} = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
