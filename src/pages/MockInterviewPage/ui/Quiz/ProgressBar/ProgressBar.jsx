import styles from './ProgressBar.module.scss';

const ProgressBar = ({ step, fullCount }) => {
	const widthCompleted = Math.round(100 / fullCount) * step;
	return (
		<div className={styles.progressBar}>
			<header className={styles.progressBar_header}>
				<h4 className={styles.progressBar_title}>Вопросы собеседования</h4>
				<div className={styles.countQuestions}>
					{step}/{fullCount}
				</div>
			</header>
			<div className={styles.progressBar__indicator}>
				<div
					style={{ width: `${widthCompleted}%` }}
					className={styles.progressBar__indicator_completed}
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
