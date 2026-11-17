import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetQuizQuestionsQuery, useFiltersQuiz } from '@/entities/quiz';
import {
	saveResult,
	setSessionQuestions,
	setSessionAnswers,
} from '@/features/quiz/quizSlice';
import { saveToStorage } from '@/shared/lib/storage/localStorage';
import { STORAGE_KEY } from '@/shared/lib/storage/constantsKEY';

import ProgressBar from '@/shared/ui/ProgressBar/ProgressBar';
import QuestionSteps from './QuestionSteps/QuestionSteps';
import QuestionMain from './QuestionMain/QuestionMain';
import SkeletonQuiz from './SkeletonQuiz/SkeletonQuiz';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';

import styles from './Quiz.module.scss';

const Quiz = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id: sessionId } = useParams();
	const session = useSelector(state => state.quiz.sessions[sessionId]);
	const snapshot = Boolean(session?.questions?.length);
	const answers = useMemo(() => session?.answers ?? [], [session?.answers]);

	const { filters: filtersQuiz } = useFiltersQuiz();
	const filters = session?.filters ?? filtersQuiz;

	const { data, isLoading, error } = useGetQuizQuestionsQuery(
		{ ...filters, sessionId },
		{ skip: !sessionId || snapshot },
	);

	const questionsMemo = useMemo(() => data?.questions || [], [data?.questions]);
	const questionsQuiz = snapshot ? session.questions : questionsMemo;

	useEffect(() => {
		if (!sessionId || !questionsMemo.length) return;
		if (session?.questions?.length) return;

		dispatch(setSessionQuestions({ sessionId, questions: questionsMemo }));
	}, [questionsMemo, sessionId, session?.questions?.length, dispatch]);

	useEffect(() => {
		if (!sessionId) return;
		dispatch(setSessionAnswers({ sessionId, answers }));
	}, [answers, sessionId, dispatch]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const currentQuestion = questionsQuiz[currentIndex];
	const first = currentIndex === 0;
	const last = currentIndex === questionsQuiz.length - 1;
	const currentAnswer = currentQuestion
		? answers.find(a => a.id === currentQuestion.id)?.answer
		: undefined;

	const handleNavigationQuiz = move => {
		if (!last && move === 1) setCurrentIndex(prev => prev + 1);
		if (!first && move === -1) setCurrentIndex(prev => prev - 1);
	};

	const handleAnswer = value => {
		if (!currentQuestion || !sessionId) return;

		const exists = answers.some(a => a.id === currentQuestion.id);
		const nextAnswers = exists
			? answers.map(a =>
					a.id === currentQuestion.id ? { ...a, answer: value } : a,
				)
			: [...answers, { id: currentQuestion.id, answer: value }];

		dispatch(setSessionAnswers({ sessionId, answers: nextAnswers }));
	};

	const handleFinish = () => {
		const result = { answers, questions: questionsQuiz, sessionId };
		console.log(answers, questionsQuiz);

		dispatch(saveResult(result));

		saveToStorage(STORAGE_KEY, {
			activeSessionId: sessionId,
			sessions: {
				[sessionId]: {
					...session,
					answers,
					questions: questionsQuiz,
					finish: Date.now(),
				},
			},
			answers,
			questions: questionsQuiz,
		});

		return navigate('/mock-interview/quiz/result');
	};

	if (isLoading) return <SkeletonQuiz />;
	if (error) {
		return (
			<>
				<ErrorState
					title='Не удалось загрузить вопросы для тренажера'
					error={error}
				/>
			</>
		);
	}
	if (!sessionId) return <ErrorState title='Сессия не найдена' />;

	return (
		<div className={styles.quiz}>
			<ProgressBar
				title={'Вопросы собеседования'}
				step={currentIndex + 1}
				fullCount={questionsQuiz.length || data?.fullCount}
			/>
			<div className={styles.questionQuiz}>
				<QuestionSteps
					movements={handleNavigationQuiz}
					first={first}
					last={last}
				/>
				{currentQuestion && (
					<QuestionMain
						key={currentQuestion.id}
						question={currentQuestion}
						answer={currentAnswer}
						onAnswer={handleAnswer}
					/>
				)}

				<div className={styles.finish}>
					<div className={styles.finish_line}></div>
					<div className={styles.finish_btn}>
						<button onClick={handleFinish} className={styles.finish_button}>
							Завершить
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Quiz;
