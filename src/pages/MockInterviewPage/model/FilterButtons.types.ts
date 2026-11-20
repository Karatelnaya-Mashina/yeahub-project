export interface BaseFilterBtn {
	id: number | string;
	title: string;
}

export interface FilterButtonsProps<T extends BaseFilterBtn> {
	title?: string;
	items?: T[];
	selectedIds?: T['id'][];
	selectedId?: T['id'];
	onToggle?: (id: T['id']) => void;
	isSingleSelect?: boolean;
}
