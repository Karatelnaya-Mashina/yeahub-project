const STORAGE_VERSION = 1;

const isValidStorage = data => {
	if (!data || typeof data !== 'object') return false;

	if (typeof data.version !== 'number') return false;
	if (data.version !== STORAGE_VERSION) return false;

	if (!Array.isArray(data.answers)) return false;
	if (!Array.isArray(data.questions)) return false;
	if (typeof data.sessions !== 'object' || data.sessions === null) return false;

	if (
		data.activeSessionId !== null &&
		typeof data.activeSessionId !== 'string'
	) {
		return false;
	}

	for (const session of Object.values(data.sessions)) {
		if (!session || typeof session !== 'object') return false;
		if (!Array.isArray(session.answers)) return false;
		if (!Array.isArray(session.questions)) return false;
	}

	return true;
};

export const saveToStorage = (key, value) => {
	try {
		const payload = {
			version: STORAGE_VERSION,
			...value,
		};
		localStorage.setItem(key, JSON.stringify(payload));
	} catch (error) {
		console.error('Ошибка сохранения localStorage:', error);
	}
};

export const loadFromStorage = key => {
	try {
		const value = localStorage.getItem(key);
		if (!value) return null;
		console.log(JSON.parse(value));

		const parsed = JSON.parse(value);
		if (!isValidStorage(parsed)) {
			console.warn('Некорректная структура данных в localStorage');
			localStorage.removeItem(key);
			return null;
		}
		return parsed;
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
