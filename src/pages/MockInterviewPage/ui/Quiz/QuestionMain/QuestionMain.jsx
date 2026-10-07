import { useState } from 'react';

import BtnAnswer from '@/shared/ui/BtnAnswer/BtnAnswer';
import Icon from '@/shared/ui/Icon';

import styles from './QuestionMain.module.scss';

const QuestionMain = ({ question, answer, onAnswer }) => {
	const [showAnswer, setShowAnswers] = useState(false);

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
					<BtnAnswer
						className={styles.action_btn}
						name='like'
						p='Знаю'
						onAnswer={() => onAnswer('know')}
						active={answer === 'know'}
					/>

					<BtnAnswer
						name='dislike'
						p='Не знаю'
						className={styles.action_btn}
						onAnswer={() => onAnswer('dont-know')}
						active={answer === 'dont-know'}
					>
						<Icon name='dislike' />
						<p>Не знаю</p>
					</BtnAnswer>
				</div>
			</div>
			<div className={styles.questionImg}>
				<Icon name='womanImg' />
			</div>
		</div>
	);
};

export default QuestionMain;
