import type {
	QuizSaveStorageValue,
	QuizStorageData,
} from './localStorage.types';

const STORAGE_VERSION = 1;

const isValidStorage = (data: unknown): data is QuizStorageData => {
	if (!data || typeof data !== 'object') return false;

	const obj = data as Record<string, unknown>;

	if (typeof obj.version !== 'number') return false;
	if (obj.version !== STORAGE_VERSION) return false;

	if (!Array.isArray(obj.answers)) return false;
	if (!Array.isArray(obj.questions)) return false;
	if (typeof obj.sessions !== 'object' || obj.sessions === null) return false;

	if (obj.activeSessionId !== null && typeof obj.activeSessionId !== 'string') {
		return false;
	}

	const sessions = obj.sessions as Record<string, unknown>;

	for (const session of Object.values(sessions)) {
		if (!session || typeof session !== 'object') return false;
		const s = session as Record<string, unknown>;
		if (!Array.isArray(s.answers)) return false;
		if (!Array.isArray(s.questions)) return false;
	}

	return true;
};

export const saveToStorage = (key: string, value: QuizSaveStorageValue) => {
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

export const loadFromStorage = (key: string) => {
	try {
		const value = localStorage.getItem(key);
		if (!value) return null;

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

export const removeFromStorage = (key: string) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error('Ошибка удаления localStorage:', error);
	}
};
