import { useCallback } from 'react';
import usePaginationPages from '../../../../shared/lib/usePaginationPages';

import Icon from '../../../../shared/assets/icons/Icon';

import styles from './PagesQuestions.module.scss';

const PagesQuestions = ({ total = 0, currentPage = 1, onPageChange }) => {
	const { visiblePages, totalPages, hasPrev, hasNext } = usePaginationPages(
		total,
		currentPage,
	);
	const handlePageChange = useCallback(
		page => {
			if (page >= 1 && page <= totalPages && page !== currentPage) {
				onPageChange(page);
			}
		},
		[totalPages, currentPage, onPageChange],
	);

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className={styles.pageList}>
			<button
				className={`${styles.btnArrow} ${!hasPrev ? styles.disabled : ''}`}
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={!hasPrev}
				aria-label='Предыдущая страница'
			>
				<Icon name='prevArrow' />
			</button>

			{visiblePages.map((page, index) => (
				<button
					key={index}
					className={`${styles.btnPage} 
						${currentPage === page ? styles.active : ''} 
						${page === '...' ? styles.disabledEllipsis : ''}`}
					onClick={() => handlePageChange(page)}
					disabled={page === '...'}
				>
					{page}
				</button>
			))}

			<button
				className={`${styles.btnArrow} ${!hasNext ? styles.disabled : ''}`}
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={!hasNext}
				aria-label='Следующая страница'
			>
				<Icon name='nextArrow' />
			</button>
		</div>
	);
};

export default PagesQuestions;
