import { useCallback } from 'react';

export const useSpecializationToggle = (filters, updateFn) => {
	const toggle = useCallback(
		id => {
			const currentIds = Array.isArray(filters.specializationId)
				? filters.specializationId
				: [];
			const newIds = currentIds.includes(id)
				? currentIds.filter(i => i !== id)
				: [...currentIds, id];

			updateFn({ specializationId: newIds });
		},
		[filters.specializationId, updateFn],
	);

	return toggle;
};
