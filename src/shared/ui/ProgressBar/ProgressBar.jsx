import styles from './ProgressBar.module.scss';

const ProgressBar = ({ title, step, fullCount, className }) => {
	const widthCompleted = Math.round(100 / fullCount) * step;
	return (
		<div className={`${styles.progressBar} ${className}`}>
			<header className={styles.progressBar_header}>
				<h4 className={styles.progressBar_title}>{title}</h4>
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
