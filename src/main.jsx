import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './app/store/index.js';
import { Provider } from 'react-redux';
import './app/styles/index.scss';
import './app/styles/normalize.css';
import App from './app/App.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
