import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

import Layout from './Layout';
import { MainPage } from '@/pages/MainPage';
import { QuestionsListPage } from '@/pages/QuestionsListPage';
import { QuestionDetailPage } from '@/pages/QuestionDetailPage';
import { MockInterviewPage } from '@/pages/MockInterviewPage';
import { Quiz } from '@/pages/MockInterviewPage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Layout />}>
			<Route index element={<MainPage />} />
			<Route path='questions' element={<QuestionsListPage />} />
			<Route path='/:id' element={<QuestionDetailPage />} />
			<Route path='mock-interview' element={<MockInterviewPage />} />
			<Route path='/mock-interview/quiz' element={<Quiz />} />
		</Route>,
	),
);

export default router;
