import { useSelector } from 'react-redux';

import Dashboard from './Dashboard';
import CardsQuiz from './CardsQuiz';

import Icon from '@/shared/ui/Icon';
import styles from './ResultQuiz.module.scss';

const ResultQuiz = () => {
	const { answers, questions } = useSelector(state => state.quiz);
	console.log(answers);
	console.log(questions);

	return (
		<div className={styles.resultQuiz}>
			<div className={styles.studyMode}>
				<header className={styles.header}>
					<h4 className={styles.header_title}>Умный режим изучения вопросов</h4>
					<button className={styles.header_btn}>
						<p>Посмотреть статистику</p>
						<Icon name='nextArrow' />
					</button>
				</header>
				<Dashboard />
			</div>
			<div className={styles.listCompleted}>
				<h4 className={styles.listCompleted_title}>
					Список пройденных вопросов собеседования
				</h4>
				<div className={styles.listCompleted_items}>
					{questions.map(question => (
						<CardsQuiz
							key={question.id	}
							question={question}
							answers={answers}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ResultQuiz;
