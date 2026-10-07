import BtnAnswer from '@/shared/ui/BtnAnswer/BtnAnswer';

import Icon from '@/shared/ui/Icon';
import styles from './ResultQuiz.module.scss';

const CardsQuiz = ({ question, answers }) => {
	return (
		<div className={styles.item}>
			<Icon name='questionImage' />
			<div className={styles.item_box}>
				<h4 className={styles.item_title}>{question.title}</h4>
				<BtnAnswer name='like' p='знаю' className={styles.action_btn} />
			</div>
		</div>
	);
};

export default CardsQuiz;
