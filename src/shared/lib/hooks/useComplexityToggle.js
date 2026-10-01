import { useCallback } from 'react';

export const useComplexityToggle = (filters, updateFn) => {
	const toggle = useCallback(
		range => {
			const current = Array.isArray(filters.complexity)
				? filters.complexity
				: [];
			const newRanges = current.includes(range)
				? current.filter(r => r !== range)
				: [...current, range];

			updateFn({ complexity: newRanges });
		},
		[filters.complexity, updateFn],
	);

	return toggle;
};
