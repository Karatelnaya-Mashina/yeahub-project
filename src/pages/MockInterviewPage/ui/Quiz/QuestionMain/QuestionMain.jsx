import { useState } from 'react';

import Icon from '@/shared/ui/Icon';

import styles from './QuestionMain.module.scss';

const QuestionMain = ({ question, answer, onAnswer }) => {
	const [showAnswer, setShowAnswers] = useState(false);

	console.log(question);

	return (
		<div className={styles.questionMain}>
			<div className={styles.questionQuiz}>
				<div className={styles.quiz}>
					<h4 className={styles.quiz_title}>{question.title}</h4>
					<div className={styles.answer}>
						{showAnswer && <p>{question.shortAnswer}</p>}
						<button
							className={styles.answer_btn}
							onClick={() => setShowAnswers(!showAnswer)}
						>
							{showAnswer ? 'Скрыть' : 'Посмотреть ответ'}
						</button>
					</div>
				</div>
				<div className={styles.action}>
					<button
						className={styles.action_btn}
						onClick={() => onAnswer('know')}
						data-active={answer === 'know'}
					>
						<Icon name='like' />
						<p>Знаю</p>
					</button>
					<button
						className={styles.action_btn}
						onClick={() => onAnswer('dont-know')}
						data-active={answer === 'dont-know'}
					>
						<Icon name='dislike' />
						<p>Не знаю</p>
					</button>
				</div>
			</div>
			<div className={styles.questionImg}>
				<Icon name='woman' />
			</div>
		</div>
	);
};

export default QuestionMain;
