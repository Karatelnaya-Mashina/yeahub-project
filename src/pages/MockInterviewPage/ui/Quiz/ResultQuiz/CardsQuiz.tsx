import { useNavigate } from 'react-router-dom';
import BtnAnswer from '@/shared/ui/BtnAnswer/BtnAnswer';

import Icon from '@/shared/ui/Icon';
import questionImage from '@/shared/assets/images/questionImage.webp';
import styles from './ResultQuiz.module.scss';

const CardsQuiz = ({ question, answers }) => {
	const navigate = useNavigate();
	const answer = answers.find(answer => answer.id === question.id)?.answer;

	return (
		<div
			onClick={() => navigate(`/questions/${question.id}`)}
			className={styles.item}
		>
			<img src={questionImage} alt='questionImage' width={154} height={154} />
			<div className={styles.item_box}>
				<h4 className={styles.item_title}>{question.title}</h4>
				<BtnAnswer
					name={answer === 'know' ? 'like' : 'dislike'}
					p={answer === 'know' ? 'Знаю' : 'Не знаю'}
					className={styles.action_btn}
				/>
			</div>
		</div>
	);
};

export default CardsQuiz;
