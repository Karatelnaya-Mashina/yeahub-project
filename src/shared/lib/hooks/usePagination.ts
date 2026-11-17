import { useMemo } from 'react';

const usePagination = (
	total: number,
	currentPage: number,
	limit: number = 10,
) => {
	const paginationData = useMemo(() => {
		const totalPages = Math.ceil(total / limit);
		const adjacentNumbers = 3;
		const temporaryArrPages = [];
		const visiblePages: string[] = [];
		let prevValue: number;

		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - adjacentNumbers &&
					i <= currentPage + adjacentNumbers)
			) {
				temporaryArrPages.push(i);
			}
		}

		temporaryArrPages.forEach(currentValue => {
			if (prevValue) {
				if (currentValue - prevValue === 2) {
					visiblePages.push(String(prevValue + 1));
				} else if (currentValue - prevValue !== 1) {
					visiblePages.push('...');
				}
			}
			visiblePages.push(String(currentValue));
			prevValue = currentValue;
		});

		return {
			visiblePages,
			totalPages,
			hasPrev: currentPage > 1,
			hasNext: currentPage < totalPages,
		};
	}, [total, currentPage, limit]);
	return paginationData;
};

export default usePagination;
