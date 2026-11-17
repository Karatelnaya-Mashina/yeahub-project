import Icon from '@/shared/ui/Icon';

import styles from './QuestionSteps.module.scss';

const QuestionSteps = ({ movements, first, last }) => {
	return (
		<div className={styles.questionSteps}>
			<div className={styles.steps}>
				<button
					onClick={() => movements(-1)}
					disabled={first}
					className={styles.steps_step}
				>
					<Icon name='prevArrow' />
					<p>Назад</p>
				</button>
				<button
					onClick={() => movements(1)}
					disabled={last}
					className={styles.steps_step}
				>
					<p>Далее</p>
					<Icon name='nextArrow' />
				</button>
			</div>
		</div>
	);
};

export default QuestionSteps;
