import Skeleton from '@/shared/ui/Skeleton/Skeleton';
import styles from './MockInterviewPageSkeleton.module.scss';

const FilterGroupSkeleton = ({ items = 4, title = true }) => (
	<div className={styles.group}>
		{title && <Skeleton width='10em' height='1em' />}
		<div className={styles.group_list}>
			{Array.from({ length: items }).map((_, i) => (
				<Skeleton key={i} width='6em' height='2.25em' radius='12px' />
			))}
		</div>
	</div>
);

const MockInterviewPageSkeleton = () => {
	return (
		<div className={styles.simulator}>
			<Skeleton width='12em' height='1.75em' />

			<div className={styles.simulator_split}>
				<div className={styles.quizFilter}>
					<FilterGroupSkeleton items={6} />
					<FilterGroupSkeleton items={5} />
				</div>

				<div className={styles.category}>
					<FilterGroupSkeleton items={4} />
					<FilterGroupSkeleton items={3} />

					<div className={styles.numberQuestions}>
						<Skeleton width='9em' height='1em' />
						<Skeleton width='7em' height='2.75em' radius='12px' />
					</div>
				</div>
			</div>

			<div className={styles.start}>
				<Skeleton width='9em' height='3em' radius='12px' />
			</div>
		</div>
	);
};

export default MockInterviewPageSkeleton;
