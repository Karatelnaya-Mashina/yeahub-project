import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveResult } from '@/features/quiz/quizSlice';

import { useFiltersQuiz } from '@/entities/quiz/model/useFiltersQuiz';
import { useGetQuizQuestionQuery } from '@/entities/quiz';

import ProgressBar from '@/shared/ui/ProgressBar/ProgressBar';
import QuestionSteps from './QuestionSteps/QuestionSteps';
import QuestionMain from './QuestionMain/QuestionMain';
import SkeletonQuiz from './SkeletonQuiz/SkeletonQuiz';

import styles from './Quiz.module.scss';

const Quiz = () => {
	const { filters } = useFiltersQuiz();
	const { data, isLoading, error } = useGetQuizQuestionQuery(filters);
	const questionsQuiz = data?.questions || [];
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState({});
	const dispatch = useDispatch();

	const currentQuestion = questionsQuiz[currentIndex];
	const first = currentIndex === 0;
	const last = currentIndex === questionsQuiz.length - 1;

	const navigate = useNavigate();

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

	const handleNavigationQuiz = move => {
		if (!last && move === 1) setCurrentIndex(prev => prev + 1);
		if (!first && move === -1) setCurrentIndex(prev => prev - 1);
	};

	const handleAnswer = value => {
		setAnswers(prev => ({
			...prev,
			[currentQuestion.id]: value,
		}));
	};

	const handleFinish = () => {
		dispatch(saveResult({ answers, questionsQuiz }));
		return navigate('/mock-interview/quiz/result');
	};

	return (
		<div className={styles.quiz}>
			<ProgressBar
				title={'Вопросы собеседования'}
				step={currentIndex + 1}
				fullCount={data?.fullCount}
			/>
			<div className={styles.questionQuiz}>
				<QuestionSteps
					movements={handleNavigationQuiz}
					first={first}
					last={last}
				/>
				{currentQuestion && (
					<QuestionMain
						question={currentQuestion}
						answer={answers[currentQuestion.id]}
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
