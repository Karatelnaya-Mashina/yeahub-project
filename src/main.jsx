import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './app/store/index.js';
import { Provider } from 'react-redux';
import './app/styles/index.scss';
import './app/styles/normalize.css';
import App from './app/App.jsx';
import { STORAGE_KEY } from './shared/lib/storage/constantsKEY';
import { loadFromStorage } from './shared/lib/storage/localStorage.js';
import { hydrateFromStorage } from './features/quiz/quizSlice.js';

const saveDate = loadFromStorage(STORAGE_KEY);
if (saveDate) {
	store.dispatch(hydrateFromStorage(saveDate));
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
