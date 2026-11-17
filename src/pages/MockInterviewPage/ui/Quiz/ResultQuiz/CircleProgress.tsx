import styles from './ResultQuiz.module.scss';

const CircleProgress = ({ percent = 0, label = 'Изучено' }) => {
	const SIZE = 241;
	const STROKE = 20;
	const CENTER = SIZE / 2;
	const RADIUS = CENTER - STROKE / 2;

	const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

	const safePercent = Math.max(0, Math.min(100, percent));
	const dashOffset = CIRCUMFERENCE * (1 - safePercent / 100);

	return (
		<div className={styles.diagram}>
			<svg
				className={styles.svg}
				viewBox={`0 0 ${SIZE} ${SIZE}`}
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle
					cx={CENTER}
					cy={CENTER}
					r={RADIUS}
					fill='none'
					stroke='#FFE7AE'
					strokeWidth={STROKE}
				/>

				<circle
					cx={CENTER}
					cy={CENTER}
					r={RADIUS}
					fill='none'
					stroke='#1E8A1E'
					strokeWidth={STROKE}
					strokeLinecap='round'
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={dashOffset}
					transform={`rotate(-90 ${CENTER} ${CENTER})`}
				/>
			</svg>

			<div className={styles.label}>
				<span className={styles.percent}>{safePercent}% </span>
				<span className={styles.text}>{label}</span>
			</div>
		</div>
	);
};

export default CircleProgress;
