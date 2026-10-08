import { useNavigate } from 'react-router-dom';
import BtnAnswer from '@/shared/ui/BtnAnswer/BtnAnswer';

import Icon from '@/shared/ui/Icon';
import styles from './ResultQuiz.module.scss';

const CardsQuiz = ({ question, answers }) => {
	const navigate = useNavigate();
	const indexAnswer = answers.findIndex(answer => answer.id === question.id);
	const response = answers[indexAnswer].answer;

	return (
		<div onClick={() => navigate(`/${question.id}`)} className={styles.item}>
			<Icon name='questionImage' />
			<div className={styles.item_box}>
				<h4 className={styles.item_title}>{question.title}</h4>
				<BtnAnswer
					name={response === 'know' ? 'like' : 'dislike'}
					p={response === 'know' ? 'Знаю' : 'Не знаю'}
					className={styles.action_btn}
				/>
			</div>
		</div>
	);
};

export default CardsQuiz;
