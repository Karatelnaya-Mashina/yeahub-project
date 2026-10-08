import ProgressBar from '@/shared/ui/ProgressBar/ProgressBar';
import CircleProgress from './CircleProgress';

import styles from './ResultQuiz.module.scss';

const Dashboard = () => {
	return (
		<div className={styles.dashboard}>
			<div className={styles.statistics}>
				<h4 className={styles.statistics_title}>
					Статистика пройденных вопросов
				</h4>
				<CircleProgress percent={10} />

				<div className={styles.statistics__summary}>
					<div className={styles.statistics__summary_item}>
						<p>Всего</p>
						<p>20</p>
					</div>
					<div className={styles.statistics__summary_item}>
						<p>Новые</p>
						<p>120</p>
					</div>
					<div className={styles.statistics__summary_item}>
						<p>В процессе</p>
						<p>50</p>
					</div>
					<div className={styles.statistics__summary_item}>
						<p>Изучено</p>
						<p>12</p>
					</div>
				</div>
			</div>
			<div className={styles.progress}>
				<h4 className={styles.progress_title}>Прогресс обучения по навыкам</h4>
				<div className={styles.progress_box}>
					<ProgressBar
						className={styles.progress_bar}
						title='HTML'
						step={10}
						fullCount={100}
					/>
					<ProgressBar
						className={styles.progress_bar}
						title='CSS'
						step={10}
						fullCount={100}
					/>
					<ProgressBar
						className={styles.progress_bar}
						title='JavaScript'
						step={10}
						fullCount={100}
					/>
					<ProgressBar
						className={styles.progress_bar}
						title='React'
						step={10}
						fullCount={100}
					/>
					<ProgressBar
						className={styles.progress_bar}
						title='PHP'
						step={10}
						fullCount={100}
					/>
					<ProgressBar
						className={styles.progress_bar}
						title='JavaScript'
						step={10}
						fullCount={100}
					/>
					<ProgressBar
						className={styles.progress_bar}
						title='React'
						step={10}
						fullCount={100}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
