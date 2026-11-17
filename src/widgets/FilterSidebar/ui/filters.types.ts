export interface FilterProps {
	modal?: boolean;
}

export type QuestionsStatus = 'Все' | 'Изученные' | 'Не изученные';

export type StatusItem = {
	id: QuestionsStatus;
	title: string;
};

export interface BaseFilterItem {
	id: string | number;
	title: string;
}
export interface FilterGroupProps<T extends BaseFilterItem> {
	title: string;
	items?: T[];
	selectedIds?: T['id'][];
	selectedId?: T['id'];
	onToggle?: (id: T['id']) => void;
	onChange?: (id: T['id']) => void;
	isSingleSelect?: boolean;
	showAllButton?: boolean;
}
