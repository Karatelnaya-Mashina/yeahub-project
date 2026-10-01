import { useCallback } from 'react';

export const useSkillsToggle = (filters, updateFn) => {
	const toggle = useCallback(
		id => {
			const currentIds = Array.isArray(filters.skills) ? filters.skills : [];
			const newIds = currentIds.includes(id)
				? currentIds.filter(i => i !== id)
				: [...currentIds, id];

			updateFn({ skills: newIds });
		},
		[filters.skills, updateFn],
	);

	return toggle;
};
