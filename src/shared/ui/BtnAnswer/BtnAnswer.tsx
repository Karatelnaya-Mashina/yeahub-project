import Icon from '@/shared/ui/Icon';

import styles from './BtnAnswer.module.scss';
import type { BtnAnswerName, BtnAnswerProps } from './BtnAnswer.types';

const BtnAnswer = ({
	name,
	p,
	active,
	onAnswer,
	className,
}: BtnAnswerProps) => {
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
