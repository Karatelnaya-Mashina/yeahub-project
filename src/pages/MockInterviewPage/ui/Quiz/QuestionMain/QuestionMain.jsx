import { useState } from 'react';

import MarkdownRenderer from '@/shared/ui/MarkdownRenderer/MarkdownRenderer';
import BtnAnswer from '@/shared/ui/BtnAnswer/BtnAnswer';
import womanImg from '@/shared/assets/images/womanImg.webp';

import styles from './QuestionMain.module.scss';

const QuestionMain = ({ question, answer, onAnswer }) => {
	const [showAnswer, setShowAnswers] = useState(false);

	return (
		<div className={styles.questionMain}>
			<div className={styles.questionQuiz}>
				<div className={styles.quiz}>
					<h4 className={styles.quiz_title}>{question.title}</h4>
					<div className={styles.answer}>
						<MarkdownRenderer>
							{showAnswer && question.shortAnswer}
						</MarkdownRenderer>
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
					/>
				</div>
			</div>
			<div className={styles.questionImg}>
				<img src={womanImg} alt='woman' width={622} height={358} />
			</div>
		</div>
	);
};

export default QuestionMain;
