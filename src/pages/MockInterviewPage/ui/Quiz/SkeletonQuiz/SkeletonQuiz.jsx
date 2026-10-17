import styles from './SkeletonQuiz.module.scss';

const SkeletonQuiz = () => {
	return (
		<div className={styles.quiz}>
			<div className={styles.progress}>
				<div className={styles.progress_title} />
				<div className={styles.progress_bar} />
			</div>

			<div className={styles.questionQuiz}>
				<div className={styles.steps}>
					<div className={styles.steps_btn} />
					<div className={styles.steps_btn} />
				</div>

				<div className={styles.main}>
					<div className={styles.main_title} />
					<div className={styles.main_title_short} />

					<div className={styles.main_options}>
						{[...Array(4)].map((_, i) => (
							<div key={i} className={styles.main_option} />
						))}
					</div>
				</div>

				<div className={styles.finish}>
					<div className={styles.finish_line} />
					<div className={styles.finish_btn}>
						<div className={styles.finish_button} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonQuiz;
