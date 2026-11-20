import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { STORAGE_KEY } from './shared/lib/storage/constantsKEY';
import { loadFromStorage } from './shared/lib/storage/localStorage.js';
import {
	hydrateFromStorage,
	deleteSessions,
} from '@/features/quiz/quizSlice.ts';

import { store } from '@/app/providers/store.ts';
import App from './app/App.tsx';

import './app/styles/index.scss';
import './app/styles/normalize.css';

const savedData = loadFromStorage(STORAGE_KEY);
const container = document.getElementById('root');

if (!container) {
	throw new Error('Root элемент не найден');
}

if (savedData) {
	store.dispatch(hydrateFromStorage(savedData));
}

store.dispatch(deleteSessions());

createRoot(container).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
