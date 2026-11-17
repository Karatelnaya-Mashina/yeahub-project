import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { MainPage } from '@/pages/MainPage';
import { QuestionsListPage } from '@/pages/QuestionsListPage';
import { QuestionDetailPage } from '@/pages/QuestionDetailPage';
import { MockInterviewPage, Quiz, ResultQuiz } from '@/pages/MockInterviewPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: 'questions',
				element: <QuestionsListPage />,
			},
			{
				path: `questions/:id`,
				element: <QuestionDetailPage />,
			},
			{
				path: 'mock-interview',
				element: <MockInterviewPage />,
			},

			{
				path: 'mock-interview/quiz/:id',
				element: <Quiz />,
			},
			{
				path: 'mock-interview/quiz/result',
				element: <ResultQuiz />,
			},
		],
	},
]);
