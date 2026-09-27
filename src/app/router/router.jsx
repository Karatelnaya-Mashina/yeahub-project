import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

import Layout from './Layout';
import { MainPage } from '@/pages/MainPage';
import { QuestionsListPage } from '@/pages/QuestionsListPage';
import { QuestionDetailPage } from '@/pages/QuestionDetailPage';
import { SimulatorPage } from '@/pages/SimulatorPage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Layout />}>
			<Route index element={<MainPage />} />
			<Route path='questions' element={<QuestionsListPage />} />
			<Route path='/:id' element={<QuestionDetailPage />} />
			<Route path='simulator' element={<SimulatorPage />} />
		</Route>,
	),
);

export default router;
