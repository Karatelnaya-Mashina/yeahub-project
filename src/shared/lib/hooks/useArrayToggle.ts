import { useCallback } from 'react';

export const useArrayToggle = <T>(
	currentArray: T[] | undefined,
	onChange: (newArray: T[]) => void,
) => {
	const toggle = useCallback(
		(id: T) => {
			const safeArray = Array.isArray(currentArray) ? currentArray : [];
			const newArray = safeArray.includes(id)
				? safeArray.filter(i => i !== id)
				: [...safeArray, id];

			onChange(newArray);
		},
		[currentArray, onChange],
	);
	return toggle;
};
