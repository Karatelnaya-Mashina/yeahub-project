import { useState, useMemo, useCallback } from 'react';

import styles from './FilterSidebar.module.scss';

const FilterGroup = ({
	title,
	items = [],
	selectedIds = [],
	selectedId = null,
	onToggle,
	onChange,
	isSingleSelect = false,
	showAllButton = true,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const initialVisibleCount = 5;

	const visibleItems = useMemo(() => {
		const safeItems = Array.isArray(items) ? items : [];
		return isExpanded ? safeItems : safeItems.slice(0, initialVisibleCount);
	}, [items, isExpanded]);

	const hasHiddenItems =
		Array.isArray(items) && items.length > initialVisibleCount;

	const handleClick = useCallback(
		id => {
			if (isSingleSelect) {
				onChange?.(id);
			} else {
				onToggle?.(id);
			}
		},
		[isSingleSelect, onToggle, onChange],
	);

	const isActive = useCallback(
		id => {
			return isSingleSelect ? selectedId === id : selectedIds.includes(id);
		},
		[isSingleSelect, selectedId, selectedIds],
	);

	return (
		<div className={styles.filterGroup}>
			<h4 className={styles.filterTitle}>{title}</h4>

			<div className={styles.filterList}>
				{visibleItems.map(item => (
					<button
						key={item.id}
						className={`${styles.filterItem} ${isActive(item.id) ? styles.active : ''}`}
						onClick={() => handleClick(item.id)}
					>
						{item.title}
					</button>
				))}
			</div>

			{hasHiddenItems && showAllButton && (
				<button
					className={styles.showBtn}
					onClick={() => setIsExpanded(prev => !prev)}
				>
					{isExpanded ? 'Скрыть' : 'Посмотреть все'}
				</button>
			)}
		</div>
	);
};

export default FilterGroup;
