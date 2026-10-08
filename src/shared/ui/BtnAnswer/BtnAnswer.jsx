import Icon from '@/shared/ui/Icon';

import styles from './BtnAnswer.module.scss';

const BtnAnswer = ({ name, p, active, onAnswer, className }) => {
	return (
		<button
			type='button'
			className={`${styles.action_btn} ${className ?? ''}`}
			onClick={onAnswer}
			data-active={active}
		>
			<Icon name={name} />
			<p>{p}</p>
		</button>
	);
};

export default BtnAnswer;
