import { useEffect, useRef, useState } from 'react';

import Icon from '@/shared/ui/Icon';
import styles from './QuestionAnswer.module.scss';

const QuestionAnswer = ({ shortAnswer, longAnswer }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const [fullHeight, setFullHeight] = useState(0);
	const contentRef = useRef();
	const maxHeightDescription = 785;

	const handleToggleOverflow = () => {
		setIsExpanded(prev => !prev);
	};

	useEffect(() => {
		if (contentRef.current) {
			const height = contentRef.current.scrollHeight;
			setFullHeight(height);

			const isOverflow = height > maxHeightDescription;
			setIsOverflowing(isOverflow);
		}
	}, [longAnswer]);

	return (
		<div
			className={`${styles.description} ${isExpanded ? styles.expanded : styles.close}`}
		>
			<div className={styles.description__shortAnswer}>
				<p className={styles.description__shortAnswer_title}>Краткий ответ:</p>
				<p className={styles.description__shortAnswer_short}>{shortAnswer}</p>
			</div>
			<div
				ref={contentRef}
				className={`${styles.description__longAnswer} ${isExpanded ? styles.expanded : ''}`}
				style={{
					maxHeight: isExpanded
						? `${fullHeight}px`
						: `${maxHeightDescription}px`,
				}}
			>
				<p className={styles.description__longAnswer_title}>
					Развёрнутый ответ:
				</p>
				<p className={styles.description__longAnswer_long}>{longAnswer}</p>
			</div>
			{!isExpanded && isOverflowing && <div className={styles.gradientMask} />}
			{isOverflowing && (
				<button
					onClick={() => handleToggleOverflow()}
					className={styles.description__unwrap}
				>
					{isExpanded ? <span>Свернуть</span> : <span>Развернуть</span>}
					<div className={`${styles.up} ${isExpanded ? styles.rotated : ''}`}>
						<Icon name='arrowDown' />
					</div>
				</button>
			)}
		</div>
	);
};

export default QuestionAnswer;
