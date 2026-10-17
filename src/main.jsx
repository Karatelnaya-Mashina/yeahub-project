import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store/index.js';
import App from './app/App.jsx';

import './app/styles/index.scss';
import './app/styles/normalize.css';

import { STORAGE_KEY } from './shared/lib/storage/constantsKEY';
import { loadFromStorage } from './shared/lib/storage/localStorage.js';
import { hydrateFromStorage, deleteSessions } from '@/features/quiz/quizSlice';

const savedData = loadFromStorage(STORAGE_KEY);

if (savedData) {
	store.dispatch(hydrateFromStorage(savedData));
}

store.dispatch(deleteSessions());

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
