import { useCallback, useMemo, useState } from 'react';

import styles from './FilterButtons.module.scss';
import type {
	BaseFilterBtn,
	FilterButtonsProps,
} from '../../model/FilterButtons.types';

const FilterButtons = <T extends BaseFilterBtn>({
	title,
	items,
	selectedIds,
	selectedId,
	onToggle,
	isSingleSelect = false,
}: FilterButtonsProps<T>) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const initialVisibleCount = 5;

	const visibleElements = useMemo(() => {
		const firstElements = Array.isArray(items) ? items : [];
		return isExpanded ? firstElements : firstElements.slice(0, 5);
	}, [items, isExpanded]);

	const isActive = useCallback(
		(id: number) => {
			return isSingleSelect ? selectedId === id : selectedIds?.includes(id);
		},
		[isSingleSelect, selectedId, selectedIds],
	);

	const handleClick = useCallback(
		(id: number) => {
			onToggle?.(id);
		},
		[onToggle],
	);

	const hiddenElements =
		Array.isArray(items) && items.length > initialVisibleCount;

	return (
		<div className={styles.filter}>
			<h4 className={styles.filter_title}>{title}</h4>

			<div className={styles.filter_list}>
				{visibleElements.map(item => (
					<button
						key={item.id}
						className={`${styles.filter_item} ${isActive(Number(item.id)) ? styles.active : ''}`}
						onClick={() => handleClick(Number(item.id))}
					>
						{item.title}
					</button>
				))}
			</div>
			{hiddenElements && (
				<button
					className={styles.filter_showBtn}
					onClick={() => setIsExpanded(prev => !prev)}
				>
					{isExpanded ? 'Скрыть' : 'Посмотреть все'}
				</button>
			)}
		</div>
	);
};

export default FilterButtons;
