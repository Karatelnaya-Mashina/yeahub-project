import Skeleton from '@/shared/ui/Skeleton/Skeleton';
import styles from './QuestionListSkeleton.module.scss';

const QuestionListSkeleton = ({ count = 5 }) => {
	return (
		<div className={styles.list}>
			<div className={styles.list__header}>
				<Skeleton width='8em' height='2em' radius='12px' />
			</div>

			<div className={styles.card}>
				{Array.from({ length: count }).map((_, i) => (
					<div key={i} className={styles.cardItem}>
						<div className={styles.cardItem__left}>
							<Skeleton width='0.75em' height='0.75em' radius='50%' />
							<Skeleton width='70%' height='1.25em' />
						</div>
						<Skeleton width='1.5em' height='1.5em' radius='6px' />
					</div>
				))}
			</div>

			<div className={styles.pagination}>
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton key={i} width='2em' height='2em' radius='6px' />
				))}
			</div>
		</div>
	);
};

export default QuestionListSkeleton;
