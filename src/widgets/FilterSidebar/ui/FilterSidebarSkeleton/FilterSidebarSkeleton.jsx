import Skeleton from '@/shared/ui/Skeleton/Skeleton';
import styles from './FilterSidebarSkeleton.module.scss';

const FilterGroupSkeleton = ({ items = 4 }) => (
	<div className={styles.group}>
		<Skeleton width='6em' height='1em' />
		<div className={styles.group__list}>
			{Array.from({ length: items }).map((_, i) => (
				<Skeleton key={i} width='5em' height='2em' radius='8px' />
			))}
		</div>
	</div>
);

const FilterSidebarSkeleton = () => {
	return (
		<aside className={styles.sidebar}>
			<Skeleton width='100%' height='2.5em' radius='12px' />

			<FilterGroupSkeleton items={5} />
			<FilterGroupSkeleton items={4} />
			<FilterGroupSkeleton items={4} />
			<FilterGroupSkeleton items={5} />
			<FilterGroupSkeleton items={3} />
		</aside>
	);
};

export default FilterSidebarSkeleton;
