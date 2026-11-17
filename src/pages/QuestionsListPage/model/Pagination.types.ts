export interface PaginationProps {
	total: number | undefined;
	currentPage: number;
	onPageChange: (value: number) => void;
}
