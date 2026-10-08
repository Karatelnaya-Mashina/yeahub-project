export const saveToStorage = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error('Ошибка сохранения localStorage:', error);
	}
};

export const loadFromStorage = key => {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	} catch (error) {
		console.error('Ошибка загрузки localStorage:', error);
		return null;
	}
};

export const removeFromStorage = key => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error('Ошибка удаления localStorage:', error);
	}
};
